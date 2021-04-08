const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const sentryPlugin =
  process.env.NODE_ENV !== 'development'
    ? [
        new SentryWebpackPlugin({
          // sentry-cli configuration
          authToken: process.env.VUE_APP_SENTRY_AUTH_TOKEN,
          org: 'tripllo_vue',
          project: 'tripllo_vue',
          // webpack specific configuration
          include: './dist',
          ignore: ['node_modules', 'vue.config.js'],
        }),
      ]
    : [];

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/websocket': {
        target: 'http://localhost:3000',
      },
    },
    overlay: false,
  },
  // other configuration
  configureWebpack: {
    plugins: sentryPlugin,
  },
};
