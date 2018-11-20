function memberAdded() {
    let length = 0
    name = document.getElementById('name').value
    phoneNumber = document.getElementById("phoneNumber").value
    email = document.getElementById("email").value
    entreprise = document.getElementById("entreprise").value
    contribution = document.getElementById("contribution").value
    dateContribution = document.getElementById("dateContribution").value
    length = parseInt(localStorage.getItem("size"))+1
    localStorage.setItem("A"+length, name)
    localStorage.setItem("B"+length, phoneNumber)
    localStorage.setItem("C"+length, email)
    localStorage.setItem("D"+length, entreprise)
    localStorage.setItem("E"+length, contribution)
    localStorage.setItem("F"+length, dateContribution)
    localStorage.setItem("size", length)
}
