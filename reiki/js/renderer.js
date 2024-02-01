const { ipcRenderer } = require('electron');


// Configuration de l'écouteur de réponse IPC
ipcRenderer.on('response-channel', (event, response) => {
    console.log('Réponse du processus principal:', response);
});



function afficherDonnees(donnees) {
    const table = document.getElementById('dataTable'); // Assurez-vous que cet ID correspond à votre tableau dans le HTML.
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Efface les anciennes lignes

    donnees.forEach((ligne) => {
        const tr = document.createElement('tr');
        Object.values(ligne).forEach((cellule) => {
            const td = document.createElement('td');
            td.textContent = cellule;
            tr.appendChild(td);
        });
        const tdSupprimer = document.createElement('td');
        const btnSupprimer = document.createElement('button');
        

        btnSupprimer.setAttribute('data-id', ligne.id); // Supposons que 'id' est la clé primaire dans votre DB
        btnSupprimer.setAttribute('class', 'bouton-poubelle');
        btnSupprimer.addEventListener('click', supprimerLigne);
       
        tdSupprimer.appendChild(btnSupprimer);
        tr.appendChild(tdSupprimer);

        tbody.appendChild(tr);

    });
}

function supprimerLigne(event) {
    const idASupprimer = event.target.getAttribute('data-id');
    ipcRenderer.send('requete-suppression', idASupprimer);
}

// Réception de la réponse du processus principal
ipcRenderer.on('reponse-sqlite', (event, rows) => {
    afficherDonnees(rows);
    // Traitez les données reçues, par exemple, les afficher dans le tableau
});


