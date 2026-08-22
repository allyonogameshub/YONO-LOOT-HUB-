// =====================================
// FIREBASE IMPORTS
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// =====================================
// YONOGAMESHUB FIREBASE
// =====================================

const firebaseConfig = {
  apiKey: "AIzaSyCZjFrVRUxmIfyYHxihzndc6czss-NdHcg",
  authDomain: "allnewyonogamessite.firebaseapp.com",
  projectId: "allnewyonogamessite",
  storageBucket: "allnewyonogamessite.firebasestorage.app",
  messagingSenderId: "456817262685",
  appId: "1:456817262685:web:0966ee32453f8d7daccdb4",
  measurementId: "G-2QW7YJJNG0"
};

// =====================================
// INITIALIZE FIREBASE
// =====================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore Collection
const gamesRef = collection(db, "games");

console.log("✅ YONOGAMESHUB Firebase Connected");
// =====================================
// LOAD GAMES FROM FIRESTORE
// =====================================

async function loadGames() {

    try {

        const snapshot = await getDocs(
  query(gamesRef, orderBy("order"))
);

        const games = [];

        snapshot.forEach((doc) => {

            games.push({

                id: doc.id,
                ...doc.data()

            });

        });

        console.log("✅ Games Loaded:", games);

        if (typeof window.renderFirebaseGames === "function") {

    
    window.renderFirebaseGames(games);

} else {

            console.error("renderFirebaseGames is not defined");

        }

    } catch (error) {

        console.error("❌ Firestore Error:", error);

    }

}

// =====================================
// AUTO LOAD
// =====================================

window.addEventListener("load", () => {
    const waitForRenderer = () => {
        if (typeof window.renderFirebaseGames === "function") {
            loadGames();
        } else {
            setTimeout(waitForRenderer, 100);
        }
    };
    waitForRenderer();
});
