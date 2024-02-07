const currentPage = window.location.pathname;
console.log(currentPage)

const body = document.querySelector("body")
console.log(body)
let footer = document.querySelector("footer")
footer.innerHTML = `
        <div class="footer">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
            <div class="container footer-content">
                <div class="left-side">
                    <a href="#home" class="logo">
                        GAME
                        <br>
                        OF
                        <br>
                        LIFE                        
                    </a>
                    <div class="contact-us-btn"><span>interested to join?</span><a href="https://www.facebook.com/abdenoor.alvaro" target="_blank">CONTACT US</a></div>
                </div>
                <div class="right-side">
                    <ul>
                        <li><a href="index.html"><div>OVERALL&nbsp;</div>  RANKING</a></li>
                        <li><a href="rounds.html">ROUNDS</a></li>
                        <li><a href="rules.html">RULES</a></li>
                        <li><a href="players.html">PLAYERS</a></li>
                    </ul>
                </div>
            </div>
            <p class="bottom-footer">Made With <i class="fa-solid fa-heart" style="color: #ff0000;"></i> By Alvaro</p>
        </div>
`
if (currentPage.includes("players.html") || currentPage.includes("rounds.html") || currentPage.includes("player-profile.html")) {
    let hh = document.querySelector(".shape-fill")
    hh.style.fill = "#f7f9fc"
    if (currentPage.includes("player-profile.html")) {
        footer.style.marginTop = "-20px"
    }
}
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
                player.RoundsScores.push({ date: day.date, roundNumber: day.day, roundScore: scores[playerName] })
            } else {
                player.RoundsScores.push({ date: day.date, roundNumber: day.day, roundScore: false })
            }
        }

        // sorting the overall ranking of the players on every round and storing it in that perticular day
        let SortedPlayersThisRound = [...players].sort((a, b) => b.TotalPoints - a.TotalPoints)
        day.SortedPlayersThisRound = SortedPlayersThisRound
        for (let i = 0; i < SortedPlayersThisRound.length; i++) {
            if ((i !== 0) && (SortedPlayersThisRound[i].TotalPoints === SortedPlayersThisRound[i - 1].TotalPoints)) {
                SortedPlayersThisRound[i].RoundsScores[SortedPlayersThisRound[i].RoundsScores.length - 1].thisRoundRank = SortedPlayersThisRound[i - 1].RoundsScores[SortedPlayersThisRound[i].RoundsScores.length - 1].thisRoundRank
            } else {
                SortedPlayersThisRound[i].RoundsScores[SortedPlayersThisRound[i].RoundsScores.length - 1].thisRoundRank = i + 1
            }
        }
        
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
            if (round.roundScore < player.lowestScore && round.roundScore !== false) {
                player.lowestScore = round.roundScore
            }
        }
        if (player.lowestScore === 500) {
            player.lowestScore = 0
        }
    }
}
let indicator = true
function disableScrolling() {
    if (indicator) {
        body.style.overflow = "hidden"
        indicator = false
        return
    }
    indicator = true
    body.style.overflow = "visible"
}
function openImage(imageSrc) {
    const fullscreen = document.getElementById('fullscreen');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = imageSrc;
    const selectedImage = new Image()
    selectedImage.src = imageSrc
    let widthDifference = screen.width - selectedImage.width
    let heightDifference = screen.height - selectedImage.height

    if (widthDifference < heightDifference) {
        fullscreenImage.style.width = "90%"
    } else {
        fullscreenImage.style.height = "90%"
        fullscreenImage.style.width = "unset"
    }
    body.style.overflow = "hidden"
    fullscreen.style.display = 'block';
}
function closeFullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
    body.style.overflow = "visible"
}
function generateUniqueId() {
    return "id=" + idCounter++
}
function capitalize(sentence) {
    return sentence.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function smallScreenName(name) {
    let splitedName = name.split(" ")
    if (splitedName.length < 2) {
        return name
    }
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
        this.Id = generateUniqueId()
        this.TotalRounds = 0
        this.TotalPoints = 0
        this.TotalStars = 0
        this.RoundsScores = []
        this.bestScore = 0
        this.lowestScore = 500    
    }
    average = () => {return this.TotalPoints / this.TotalRounds}
}

