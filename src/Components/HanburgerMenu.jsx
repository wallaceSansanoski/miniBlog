import style from './HanburguerMenu.module.css'

const HanburguerMenu = () => {
    return (
        <div className={style.hamburguer}>
            <div className={style.burger}></div>
            <div className={style.burger}></div>
            <div className={style.burger}></div>
            <div className={style.burger}></div>
        </div>
    )
}

export default HanburguerMenu;