import { createContext, useReducer, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";

import { createAction } from "../../utils/firebase/reducer.utils";

const INITIAL_STATE = {
    currentUser: null
}

// The actual value we want to access
export const UserContext = createContext(INITIAL_STATE);

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch(
            createAction(
                USER_ACTION_TYPES.SET_CURRENT_USER,
                user
            ));
    }
    // const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}
