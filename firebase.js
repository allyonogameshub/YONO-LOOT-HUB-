// =====================================
// FIREBASE — SAME DATABASE AS MANAGE GAMES
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// This is the SAME Firebase project used by manage-games-updated.html.
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
const gamesRef = collection(db, "gan");

console.log("✅ Manage Games Firebase connected:", firebaseConfig.projectId);

async function loadGames() {
    try {

        firebaseContainer = document.getElementById("firebaseGamesList");

        const ganSnapshot = await getDocs(collection(db, "gan"));
        const gamesSnapshot = await getDocs(collection(db, "games"));

        const games = [];
        snapshot.forEach(doc => {
            games.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log(`✅ Games loaded: ${games.length}`);
        alert("Firebase se games aaye: " + games.length);
        if (typeof window.renderFirebaseGames === "function") {
            window.renderFirebaseGames(games);
        } else {
            console.error("❌ Game renderer not ready.");
        }
        } catch (error) {

        console.error("❌ Firestore Error:", error);

        const container = document.getElementById("firebaseGamesList");

        if (container) {
            container.innerHTML = `
                <div class="game-card firebase-game-card">
                    <div class="game-left">
                        <div class="game-info">
                            <h3>Games could not be loaded</h3>
                            <small>Please check Firebase rules / connection.</small>
                        </div>
                    </div>
                </div>`;
        }
    }
}

window.addEventListener("load", () => {

    const waitForRenderer = () => {

        if (typeof window.renderFirebaseGames === "function") {
            loadGames();
        } else {
            setTimeout(waitForRenderer, 50);
        }

    };

    waitForRenderer();

});

window.addEventListener("load", () => {
    const waitForRenderer = () => {
        if (typeof window.renderFirebaseGames === "function") {
            loadGames();
        } else {
            setTimeout(waitForRenderer, 50);
        }
    };

    waitForRenderer();
});
