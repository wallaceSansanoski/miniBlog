import style from './dashboardItem.module.css'

const DashboardItem = ({posts})  => {

    return (
        <div className={style.containerDashboardPosts}>
            <p>{posts.title}</p>
            <div className={style.btnActions}>
                <button className={style.btnAction}>UPDATE</button>
                <button className={style.btnAction}>DELETE</button>
                <button className={style.btnAction}>READ</button>
            </div>
        </div>
    )
}

export default DashboardItem;