import p5 from "p5";
import { randInt, randNumber, randomFromArray } from "./utils";

declare global {
  interface Window {
    $fxhashFeatures: any;
    $fx: any;
  }
}
declare const $fx: any;

window.$fxhashFeatures = {};

const sketch = (p: p5) => {
  p.setup = () => {
    let fxseed = $fx.rand() * 10420;
    p.randomSeed(fxseed);
    p.noiseSeed(fxseed);
    p.pixelDensity(1);
    p.noLoop();
    p.createCanvas(1600, 1600);
  };

  p.draw = () => {
    //fxpreview();
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
