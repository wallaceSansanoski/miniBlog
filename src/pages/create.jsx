import { useState } from "react"

const Create = () => {

    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [image, setImage ] = useState("")
    const [tags, setTags ] = useState([]) 

    return (
        <div className="allContainers">
            <form>
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
                    onChange={(e) =>setImage(e.target.value)}
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
                <button className="btn">SHARE</button>
            </form>
        </div>
    )
}

export default Create