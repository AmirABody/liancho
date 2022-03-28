class MyError extends Error {
  constructor({code, message, translatedMessage}) {
    super(message)
    this.code = code;
    this.translatedMessage = translatedMessage;
  }
}

module.exports = MyError;