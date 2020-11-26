
let cardsQuantity
let trigger1 = true
let openCardTrigger = 0
let endGameCounter = 0
let colors = []
let selectedCards = []
let delayTrigger = true
let timeCounter
let interval
const gameScreen = document.getElementById("gameScreen")
const timer = document.getElementById('timer')

startGame ()

function startGame () {
    cardsQuantity = prompt("With how many cards you want to play? Write an equal number, for example: 2,4,8,16,32")
    getRandomColor(cardsQuantity)
    gameScreen.innerHTML = ""

    for (let i = 0; i <cardsQuantity; i++){
        let randomNumber = Math.floor(Math.random() * colors.length)
        let selectedColor = colors[randomNumber]
        console.log(randomNumber)
        gameScreen.innerHTML +=
            `
            <div class="flip-card" onclick="openCard(event)" id="${i}">
                <div class="flip-card-inner" id="${selectedColor}">
                    <div class="flip-card-front">
                        <img src="https://i.pinimg.com/originals/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg" class="imgSize">
                    </div>
                    <div class="flip-card-back" style="background-color: ${selectedColor}">
                    </div>
                </div>
            </div>
            `
        colors.splice(randomNumber, 1);
    }

    timeCounter = 120
    myTimerF ()

}

function getRandomColor(arg) {
    colors = []
    for (let i = 0; i <arg/2; i++){
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colors.push(color)
        colors.push(color)
    }
    console.log(colors)
}

function openCard (event) {
    if (delayTrigger) {
        if (trigger1) {
            event.path[2].style.transform = "rotateY(180deg)"
            let id = event.path[3].id

            if (selectedCards.length === 0) {
                selectedCards.push(id)
                console.log(selectedCards)
                openCardTrigger++
                return
            }
            console.log(selectedCards[0])
            console.log(id)

            if (selectedCards[0] !== id) {
                selectedCards.push(id)
                console.log(selectedCards)
                openCardTrigger++
            }
        }

        if (openCardTrigger === 2){
            if (event.path[4].children[selectedCards[0]].children[0].id === event.path[4].children[selectedCards[1]].children[0].id){
                selectedCards = []
                openCardTrigger = 0
                endGameCounter++
                if (endGameCounter === cardsQuantity/2) {
                    alert("YOU WON THE GAME!")
                    startGame ()
                }
            } else {
                delayTrigger = false
                setTimeout(closeCards, 1000)
                function closeCards () {
                    event.path[4].children[selectedCards[0]].children[0].style.transform = "rotateY(0deg)"
                    event.path[4].children[selectedCards[1]].children[0].style.transform = "rotateY(0deg)"
                    openCardTrigger = 0
                    selectedCards = []
                    delayTrigger = true
                }
            }
        }
    }
}

function myTimerF () {
    function myTimerFunction (time) {
        const minutes = Math.floor((time / 60))
        let seconds = time % 60
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        return `${minutes}:${seconds}`
    }

    interval = setInterval(()=>{
        timer.innerText = myTimerFunction(timeCounter)
        timeCounter--
        if (timeCounter === 0) {
            alert("TIME IS UP, YOU LOST!")
            clearInterval(interval)
            startGame()
        }
    },1000)
}