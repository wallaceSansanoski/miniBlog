import { NavLink } from 'react-router-dom'
import style from './Navibar.module.css'
import { useContext, useState } from 'react'
import { UserInfoContext } from '../Context/ContextUserInfo'
import HanburguerMenu from './HanburgerMenu'

const Navibar = () => {

    const { userAuth } = useContext(UserInfoContext)

    const [hamburgerToggle, setHamburguerToggle] = useState(false)
    const [iconCloseMenu, setIconCloseMenu] = useState(true)


    const handleClickMenu = () => {
        setHamburguerToggle(!hamburgerToggle)
        setIconCloseMenu(!iconCloseMenu)
        
    }

    const handleClickOpenOrCloseMenu = () => {

        setIconCloseMenu(!iconCloseMenu)
        setHamburguerToggle(!hamburgerToggle)

        if(window.screen.width >= 400){
            setIconCloseMenu(true)
            return 
        }

    }
    
    return (
        <div className={style.containerNavibar}>
            <ul 
            onClick={handleClickOpenOrCloseMenu}
            className={`${style.ul}  ${hamburgerToggle ? style.showMenu  : style.hideMenu} }`}
            >
                <li className={style.closeMenubar}>
                    <span className={style.x}>X</span>
                </li>

                <li className={style.li}>
                    <NavLink className={style.link} to='/'>HOME</NavLink>
                </li>

                {userAuth &&
                    <li className={style.li}>
                        <NavLink className={style.link} to='/dashboard'>DASHBOARD</NavLink>
                    </li>
                }

                {userAuth &&
                    <li className={style.li}>
                        <NavLink className={style.link} to='/create'>CREATE</NavLink>
                    </li>
                }

                {!userAuth &&
                    <li className={style.li}>
                        <NavLink className={style.link} to='/sign-in'>SIGN IN</NavLink>
                    </li>
                }

                <li className={style.li}>
                    <NavLink className={style.link} to='/about'>ABOUT</NavLink>
                </li>

                {userAuth &&
                    <li className={style.li}>
                        <NavLink className={style.link} to='/logout'>LOGOUT</NavLink>
                    </li>
                }
            </ul>
            <div className={`${style.hamburger} ${hamburgerToggle ? style.hideBurger : ''}`} onClick={handleClickMenu}>
                <HanburguerMenu />
            </div>
        </div>
    )
}

export default Navibar;