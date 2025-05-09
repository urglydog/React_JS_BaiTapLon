const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '22102004',
  database: 'reactproject',
  port: 3309 
});

async function getCustomers() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT customerID, fullName, email, phoneNumber, address FROM customers");
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

async function getProducts() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT productID, productName, price, description, stockQuantity, supplierID, categoryID FROM products");
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

// Giữ lại hàm getKnowledgeBase  cần nó hoặc tạo bảng faqs sau
async function getKnowledgeBase() {
  let conn;
  try {
    conn = await pool.getConnection();
    
    const rows = await conn.query("SELECT productID as id, productName as question, description as answer FROM products");
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
///////phan khac
// forgot password
const SECRET_KEY = 'Th1s-1s-4-V3ry-Str0ng-S3cr3t-K3y-f0r-R3s3t-T0k3n$';

// Cấu hình nodemailer với Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thachtaro123@gmail.com', 
    pass: 'fowj ikwk uizx gavh' 
  }
});


router.post('/forgot-password', async (req, res) => {
  let conn;
  try {
    const { email } = req.body; // Email của khách hàng nhập vào form
    
    conn = await pool.getConnection();
    
 
    const rows = await conn.query(
      'SELECT * FROM customers WHERE email = ?',
      [email]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Email không tồn tại trong hệ thống' });
    }
    
   
    const customer = rows[0];
    

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
   
    const payload = {
      email: email,
      customerId: customer.id,
      expiresAt: expiresAt.getTime()
    };
    
    // Tạo token bằng cách mã hóa thông tin
    const payloadStr = JSON.stringify(payload);
    const hash = crypto.createHmac('sha256', SECRET_KEY)
                      .update(payloadStr)
                      .digest('hex');
    const resetToken = hash + '.' + Buffer.from(payloadStr).toString('base64');
    
    
    const resetUrl = `http://localhost:4000/reset-password/${resetToken}`;
    
  
    const mailOptions = {
      from: 'thachtaro123@gmail.com', 
      to: email,
      subject: 'Đặt lại mật khẩu',
      html: `
        <h1>Xin chào!</h1>
        <p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
        <p>Vui lòng nhấp vào liên kết dưới đây để đặt lại mật khẩu của bạn:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Đặt lại mật khẩu</a>
        <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
        <p>Nếu liên kết không hoạt động, bạn có thể sao chép và dán URL này vào trình duyệt của bạn:</p>
        <p>${resetUrl}</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
      `
    };
    
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Không thể gửi email' });
      }
      res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi' });
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  } finally {
    if (conn) conn.release(); 
  }
});


router.get('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
   
    const parts = token.split('.');
    if (parts.length !== 2) {
      return res.status(400).json({ valid: false, message: 'Token không hợp lệ' });
    }
    
    const [hash, encodedPayload] = parts;
    
    try {
    
      const payloadStr = Buffer.from(encodedPayload, 'base64').toString();
      const payload = JSON.parse(payloadStr);
      
    
      const expectedHash = crypto.createHmac('sha256', SECRET_KEY)
                                .update(payloadStr)
                                .digest('hex');
      
    
      if (hash !== expectedHash) {
        return res.status(400).json({ valid: false, message: 'Token không hợp lệ' });
      }
      
      if (payload.expiresAt < Date.now()) {
        return res.status(400).json({ valid: false, message: 'Token đã hết hạn' });
      }
      
      res.status(200).json({ valid: true, email: payload.email });
    } catch (error) {
      return res.status(400).json({ valid: false, message: 'Token không hợp lệ' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});


router.post('/reset-password', async (req, res) => {
  let conn;
  try {
    const { token, newPassword } = req.body;
    
    // Tách và xác thực token
    const parts = token.split('.');
    if (parts.length !== 2) {
      return res.status(400).json({ message: 'Token không hợp lệ' });
    }
    
    const [hash, encodedPayload] = parts;
    
    // Giải mã payload
    const payloadStr = Buffer.from(encodedPayload, 'base64').toString();
    const payload = JSON.parse(payloadStr);
    
    // Xác minh token
    const expectedHash = crypto.createHmac('sha256', SECRET_KEY)
                              .update(payloadStr)
                              .digest('hex');
    
    if (hash !== expectedHash) {
      return res.status(400).json({ message: 'Token không hợp lệ' });
    }
    
    if (payload.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Token đã hết hạn' });
    }
    
    conn = await pool.getConnection();
    
   
    const rows = await conn.query(
      'SELECT * FROM customers WHERE email = ?',
      [payload.email]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    
    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Cập nhật mật khẩu
    await conn.query(
      'UPDATE customers SET password = ? WHERE email = ?',
      [hashedPassword, payload.email]
    );
    
    res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  } finally {
    if (conn) conn.release(); // Giải phóng kết nối
  }
});

module.exports = { getCustomers, getProducts, getKnowledgeBase, pool,router };

