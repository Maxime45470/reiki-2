const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Gestionnaire IPC pour recevoir des données du processus de rendu
ipcMain.on('channel-name', (event, data) => {
    console.log('Données reçues du processus de rendu:', data);

    // Traitement des données reçues...

    // Envoi d'une réponse au processus de rendu
    event.reply('response-channel', 'Confirmation de réception des données');
});
