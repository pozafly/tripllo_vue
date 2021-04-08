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
};
