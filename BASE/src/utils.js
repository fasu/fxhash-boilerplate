export const randInt = (minimi, maksimi) => {
  return Math.floor(minimi + (maksimi + 1 - minimi) * $fx.rand());
};

export const randNumber = (minimi, maksimi) => {
  return minimi + (maksimi - minimi) * $fx.rand();
};

export const isWithinCircle = (pointX, pointY, centerX, centerY, radius) =>
  dist(pointX, pointY, centerX, centerY) < radius;

// Based on Kornel Kisielewicz in https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
export const isWithinTriangle = (pointX, pointY, t1x, t1y, t2x, t2y, t3x, t3y) => {
  let d1, d2, d3, neg, pos;

  d1 = pointSideOfPlane(pointX, pointY, t1x, t1y, t2x, t2y);
  d2 = pointSideOfPlane(pointX, pointY, t2x, t2y, t3x, t3y);
  d3 = pointSideOfPlane(pointX, pointY, t3x, t3y, t1x, t1y);

  neg = d1 < 0 || d2 < 0 || d3 < 0;
  pos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(neg && pos);
};

export const pointSideOfPlane = (p1x, p1y, p2x, p2y, p3x, p3y) => {
  return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
};

export const randomFromArray = (array) => {
  return array[randInt(0, array.length - 1)];
};

export const randomColorFromArray = (array, p) => {
  return p.color(randomFromArray(array));
};

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class VertexBlob {
  vertexPoints = new Array();
  constructor(x, y, sade, sadeVaihtelu, tarkkuus, p) {
    this.x = x;
    this.y = y;
    this.sade = sade;
    this.sadeVaihtelu = sadeVaihtelu;
    this.tarkkuus = tarkkuus;
    this.vertexPoints = [];
    for (let i = 0; i < 360; i += tarkkuus) {
      let v = Vector.fromAngle(p.radians(i), randInt(sade, sade * sadeVaihtelu));
      this.vertexPoints.push(v);
    }
  }

  display() {
    p.translate(this.x, this.y);
    p.beginShape();
    this.vertexPoints.map((v) => p.curveVertex(v.x, v.y));
    p.endShape(p.CLOSE);
  }
}

export class FlowLocations {
  locations = new Array();
  constructor(loc, dir, speed, iterations, direction, noiseScale, noiseStrength) {
    this.loc = loc;
    this.dir = dir;
    this.speed = speed;
    this.iterations = iterations;
    this.direction = direction;
    this.noiseScale = noiseScale;
    this.noiseStrength = noiseStrength;
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

export const rectGradient = (startingX, startingY, gWidth, gHeight, color1, color2) => {
  for (let y = startingY; y < gHeight; y++) {
    p.stroke(p.lerpColor(color1, color2, p.map(y, startingY, gHeight, 0, 1)));
    p.line(startingX, y, gWidth, y);
  }
};

export const ltc = (...args) => {
  let res = args[0];
  for (let i = 1; i < args.length; i++) {
    res += ", " + args[i];
  }
  console.log(res);
};

export const mappedNoise1D = (noiseValue, offset = 0.1, mapStart, mapEnd, rangeStart, rangeEnd) => {
  return p.map(p.noise(noiseValue * offset), mapStart, mapEnd, rangeStart, rangeEnd);
};

export const mappedNoise2D = (
  noiseValue,
  noiseValue2,
  offset = 1,
  offset2 = 1,
  mapStart,
  mapEnd,
  rangeStart,
  rangeEnd
) => {
  return p.map(p.noise(noiseValue * offset, noiseValue2 * offset2), mapStart, mapEnd, rangeStart, rangeEnd);
};

export const gradientNoise = (startX, startY, width, height, rounds, layer) => {
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
