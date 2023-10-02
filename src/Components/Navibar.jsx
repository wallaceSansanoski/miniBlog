import { NavLink } from 'react-router-dom'
import style from './Navibar.module.css'
import { useContext } from 'react'
import { UserInfoContext } from '../Context/ContextUserInfo'

const Navibar = () => {

    const { userAuth } = useContext(UserInfoContext)

    return (
        <div className={style.containerNavibar}>
            <NavLink className={style.link} to='/' >HOME</NavLink>
            {userAuth && <NavLink className={style.link} to='/about'>DASHBOARD</NavLink>}
            {userAuth && <NavLink className={style.link} to='/create'>CREATE</NavLink>}
            {!userAuth && <NavLink className={style.link} to='/sign-in'>SIGN IN</NavLink>}
            <NavLink className={style.link} to='/about'>ABOUT</NavLink>
            {userAuth && <NavLink className={style.link} to='/logout'>LOGOUT</NavLink>}
        </div>
    )
}

export default Navibar;