// 热重载，仅开发环境生效
if (process.env.NODE_ENV === "development") {
  require("electron-reload")(__dirname, {
    electron: require("path").join(
      __dirname,
      "node_modules",
      ".bin",
      "electron"
    ),
    ignored: /dist|node_modules|[\\/]\\./,
  });
}

const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 移除顶部菜单栏
  win.setMenu(null);
  win.webContents.openDevTools(); // 自动打开调试工具

  // 开发环境加载 Vite 本地服务器，生产环境加载打包后的 index.html
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
