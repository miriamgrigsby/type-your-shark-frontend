import wordsApi from "./words.js"

const gameContainer = document.getElementById('game-container')
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
const totalSharksKilled = document.getElementById('totalSharksKilled')
const failPopUp = document.getElementById('popUpFail-container')
const viewStatsFail = document.getElementById('view2-stats')
const continueButton = document.getElementById('next-level')
const authLoginForm = document.getElementById('auth-login')
const authSignUpForm = document.getElementById('auth-signup')
const loginButton = document.getElementById('login-button')
const signUpButton = document.getElementById('signup-button')
const authButtons = document.getElementById("authButtons")
const allSharksKilledText = document.getElementById('underline2')
const shownDifficultyLevel = document.getElementById("underline4")
const updateUserButton = document.getElementById("update-user")
const deleteUserButton = document.getElementById("delete-user")
const usersTotalPoints = document.createElement("h5")
const usersTotalSharks = document.createElement("h5")
const userGames = document.createElement("h5")
const usersAvgDiff = document.createElement("h5")
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const overallStats = document.getElementById("overall-stats")
const allGames = document.getElementById("all-games")
const speedWordContainer = document.getElementById("speedWord")
const gamePoints = document.getElementById("underline1")
const gameSharksKilled = document.getElementById("underline2")
const treasureClosed = document.getElementById("closedTreasure")
const winTreasurePopUp = document.getElementById("treasure-pop-up")
const rubyGem = document.getElementById("ruby-gem")
const speedRoundStatsPopUp = document.getElementById("underline5")
const continueRoundStatsPopUpSharks = document.getElementById("underline6")
const updateUserInfoForm = document.getElementById("update-user-info")
const usernameHeader = document.createElement("h2")

// const localHost3000Profile = "http://localhost:3000/profile"
// const localHost3000Users = "http://localhost:3000/users"
// const localHost3000Login = "http://localhost:3000/login"
// const localHost3000UsersId = `http://localhost:3000/users/${currentUserId}`
// const localHost3000GameId = `http://localhost:3000/games/${currentUserGameId}`
// const localHost3000Game = "http://localhost:3000/games"

let movingRedTimerBox = document.getElementById("red-moving-timer-box")
let speedIndex = 0
let speedArray = []
let currentUserGameId = null
let chosenDifficulty = null
let currentUser = null
let currentUserId = null
let currentUserToken = null
let currentUserGames = null
let currentUserPoints = null
let currentUserSharks = null
let currentUsersGamesObj = null
let currentUserDiffAvg = null
let username;
let password;
let movingTimerBox = document.getElementById("moving-timer-box")
let totalTime = null
let logOutButton = document.createElement('button')
logOutButton.innerText = "Logout"

let clearIntArray = []
let index = 0
let pointsTotal = 0
let sharksTotal = 0
let clearIndex = 0
let textContent = ""
let level = 1
let piranhaNumber = 0
let incrementer = 0

const herokuProfile = "https://type-your-shark.herokuapp.com/profile"
const herokuUsers = "https://type-your-shark.herokuapp.com/users"
const herokuLogin = "https://type-your-shark.herokuapp.com/login"
const herokuUsersId = `https://type-your-shark.herokuapp.com/users/${currentUserId}`
const herokuGameId = `https://type-your-shark.herokuapp.com/games/${currentUserGameId}`
const herokuGame = "https://type-your-shark.herokuapp.com/games"

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.token) {
        appendLogoutButtonToAuthButtons()
        changeVisibilityAuthButtons()
        changeBlackOutsDisplay()
        changeMyBtnVisibility()
        setCurrentUserVariables()
        fillOutPopUpOverallStats()
        fillOutPopUpOverallGames()
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setCurrentUserVariables() {
    currentUser = localStorage.getItem('user')
    currentUserToken = localStorage.getItem("token")
    currentUserId = localStorage.getItem("userId")
    currentUserDiffAvg = localStorage.getItem("userAvgDiff")
    currentUserGames = localStorage.getItem("userGames")
    currentUserPoints = localStorage.getItem("userPoints")
    currentUserSharks = localStorage.getItem("userSharks")
    currentUsersGamesObj = JSON.parse(localStorage.getItem("userGamesObj"))
}

function changeVisibilityAuthButtons() {
    signUpButton.style.visibility = "hidden"
    loginButton.style.visibility = "hidden"
}

function changeMyBtnVisibility() {
    btn.style.visibility = "visible"
}

function changeBlackOutsDisplay() {
    document.getElementById('blackout').style.display = 'none';
    document.getElementById('blackout2').style.display = 'none';
}

function appendLogoutButtonToAuthButtons() {
    authButtons.appendChild(logOutButton)
}

function checkForToken() {
    if (localStorage.token) {
        appendLogoutButtonToAuthButtons()
        changeVisibilityAuthButtons()
        changeBlackOutsDisplay()
    }
}

logOutButton.addEventListener("click", () => {
    fetch(herokuProfile, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }
    })
        .then(localStorage.clear())
        .then(location.reload())
})

signUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    authSignUpForm.style.display = 'block';
    changeVisibilityAuthButtons()
})

loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    authLoginForm.style.display = 'block';
    changeVisibilityAuthButtons()
})

function grabFormData(event) {
    const formData = new FormData(event.target)
    username = formData.get("username")
    password = formData.get("password")
}

authSignUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    authSignUpForm.style.display = 'none';

    grabFormData(event)

    await fetch(herokuUsers, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username,
                password
            }
        })
    })
        .then(response => response.json())
        .then(setItemsIntoLocalStorageOnSignUp)

    setCurrentUserVariablesInSignUp()
    fillOutPopUpOverallStats()
})

function setItemsIntoLocalStorageOnSignUp(result) {
    localStorage.setItem("token", result.token)
    localStorage.setItem("userId", result.user.user_id)
    localStorage.setItem("user", username)
}

function setCurrentUserVariablesInSignUp() {
    currentUserToken = localStorage.getItem("token")
    currentUserId = localStorage.getItem("userId")
    currentUserDiffAvg = "easy"
    currentUser = username
    checkForToken()
    changeBlackOutsDisplay()
}

authLoginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    authLoginForm.style.display = 'none';

    grabFormData(event)

    await fetch("https://type-your-shark.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
        .then(response => response.json())
        .then(checkLoginForError)

    setCurrentUserVariables()
    fillOutPopUpOverallStats()
    fillOutPopUpOverallGames()
})

function checkLoginForError(result) {
    return result.error ? (alert(result.error), location.reload()) : (setItemsIntoLocalStorageOnLogin(result), checkForToken(), changeBlackOutsDisplay(), changeMyBtnVisibility())
}

function setItemsIntoLocalStorageOnLogin(result) {
    localStorage.setItem("token", result.token)
    localStorage.setItem("user", result.user.username)
    localStorage.setItem("userId", result.user.id)
    localStorage.setItem("userGames", result.user.total_games)
    localStorage.setItem("userSharks", result.user.total_sharks_killed)
    localStorage.setItem("userPoints", result.user.total_points)
    localStorage.setItem("userAvgDiff", result.user.avg_difficulty)
    localStorage.setItem("userGamesObj", JSON.stringify(result.user.games.map(x => x)))
}

function DifficultyLevelButtonDisplay() {
    easyButton.style.display = "none"
    mediumButton.style.display = "none"
    hardButton.style.display = "none"
}

function statsContainerPopZindexChange() {
    statsContainerPop.style.zIndex = "1"
}

function popUpZindexChange() {
    popUp.style.zIndex = "-1"
}

function failPopUpZindexChange() {
    failPopUp.style.zIndex = "-1"
}

function changeDisplayOfItemsSpeedRound() {
    movingTimerBox.style.display = "block"
    movingRedTimerBox.style.display = "block"
    treasureClosed.style.display = "block"
    speedWordContainer.style.display = "block"
}

function popUpZindexChangeBack() {
    popUp.style.zIndex = "1"
}

function changeDisplayOfItemsSpeedRoundBack() {
    winTreasurePopUp.style.display = "none"
    treasureClosed.style.display = "none"
    movingRedTimerBox.style.display = "none"
    movingRedTimerBox.style.width = "0%"
    movingTimerBox.style.display = "none"
}

