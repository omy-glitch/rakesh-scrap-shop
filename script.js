// --- 1. FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyCsPjAtWNHEyhAe4RWL_PsOXMwt_SiehDc",
  authDomain: "rakesh-scrap-shop.firebaseapp.com",
  databaseURL: "https://rakesh-scrap-shop-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rakesh-scrap-shop",
  storageBucket: "rakesh-scrap-shop.firebasestorage.app",
  messagingSenderId: "656363251094",
  appId: "1:656363251094:web:5c3fdc02643f9c85dee9b7",
  measurementId: "G-VBXQEDK0QS"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();
const auth = firebase.auth(); // Initialize Auth

// Default prices
const defaultPrices = {
    papers: 10, books: 13, cartoon: 12, glass: 4, iron: 20, tin: 12,
    aluminium: 120, steel: 45, carBat: 95, bikeBat: 85, plastic: 15
};

let currentPrices = {};

// --- 2. LISTEN FOR DATA ---
const pricesRef = database.ref('scrapPrices');
pricesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        currentPrices = data;
    } else {
        currentPrices = defaultPrices;
        pricesRef.set(defaultPrices);
    }
    updatePriceDisplays();
});

// --- 3. AUTHENTICATION STATE LISTENER ---
// This checks if you are logged in whenever the page loads
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in.
        console.log("Admin is logged in:", user.email);
        document.getElementById('adminPanel').style.display = 'block';
        document.getElementById('editForm').style.display = 'block';
        
        // Hide the login inputs since we are already logged in
        if(document.getElementById('adminEmail')) document.getElementById('adminEmail').style.display = 'none';
        if(document.getElementById('adminPassword')) document.getElementById('adminPassword').style.display = 'none';
        
        // Hide the Login button
        const loginBtn = document.querySelector('button[onclick="loginAdmin()"]');
        if(loginBtn) loginBtn.style.display = 'none';
        
        loadCurrentPricesToInputs();
    } else {
        // User is signed out.
        console.log("No admin logged in.");
        document.getElementById('adminPanel').style.display = 'none';
        document.getElementById('editForm').style.display = 'none';
        
        // Show login inputs again
        if(document.getElementById('adminEmail')) document.getElementById('adminEmail').style.display = 'inline-block';
        if(document.getElementById('adminPassword')) document.getElementById('adminPassword').style.display = 'inline-block';
        
        // Show the Login button
        const loginBtn = document.querySelector('button[onclick="loginAdmin()"]');
        if(loginBtn) loginBtn.style.display = 'inline-block';
    }
});

// --- 4. ADMIN FUNCTIONS ---

function showAdminLogin() {
    // Just show the panel container
    document.getElementById('adminPanel').style.display = 'block';
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

function loginAdmin() {
    // Get the email and password you typed
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }
    
    // Login with Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Welcome back, Admin!');
            // onAuthStateChanged will handle the UI
        })
        .catch((error) => {
            alert('Login Failed: ' + error.message);
        });
}

function logoutAdmin() {
    auth.signOut().then(() => {
        alert('Logged out!');
        closeAdminPanel();
    });
}

function loadCurrentPricesToInputs() {
    if(document.getElementById('papersPrice')) document.getElementById('papersPrice').value = currentPrices.papers;
    if(document.getElementById('booksPrice')) document.getElementById('booksPrice').value = currentPrices.books;
    if(document.getElementById('cartoonPrice')) document.getElementById('cartoonPrice').value = currentPrices.cartoon;
    if(document.getElementById('glassPrice')) document.getElementById('glassPrice').value = currentPrices.glass;
    if(document.getElementById('ironPrice')) document.getElementById('ironPrice').value = currentPrices.iron;
    if(document.getElementById('tinPrice')) document.getElementById('tinPrice').value = currentPrices.tin;
    if(document.getElementById('aluminiumPrice')) document.getElementById('aluminiumPrice').value = currentPrices.aluminium;
    if(document.getElementById('steelPrice')) document.getElementById('steelPrice').value = currentPrices.steel;
    if(document.getElementById('carBatPrice')) document.getElementById('carBatPrice').value = currentPrices.carBat;
    if(document.getElementById('bikeBatPrice')) document.getElementById('bikeBatPrice').value = currentPrices.bikeBat;
    if(document.getElementById('plasticPrice')) document.getElementById('plasticPrice').value = currentPrices.plastic;
}

function savePrices() {
    // Safety: Check if user is actually logged in before trying to save
    if (!auth.currentUser) {
        alert("You must be logged in to save!");
        return;
    }

    const newPrices = {
        papers: parseInt(document.getElementById('papersPrice').value) || 0,
        books: parseInt(document.getElementById('booksPrice').value) || 0,
        cartoon: parseInt(document.getElementById('cartoonPrice').value) || 0,
        glass: parseInt(document.getElementById('glassPrice').value) || 0,
        iron: parseInt(document.getElementById('ironPrice').value) || 0,
        tin: parseInt(document.getElementById('tinPrice').value) || 0,
        aluminium: parseInt(document.getElementById('aluminiumPrice').value) || 0,
        steel: parseInt(document.getElementById('steelPrice').value) || 0,
        carBat: parseInt(document.getElementById('carBatPrice').value) || 0,
        bikeBat: parseInt(document.getElementById('bikeBatPrice').value) || 0,
        plastic: parseInt(document.getElementById('plasticPrice').value) || 0
    };

    pricesRef.set(newPrices)
        .then(() => alert('Prices updated online!'))
        .catch((error) => alert('Error: ' + error.message));
}

function updatePriceDisplays() {
    if(document.getElementById('papersSpan')) document.getElementById('papersSpan').textContent = currentPrices.papers;
    if(document.getElementById('booksSpan')) document.getElementById('booksSpan').textContent = currentPrices.books;
    if(document.getElementById('cartoonSpan')) document.getElementById('cartoonSpan').textContent = currentPrices.cartoon;
    if(document.getElementById('glassSpan')) document.getElementById('glassSpan').textContent = currentPrices.glass;
    if(document.getElementById('ironSpan')) document.getElementById('ironSpan').textContent = currentPrices.iron;
    if(document.getElementById('tinSpan')) document.getElementById('tinSpan').textContent = currentPrices.tin;
    if(document.getElementById('aluminiumSpan')) document.getElementById('aluminiumSpan').textContent = currentPrices.aluminium;
    if(document.getElementById('steelSpan')) document.getElementById('steelSpan').textContent = currentPrices.steel;
    if(document.getElementById('carBatSpan')) document.getElementById('carBatSpan').textContent = currentPrices.carBat;
    if(document.getElementById('bikeBatSpan')) document.getElementById('bikeBatSpan').textContent = currentPrices.bikeBat;
    if(document.getElementById('plasticSpan')) document.getElementById('plasticSpan').textContent = currentPrices.plastic;
}
