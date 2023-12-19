const withFxhashCli = require("@fxhash/cli/webpack").default;
const baseConfig = require("./webpack.config");

module.exports = withFxhashCli(
  { mode: "prd" },
  {
    ...baseConfig,
  }
);
