import { useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router";
import { db } from "../../Firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import useFetchGetDocument from "../../hooks/useFetchGetDocument";

const Update = () => {
    
    const navigate = useNavigate()
    const { id } = useParams()
    const { post } = useFetchGetDocument(id)

    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ image, setImage ] = useState("")
    const [ tags, setTags ] = useState([])
    const [ messageUpdateFile, setMessageUpdateFile ] = useState(null)
    
    useEffect(() => {

        if(post){

            const tags = post.tagsArrays.join(',')
            
            setContent(post.content)
            setImage(post.image)
            setTitle(post.title)
            setTags(tags)
        }

    }, [ post ])

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
                <div className="allContainers">
                    <h1 style={{ color: '#b5b5b5' }}>UPDATE YOUR POST.</h1>
                    <form onSubmit={handleCreatePost}>
                        <label htmlFor="title">TITLE </label>
                        <input
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="TITLE"
                            required
                        ></input>
                        <label htmlFor="image">IMAGE URL</label>
                        <input
                            name="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="URL"
                            required
                        ></input>
                        <div>
                            <img src={image} alt="" />
                        </div>
                        <label htmlFor="content">CONTENT</label>
                        <textarea
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="EXPLAIN YOUR IDEA...."
                            required
                        ></textarea>
                        <label htmlFor="tags">TAGS</label>
                        <input
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
                    {messageUpdateFile && <p className="sucessMessage">FILE UPDATE SUCESSFULY</p>}
                    {messageUpdateFile === false && <p className="warningMessage">FILE UPDATE ERROR </p>}
                
                </div>
            </>
      ))
    )
}

export default Update;