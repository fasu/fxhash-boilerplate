//////////////////////////////////////////////////
// The example really starts here

let palette = ["#7b4800", "#002185", "#003c32", "#fcd300", "#ff2702", "#6b9404"];
let skyPalette = ["#003366", "#7B9BCA", "#B0C4DE", "#FFD27F"];

function setup() {
  //console.log(brush.config);
  const fxseed = $fx.rand() * 10420;
  randomSeed(fxseed);
  noiseSeed(fxseed);
  createCanvas(1500, 2000);
  pixelDensity(1);
  angleMode(DEGREES);

  //  brush.config({
  //    R: () => $fx.rand(), // or any other RNG function you wish to use
  //  });

  background("black");

  // Initialize objects here
  // Example: let chimney1 = new Chimney(100, 200, 'brick');
}

function draw() {
  // translate(-width / 2, -height / 2);
  drawGradientBackground();
  console.log("draw");
  // Your existing draw code

  // Update and display objects
  // Example: chimney1.display();

  noLoop(); // Since this is a static artwork
}

class Chimney {
  constructor(x, y, texture) {
    // properties like position, texture
    this.x = x;
    this.y = y;
    this.texture = texture;
  }

  display() {
    // Code to display chimney
  }
}

class Smoke {
  constructor(x, y) {
    // properties like position, density, spread
    this.x = x;
    this.y = y;
    // Other properties as needed
  }

  update() {
    // Update smoke properties over time
  }

  display() {
    // Code to display smoke
  }
}

class Hill {
  constructor() {
    // properties like position, size
    // Other properties as needed
  }

  display() {
    // Code to display hill
  }
}

class Tree {
  constructor(x, y) {
    // properties like position, size
    this.x = x;
    this.y = y;
  }

  display() {
    // Code to display tree
  }
}

function drawGradientBackground() {
  let verticalNoiseValues = createGradientNoise();
  let horizontalNoiseResolution = $fx.rand(); // Adjust for smoother or sharper horizontal noise
  console.log(verticalNoiseValues.length);

  for (let y = 0; y < height; y++) {
    let col = getColorForY(y, height, skyPalette);
    stroke(col);
    line(0, y, width, y);
  }
  for (let y = 0, noiseIndex = 0; y < height; y += 4, noiseIndex += 2) {
    let col = getColorForY(y, height, skyPalette);
    col.setAlpha(50);
    stroke(col);
    strokeWeight(80);
    push();
    fill(col);
    beginShape();
    for (let x = -100; x < width + 200; x += 40) {
      let horizontalShift = map(noise(verticalNoiseValues[noiseIndex], x * $fx.rand()), 0, 1, 0, 490);
      curveVertex(x, y + horizontalShift);
    }
    endShape();
    pop();
  }
}

function createGradientNoise() {
  let verticalNoiseResolution = 0.02; // Adjust for smoother or sharper vertical noise
  let verticalNoiseValues = [];

  // Generate noise values for the vertical noise line
  for (let y = 0; y < height; y += 2) {
    let noiseVal = noise(y * verticalNoiseResolution);
    verticalNoiseValues.push(noiseVal);
  }

  return verticalNoiseValues;
}

function getColorForY(y, height, palette) {
  // Determine the range each color covers
  let range = height / (palette.length - 1);

  // Find the indices of the two color stops to blend
  let firstColorIndex = Math.floor(y / range);
  let secondColorIndex = firstColorIndex + 1;

  // Ensure indices are within the bounds of the colorStops array
  firstColorIndex = constrain(firstColorIndex, 0, palette.length - 1);
  secondColorIndex = constrain(secondColorIndex, 0, palette.length - 1);

  // Calculate how far y is between the two color stops (0 to 1)
  let b = (y % range) / range;

  // Interpolate between the two colors
  return lerpColor(color(palette[firstColorIndex]), color(palette[secondColorIndex]), b);
}

function rand() {
  return $fx.rand();
}

function randInt(minimi, maksimi) {
  return Math.floor(minimi + (maksimi + 1 - minimi) * $fx.rand());
}

function randNumber(minimi, maksimi) {
  return minimi + (maksimi - minimi) * $fx.rand();
}

function randomFromArray(array) {
  return array[randInt(0, array.length - 1)];
}

$fx.on(
  "params:update",
  (newRawValues) => {
    // opt-out default behaviour
    if (newRawValues.number_id === 5) return false;
    // opt-in default behaviour
    return true;
  },
  (optInDefault, newValues) => main()
);
