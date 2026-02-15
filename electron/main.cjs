const { app, BrowserWindow } = require('electron');
const path = require('path');

// Prevent garbage collection
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "../public/images/logo.jpeg"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // As requested by user guide
    }
  });

  const startUrl = process.env.VITE_DEV_SERVER_URL ||
    `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Open the DevTools only in dev mode
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

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
