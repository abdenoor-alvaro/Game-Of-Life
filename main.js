
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

const playersData = [
    {name:"boussebain mahfoud",image: "mahfoud.jpg"},
    {name:"bourmel islem",image: "islem.jpg"},
    {name:"slimani abdenoor",image: "slimani.jpg"},
    {name:"abdenoor alvaro",image: "abdenoor.jpg"},
    {name:"sahel yacine",image: "yacine.jpg"},
    {name:"salem youcef",image: "youcef.jpg"},
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
            salem_youcef: 33,
        }
    },{
        day: 2,
        date: "Tuesday 05 December 2023",
        scores: {
            abdenoor_alvaro: 39,
            sahel_yacine: 36,
            bourmel_islem: 45.5,
            boussebain_mahfoud: 52,
            slimani_abdenoor: 37,
            salem_youcef: 17,
        } 
    },{
        day: 3,
        date: "Wednesday 06 December 2023",
        scores: {
            abdenoor_alvaro: 49,
            sahel_yacine: 62,
            bourmel_islem: 48,
            boussebain_mahfoud: 72,
            slimani_abdenoor: 56,
            salem_youcef: false,
        }
    },{
        day: 4,
        date: "Thursday 07 December 2023",
        scores: {
            abdenoor_alvaro: false,
            sahel_yacine: false,
            bourmel_islem: false,
            boussebain_mahfoud: false,
            slimani_abdenoor: false,
            salem_youcef: false,
        }
    },{
        day: 5,
        date: "Friday 08 December 2023",
        scores: {
            abdenoor_alvaro: false,
            sahel_yacine: false,
            bourmel_islem: false,
            boussebain_mahfoud: false,
            slimani_abdenoor: false,
            salem_youcef: false,
        }
    },
]
// End Data
// Start Functions
function calculatePoints(players, daysData) {
    for (const player of players) {
        let playerName = player.Name
        if (player.Name.split(" ").length > 1) {
            playerName = player.Name.split(" ").join("_")
        }
        for (const day of daysData) {
            const scores = day.scores
            if (scores[playerName]) {
                player.newRound(scores[playerName])
            }
        }
    }
}


function capitalize(sentence) {
    return sentence.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}


function smallScreenName(name) {
    let splitedName = name.split(" ")
    return splitedName[0][0] + ". " + splitedName[1]
}
function generateHtmlTablePage(players) {
    const htmlTableLocation = document.querySelector(".content")
    const html = `
    <div class="table-page-content">
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
                ${players.map(player => generatePlayerHtml(player)).join("")}
            </div>
        </div>
    </div>
    `
    htmlTableLocation.innerHTML = html
}
function generatePlayerHtml(player) {
    let playerName = player.Name
    console.log(screen.width < 786)
    console.log(screen.width)
    if (screen.width < 786) {
        playerName = smallScreenName(player.Name)
    }
    return `
    <div class="playerline w-100 d-flex justify-content-between align-items-center bg-white">
        <span class="rank fw-bold">${player.Rank}</span>
        <span class="image"><img src="images/${player.Image}" alt=""></span>
        <span class="player flex-grow-1">${capitalize(playerName)}</span>
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
generateHtmlTablePage(sortedPlayers)
// End Sorting and Printing







