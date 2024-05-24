const club = {
    name: "Putter",
    type: "Putter",
    power: 30,
    accuracy: 0.96
}

let distance = 20;

function shotDistance(shotPower) {
    if (club.name === "Putter") {
        let x = distance / club.power;
        let y = Math.random();
        if (y > x) {
            console.log("Made putt.");
        }
        else {
            let z = Math.random() * ((distance * 1.5) - (distance / 2)) + (distance / 2);
            console.log("Missed putt. ", z);
        }
    }
}

for (let i = 0; i < 15; i++) {
    console.log(shotDistance());
}
