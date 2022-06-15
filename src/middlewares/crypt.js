const crypto = require("crypto-js");

function encrypt(text) {
  const result = crypto.AES.encrypt(text, process.env.HASH_PASS);
  return result.toString();
}
function decrypt(text) {
  const result = crypto.AES.decrypt(text, process.env.HASH_PASS);
  return result.toString(crypto.enc.Utf8);
}

module.exports = { encrypt, decrypt };
