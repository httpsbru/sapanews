import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const firebaseConfig = {

    apiKey: "AIzaSyBQuNS6onEXrIytikIWDn02b901QQHUxXc",

    authDomain: "sapanews-38bce.firebaseapp.com",

    projectId: "sapanews-38bce",

    storageBucket: "sapanews-38bce.firebasestorage.app",

    messagingSenderId: "219322782080",

    appId: "1:219322782080:web:b260e0f28bb0e0c247b165"

};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);


export {
    db,
    storage,
    auth
};