const bcrypt = require('bcrypt')

module.exports = async (pass1, pass2) => {
  return await bcrypt.compare(pass1, pass2)
}