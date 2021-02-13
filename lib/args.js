const { prompt } = require('enquirer')

module.exports.asks = async (parameters) => {
    
    const pwd = parameters.pwd || await askPwdForCreate()
    
    const filePath = parameters.filePath || await askFilePathForCreate()

    const override = parameters.override

    const verbose = parameters.verbose

    return {
        pwd,
        filePath,
        override,
        verbose
    }
}

// {
//     override: getOverrideOptionArgValue(args),
//     pwd: getPwdArgValue(args),
//     filePath: getFilePathArgValue(args),
//     verbose: getVerboseOptionArgValue(args)
// }


askPwdForCreate = async () => {
  const userResponse = await prompt([
    {
      type: 'password',
      name: 'password',
      message: 'What is password to encrypts file?',
    },
    {
      type: 'password',
      name: 'repeat',
      message: 'Repeat password to encrypts file',
    },
  ])

  return userResponse.password
}

askFilePathForCreate = async () => {
  const userResponse = await prompt([
    {
      type: 'input',
      name: 'filePath',
      message: 'File path to encrypt?',
    }
  ])

  return userResponse.filePath
}
