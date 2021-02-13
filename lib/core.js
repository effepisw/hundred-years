var crypto = require('crypto')

var ALGORITHM = 'aes256'

module.exports.cipher = (key, text) => {
  var cipher = crypto.createCipher(ALGORITHM, key)
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
}

module.exports.decipher = (key, encrypted) => {
  var decipher = crypto.createDecipher(ALGORITHM, key)
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
}



module.exports.getPwd = (args) => {
  const argIndex = args.findIndex((v) => v === '-p')

  return argIndex !== -1 && args[argIndex + 1] ? args[argIndex + 1] : undefined
}
