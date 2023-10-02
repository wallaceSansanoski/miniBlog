import { signOut } from "firebase/auth";
import { auth } from "../Firebase/config";


const Logout = () => {

    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });

}
export default Logout