import style from './signUp.module.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/config'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const SignUp = () => {

    const [nameUser, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [messageToUser, setMessageToUser] = useState("")
    const [confirmCreateUserMessage, setConfirmCreateUserMessage] = useState("")
    const [isUserCreated, setIsUserCreated] = useState(false)
    const [ toggle, setToggle ] = useState(false)
    const [ toggle2, setToggle2 ] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessageToUser("Password should match.")
            return
        }

        try {
            const responseUser = await createUserWithEmailAndPassword(auth, email, password)

            if (responseUser) {
                const navigate = useNavigate()
                navigate('/')
            }

            if (responseUser.operationType) {
                setIsUserCreated(true)
                setConfirmCreateUserMessage('User created.')

                setTimeout(() => {
                    setIsUserCreated(false)
                }, 4000)
            }

        } catch (error) {

            if (error.message.includes('email')) {
                setMessageToUser('Invalid email format')
            }
            if (error.message.includes('password')) {
                setMessageToUser('Password should be at least 6 characters')
            }
            if (error.message.includes('email-already-in-use')) {
                setMessageToUser('User email already in use')
            }
        }

        setConfirmPassword("")
        setEmail("")
        setPassword("")
    }

    return (
        <div className={style.containerSignup}>
            <h1>sign-up</h1>
            <p className={style.p}>hep the word with new ideas</p>
            <form onSubmit={handleSignUp}>
                <label htmlFor='name'>your name</label>
                <input
                    className={style.input}
                    type="text"
                    name="name"
                    value={nameUser}
                    placeholder="TYPE YOUR NAME"
                    required
                    onChange={(e) => {
                        setName(e.target.value)
                        setMessageToUser("")
                    }}>
                </input>
                <label htmlFor='email'>email</label>
                <input
                    className={style.input}
                    type="text"
                    name="email"
                    value={email}
                    placeholder="type your email"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setMessageToUser("")
                    }}>

                </input>
                <label className={style.label}
                >password
                    <input
                        className={style.input}
                        type={toggle2 ? "text" : "password"}
                        value={password}
                        placeholder="type your password"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setMessageToUser("")
                        }}>
                    </input>
                    {!toggle2 && (
                         <AiFillEye 
                            className={style.icon}
                            onClick={() => setToggle2(true)}
                         /> 
                    )}
                    {toggle2 && (
                         <AiFillEyeInvisible
                         className={style.icon}
                         onClick={() => setToggle2(false)}
                          />
                    )}
                </label>
                <label  className={style.label}
                >confirm password
                    <input
                        className={style.input}
                        type={toggle ? 'text' :'password'}
                        value={confirmPassword}
                        placeholder="type your password again"
                        required
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            setMessageToUser("")
                        }}>
                    </input>
                    {!toggle && (
                         <AiFillEye 
                         className={style.icon}
                            onClick={() => setToggle(true)}
                         /> 
                    )}
                    {toggle && (
                         <AiFillEyeInvisible
                         className={style.icon}
                         onClick={() => setToggle(false)}
                          />
                    )}
                </label>
                <button className='btn'>create</button>
            </form>
            {messageToUser && <p className="warningMessage">{messageToUser}</p>}
            {isUserCreated && <p className="sucessMessage">{confirmCreateUserMessage}</p>}
        </div>
    )
}

export default SignUp;