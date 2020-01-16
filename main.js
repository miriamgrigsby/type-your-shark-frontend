import wordsApi from "./words.js"

const gameContainer = document.getElementById('game-container')
const game2Container = document.getElementById('game2-container')
const titleContainer = document.getElementById('title-container')
const startButton = document.getElementById('start-button')
const easyButton = document.getElementById("easy-button")
const mediumButton = document.getElementById("medium-button")
const hardButton = document.getElementById("hard-button")
const timer = document.getElementById("underline3")
const popUp = document.getElementById('popUp-container')
const moreStats = document.getElementById('view-stats')
const statsContainerPop = document.getElementById('popUpStats-container')
const exit2Button = document.getElementById('exit2')
const exit1Button = document.getElementById('exit')
const finalPoints = document.getElementById('finalPoints')
const totalSharksKilled = document.getElementById('totalSharksKilled')
const failPopUp = document.getElementById('popUpFail-container')
const viewStatsFail = document.getElementById('view2-stats')
const continueButton = document.getElementById('next-level')


startButton.addEventListener("click", (event) => {
    startButton.style.display = "none"
    gameCountdown()
})

easyButton.addEventListener("click", (event) => {
    document.getElementById("difLevel").value = "easy"
    document.getElementById("underline4").innerText = "Easy"
})

mediumButton.addEventListener("click", (event) => {
    document.getElementById("difLevel").value = "medium"
    document.getElementById("underline4").innerText = "Medium"
})

hardButton.addEventListener("click", (event) => {
    document.getElementById("difLevel").value = "hard"
    document.getElementById("underline4").innerText = "Hard"
})

moreStats.addEventListener('click', (event) => {
    statsContainerPop.style.zIndex = "1"
    popUp.style.zIndex = "-1"
})

viewStatsFail.addEventListener('click', (event) => {
    statsContainerPop.style.zIndex = "1"
    failPopUp.style.zIndex = "-1"
})

exit2Button.addEventListener('click', (event) => {
    statsContainerPop.style.zIndex = "-1"
    document.location.reload()
    // also needs to send the post/patch requests
})

exit1Button.addEventListener('click', (event) => {
    popUp.style.zIndex = "-1"
    document.location.reload()
    // also needs to send the post/patch requests
})

exit3.addEventListener('click', (event) => {
    document.location.reload()
    failPopUp.style.zIndex = "-1"

    // also needs to send the post/patch requests
})

continueButton.addEventListener('click', (event) => {
    game2Container.style.zIndex = "1"
})

function gameCountdown() {
    gameTimer()
    window.textContent = ""
    document.body.addEventListener("keydown", killShark)
    difficultyDecider()
}

async function difficultyDecider() {
    const difficulty = document.getElementById("difLevel").value
    let totalTime = 60
    while (totalTime >= 0) {
        if (difficulty == 'hard') {
            await sleep(1000)
            createShark(8, 13, .05)
            totalTime -= 1
        } else if (difficulty == 'medium') {
            await sleep(1500)
            createShark(5, 8, 0.04)
            totalTime -= 1.5
        } else {
            await sleep(3000)
            createShark(2, 5, .02)
            totalTime -= 3
        }
    }
}

