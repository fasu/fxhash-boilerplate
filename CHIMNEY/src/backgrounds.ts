import p5 from "p5";
import { dither } from "./dithers";
import { randInt, randomFromArray } from "./utils";

export const paperBackground = (p: p5.Graphics, backgroundColour: string) => {
  p.push();
  let paperColour = p.color(backgroundColour);
  p.background(paperColour);
  let dashColour1 = p.color("white");
  let dashColour2 = p.color("black");
  p.stroke(dashColour1);
  p.strokeWeight(1);
  for (let x = 0; x < p.width; x += randInt(1, 2)) {
    for (let y = 0; y < p.height; ) {
      dashColour1.setAlpha(randInt(5, 10));
      dashColour2.setAlpha(randInt(5, 15));
      let lineLength = randInt(5, 150);
      if (fxrand() < 0.3) {
        fxrand() < 0.3 ? p.stroke(dashColour1) : p.stroke(dashColour2);
        p.line(x, y, x, y + lineLength);
        p.stroke(paperColour);
        p.point(x, y + lineLength + 1);
      }
      y += lineLength + 1;
    }
  }
  for (let x = 0; x < p.width; x += randInt(10, 30)) {
    let textureColour = p.color("gray");
    textureColour.setAlpha(randInt(10, 20));
    p.stroke(textureColour);
    for (let y = 0; y < p.height; y += randInt(5, 10)) {
      if (fxrand() < 0.3) {
        let widthBetweenDashes = randInt(4, 6);
        for (let i = 0; i < randInt(5, 13); i++) {
          p.line(
            x + randInt(-2, 1),
            y + widthBetweenDashes * i,
            x + randInt(8, 12),
            y + widthBetweenDashes * i + randInt(4, 6)
          );
        }
      }
    }
  }
  p.pop();
};

export const arrayBackground = (p: p5.Graphics, backgroundColour: string) => {
  p.push();
  p.background(p.color(backgroundColour));
  let black = p.color("black");
  let white = p.color("white");
  for (let x = 0; x < p.width; x += 6) {
    for (let y = 0; y < p.height; y += 6) {
      black.setAlpha(randInt(0, 20) * 10);
      white.setAlpha(randInt(0, 20) * 10);
      p.fill(black);
      p.noStroke();
      p.rect(x, y, 4, 4, randInt(0, 20), randInt(0, 20), randInt(0, 20), randInt(0, 20));
      p.stroke(white);
      p.noFill();
      p.strokeWeight(randInt(1, 3));
      p.circle(x, y, 3);
    }
  }
  p.pop();
};

export const doRaggedEdges = (p: p5.Graphics) => {
  p.push();
  p.fill("black");
  for (let x = 0; x < p.width; ) {
    let randWidth = randInt(2, 10);
    p.rect(x, 0, randWidth, randInt(1, 20));
    x += randWidth;
  }
  for (let x = 0; x < p.width; ) {
    let randWidth = randInt(2, 10);
    let randHeight = randInt(1, 20);
    p.rect(x, p.height - randHeight, randWidth, randHeight);
    x += randWidth;
  }
  for (let y = 0; y < p.height; ) {
    let randHeight = randInt(2, 10);
    let randWidth = randInt(1, 20);
    p.rect(0, y, randWidth, randHeight);
    y += randHeight;
  }
  for (let y = 0; y < p.height; ) {
    let randHeight = randInt(2, 10);
    let randWidth = randInt(1, 20);
    p.rect(p.width - randWidth, y, randWidth, randHeight);
    y += randHeight;
  }
  p.pop();
};

export const doVectorEdges = (p: p5.Graphics) => {
  p.push();
  p.stroke("black");
  for (let x = 0; x < p.width; x += 5) {
    p.push();
    p.translate(x, 0);
    drawVectorHairs(p);
    p.pop();
  }
  for (let x = 0; x < p.width; x += 5) {
    p.push();
    p.translate(x, p.height);
    drawVectorHairs(p);
    p.pop();
  }
  for (let y = 0; y < p.height; y += 5) {
    p.push();
    p.translate(0, y);
    drawVectorHairs(p);
    p.pop();
  }
  for (let y = 0; y < p.height; y += 5) {
    p.push();
    p.translate(p.width, y);
    drawVectorHairs(p);
    p.pop();
  }
  p.pop();
};

const drawVectorHairs = (p: p5.Graphics) => {
  for (let i = 0; i < 20; i++) {
    let randomVector = p5.Vector.random2D();
    randomVector.mult(randInt(5, 30));
    p.line(0, 0, randomVector.x, randomVector.y);
  }
};

export const quadWaves = (background1: p5.Graphics, colors: string[]) => {
  background1.push();
  let quadSize = 16;
  background1.noStroke();
  let color1 = background1.color(randomFromArray(colors));
  let color2 = background1.color(randomFromArray(colors));
  for (let y = background1.height; y > 0; y -= quadSize * 1.5) {
    let startingX = (y % quadSize) * 5 === 0 ? 0 : -quadSize;
    for (let x = startingX; x < background1.width + quadSize * 2.5; x += quadSize * 1.5) {
      background1.fill(color2);
      let p1v1 = background1.createVector(x, y);
      let p1v2 = background1.createVector(x + quadSize, y + quadSize);
      let p1v3 = background1.createVector(x, y + quadSize * 2);
      let p1v4 = background1.createVector(x - quadSize, y + quadSize);
      background1.quad(p1v1.x, p1v1.y, p1v2.x, p1v2.y, p1v3.x, p1v3.y, p1v4.x, p1v4.y);
      background1.fill(color1);
      let p2v1 = background1.createVector(x, y - quadSize / 2);
      let p2v2 = background1.createVector(x + quadSize, y + quadSize / 2);
      let p2v3 = background1.createVector(x, y + quadSize * 1.5);
      let p2v4 = background1.createVector(x - quadSize, y + quadSize / 2);
      background1.quad(p2v1.x, p2v1.y, p2v2.x, p2v2.y, p2v3.x, p2v3.y, p2v4.x, p2v4.y);
    }
  }
  dither(background1, 1, background1);
  background1.pop();
};
