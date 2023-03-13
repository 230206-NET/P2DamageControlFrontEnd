async function retrieveDamagers() {
    document.getElementById("possibleheroes").innerHTML = ""
    let relevantHeroes = []
    const damageInfo = document.getElementById("Damager")
    var hash = CryptoJS.MD5("16aed8bb2db92dc0d6f5e6ca7059b194ff52b92228ecae25f58b2e8b15e9eaded61953912").toString()
    fetch('https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=' + damageInfo.value + '&apikey=8ecae25f58b2e8b15e9eaded61953912&hash=' + hash).then((res) => res.json()).then(data => {
    console.log(data)    
    for (i = 0; i < 5; i++) {
            if (data.data.results[i] !== null) {
                console.log(data.data.results[i].name)
                var hero = data.data.results[i].name
                var heroList = document.getElementById("possibleheroes")
                var opt = document.createElement('option');
                opt.value = hero
                opt.html = hero
                heroList.appendChild(opt)
            } else {
                break
            }
        }
    });
}