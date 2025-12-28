
let prices = JSON.parse(localStorage.getItem('scrapPrices')) || {
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

const ADMIN_PASSWORD = 'admin123';

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
        
        // Load current prices into all input fields
        document.getElementById('papersPrice').value = prices.papers;
        document.getElementById('booksPrice').value = prices.books;
        document.getElementById('cartoonPrice').value = prices.cartoon;
        document.getElementById('glassPrice').value = prices.glass;
        document.getElementById('ironPrice').value = prices.iron;
        document.getElementById('tinPrice').value = prices.tin;
        document.getElementById('aluminiumPrice').value = prices.aluminium;
        document.getElementById('steelPrice').value = prices.steel;
        document.getElementById('carBatPrice').value = prices.carBat;
        document.getElementById('bikeBatPrice').value = prices.bikeBat;
        document.getElementById('plasticPrice').value = prices.plastic;

        alert('Logged in successfully!');
    } else {
        alert('Wrong password!');
    }
}

function savePrices() {
    // Save all inputs to the price object
    prices.papers = parseInt(document.getElementById('papersPrice').value) || 0;
    prices.books = parseInt(document.getElementById('booksPrice').value) || 0;
    prices.cartoon = parseInt(document.getElementById('cartoonPrice').value) || 0;
    prices.glass = parseInt(document.getElementById('glassPrice').value) || 0;
    prices.iron = parseInt(document.getElementById('ironPrice').value) || 0;
    prices.tin = parseInt(document.getElementById('tinPrice').value) || 0;
    prices.aluminium = parseInt(document.getElementById('aluminiumPrice').value) || 0;
    prices.steel = parseInt(document.getElementById('steelPrice').value) || 0;
    prices.carBat = parseInt(document.getElementById('carBatPrice').value) || 0;
    prices.bikeBat = parseInt(document.getElementById('bikeBatPrice').value) || 0;
    prices.plastic = parseInt(document.getElementById('plasticPrice').value) || 0;
    
    
    localStorage.setItem('scrapPrices', JSON.stringify(prices));
    
    
    updatePriceDisplays();
    alert('Prices updated!');
}

function logoutAdmin() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    closeAdminPanel(); 
}

function updatePriceDisplays() {
   
    document.getElementById('papersSpan').textContent = prices.papers;
    document.getElementById('booksSpan').textContent = prices.books;
    document.getElementById('cartoonSpan').textContent = prices.cartoon;
    document.getElementById('glassSpan').textContent = prices.glass;
    document.getElementById('ironSpan').textContent = prices.iron;
    document.getElementById('tinSpan').textContent = prices.tin;
    document.getElementById('aluminiumSpan').textContent = prices.aluminium;
    document.getElementById('steelSpan').textContent = prices.steel;
    document.getElementById('carBatSpan').textContent = prices.carBat;
    document.getElementById('bikeBatSpan').textContent = prices.bikeBat;
    document.getElementById('plasticSpan').textContent = prices.plastic;
}


updatePriceDisplays();
