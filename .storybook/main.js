const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "multiple-themes-stitches"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "webpackFinal": async config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }
    return config
  }
}