let name = document.getElementById("name")
let numero = document.getElementById("numero")
let email = document.getElementById("email")
let entreprise = document.getElementById("entreprise")
let contribution = document.getElementById("contribution")

let personName = localStorage.getItem("view")

let index = 0
for (let i=1; i<=parseInt(localStorage.getItem("size")); i++){
    if (localStorage.getItem('A'+i) === (personName)){
        index = i
    }
}

name.innerHTML = localStorage.getItem("A"+index)
numero.innerHTML = localStorage.getItem("B"+index)
email.innerHTML = localStorage.getItem("C"+index)
entreprise.innerHTML = localStorage.getItem("D"+index)
let somme = 0
for(const key of localStorage.getItem('E'+index).split(" ")){
    if (key === ""){
        continue
    }
    somme += parseInt(key) 
}
contribution.innerHTML = (somme)+""
