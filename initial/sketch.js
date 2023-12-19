//////////////////////////////////////////////////
// Object for creation and real-time resize of canvas
// Good function to create canvas and resize functions. I use this in all examples.
const C = {
  loaded: false,
  prop() {
    return this.height / this.width;
  },
  setSize(w, h, p, css) {
    (this.width = w), (this.height = h), (this.pD = p), (this.css = css);
  },
  createCanvas() {
    (this.main = createCanvas(this.width, this.height, WEBGL)), pixelDensity(1), this.main.id(this.css);
  },
};
C.setSize(1500, 2000, 1, "mainCanvas");

//////////////////////////////////////////////////
// The example really starts here

let palette = ["#7b4800", "#002185", "#003c32", "#fcd300", "#ff2702", "#6b9404"];

function setup() {
  console.log(brush.config);
  const fxseed = $fx.rand() * 10420;
  randomSeed(fxseed);
  noiseSeed(fxseed);
  C.createCanvas();
  angleMode(DEGREES);
  background("#fffceb");
  console.log($fx.rand());
  //  console.log(fxrand());
  brush.config({
    R: () => $fx.rand(), // or any other RNG function you wish to use
  });

  console.log(brush);
}

function draw() {
  console.log(brush.config);
  translate(-width / 2, -height / 2);

  // We create a grid here
  let num_cols = 12;
  let num_rows = 6;
  let border = 300;
  let col_size = (width - border) / num_cols;
  let row_size = (height - border) / num_rows;

  // We define the brushes for the hatches, and the brushes for the strokes
  let hatch_brushes = ["marker", "marker2"];
  let stroke_brushes = ["2H", "HB", "charcoal"];

  // Test Different Flowfields here: "zigzag", "seabed", "curved", "truncated"
  brush.field("truncated");
  // You can also disable field completely with brush.noField()

  // We create the grid here
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      // We fill 10% of the cells
      if ($fx.rand() < 0.1) {
        // Set Fill
        brush.fill(randomFromArray(palette), randInt(60, 100));
        brush.bleed(randNumber(0.1, 0.4));
        brush.fillTexture(0.55, 0.8);
      }

      // We stroke + hatch the remaining
      else {
        // Set Stroke
        brush.set(randomFromArray(stroke_brushes), randomFromArray(palette));

        // Set Hatch
        // You set color and brush with .setHatch(brush_name, color)
        brush.setHatch(randomFromArray(hatch_brushes), randomFromArray(palette));
        // You set hatch params with .hatch(distance_between_lines, angle, options: see reference)
        brush.hatch(randInt(10, 60), randInt(0, 180), { rand: 0, continuous: false, gradient: false });
      }

      // We draw the rectangular grid here
      brush.rect(border / 2 + col_size * j, border / 2 + row_size * i, col_size, row_size);

      // Reset states for next cell
      brush.noStroke();
      brush.noFill();
      brush.noHatch();
    }
  }
  noLoop();
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
