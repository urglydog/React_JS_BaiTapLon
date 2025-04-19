import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../custom/axios";

export default function LoginWave() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-transparent relative">
      {/* Wave Background */}
      <div className="background-wave absolute inset-0 overflow-hidden" style={{
        background: 'linear-gradient(60deg, rgba(128, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)'
      }}>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
          style={{
            position: 'absolute',
            width: '100%',
            height: '15vh',
            bottom: 0,
            left: 0,
            minHeight: '100px',
            maxHeight: '150px'
          }}
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      
      {/* Auth Card in the center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <AuthCard />
      </div>
    </div>
  );
}

// Auth Card Component
function AuthCard() {
  const [isActive, setIsActive] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form state
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes for signup form
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input changes for signin form
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle signup submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Call register API
      const response = await axiosInstance.post('/register', {
        fullName: signUpForm.fullName,
        email: signUpForm.email,
        password: signUpForm.password
      });
      
      if (response.status === 201) {
        // On success, switch to login view
        setIsActive(true);
        setSignInForm({
          email: signUpForm.email,
          password: ''
        });
      } else {
        throw new Error('Đăng ký thất bại');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  // Handle signin submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Call the login function from UserContext
      await login({
        email: signInForm.email,
        password: signInForm.password
      });
      
      // Redirect to dashboard or home page after successful login
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      
    } catch (err) {
      setError(err.message || 'Email hoặc mật khẩu không chính xác');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[900px] max-w-full min-h-[580px] shadow-lg rounded-4xl overflow-hidden transition-all duration-500 ease-in-out text-black">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-10">
          {error}
        </div>
      )}
      
      <div className="absolute top-0 left-0 w-full h-full flex bg-[rgba(255,255,255,0.4)] rounded-4xl">
        {/* Form Sign Up */}
        <div className={`rounded-xl w-1/2 flex items-center bg-[rgba(255,255,255,0.4)]justify-center transition-transform duration-500 ease-in-out ${isActive ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
          <form onSubmit={handleSignUp} className="flex flex-col items-center justify-center h-full px-20 text-center rounded-l">
            <h1 className="text-3xl font-bold">Tạo Tài Khoản</h1>
            <div className="flex gap-3 my-4">
              <SocialIcon icon={<FaGooglePlusG />} />
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaGithub />} />
              <SocialIcon icon={<FaLinkedinIn />} />
            </div>
            <span className="text-sm">hoặc sử dụng email của bạn</span>
            <Input 
              name="fullName"
              placeholder="Họ và tên" 
              value={signUpForm.fullName}
              onChange={handleSignUpChange}
            />
            <Input 
              name="email"
              type="email" 
              placeholder="Email" 
              value={signUpForm.email}
              onChange={handleSignUpChange}
            />
            <Input 
              name="password"
              type="password" 
              placeholder="Mật khẩu" 
              value={signUpForm.password}
              onChange={handleSignUpChange}
            />
            <FormButton 
              text={loading ? "Đang xử lý..." : "Đăng Ký"} 
              type="submit"
              disabled={loading}
            />
          </form>
        </div>

        {/* Form Sign In */}
        <div className={`w-1/2 flex items-center justify-center transition-transform duration-500 ease-in-out ${isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
          <form onSubmit={handleSignIn} className="flex flex-col items-center justify-center h-full w-100 px-15">
            <h1 className="text-2xl font-bold">Đăng Nhập</h1>
            <div className="flex gap-3 my-4">
              <SocialIcon icon={<FaGooglePlusG />} />
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaGithub />} />
              <SocialIcon icon={<FaLinkedinIn />} />
            </div>
            <span className="text-sm">hoặc sử dụng email và mật khẩu</span>
            <Input 
              name="email"
              type="email" 
              placeholder="Email" 
              value={signInForm.email}
              onChange={handleSignInChange}
            />
            <Input 
              name="password"
              type="password" 
              placeholder="Mật khẩu" 
              value={signInForm.password}
              onChange={handleSignInChange}
            />
            <a href="#" className="text-xs text-gray-600 mt-2">Quên Mật Khẩu?</a>
            <FormButton 
              text={loading ? "Đang xử lý..." : "Đăng Nhập"} 
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </div>

      {/* Background Panel */}
      <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isActive ? "-translate-x-full rounded-r-[100px] rounded-l-none" : "translate-x-0 rounded-l-[100px] rounded-r-none"}`}>
        {isActive ? (
          <Panel text="Chào Mừng Trở Lại!" desc="Nhập thông tin để đăng nhập." btnText="Đăng Ký" onClick={() => setIsActive(false)} />
        ) : (
          <Panel text="Xin Chào, Bạn!" desc="Đăng ký để bắt đầu." btnText="Đăng Nhập" onClick={() => setIsActive(true)} />
        )}
      </div>
    </div>
  );
}

const SocialIcon = ({ icon }) => (
  <a href="#" className="border border-gray-300 rounded-full flex items-center justify-center w-10 h-10 text-xl">
    {icon}
  </a>
);

const Input = ({ type = "text", placeholder, name, value, onChange }) => (
  <input 
    type={type} 
    name={name}
    placeholder={placeholder} 
    value={value}
    onChange={onChange}
    className="bg-gray-100 p-3 rounded-2xl w-full my-2 text-sm" 
  />
);

const FormButton = ({ text, onClick, type = "button", disabled }) => (
  <button 
    onClick={onClick} 
    type={type}
    disabled={disabled}
    className="bg-indigo-700 text-white px-6 py-2 rounded-3xl uppercase font-bold mt-3 text-sm disabled:bg-gray-400"
  >
    {text}
  </button>
);

const Panel = ({ text, desc, btnText, onClick }) => (
  <div className="text-center px-10">
    <h1 className="text-2xl font-bold">{text}</h1>
    <p className="text-sm my-4">{desc}</p>
    <button
      onClick={onClick}
      className="border-2 border-white text-white px-6 py-2 rounded-lg uppercase font-bold mt-3 text-sm hover:bg-amber-100 hover:text-indigo-700 transition"
    >
      {btnText}
    </button>
  </div>
);