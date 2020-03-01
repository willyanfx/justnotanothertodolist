import { collatedTasks } from '../constants';
import { db, auth } from '../db';
import { AddTask } from '../types';

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

function filterTasks(
    collection: firebase.firestore.Query<firebase.firestore.DocumentData>,
    selectedProject: string
) {
    // TODO: filter everything if not inbox
    if (selectedProject && !collatedTasksExist(selectedProject)) {
        collection.where('projectId', '==', selectedProject);
    } else if (selectedProject === 'TODAY') {
        return collection;
        // collection = collection.where('date', '==', Date.now());
    } else if (selectedProject === 'INBOX') {
        collection = collection.where('date', '==', '');
    }
    return collection;
}

export const subscribeTo = limitCalls(function subscribeTo(
    uid: string,
    type: string,
    callback: Function
) {
    let selectedProject = 'TODAY';
    let collection = db.collection(type).where('uid', '==', uid);
    collection = filterTasks(collection, selectedProject);

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

export const fetchProject = limitCalls(function fetchTasks(uid: string) {
    return db
        .collection('projects')
        .where('uid', '==', uid)
        .orderBy('projectId')
        .get()
        .then(getDocsFromSnapshot);
});

export async function createDoc(task: AddTask, collected: string) {
    return db
        .collection(collected)
        .add({ createdAt: Date.now(), ...task })
        .then(ref => ref.get())
        .then(doc => ({ ...doc.data(), id: doc.id }));
}

export async function deleteProject(docId: string) {
    return db.doc(`projects/${docId}`).delete();
}
export async function doneTask(docId: string) {
    console.log(docId);
    return db.doc(`tasks/${docId}`).update({
        archived: true
    });
}
export async function deleteTask(docId: string) {
    return db.doc(`tasks/${docId}`).delete();
}
