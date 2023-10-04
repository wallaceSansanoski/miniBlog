import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase/config'
import style from './home.module.css'
import { useState, useEffect } from "react";
import DisplaySearch from "../Components/DisplaySearch";

const Home = () => {

    const [searchValue, setSearchValue] = useState("")

    const handleSearchContent = (e) => {
        e.preventDefault()
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
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    ></input>
                    <button className={style.buttonSearch} >SEARCH</button>
                </form>
            </div>
            {
                

            }
        </div>
    )
}

export default Home;