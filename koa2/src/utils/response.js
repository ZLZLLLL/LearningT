class Response {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  static success(data = {}, msg = '请求成功') {
    return new Response(200, msg, data);
  }

  static fail(msg = '请求失败', code = 400, data = {}) {
    return new Response(code, msg, data);
  }

  static error(msg = '服务器内部错误', code = 500, data = {}) {
    return new Response(code, msg, data);
  }
}

module.exports = Response; 