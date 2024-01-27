import { NavLink } from 'react-router-dom';
import style from './about.module.css'
import { useContext } from 'react';
import { UserInfoContext } from '../../Context/ContextUserInfo';

const About = () => {

    const userAuth  = useContext(UserInfoContext)
    
    return (
       <div className={style.container}> 
            <h1 className={style.h1}>ABOUT THIS PROJECT</h1>
            <p>THIS PROJECT WAS CREATED TO SHARE NEW IDEAS AND KNOWLEDGE</p>
            <span>START NOW SHARING NEW IDEAS</span>
            <NavLink to={userAuth ? '/create' : '/sign-in'} className='btn'>SHARE</NavLink>
            <p className={style.usedFeatures}>THIS PROJECT WAS DEVELOPED WITH  FIREBASE IN BACK-END AND REACT JS IN FRONT-END</p>
       </div>
    )
}

export default About;