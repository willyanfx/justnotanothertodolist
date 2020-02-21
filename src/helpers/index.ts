import { collatedTasks } from '../constants';
import { db, auth } from '../db';

export { auth, db };

export const collatedTasksExist = (selectedProject: string) =>
    collatedTasks.find(task => task.key === selectedProject);

export function onAuthStateChanged(callback: any) {
    return auth.onAuthStateChanged(callback);
}

export function logout() {
    return auth.signOut();
}

export function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
}
type signUpProp = {
    email: string;
    password: string;
    displayName: string;
    photoURL: string;
};

export async function signup({
    email,
    password,
    displayName = 'No Name',
    photoURL
}: signUpProp) {
    try {
        console.log(password);
        const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        await user?.updateProfile({ displayName, photoURL });
        await db.doc(`users/${user?.uid}`).set({
            displayName: displayName,
            photoURL: photoURL,
            uid: user?.uid
        });
    } catch (error) {
        throw error;
    }
}
