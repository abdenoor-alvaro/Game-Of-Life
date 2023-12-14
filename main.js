
// Start Global Functions 
const currentPage = window.location.pathname;
console.log(currentPage)
let idCounter = 2002

function generateUniqueId() {
    return "id" + idCounter++
}
function capitalize(sentence) {
    return sentence.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function smallScreenName(name) {
    let splitedName = name.split(" ")
    return splitedName[0][0] + ". " + splitedName[1]
}
function smallScreenDate(date) {
    let dateArray = date.split(" ")
    const smallDate = `${dateArray[1]} ${dateArray[2].slice(0, 3).toUpperCase()} ${dateArray[3]}`
    return smallDate
}
// End Global Functions 
// Start Data
class Player {
    constructor(name, image) {
        this.Name = name
        this.Image = image
        this.Round = 0
        this.Points = 0
        this.Id = generateUniqueId()
        this.Score = []
    }
    newRound(roundPoints, roundNumber) {
        this.Round += 1
        this.Points += roundPoints
        this.Score.push({roundNumber:roundNumber,roundScore:roundPoints})
    }
}

const playersData = [
    {name:"boussebain mahfoud",image: "mahfoud.jpg"},
    {name:"bourmel islem",image: "islem.jpg"},
    {name:"slimani abdenoor",image: "slimani.jpg"},
    {name:"abdenoor alvaro",image: "abdenoor.jpg"},
    {name:"sahel yacine",image: "yacine.jpg"},
]

const daysData = [
    {
        day: 1,
        date: "Monday 04 December 2023",
        scores: {
            abdenoor_alvaro: 48,
            sahel_yacine: 58.5,
            bourmel_islem: 47,
            boussebain_mahfoud: 66,
            slimani_abdenoor: 45,
        },
        bestScore:""
    },{
        day: 2,
        date: "Tuesday 05 December 2023",
        scores: {
            abdenoor_alvaro: 39,
            sahel_yacine: 36,
            bourmel_islem: 45.5,
            boussebain_mahfoud: 52,
            slimani_abdenoor: 37,
        },
        bestScore:""
    },{
        day: 3,
        date: "Wednesday 06 December 2023",
        scores: {
            abdenoor_alvaro: 50,
            sahel_yacine: 62,
            bourmel_islem: 48,
            boussebain_mahfoud: 72,
            slimani_abdenoor: 56,
        },
        bestScore:""
    },{
        day: 4,
        date: "Thursday 07 December 2023",
        scores: {
            abdenoor_alvaro: 44.5,
            sahel_yacine: 59,
            bourmel_islem: 50.5,
            boussebain_mahfoud: 73.5,
            slimani_abdenoor: 49,
        },
        bestScore:""
    },{
        day: 5,
        date: "Friday 08 December 2023",
        scores: {
            abdenoor_alvaro: 55,
            sahel_yacine: 67,
            bourmel_islem: 34,
            boussebain_mahfoud: 66,
            slimani_abdenoor: 27,
        },
        bestScore:""
    },{
        day: 6,
        date: "Saturday 09 December 2023",
        scores: {
            abdenoor_alvaro: 20,
            sahel_yacine: 59.5,
            bourmel_islem: 41,
            boussebain_mahfoud: 72,
            slimani_abdenoor: 42,
        },
        bestScore:""
    },{
        day: 7,
        date: "Sunday 10 December 2023",
        scores: {
            abdenoor_alvaro: 93,
            sahel_yacine: 64,
            bourmel_islem: 22,
            boussebain_mahfoud: 68,
            slimani_abdenoor: 50,
        },
        bestScore:""
    },{
        day: 8,
        date: "Monday 11 December 2023",
        scores: {
            abdenoor_alvaro: 83,
            sahel_yacine: 59.5,
            bourmel_islem: 32,
            boussebain_mahfoud: 103,
            slimani_abdenoor: 27,
        },
        bestScore:""
    },{
        day: 9,
        date: "Tuesday 12 December 2023",
        scores: {
            abdenoor_alvaro: 93,
            sahel_yacine: 49.5,
            bourmel_islem: 44.5,
            boussebain_mahfoud: 81,
            slimani_abdenoor: 48,
        },
        bestScore:""
    },{
        day: 10,
        date: "Wednesday 13 December 2023",
        scores: {
            abdenoor_alvaro: 52,
            sahel_yacine: 70.5,
            bourmel_islem: 83.5,
            boussebain_mahfoud: 72,
            slimani_abdenoor: 59,
        },
        bestScore:""
    },{
        day: 11,
        date: "Thursday 14 December 2023",
        scores: {
            abdenoor_alvaro: 66,
            sahel_yacine: 67,
            bourmel_islem: 70,
            boussebain_mahfoud: 79,
            slimani_abdenoor: false,
        },
        bestScore:""
    },
]
const highestValdue = [{
    value: false,
    player: false,
    day:false
}]
// End Data
// Start Table Page
// Start Functions
let highestScore = -1
let highestScorePlayers = []
function gettingBestScore(daysData) {
    for (const day of daysData) {
        let bestValue = -1
        let bestValuePlayer = []
        const scores = Object.values(day.scores)
        const players = Object.keys(day.scores)
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] > bestValue && scores[i] !== false) {
                bestValue = scores[i]
                bestValuePlayer = []
                bestValuePlayer.push(players[i])
            } else if (scores[i] === bestValue) {
                bestValuePlayer.push(players[i])
            }

            if (scores[i] > highestScore && scores[i] !== false) {
                highestScore = scores[i]
                highestScorePlayers = []
                highestScorePlayers.push({
                    value: scores[i],
                    player: players[i],
                    day:day.day
                })
            } else if (scores[i] === highestScore) {
                highestScorePlayers.push({
                    value: scores[i],
                    player: players[i],
                    day:day.day
                })
            }
        }
        if (day.bestScore !== undefined) {
            day.bestScore = bestValuePlayer
        }
    }
}
gettingBestScore(daysData)

