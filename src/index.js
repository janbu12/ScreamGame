const { app, BrowserWindow, globalShortcut, dialog} = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "icon.ico",
    fullscreen: true
  })

  win.menuBarVisible = false;

  // win.setAutoHideMenuBar(true);

  win.loadFile('src/index.html');

  globalShortcut.register('Escape', () => {
    if (win.isFullScreen()) {
      win.setFullScreen(false);
    }
    // app.quit();
  });

win.on('close', (event) => {
    event.preventDefault();

    dialog.showMessageBox(win, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirmation',
      message: 'Are you sure you want to quit?'
    }).then((response) => {
      if (response.response === 0) {
        win.destroy();
      }
    }).catch((err) => {
      console.error(err);
    });
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregister('Escape');
});