const bcrypt = require("bcryptjs");

const encrypt = async password => await bcrypt.hash(password, 10);
const compare = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = { encrypt, compare };