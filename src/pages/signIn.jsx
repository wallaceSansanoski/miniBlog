///HOOKS
import { useState } from "react";

//CSS
import style from './signIn.module.css'

//firebase
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/config'

import { NavLink } from "react-router-dom";

const Login = () => {

    const [ emailUser, setEmailUser ] = useState("")
    const [ passwordUser, setPasswordUser ] = useState("")
    const [ messageToUser, setMessageToUser ] = useState("")
    

    const handleSutmitSignIn = async (e) => {
        e.preventDefault()

        try {
         const responseUser = await createUserWithEmailAndPassword(auth, emailUser, passwordUser)
            
        } catch (error) {

            if(error.message.includes('email')){
                setMessageToUser('Invalid email format')
            }
            if(error.message.includes('password')){
                setMessageToUser('Password should be at least 6 characters')
            }
            if(error.message.includes('email-already-in-use')){
                setMessageToUser('User email already in use')
            }
            console.log(error)
        }

        setEmailUser("")
        setPasswordUser("")
    }

    return (
        <div className={style.containerSignIn}>
            <h1 className={style.h1}>SIGN-IN</h1>
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
            <NavLink to='/signUp'>CREATE NEW ACCOUNT</NavLink>
            {messageToUser && <p className="warningMessage">{messageToUser}</p>}
        </div>
    )
}

export default Login;