const { ipcRenderer } = require('electron');




document.getElementById('dataForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const data = {
        input1: document.getElementById('input1').value,
        input2: document.getElementById('input2').value,
        input3: document.getElementById('input3').value,
        input4: document.getElementById('input4').value,
        input5: document.getElementById('input5').value,
        input6: document.getElementById('input6').value,
        input7: document.getElementById('input7').value,
        input8: document.getElementById('input8').value,
        input9: document.getElementById('input9').value,
        input10: document.getElementById('input10').value,
        input11: document.getElementById('input11').value,
        input12: document.getElementById('input12').value
    };

    // Envoi des données au processus principal
    ipcRenderer.send('requete-sqlite', data);
    window.location.href = 'index.html';
});







