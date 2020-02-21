import { useEffect } from 'react';
import { onAuthStateChanged } from './helpers';
import { useAppState } from './app-state';

type AuthType = {
    displayName: String;
    photoURL: String;
    uid: String;
};

export default function useAuth() {
    const [{ authAttempted, auth }, dispatch] = useAppState();
    useEffect(() => {
        return onAuthStateChanged((auth: AuthType) => {
            if (auth) {
                const { displayName, photoURL, uid } = auth;
                dispatch({
                    type: 'AUTH_CHANGE',
                    auth: { displayName, photoURL, uid }
                });
            } else {
                dispatch({ type: 'AUTH_CHANGE', auth: null });
            }
        });
    }, [dispatch]);

    return { authAttempted, auth };
}
