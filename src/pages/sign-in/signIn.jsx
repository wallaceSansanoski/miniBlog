import { useState } from "react";
import style from './signIn.module.css'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../Firebase/config'
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {

    const provider = new GoogleAuthProvider();

    const [emailUser, setEmailUser] = useState("")
    const [passwordUser, setPasswordUser] = useState("")
    const [messageToUser, setMessageToUser] = useState("")
    const [ toggle, setToggle ] = useState(false)

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

            if (response) {
                const navigate = useNavigate()
                navigate('/')
            }

        } catch (error) {

            if (error.message.includes('email')) {
                setMessageToUser('Invalid email format')
            }

            if (error.message.includes('invalid-login-credentials')) {
                setMessageToUser('Credentials invalid, try again.')
            }
        }

        setEmailUser("")
        setPasswordUser("")
    }

    return (
        <div className={style.containerSignIn}>
            <h1>sign-in</h1>
            <form onSubmit={handleSutmitSignIn}>
                <label htmlFor="email">email:</label>
                <input
                    className={style.input}
                    type="text"
                    name="email"
                    placeholder="type your email"
                    value={emailUser}
                    onChange={(e) => {
                        setEmailUser(e.target.value)
                        setMessageToUser("")
                    }}>
                </input>
                <label className={style.label}
                > password:
                    <input 
                        className={style.input}
                        type={toggle ? 'text' :'password'}
                        placeholder="type your password"
                        value={passwordUser}
                        onChange={(e) => {
                            setPasswordUser(e.target.value)
                            setMessageToUser("")
                        }}>
                    </input>
                    { !toggle &&  (
                        <AiFillEye 
                        onClick={() => setToggle(true)}
                        className={style.icon}
                        />
                    )}
                    { toggle &&  (
                        <AiFillEyeInvisible
                        onClick={() => setToggle(false)}
                        className={style.icon}
                        />
                    )}
                </label>
               
                <button className="btn">submit</button>
            </form>
            <div className={style.access}>
                <NavLink className={style.createAccont} to='/signUp'>create new accont</NavLink>
                <NavLink className={style.google} onClick={handleAccessWithGooogle} >access with google</NavLink>
            </div>
            {messageToUser && <p className="warningMessage">{messageToUser}</p>}
        </div>
    )
}

export default Login;