const imgur = require('imgur');

imgur.setCredentials(process.env.IMGUR_EMAIL, process.env.IMGUR_PASSWORD, process.env.IMGUR_CLIENT_ID);
imgur.setAPIUrl(process.env.IMGUR_API_URL)

module.exports = imgur;