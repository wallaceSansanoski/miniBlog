import { useReducer } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase/config'

const initialState = {
    loading: false,
    isDeleteDoc: null,
    error: false
}

const reducerDelete = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                isDeleteDoc: null,
                error: false
            }
        case 'DELETING':
            return {
                loading: false,
                isDeleteDoc: true,
                error: false
            }
        case 'ERROR':
            return {
                loading: false,
                isDeleteDoc: null,
                error: true
            }
        case 'RESET':
            return {
                loading: false,
                isDeleteDoc: null,
                error: false
            }
        default : 
            return state
    }
}

export const useDeleteDoc = ( id ) => {
    
    const [ state, dispatch ] = useReducer(reducerDelete, initialState)


    const deletingDoc = async () => {

        dispatch({ type:'LOADING'})

        try {

           await deleteDoc(doc(db, "posts", id))

        //    dispatch({ type: 'DELETING' })


        } catch (error) {
            dispatch({type : 'ERROR'})
        }

    }
    
    return { deletingDoc, state }
}   

export default useDeleteDoc;