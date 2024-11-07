// Import readline module for reading user input
const readline = require('readline');

/**
 * Represents a spaceship with temperature monitoring.
 * @typedef {Object} Spaceship
 * @property {number} temperature - Current temperature in Celsius.
 * @property {string} units - The unit of temperature measurement.
 */
const spaceship = {
    temperature: 20.0,
    units: "Celsius",
};

// Create readline interface for input/output operations
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utility function to clear current line and update with new message
function updateLog(message) {
    process.stdout.clearLine();  // Clear current text
    process.stdout.cursorTo(0);  // Move cursor to beginning of line
    process.stdout.write(message);
}

// Create a promise that resolves after a specified delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Decreases the spaceship's temperature and updates the display.
 * @return {Promise<void>}
 */
async function temperatureDrop() {
    spaceship.temperature -= 0.001;
    updateLog(`Temperature: ${spaceship.temperature.toFixed(3)} ${spaceship.units}`);
}

/**
 * Main function to run the temperature simulation loop.
 */
async function main() {
    console.log("===== Spaceship Temperature Simulation =====");
    try {
        while (true) {
            await delay(1);
            await temperatureDrop();
        }
    } catch (error) {
        console.error("An error occurred:", error);
        process.exit(1);
    }
}

// Set up keypress event listener
rl.input.on('keypress', (ch, key) => {
    if (key.name === 'space' && key.sequence === ' ') {
        spaceship.temperature += 0.1;
        updateLog(`Temperature: ${spaceship.temperature.toFixed(3)} ${spaceship.units}`);
    }
    // Exit on Ctrl+C
    if (key.ctrl && key.name === 'c') {
        process.exit();
    }
});

// Enable raw mode for keypress detection without requiring Enter
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

console.log('Press <space> to increase temperature. Ctrl+C to exit.');
main();