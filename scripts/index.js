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

function add_cell_to_sheet(worksheet, address, value) {
	/* cell object */
	var cell = {t:'?', v:value, w:value+""};

	/* assign type */
	if(typeof value == "string") cell.t = 's'; // string
	else if(typeof value == "number") cell.t = 'n'; // number
	else if(value === true || value === false) cell.t = 'b'; // boolean
	else if(value instanceof Date) cell.t = 'd';
	else throw new Error("cannot store value");

	/* add to worksheet, overwriting a cell if it exists */
	worksheet[address] = cell;

	/* find the cell range */
	var range = xlsx.utils.decode_range(worksheet['!ref']);
	var addr = xlsx.utils.decode_cell(address);

	/* extend the range to include the new cell */
	if(range.s.c > addr.c) range.s.c = addr.c;
	if(range.s.r > addr.r) range.s.r = addr.r;
	if(range.e.c < addr.c) range.e.c = addr.c;
	if(range.e.r < addr.r) range.e.r = addr.r;

	/* update range */
	worksheet['!ref'] = xlsx.utils.encode_range(range);
}

let workbook = xlsx.readFile('data/4GI.ods')
let community = workbook.Sheets.Sheet1;
let reference = community['!ref']
let length = reference.split(":")
length =  length[1].replace( /^\D+/g, '')
    // let cells :any = Object.keys(community)
for (const key in community){
    if (key.includes('!ref')) continue
    localStorage.setItem(key, community[key]['v']+"")
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
let total = document.getElementById('total')
let totalInt = 0
for (let i = 1; i <= parseInt(localStorage.getItem('size')); i++) {
    for(const key of localStorage.getItem('E'+i).split(" ")){
        if (key === ""){
            continue
        }
        somme += parseInt(key) 
    }
    updateList(localStorage.getItem('A'+i), somme+ "")
    totalInt += somme
    somme = 0
}
total.innerText = totalInt + ""
let index
window.addEventListener('storage', function(e) {
    // We add a new member 
    if(e.key.includes('size')){
        index = parseInt(localStorage.getItem('size')) 
        updateList(localStorage.getItem('A'+index), localStorage.getItem('E'+index))
        totalInt += parseInt(localStorage.getItem('E')+index)
        total.innerText = totalInt + ""
        add_cell_to_sheet(community, "A"+index, localStorage.getItem('A'+index))
        add_cell_to_sheet(community, "B"+index, localStorage.getItem('B'+index))
        add_cell_to_sheet(community, "C"+index, localStorage.getItem('C'+index))
        add_cell_to_sheet(community, "D"+index, localStorage.getItem('D'+index))
        add_cell_to_sheet(community, "E"+index, localStorage.getItem('E'+index))
        add_cell_to_sheet(community, "F"+index, localStorage.getItem('F'+index))
        xlsx.writeFile(workbook, 'data/4GI.ods')
    }

    // We add a contribution
    else if(e.newValue.includes(e.oldValue)){
        product.innerHTML = ""
        totalInt = 0
        for (let i = 1; i <= parseInt(localStorage.getItem('size')); i++) {
            for(const key of localStorage.getItem('E'+i).split(" ")){
                if (key === ""){
                    continue
                }
                somme += parseInt(key) 
            }
            updateList(localStorage.getItem('A'+i), somme+ "")
            totalInt+= somme
            somme = 0
        }
        community[e.key] = e.newValue
        total.innerText = totalInt
        xlsx.writeFile(workbook, 'data/4GI.ods')
    }
})
