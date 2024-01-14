const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const store = new Store();

// Configuration de l'écouteur de réponse IPC
ipcRenderer.on('response-channel', (event, response) => {
    console.log('Réponse du processus principal:', response);
});

document.getElementById('dataForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const data = {
        input1: document.getElementById('input1').value,
        input2: document.getElementById('input2').value,
        input3: document.getElementById('input3').value,
        input4: document.getElementById('input4').value,
        input5: document.getElementById('input5').value
    };

    addDataToTable(data);
    storeData(data);

    // Envoi des données au processus principal
    ipcRenderer.send('channel-name', data);
});
function addDataToTable(data) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);

    Object.values(data).forEach((value, index) => {
        const cell = newRow.insertCell(index);
        cell.textContent = value;
    });
}

function storeData(data) {
    let existingData = store.get('data') || [];
    existingData.push(data);
    store.set('data', existingData);
}

// Chargement des données existantes
function loadData() {
    const storedData = store.get('data') || [];
    storedData.forEach(addDataToTable);
}

// Charger les données existantes à l'ouverture de l'application
loadData();
