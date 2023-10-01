import { BrowserRouter,Routes, Route } from "react-router-dom"

///COMPONENTS
import Navibar from "./Components/Navibar"

///PAGES
import Home from './pages/home'
import Login from './pages/signIn'
import About from './pages/about'
import NotFound  from './pages/Notfound'
import Footer from "./Components/Footer"
import SignUp from "./pages/signUp"

//CSS
import './App.css'

function App ()  {
    return (
        <>
            <BrowserRouter>
                <Navibar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign-in" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/signup" element={<SignUp/>}/>
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default  App;