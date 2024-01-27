///react router dom
import { useParams, Link } from "react-router-dom";

import style from './singlePost.module.css'
import useFetchGetDocument from "../../hooks/useFetchGetDocument";


const SinglePost = () => {

    const { id } = useParams()
    const { post } = useFetchGetDocument(id)

    console.log(post)

    return (
        <>
            {!post && (<p>LOADING...</p>)}
            {post && (
                <div className={style.containerShowContent}>
                    <div className={style.containerContent}>
                        <h1>{post.title}</h1>
                        <img className={style.containerImageTitle} src={post.image} alt={post.title} />
                        <p className={style.createdBy}>create by: <strong>{post.userName}</strong></p>
                        {post.content && (
                            post.content.map((content) =>
                                URL.canParse(content)
                                 ? <img className={style.containerImageContext} key={content} src={content} alt="image default" />
                                 : <p className={style.content} key={content} >{content}</p>
                            )
                        )}
                        <div className={style.containerTags}>
                            {
                                post.tagsArrays.map((tag,index) => {
                                    return <p className={style.tag} key={`${tag}${index}`}>#{tag}</p>
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