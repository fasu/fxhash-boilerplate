import * as p5 from "p5";
declare const $fx: any;

export const randInt = (minimi: number, maksimi: number) => {
  return Math.floor(minimi + (maksimi + 1 - minimi) * $fx.rand());
};

export const randNumber = (minimi: number, maksimi: number) => {
  return minimi + (maksimi - minimi) * $fx.rand();
};

export const isWithinCircle = (
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  radius: number,
  p5: p5
): boolean => p5.dist(pointX, pointY, centerX, centerY) < radius;

// Based on Kornel Kisielewicz in https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
export const isWithinTriangle = (
  pointX: number,
  pointY: number,
  t1x: number,
  t1y: number,
  t2x: number,
  t2y: number,
  t3x: number,
  t3y: number
): boolean => {
  let d1: number, d2: number, d3: number, neg: boolean, pos: boolean;

  d1 = pointSideOfPlane(pointX, pointY, t1x, t1y, t2x, t2y);
  d2 = pointSideOfPlane(pointX, pointY, t2x, t2y, t3x, t3y);
  d3 = pointSideOfPlane(pointX, pointY, t3x, t3y, t1x, t1y);

  neg = d1 < 0 || d2 < 0 || d3 < 0;
  pos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(neg && pos);
};

export const pointSideOfPlane = (p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number) => {
  return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
};

export const randomFromArray = (array: any[]) => {
  return array[randInt(0, array.length - 1)];
};

export const randomColorFromArray = (array: string[], p: p5): p5.Color => {
  return p.color(randomFromArray(array));
};

export class Point {
  constructor(public x: number, public y: number) {}
}

export class VertexBlob {
  public vertexPoints: p5.Vector[];
  constructor(
    public x: number,
    public y: number,
    public sade: number,
    public sadeVaihtelu: number,
    public tarkkuus: number,
    p: p5
  ) {
    this.vertexPoints = [];
    for (let i = 0; i < 360; i += tarkkuus) {
      let v = p5.Vector.fromAngle(p.radians(i), randInt(sade, sade * sadeVaihtelu));
      this.vertexPoints.push(v);
    }
  }

  display(p: p5) {
    p.translate(this.x, this.y);
    p.beginShape();
    this.vertexPoints.map((v) => p.curveVertex(v.x, v.y));
    p.endShape(p.CLOSE);
  }
}

export class FlowLocations {
  public locations: p5.Vector[] = [];
  constructor(
    public loc: p5.Vector,
    public dir: p5.Vector,
    public speed: number,
    public iterations: number,
    public direction: number,
    public noiseScale: number,
    public noiseStrength: number,
    public p: p5
  ) {
    this.generateLocations();
  }

  generateLocations = () => {
    for (let i = 0; i < this.iterations; i++) {
      let angle =
        this.p.noise(this.loc.x * this.noiseScale, this.loc.y * this.noiseScale, this.iterations * this.noiseScale) *
        this.p.TWO_PI *
        this.noiseStrength;
      this.dir.x = this.p.sin(angle);
      this.dir.y = this.p.cos(angle);
      var vel = this.dir.copy();
      vel.mult(this.speed * this.direction);
      this.loc.add(vel);
      this.locations.push(this.loc.copy());
      if (this.loc.x < 200) {
        break;
      }
    }
  };
}

export const rectGradient = (
  startingX: number,
  startingY: number,
  gWidth: number,
  gHeight: number,
  color1: p5.Color,
  color2: p5.Color,
  p: p5
) => {
  for (let y = startingY; y < gHeight; y++) {
    p.stroke(p.lerpColor(color1, color2, p.map(y, startingY, gHeight, 0, 1)));
    p.line(startingX, y, gWidth, y);
  }
};

export const ltc = (...args: any[]) => {
  let res: string = args[0];
  for (let i = 1; i < args.length; i++) {
    res += ", " + args[i];
  }
  console.log(res);
};

export const mappedNoise1D = (
  noiseValue: number,
  offset: number = 0.1,
  mapStart: number,
  mapEnd: number,
  rangeStart: number,
  rangeEnd: number,
  p: p5
) => {
  return p.map(p.noise(noiseValue * offset), mapStart, mapEnd, rangeStart, rangeEnd);
};

export const mappedNoise2D = (
  noiseValue: number,
  noiseValue2: number,
  offset: number = 1,
  offset2: number = 1,
  mapStart: number,
  mapEnd: number,
  rangeStart: number,
  rangeEnd: number,
  p: p5
) => {
  return p.map(p.noise(noiseValue * offset, noiseValue2 * offset2), mapStart, mapEnd, rangeStart, rangeEnd);
};

export const gradientNoise = (
  startX: number,
  startY: number,
  width: number,
  height: number,
  rounds: number,
  layer: p5.Graphics,
  p: p5
) => {
  for (let round = 0; round < rounds; round++) {
    for (let x = startX; x < width; x += randInt(-2, 12)) {
      for (let y = startY; y < height; y += randInt(-3, 13)) {
        let noise = p.noise(x * 0.02, y * 0.02);
        if ($fx.rand() > 0.9 - 0.01 * round - noise / 5) {
          layer.strokeWeight(randInt(0.5 + y / height - noise / 10, 2 + (y / height) * 5 - noise / 10));
          let pointX = x + randInt(-2, 2);
          let pointY = y + randInt(-3, 3);
          layer.point(pointX, pointY);
        }
      }
    }
  }
};
