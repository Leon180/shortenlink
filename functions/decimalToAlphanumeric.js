function decimalToAlphanumeric(number, digit = 5) {
  const code = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let output = ''
  if (number < 0) {
    console.log('error, invalid number')
    return
  }
  while (number > 61) {
    output += code[number % 62]
    number /= 62
  }
  output += code[number]
  return output + code[0].repeat(digit - output.length)
}

module.exports = decimalToAlphanumeric