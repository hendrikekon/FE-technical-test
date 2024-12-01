import { userLogout } from '../features/Auth/actions';

let previousToken = null;

const authMiddleware = (store) => (next) => (action) => { 
    const result = next(action); // Let the action passingd

    // Get the current state token
    const state = store.getState();
    const token = state.auth.token;

    // Check the token to Prevent infinite loop of the userLogout() redux
    if (token !== previousToken) {
        previousToken = token;

        // If the token is removed (logged out), dispatch userLogout()
        // Logout user when token is expired or invalid
        if (!token) {
            if (action.type !== 'Auth/userLogout') {
                
                store.dispatch(userLogout());
            }
        }
    }

    return result;
};

export default authMiddleware;