const playersData = [
    { name: "bourmel islem",image: "islem.jpg" },
    { name: "abdenoor alvaro",image: "abdenoor.jpg" },
    { name: "sahel yacine", image: "yacine.jpg" },
    // { name: "marceline", image: "marceline.jpg" },
    { name: "mohamed djawad", image: "djawad.jpg" },
    { name: "lee chin", image: "lechin.jpg" },
    { name: "lagraa hanene", image: "hanene.jpg" },
    { name: "seoyoon zahra", image: "zahra.jpg" },
    { name: "bochra assouma", image: "bouchra.jpg" },
    // { name: "chahinez chanez", image: "chahinez.jpg" },
    // { name: "bnsdk iman", image: "iman.jpg" },
    { name: "profeseur youcef", image: "profesuer-youcef.jpg" },
    // { name: "taous", image: "rose.jpg" },
    
]
const players = playersData.map(playerData => new Player(playerData.name, playerData.image))

const daysData = [
    {
        day: 1,
        date: "Saturday 06 January 2024",
        scores: {
            abdenoor_alvaro: 72,
            sahel_yacine: 78,
            bourmel_islem: 32,
            marceline: 19.5,
            mohamed_djawad: 65.5,
            lee_chin: 83,
            lagraa_hanene: 65,
            seoyoon_zahra: 90.5,
            bochra_assouma: 48,
            chahinez_chanez: 15,
            bnsdk_iman: 19,
            profeseur_youcef: 82,
            taous: 22,
        },
        bestScore: ""
    },
    {
        day: 2,
        date: "Sunday 07 January 2024",
        scores: {
            abdenoor_alvaro: 108.5,
            sahel_yacine: 72.5,
            bourmel_islem: 23,
            marceline: 36.5,
            mohamed_djawad: 63.5,
            lee_chin: 101,
            lagraa_hanene: 58,
            seoyoon_zahra: 101.5,
            bochra_assouma: 55,
            chahinez_chanez: 10,
            bnsdk_iman: 45,
            profeseur_youcef: 87,
            taous: 18,
        },
        bestScore: ""
    },
    {
        day: 3,
        date: "Monday 08 January 2024",
        scores: {
            abdenoor_alvaro: 90,
            sahel_yacine: 74.5,
            bourmel_islem: 47,
            marceline: 43.5,
            mohamed_djawad: 76.5,
            lee_chin: 84,
            lagraa_hanene: 55,
            seoyoon_zahra: 99,
            bochra_assouma: 61,
            chahinez_chanez: 39.5,
            bnsdk_iman: 61.5,
            profeseur_youcef: 105,
            taous: 28,
        },
        bestScore: ""
    },
    {
        day: 4,
        date: "Tuesday 09 January 2024",
        scores: {
            abdenoor_alvaro: 61.5,
            sahel_yacine: 61.5,
            bourmel_islem: 75.5,
            marceline: 67.5,
            mohamed_djawad: 81,
            lee_chin: 106,
            lagraa_hanene: 79.5,
            seoyoon_zahra: 94,
            bochra_assouma: 53,
            chahinez_chanez: 45,
            bnsdk_iman: 43,
            profeseur_youcef: 74.5,
            taous: 36,
        },
        bestScore: ""
    },
    {
        day: 5,
        date: "Wednesday 10 January 2024",
        scores: {
            abdenoor_alvaro: 66.5,
            sahel_yacine: 65.5,
            bourmel_islem: 74,
            marceline: 30,
            mohamed_djawad: 81,
            lee_chin: 106,
            lagraa_hanene: 71.5,
            seoyoon_zahra: 70,
            bochra_assouma: 62,
            chahinez_chanez: 32,
            bnsdk_iman: 54,
            profeseur_youcef: 103,
            taous: 35.5,
        },
        bestScore: ""
    },
    {
        day: 6,
        date: "Thursday 11 January 2024",
        scores: {
            abdenoor_alvaro: 110.5,
            sahel_yacine: 69,
            bourmel_islem: 62.5,
            marceline: 43.5,
            mohamed_djawad: 76.5,
            lee_chin: 104,
            lagraa_hanene: 62.5,
            seoyoon_zahra: 105,
            bochra_assouma: 60,
            chahinez_chanez: 34,
            bnsdk_iman: 51,
            profeseur_youcef: 126.5,
            taous: 38.5,
        },
        bestScore: ""
    },
    {
        day: 7,
        date: "Saturday 13 January 2024",
        scores: {
            abdenoor_alvaro: 115,
            sahel_yacine: 57,
            bourmel_islem: 90,
            marceline: 51,
            mohamed_djawad: 67.5,
            lee_chin: 111,
            lagraa_hanene: 71,
            seoyoon_zahra: 108,
            bochra_assouma: 87,
            chahinez_chanez: 45,
            bnsdk_iman: 61,
            profeseur_youcef: 101,
            taous: 52,
        },
        bestScore: ""
    },
    {
        day: 8,
        date: "Sunday 14 January 2024",
        scores: {
            abdenoor_alvaro: 86,
            sahel_yacine: 68,
            bourmel_islem: 66.5,
            marceline: 42,
            mohamed_djawad: 82,
            lee_chin: 111,
            lagraa_hanene: 74.5,
            seoyoon_zahra: 98.5,
            bochra_assouma: 96,
            chahinez_chanez: 50,
            bnsdk_iman: 75,
            profeseur_youcef: 107.5,
            taous: 40,
        },
        bestScore: ""
    },
    {
        day: 9,
        date: "Monday 15 January 2024",
        scores: {
            abdenoor_alvaro: 96.5,
            sahel_yacine: 48,
            bourmel_islem: 37.5,
            marceline: 60.5,
            mohamed_djawad: 85,
            lee_chin: 114,
            lagraa_hanene: 76.5,
            seoyoon_zahra: 80,
            bochra_assouma: 84,
            chahinez_chanez: 50,
            bnsdk_iman: 58,
            profeseur_youcef: 104.5,
            taous: 49,
        },
        bestScore: ""
    },
    {
        day: 10,
        date: "Tuesday 16 January 2024",
        scores: {
            abdenoor_alvaro: 39,
            sahel_yacine: 58,
            bourmel_islem: 50.5,
            marceline: 71,
            mohamed_djawad: 86,
            lee_chin: 114,
            lagraa_hanene: 72.5,
            seoyoon_zahra: 93,
            bochra_assouma: 96,
            chahinez_chanez: 45,
            bnsdk_iman: 72,
            profeseur_youcef: 99,
            taous: 52,
        },
        bestScore: ""
    },
    {
        day: 11,
        date: "Wednesday 17 January 2024",
        scores: {
            abdenoor_alvaro: 86,
            sahel_yacine: 63,
            bourmel_islem: 43,
            marceline: 57,
            mohamed_djawad: 68,
            lee_chin: 114,
            lagraa_hanene: 79,
            seoyoon_zahra: 70,
            bochra_assouma: 95.5,
            chahinez_chanez: 40,
            bnsdk_iman: 68,
            profeseur_youcef: 97.5,
            taous: 55,
        },
        bestScore: ""
    },
    {
        day: 12,
        date: "Thursday 18 January 2024",
        scores: {
            abdenoor_alvaro: 76,
            sahel_yacine: 66,
            bourmel_islem: 31,
            marceline: 70,
            mohamed_djawad: 80,
            lee_chin: 114,
            lagraa_hanene: 84,
            seoyoon_zahra: 53,
            bochra_assouma: 105,
            chahinez_chanez: 40,
            bnsdk_iman: 54,
            profeseur_youcef: 95.5,
            taous: 48,
        },
        bestScore: ""
    },
    {
        day: 13,
        date: "Saturday 20 January 2024",
        scores: {
            abdenoor_alvaro: 69,
            sahel_yacine: 62.5,
            bourmel_islem: 42.5,
            marceline: 87,
            mohamed_djawad: 63.5,
            lee_chin: 110,
            lagraa_hanene: 57,
            seoyoon_zahra: 55,
            bochra_assouma: 84,
            chahinez_chanez: 50,
            bnsdk_iman: 59,
            profeseur_youcef: 90,
            taous: 52,
        },
        bestScore: ""
    },
    {
        day: 14,
        date: "Sunday 21 January 2024",
        scores: {
            abdenoor_alvaro: 72,
            sahel_yacine: 63,
            bourmel_islem: 31,
            marceline: 68,
            mohamed_djawad: 78,
            lee_chin: 114,
            lagraa_hanene: 40,
            seoyoon_zahra: 75,
            bochra_assouma: 84,
            chahinez_chanez: 66,
            bnsdk_iman: 51,
            profeseur_youcef: 103.5,
            taous: 55,
        },
        bestScore: ""
    },
    {
        day: 15,
        date: "Monday 22 January 2024",
        scores: {
            abdenoor_alvaro: 56,
            sahel_yacine: 62,
            bourmel_islem: 26,
            marceline: 85,
            mohamed_djawad: 79,
            lee_chin: 103,
            lagraa_hanene: 53,
            seoyoon_zahra: 36,
            bochra_assouma: 90.5,
            chahinez_chanez: 50,
            bnsdk_iman: 30,
            profeseur_youcef: 99.5,
            taous: 58,
        },
        bestScore: ""
    },
    {
        day: 16,
        date: "Tuesday 23 January 2024",
        scores: {
            abdenoor_alvaro: 75.5,
            sahel_yacine: 68,
            bourmel_islem: 26.5,
            marceline: 66,
            mohamed_djawad: 68,
            lee_chin: 100,
            lagraa_hanene: 45,
            seoyoon_zahra: 50,
            bochra_assouma: 92,
            chahinez_chanez: 60,
            bnsdk_iman: 22,
            profeseur_youcef: 94.5,
            taous: 61.5,
        },
        bestScore: ""
    },
    {
        day: 17,
        date: "Wednesday 24 January 2024",
        scores: {
            abdenoor_alvaro: 58.5,
            sahel_yacine: 59,
            bourmel_islem: 33,
            marceline: 94,
            mohamed_djawad: 67,
            lee_chin: 93,
            lagraa_hanene: 49,
            seoyoon_zahra: 71,
            bochra_assouma: 84,
            chahinez_chanez: 79,
            bnsdk_iman: 31,
            profeseur_youcef: 101.5,
            taous: 65,
        },
        bestScore: ""
    },
    {
        day: 18,
        date: "Thursday 25 January 2024",
        scores: {
            abdenoor_alvaro: 99.5,
            sahel_yacine: 65.5,
            bourmel_islem: 30,
            marceline: 80,
            mohamed_djawad: 60,
            lee_chin: 93,
            lagraa_hanene: 52,
            seoyoon_zahra: 53,
            bochra_assouma: 84,
            chahinez_chanez: 40,
            bnsdk_iman: 28,
            profeseur_youcef: 86,
            taous: 61,
        },
        bestScore: ""
    },
    {
        day: 19,
        date: "Saturday 27 January 2024",
        scores: {
            abdenoor_alvaro: 95,
            sahel_yacine: 60,
            bourmel_islem: 29,
            marceline: 68,
            mohamed_djawad: 49,
            lee_chin: 94,
            lagraa_hanene: 76,
            seoyoon_zahra: 70,
            bochra_assouma: 84,
            chahinez_chanez: 45,
            bnsdk_iman: 30,
            profeseur_youcef: 81,
            taous: 61,
        },
        bestScore: ""
    },
    {
        day: 20,
        date: "Sunday 28 January 2024",
        scores: {
            abdenoor_alvaro: 103,
            sahel_yacine: 63,
            bourmel_islem: 28.5,
            marceline: 65,
            mohamed_djawad: 55,
            lee_chin: 94,
            lagraa_hanene: 80,
            seoyoon_zahra: 64,
            bochra_assouma: 84,
            chahinez_chanez: 65,
            bnsdk_iman: 23.5,
            profeseur_youcef: 91,
            taous: 61,
        },
        bestScore: ""
    },
    {
        day: 21,
        date: "Monday 29 January 2024",
        scores: {
            abdenoor_alvaro: 78,
            sahel_yacine: 59.5,
            bourmel_islem: 39,
            marceline: 56,
            mohamed_djawad: 76.5,
            lee_chin: 101,
            lagraa_hanene: 77.5,
            seoyoon_zahra: 82,
            bochra_assouma: 65,
            chahinez_chanez: 50,
            bnsdk_iman: 47.5,
            profeseur_youcef: 91,
            taous: 62,
        },
        bestScore: ""
    },
    {
        day: 22,
        date: "Tuesday 30 January 2024",
        scores: {
            abdenoor_alvaro: 90.5,
            sahel_yacine: 59,
            bourmel_islem: 42,
            marceline: 57,
            mohamed_djawad: 63.5,
            lee_chin: 95,
            lagraa_hanene: 72,
            seoyoon_zahra: 70,
            bochra_assouma: 60,
            chahinez_chanez: 60,
            bnsdk_iman: 28,
            profeseur_youcef: 75,
            taous: 56,
        },
        bestScore: ""
    },
    {
        day: 23,
        date: "Wednesday 31 January 2024",
        scores: {
            abdenoor_alvaro: 90,
            sahel_yacine: 53.5,
            bourmel_islem: 44,
            marceline: 48,
            mohamed_djawad: 73.5,
            lee_chin: 101,
            lagraa_hanene: 62,
            seoyoon_zahra: 70,
            bochra_assouma: 33,
            chahinez_chanez: 45,
            bnsdk_iman: 42,
            profeseur_youcef: 78,
            taous: 53,
        },
        bestScore: ""
    },
    {
        day: 24,
        date: "Thursday 01 February 2024",
        scores: {
            abdenoor_alvaro: 89,
            sahel_yacine: 46,
            bourmel_islem: 37,
            marceline: 40,
            mohamed_djawad: 69.5,
            lee_chin: 100,
            lagraa_hanene: 68,
            seoyoon_zahra: 75,
            bochra_assouma: 15,
            chahinez_chanez: 50,
            bnsdk_iman: 43,
            profeseur_youcef: 82.5,
            taous: 56,
        },
        bestScore: ""
    },
    {
        day: 25,
        date: "Saturday 03 February 2024",
        scores: {
            abdenoor_alvaro: 80,
            sahel_yacine: 54,
            bourmel_islem: 48,
            marceline: false,
            mohamed_djawad: 53.5,
            lee_chin: 97,
            lagraa_hanene: 56,
            seoyoon_zahra: 98,
            bochra_assouma: 15,
            chahinez_chanez: false,
            bnsdk_iman: false,
            profeseur_youcef: 79.5,
            taous: false,
        },
        bestScore: ""
    },
    {
        day: 26,
        date: "Sunday 04 February 2024",
        scores: {
            abdenoor_alvaro: 79,
            sahel_yacine: 73.5,
            bourmel_islem: 27.5,
            marceline: false,
            mohamed_djawad: 74,
            lee_chin: 123,
            lagraa_hanene: 79.5,
            seoyoon_zahra: 74,
            bochra_assouma: false,
            chahinez_chanez: false,
            bnsdk_iman: false,
            profeseur_youcef: 79,
            taous: false,
        },
        bestScore: ""
    },
    {
        day: 27,
        date: "Monday 05 February 2024",
        scores: {
            abdenoor_alvaro: 66,
            sahel_yacine: 57.5,
            bourmel_islem: 61,
            marceline: false,
            mohamed_djawad: 63.5,
            lee_chin: 120,
            lagraa_hanene: 67,
            seoyoon_zahra: 88,
            bochra_assouma: false,
            chahinez_chanez: false,
            bnsdk_iman: false,
            profeseur_youcef: 79,
            taous: false,
        },
        bestScore: ""
    },
    {
        day: 28,
        date: "Tuesday 06 February 2024",
        scores: {
            abdenoor_alvaro: 90,
            sahel_yacine: false,
            bourmel_islem: false,
            marceline: false,
            mohamed_djawad: 61,
            lee_chin: 123,
            lagraa_hanene: 66,
            seoyoon_zahra: 60,
            bochra_assouma: false,
            chahinez_chanez: false,
            bnsdk_iman: false,
            profeseur_youcef: 80,
            taous: false,
        },
        bestScore: ""
    },
    // {
    //     day: 29,
    //     date: "Wednesday 07 February 2024",
    //     scores: {
    //         abdenoor_alvaro: false,
    //         sahel_yacine: false,
    //         bourmel_islem: false,
    //         marceline: false,
    //         mohamed_djawad: false,
    //         lee_chin: false,
    //         lagraa_hanene: false,
    //         seoyoon_zahra: false,
    //         bochra_assouma: false,
    //         chahinez_chanez: false,
    //         bnsdk_iman: false,
    //         profeseur_youcef: false,
    //         taous: false,
    //     },
    //     bestScore: ""
    // },
    // {
    //     day: 30,
    //     date: "Thursday 08 February 2024",
    //     scores: {
    //         abdenoor_alvaro: false,
    //         sahel_yacine: false,
    //         bourmel_islem: false,
    //         marceline: false,
    //         mohamed_djawad: false,
    //         lee_chin: false,
    //         lagraa_hanene: false,
    //         seoyoon_zahra: false,
    //         bochra_assouma: false,
    //         chahinez_chanez: false,
    //         bnsdk_iman: false,
    //         profeseur_youcef: false,
    //         taous: false,
    //     },
    //     bestScore: ""
    // },
]

