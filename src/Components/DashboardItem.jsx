import style from './dashboardItem.module.css'
import { useNavigate } from 'react-router';

import useDeleteDoc from '../hooks/useDeleteDoc';

const DashboardItem = ({filteredPostedByUser})  => {

    const { id } = filteredPostedByUser
    const { title } = filteredPostedByUser.data()
    const { deletingDoc, state : stateDeleteDoc } = useDeleteDoc(id)

    const navigate = useNavigate()
    
    const handleDeletePost = () => {
        deletingDoc()
    }

    const handleUpdatePost = () => {
        navigate(`/post/update/${id}`)
    }

    const handleReadPost = () => {
        navigate(`/post/${id}`)
    }

    return (
        <div className={style.containerDashboardPosts}>
            <div className={style.wrapperTitle}>
                <p>{title}</p>
            </div>
            <div className={style.wrapperButton}>
                <button className={style.btnAction} onClick={handleUpdatePost}>UPDATE</button>
                <button className={style.btnAction} onClick={handleReadPost} >READ</button>
                <button className={style.btnActionDanger} onClick={handleDeletePost} >DELETE</button>
            </div>
            {stateDeleteDoc.isDeleteDoc && (
                <p className='sucessMessage'>POST DELETED</p>
            )}
        </div>
    )
}

export default DashboardItem;