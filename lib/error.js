const ERR001 = 'Err-001: no operation arg founds.'

const ERR002 = 'Err-002: operation not allowed.'

const ERR003 = 'Err-003: missing file path'

const ERR004 = 'Err-004: file not found'

const ERR005 = 'Err-005: missing password arguments. -p <PASSWORD>'

const ERR006 = 'Err-005: password must be at least 8 characters.'

const ERR007 = 'Err-006: you insert two different passwords'

module.exports.ERROR = {
  ERR001,
  ERR002,
  ERR003,
  ERR004,
  ERR005,
  ERR006,
  ERR007
}

module.exports.stop = (error, ...msg) => {
  console.log(error)

  msg.forEach((v) => console.log(v))

  process.exit(1)
}
