import style  from './DisplaySearch.module.css'

import { Link } from 'react-router-dom'

const DisplaySearch = ({post}) => {

    const { title, tagsArrays, image, userName } = post


    return (
        <div className={style.containerContent}>
            <h1>{title}</h1>
            <img className={style.containerImage} src={image} alt={title}/>
            <p className={style.createdBy}>create by: <strong>{userName}</strong></p>
            <Link className='link' to={`/post/${post.uid}`}><button className={style.btnReadPost} >READ POST</button></Link>
            <div className={style.containerTags}>
                {
                    tagsArrays.map(tag => {
                       return  <p className={style.tag} key={tag}>#{tag}</p>
                    })
                }
            </div>
        </div>
    )
}

export default DisplaySearch;