// Start Latest News Data
let newsData = {
    news9: {
        img: "abdenoor.jpg",
        header: "AFCON 2023 | FINAL DRAW",
        description: `<b>Groups:</b>
<br>
<b>Group A:</b> Ivory Coast, Nigeria, Equatorial Guinea, Guinea Bissau
<br>
<b>Group B:</b> Egypt, Ghana, Cape Verde Islands, Mozambique
<br>
<b>Group C:</b> Senegal, Cameroon, Guinea, Gambia
<br>
<b>Group D:</b> Algeria, Burkina Faso, Mauritania, Angola
<br>
<b>Group E:</b> Tunisia, Mali, South Africa, Namibia
<br>
<b>Group F:</b> Morocco, DR Congo, Zambia, Tanzania`,
        date: "15 Oct 2023",
        lan: "english",
        postId: "n1",
        // video: "TVV95Cw05og?si=Vl6BRuQVvy3K1I77"
    },
}
let news = Object.values(newsData)
// End Latest News Data
// End Data

// Start Calculating Points
calculatePoints(players,daysData)
// End Calculating Points
// Start Sorting
const sortedPlayers = [...players].sort((a, b) => b.TotalPoints - a.TotalPoints)
// sortedPlayers.forEach((player, i) => {
//     player.Rank = i + 1
//     console.log(player[i-1])
// })
// End Sorting

