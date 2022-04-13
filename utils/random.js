function randomFloat(min = 0, max = 9) {
    const chance = max - min + 1;
    const random = Math.random() * chance;
    return random + min;
}

function randomInteger(min = 0, max = 9) {
    return Math.floor(randomFloat(min, max));
}

function convertHexadecimalToAlphanumeric(hexadecimal = "F") {
    const decimal = parseInt(hexadecimal, 16);
    const alphanumeric = decimal.toString(36);
    return alphanumeric;
}

function generateRandom() {
    const crypto = require("crypto");
    const UUIDv4 = crypto.randomUUID();
    const hexadecimals = UUIDv4.split("-");
    const alphanumerics = hexadecimals.map(convertHexadecimalToAlphanumeric);
    const random = alphanumerics.join("");
    return random;
}

module.exports = { randomFloat, randomInteger, generateRandom };