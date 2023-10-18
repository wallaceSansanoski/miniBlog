import style from './signUp.module.css'

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/config'

import { useState } from 'react';
import { useNavigate } from 'react-router';


const SignUp = () => {

    const [nameUser, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [messageToUser, setMessageToUser] = useState("")
    const [confirmCreateUserMessage, setConfirmCreateUserMessage] = useState("")
    const [isUserCreated, setIsUserCreated] = useState(false)

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
        <div className='allContainers'>
            <h1>SIGN-UP</h1>
            <p className={style.p}>HELP THE WORLD GROW WITH NEW IDEAS</p>
            <form onSubmit={handleSignUp}>
                <label htmlFor='name'>YOUR NAME</label>
                <input
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
                <label htmlFor='email'>EMAIL</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="TYPE YOUR EMAIL"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setMessageToUser("")
                    }}>

                </input>
                <label htmlFor='password'>PASSWORD</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="TYPE YOUR PASSWORD"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setMessageToUser("")
                    }}>
                </input>
                <label htmlFor='confirmPassword'>CONFIRM PASSWORD</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="TYPE YOUR PASSWORD AGAIN"
                    required
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        setMessageToUser("")
                    }}>
                </input>
                <button className='btn'>CREATE</button>
            </form>
            {messageToUser && <p className="warningMessage">{messageToUser}</p>}
            {isUserCreated && <p className="sucessMessage">{confirmCreateUserMessage}</p>}
        </div>
    )
}

export default SignUp;