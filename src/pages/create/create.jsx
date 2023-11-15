import { useState, useContext} from "react"
import { useNavigate } from "react-router";
import useCreatePost from "../../hooks/useCreatePost";
import UserInfoContext from "../../Context/ContextUserInfo";

const Create = () => {

    const navigate = useNavigate()
    const userAuth = useContext(UserInfoContext)

    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ image, setImage ] = useState("")
    const [ tags, setTags ] = useState([])
    
    const { createPost, response, errorURL, setErrorURL} = useCreatePost()

    const handleCreatePost = (e) => {
        e.preventDefault()

        const tagsArrays = tags.split(',').map(tag => tag.trim().toLowerCase())

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

    return (
        <div className="allContainers">
            <h1 style={{ color: '#b5b5b5' }}>EVERYTHING BEGIN WITH AN IDEA.</h1>
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
                    style={{ opacity: !response.loading ? '1' : '0.4' }}
                    disabled={response.loading ? true : false}
                    >SHARE
                </button>
            </form>
            {response.insert && <p className="sucessMessage">{response.insert}</p>}
            {response.error && <p className="warningMessage">{response.error}</p>}
            {errorURL && <p className="warningMessage">{errorURL}</p>} 
        </div>
    )
}

export default Create;