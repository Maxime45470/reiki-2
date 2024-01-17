const db = require('./main.js');

// Insérer des données
function insererDonnees(db, data) {
    const sql = `INSERT INTO maTable (colonne1, colonne2, colonne3, colonne4, colonne5, colonne6, colonne7, colonne8, colonne9, colonne10, colonne11, colonne12) VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?, ?)`;
    db.run(sql, [data.input1, data.input2, data.input3, data.input4, data.input5, data.input6, data.input7, data.input8, data.input9, data.input10, data.input11, data.input12] , (err) => {
        if (err) {
            return console.error(err.message);

        }
        console.log('Une ligne a été ajoutée');
    });
}

// Lire des données
function lireDonnees(db, callback) {

    const sql = 'SELECT * FROM maTable';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        callback(rows);
    });
}

// Supprimer des données
function supprimerDonnees(db, id) {
    const sql = 'DELETE FROM maTable WHERE id = ?';
    db.run(sql, [id], (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Ligne avec ID ${id} supprimée`);
    });
}

module.exports = {
    insererDonnees,
    lireDonnees,
    supprimerDonnees
};

