import style from './Notfound.module.css'

const NotFound = () => {
    return (
        <div className={style.containerNotfound}>
            <p className={style.p} >SORRY !!! SOMETHING WRONG...</p>
            <p className={style.p} >NOT FOUND PAGE :(</p>
        </div>
    )
}
export default NotFound;