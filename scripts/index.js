const electron = require("electron")
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow


const addMemberBtn = document.getElementById('addMember')

addMemberBtn.addEventListener('click', function(event){
    const modalPath=path.join('file://', __dirname, 'addMember.html')
    let win = new BrowserWindow({alwaysOnTop: true, width:450, height:600})
    win.on('close', function() { win = null})
    win.loadURL(modalPath)
    win.show()
})
