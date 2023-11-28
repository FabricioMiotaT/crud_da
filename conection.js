// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getFirestore, 
    collection, 
    addDoc, 
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGXw9oMarn2IRnozbdU2YsyYz1fblDMdw",
  authDomain: "da-crud.firebaseapp.com",
  projectId: "da-crud",
  storageBucket: "da-crud.appspot.com",
  messagingSenderId: "1050289376567",
  appId: "1:1050289376567:web:ca1473bf52bc70f9679eb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();



export const saveTask = (title, description) => {
    addDoc(collection(db, "tasks"), {
        title,
        description
    })
}

export const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map(doc => doc.data());
}

export const onGetTasks = (callback) => {
    onSnapshot(collection(db, "tasks"), callback)
}

export const deleteTask = (id) => {
    deleteDoc(doc(db, "tasks", id))
}

export const getTask = async (id) => {
    const taskDoc = await getDoc(doc(db, "tasks", id));
    return taskDoc;
}

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export { onSnapshot,
    db,
    collection }