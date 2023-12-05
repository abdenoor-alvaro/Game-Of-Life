
// Start Data
let players = [{
        name: "abdenoor",
        image: "abdenoor.jpg",
        points: 0,
        round: 0
    },{
        name: "yacine",
        image: "yacine.jpg",
        points: 0,
        round: 0
    },{
        name: "islem",
        image: "islem.jpg",
        points: 0,
        round: 0
    },{
        name: "mahfoud",
        image: "mahfoud.jpg",
        points: 0,
        round: 0
    },{
        name: "hamid",
        image: "abdelhamid.jpg",
        points: 0,
        round: 0
    },{
        name: "slimani",
        image: "slimani.jpg",
        points: 0,
        round: 0
    },{
        name: "youcef",
        image: "youcef.jpg",
        points: 0,
        round: 0
    },
]
let days = [
    {
        day: 1,
        abdenoor: 48,
        yacine: 58.5,
        islem: 47,
        mahfoud: 66,
        hamid: false,
        slimani: false,
        youcef: 26,
    },
    {
        day:2,
        abdenoor: 39,
        yacine: 36,
        islem: false,
        mahfoud: 52,
        hamid: false,
        slimani:false,
        youcef: 17,
    },
    {
        day:3,
        abdenoor: false,
        yacine: false,
        islem: false,
        mahfoud: false,
        hamid: false,
        slimani:false,
        youcef: false,
    },
    {
        day:4,
        abdenoor: false,
        yacine: false,
        islem: false,
        mahfoud: false,
        hamid: false,
        slimani:false,
        youcef: false,
    },
    {
        day:5,
        abdenoor: false,
        yacine: false,
        islem: false,
        mahfoud: false,
        hamid: false,
        slimani:false,
        youcef: false,
    },
]
// End Data



// Start Functions
function tableHtml(location, players) {
    let html = `
    <div class="headline w-100 d-flex justify-content-between">
        <span class="rank">Rank</span>
        <span class="image"></span>
        <span class="player">Player</span>
        <span class="round">Round</span>
        <span class="points">Points</span>
    </div>
    ${players}
    `
    location.innerHTML = html
}
function playerHtml(...list) {
    let HTML = `
    <div class="playerline w-100 d-flex justify-content-between py-3">
        <span class="rank">${list[3]}</span>
        <span class="image"><img src="images/${list[4]}" alt=""></span>
        <span class="player">${list[1]}</span>
        <span class="round">${list[5]}</span>
        <span class="points">${list[2]}</span>
    </div>
    `
    list[0].innerHTML += HTML
    return list[0].innerHTML
}
// End Functions



// Start Calculating Points
for (let i = 0; i < players.length; i++) {
    let playerName = players[i].name
    for (let n = 0; n < days.length; n++) {
        let keys = Object.keys(days[n])
        let values = Object.values(days[n])
        for (let x = 0; x < keys.length; x++) {
            if (playerName === keys[x] && values[x] !== false) {
                players[i].points += values[x]
                players[i].round += 1
            }
        }
    }
}
// End Calculating Points


// Start Sorting and Printing
let htmlTableLocation = document.querySelector(".table")
let div = document.createElement("div")
let sortedArray = []
for (let i = 0; i < players.length; i++) { 
    let bestValue = -1
    let nameOfBestValue = ""
    for (let i = 0; i < players.length; i++){
        if (!sortedArray.includes(players[i].name)) {
            if (players[i].points > bestValue) {
                bestValue = players[i].points
                nameOfBestValue = players[i].name
            }
        }
    }

    let rank = i +1
    for (let x = 0; x < players.length; x++) {
        if (nameOfBestValue === players[x].name) {
            if (i === players.length - 1) {
                tableHtml(htmlTableLocation, playerHtml(div, players[x].name, players[x].points, rank, players[x].image, players[x].round))
            } else {
                playerHtml(div, players[x].name, players[x].points, rank, players[x].image, players[x].round)
            }
            break 
        }
    }

    sortedArray.push(nameOfBestValue)
}

// End Sorting and Printing