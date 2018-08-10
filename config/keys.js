// KEYS
module.exports = {
  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  },
  session: {
    cookieKey: process.env.SESSION_COOKIE
  },
  localDB: {
    password: process.env.LOCAL_DB
  }
};