function setChosenDifficultytoEasy() {
    chosenDifficulty = "easy"
}

startButton.addEventListener("click", () => {
    startButton.style.display = "none"
    if (!chosenDifficulty) {
        setChosenDifficultytoEasy()
        shownDifficultyLevel.innerText = "Easy"
    }

    DifficultyLevelButtonDisplay()
    gameCountdown()
})

continueButton.addEventListener('click', () => {
    level++
    // level = 3
    popUpZindexChange()
    checkLevel()
})

function level2ContinueActions() {
    document.getElementById("overlap").style.display = "none"
    changeDisplayOfItemsSpeedRound()
    game2Countdown()
}

function checkLevel() {
    if (level == 2) {
        level2ContinueActions()
    } else if (level == 3) {
        level3ContinueActions()
    }
}

function level3ContinueActions() {
    gameContainer.style.backgroundImage = "url('https://media.giphy.com/media/XWHe62Za5zPck/giphy.gif')"
    difficultyDecider()
    let game3Index = 0
    incrementer = 0
    let game3Time = setInterval(() => {
        if (game3Index == 25) {
            incomingBoss()
            // whenCannonballCleared 
            movingRedTimerBox.style.width = incrementer + "%"
            incrementer += 2
        }
        if (incrementer == 100) {
            clearInterval(game3Time)
        }
        game3Index++
    }, 1000)
}

function incomingBoss() {
    createBossShark()
    movingTimerBox.style.display = "block"
    movingRedTimerBox.style.display = "block"
}

function createBossShark() {
    const bossShark = document.createElement("img")
    bossShark.id = "boss-shark"
    bossShark.src = "resources/boss_shark.gif"
    gameContainer.appendChild(bossShark)
}

// const bossShark = document.createElement("img")
//     bossShark.id = "boss-shark"
//     bossShark.src = "resources/boss_shark.gif"
//     gameContainer.appendChild(bossShark)

// const toxicShark = document.createElement("img")
// toxicShark.id = "toxic-shark"
// toxicShark.src = "resources/toxic_sharky.png"
// gameContainer.appendChild(toxicShark)

easyButton.addEventListener("click", () => {
    setChosenDifficultytoEasy()
    shownDifficultyLevel.innerText = "Easy"
})

mediumButton.addEventListener("click", () => {
    chosenDifficulty = "medium"
    shownDifficultyLevel.innerText = "Medium"
})

hardButton.addEventListener("click", () => {
    chosenDifficulty = "hard"
    shownDifficultyLevel.innerText = "Hard"
})

moreStats.addEventListener('click', () => {
    statsContainerPopZindexChange()
    popUpZindexChange()
})

viewStatsFail.addEventListener('click', () => {
    statsContainerPopZindexChange()
    failPopUpZindexChange()
})

exit2Button.addEventListener('click', () => {
    statsContainerPop.style.zIndex = "-1"
    reloadGame()
})

exit1Button.addEventListener('click', () => {
    popUpZindexChange()
    reloadGame()
})

exit3.addEventListener('click', () => {
    failPopUpZindexChange()
    reloadGame()
})

rubyGem.addEventListener('click', () => {
    popUpZindexChangeBack()
    changeDisplayOfItemsSpeedRoundBack()
})

btn.addEventListener('click', () => {
    fetch(herokuUsersId)
        .then(response => response.json())
        .then(redefineStats)
})

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

deleteUserButton.addEventListener("click", (event) => {
    fetch(herokuUsersId, {
        method: 'DELETE'
    })
    localStorage.clear()
    location.reload()
})

updateUserButton.addEventListener("click", (event) => {
    updateUserInfoForm.style.display = "block"
})

updateUserInfoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    grabFormData(event)

    await fetch(herokuUsersId, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${currentUserToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json())
        .then(result => {
            usernameHeader.innerText = result.user.username
            localStorage.setItem('user', result.user.username)
        })
    updateUserInfoForm.style.display = "none"
})

function textContentReset() {
    textContent = ""
}

function gameCountdown() {
    textContentReset()
    document.body.addEventListener("keydown", killShark)
    gameTimer()
    difficultyDecider()
}

