#!/usr/bin/env node

const { stop, ERROR } = require('./error')
const command = require('./command')
const { getParam } = require('./parameters')
const argsUtil = require('./args')
const fs = require('fs')

const main = async () => {
  const argv = process.argv.slice(2)

  if (argv.length === 0) {
    const help = fs.readFileSync(__dirname + '/help')
    stop(ERROR.ERR001, help.toString())
  }

  const cmd = argv.shift()

  if (
    !command.ENCRYPT_COMMAND_ARG.includes(cmd) &&
    !command.DECRYPT_COMMAND_ARG.includes(cmd) &&
    !command.OPEN_COMMAND_ARG.includes(cmd)
  ) {
    stop(ERROR.ERR002)
  }

  var params = getParam(argv)

  if (!params.filePath || !params.pwd) {
    params = await argsUtil.asks(params)
  }

  if (command.ENCRYPT_COMMAND_ARG.includes(cmd)) {
    command.encrypt(params)
  }

  if (command.DECRYPT_COMMAND_ARG.includes(cmd)) {
    command.decrypt(params)
  }

  if(command.OPEN_COMMAND_ARG.includes(cmd)) {
    command.open(params)
  }

}

main()
