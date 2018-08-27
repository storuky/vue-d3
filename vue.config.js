var path = require('path')
var webpack = require('webpack')

module.exports = {
  devServer: {
    proxy: {
      "/vulcan/*": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  },
  lintOnSave: true,
  outputDir: path.resolve(__dirname, '../../../kaupang/frontend'),
};