function calculatePoints(players, daysData) {
    for (const player of players) {
        let playerName = player.Name
        if (player.Name.split(" ").length > 1) {
            playerName = player.Name.split(" ").join("_")
        }
        for (const day of daysData) {
            const scores = day.scores
            if (scores[playerName]) {
                player.newRound(scores[playerName],day.day)
            }
        }
    }
}

function generateHtmlTablePage(sortedPlayers) {
    const htmlTableLocation = document.querySelector(".content")
    const html = `
    <div class="table-page-content pb-3">
        <div class="main-header fw-bold bg-primary py-5 fs-1 mb-5">
            <div class="container ">
                <div class="header">Game Of Life (Ranking)</div>
            </div>
        </div>
        <div class="container">
            <div class="table w-100">
                <div class="headline w-100 d-flex">
                    <span class="rank">Rank</span>
                    <span class="image"></span>
                    <span class="player flex-grow-1">Player</span>
                    <span class="round">Round</span>
                    <span class="points">Points</span>
                </div>
                ${sortedPlayers.map(player => generatePlayerHtml(player)).join("")}
            </div>
        </div>
    </div>
    `
    htmlTableLocation.innerHTML = html
}

function generatePlayerHtml(player) {
    let playerName = player.Name
    if (screen.width < 786) {
        playerName = smallScreenName(player.Name)
    }
    return `
    <div class="playerline w-100 d-flex justify-content-between align-items-center bg-white">
        <span class="rank fw-bold">${player.Rank}</span>
        <span class="image"><img class="generateProfile" id="${player.Id}" src="images/${player.Image}" alt=""></span>
        <span class="player flex-grow-1"><a href="player-profile.html?id=${player.Id}"class="player-name p-0 generateProfile" id="${player.Id}">${capitalize(playerName)}</a></span>
        <span class="round">${player.Round}</span>
        <span class="points">${player.Points}</span>
    </div>
    `
}
// End Functions
// Start Calculating Points
const players = playersData.map(playerData => new Player(playerData.name, playerData.image))
calculatePoints(players,daysData)
// End Calculating Points
// Start Sorting and Printing
const sortedPlayers = [...players].sort((a, b) => b.Points - a.Points)
sortedPlayers.forEach((player, index) => {
    player.Rank = index +1
})
if (currentPage.includes("index.html") || currentPage === "/Game-Of-Life/") {
    generateHtmlTablePage(sortedPlayers)
}
// End Sorting and Printing
// End Table Page



// Start Player Profile

const clickedPlayer = document.querySelectorAll(".generateProfile");
clickedPlayer.forEach(element => {
    element.addEventListener("click", () => window.location.href = `player-profile.html?id=${element.id}`);
});
let gameContent = document.querySelector(".gameGenerateJs")
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');


