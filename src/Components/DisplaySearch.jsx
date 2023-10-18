import style  from './DisplaySearch.module.css'

const DisplaySearch = ({post}) => {

    const {uid, title, content,displayName, createAt, tagsArrays, image} = post

    return (
        <div className={style.containerContent}>
            <h1>{title}</h1>
            <img className={style.containerImage} src={image} alt={title}/>
            <p>create by {displayName}</p>
            <button className={style.btnReadPost} >READ POST</button>
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