// // Start All News Page
// if (currentPage.includes("all-news.html")) {
//     function allNewsPageHtml(newsBoxes) {
//         let allNewsPageHtml = `
//         <div class="all-news-page">
//             <div class="all-news-header">Latest News</div>
//             <div class="all-news">
//                 ${newsBoxes}
//             </div>
//         </div>
//         `
//         document.querySelector(".news-content").innerHTML += allNewsPageHtml
//     }
//     function newsBoxes(...list) {
//         let newsBox = `
//         <a href="#" class="news-box forNewsPage" id="${list[3]}" title="Read More">
//             <div class="image">
//                 ${list[5]}
//                 <img src="images/${list[0]}" alt="">
//             </div>
//             <div class="news-header ${list[2]}">
//                 <p>${list[1]}</p>
//             </div>
//         </a>
//         `
//         list[4].innerHTML += newsBox
//         console.log(list[4])
//         return list[4].innerHTML
//     }


//     let newsBoxLocation = document.createElement("div")
//     for (let i = 0; i < news.length; i++) {
//         let post = Object.values(news[i])
//         let video = " "
//         if (post[6] !== undefined) {
//             video = `<div class="video-icon-in-news-page"></div> `
//         }
//         let list = [post[0], post[1], post[4], post[5], newsBoxLocation, video]
//         if (i === news.length - 1) {
//             allNewsPageHtml(newsBoxes(...list))
//         } else {
//         console.log(news.length)
//             newsBoxes(...list)
//         }
//     }
// }

