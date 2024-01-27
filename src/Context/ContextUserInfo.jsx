import { createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/config';

export const  UserInfoContext = createContext()

export const UserInfoContextProvider = ({children}) => {
    const [ userAuth, setUserAuth ] = useState("")
    
    onAuthStateChanged(auth, (user) => {
        setUserAuth(user)
    
    })
    
    return (
        <UserInfoContext.Provider value={userAuth}> {children} </UserInfoContext.Provider>
    ) 
}

export default UserInfoContext;