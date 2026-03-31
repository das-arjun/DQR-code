const Jimp = require('jimp');

// 1. Define the ROYGBIVMBlW Palette (RGB)
const PALETTE = [
    { r: 255, g: 0, b: 0 },     // 0: Red
    { r: 255, g: 127, b: 0 },   // 1: Orange
    { r: 255, g: 255, b: 0 },   // 2: Yellow
    { r: 0, g: 255, b: 0 },     // 3: Green
    { r: 0, g: 0, b: 255 },     // 4: Blue
    { r: 75, g: 0, b: 130 },    // 5: Indigo
    { r: 148, g: 0, b: 211 },   // 6: Violet
    { r: 255, g: 0, b: 255 },   // 7: Magenta
    { r: 0, g: 0, b: 0 },       // 8: Black
    { r: 255, g: 255, b: 255 }  // 9: White
];

// Helper: Find closest palette index for a color
function getClosestDigit(r, g, b) {
    let minSnap = Infinity;
    let bestDigit = 0;

    PALETTE.forEach((color, index) => {
        const dist = Math.sqrt(
            Math.pow(r - color.r, 2) +
            Math.pow(g - color.g, 2) +
            Math.pow(b - color.b, 2)
        );
        if (dist < minSnap) {
            minSnap = dist;
            bestDigit = index;
        }
    });
    return bestDigit;
}

async function decodeSnakeImage(filename, cols = 9, rows = 2) {
    const image = await Jimp.read(filename);
    const cellW = image.bitmap.width / cols;
    const cellH = image.bitmap.height / rows;
    let digits = "";

    // 2. Snake-wrap logic
    for (let r = 0; r < rows; r++) {
        let isReverse = (r % 2 !== 0);

        for (let c = 0; c < cols; c++) {
            let actualCol = isReverse ? (cols - 1) - c : c;

            // Sample center of the block
            const x = (actualCol * cellW) + (cellW / 2);
            const y = (r * cellH) + (cellH / 2);
            const { r: pr, g: pg, b: pb } = Jimp.intToRGBA(image.getPixelColor(x, y));

            digits += getClosestDigit(pr, pg, pb);
        }
    }

    // 3. Convert 3-digit chunks to ASCII
    let decodedText = "";
    for (let i = 0; i < digits.length; i += 3) {
        const chunk = digits.substring(i, i + 3);
        decodedText += String.fromCharCode(parseInt(chunk, 10));
    }

    console.log("Decoded Message:", decodedText);
}

// Run it!
decodeSnakeImage('snake_code.png').catch(console.error);
