import { NavLink } from 'react-router-dom'
import style from './Navibar.module.css'

const Navibar = () => {
    return (
        <div className={style.containerNavibar}>
            <NavLink className={style.link} to='/' >HOME</NavLink>
            <NavLink className={style.link} to='/about'>ABOUT</NavLink>
            <NavLink className={style.link} to='/sign-in'>SIGN IN</NavLink>
        </div>
    )
}

export default Navibar;