// // End All News Page

// // Start Latest News In Home Page
// function postHtml(...list) {
//     let postHtml = `
//                 <div class="post-slide">
//                     <div class="post-img">
//                         ${list[8]}
//                         <img src="images/${list[0]}" alt="">
//                         <a href="${list[5]}" class="over-layer forNewsPage" id="${list[7]}"><i class="fa fa-link"></i></a>
//                     </div>
//                     <div class="post-content">
//                         <h3 class="post-title ${list[4]}">
//                             <a href="${list[5]}" class="forNewsPage" id="${list[7]}">${list[1]}</a>
//                         </h3>
//                         <p class="post-description ${list[4]}">${list[2]}</p>
//                         <span class="post-date"><i class="fa fa-clock"></i>${list[3]}</span>
//                         <a href="${list[5]}" class="read-more forNewsPage" id="${list[7]}">read more</a>
//                     </div>
//                 </div>
//     `
//     list[6].innerHTML += postHtml
// }


// if (currentPage.includes("index.html") || currentPage === "/" || currentPage === "/mini_championnat_coup-u11/") {
//     let position = document.querySelector("#news-slider")
//     let newsContainer = document.querySelector(".news-container")
//     let seeAllBtn = document.querySelectorAll(".see-all-btn")
//     if (news.length === 0) {
//         newsContainer.style.margin = "0px auto 20px"
//         newsContainer.style.fontWeight = "500"
//         seeAllBtn.forEach(element => {
//             element.style.display = "none"
//         });
//         newsContainer.innerHTML += "No News Available Yet"
//     }
//     for (let i = 0; i < news.length; i++) {
//         if (i === 6) {
//             break;
//         }
//         let post = Object.values(news[i])
//         let file = "#"
//         let video = " "
//         if (post[6] !== undefined) {
//             video = `<a href="${file}" class="forNewsPage" id="${post[5]}"><div class="video-icon-in-post-slide"></div></a> `
//         }
//         let list = [post[0], post[1], post[2], post[3], post[4], file, position, post[5], video]
        
