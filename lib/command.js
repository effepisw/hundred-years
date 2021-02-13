const Path = require('path')

const err = require('./error')

const fs = require('fs')

const core = require('./core')

const open = require('open')

module.exports.ENCRYPT_COMMAND_ARG = ['encrypt', 'e']

module.exports.DECRYPT_COMMAND_ARG = ['decrypt', 'd']

module.exports.OPEN_COMMAND_ARG = ['open']

module.exports.encrypt = async (parameters) => {

  var path = parameters.filePath
  console.log(path)
  const pwd = parameters.pwd

  var overrideFile = parameters.override

  const exists = fs.existsSync(path)

  if (!exists) err.stop(err.ERROR.ERR004)

  path = Path.resolve(path)

  if (pwd.length === 0) err.stop(err.ERROR.ERR005)

  if (pwd.length < 8) err.stop(err.ERROR.ERR006)

  const fileContent = fs.readFileSync(path)

  const fileContentEncrypted = core.cipher(pwd, fileContent)

  var outputPath = path
  if (!overrideFile) {
    const ext = Path.extname(outputPath)
    const dir = Path.dirname(outputPath)
    const fileName = Path.basename(outputPath, ext)
    outputPath = Path.join(dir, `${fileName}-encrypted${ext}`)
  }

  fs.writeFileSync(outputPath, fileContentEncrypted)

  console.log(`Content of file ${path} has been encrypted`)
  console.log(`Output file ${outputPath}`)
}

module.exports.decrypt = (parameters) => {
  var path = parameters.filePath
  console.log(path)
  const pwd = parameters.pwd

  var overrideFile = parameters.override

  const exists = fs.existsSync(path)

  if (!exists) err.stop(err.ERROR.ERR004)

  path = Path.resolve(path)

  if (pwd.length === 0) err.stop(err.ERROR.ERR005)

  if (pwd.length < 8) err.stop(err.ERROR.ERR006)

  const fileContent = fs.readFileSync(path).toString()

  const fileContentEncrypted = core.decipher(pwd, fileContent)

  var outputPath = path
  if (!overrideFile) {
    const ext = Path.extname(outputPath)
    const dir = Path.dirname(outputPath)
    const fileName = Path.basename(outputPath, ext)
    outputPath = Path.join(dir, `${fileName}-decrypted${ext}`)
  }

  fs.writeFileSync(outputPath, fileContentEncrypted)

  console.log(`Content of file ${path} has been decrypted`)
  console.log(`Output file ${outputPath}`)
}

module.exports.open = async (parameters) => {
  var path = parameters.filePath
  console.log(path)
  const pwd = parameters.pwd

  var overrideFile = parameters.override

  const exists = fs.existsSync(path)

  if (!exists) err.stop(err.ERROR.ERR004)

  path = Path.resolve(path)

  if (pwd.length === 0) err.stop(err.ERROR.ERR005)

  if (pwd.length < 8) err.stop(err.ERROR.ERR006)

  const fileContent = fs.readFileSync(path).toString()

  const fileContentEncrypted = core.decipher(pwd, fileContent)

  const ext = Path.extname(path)
  const dir = Path.dirname(path)
  const fileName = Path.basename(path, ext)
  const outputPath = Path.join(dir, `~${fileName}${ext}`)

  fs.writeFileSync(outputPath, fileContentEncrypted)

  console.log(outputPath)

  await open(outputPath, {app: 'notepad', wait: true});
   fs.unlinkSync(outputPath)

  console.log(`Content of file ${path} has been decrypted`)
  console.log(`Output file ${outputPath}`)
}
