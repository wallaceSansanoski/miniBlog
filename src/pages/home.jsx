//firebase
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from '../Firebase/config'

///css style
import style from './home.module.css'

/// react component and  hooks
import { useState, useEffect, useContext} from "react";
import DisplaySearch from "../Components/DisplaySearch";

///context
import { UserInfoContext } from "../Context/ContextUserInfo";

///react router
import { Link } from "react-router-dom";

const Home = () => {

    const { userAuth } = useContext(UserInfoContext)

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [filteredPostes, setFilteredPosts] = useState([])
    const [messageIfNotFoundPostFiltered, setMessageIfNotFoundPostFiltered ] = useState(true)

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
                    setLoading(false)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchContent()
    }, [])


    const handleSearchContent = (e) => {
        e.preventDefault()

        const inputValue = (e.target.search.value).toLowerCase()

        let hasPostFiltered = posts.filter((post) => post.tagsArrays.includes(inputValue))

        setFilteredPosts(hasPostFiltered)

        if(hasPostFiltered.length === 0) {
            setMessageIfNotFoundPostFiltered(false)
        }
    }

    const handleClickMessageNotFoundPostFiltered = (e) => {
        if(['SPAN','DIV', 'P'].includes(e.target.tagName)){
            setMessageIfNotFoundPostFiltered(true)
        }
    }

    return (
        <div className={style.containerShowContent}>
            <h1>SEE ALL POST </h1>
            <div className={style.searchContainer}>
                <form className={style.formSearch} onSubmit={handleSearchContent}>
                    <input
                        className={style.inputSearch}
                        name="search"
                        placeholder="LOOKING FOR SOMETHIGN ELSE"
                        onChange={() => {
                            setFilteredPosts([])
                            setMessageIfNotFoundPostFiltered(true)
                        }}
                    ></input>
                    <button className={style.buttonSearch} >SEARCH</button>
                </form>
            </div>
            {!messageIfNotFoundPostFiltered ?
                (
                    <div className={style.notFoundFilteredPost} onClick={handleClickMessageNotFoundPostFiltered}>
                        <span>x</span>
                        <p>NOT FOUND POST RELATE WITH SEARCH</p>
                    </div>
                )
                :
                (
                    ("")
                )
            }
            {loading && <h2>LOADING...</h2>}
            {!loading && (filteredPostes.length > 0 ?
                (filteredPostes.map(post =>
                    (<DisplaySearch key={post.uid} post={post} />))
                ) :
                (posts.map(post =>
                    (<DisplaySearch key={post.uid} post={post} />))
                )
            )
            }
            {posts.length === 0 && (
                <div className={style.containerNotFoundPost}>
                    <h2>NOT FOUND ANY POST YET :(</h2>
                    <Link to='/create'>CREATE THE FIRST ONE</Link>
                </div>
            )}
        </div>
    )
}

export default Home;