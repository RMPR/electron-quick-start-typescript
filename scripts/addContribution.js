const contributor = document.getElementById('contributeur')
const length = localStorage.getItem('size')    
for (let i = 1; i <= length; i++){
    let opt = localStorage.getItem('A'+i)
    let element = document.createElement("option")

    element.text = opt
    element.value = i
    contributor.add(element)
}
function contributionAdded(){
    const index = contributor.value
    const contribution = document.getElementById('contribution').value
    const dateContribution = document.getElementById('dateContribution').value
      
    // Post changes to the local Storage
    let oldContributions = localStorage.getItem("E"+index)
    let oldDates = localStorage.getItem("F"+index)
    localStorage.setItem("E"+index, oldContributions + " " + contribution)
    localStorage.setItem("F"+index, oldDates + " " + dateContribution)
}

