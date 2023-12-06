
// Start Data
class Player {
    constructor(name, image) {
        this.Name = name
        this.Image = image
        this.Round = 0
        this.Points = 0
    }
    newRound(roundPoints) {
        this.Round += 1
        this.Points += roundPoints
    }
}
let mahfoud = new Player("mahfoud", "mahfoud.jpg")
let islem = new Player("islem", "islem.jpg")
let abdenoor = new Player("abdenoor", "slimani.jpg")
let alvaro = new Player("alvaro", "abdenoor.jpg")
let yacine = new Player("yacine", "yacine.jpg")
let youcef = new Player("youcef", "youcef.jpg")
let players = [mahfoud, islem, abdenoor, alvaro, yacine, youcef]

let days = [
    {
        day: 1,
        alvaro: 48,
        yacine: 58.5,
        islem: 47,
        mahfoud: 66,
        abdenoor: 45,
        youcef: 33,
    },
    {
        day:2,
        alvaro: 39,
        yacine: 36,
        islem: 45.5,
        mahfoud: 52,
        abdenoor: 37,
        youcef: 17,
    },
    {
        day:3,
        alvaro: false,
        yacine: false,
        islem: false,
        mahfoud: false,
        abdenoor: false,
        youcef: false,
    },
    {
        day:4,
        alvaro: false,
        yacine: false,
        islem: false,
        mahfoud: false,
        abdenoor: false,
        youcef: false,
    },
    {
        day:5,
        alvaro: false,
        yacine: false,
        islem: false,
        mahfoud: false,
        abdenoor: false,
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
        <span class="player flex-grow-1">Player</span>
        <span class="round">Round</span>
        <span class="points">Points</span>
    </div>
    ${players}
    `
    location.innerHTML = html
}
function playerHtml(...list) {
    let HTML = `
    <div class="playerline w-100 d-flex justify-content-between align-items-center bg-white py-3">
        <span class="rank fw-bold">${list[3]}</span>
        <span class="image"><img src="images/${list[4]}" alt=""></span>
        <span class="player flex-grow-1">${capitalize(list[1])}</span>
        <span class="round">${list[5]}</span>
        <span class="points">${list[2]}</span>
    </div>
    `
    list[0].innerHTML += HTML
    return list[0].innerHTML
}
function capitalize(sentence) {
    let teamName = sentence.split(" ")
    for (let j = 0; j < teamName.length; j++) {
        teamName[j] = `${teamName[j].charAt(0).toUpperCase()}${teamName[j].slice(1)}`
    }
    return  teamName.join(" ")
}
// End Functions



// Start Calculating Points
for (let i = 0; i < players.length; i++) {
    let playerName = players[i].Name
    for (let n = 0; n < days.length; n++) {
        let keys = Object.keys(days[n])
        let values = Object.values(days[n])
        for (let x = 0; x < keys.length; x++) {
            if (playerName === keys[x] && values[x] !== false) {
                players[i].newRound(values[x])
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
        if (!sortedArray.includes(players[i].Name)) {
            if (players[i].Points > bestValue) {
                bestValue = players[i].Points
                nameOfBestValue = players[i].Name
            }
        }
    }

    let rank = i +1
    for (let x = 0; x < players.length; x++) {
        if (nameOfBestValue === players[x].Name) {
            if (i === players.length - 1) {
                tableHtml(htmlTableLocation, playerHtml(div, players[x].Name, players[x].Points, rank, players[x].Image, players[x].Round))
            } else {
                playerHtml(div, players[x].Name, players[x].Points, rank, players[x].Image, players[x].Round)
            }
            break 
        }
    }

    sortedArray.push(nameOfBestValue)
}
// End Sorting and Printing







