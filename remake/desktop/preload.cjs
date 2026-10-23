// UW2 Korean Windows build — preload bridge. contextIsolation stays on; the
// renderer only ever sees these three promise-based functions.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('uw2desktop', {
  saveSlot: (slot, name, json) =>
    ipcRenderer.invoke('uw2:saveSlot', { slot, name, json }),
  readSlot: (slot) => ipcRenderer.invoke('uw2:readSlot', { slot }),
  slotsPath: () => ipcRenderer.invoke('uw2:slotsPath'),
});
