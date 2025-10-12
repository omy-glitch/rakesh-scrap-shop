// Default Prices (in ₹ per kg) - Load from localStorage or use defaults
let prices = JSON.parse(localStorage.getItem('scrapPrices')) || {
    papers: 10,
    iron: 20,
    plastic: 15,
    other: 25
};

// Default Admin Password (Change this!)
const ADMIN_PASSWORD = 'admin123';

// Function to show admin login form (inline below button)
function showAdminLogin() {
    document.getElementById('adminPanel').style.display = 'block';
}

// Function to close/hide panel
function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPassword').value = ''; // Clear password
    document.getElementById('editForm').style.display = 'none'; // Hide edit form if open
}

// Function to login admin
function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('editForm').style.display = 'block';
        // Load current prices into inputs
        document.getElementById('papersPrice').value = prices.papers;
        document.getElementById('ironPrice').value = prices.iron;
        document.getElementById('plasticPrice').value = prices.plastic;
        document.getElementById('otherPrice').value = prices.other;
        alert('Logged in! Edit prices below.');
    } else {
        alert('Wrong password!');
    }
}

// Function to save prices
function savePrices() {
    prices.papers = parseInt(document.getElementById('papersPrice').value) || 0;
    prices.iron = parseInt(document.getElementById('ironPrice').value) || 0;
    prices.plastic = parseInt(document.getElementById('plasticPrice').value) || 0;
    prices.other = parseInt(document.getElementById('otherPrice').value) || 0;
    
    localStorage.setItem('scrapPrices', JSON.stringify(prices));
    updatePriceDisplays();
    alert('Prices saved! Refresh page to see changes for customers.');
}

// Updated logoutAdmin to close panel
function logoutAdmin() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    closeAdminPanel(); // Hides the entire panel
}

// Function to update price displays on page
function updatePriceDisplays() {
    document.getElementById('papersSpan').textContent = prices.papers;
    document.getElementById('ironSpan').textContent = prices.iron;
    document.getElementById('plasticSpan').textContent = prices.plastic;
    document.getElementById('otherSpan').textContent = prices.other;
}

// Optional: Ensure map link opens on click (if iframe interferes - usually not needed)
// Uncomment the lines below if testing shows the <a> link doesn't trigger reliably

document.addEventListener('DOMContentLoaded', function() {
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default if needed
            window.open('https://maps.app.goo.gl/FHJrLnxVPgbi83PS9', '_blank');
        });
    }
});


// Load prices on page start
updatePriceDisplays();