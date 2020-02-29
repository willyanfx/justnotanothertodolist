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

export const fetchDoc = limitCalls(function fetchDoc(path: string) {
    return db
        .doc(path)
        .get()
        .then(doc => doc.data());
});

function limitCalls(fn: any, limit: number = 20) {
    let calls = 0;
    return (...args: any) => {
        calls++;
        if (calls > limit) {
            throw new Error(
                `EASY THERE: You've called "${fn.name}" too many times too quickly`
            );
        } else {
            setTimeout(() => {
                calls = 0;
            }, 3000);
        }

        return fn(...args);
    };
}

function getDataFromDoc(doc: any) {
    return { ...doc.data(), id: doc.id };
}

type Docs = {
    archived: boolean;
    id: string;
    projectId: string;
    task: string;
    uid: string;
};

function getDocsFromSnapshot(snapshot: any) {
    let docs: Docs[] = [];

    snapshot.forEach((doc: any) => {
        docs.push(getDataFromDoc(doc));
    });
    return docs;
}

export const subscribeTo = limitCalls(function subscribeTo(
    uid: string,
    callback: Function
) {
    let collection = db.collection('tasks').where('uid', '==', uid);
    return collection.onSnapshot(snapshot =>
        callback(getDocsFromSnapshot(snapshot))
    );
});

export const fetchTasks = limitCalls(function fetchTasks(uid: string) {
    return db
        .collection('tasks')
        .orderBy('createdAt')
        .where('uid', '==', uid)
        .get()
        .then(getDocsFromSnapshot);
});

export async function createTask(task: any) {
    return db
        .collection('tasks')
        .add({ createdAt: Date.now(), ...task })
        .then(ref => ref.get())
        .then(doc => ({ ...doc.data(), id: doc.id }));
}
