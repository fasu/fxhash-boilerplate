/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sketch.js":
/*!***********************!*\
  !*** ./src/sketch.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nvar sketch = function sketch(p) {\n  p.setup = function () {\n    var fxseed = fxrand() * 10420;\n    p.randomSeed(fxseed);\n    p.noiseSeed(fxseed);\n    p.pixelDensity(1);\n    p.noLoop();\n    p.createCanvas(1600, 1600);\n  };\n  p.draw = function () {\n    fxpreview();\n  };\n};\n$fx.on(\"params:update\", function (newRawValues) {\n  // opt-out default behaviour\n  if (newRawValues.number_id === 5) return false;\n  // opt-in default behaviour\n  return true;\n}, function (optInDefault, newValues) {\n  //\n});\nvar myp5 = new p5(sketch, window.document.body);\n\n//# sourceURL=webpack://BASE/./src/sketch.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FlowLocations: () => (/* binding */ FlowLocations),\n/* harmony export */   Point: () => (/* binding */ Point),\n/* harmony export */   VertexBlob: () => (/* binding */ VertexBlob),\n/* harmony export */   gradientNoise: () => (/* binding */ gradientNoise),\n/* harmony export */   isWithinCircle: () => (/* binding */ isWithinCircle),\n/* harmony export */   isWithinTriangle: () => (/* binding */ isWithinTriangle),\n/* harmony export */   ltc: () => (/* binding */ ltc),\n/* harmony export */   mappedNoise1D: () => (/* binding */ mappedNoise1D),\n/* harmony export */   mappedNoise2D: () => (/* binding */ mappedNoise2D),\n/* harmony export */   pointSideOfPlane: () => (/* binding */ pointSideOfPlane),\n/* harmony export */   randInt: () => (/* binding */ randInt),\n/* harmony export */   randNumber: () => (/* binding */ randNumber),\n/* harmony export */   randomColorFromArray: () => (/* binding */ randomColorFromArray),\n/* harmony export */   randomFromArray: () => (/* binding */ randomFromArray),\n/* harmony export */   rectGradient: () => (/* binding */ rectGradient)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : String(i); }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nvar randInt = function randInt(minimi, maksimi) {\n  return Math.floor(minimi + (maksimi + 1 - minimi) * $fx.rand());\n};\nvar randNumber = function randNumber(minimi, maksimi) {\n  return minimi + (maksimi - minimi) * $fx.rand();\n};\nvar isWithinCircle = function isWithinCircle(pointX, pointY, centerX, centerY, radius) {\n  return dist(pointX, pointY, centerX, centerY) < radius;\n};\n\n// Based on Kornel Kisielewicz in https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle\nvar isWithinTriangle = function isWithinTriangle(pointX, pointY, t1x, t1y, t2x, t2y, t3x, t3y) {\n  var d1, d2, d3, neg, pos;\n  d1 = pointSideOfPlane(pointX, pointY, t1x, t1y, t2x, t2y);\n  d2 = pointSideOfPlane(pointX, pointY, t2x, t2y, t3x, t3y);\n  d3 = pointSideOfPlane(pointX, pointY, t3x, t3y, t1x, t1y);\n  neg = d1 < 0 || d2 < 0 || d3 < 0;\n  pos = d1 > 0 || d2 > 0 || d3 > 0;\n  return !(neg && pos);\n};\nvar pointSideOfPlane = function pointSideOfPlane(p1x, p1y, p2x, p2y, p3x, p3y) {\n  return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);\n};\nvar randomFromArray = function randomFromArray(array) {\n  return array[randInt(0, array.length - 1)];\n};\nvar randomColorFromArray = function randomColorFromArray(array, p) {\n  return p.color(randomFromArray(array));\n};\nvar Point = /*#__PURE__*/_createClass(function Point(x, y) {\n  _classCallCheck(this, Point);\n  this.x = x;\n  this.y = y;\n});\nvar VertexBlob = /*#__PURE__*/function () {\n  function VertexBlob(x, y, sade, sadeVaihtelu, tarkkuus, p) {\n    _classCallCheck(this, VertexBlob);\n    _defineProperty(this, \"vertexPoints\", new Array());\n    this.x = x;\n    this.y = y;\n    this.sade = sade;\n    this.sadeVaihtelu = sadeVaihtelu;\n    this.tarkkuus = tarkkuus;\n    this.vertexPoints = [];\n    for (var i = 0; i < 360; i += tarkkuus) {\n      var v = Vector.fromAngle(p.radians(i), randInt(sade, sade * sadeVaihtelu));\n      this.vertexPoints.push(v);\n    }\n  }\n  _createClass(VertexBlob, [{\n    key: \"display\",\n    value: function display() {\n      p.translate(this.x, this.y);\n      p.beginShape();\n      this.vertexPoints.map(function (v) {\n        return p.curveVertex(v.x, v.y);\n      });\n      p.endShape(p.CLOSE);\n    }\n  }]);\n  return VertexBlob;\n}();\nvar FlowLocations = /*#__PURE__*/_createClass(function FlowLocations(loc, dir, speed, iterations, direction, noiseScale, noiseStrength) {\n  var _this = this;\n  _classCallCheck(this, FlowLocations);\n  _defineProperty(this, \"locations\", new Array());\n  _defineProperty(this, \"generateLocations\", function () {\n    for (var i = 0; i < _this.iterations; i++) {\n      var angle = _this.p.noise(_this.loc.x * _this.noiseScale, _this.loc.y * _this.noiseScale, _this.iterations * _this.noiseScale) * _this.p.TWO_PI * _this.noiseStrength;\n      _this.dir.x = _this.p.sin(angle);\n      _this.dir.y = _this.p.cos(angle);\n      var vel = _this.dir.copy();\n      vel.mult(_this.speed * _this.direction);\n      _this.loc.add(vel);\n      _this.locations.push(_this.loc.copy());\n      if (_this.loc.x < 200) {\n        break;\n      }\n    }\n  });\n  this.loc = loc;\n  this.dir = dir;\n  this.speed = speed;\n  this.iterations = iterations;\n  this.direction = direction;\n  this.noiseScale = noiseScale;\n  this.noiseStrength = noiseStrength;\n  this.generateLocations();\n});\nvar rectGradient = function rectGradient(startingX, startingY, gWidth, gHeight, color1, color2) {\n  for (var y = startingY; y < gHeight; y++) {\n    p.stroke(p.lerpColor(color1, color2, p.map(y, startingY, gHeight, 0, 1)));\n    p.line(startingX, y, gWidth, y);\n  }\n};\nvar ltc = function ltc() {\n  var res = arguments.length <= 0 ? undefined : arguments[0];\n  for (var i = 1; i < arguments.length; i++) {\n    res += \", \" + (i < 0 || arguments.length <= i ? undefined : arguments[i]);\n  }\n  console.log(res);\n};\nvar mappedNoise1D = function mappedNoise1D(noiseValue) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;\n  var mapStart = arguments.length > 2 ? arguments[2] : undefined;\n  var mapEnd = arguments.length > 3 ? arguments[3] : undefined;\n  var rangeStart = arguments.length > 4 ? arguments[4] : undefined;\n  var rangeEnd = arguments.length > 5 ? arguments[5] : undefined;\n  return p.map(p.noise(noiseValue * offset), mapStart, mapEnd, rangeStart, rangeEnd);\n};\nvar mappedNoise2D = function mappedNoise2D(noiseValue, noiseValue2) {\n  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;\n  var offset2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;\n  var mapStart = arguments.length > 4 ? arguments[4] : undefined;\n  var mapEnd = arguments.length > 5 ? arguments[5] : undefined;\n  var rangeStart = arguments.length > 6 ? arguments[6] : undefined;\n  var rangeEnd = arguments.length > 7 ? arguments[7] : undefined;\n  return p.map(p.noise(noiseValue * offset, noiseValue2 * offset2), mapStart, mapEnd, rangeStart, rangeEnd);\n};\nvar gradientNoise = function gradientNoise(startX, startY, width, height, rounds, layer) {\n  for (var round = 0; round < rounds; round++) {\n    for (var x = startX; x < width; x += randInt(-2, 12)) {\n      for (var y = startY; y < height; y += randInt(-3, 13)) {\n        var noise = p.noise(x * 0.02, y * 0.02);\n        if ($fx.rand() > 0.9 - 0.01 * round - noise / 5) {\n          layer.strokeWeight(randInt(0.5 + y / height - noise / 10, 2 + y / height * 5 - noise / 10));\n          var pointX = x + randInt(-2, 2);\n          var pointY = y + randInt(-3, 3);\n          layer.point(pointX, pointY);\n        }\n      }\n    }\n  }\n};\n\n//# sourceURL=webpack://BASE/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/sketch.js");
/******/ 	
/******/ })()
;