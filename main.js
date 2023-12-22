const currentPage = window.location.pathname;
console.log(currentPage)
// Start Global Functions 
let idCounter = 2002
const urlParams = new URLSearchParams(window.location.search);
const UrlId = urlParams.get('id');

let highestScore = -1
let highestScorePlayers = []
function calculatePoints(players, daysData) {
    let num = 0
    for (const day of daysData) {
        const scores = day.scores

        // calculating the total points and the total rounds and adding the scores of every round for every player
        for (const player of players) {
            let playerName = player.Name
            if (player.Name.split(" ").length > 1) {
                playerName = player.Name.split(" ").join("_")
            }
            if (scores[playerName]) {
                player.TotalRounds += 1
                player.TotalPoints += scores[playerName]
                player.RoundsScores.push({ roundNumber: day.day, roundScore: scores[playerName] })
            }
        }

        // sorting the overall ranking of the players on every round and storing it in that perticular day
        day.SortedPlayersThisRound = [...players].sort((a, b) => b.TotalPoints - a.TotalPoints)

        // calculating the highest round score ever and calculating the the highest score on every round
        let bestValue = -1
        let bestValuePlayer = []
        const scoresArray = Object.values(day.scores)
        const playersArray = Object.keys(day.scores)
        for (let i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] > bestValue && scoresArray[i] !== false) {
                bestValue = scoresArray[i]
                bestValuePlayer = []
                bestValuePlayer.push(playersArray[i])
            } else if (scoresArray[i] === bestValue) {
                bestValuePlayer.push(playersArray[i])
            }

            if (scoresArray[i] > highestScore && scoresArray[i] !== false) {
                highestScore = scoresArray[i]
                highestScorePlayers = []
                highestScorePlayers.push({
                    value: scoresArray[i],
                    player: playersArray[i],
                    day:day.day
                })
            } else if (scoresArray[i] === highestScore) {
                highestScorePlayers.push({
                    value: scoresArray[i],
                    player: playersArray[i],
                    day:day.day
                })
            }
        }
        day.bestScore = bestValuePlayer
    }

    // Calculating the highest score and the lowest score of every player by iterating over the player Round scores 
    for (const player of players) {
        for (let round of player.RoundsScores) {
            if (round.roundScore > player.bestScore) {
                player.bestScore = round.roundScore
            }
            if (round.roundScore < player.lowestScore) {
                player.lowestScore = round.roundScore
            }
        }
    }
}
function generateUniqueId() {
    return "id=" + idCounter++
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
function openImage(imageSrc) {
    const fullscreen = document.getElementById('fullscreen');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = imageSrc;
    fullscreen.style.display = 'block';
}
function closeFullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
}
// End Global Functions 
// Start Data
class Player {
    constructor(name, image) {
        this.Name = name
        this.Image = image
        this.Id = generateUniqueId()
        this.TotalRounds = 0
        this.TotalPoints = 0
        this.TotalStars = 0
        this.Rank = 0
        this.RoundsScores = []
        this.bestScore = 0
        this.lowestScore = 500    
    }
    average = () => { return this.TotalPoints / this.TotalRounds }
}

