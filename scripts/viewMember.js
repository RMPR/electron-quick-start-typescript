let name = document.getElementById("name")
let numero = document.getElementById("numero")
let email = document.getElementById("email")
let entreprise = document.getElementById("entreprise")
let contribution = document.getElementById("contribution")

let personName = localStorage.getItem("view")

let index = 0
for (let i = 1; i <= parseInt(localStorage.getItem("size")); i++) {
    if (localStorage.getItem('A' + i) === (personName)) {
        index = i
    }
}

name.innerHTML = localStorage.getItem("A" + index)
numero.innerHTML = localStorage.getItem("B" + index)
email.innerHTML = localStorage.getItem("C" + index)
entreprise.innerHTML = localStorage.getItem("D" + index)
let somme = 0
for (const key of localStorage.getItem('E' + index).split(" ")) {
    if (key === "") {
        continue
    }
    somme += parseInt(key)
}
contribution.innerHTML = (somme) + ""

let myTable = document.getElementById("myTable")

let row = document.createElement("tr")
let cell1 = document.createElement("td")
let cell2 = document.createElement("td")
let money = localStorage.getItem("E" + index).split(" ")
let i = 0
for (const dateContribution of localStorage.getItem("F" + index).split(" ")) {
    if (money[i] !== "") {
        textnode1 = document.createTextNode(money[i]);
    } else {
        textnode1 = document.createTextNode(money[++i]);
    }
    cell1.appendChild(textnode1)
    textnode2 = document.createTextNode(dateContribution);
    cell2.appendChild(textnode2)
    row.appendChild(cell1)
    row.appendChild(cell2)
    myTable.appendChild(row)
    cell1 = document.createElement("td")
    cell2 = document.createElement("td")
    row = document.createElement("tr")
    ++i
}