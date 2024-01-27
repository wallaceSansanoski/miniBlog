import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

///COMPONENTS
import Navibar from "./Components/Navibar"

import { UserInfoContext } from "./Context/ContextUserInfo"

///PAGES
import Home from './pages/home/home'
import Login from './pages/sign-in/signIn'
import About from './pages/about/about'
import NotFound from './pages/notFound/Notfound'
import Footer from "./Components/Footer"
import SignUp from "./pages/sign-up/signUp"
import Logout from "./pages/log-out/logout"
import Create from "./pages/create/create"
import Dashboard from "./pages/dashboard/dashboard"
import SinglePost from "./pages/single-post/singlePost"
import Update from "./pages/update/update"

//CSS
import './App.css'

///hook
import { useContext } from "react"

function App() {

    const userAuth = useContext(UserInfoContext)

    return (
        <>
            <div className="container">
                <BrowserRouter>
                    <Navibar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={userAuth ? <Create /> : <Navigate to='/sign-in' />} />
                        <Route path="/sign-in" element={userAuth ? <Navigate to='/' /> : <Login />} />
                        <Route path="/signup" element={userAuth ? <Navigate to='/' /> : <SignUp />} />
                        <Route path="/dashboard" element={userAuth ? <Dashboard /> : <Navigate to={"/"} />} />
                        <Route path="/post/update/:id" element={userAuth ? <Update /> : <Navigate to={"/"} />} />
                        <Route path="/about" element={<About />} />
                        <Route path='/post/:id' element={<SinglePost />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />  
                </BrowserRouter>
            </div>
        </>
    )
}

export default App;