function generateProfilePage(id) {
    let player = ""
    for (let i = 0; i < players.length; i++) {
        if (players[i].Id === id) {
            player = players[i]
        }
    }
    let playerName = player.Name
    if (screen.width < 786) {
        playerName = smallScreenName(player.Name)
    }
    document.querySelector('title').textContent = `${playerName}`
    const htmlTableLocation = document.querySelector(".content")
    const pageHtml = `
    <div class="player-profile-content pb-3">
        <div class="main-header fw-bold bg-primary py-5 mb-5">
            <div class="container d-flex align-items-center">
                <div class="image"><img src="images/${player.Image}" alt=""></div>
                <div class="header">${capitalize(playerName)}</div>
            </div>
        </div>
        <div class="container">
            <div class="table w-100">
                <div class="headline w-100 d-flex">
                    <span class="rank">rank</span>
                    <span class="date flex-grow-1">Date</span>
                    <span class="round">Round</span>
                    <span class="score">Score</span>
                </div>
                ${generateDayHtml(player)}
            </div>
        </div>
    </div>
    `
    htmlTableLocation.innerHTML = pageHtml
}
function generateDayHtml(player) {
    let div = document.createElement("div")

    let playerName = player.Name
    if (player.Name.split(" ").length > 1) {
        playerName = player.Name.split(" ").join("_")
    }

    for (let i = 1; i <= daysData.length; i++){
        let firstIcon = ""
        let day = daysData[daysData.length - i].day
        const bestScoreArray = daysData[daysData.length - i].bestScore
        for (const best of bestScoreArray) {
            if (best === playerName) {
                firstIcon = "first-icon"
            }
        }

        for (const highest of highestScorePlayers) {
            if (highest.player === playerName && highest.day === day) {
                firstIcon = "best-ever"
            }
        }
        let date = daysData[daysData.length - i].date
        if (screen.width < 786) {
            date = smallScreenDate(daysData[daysData.length - i].date)
        }

        const scores = daysData[daysData.length - i].scores
        let score 
        if (scores[playerName]) {
            score = scores[playerName]
            div.innerHTML += `
            <div class="day-line d-flex align-items-center bg-white">
                <span class="rank fw-bold">1</span>
                <span class="date flex-grow-1">${date}</span>
                <span class="round">${daysData[daysData.length - i].day}</span>
                <span class="score ${firstIcon}">${score}</span>
            </div>
            `
        }
    }
    return div.innerHTML
}
if (currentPage.includes("player-profile.html")) {
    generateProfilePage(gameId)
}
// End Player Profile
// Start Rounds Page
function generateRoundPage() {
    const htmlLocation = document.querySelector(".content")
    for (const round of daysData) {
        let date = round.date
        if (screen.width < 786) {
            date = smallScreenDate(round.date)
        }
        const div = document.createElement("div")
        const scoresKeys = Object.keys(round.scores)
        const scoresValues = Object.values(round.scores)
        const list = []
        
        for (let i = 0; i < scoresValues.length; i++) {
            if (scoresValues[i] !== false) {
                list.push({point: scoresValues[i], name:scoresKeys[i]})
            }
        }
        if (list.length === 0) {
            continue
        }
        let sortedList = list.sort((a, b) => b.point - a.point)
        const roundPageHtml = `
        <div class="round">
                <div class="round-header container">Round ${round.day} <span>(${date})</span></div>
                <div class="round-body">
                    <div class="table-page-content pb-3">
                        <div class="container">
                            <div class="table w-100 m-0">
                                <div class="headline w-100 d-flex">
                                    <span class="rank">Rank</span>
                                    <span class="image"></span>
                                    <span class="player flex-grow-1">Player</span>
                                    <span class="points">Points</span>
                                </div>
                            </div>
                            ${generatePlayerHtmlOnRoundsPage(sortedList) }
                        </div>
                    </div>
                </div>
            </div>
        `
        div.innerHTML = roundPageHtml
        htmlLocation.prepend(div) 
    }
    
}
function generatePlayerHtmlOnRoundsPage(sortedList) {
    let roundTable =``
    let rank = 1
    for (let x = 0; x < sortedList.length; x++){
        let player
        playerName = sortedList[x].name.split("_").join(" ")
        
        console.log(sortedList[x].name)
        for (let i = 0; i < players.length; i++) {
            if (players[i].Name === playerName) {
                player = players[i]
            }
        }

        if (screen.width < 786) {
            playerName = smallScreenName(playerName)
        }

        roundTable += `
        <div class="playerline w-100 d-flex justify-content-between align-items-center bg-white">
            <span class="rank fw-bold">${rank}</span>
            <span class="image"><img class="generateProfile" id="${player.Id}" src="images/${player.Image}" alt=""></span>
            <span class="player flex-grow-1"><a href="player-profile.html?id=${player.Id}"class="player-name p-0 generateProfile" id="${player.Id}">${playerName}</a></span>
            <span class="points">${sortedList[x].point}</span>
        </div>
        `
        rank += 1
    }
    return roundTable
}
if (currentPage.includes("rounds.html")) {
    generateRoundPage(playersData)
}
// End Rounds Page





