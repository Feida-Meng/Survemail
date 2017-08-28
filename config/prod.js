//prod.js - production keys
module.exports = {
  GoogleOauthClientID: process.env.GOOGLE_CLIENT_ID,
  GoogleOauthClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};
