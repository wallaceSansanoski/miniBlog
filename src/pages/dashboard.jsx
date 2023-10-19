/// components
import DashboardItem from "../Components/DashboardItem";

///firebase
import { auth, db } from "../Firebase/config";
import { query,  orderBy, onSnapshot, collection } from "firebase/firestore"

///hooks
import { useState,useEffect } from "react";

///css
import style from './dashboard.module.css'

const Dashboard = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function fetchContent() {

            setLoading(true)
            const q = await query(collection(db, "posts"), orderBy('createAt'));

            try {
                await onSnapshot(q, (querySnapshot) => {
                    setPosts(
                        querySnapshot.docs.filter(post => post.data().userID === auth.currentUser.uid)
                    )
                    setLoading(false)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchContent()
    }, [])

    return(
        <>
        <div className={style.cointainerDashboard} >
            <div>
                <h1>WELCOME TO DASHBOARD</h1>
                <p>MANAGER YOUR POSTS</p>
            </div>
            <div className={style.titleAndAction}>
                <div className={style.actions}>
                    <p>TITLE</p>
                    <p>ACTION</p>
                </div>
                <div>
                    {posts.map(post  =>  (
                        <DashboardItem key={post.data().title} posts={post.data()}/>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;