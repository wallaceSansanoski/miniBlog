import { useState, useContext, useRef} from "react"
import { useNavigate } from "react-router";
import useCreatePost from "../../hooks/useCreatePost";
import UserInfoContext from "../../Context/ContextUserInfo";
import style from './create.module.css'

const Create = () => {

    const formCreateContent  = useRef()

    const navigate = useNavigate()
    const userAuth = useContext(UserInfoContext)

    const [ title, setTitle ] = useState("")
    const [extraContent, setExtraContent ] = useState('')
    const [ content, setContent ] = useState([]) 
    const [ image, setImage ] = useState("")
    const [ tags, setTags ] = useState([])
    

    const { createPost, response, errorURL} = useCreatePost()

    const handleCreatePost = (e) => {
        e.preventDefault()

        const tagsArrays = 
            tags.split(',').map(tag => tag.trim().toLowerCase())

        createPost({
            title,
            content,
            image,
            tagsArrays,
            userName : userAuth.email.split("@")[0]
        }, "posts")

        if(response.insert) {
            setContent("")
            setImage("")
            setTags("")
            setTitle("")
        }

        navigate('/')
    }

    const handleAddContent = e => {
        e.preventDefault()
        setContent((e) => [...e, extraContent])
        setExtraContent("")
    }

    return (
        <div className={style.containers}>
            <h1 style={{ color: '#b5b5b5' }}>every thing begin with new idea.</h1>
            <form onSubmit={handleCreatePost} id="createPost">
                <label htmlFor="title">title </label>
                <input
                    className={style.input}
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    required
                ></input>
                <label htmlFor="image">image page </label>
                <input
                    className={style.input}
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="url"
                    required
                ></input>
                <label htmlFor="tags">tags</label>
                <input
                    className={style.input}
                    name="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="type your tags using commas"
                    required
                ></input>
            </form>
            <form ref={formCreateContent} onSubmit={handleAddContent}>
                <label htmlFor="extraContent">create content</label>
                <input
                    className={style.input}  
                    name="extraContent"
                    value={extraContent}
                    onChange={(e) => 
                        setExtraContent(e.target.value)}
                    placeholder="add text or url image"
                    required>
                </input>
                <button className="btn" style={{fontSize : 13}}>add content</button>
            </form>
            <div className={style.wrapperButton}>
                <button
                    form="createPost"
                    className="btn"
                    style={{ opacity: !response.loading ? '1' : '0.4' }}
                    disabled={response.loading ? true : false}
                >share
                </button>
            </div>
            {response.insert && <p className="sucessMessage">{response.insert}</p>}
            {response.error && <p className="warningMessage">{response.error}</p>}
            {errorURL && <p className="warningMessage">{errorURL}</p>} 
        </div>
    )
}

export default Create;