//         postHtml(...list)
//     }
//     $(document).ready(function() {
//         $("#news-slider").owlCarousel({
//             items : 3,
//             itemsDesktop:[1199,3],
//             itemsDesktopSmall:[980,2],
//             itemsMobile : [600,1],
//             navigation:true,
//             navigationText:["",""],
//             pagination:true,
//             autoPlay:true
//         });
//     });
// }

// // End Latest News In Home Page
// // Start News Generate
// function newsGenerateHtml(...list) {
//     let newsGenerateHtml = `
//     <div class="news-generate-page">
//         <div class="container">
//             <div class="header-section">
//                 <div class="news-header ${list[4]}">${list[1]}</div>
//                 <div class="date-section">
//                     <p>published:</p>
//                     <div class="date">${list[3]}</div>
//                 </div>
//             </div>
//             <div class="image">
//                 ${list[5]}
//             </div>
//             <div class="news ${list[4]}">
//             ${list[2]}
//             </div>
//             <div class="fullscreen" id="fullscreen">
//                 <span class="close" onclick="closeFullscreen()">&times;</span>
//                 <img src="" alt="Fullscreen Image" class="fullscreen-image"id="fullscreen-image">
//             </div>
//         </div>
//     </div>
//     `
//     document.querySelector(".news-generate-content").innerHTML += newsGenerateHtml
// }
// let clickednews = document.querySelectorAll('.forNewsPage');
// let newsUrlParams = new URLSearchParams(window.location.search);
// let newsId = newsUrlParams.get('id');

