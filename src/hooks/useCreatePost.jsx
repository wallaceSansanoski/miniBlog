import { useReducer, useEffect, useState } from "react"
import { auth, db } from "../Firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore";


const initialState = {
    loading: false,
    error: false,
    insert: null
}

const insertDocumentReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                insert: false,
                loading: true,
                error: false,
            }
        case 'INSERTDOC':
            return {
                insert: 'DOCUMENT WAS SUCESSFULLY CREATED',
                loading: false,
                error: false,
            }
        case 'ERROR':
            return {
                insert: false,
                loading: false,
                error: action.error
            }
        case 'RESET':
            return {
                insert: null,
                loading: false,
                error: false
            }
        default:
            return {
                state
            }
    }
}

export const useCreatePost = () => {

    const [errorURL, setErrorURL] = useState(null)
    const [response, dispatch] = useReducer(insertDocumentReducer, initialState)

    const createPost = async (document, docCollection) => {

        dispatch({
            type: 'LOADING'
        })

        const newDocument = {
            ...document,
            createAt: Timestamp.now(),
            userID: auth.currentUser.uid
        }

        try {

            if(!URL.canParse(document.image)){
                setErrorURL('INVALID URL. TRY AGAIN.')
                    dispatch({ type: 'RESET' })
                    return
            }

            await addDoc(collection(db, docCollection), newDocument);

            dispatch({
                type: 'INSERTDOC'
            })

        } catch (error) {

            dispatch({
                type: 'ERROR',
                error: error.message
            })
        }

    }

    useEffect(() => {
        return () => dispatch({ type: 'RESET' })
    }, [document])

    return { createPost, response, errorURL, setErrorURL }
}

export default useCreatePost;