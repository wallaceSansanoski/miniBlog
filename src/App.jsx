import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom"

///COMPONENTS
import Navibar from "./Components/Navibar"
import { UserInfoContext } from "./Context/ContextUserInfo"

///PAGES
import Home from './pages/home'
import Login from './pages/signIn'
import About from './pages/about'
import NotFound  from './pages/Notfound'
import Footer from "./Components/Footer"
import SignUp from "./pages/signUp"
import Logout from "./pages/logout"
import Create from "./pages/create"
import Dashboard from "./pages/dashboard"

//CSS
import './App.css'

//firebase

import { auth } from './Firebase/config'
import { onAuthStateChanged } from "firebase/auth"

///hook

import { useState} from "react"

function App ()  {

    const [ userAuth, setUserAuth ] = useState("")
 
    onAuthStateChanged(auth, (user) => {
        setUserAuth(user)
    })

    return (
        <>
            <BrowserRouter>
                <UserInfoContext.Provider value={{ userAuth }}>
                    <Navibar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/create" element={userAuth ? <Create /> : <Navigate to='/sign-in' />} />
                            <Route path="/sign-in" element={userAuth ? <Navigate to='/' /> : <Login />} />
                            <Route path="/signup" element={userAuth ? <Navigate to='/' /> : <SignUp />} />
                            <Route path="/dashboard" element={userAuth ? <Dashboard/> : <Navigate to={"/"}/>} />
                            <Route path="/about" element={<About />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </UserInfoContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default  App;