const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path')
const database = require('./database.js');
const sqlite3 = require('sqlite3').verbose();

// Chemin vers votre fichier de base de données SQLite
const dbPath = path.join(app.getPath('userData'),'./database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de l\'ouverture de la base de données', err);
  } else {
    console.log('Connexion réussie à la base de données SQLite');
    createTable();
  }
});

function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS maTable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      colonne1 TEXT,
      colonne2 TEXT,
      colonne3 TEXT,
      colonne4 TEXT,
      colonne5 TEXT,
      colonne6 TEXT,
      colonne7 TEXT,
      colonne8 TEXT,
      colonne9 TEXT,
      colonne10 TEXT,
      colonne11 TEXT,
      colonne12 TEXT
    );`;

  db.run(query, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table', err);
    } else {
      console.log('Table créée ou déjà existante');
    }
  });
}


ipcMain.on('requete-sqlite', async (event, data) => {
  try {
    await database.insererDonnees(db, data);
    database.lireDonnees(db, (rows) => {
      event.reply('reponse-sqlite', rows);
    });
  } catch (err) {
    console.error(err);
    // Gérer l'erreur...
  }
});
ipcMain.on('requete-suppression', async (event, idASupprimer) => {
  try {
    await database.supprimerDonnees(db, idASupprimer);
    // Après la suppression, vous pouvez envoyer de nouveau toutes les données pour mettre à jour l'affichage
    database.lireDonnees(db, (rows) => {
      event.reply('reponse-sqlite', rows);
    });
  } catch (err) {
    console.error(err);
    // Gérer l'erreur...
  }
});
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    icon:  path.join(app.getPath('userData'),'./img/reiki.webp'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.webContents.on('did-finish-load', () => {
    database.lireDonnees(db, (rows) => {
      mainWindow.webContents.send('reponse-sqlite', rows);
    });
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('before-quit', () => {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fermeture de la connexion à la base de données.');
    });
  });

  // Gestionnaire IPC pour recevoir des données du processus de rendu
  ipcMain.on('channel-name', (event, data) => {

    // Traitement des données reçues...

    // Envoi d'une réponse au processus de rendu
    event.reply('response-channel', 'Confirmation de réception des données');
  });
}
);
