// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as xlsx from "xlsx"

let community = xlsx.readFile("data/4GI.ods").Sheets
console.log(community)
