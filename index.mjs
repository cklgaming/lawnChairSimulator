// index.js
import { holeInfo, clubs } from "./constants.mjs";

// Set the HTML buttons to variables
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const msg = document.querySelector("#msg");
const holeNum = document.querySelector("#holeNum");
const holeYard = document.querySelector("#holeYard");
const holePar = document.querySelector("#holePar");
const userScore = document.querySelector("#userScore");

let holes = [];
let currentClub;
let currentHole;
let totalShots = 0;
let holeShots = 0;
let shootAgain = true;
// let hitFairway;
// let hitGIR;

// Initialize buttons
button1.onclick = gameStart;

// Allow the user to select how many holes they will play. In the future, they will be able to select a course first. 
function gameStart() {
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
        msg.innerText = "You chose to play the front nine.";
    }
    else if (num === 1) {
        // Remove the front nine holes
        for (let i = 9; i < 18; i++) {
            holes.push(holeInfo[i]);
        }
        msg.innerText = "You chose to play the back nine.";
    }
    else if (num === 2) {
        // Play the full 18 holes
        for (let i = 0; i < 18; i++) {
            holes.push(holeInfo[i]);
        }
        msg.innerText = "You chose to play the full eighteen holes.";
    }
    else {
        // Return an error code if anything else is passed.
        return 2;
    }
    // Set hole 1

    currentHole = holes[0];
    holeNum.innerText = currentHole.hole;
    holeYard.innerText = currentHole.distance;
    holePar.innerText = currentHole.par;
    selectClubType();
}

function updateHole() {
   if (currentHole.hole === holes.length) {
        finishGame();
    }
    else {
        currentHole = holes[currentHole.id + 1];
        holeNum.innerText = currentHole.hole;
        holeYard.innerText = currentHole.distance;
        holePar.innerText = currentHole.par;
        holeShots = 0;
        selectClubType();
    }
}

function finishGame() {
    msg.innerText = `Great job! You finished ${holes.length} holes in ${totalShots} shots (${parseFloat(userScore.innerText)})! Click [New Game] below to start a new game.`;
    button1.innerText = "New Game";
    button1.onclick = gameStart;
}

function shoot() {
    if (currentClub.name === "Putter") {
        putterAccuracy();
    }
    else {
        msg.innerText += " Choose how much power you would like to hit with.";

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
    if (shootAgain) {
        selectClubType();
    }
    else {
        finishHole(); 
    }
}

function finishHole() {
    let holeScore = holeShots - currentHole.par;
    userScore.innerText = parseFloat(userScore.innerText) + holeScore;
    msg.innerText = `Nice shot! You finished this hole in ${holeShots} shots (${holeScore}). Click [Next Hole] to start the next hole.`;
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
        finishHole();
    }
    else {
        z = Math.random() * ((parsed * 1.5) - (parsed / 2)) + (parsed / 2);
        checkDistance(Math.trunc(z));
    }
}


function shotDistance(shotPower) {
    // Figure out how far the user shot the ball, adding in a little bit of randomness
    
    // 225 * 1
    let totalPower = currentClub.power * shotPower;
    let random = Math.random() * (1 - currentClub.accuracy) + currentClub.accuracy;
    let shotAccuracy = totalPower * random;

    checkDistance(Math.trunc(shotAccuracy));
}

function selectClubType() {
    // Select the type of club used, this makes better use of the limited amount of buttons on screen
    msg.innerText = "Please select your club.";

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
    button1.innerText = clubs[10].name;
    button2.innerText = "Go Back";

    button1.onclick = function () { currentClub = clubs[10]; shoot(); };
    button2.onclick = selectClubType;
}
