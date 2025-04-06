module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/codezenith',
    secretOrKey: process.env.SECRET_OR_KEY || 'secret'
  };