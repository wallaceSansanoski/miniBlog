import { useState, useReducer } from "react"
import { db } from "../Firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

const Create = () => {

    const navigate = useNavigate()

    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ image, setImage ] = useState("")
    const [ tags, setTags ] = useState([])
    const [ errorCreate, setErrorCreate ] = useState("")


    const insertReduce = (state, action) => {
        switch (action.type) {
            case 'RESET':
                return {
                    loading: false,
                    error: null,
                    insert: false
                }
            case 'LOADING':
                return {
                    loading: true,
                    error: false,
                    insert: false
                }
            case 'INSERT_DOC':
                return {
                    loading: false,
                    error: false,
                    insert: 'SUCESSFULL CREATE POST.'
                }
            case 'ERROR':
                return {
                    loading: false,
                    error: action.payload,
                    insert: false
                }
            default:
                return state
        }
    }

    const [ state, dispatch ] = useReducer(insertReduce, { loading: false, error: null, insert: false })

    const handleCreatePost = async (e) => {
        e.preventDefault()

        try {
            new URL(image)
        } catch (error) {
            setErrorCreate('URL invald.Try again.')
            setTimeout(() => {
                setErrorCreate("")
             }, 2000)
            return 
        }

        const tagsArrays = tags.split(',').map(tag => tag.trim().toLowerCase())
        
        dispatch({
            type: 'LOADING'
        })

        try {

            const isnertDocument = await addDoc(collection(db, "posts"), {
                title,
                content,
                image,
                tagsArrays,
                createAt: Timestamp.now()
            });


            dispatch({
                type: "INSERT_DOC",
                payload: isnertDocument
            })

        } catch (error) {

            dispatch({
                type: 'ERROR',
                paylaod: error.message
            })
        }

        setTitle("")
        setContent("")
        setImage("")
        setTags("")

        setTimeout(() => {
            dispatch({
                type: 'RESET'
            })
        }, 2000)

        navigate('/')

    }

    return (
        <div className="allContainers">
            <h1 style={{ color: '#b5b5b5' }}>EVERYTHING BEGINS WITH AN IDEA.</h1>
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
                    style={{ opacity: !state.loading ? '1' : '0.4' }
                    }>SHARE
                </button>
            </form>
            {state.insert && <p className="sucessMessage">{state.insert}</p>}
            {state.error && <p className="warningMessage">{state.error}</p>}
            {errorCreate && <p className="warningMessage">{errorCreate}</p>}
        </div>
    )
}

export default Create