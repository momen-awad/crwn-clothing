import { createContext, useState , useEffect } from 'react';
import { onAuthStateChangedListner, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

export const userContext = createContext({
    currentUser:null,
    setCurrentUser : () => null,
})

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    useEffect(() => {
        const unsubscrib = onAuthStateChangedListner((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscrib;
    },[])

    return <userContext.Provider value={value}>{children}</userContext.Provider>
}

