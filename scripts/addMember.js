
function memberAdded() {
    const length
    name = document.getElementById('name').value
    phoneNumber = document.getElementById("phoneNumber").value
    email = document.getElementById("email").value
    entreprise = document.getElementById("entreprise").value
    contribution = document.getElementById("contribution").value
    dateContribution = document.getElementById("dateContribution").value
    length = parseInt(require('electron').remote.getGlobal('sharedObject').number + 1)
    require('electron').remote.getGlobal('sharedObject').members["A"+length] = name
    require('electron').remote.getGlobal('sharedObject').members["B"+length] = phoneNumber
    require('electron').remote.getGlobal('sharedObject').members["C"+length] = email
    require('electron').remote.getGlobal('sharedObject').members["D"+length] = entreprise
    require('electron').remote.getGlobal('sharedObject').members["E"+length] = contribution
    require('electron').remote.getGlobal('sharedObject').members["F"+length] = dateContribution
}
