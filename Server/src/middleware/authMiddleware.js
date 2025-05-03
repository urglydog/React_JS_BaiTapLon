import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'demotokenlogin';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const bearerHeader = req.headers.authorization;
    
    if (!bearerHeader) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      });
    }
    
    // Split the bearer token
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Định dạng token không hợp lệ'
      });
    }
    
    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã hết hạn'
        });
      }
      
      // Add decoded user to request object
      req.user = decoded;
      next();
    });
    
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ, vui lòng thử lại sau'
    });
  }
};

// Middleware to check user role
const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Chưa đăng nhập'
      });
    }
    
    // If no roles specified or user's role is included in permitted roles
    if (roles.length === 0 || roles.includes(req.user.role)) {
      return next();
    }
    
    // If user doesn't have required role
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập trang này'
    });
  };
};

export { verifyToken, checkRole };