
module.exports.getParam = (args) => {
    return {
        override: getOverrideOptionArgValue(args),
        pwd: getPwdArgValue(args),
        filePath: getFilePathArgValue(args),
        verbose: getVerboseOptionArgValue(args)
    }
}


const getOverrideOptionArgValue = (args) => {
    return args.includes('-o')
}

const getVerboseOptionArgValue = (args) => {
    return args.includes('-v')
}

const getPwdArgValue = (args) => {
    const argIndex = args.findIndex((v) => v === '-p')
  
    return argIndex !== -1 && args[argIndex + 1] ? args[argIndex + 1] : undefined
}

const getFilePathArgValue = (args) => {
    const argIndex = args.findIndex((v) => v === '-s')
  
    return argIndex !== -1 && args[argIndex + 1] ? args[argIndex + 1] : undefined
}