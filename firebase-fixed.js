
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZjFrVRUxmIfyYHxihzndc6czss-NdHcg",
    authDomain: "allnewyonogamessite.firebaseapp.com",
    projectId: "allnewyonogamessite",
    storageBucket: "allnewyonogamessite.firebasestorage.app",
    messagingSenderId: "456817262685",
    appId: "1:456817262685:web:0966ee32453f8d7daccdb4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadFirebaseGames() {

    try {

        console.log("🔥 Connecting to gan collection...");

        const snapshot = await getDocs(
            collection(db, "gan")
        );

        const games = [];

        snapshot.forEach((doc) => {

            games.push({
                id: doc.id,
                ...doc.data()
            });

        });

        console.log("🔥 GAN GAMES:", games.length);
        console.log(games);

        if (typeof window.renderFirebaseGames === "function") {

            window.renderFirebaseGames(games);

        } else {

            console.error("❌ renderFirebaseGames not found");

        }

    } catch (error) {

        console.error("❌ FIREBASE ERROR:", error);

        alert("Firebase Error: " + error.message);

    }

}

window.addEventListener("load", () => {

    setTimeout(() => {

        loadFirebaseGames();

    }, 500);

});
