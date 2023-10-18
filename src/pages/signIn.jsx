///HOOKS
import { useState } from "react";

//CSS
import style from './signIn.module.css'

//firebase
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from '../Firebase/config'

import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {

    const provider = new GoogleAuthProvider();

    const [ emailUser, setEmailUser ] = useState("")
    const [ passwordUser, setPasswordUser ] = useState("")
    const [ messageToUser, setMessageToUser ] = useState("")

    const handleAccessWithGooogle = async () => {
        
        try {

            const result = await signInWithPopup(auth, provider)
            GoogleAuthProvider.credentialFromResult(result);

        } catch (error) {
            setMessageToUser("The email of the user's account used.")
        }

    }
    

    const handleSutmitSignIn = async (e) => {
        e.preventDefault()

        try {
         const response = await signInWithEmailAndPassword(auth, emailUser, passwordUser)

         if(response) {
            const navigate = useNavigate()
            navigate('/')
         }

        } catch (error) {

            if(error.message.includes('email')){
                setMessageToUser('Invalid email format')
            }

            if(error.message.includes('invalid-login-credentials')){
                setMessageToUser('Credentials invalid, try again.')
            }
        }

        setEmailUser("")
        setPasswordUser("")
    }

    return (
        <div className='allContainers'>
            <h1>SIGN-IN</h1>
            <form onSubmit={handleSutmitSignIn}>
                <label htmlFor="email">EMAIL:</label>
                <input
                    type="text"
                    name="email"
                    placeholder="TYPE YOUR EMAIL"
                    value={emailUser}
                    onChange={(e) => {
                        setEmailUser(e.target.value)
                        setMessageToUser("")
                    }}>
                </input>
                <label htmlFor="password">PASSWORD:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="TYPE YOUR PASSWORD"
                    value={passwordUser}
                    onChange={(e) => {
                        setPasswordUser(e.target.value)
                        setMessageToUser("")
                    }}>
                </input>
                <button className="btn">SUBMIT</button>
            </form>
            <div className={style.access}>
                <NavLink to='/signUp'>CREATE NEW ACCOUNT</NavLink>
                <NavLink onClick={handleAccessWithGooogle} >ACCESS WITH GOOGLE</NavLink>
            </div>
            {messageToUser && <p className="warningMessage">{messageToUser}</p>}
        </div>
    )
}

export default Login;