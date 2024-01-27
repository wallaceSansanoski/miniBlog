import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { db } from "../../Firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import useFetchGetDocument from "../../hooks/useFetchGetDocument";
import style from '../update/update.module.css'

const Update = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const { post } = useFetchGetDocument(id)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [tags, setTags] = useState([])
    const [messageUpdateFile, setMessageUpdateFile] = useState(null)


    console.log(post?.content)

    useEffect(() => {
        if (post) {
            const tags = post.tagsArrays.join(',')

            setImage(post.image)
            setTitle(post.title)
            setTags(tags)
        }

    }, [post])

  
    const handleCreatePost = async (e) => {
        e.preventDefault()

        const tagsArrays = tags.split(',').map(tag => tag.trim().toLowerCase())
        const fileToBeUpdate = doc(db, "posts", id)

        try {

            await updateDoc(fileToBeUpdate, {
                title,
                content,
                image,
                tagsArrays
            })

            setMessageUpdateFile(true)

        } catch (error) {
            setMessageUpdateFile(false)
            console.log(error.message)
        }

        navigate('/dashboard')
    }

    return (
        (post && (
            <>
                <div className="containers">
                    <div className={style.wrapperContainer}>
                        <h1 style={{ marginTop: '100px', color: '#b5b5b5' }}>UPDATE YOUR POST.</h1>
                        <form
                            className={style.form}
                            onSubmit={handleCreatePost}>
                            <label htmlFor="title">TITLE </label>
                            <input
                                className={style.input}
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="TITLE"
                                required
                            ></input>
                            <label htmlFor="image">IMAGE URL</label>
                            <input
                                className={style.input}
                                name="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="URL"
                                required
                            ></input>
                            <div>
                                <img src={image} alt="" />
                            </div>
                            <label htmlFor="content">CONTENTS TO CHANGE</label>
                            {
                                post.content && (
                                    post.content.map((value, index) =>
                                        <textarea
                                            id={index}
                                            className={style.areaUpdate}
                                            type="text"
                                            onChange={e => {
                                                post.content[e.target.id] = e.target.value 
                                                setContent(post.content)
                                            }}
                                        >{value}
                                        </textarea>)
                                )

                            }
                            <label htmlFor="tags">TAGS</label>
                            <input
                                className={style.tags}
                                name="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="TYPE YOUR TAG USING COMMAS"
                                required
                            ></input>
                            <button
                                className="btn"
                            >UPDATE
                            </button>
                        </form>
                    </div>
                    {messageUpdateFile && <p className="sucessMessage">FILE UPDATE SUCESSFULY</p>}
                    {messageUpdateFile === false && <p className="warningMessage">FILE UPDATE ERROR </p>}

                </div>
            </>
        ))
    )
}

export default Update;