import { NavLink } from 'react-router-dom'
import style from './Navibar.module.css'
import { useContext, useState } from 'react'
import { UserInfoContext } from '../Context/ContextUserInfo'
import HanburguerMenu from './HanburgerMenu'
import logo from '../image/logo.png'

const Navibar = () => {

    const  userAuth  = useContext(UserInfoContext)

    const [hamburgerToggle, setHamburguerToggle] = useState(false)
    const [iconCloseMenu, setIconCloseMenu] = useState(true)


    const handleClickMenu = () => {
        setHamburguerToggle(!hamburgerToggle)
        setIconCloseMenu(!iconCloseMenu)
        
    }

    const handleClickOpenOrCloseMenu = () => {

        const isScreemWidthMoreThan400px = window.screen.width >= 400

        setIconCloseMenu(!iconCloseMenu)
        setHamburguerToggle(!hamburgerToggle)

        if(isScreemWidthMoreThan400px){
            setIconCloseMenu(true)
            return 
        }

    }
    
    return (
        <div className={style.containerNavibar}>
             <div className={style.containerLogo}>
                <img className={style.logo} src={logo} alt='logo site image'/>
            </div>
            <ul 
            onClick={handleClickOpenOrCloseMenu}
            className={`${style.ul}  ${hamburgerToggle ? style.showMenu  : style.hideMenu} }`}
            >
                <li className={style.closeMenubar}>
                    <span className={style.x}>X</span>
                </li>

                <li className={style.li}>
                    <NavLink className="link" to='/'>HOME</NavLink>
                </li>

                {userAuth &&
                    <li className={style.li}>
                        <NavLink className="link" to='/dashboard'>DASHBOARD</NavLink>
                    </li>
                }

                {userAuth &&
                    <li className={style.li}>
                        <NavLink className="link" to='/create'>CREATE</NavLink>
                    </li>
                }

                {!userAuth &&
                    <li className={style.li}>
                        <NavLink className="link" to='/sign-in'>SIGN IN</NavLink>
                    </li>
                }

                <li className={style.li}>
                    <NavLink className="link" to='/about'>ABOUT</NavLink>
                </li>

                {userAuth &&
                    <li className={style.li}>
                        <NavLink className="link" to='/logout'>LOGOUT</NavLink>
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