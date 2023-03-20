class Response {
  constructor(success, message, body) {
    this.success = success;
    this.message = message;
    if (body) this.body = body;
  }
}

module.exports = Response