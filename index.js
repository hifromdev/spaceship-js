/*

    First Javascript project.

 */
const readline = require('readline');

// The spaceship in question.
let spaceship = {
    temperature: 20.0,
    units: "Celsius",
};

// Console Log message.
var msg = `
===== Spaceship =====
Temperature: ${spaceship.temperature.toFixed(1)}`

// Create interface for input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Update Terminal
function updateLog(message) {
    process.stdout.clearLine(); // clear current line
    process.stdout.cursorTo(0); // move cursor to beginning of line
    process.stdout.write(message);
}

// delay for temperature decrease
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Spaceship Temperature Drop function
async function temperatureDrop() {
    spaceship.temperature -= 0.1;
    msg = `Temperature: ${spaceship.temperature.toFixed(1)}`
    updateLog(msg);
}

// Main
async function main() {
    while (true) {
        await delay(250);
        temperatureDrop();
    }
}

// Function to handle key press (spacebar to increase temperature)
rl.input.on('keypress', (ch, key) => {
    if (key.name == 'space' && key.sequence == ' ') {
        spaceship.temperature += 0.1;
        msg = `Temperature: ${spaceship.temperature.toFixed(1)}`
        updateLog(msg);
        // Exit on Ctrl+C
        if (key.ctrl && key.name === 'c') {
            process.exit();
        }
    }
});

// Raw keypress; remove the need to press enter
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

console.log('Press any key. Ctrl+C to exit.');
process.stdout.write(msg);
main().catch(console.error);