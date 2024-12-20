

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1wX8J1nUt6iCjULW2qDQ9KmPo9W9r7mc",
    authDomain: "photo-recom.firebaseapp.com",
    projectId: "photo-recom",
    storageBucket: "photo-recom.firebasestorage.app",
    messagingSenderId: "736024068768",
    appId: "1:736024068768:web:b30f5af7df6ba2f815ffc5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    const userTab = document.querySelector(".user-name")
    const loginBtn = document.querySelector(".login-btn")
    const logoutBtn = document.querySelector(".logout-btn")
    const profileBtn = document.querySelector(".profile-button")
    if (user) {
        loginBtn.classList.toggle('hidden')
        profileBtn.classList.toggle('hidden')
        renderUserData(user.uid)
        logoutBtn.addEventListener('click', ()=>logoutUser())
    } else {

    }
  });

  function logoutUser() {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        alert("You have been logged out.");
      })
      .catch((error) => {
        console.error("Error during logout:", error.message);
        alert("Logout failed: " + error.message);
      });
  }
async function addToWatchlist(movieId) {
    const user = auth.currentUser;

    if (user) {
        const userDocRef = doc(db, "users", user.uid);


        await setDoc(userDocRef, {
            watchlist: arrayUnion(movieId) 
        }, { merge: true }); 
        console.log("Movie added to watchlist!");
    } else {
        console.log("User not authenticated");
    }
}

async function addToLikedMovies(movieId) {
    const user = auth.currentUser;

    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
            likedMovies: arrayUnion(movieId)
        });
        console.log("Movie added to liked movies!");
    } else {
        console.log("User not authenticated");
    }
}

async function getWatchlist() {
    const user = auth.currentUser;

    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const watchlist = docSnap.data().watchlist || [];
            console.log("Watchlist:", watchlist);
            return watchlist;
        } else {
            console.log("No watchlist data found");
            return [];
        }
    } else {
        console.log("User not authenticated");
    }
}

async function getLikedMovies() {
    const user = auth.currentUser;

    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const likedMovies = docSnap.data().likedMovies || [];
            console.log("Liked Movies:", likedMovies);
            return likedMovies;
        } else {
            console.log("No liked movies data found");
            return [];
        }
    } else {
        console.log("User not authenticated");
    }
}






export const signUp = async (firstName, lastName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;


        await setDoc(doc(db, "users", user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
        });

        alert("User signed up successfully!");

        setTimeout(()=> {
            window.location.href = 'login.html'
        }, 2000)
    } catch (error) {
        console.error("Error during signup:", error.message);
        alert(error.message);
    }
}


const signUpForm = document.querySelector('#signup-form')
const loginForm = document.querySelector('#signin-form')

signUpForm?.addEventListener('submit', (e) => {

    e.preventDefault();

    const [firstname, lastname, email, password] = [...document.querySelectorAll('form input')]

    signUp(firstname.value, lastname.value, email.value, password.value)

});

const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert(`Welcome back, ${user.email}!`);
        console.log("User signed in:", user);
        setTimeout(() => {
            window.location.href = '/index.html'
        }, 2000);

    } catch (error) {
        console.error("Error during sign-in:", error.message);
        alert("Sign-in failed: " + error.message);
    }
}

loginForm?.addEventListener('submit', (e) => {

    e.preventDefault();

    const [email, password] = [...document.querySelectorAll('form input')]

    signIn(email.value, password.value)

});


async function renderUserData(uid) {

    try {
      const userDoc = await getDoc(doc(db, "users", uid));
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(userData);
        
        document.querySelector(".user-name").innerHTML = `
        <i class="fa-solid fa-user"></i> 
        ${userData.firstName} ${userData.lastName}

        `;
      } else {
        console.log("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  }