function game2Countdown() {
    textContentReset()
    document.body.addEventListener("keydown", typedSpeedWords)
    level = 2
    gameTimer()
    speedRoundDifficulty()
}

async function difficultyDecider() {
    totalTime = 25.0
    while (totalTime > 0.0) {
        if (chosenDifficulty == 'hard') {
            await sleep(1000)
            if (totalTime > 0.0) {
                if (level == 1) {
                    createShark(8, 13, .05)
                } else if (level == 3) {
                    createShark(4, 4, .05)
                }
                totalTime -= 1.0
            }
        } else if (chosenDifficulty == 'medium') {
            await sleep(1500)
            if (totalTime > 0.0) {
                if (level == 1) {
                    createShark(5, 8, 0.04)
                } else if (level == 3) {
                    createShark(4, 4, 0.04)
                }
                totalTime -= 1.5
            }
        } else {
            await sleep(3000)
            if (totalTime > 0.0) {
                if (level == 1) {
                    createShark(4, 6, .03)
                } else if (level == 3) {
                    createShark(4, 4, 0.03)
                }
                totalTime -= 3.0
            }
        }
    }
}

function setSpeedWord(word) {
    word.split("").forEach(letter => {
        let currentLetter = document.createElement('span')
        currentLetter.innerText = letter
        currentLetter.className = "speed-letter"
        speedWordContainer.appendChild(currentLetter)
    })
}

function speedRoundDifficulty() {
    let speedWord = wordsApi[Math.floor(Math.random() * 178187)]

    if (chosenDifficulty == "easy") {
        if (speedWord.length < 6) {
            setSpeedWord(speedWord)
        } else {
            speedRoundDifficulty()
        }
    } else if (chosenDifficulty == "medium") {
        if (speedWord.length >= 6 && speedWord.length <= 9) {
            setSpeedWord(speedWord)
        } else {
            speedRoundDifficulty()
        }
    } else {
        if (speedWord.length > 9 && speedWord.length <= 13) {
            setSpeedWord(speedWord)
        } else {
            speedRoundDifficulty()
        }
    }
}

function typedSpeedWords(e) {
    let speedLetterArray = document.querySelectorAll(".speed-letter")
    let typedLetter = String.fromCharCode(e.which).toLowerCase()
    if (typedLetter == speedLetterArray[speedIndex].innerText) {
        speedLetterArray[speedIndex].style.color = "green"
        speedArray.push(typedLetter)
        speedIndex++
        if (speedArray.length == speedLetterArray.length) {
            pointsTotal += speedArray.length
            gamePoints.innerText = " " + pointsTotal
            totalTime = 1
            speedWordContainer.innerHTML = ""
            speedIndex = 0
            speedArray = []
            speedRoundDifficulty()
        }
    } else {
        totalTime = 2
    }
}

function removeSharks() {
    let allSharksPlaying = document.querySelectorAll('.dot')
    allSharksPlaying.forEach(element => element.remove())
}

function setTimerToZero() {
    totalTime = 0
}

function setTimerInnerTextToZero() {
    timer.innerText = 0
}

function clearIntArrayForEach() {
    clearIntArray.forEach(element => clearInterval(element))
}

function setIndextoZero() {
    index = 0
}

function setClearIntArrayEmpty() {
    clearIntArray = []
}

