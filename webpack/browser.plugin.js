const opn = require('opn')

function ReloadChrome (options) {}

ReloadChrome.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    opn('http://reload.extensions', { app: ['chrome'] })
    callback()
  })
}

module.exports = ReloadChrome
