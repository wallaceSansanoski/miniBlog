import style from './dashboardItem.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase/config'

const DashboardItem = ({posts})  => {
    const handleDeletePost = async () => {
        await deleteDoc(doc(db, "posts", posts.id));
    }

    return (
        <div className={style.containerDashboardPosts}>
            <p>{posts.data().title}</p>
            <div className={style.btnActions}>
                <button className={style.btnAction}>UPDATE</button>
                <button className={style.btnAction} onClick={handleDeletePost} >DELETE</button>
                <button className={style.btnAction}>READ</button>
            </div>
        </div>
    )
}

export default DashboardItem;