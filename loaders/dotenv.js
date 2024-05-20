let dotenv = require('dotenv').config();


const CONFIG = dotenv.config({ path: "" + (process.cwd(), ".env") + "" });
if (CONFIG.error) {
  throw CONFIG.error;
}
CONFIG.parsed.STAKE_HOLDERS = ["Patient", "Doctor"];
module.exports = CONFIG;
module.exports = CONFIG.parsed;