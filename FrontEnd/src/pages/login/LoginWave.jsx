import { useState } from "react";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

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

  return (
    <div className="relative w-[900px] max-w-full min-h-[580px] shadow-lg rounded-4xl overflow-hidden transition-all duration-500 ease-in-out text-black">
      <div className="absolute top-0 left-0 w-full h-full flex bg-[rgba(255,255,255,0.4)] rounded-4xl">
        {/* Form Sign Up */}
        <div className={`rounded-xl w-1/2 flex items-center bg-[rgba(255,255,255,0.4)]justify-center transition-transform duration-500 ease-in-out ${isActive ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
          <form className="flex flex-col items-center justify-center h-full px-20 text-center rounded-l">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <div className="flex gap-3 my-4">
              <SocialIcon icon={<FaGooglePlusG />} />
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaGithub />} />
              <SocialIcon icon={<FaLinkedinIn />} />
            </div>
            <span className="text-sm">or use your email for registration</span>
            <Input placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button text="Sign Up" onClick={() => setIsActive(true)} />
          </form>
        </div>

        {/* Form Sign In */}
        <div className={`w-1/2 flex items-center justify-center transition-transform duration-500 ease-in-out ${isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
          <form className="flex flex-col items-center justify-center h-full w-100 px-15">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <div className="flex gap-3 my-4">
              <SocialIcon icon={<FaGooglePlusG />} />
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaGithub />} />
              <SocialIcon icon={<FaLinkedinIn />} />
            </div>
            <span className="text-sm">or use your email password</span>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <a href="#" className="text-xs text-gray-600 mt-2">Forgot Your Password?</a>
            <Button text="Sign In" onClick={() => setIsActive(false)} />
          </form>
        </div>
      </div>

      {/* Background Panel */}
      <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isActive ? "-translate-x-full rounded-r-[100px] rounded-l-none" : "translate-x-0 rounded-l-[100px] rounded-r-none"}`}>
        {isActive ? (
          <Panel text="Welcome Back!" desc="Enter your details to sign in." btnText="Sign Up" onClick={() => setIsActive(false)} />
        ) : (
          <Panel text="Hello, Friend!" desc="Register to get started." btnText="Sign In" onClick={() => setIsActive(true)} />
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

const Input = ({ type = "text", placeholder }) => (
  <input type={type} placeholder={placeholder} className="bg-gray-100 p-3 rounded-2xl w-full my-2 text-sm" />
);

const Button = ({ text, onClick }) => (
  <button onClick={onClick} className="bg-indigo-700 text-white px-6 py-2 rounded-3xl uppercase font-bold mt-3 text-sm">
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