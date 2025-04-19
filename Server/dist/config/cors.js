"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var configCors = function configCors(app) {
  var allowedOrigin = [process.env.SCANNER_URL, process.env.CLIENT_URL, process.env.ADMIN_URL, process.env.MOBILE_URL, process.env.EMAILJS_URL];
  app.use(function (req, res, next) {
    var origin = req.get('origin');
    if (allowedOrigin.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      // middleware cho phép server có thể accept và xử lý các req. Bao gồm cả cookie
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', true);
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    } else {
      res.status(403).json({
        error: 'Forbidden error CORS'
      });
    }
  });
};
var _default = exports["default"] = configCors;