function gameTimer() {
    incrementer = 25
    let allSharksKilled = document.getElementById('sharksKilled')

    if (level == 1) {

        let gameTime = setInterval(() => {
            let findSharksToEndGame = document.querySelectorAll(".dot")
            if (findSharksToEndGame.length == 0) {
                if (incrementer < 23) {
                    setTimerInnerTextToZero()
                    popUpZindexChangeBack()
                    speedRoundStatsPopUp.innerText = gamePoints.innerText
                    totalSharksKilled.innerText = allSharksKilled.innerText
                    document.body.removeEventListener("keydown", killShark)
                    changeMyBtnVisibility()
                    removeSharks()
                    addGame()
                    clearIntArrayForEach()
                    clearInterval(gameTime)
                }
            } else {
                try {
                    let firstShark = document.querySelector('.dot')
                    if (parseInt(firstShark.style.right) >= 66.5) {
                        setTimerToZero()
                        failPopUp.style.zIndex = "1"
                        speedRoundStatsPopUp.innerText = gamePoints.innerText
                        totalSharksKilled.innerText = allSharksKilled.innerText
                        document.body.removeEventListener("keydown", killShark)
                        changeMyBtnVisibility()
                        addGame()
                        clearInterval(gameTime)
                    }
                } catch (error) { }
                if (incrementer >= 0) {
                    timer.innerText = incrementer
                    incrementer--
                }
            }
        }, 1000);
    }
    else if (level == 2) {
        incrementer = 0
        let game2Time = setInterval(async () => {
            if (incrementer >= 100) {

                treasureClosed.src = "resources/treasure.gif"
                setTimerInnerTextToZero()
                document.body.removeEventListener("keydown", typedSpeedWords)
                gamePoints.innerText = (parseInt(gamePoints.innerText) + 1000).toString()
                speedRoundStatsPopUp.innerText = gamePoints.innerText
                pointsTotal = gamePoints.innerText
                speedWordContainer.style.display = "none"
                updateGame()
                clearInterval(game2Time)
                await sleep(1000)
                winTreasurePopUp.style.display = "block"
            }
            if (totalTime == 1) {
                incrementer -= 5
                setTimerToZero()
            } else if (totalTime == 2) {
                incrementer += 5
                setTimerToZero()
            }
            movingRedTimerBox.style.width = incrementer + "%"
            incrementer += .1
        }, 10);
    }
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

function createShark(minimumDiff, maximumDiff, sharkSpeed) {
    let sharkImage = document.createElement('img')
    let sharkWord = document.createElement('div')
    sharkWord.className = 'words'
    // if (level == 1) {
    sharkImage.src = "resources/sharky.png"
    // } else if (level == 3) {
    //     sharkImage.src = "resources/toxic_sharky.png"
    // }
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
            clearIntArrayForEach()
            setClearIntArrayEmpty()
        } else {
            shark += sharkSpeed;
            dotDiv.style.right = shark + "%"
        }
    }, 1, dotDiv, sharkSpeed, shark))
    if (level == 3) {
        piranhaNumber = 0
        window.multiplePiranhas = setInterval(creationOfPiranha, 10)
        creationOfPiranha(sharkWord, sharkSpeed)
    }
}

function creationOfPiranha(sharkWord, sharkSpeed) {
    let dotDiv = document.createElement('div')
    let sharkImage = document.createElement('img')
    dotDiv.className = 'dot'
    dotDiv.style.width = '200px'
    dotDiv.style.height = '90px'
    dotDiv.style.top = Math.round(Math.random() * 87) + '%'
    dotDiv.style.margin = "4px"
    dotDiv.style.right = "-25%"
    // sharkImage.src = "resources/pirahna.png"
    dotDiv.append(sharkImage, sharkWord)
    gameContainer.appendChild(dotDiv)
    // if (chosenDifficulty == "easy") {
    //     if (piranhaNumber == 1) {
    //         clearInterval(window.multiplePiranhas)
    //     }
    // } else if (chosenDifficulty == "medium") {
    //     if (piranhaNumber == 2) {
    //         clearInterval(window.multiplePiranhas)
    //     }
    // } else {
    //     if (piranhaNumber == 3) {
    //         clearInterval(window.multiplePiranhas)
    //     }
    // }
    if (piranhaNumber == 1) {
        clearInterval(window.multiplePiranhas)
    }
    let shark = -25
    clearIntArray.push(setInterval(() => {
        if (shark >= 67) {
            clearIntArrayForEach()
            setClearIntArrayEmpty()
        } else {
            shark += sharkSpeed;
            dotDiv.style.right = shark + "%"
        }
    }, 1, dotDiv, sharkSpeed, shark))
    piranhaNumber++
}

function killShark(e) {
    let sharkFinder = gameContainer.querySelector(".dot")
    let sharkCharSpan = sharkFinder.querySelectorAll("span")
    let typedLetter = String.fromCharCode(e.which).toLowerCase()

    killAllSharks(sharkFinder, sharkCharSpan, typedLetter)
}

