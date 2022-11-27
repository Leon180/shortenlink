function randomAlphanumeric(digit = 5) {
  const code = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let output = ''
  if (digit < 0) {
    console.log('error, invalid digit number')
    return
  }
  for (let i = 0; i < digit; i++) {
    output += code[Math.floor(Math.random() * 62)]
  }
  return output
}

module.exports = randomAlphanumeric