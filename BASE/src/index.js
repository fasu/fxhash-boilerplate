// demonstrate seed reset
// for (let i = 0; i < 10; i++) {
//   console.log(i, $fx.rand(), $fx.randminter())
//   $fx.rand.reset();
//   $fx.randminter.reset();
// }

//const sp = new URLSearchParams(window.location.search);
//console.log(sp);

// this is how to define parameters
$fx.params([
  {
    id: "number_id",
    name: "A number/float64",
    type: "number",
    //default: Math.PI,
    options: {
      min: 1,
      max: 10,
      step: 0.0001,
    },
  },

  {
    id: "bigint_id",
    name: "A bigint",
    type: "bigint",
    update: "code-driven",
    //default: BigInt(Number.MAX_SAFE_INTEGER * 2),
    options: {
      min: Number.MIN_SAFE_INTEGER * 4,
      max: Number.MIN_SAFE_INTEGER * 4,
      step: 1,
    },
  },
  {
    id: "string_id_long",
    name: "A string long",
    type: "string",
    update: "code-driven",
    //default: "hello",
    options: {
      minLength: 1,
      maxLength: 512,
    },
  },
  {
    id: "select_id",
    name: "A selection",
    type: "select",
    update: "code-driven",
    //default: "pear",
    options: {
      options: ["apple", "orange", "pear"],
    },
  },
  {
    id: "color_id",
    name: "A color",
    type: "color",
    update: "code-driven",
    //default: "ff0000",
  },
  {
    id: "boolean_id",
    name: "A boolean",
    type: "boolean",
    update: "code-driven",
    //default: true,
  },
  {
    id: "string_id",
    name: "A string",
    type: "string",
    update: "code-driven",
    //default: "hello",
    options: {
      minLength: 1,
      maxLength: 512,
    },
  },
]);

// this is how features can be defined
$fx.features({
  "A random feature": Math.floor($fx.rand() * 10),
  "A random boolean": $fx.rand() > 0.5,
  "Feature from params, its a number": $fx.getParam("number_id"),
});
