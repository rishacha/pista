import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname,'../preload/index.js'),
    },
  });

  if(process.env.NODE_ENV==="dev"){
    mainWindow.loadURL(process.env.DEV_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../ui/build/index.html'));
  }

  

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('ping', (event) => {
  console.log('Received ping from renderer');
  event.sender.send('pong', 'Pong from main process');
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});