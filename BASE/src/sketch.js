import { randInt, randNumber, randomFromArray } from "./utils";
import p5 from "p5";
import brush from "./p5.brush";

const sketch = (p) => {
  p.preload = () => {
    // brush.preload();
    brush.config({
      R: () => $fx.rand(),
    });
  };

  p.setup = () => {
    let fxseed = $fx.rand() * 10420;
    let canvas = p.createCanvas(1600, 1600, p.P2D);
    p.randomSeed(fxseed);
    p.noiseSeed(fxseed);
    p.pixelDensity(1);
    p.noLoop();
    brush.load(canvas, true);
  };

  p.draw = () => {
    p.stroke(255);
    p.translate(p.width / 2, p.height / 2);
    brush.strokeWeight(1);
    brush.stroke("white");
    brush.beginStroke("curve", p.width * p.random(0.1, 0.9), p.height * p.random(0.1, 0.9));

    // We define a rotation angle to get some variety
    let init_angle = p.random(0, 360);

    // Now we are going to add a series of segments to the stroke
    for (let i = 0; i < Math.floor(p.random(20, 110)); i++) {
      // In order to create a spiral, we need to basically define
      // a circle that gets bigger and bigger each time
      // We will make a circle as a sum of four arcs.
      // For each of these arcs, we will gradually increase the segment length,
      // which means that the circle won't close and will become a spiral when repeated
      // The function is: brush.segment(angle, length, tip_pressure)

      // The first arc starts at an angle 0 (left to right)
      brush.segment(0 + init_angle, 0 + i * 25, p.random(0.6, 1.6));

      // The second arc starts at an angle 90 (bottom to top)
      brush.segment(90 + init_angle, 8 + i * 25, p.random(0.6, 1.6));

      // The third arc starts at an angle 180 (right to left)
      brush.segment(180 + init_angle, 13 + i * 25, p.random(0.6, 1.6));

      // The second arc starts at an angle 270 (top to bottom)
      brush.segment(270 + init_angle, 18 + i * 25, p.random(0.6, 1.6));
    }

    // Finally, we end the stroke with the last angle (which should be 0 again), and tip pressure
    // brush.endStroke(final_anglem, final_tip_pressure)
    brush.endStroke(0 + init_angle, 1);
  };
};

$fx.on(
  "params:update",
  (newRawValues) => {
    // opt-out default behaviour
    if (newRawValues.number_id === 5) return false;
    // opt-in default behaviour
    return true;
  },
  (optInDefault, newValues) => {
    //
  }
);

let myp5 = new p5(sketch, window.document.body);
