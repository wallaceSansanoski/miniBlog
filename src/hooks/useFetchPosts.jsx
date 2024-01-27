import { db, auth } from "../Firebase/config";
import { query,  orderBy, onSnapshot, collection } from "firebase/firestore"
import { useState, useEffect } from 'react'

export const useFetchPosts = () => {

    const [posts, setPosts] = useState([])
    const [filteredPostedByUser, setFilteredPostedByUser ] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function fetchContent() {

            setLoading(true)
            
            const q = await query(collection(db, "posts"), orderBy('createAt'));

            try {
                await onSnapshot(q, (querySnapshot) => {
                    setPosts(
                        querySnapshot.docs.map(post => ({
                            uid: post.id,
                            ...post.data()
                        }))
                    )

                    if (auth.currentUser) {
                        setFilteredPostedByUser(
                            querySnapshot.docs.filter(post => post.data().userID === auth.currentUser.uid)
                        )
                    }

                    setLoading(false)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchContent()
    }, [])

    return { posts, loading, filteredPostedByUser}
}

export default useFetchPosts;