const playersData = [
    {name:"boussebain mahfoud",image: "mahfoud.jpg"},
    {name:"bourmel islem",image: "islem.jpg"},
    {name:"slimani abdenoor",image: "slimani.jpg"},
    {name:"abdenoor alvaro",image: "abdenoor.jpg"},
    {name:"sahel yacine",image: "yacine.jpg"},
]
const players = playersData.map(playerData => new Player(playerData.name, playerData.image))

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
            slimani_abdenoor: 42,
        },
        bestScore:""
    },{
        day: 12,
        date: "Friday 15 December 2023",
        scores: {
            abdenoor_alvaro: 47,
            sahel_yacine: 63,
            bourmel_islem: 66,
            boussebain_mahfoud: 110,
            slimani_abdenoor: 43,
        },
        bestScore:""
    },{
        day: 13,
        date: "Saturday 16 December 2023",
        scores: {
            abdenoor_alvaro: 42,
            sahel_yacine: 58,
            bourmel_islem: 16,
            boussebain_mahfoud: 60,
            slimani_abdenoor: 30,
        },
        bestScore:""
    },{
        day: 14,
        date: "Sunday 17 December 2023",
        scores: {
            abdenoor_alvaro: 110.5,
            sahel_yacine: 64,
            bourmel_islem: 28.5,
            boussebain_mahfoud: 58,
            slimani_abdenoor: 45,
        },
        bestScore:""
    },{
        day: 15,
        date: "Monday 18 December 2023",
        scores: {
            abdenoor_alvaro: 56,
            sahel_yacine: 55,
            bourmel_islem: 30.5,
            boussebain_mahfoud: 69.5,
            slimani_abdenoor: 50,
        },
        bestScore:""
    },{
        day: 16,
        date: "Tuesday 19 December 2023",
        scores: {
            abdenoor_alvaro: 56,
            sahel_yacine: 58.5,
            bourmel_islem: 48.5,
            boussebain_mahfoud: 66,
            slimani_abdenoor: 47,
        },
        bestScore:""
    },{
        day: 17,
        date: "Wednesday 20 December 2023",
        scores: {
            abdenoor_alvaro: 71,
            sahel_yacine: 72,
            bourmel_islem: 25.5,
            boussebain_mahfoud: 56.5,
            slimani_abdenoor: 44,
        },
        bestScore:""
    },{
        day: 18,
        date: "Thursday 21 December 2023",
        scores: {
            abdenoor_alvaro: 79,
            sahel_yacine: 53.5,
            bourmel_islem: 39,
            boussebain_mahfoud: 126.5,
            slimani_abdenoor: 47,
        },
        bestScore:""
    },{
        day: 19,
        date: "Friday 22 December 2023",
        scores: {
            abdenoor_alvaro: 92,
            sahel_yacine: 49,
            bourmel_islem: false,
            boussebain_mahfoud: 61,
            slimani_abdenoor: false,
        },
        bestScore:""
    },
]
// End Data

// Start Calculating Points
calculatePoints(players,daysData)
// End Calculating Points
// Start Sorting
const sortedPlayers = [...players].sort((a, b) => b.TotalPoints - a.TotalPoints)
sortedPlayers.forEach((player, index) => {
    player.Rank = index +1
})
// End Sorting

