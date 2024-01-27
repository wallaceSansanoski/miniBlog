//css style
import style from './home.module.css'

/// react component and  hooks
import { useState} from "react";
import DisplaySearch from "../../Components/DisplaySearch";


///hooks
import { useFetchPosts } from '../../hooks/useFetchPosts'

///react router
import { Link } from "react-router-dom";

const Home = () => {
    
    const [filteredPostes, setFilteredPosts] = useState([])
    const [messageIfNotFoundPostFiltered, setMessageIfNotFoundPostFiltered ] = useState(false)

    const { posts, loading } = useFetchPosts()

    const handleSearchContent = (e) => {
        e.preventDefault()

        const inputValue = (e.target.search.value).toLowerCase()

        let hasPostFiltered = posts.filter((post) => post.tagsArrays.includes(inputValue))

        setFilteredPosts(hasPostFiltered)

        if(hasPostFiltered.length === 0) {
            setMessageIfNotFoundPostFiltered(true)
            return 
        }
    }

    const handleClickMessageNotFoundPostFiltered = (e) => {

        const targetElement = e.target.tagName
        const someElementWasClickedToCloseMessageBar = ['SPAN','DIV', 'P'].includes(targetElement)
        
        if(someElementWasClickedToCloseMessageBar){
            setMessageIfNotFoundPostFiltered(false)
        }
    }

    return (
        <div className={style.containerShowContent}>
            <h1>see all post</h1>
            <div className={style.searchContainer}>
                <form className={style.formSearch} onSubmit={handleSearchContent}>
                    <input
                        className={style.inputSearch}
                        name="search"
                        placeholder="looking for something else"
                        onChange={() => {
                            setFilteredPosts([])
                            setMessageIfNotFoundPostFiltered(false)
                        }}
                    ></input>
                    <button className={style.buttonSearch}>SEARCH</button>
                </form>
            </div>
            {messageIfNotFoundPostFiltered &&
                (
                    <div className={style.notFoundFilteredPost} onClick={handleClickMessageNotFoundPostFiltered}>
                        <span>x</span>
                        <p>not found post relate with search</p>
                    </div>
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
                    <Link to='/create'>create the first one</Link>
                </div>
            )}
        </div>
    )
}

export default Home;