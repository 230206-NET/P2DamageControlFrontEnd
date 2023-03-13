async function pushTicket(event) {
    event.preventDefault()
    var amount = parseFloat(document.getElementById("Amount").value)
    var damager = document.getElementById("Damager").value
    var damagerId = await getDamageId(damager.toString())
    console.log("The damager id is " + damagerId.toString())
    var description = document.getElementById("Description").value
    const reqBody = {
        Amount: amount,
        DamagerId: damagerId.toString(),
        Description: description
    }
    await fetch("http://localhost:5025/TicketForm/SubmitClaim", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    }).then((res) => {console.log(res); res.json()}).then(data => console.log(data)).catch(error => console.error(error))
        window.location.href = "http://localhost:5025/ViewAllTickets";
}
async function getDamageId(damagerName){
    var hash = CryptoJS.MD5("16aed8bb2db92dc0d6f5e6ca7059b194ff52b92228ecae25f58b2e8b15e9eaded61953912").toString()
    return await fetch('https://gateway.marvel.com:443/v1/public/characters?ts=1&name=' + damagerName + '&apikey=8ecae25f58b2e8b15e9eaded61953912&hash=' + hash).then((res) => res.json()).then(data => {
    try {
        return data.data.results[0].id
    } catch(err) {
        window.alert("Not a valid character. Please try again")
    }
        });

}