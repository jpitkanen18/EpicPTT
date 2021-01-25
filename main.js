const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)


const nodeAbi = require('node-abi')

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const {ipcMain} = require('electron');
const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");
// Attach listener in the main process with the given ID
var micOffTimer;
ipcMain.on('request-mainprocess-action', (event, arg) => {
    if(arg.message === true){
      if(micOffTimer){
        clearTimeout(micOffTimer);
      }
      keyboard.pressKey(Key.LeftControl);
    } else {
      micOffTimer = setTimeout(function(){
        keyboard.releaseKey(Key.LeftControl);
      }, 500)
    }
    
});