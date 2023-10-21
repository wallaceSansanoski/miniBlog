import style from './dashboardItem.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase/config'
import { useRef } from 'react';

const DashboardItem = ({posts})  => {

    const postID = useRef(posts.id)

    const handleDeletePost = async () => {
        await deleteDoc(doc(db, "posts", postID.current));
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