// if (currentPage.includes("index.html") || currentPage.includes("all-news.html") || currentPage === "/" || currentPage === "/mini_championnat_coup-u11/") {
//     clickednews.forEach(element => {
//         element.addEventListener("click", () => window.location.href = `news-generate.html?id=${element.id}` );
//     });
// }

// for (let i = 0; i < news.length; i++) {
//     let post = Object.values(news[i])
//     let newsMedia = `<img src="images/${post[0]}" alt="" class="thumbnail" onclick="openImage('images/${post[0]}')"></img>`
//     if (post[6] !== undefined) {
//         newsMedia = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${post[6]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
//     }
//     if (newsId === post[5]) {
//         let list = [post[0], post[1], post[2], post[3], post[4], newsMedia]
//         newsGenerateHtml(...list)
//     }
// }

// End News Generate
// Start Table Page
// Start Functions
function generateHtmlTablePage() {
    const htmlTableLocation = document.querySelector(".table-content")
    const html = `
    <div class="table-page-content">
        <div class="main-header fw-bold py-5 fs-1 mb-5">
            <div class="container ">
                <div class="header">Overall Ranking</div>
            </div>
        </div>
        <div class="container">
            <div class="table tableJs w-100">
                <div class="headline w-100 d-flex">
                    <span class="rank">Rank</span>
                    <span class="rank-change"></span>
                    <span class="image"></span>
                    <span class="player flex-grow-1">Player</span>
                    <span class="round">Round</span>
                    <span class="points">Points</span>
                </div>
                ${generatePlayerHtml()}
            </div>
        </div>
    </div>
    `
    htmlTableLocation.innerHTML = html
}

