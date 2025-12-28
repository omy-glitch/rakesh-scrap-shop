// --- 1. FIREBASE CONFIGURATION ---
// This connects your website to the database you created
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

// Default prices (used only if database is completely empty)
const defaultPrices = {
    papers: 10,
    books: 13,
    cartoon: 12,
    glass: 4,
    iron: 20,
    tin: 12,
    aluminium: 120,
    steel: 45,
    carBat: 95,
    bikeBat: 85,
    plastic: 15
};

let currentPrices = {};
const ADMIN_PASSWORD = 'admin123'; // ⚠️ Note: This password is visible to anyone inspecting code.

// --- 2. LISTEN FOR REAL-TIME UPDATES ---
// This runs automatically whenever data changes in the database (on any device)
const pricesRef = database.ref('scrapPrices');

pricesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        // If data exists in cloud, use it
        currentPrices = data;
        console.log("Data received from cloud:", currentPrices);
    } else {
        // If database is new, upload defaults
        currentPrices = defaultPrices;
        pricesRef.set(defaultPrices);
        console.log("Setting default data.");
    }
    
    // Update the website text immediately
    updatePriceDisplays();
});


// --- 3. ADMIN FUNCTIONS ---

function showAdminLogin() {
    document.getElementById('adminPanel').style.display = 'block';
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = ''; 
    document.getElementById('editForm').style.display = 'none'; 
}

function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('editForm').style.display = 'block';
        
        // Load current prices into inputs so you can edit them
        document.getElementById('papersPrice').value = currentPrices.papers;
        document.getElementById('booksPrice').value = currentPrices.books;
        document.getElementById('cartoonPrice').value = currentPrices.cartoon;
        document.getElementById('glassPrice').value = currentPrices.glass;
        document.getElementById('ironPrice').value = currentPrices.iron;
        document.getElementById('tinPrice').value = currentPrices.tin;
        document.getElementById('aluminiumPrice').value = currentPrices.aluminium;
        document.getElementById('steelPrice').value = currentPrices.steel;
        document.getElementById('carBatPrice').value = currentPrices.carBat;
        document.getElementById('bikeBatPrice').value = currentPrices.bikeBat;
        document.getElementById('plasticPrice').value = currentPrices.plastic;

        alert('Logged in successfully!');
    } else {
        alert('Wrong password!');
    }
}

function savePrices() {
    // Create an object with the new values from the inputs
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

    // --- SEND TO CLOUD DATABASE ---
    pricesRef.set(newPrices)
        .then(() => {
            alert('Prices updated online! Check your other phone to see the change.');
        })
        .catch((error) => {
            alert('Error updating prices: ' + error.message);
        });
}

function logoutAdmin() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    closeAdminPanel(); 
}

function updatePriceDisplays() {
    // Safety check to make sure elements exist
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
