import { db } from "../Firebase/config"
import { collection, addDoc, } from "firebase/firestore"; 


export const insertContent = async (nameColletion, postInfo) => {
    
    await addDoc(collection(db, nameColletion), {
        ...postInfo
    });
}
