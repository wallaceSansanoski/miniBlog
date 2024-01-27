import { db} from "../Firebase/config";
import { useState, useEffect } from 'react';
import { doc, getDoc  } from "firebase/firestore";

export const useFetchGetDocument = (id) => {

    const [ post, setPost ] = useState()

    useEffect(() => {

        const getPost = async () => {

            try {

                const docRef = doc(db,'posts', id);
                const post = await getDoc(docRef);
                setPost(post.data())
                
            } catch (error) {
                console.log(error.name)
            }
        }
        
        getPost()
        
    }, [ id ])

    return { post }
}

export default useFetchGetDocument;