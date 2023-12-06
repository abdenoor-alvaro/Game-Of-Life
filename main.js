
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
        scores: {
            abdenoor_alvaro: 49,
            sahel_yacine: false,
            bourmel_islem: false,
            boussebain_mahfoud: 72,
            slimani_abdenoor: false,
            salem_youcef: false,
        }
    },{
        day: 4,
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

function generateHtmlTable(players) {
    const htmlTableLocation = document.querySelector(".table")
    const html = `
    <div class="headline w-100 d-flex justify-content-between">
        <span class="rank">Rank</span>
        <span class="image"></span>
        <span class="player flex-grow-1">Player</span>
        <span class="round">Round</span>
        <span class="points">Points</span>
    </div>
    ${players.map(player => generatePlayerHtml(player)).join("")}
    `
    htmlTableLocation.innerHTML = html
}
function generatePlayerHtml(player) {
    return `
    <div class="playerline w-100 d-flex justify-content-between align-items-center bg-white py-3">
        <span class="rank fw-bold">${player.Rank}</span>
        <span class="image"><img src="images/${player.Image}" alt=""></span>
        <span class="player flex-grow-1">${capitalize(player.Name)}</span>
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
generateHtmlTable(sortedPlayers)
// End Sorting and Printing