// Start Table Page
// Start Functions
function generateHtmlTablePage(sortedPlayers) {
    const htmlTableLocation = document.querySelector(".content")
    const html = `
    <div class="table-page-content">
        <div class="main-header fw-bold bg-primary py-5 fs-1 mb-5">
            <div class="container ">
                <div class="header">Overall Ranking</div>
            </div>
        </div>
        <div class="container">
            <div class="table w-100">
                <div class="headline w-100 d-flex">
                    <span class="rank">Rank</span>
                    <span class="rank-change"></span>
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
    let counter = 0
    for (let i = 0; i < daysData.length; i++) {
        let day = daysData[i]
        if (day.bestScore.length === 0) {
            break
        }
        counter += 1
    }
    let thisRound = daysData[counter - 1].SortedPlayersThisRound
    let beforeRound = daysData[counter - 2].SortedPlayersThisRound
    let thisRank
    let beforeRank
    let rankChange = "circle"
    let rankChangeValue = ""
    for (let x = 0; x < beforeRound.length; x++) {
        if (playerName === beforeRound[x].Name) {
            beforeRank = x
        }
    }
    for (let x = 0; x < thisRound.length; x++) {
        if (playerName === thisRound[x].Name) {
            thisRank = x
        }
    }
    if (beforeRank < thisRank) {
        rankChange = "arrow-down"
        rankChangeValue = beforeRank - thisRank
    } else if (beforeRank > thisRank) {
        rankChange = "arrow-up"
        rankChangeValue = beforeRank - thisRank
    }
    if (screen.width < 786) {
        playerName = smallScreenName(player.Name)
    }
    return `
    <div class="playerline w-100 d-flex justify-content-between align-items-center bg-white">
        <span class="rank fw-bold">${player.Rank}</span>
        <span class="rank-change" title="Previous position: ${beforeRank + 1}"><i class="fa-solid fa-${rankChange}"><span>${rankChangeValue}</span></i></span>
        <span class="image"><img class="generateProfile" id="${player.Id}" src="images/${player.Image}" alt=""></span>
        <span class="player flex-grow-1"><a href="player-profile.html?${player.Id}"class="player-name p-0 generateProfile" id="${player.Id}" title="${player.Name}">${capitalize(playerName)}</a></span>
        <span class="round">${player.TotalRounds}</span>
        <span class="points">${player.TotalPoints}</span>
    </div>
    `
}
// End Functions
if (currentPage.includes("index.html") || currentPage === "/Game-Of-Life/") {
    generateHtmlTablePage(sortedPlayers)
}
// End Table Page


// Start Player Profile Page
function generateProfilePage() {
    let pageHead = document.querySelector("head")
    let player = ""
    for (let i = 0; i < players.length; i++) {
        if (players[i].Id === `id=${UrlId}`) {
            player = players[i]
        }
    }
    let playerName = player.Name
    
    let openGraphMetadata = `
    <meta property="og:title" content="Game Of Life (${playerName})" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://abdenoor-alvaro.github.io/Game-Of-Life/player-profile.html?${player.Id}/" />
    <meta property="og:image" content="images/${player.Image}" />
    <meta property="og:description" content="a self development game that you can play in the real world with your friends" />
    <meta property="og:locale" content="ar_DZ" />
    `
    pageHead.innerHTML += openGraphMetadata
    if (screen.width < 786) {
        playerName = smallScreenName(player.Name)
    }
    document.querySelector('title').textContent = `${capitalize(playerName)}`
    const htmlTableLocation = document.querySelector(".content")
    const pageHtml = `
    <div class="player-profile-content">
        <div class="main-header fw-bold bg-primary py-5 mb-5">
            <div class="container d-flex align-items-center">
                <div class="image"><img src="images/${player.Image}" alt="" class="thumbnail" onclick="openImage('images/${player.Image}')"></div>
                <div class="header">${capitalize(playerName)}</div>
            </div>
        </div>
        <div class="container">
            <div class="table w-100">
                <div class="headline w-100 d-flex">
                    <span class="rank">rank</span>
                    <span class="rank-change"></span>
                    <span class="date flex-grow-1">Date</span>
                    <span class="round">Round</span>
                    <span class="score">Score</span>
                </div>
                ${generateDayHtml(player)}
                <hr>
                <div class="player-stats">
                    <div class="player-stats-header">${capitalize(playerName).split(" ")[1]}'s <span>Stats</span> </div>
                    <div class="stats">
                        <div class="stat">
                            <div class="value">${player.bestScore}</div>
                            <div class="description">Best Score</div>
                        </div>
                        <div class="stat">
                            <div class="value">${player.average().toFixed(2)}</div>
                            <div class="description">Average</div>
                        </div>
                        <div class="stat">
                            <div class="value">${player.lowestScore}</div>
                            <div class="description">Lowest Score</div>
                        </div>
                        <div class="stat">
                            <div class="value">${player.TotalStars}</div>
                            <div class="description">Stars</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    
    htmlTableLocation.innerHTML = pageHtml
}
function generateDayHtml(player) {
    let div = document.createElement("div")
    let oldRank = 0
    let newRank = 1
    for (let i = 1; i <= daysData.length; i++){
        let counter = 0
        if (daysData[daysData.length - i].bestScore.length === 0) {
            counter += 1
            continue
        }
        let playerName = player.Name
        let rankChange = "circle"
        let rankChangeValue = ""
        let newRankList = daysData[daysData.length - i].SortedPlayersThisRound
        let oldRankList
        if (i !== daysData.length - counter) {
            oldRankList = daysData[daysData.length - i - 1].SortedPlayersThisRound
        } else {
            oldRankList = daysData[daysData.length - i].SortedPlayersThisRound
        }
        
        for (let x = 0; x < newRankList.length; x++) {
            if (playerName === newRankList[x].Name) {
                newRank = x + 1
            }
        }
        for (let x = 0; x < oldRankList.length; x++) {
            if (playerName === oldRankList[x].Name) {
                oldRank = x + 1
            }
        }
        if (oldRank < newRank) {
            rankChange = "arrow-down"
            rankChangeValue = oldRank - newRank
        } else if (oldRank > newRank) {
            rankChange = "arrow-up"
            rankChangeValue = oldRank - newRank
        }
        if (player.Name.split(" ").length > 1) {
            playerName = player.Name.split(" ").join("_")
        }

        let day = daysData[daysData.length - i].day
        const bestScoreArray = daysData[daysData.length - i].bestScore
        
        let date = daysData[daysData.length - i].date
        if (screen.width < 786) {
            date = smallScreenDate(daysData[daysData.length - i].date)
        }

        const scores = daysData[daysData.length - i].scores
        let score 
        
        
        if (scores[playerName]) {
            console.log("hello")
            score = scores[playerName]
            
            let scoreSpan = `<span class="score">${score}</span>`
            for (const best of bestScoreArray) {
                if (best === playerName) {
                    scoreSpan = `<span class="score first-icon" title="Highest Score In Round ${day}">${score}</span>`
                    player.TotalStars += 1
                }
            }
    
            for (const highest of highestScorePlayers) {
                if (highest.player === playerName && highest.day === day) {
                    scoreSpan = `<span class="score best-ever" title="Highest Round Score Ever">${score}</span>`
                }
            }
            div.innerHTML += `
            <div class="day-line d-flex align-items-center bg-white">
                <span class="rank fw-bold">${newRank}</span>
                <span class="rank-change"><i class="fa-solid fa-${rankChange}"><span>${rankChangeValue}</span></i></span>
                <span class="date flex-grow-1">${date}</span>
                <span class="round">${daysData[daysData.length - i].day}</span>
                ${scoreSpan}
            </div>
            `
        }
    }
    return div.innerHTML
}
if (currentPage.includes("player-profile.html")) {
    generateProfilePage()
}
// End Player Profile Page
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
                    <div class="table-page-content">
                        <div class="container">
                            <div class="table w-100 m-0">
                                <div class="headline w-100 d-flex">
                                    <span class="rank">Rank</span>
                                    <span class="image"></span>
                                    <span class="player flex-grow-1">Player</span>
                                    <span class="points">Points</span>
                                </div>
                            </div>
                            ${generatePlayerHtmlOnRoundsPage(sortedList, round.day) }
                        </div>
                    </div>
                </div>
            </div>
        `
        div.innerHTML = roundPageHtml
        htmlLocation.prepend(div) 
    }
    
}
function generatePlayerHtmlOnRoundsPage(sortedList, day) {
    let roundTable =``
    let rank = 1
    for (let x = 0; x < sortedList.length; x++){
        let player
        let pointSpan = `<span class="points">${sortedList[x].point}</span>`
        for (const highest of highestScorePlayers) {
            if (highest.player === sortedList[x].name && highest.day === day) {
                pointSpan = `<span class="points best-ever" title="Highest Round Score Ever">${sortedList[x].point}</span>`
            }
        }
        playerName = sortedList[x].name.split("_").join(" ")
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
            ${pointSpan}
        </div>
        `
        rank += 1
    }
    return roundTable
}
if (currentPage.includes("rounds.html")) {
    generateRoundPage()
}
// End Rounds Page


// Start Generating links
const clickedPlayer = document.querySelectorAll(".generateProfile");
clickedPlayer.forEach(element => {
    element.addEventListener("click", () => window.location.href = `player-profile.html?${element.id}`);
    console.log(element.id)});
// End Generating links
