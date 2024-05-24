// index.js
import { lieFrequencies, lieInfo, holeInfo, clubs } from "./constants.mjs";

// Set the HTML buttons to variables
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const buttons = [button1, button2, button3, button4, button5];
const msg = document.querySelector("#msg");
const holeNum = document.querySelector("#holeNum");
const holeYard = document.querySelector("#holeYard");
const holePar = document.querySelector("#holePar");
const lie = document.querySelector("#lie");
const userScore = document.querySelector("#userScore");

let holes = [];
let currentClub;
let currentHole;
let currentHoleNum = 0;
let currentLie;
let totalShots = 0;
let holeShots = 0;
let shootAgain = true;
// let hitFairway;
// let hitGIR;

// Initialize buttons
button1.onclick = gameStart;
button2.style.display = "none";
button3.style.display = "none";
button4.style.display = "none";
button5.style.display = "none";

function displayButtons(num) {
    for (let i = 0; i < num; i++) {
        buttons[i].style.display = "inline";
    }
    for (let i = 4; i >= num; i--) {
        buttons[i].style.display = "none";
    }
}

// Allow the user to select how many holes they will play. In the future, they will be able to select a course first. 
function gameStart() {
    holeShots = 0;
    totalShots = 0;
    holes = [];
    currentHole = undefined;
    currentHoleNum = 0;
    displayButtons(3);
    button1.innerText = "Front 9";
    button1.onclick = function () { initGame(0) };
    button2.innerText = "Back 9";
    button2.onclick = function () { initGame(1) };
    button3.innerText = "Full 18";
    button3.onclick = function () { initGame(2) };
    msg.innerText = "Please select which holes you would like to play.";
}    

function initGame(num) {
    if (num === 0) {
        // Remove the back nine holes
        for (let i = 0; i < 9; i++) {
            holes.push(holeInfo[i]);
        }
        displayButtons(2);
        msg.innerText = "You chose to play the front nine. Click [Start Game] to start the game.";
    }
    else if (num === 1) {
        // Remove the front nine holes
        for (let i = 9; i < 18; i++) {
            holes.push(holeInfo[i]);
        }
        displayButtons(2);
        msg.innerText = "You chose to play the back nine. Click [Start Game] to start the game.";
    }
    else if (num === 2) {
        // Play the full 18 holes
        for (let i = 0; i < 18; i++) {
            holes.push(holeInfo[i]);
        }
        displayButtons(2);
        msg.innerText = "You chose to play the full eighteen holes. Click [Start Game] to start the game.";
    }
    else {
        // Return an error code if anything else is passed.
        return 2;
    }
    button1.innerText = "Start Game";
    button1.onclick = updateHole;
    button2.innerText = "Go Back";
    button2.onclick = gameStart;
}

function updateHole() {
    if (currentHole == undefined) {
        currentHole = holes[0];
        currentHoleNum = 1;
        holeNum.innerText = currentHole.hole;
        holeYard.innerText = currentHole.distance;
        holePar.innerText = currentHole.par;
        selectClubType();
    }
    else if (currentHole.hole === holes[holes.length-1].hole) {
        finishGame();
    }
    else {
        currentHole = holes[currentHoleNum];
        currentHoleNum++;
        holeNum.innerText = currentHole.hole;
        holeYard.innerText = currentHole.distance;
        holePar.innerText = currentHole.par;
        holeShots = 0;
        selectClubType();
    }
    currentLie = lieInfo[0];
    lie.innerText = currentLie.type;
}

function finishGame() {
    msg.innerText = `Great job! You finished ${holes.length} holes in ${totalShots} shots (${parseFloat(userScore.innerText)})! Click [New Game] below to start a new game.`;
    displayButtons(1);
    button1.innerText = "New Game";
    button1.onclick = gameStart;
}

function shoot() {
    if (currentClub.name === "Putter") {
        putterAccuracy();
    }
    else {
        msg.innerText += " Choose how much power you would like to hit with.";

        displayButtons(3);
        button1.innerText = "50%";
        button2.innerText = "75%";
        button3.innerText = "100%";

        button1.onclick = function() { shotDistance(0.5) };
        button2.onclick = function() { shotDistance(0.75) };
        button3.onclick = function() { shotDistance(1) };
    }
}

function checkDistance(distance) {
    let parsed = parseFloat(holeYard.innerText);
    if ((parsed - distance) < 0) {
        // Reset distance to hole if overshoot
        let newDistance = distance - holeYard.innerText;
        holeYard.innerText = newDistance;
        shootAgain = true;
    }
    else if ((parsed - distance) > 0) {
        holeYard.innerText -= distance;
        shootAgain = true;
    }
    else {
        shootAgain = false;
    }
    holeShots++;
    totalShots++;
    determineLie();
} 

function nextShot() {
    if (shootAgain = true) {
        selectClubType();
    }
    else {
        finishHole(); 
    }
}

