///react router dom
import { useParams, Link } from "react-router-dom";

import style from './singlePost.module.css'
import useFetchGetDocument from "../../hooks/useFetchGetDocument";


const SinglePost = () => {
    
    const { id } = useParams()
    const { post } = useFetchGetDocument(id)

    
    return (
        <>
            {!post && (<p>LOADING...</p>)}
            {post && (
                <div className={style.containerShowContent}>
                    <div className={style.containerContent}>
                        <h1>{post.title}</h1>
                        <img className={style.containerImage} src={post.image} alt={post.title} />
                        <p>create by: <strong>{post.userName}</strong></p>
                        <p className={style.content}>{post.content}</p>
                        <div className={style.containerTags}>
                            {
                                post.tagsArrays.map(tag => {
                                    return <p className={style.tag} key={tag}>#{tag}</p>
                                })
                            }
                        </div>
                        <Link className="link" to={`/`}><button className={style.backHome} >BACK HOME</button></Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default SinglePost;