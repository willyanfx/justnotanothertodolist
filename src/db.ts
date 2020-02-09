import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
};

firebase.initializeApp(config);

export const db = firebase.firestore();

export const auth = () => firebase.auth();

export const mode = 'real';
