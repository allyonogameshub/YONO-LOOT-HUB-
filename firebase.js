// =====================================
// FIREBASE — SAME DATABASE AS MANAGE GAMES
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


// =====================================
// FIREBASE CONFIG
// =====================================

const firebaseConfig = {
    apiKey: "AIzaSyCZjFrVRUxmIfyYHxihzndc6czss-NdHcg",
    authDomain: "allnewyonogamessite.firebaseapp.com",
    projectId: "allnewyonogamessite",
    storageBucket: "allnewyonogamessite.firebasestorage.app",
    messagingSenderId: "456817262685",
    appId: "1:456817262685:web:0966ee32453f8d7daccdb4"
};


// =====================================
// FIREBASE START
// =====================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// =====================================
// LOAD MANAGE GAMES
// IMPORTANT: collection = games
// =====================================

async function loadGames() {

    try {

        console.log("🔥 Connecting to Manage Games Firebase...");

        const snapshot = await getDocs(
            collection(db, "games")
        );

        const games = [];

        snapshot.forEach(doc => {

            games.push({
                id: doc.id,
                ...doc.data()
            });

        });


        console.log("✅ Firebase games loaded:", games.length);


        // =====================================
        // SEND GAMES TO EXISTING RENDERER
        // =====================================

        if (typeof window.renderFirebaseGames === "function") {

            window.renderFirebaseGames(games);

            console.log(
                "✅ Games rendered:",
                games.length
            );

        } else {

            // Renderer not ready yet
            console.log(
                "⏳ Waiting for game renderer..."
            );

            setTimeout(loadGames, 100);

        }

    } catch (error) {

        console.error(
            "❌ Firebase Error:",
            error
        );


        // NO ALERT
        // Show error only inside game area

        const container =
            document.getElementById("firebaseGamesList");

        if (container) {

            container.innerHTML = `
                <div class="game-card firebase-game-card">
                    <div class="game-left">
                        <div class="game-info">
                            <h3>Games temporarily unavailable</h3>
                            <small>Please try again.</small>
                        </div>
                    </div>
                </div>
            `;

        }

    }

}


// =====================================
// START AFTER PAGE LOAD
// =====================================

window.addEventListener("load", () => {

    loadGames();

});
