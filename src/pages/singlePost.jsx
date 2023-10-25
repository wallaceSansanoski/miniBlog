///react router dom
import { useParams, Link } from "react-router-dom";

///firebase
import { doc, getDoc  } from "firebase/firestore";

///DB react
import { db } from "../Firebase/config";

///react
import { useEffect, useState } from "react";

import style from './singlePost.module.css'



const SinglePost = () => {
    
    const { id } = useParams()
    const [ post, setPost ] = useState()
 
    useEffect(() => {

        const getPost = async () => {

            try {

                const docRef = doc(db,'posts', id);
                const post = await getDoc(docRef);
                setPost(post.data())

            } catch (error) {
                console.log(error.name)
            }
        }
        
        getPost()
        
    }, [])
    

    return (
        <>
            {!post && (<p>LOADING...</p>)}
            {post && (
                <div className={style.containerShowContent}>
                    <div className={style.containerContent}>
                        <h1>{post.title}</h1>
                        <img className={style.containerImage} src={post.image} alt={post.title} />
                        <p>create by</p>
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