function gameTimer() {
    let incrementer = 60
    let points = document.getElementById('points')
    let allSharksKilled = document.getElementById('sharksKilled')

    let gameTime = setInterval(() => {

        if (incrementer <= 0) {
            timer.innerText = 0
            popUp.style.zIndex = "1"
            finalPoints.innerText = points.innerText
            totalSharksKilled.innerText = allSharksKilled.innerText
            document.body.removeEventListener("keydown", killShark)
            clearInterval(gameTime)
        } else {
            try {
                let firstShark = document.querySelector('.dot')
                if (parseInt(firstShark.style.right) >= 66.5) {
                    failPopUp.style.zIndex = "1"
                    finalPoints.innerText = points.innerText
                    totalSharksKilled.innerText = allSharksKilled.innerText
                    document.body.removeEventListener("keydown", killShark)
                    clearInterval(gameTime)
                    return
                }
            } catch (error) { }
            timer.innerText = incrementer
            incrementer--
        }
    }, 1000);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sharkWords(sharkElement, minDiff, maxDiff) {
    let oneWord = wordsApi[Math.floor(Math.random() * 178187)]
    if (oneWord.length <= maxDiff && oneWord.length >= minDiff) {
        let charIndex
        for (charIndex in oneWord) {
            let charSpan = document.createElement("span")
            charSpan.innerText = oneWord[charIndex]
            sharkElement.append(charSpan)
        }
    } else {
        sharkWords(sharkElement, minDiff, maxDiff)
    }
}

window.clearIntArray = []
window.index = 0
window.pointsTotal = 0
window.sharksTotal = 0
window.clearIndex = 0

function createShark(minimumDiff, maximumDiff, sharkSpeed) {
    let sharkImage = document.createElement('img')
    sharkImage.src = "resources/sharky.png"
    let sharkWord = document.createElement('div')
    sharkWord.className = 'words'
    creationOfDot(sharkImage, sharkWord, minimumDiff, maximumDiff, sharkSpeed)
}

function creationOfDot(sharkImage, sharkWord, minimumDiff, maximumDiff, sharkSpeed) {
    let dotDiv = document.createElement('div')
    dotDiv.className = 'dot'
    dotDiv.style.width = '200px'
    dotDiv.style.height = '90px'
    dotDiv.style.top = Math.round(Math.random() * 87) + '%'
    dotDiv.style.margin = "4px"
    dotDiv.style.right = "-25%"
    dotDiv.append(sharkImage, sharkWord)
    gameContainer.appendChild(dotDiv)
    sharkWords(sharkWord, minimumDiff, maximumDiff)
    let shark = -25

    clearIntArray.push(setInterval(() => {
        if (shark >= 67) {
            clearInterval(sharkMovementInterval)
        } else {
            shark += sharkSpeed;
            dotDiv.style.right = shark + "%"

        }
    }, 1, dotDiv, sharkSpeed, shark))
}


function killShark(e) {
    let sharkFinder = gameContainer.querySelector(".dot")
    let sharkCharSpan = sharkFinder.querySelectorAll("span")
    let gamePoints = document.getElementById("underline1")
    let gameSharksKilled = document.getElementById("underline2")
    let typedLetter = String.fromCharCode(e.which).toLowerCase()
    
    killAllSharks(e, sharkFinder, sharkCharSpan, gamePoints, gameSharksKilled, typedLetter)

}

function killAllSharks(e, sharkFinder, sharkCharSpan, gamePoints, gameSharksKilled, typedLetter) {
    if (typedLetter == sharkCharSpan[window.index].innerText) {
        sharkCharSpan[window.index].style.color = "green"
        window.textContent += typedLetter
        window.index++
        if (window.textContent.length == sharkFinder.innerText.length) {
            if (window.textContent == sharkFinder.innerText) {
                window.pointsTotal += parseInt(sharkFinder.innerText.length)
                window.sharksTotal++
                gameSharksKilled.innerText = " " + window.sharksTotal
                gamePoints.innerText = " " + window.pointsTotal
                sharkFinder.className = "dead"
                clearInterval(clearIntArray[window.clearIndex])
                window.clearIndex++
                sharkFinder = gameContainer.querySelector(".dot")
                window.index = 0
            }
            window.textContent = ""
        }
    }
}

// let ppp = document.createElement('img')
// ppp.innerText = "hell"
// ppp.id = "hammer"
// ppp.src = "resources/hammer.png"

// gameContainer.appendChild(ppp)

// let ppp = document.createElement('img')
// ppp.innerText = "hell"
// ppp.id = "pir"
// ppp.src = "resources/pirahna.png"

// gameContainer.appendChild(ppp)

// let ppp = document.createElement('img')
// ppp.innerText = "hell"
// ppp.id = "boss"
// ppp.src = "resources/boss_shark.gif"

// gameContainer.appendChild(ppp)

// let ppp = document.createElement('img')

// ppp.id = "ghost"
// ppp.src = "resources/ghost_sharky.png"


// gameContainer.appendChild(ppp)

// let ppp = document.createElement('img')

// ppp.id = "tiger"
// ppp.src = "resources/tiger_shark.png"


// gameContainer.appendChild(ppp)

// let ppp = document.createElement('img')

// ppp.id = "mutant"
// ppp.src = "resources/mutant.png"


// gameContainer.appendChild(ppp)