function determineLie() {
    if (parseFloat(holeYard.innerText) <= 30) {
        currentLie = lieInfo[6];
        lie.innerText = currentLie.type;
        nextShot();
    }
    else {
        let random = Math.random();
        random = random.toFixed(2);

        if (0 > random > 0.4) {
            currentLie = lieInfo[1];
        }
        else if (0.41 > random > 0.575) {
            currentLie = lieInfo[2];
        }
        else if (0.576 > random > 0.65) {
            currentLie = lieInfo[3];
        }
        else if (0.651 > random > 0.8) {
            currentLie = lieInfo[4];
        }
        else if (0.651 > random > 1) {
            currentLie = lieInfo[5];
        }
        else {
            currentLie = lieInfo[1];
        }
        lie.innerText = currentLie.type;
        nextShot();
    }
}

function finishHole() {
    let holeScore = holeShots - currentHole.par;
    userScore.innerText = parseFloat(userScore.innerText) + holeScore;
    msg.innerText = `Nice shot! You finished this hole in ${holeShots} shots (${holeScore}). Click [Next Hole] to start the next hole.`;
    displayButtons(1);
    button1.innerText = "Next Hole";
    button1.onclick = updateHole;
}

function putterAccuracy() {
    let parsed = parseFloat(holeYard.innerText);
    let z = 0;
    let x = parsed / currentClub.power;
    let y = Math.random();
    if (y > x) {
        holeShots++;
        totalShots++;
        finishHole();
    }
    else {
        z = Math.random() * ((parsed * 1.5) - (parsed / 2)) + (parsed / 2);
        checkDistance(Math.trunc(z));
    }
}


function shotDistance(shotPower) {
    // Figure out how far the user shot the ball, adding in a little bit of randomness
    let lieEffect;

    if (parseFloat(holeYard.innerText) <= 30) {
        currentLie = lieInfo[6];
        lie.innerText = currentLie.type;
    }
    
    if (currentClub.id in currentLie.strong) {
        lieEffect = Math.random() * ((currentLie.strongMultiplier[0] - currentLie.strongMultiplier[1]) + currentLie.strongMultiplier[1]) * shotPower;
    }
    else {
        lieEffect = Math.random() * ((currentLie.weakMultiplier[0] - currentLie.weakMultiplier[1]) + currentLie.weakMultiplier[1]) * shotPower;
    }

    let totalPower = currentClub.power * shotPower;
    let random = Math.random() * (1 - currentClub.accuracy) + currentClub.accuracy;
    let shotAccuracy = totalPower * random;

    checkDistance(Math.trunc(shotAccuracy));
}

function selectClubType() {
    // Select the type of club used, this makes better use of the limited amount of buttons on screen
    msg.innerText = "Please select your club.";

    displayButtons(4);
    button1.innerText = "Metals";
    button2.innerText = "Irons";
    button3.innerText = "Wedges";
    button4.innerText = "Putter";
    
    button1.onclick = selectMetal;
    button2.onclick = selectIron;
    button3.onclick = selectWedge;
    button4.onclick = selectPutter;
}

function selectMetal() {
    // Select Driver, 3 Wood, or 5 Hybrid

    displayButtons(4);
    button1.innerText = clubs[0].name;
    button2.innerText = clubs[1].name;
    button3.innerText = clubs[2].name;
    button4.innerText = "Go Back";

    button1.onclick = function () { currentClub = clubs[0]; shoot(); };
    button2.onclick = function () { currentClub = clubs[1]; shoot(); };
    button3.onclick = function () { currentClub = clubs[2]; shoot(); };
    button4.onclick = selectClubType;
}

function selectIron() {
    // Select 6-9 Irons
    
    displayButtons(5)
    button1.innerText = clubs[3].name;
    button2.innerText = clubs[4].name;
    button3.innerText = clubs[5].name;
    button4.innerText = clubs[6].name;
    button5.innerText = "Go Back";
    
    button1.onclick = function () { currentClub = clubs[3]; shoot(); };
    button2.onclick = function () { currentClub = clubs[4]; shoot(); };
    button3.onclick = function () { currentClub = clubs[5]; shoot(); };
    button4.onclick = function () { currentClub = clubs[6]; shoot(); };
    button5.onclick = selectClubType;
}

function selectWedge() {
    // Select Pitching Wedge, 52 Degree, or 56 Degree

    displayButtons(4);
    button1.innerText = clubs[7].name;
    button2.innerText = clubs[8].name;
    button3.innerText = clubs[9].name;
    button4.innerText = "Go Back";

    button1.onclick = function () { currentClub = clubs[7]; shoot(); };
    button2.onclick = function () { currentClub = clubs[8]; shoot(); };
    button3.onclick = function () { currentClub = clubs[9]; shoot(); };
    button4.onclick = selectClubType;
}

function selectPutter() {
    // Select Putter

    displayButtons(2);
    button1.innerText = clubs[10].name;
    button2.innerText = "Go Back";

    button1.onclick = function () { currentClub = clubs[10]; shoot(); };
    button2.onclick = selectClubType;
}