function killAllSharks(sharkFinder, sharkCharSpan, typedLetter) {
    if (typedLetter == sharkCharSpan[index].innerText) {
        sharkCharSpan[index].style.color = "green"
        textContent += typedLetter
        index++
        if (textContent.length == sharkFinder.innerText.length) {
            if (textContent == sharkFinder.innerText) {
                pointsTotal += parseInt(sharkFinder.innerText.length)
                sharksTotal++
                gameSharksKilled.innerText = " " + sharksTotal
                gamePoints.innerText = " " + pointsTotal
                sharkFinder.className = "dead"
                clearInterval(clearIntArray[clearIndex])
                clearIndex++
                sharkFinder = gameContainer.querySelector(".dot")
                setIndextoZero()
            }
            textContentReset()
        }
    }
}

function updateGame() {
    fetch(herokuGameId, {
        method: 'PATCH',
        body: JSON.stringify({
            points: pointsTotal,
            sharks_killed: sharksTotal
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

async function addGame() {
    await fetch(herokuGame, {
        method: 'POST',
        body: JSON.stringify({
            points: pointsTotal,
            sharks_killed: sharksTotal,
            difficulty: chosenDifficulty,
            user_id: currentUserId
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            currentUserGameId = result.id
        })
}

function fillOutPopUpOverallStats() {
    usernameHeader.innerText = currentUser
    usernameHeader.style.textDecoration = "underline"

    usersTotalPoints.innerText = "Total Points: " + currentUserPoints
    usersTotalSharks.innerText = "Total Sharks Killed: " + currentUserSharks
    userGames.innerText = "Total Games Played: " + currentUserGames
    usersAvgDiff.innerText = "Average Difficulty: " + currentUserDiffAvg

    overallStats.append(usernameHeader, usersTotalPoints, usersTotalSharks, userGames, usersAvgDiff)
}

function mapAllUsersGames() {
    allGames.innerHTML = `<h2 style="text-decoration: underline;">All Games</h2>`

    currentUsersGamesObj.map(game => {
        let gameInstance = document.createElement("h6")
        gameInstance.innerHTML = "Game: POINTS = " + game.points + ", SHARKS = " + game.sharks_killed + ", DIFFICULTY = " + game.difficulty + "<button id=" + game.id + " class='deleteButton' style='max-width: 5%; max-height: 5%;'>x</button>"
        gameInstance.textDecoration = "underline"

        allGames.append(gameInstance)
    })

    document.querySelectorAll(".deleteButton").forEach(game => {
        game.addEventListener("click", async (event) => {
            event.target.parentNode.remove()
            await fetch(`https://type-your-shark.herokuapp.com/games/${event.target.id}`, {
                method: 'DELETE'
            })
            fetch(herokuUsersId)
                .then(response => response.json())
                .then(redefineStats)
        })
    })
}

function fillOutPopUpOverallGames() {
    mapAllUsersGames()
}

function reloadGame() {
    document.getElementById("underline4").innerText = ""

    setChosenDifficultytoEasy()
    setDiffButtonsandStartButtonDisplayBlock()
    setGameStatsBarEntriestoZero()
    setIndextoZero()
    setClearIntArrayEmpty()
    removeSharks()
}

function setGameStatsBarEntriestoZero() {
    gamePoints.innerText = "0"
    allSharksKilledText.innerText = "0"
    timer.innerText = "0"
    clearIndex = 0
}

function setDiffButtonsandStartButtonDisplayBlock() {
    startButton.style.display = "block"
    easyButton.style.display = "block"
    mediumButton.style.display = "block"
    hardButton.style.display = "block"
}

function redefineStats(response) {
    currentUser = response.username
    currentUserId = response.id
    currentUserGames = response.total_games
    currentUserPoints = response.total_points
    currentUserSharks = response.total_sharks_killed
    currentUsersGamesObj = response.games
    currentUserDiffAvg = response.avg_difficulty
    usersTotalPoints.innerText = "Total Points: " + currentUserPoints
    usersTotalSharks.innerText = "Total Sharks Killed: " + currentUserSharks
    userGames.innerText = "Total Games Played: " + currentUserGames
    usersAvgDiff.innerText = "Average Difficulty: " + currentUserDiffAvg

    mapAllUsersGames()
}

