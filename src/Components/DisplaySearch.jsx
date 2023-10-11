import style  from './DisplaySearch.module.css'

const DisplaySearch = ({post}) => {

    const {uid, title, content, createAt, tagsArrays, image} = post

    return (
        <div className={style.containerContent}>
            <h1>{title}</h1>
            <img className={style.containerImage} src={image} alt={title}/>
            <button className="btn">READ POST</button>
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