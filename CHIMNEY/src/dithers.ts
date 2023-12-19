import p5 from "p5";

// Floyd-Steinberg dithering following CodingTrain https://www.youtube.com/watch?v=0L2n8Tg2FwI
export const dither = (img: p5.Graphics, factor: number, p: p5) => {
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let colour = getColour(img, x, y, p);
      let previousRed = p.red(colour);
      let previousGreen = p.green(colour);
      let previousBlue = p.blue(colour);
      let nextRed = p.round((factor * previousRed) / 255) * p.floor(255 / factor);
      let nextGreen = p.round((factor * previousGreen) / 255) * p.floor(255 / factor);
      let nextBlue = p.round((factor * previousBlue) / 255) * p.floor(255 / factor);

      let index = pixelIndex(img, x, y, p.pixelDensity());

      let nextColour = p.color(nextRed, nextGreen, nextBlue);
      let pixel = img.pixels;
      pixel[index] = p.red(nextColour);
      pixel[index + 1] = p.green(nextColour);
      pixel[index + 2] = p.blue(nextColour);

      let errorRed = previousRed - nextRed;
      let errorGreen = previousGreen - nextGreen;
      let errorBlue = previousBlue - nextBlue;

      doError(img, x, y, p.color(errorRed, errorGreen, errorBlue), p);
    }
  }
  img.updatePixels();
};

const pixelIndex = (img, x, y, density) => {
  return 4 * (x + y * img.width * density);
};

const getColour = (img, x, y, p: p5) => {
  let index = pixelIndex(img, x, y, p.pixelDensity());
  let pixel = img.pixels;
  let red = pixel[index];
  let green = pixel[index + 1];
  let blue = pixel[index + 2];
  return p.color(red, green, blue);
};

const doError = (img, x, y, errorColour: p5.Color, p: p5) => {
  if (isWithinBounds(x + 1, y, img)) {
    let colour = getColour(img, x + 1, y, p);
    let red = p.red(colour);
    let green = p.green(colour);
    let blue = p.blue(colour);
    colour.setRed(red + (p.red(errorColour) * 7) / 16);
    colour.setGreen(green + (p.green(errorColour) * 7) / 16);
    colour.setBlue(blue + (p.blue(errorColour) * 7) / 16);

    setColour(img, x, y, colour, p);
  }

  if (isWithinBounds(x - 1, y + 1, img)) {
    let colour = getColour(img, x - 1, y + 1, p);
    let red = p.red(colour);
    let green = p.green(colour);
    let blue = p.blue(colour);
    colour.setRed(red + (p.red(errorColour) * 3) / 16);
    colour.setGreen(green + (p.green(errorColour) * 3) / 16);
    colour.setBlue(blue + (p.blue(errorColour) * 3) / 16);

    setColour(img, x, y, colour, p);
  }

  if (isWithinBounds(x, y + 1, img)) {
    let colour = getColour(img, x, y + 1, p);
    let red = p.red(colour);
    let green = p.green(colour);
    let blue = p.blue(colour);
    colour.setRed(red + (p.red(errorColour) * 5) / 16);
    colour.setGreen(green + (p.green(errorColour) * 5) / 16);
    colour.setBlue(blue + (p.blue(errorColour) * 5) / 16);

    setColour(img, x, y, colour, p);
  }

  if (isWithinBounds(x + 1, y + 1, img)) {
    let colour = getColour(img, x + 1, y + 1, p);
    let red = p.red(colour);
    let green = p.green(colour);
    let blue = p.blue(colour);
    colour.setRed(red + (p.red(errorColour) * 1) / 16);
    colour.setGreen(green + (p.green(errorColour) * 1) / 16);
    colour.setBlue(blue + (p.blue(errorColour) * 1) / 16);

    setColour(img, x, y, colour, p);
  }
};

const setColour = (img: p5, x: number, y: number, colour: p5.Color, p: p5) => {
  let index = pixelIndex(img, x, y, p.pixelDensity());

  let pixel = img.pixels;
  pixel[index] = p.red(colour);
  pixel[index + 1] = p.green(colour);
  pixel[index + 2] = p.blue(colour);
};

const isWithinBounds = (x: number, y: number, img: p5) => x < 0 || x >= img.width || y < 0 || y >= img.height;

export const glitcher = (img: p5.Graphics, factor: number, p: p5) => {
  p.loadPixels();
  let d = p.pixelDensity();
  for (let y = 0; y < p.height; y++) {
    for (let x = 10; x < p.width; x++) {
      let colour = getColour(p, x, y, p);
      let previousRed = p.red(colour);
      let previousGreen = p.green(colour);
      let previousBlue = p.blue(colour);

      let nextRed = p.round((factor * previousRed) / 255) * (255 / factor);
      let nextGreen = p.round((factor * previousGreen) / 255) * (255 / factor);
      let nextBlue = p.round((factor * previousBlue) / 255) * (255 / factor);

      setColour(p, x, y, p.color(nextRed, nextGreen, nextBlue), p);

      let pixel2 = 4 * (x + 1 + y * p.width * d);
      doPixelAt(pixel2, previousRed, nextRed, 7, p);

      let pixel3 = 4 * (x + -1 + y + 1 * p.width * d);
      doPixelAt(pixel3, previousRed, nextRed, 3, p);

      let pixel4 = 4 * (x + y + 1 * p.width * d);
      doPixelAt(pixel4, previousRed, nextRed, 5, p);

      let pixel5 = 4 * (x + 1 + y + 1 * p.width * d);
      doPixelAt(pixel5, previousRed, nextRed, 1, p);
    }
  }
  p.updatePixels();
};

const doPixelAt = (pixelI, prevCol, nextCol, error, p) => {
  p.pixels[pixelI] += ((prevCol - nextCol) * error) / 16;
  p.pixels[pixelI + 1] += ((prevCol - nextCol) * error) / 16;
  p.pixels[pixelI + 2] += ((prevCol - nextCol) * error) / 16;
};