function generatePlayerHtml() {
    let playersHtml = ``
    for (let i = 0; i < sortedPlayers.length; i++) {
        let player = sortedPlayers[i]
        let playerName = player.Name
        
        let beforeRank  
        let thisRank = player.RoundsScores[player.RoundsScores.length - 1].thisRoundRank
        if (player.RoundsScores.length > 1) {
            beforeRank = player.RoundsScores[player.RoundsScores.length - 2].thisRoundRank
        }
        let rankChangeValue = ""
        let rankChange = `<i class="fa-solid fa-circle">`
        if (beforeRank < thisRank) {
            rankChange = `<i class="fa-solid fa-arrow-down">`
            rankChangeValue = beforeRank - thisRank
        } else if (beforeRank > thisRank) {
            rankChange = `<i class="fa-solid fa-arrow-up">`
            rankChangeValue = beforeRank - thisRank
        }
        // if (daysData[counter - 1].day === 30 && playerName === thisRound[0].Name) {
        //     rankChange = `<i class="fa-solid fa-crown" style="color: #fee500;"></i>`
        // }
        if (screen.width < 786) {
            playerName = smallScreenName(player.Name)
        }
        playersHtml += `<div class="playerline w-100 d-flex justify-content-between align-items-center bg-white">
            <span class="rank fw-bold">${thisRank}</span>
            <span class="rank-change" title="Previous position: ${beforeRank}">${rankChange}<span>${rankChangeValue}</span></i></span>
            <span class="image"><img class="generateProfile" id="${player.Id}" src="images/${player.Image}" alt=""></span>
            <span class="player flex-grow-1"><a href="player-profile.html?${player.Id}"class="player-name p-0 generateProfile" id="${player.Id}" title="${player.Name}">${capitalize(playerName)}</a></span>
            <span class="round">${player.TotalRounds}</span>
            <span class="points">${player.TotalPoints}</span>
        </div>
        `
    }
    return playersHtml

}
// End Functions
if (currentPage.includes("index.html") || currentPage === "/Game-Of-Life/") {
    generateHtmlTablePage()
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
    const htmlTableLocation = document.querySelector(".player-profile-content")
    // console.log(capitalize(playerName).split(" ")[1])
    const pageHtml = `
    <div class="player-profile-content">
        <div class="main-header fw-bold py-5 mb-5">
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
                    <div class="player-stats-header">${capitalize(playerName).split(" ").length > 1 ? capitalize(playerName).split(" ")[1]: capitalize(playerName)}'s <span>Stats</span> </div>
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
    let container = ``
    for (let i = 1 ; i <= player.RoundsScores.length; i++) {
        let round = player.RoundsScores[player.RoundsScores.length - i]
        let playerName = player.Name
        if (round.roundScore) {
            let thisRank = round.thisRoundRank
            let rankChange = "circle"
            let rankChangeValue = " "
            let beforeRank 
            if (i !== player.RoundsScores.length) {
                beforeRank = player.RoundsScores[player.RoundsScores.length - i - 1].thisRoundRank
            } 
            if (beforeRank < thisRank) {
                rankChange = `arrow-down`
                rankChangeValue = beforeRank - thisRank
            } else if (beforeRank > thisRank) {
                rankChange = `arrow-up`
                rankChangeValue = beforeRank - thisRank
            }

            let date = round.date
            if (screen.width < 786) {
                date = smallScreenDate(daysData[daysData.length - i].date)
            }

            let scoreSpan = `<span class="score">${round.roundScore}</span>`
            const bestScoreArray = daysData[daysData.length - i].bestScore
            for (const best of bestScoreArray) {
                if (best.split("_").join(" ") === playerName) {
                    scoreSpan = `<span class="score first-icon" title="Highest Score In Round ${round.roundNumber}">${round.roundScore}</span>`
                    player.TotalStars += 1
                }
            }
    
            for (const highest of highestScorePlayers) {
                if (highest.player.split("_").join(" ") === playerName && highest.day === round.roundNumber) {
                    scoreSpan = `<span class="score best-ever" title="Highest Round Score Ever">${round.roundScore}</span>`
                }
            }
            container += `
                <div class="day-line d-flex align-items-center bg-white">
                    <span class="rank fw-bold">${thisRank}</span>
                    <span class="rank-change"  title="Previous position: ${beforeRank}"><i class="fa-solid fa-${rankChange}"><span>${rankChangeValue}</span></i></span>
                    <span class="date flex-grow-1">${date}</span>
                    <span class="round">${daysData[daysData.length - i].day}</span>
                    ${scoreSpan}
                </div>
            `
        }
    }
    return container
}
if (currentPage.includes("player-profile.html")) {
    generateProfilePage()
}
// End Player Profile Page
// Start Rounds Page
function generateRoundPage(inHomePage) {
    const htmlLocation = document.querySelector(".rounds-content")
    for (let x = 0; x < daysData.length; x++) {
        if (x !== daysData.length - 1 && inHomePage) {
            console.log("helo")
            continue
        }
        let round = daysData[x]
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
            <span class="player flex-grow-1"><a href="player-profile.html?${player.Id}"class="player-name p-0 generateProfile" id="${player.Id}">${capitalize(playerName)}</a></span>
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
// if (currentPage.includes("index.html")) {
//     generateRoundPage(true)
// }
// End Rounds Page
// Start Rules Page
function showMore() {
    let moreDetails = document.querySelector(`.${event.target.id}`)
    let showMoreBtn = document.querySelector(`#${event.target.id}`)
    if (moreDetails.style.display === "block") {
        moreDetails.style.display = "none"
        showMoreBtn.innerHTML = "عرض تفاصيل اكثر"
        return
    } 
    moreDetails.style.display = "block"
    showMoreBtn.innerHTML = "اخفاء تفاصيل اكثر"
}
// End Rules Page

// Start Generating links
const clickedPlayer = document.querySelectorAll(".generateProfile");
clickedPlayer.forEach(element => {
    element.addEventListener("click", () => window.location.href = `player-profile.html?${element.id}`);
    });
// End Generating links
