import AuthService from '../services/AuthService.js';

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Đang xử lý đăng nhập cho email:', email);

    // Validate and get user
    const user = await AuthService.validateUser(email, password);

    // Create JWT token
    const token = AuthService.generateToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    console.log('Đăng nhập thành công cho user:', userWithoutPassword.email);
    
    res.status(200).json({
      success: true,
      token,
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error('Lỗi đăng nhập:', error.message);
    res.status(error.message.includes('Email') ? 401 : 500).json({ 
      success: false, 
      message: error.message || 'Lỗi máy chủ, vui lòng thử lại sau' 
    });
  }
};

// Register controller (for customers)
const register = async (req, res) => {
  try {
    // Register new user
    const newUser = await AuthService.registerUser(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      userId: newUser.id
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(error.message.includes('Email') ? 409 : 500).json({ 
      success: false, 
      message: error.message || 'Lỗi máy chủ, vui lòng thử lại sau' 
    });
  }
};

// Get current user from token
const getCurrentUser = async (req, res) => {
  try {
    const { id, role } = req.user;
    
    // Get user details
    const user = await AuthService.getUserById(id, role);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Người dùng không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ, vui lòng thử lại sau'
    });
  }
};

// Logout endpoint
const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Đăng xuất thành công'
  });
};
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "No refresh token provided" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await user.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const newToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token: newToken });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
};
// Export all functions
export { login, register, getCurrentUser, logout,refreshToken };