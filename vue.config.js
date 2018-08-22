module.exports = {
  devServer: {
    proxy: {
      "/vulcan/*": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  }
};