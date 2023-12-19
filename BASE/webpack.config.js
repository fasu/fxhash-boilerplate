const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/sketch.js", // Path to your main JavaScript file
  output: {
    filename: "bundle.js", // Output bundle file name
    path: path.resolve(__dirname, "src/dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile .js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel for transpiling
          options: {
            presets: ["@babel/preset-env"], // Preset for modern JavaScript
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      p5: "p5",
    }),
  ],
  target: "web",
};
