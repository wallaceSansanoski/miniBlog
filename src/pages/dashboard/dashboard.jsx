/// components
import DashboardItem from "../../Components/DashboardItem";

///hooks
import { useFetchPosts } from '../../hooks/useFetchPosts'

///css
import style from './dashboard.module.css'

const Dashboard = () => {

    const { filteredPostedByUser } = useFetchPosts()

    return(
        <>
            <div className={style.cointainerDashboard} >
                <div className={style.subTitlle}>
                    <h1>WELCOME TO DASHBOARD</h1>
                    <p>MANAGER YOUR POSTS</p>
                </div>
                <div className={style.titleAndAction}>
                    <div className={style.actions}>
                        <p>TITLE</p>
                        <p>ACTION</p>
                    </div>
                    <div>
                        {filteredPostedByUser.map(postFiltered => (
                            <DashboardItem key={postFiltered.data().title} filteredPostedByUser={postFiltered} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;