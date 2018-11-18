const electron = require("electron")
const xlsx = require("xlsx")
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow


const addMemberBtn = document.getElementById('addMember')
const addContributionBtn = document.getElementById("addContribution")
const products= document.getElementById("products")

addMemberBtn.addEventListener('click', function(event){
    const modalPath=path.join('file://', __dirname, 'addMember.html')
    let win = new BrowserWindow({alwaysOnTop: true, width:450, height:600})
    win.on('close', function() { win = null})
    win.loadURL(modalPath)
    win.show()
})
addContributionBtn.addEventListener('click', function(event){
    const modalPath=path.join('file://', __dirname, 'AddContribution.html')
    let win = new BrowserWindow({alwaysOnTop: true, width:450, height:600})
    win.on('close', function() { win = null})
    win.loadURL(modalPath)
    win.show()
})

const community = xlsx.readFile("data/4GI.ods").Sheets.Sheet1;
let length = community['!ref'].split(":")
length =  length[1].replace( /^\D+/g, '')
delete community["!ref"];
    // let cells :any = Object.keys(community)
for (const key in community){
    localStorage.setItem(key, community[key]['w'])
}
localStorage.setItem('size', length)
function updateList(name, montant) {
    products.innerHTML += `
      <div class="item col-4">
        <div class="thumbnail card">
          <div class="img-event">
            <img class="group list-group-image img-fluid" src="images/silhouette-user.jpg" alt="" />
          </div>
          <div class="caption card-body">
            <h4 class="group card-title inner list-group-item-heading">
            ${name}</h4>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <p class="lead">
                  ${montant}<br />FCFA</p>
              </div>
              <div class="col-xs-12 col-md-6">
                <a class="btn btn-success" onclick="alert('infos sur la personne X')">Détails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
}

let somme= 0
for (let i = 1; i <= parseInt(localStorage.getItem('size')); i++) {
    for(const key of localStorage.getItem(['E'+i]).split(" ")){
        if (key === ""){
            continue
        }
        somme += parseInt(key) 
    }
    updateList(localStorage.getItem(['A'+i]), somme+ "")
    somme = 0
}

/* let targetProxy: any = new Proxy(members, {
    set: function (target: any, key: string, value: string) {
        console.log(`${key} set to ${value}`);
        target[key] = value;
        return true;
    }
});
*/
