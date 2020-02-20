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
