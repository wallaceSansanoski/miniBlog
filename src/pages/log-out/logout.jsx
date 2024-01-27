import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { useNavigate, redirect} from "react-router";


const Logout = () => {
  
  const navigate = useNavigate()

  signOut(auth)
    .then(() => {
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
}
export default Logout