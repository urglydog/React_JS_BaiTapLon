// import React, { useState } from "react";
// import { Box, Paper, TextField, IconButton, Typography, CircularProgress, Fab } from "@mui/material";
// import { Send as SendIcon, Close as CloseIcon, Chat as ChatIcon } from "@mui/icons-material";

// const API_KEY = "AIzaSyC2Z94Fcsu4HFwLQyOW3qs2sN87RHXrPg0";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     const newMessages = [...messages, { text: input, sender: "user" }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] })
//       });
//       const data = await response.json();
//       const botMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Lỗi khi nhận phản hồi!";
//       setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
//       {/* Nút mở chat */}
//       {!open && (
//         <Fab color="primary" onClick={() => setOpen(true)}>
//           <ChatIcon />
//         </Fab>
//       )}

//       {/* Cửa sổ chat */}
//       {open && (
//         <Paper
//           sx={{
//             width: 350,
//             height: 450,
//             display: "flex",
//             flexDirection: "column",
//             position: "fixed",
//             bottom: 16,
//             right: 16,
//             borderRadius: 3,
//             boxShadow: 3,
//             overflow: "hidden",
//           }}
//         >
//           {/* Header chat */}
//           <Box sx={{ p: 2, backgroundColor: "primary.main", color: "white", display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6">Chat với AI</Typography>
//             <IconButton color="inherit" onClick={() => setOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Nội dung chat */}
//           <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: "#f5f5f5" }}>
//             {messages.map((msg, index) => (
//               <Box key={index} sx={{ mb: 1, textAlign: msg.sender === "user" ? "right" : "left" }}>
//                 <Box
//                   sx={{
//                     display: "inline-block",
//                     p: 1.5,
//                     borderRadius: 2,
//                     bgcolor: msg.sender === "user" ? "primary.light" : "grey.300",
//                     color: msg.sender === "user" ? "white" : "black",
//                   }}
//                 >
//                   {msg.text}
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           {/* Input & nút gửi */}
//           <Box sx={{ p: 2, display: "flex", alignItems: "center", borderTop: "1px solid #ddd" }}>
//             <TextField
//                             fullWidth
//                             size="small"
//                             variant="outlined"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="Nhập tin nhắn..."
//                             disabled={loading}
//                             onKeyPress={(e) => {
//                                 if (e.key === "Enter") {
//                                 e.preventDefault(); // Ngăn form submit mặc định
//                                 sendMessage();
//                                 }
//                             }}
//                             />
//             <IconButton color="primary" onClick={sendMessage} disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : <SendIcon />}
//             </IconButton>
//           </Box>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ChatBox;
// import React, { useState } from "react";
// import { Box, Paper, TextField, IconButton, Typography, CircularProgress, Fab } from "@mui/material";
// import { Send as SendIcon, Close as CloseIcon, Chat as ChatIcon } from "@mui/icons-material";

// const API_URL = "http://localhost:4000/api/chat";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     const newMessages = [...messages, { text: input, sender: "user" }];
//     setMessages(newMessages);
//     setInput("");

//     try {

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input })
//       });

//       const data = await response.json();

//       // Xử lý response từ backend của bạn
//       const botMessage = data.success ? data.answer : data.message;
//       setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessages([...newMessages, {
//         text: "Không thể kết nối đến server. Vui lòng thử lại sau!",
//         sender: "bot"
//       }]);
//     }
//     setLoading(false);
//   };

//   return (
//     <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
//       {/* Nút mở chat */}
//       {!open && (
//         <Fab color="primary" onClick={() => setOpen(true)}>
//           <ChatIcon />
//         </Fab>
//       )}

//       {/* Cửa sổ chat */}
//       {open && (
//         <Paper
//           sx={{
//             width: 350,
//             height: 450,
//             display: "flex",
//             flexDirection: "column",
//             position: "fixed",
//             bottom: 16,
//             right: 16,
//             borderRadius: 3,
//             boxShadow: 3,
//             overflow: "hidden",
//           }}
//         >
//           {/* Header chat */}
//           <Box sx={{ p: 2, backgroundColor: "primary.main", color: "white", display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6">Hỗ Trợ Sản Phẩm</Typography>
//             <IconButton color="inherit" onClick={() => setOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Nội dung chat */}
//           <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: "#f5f5f5" }}>
//             {messages.length === 0 && (
//               <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
//                 <Typography variant="body2">
//                   Chào mừng bạn! Hãy hỏi về sản phẩm của chúng tôi.
//                 </Typography>
//               </Box>
//             )}

//             {messages.map((msg, index) => (
//               <Box key={index} sx={{ mb: 1, textAlign: msg.sender === "user" ? "right" : "left" }}>
//                 <Box
//                   sx={{
//                     display: "inline-block",
//                     p: 1.5,
//                     borderRadius: 2,
//                     maxWidth: "80%",
//                     wordBreak: "break-word",
//                     bgcolor: msg.sender === "user" ? "primary.light" : "grey.300",
//                     color: msg.sender === "user" ? "white" : "black",
//                   }}
//                 >
//                   {msg.text}
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           {/* Input & nút gửi */}
//           <Box sx={{ p: 2, display: "flex", alignItems: "center", borderTop: "1px solid #ddd" }}>
//             <TextField
//               fullWidth
//               size="small"
//               variant="outlined"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Nhập tin nhắn..."
//               disabled={loading}
//               onKeyPress={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault(); // Ngăn form submit mặc định
//                   sendMessage();
//                 }
//               }}
//             />
//             <IconButton color="primary" onClick={sendMessage} disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : <SendIcon />}
//             </IconButton>
//           </Box>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ChatBox;

import React, { useState, useEffect, useRef } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [colorTheme, setColorTheme] = useState("gradient"); // Default to gradient theme

  // Create or retrieve sessionId from localStorage
  const [sessionId] = useState(() => {
    const storedId = localStorage.getItem("sessionId");
    const newId = storedId || `session_${Date.now()}`;
    localStorage.setItem("sessionId", newId);
    return newId;
  });

  // Theme configuration
  const themes = {
    messenger: {
      bgPrimary: "bg-blue-500",
      bgSecondary: "bg-blue-50",
      textPrimary: "text-white",
      textSecondary: "text-blue-500",
      hoverBg: "hover:bg-blue-100",
      hoverText: "hover:text-blue-800",
      borderColor: "border-blue-200",
      buttonBg: "bg-blue-500",
      buttonHover: "hover:bg-blue-600",
      animateColor: "bg-blue-500",
    },
    crimson: {
      bgPrimary: "bg-red-600",
      bgSecondary: "bg-red-50",
      textPrimary: "text-white",
      textSecondary: "text-red-600",
      hoverBg: "hover:bg-red-100",
      hoverText: "hover:text-red-800",
      borderColor: "border-red-200",
      buttonBg: "bg-red-600",
      buttonHover: "hover:bg-red-700",
      animateColor: "bg-red-600",
    },
    emerald: {
      bgPrimary: "bg-emerald-600",
      bgSecondary: "bg-emerald-50",
      textPrimary: "text-white",
      textSecondary: "text-emerald-600",
      hoverBg: "hover:bg-emerald-100",
      hoverText: "hover:text-emerald-800",
      borderColor: "border-emerald-200",
      buttonBg: "bg-emerald-600",
      buttonHover: "hover:bg-emerald-700",
      animateColor: "bg-emerald-600",
    },
    amber: {
      bgPrimary: "bg-amber-500",
      bgSecondary: "bg-amber-50",
      textPrimary: "text-white",
      textSecondary: "text-amber-500",
      hoverBg: "hover:bg-amber-100",
      hoverText: "hover:text-amber-800",
      borderColor: "border-amber-200",
      buttonBg: "bg-amber-500",
      buttonHover: "hover:bg-amber-600",
      animateColor: "bg-amber-500",
    },
    violet: {
      bgPrimary: "bg-violet-600",
      bgSecondary: "bg-violet-50",
      textPrimary: "text-white",
      textSecondary: "text-violet-600",
      hoverBg: "hover:bg-violet-100",
      hoverText: "hover:text-violet-800",
      borderColor: "border-violet-200",
      buttonBg: "bg-violet-600",
      buttonHover: "hover:bg-violet-700",
      animateColor: "bg-violet-600",
    },
    rose: {
      bgPrimary: "bg-rose-500",
      bgSecondary: "bg-rose-50",
      textPrimary: "text-white",
      textSecondary: "text-rose-500",
      hoverBg: "hover:bg-rose-100",
      hoverText: "hover:text-rose-800",
      borderColor: "border-rose-200",
      buttonBg: "bg-rose-500",
      buttonHover: "hover:bg-rose-600",
      animateColor: "bg-rose-500",
    },
    teal: {
      bgPrimary: "bg-teal-500",
      bgSecondary: "bg-teal-50",
      textPrimary: "text-white",
      textSecondary: "text-teal-500",
      hoverBg: "hover:bg-teal-100",
      hoverText: "hover:text-teal-800",
      borderColor: "border-teal-200",
      buttonBg: "bg-teal-500",
      buttonHover: "hover:bg-teal-600",
      animateColor: "bg-teal-500",
    },
    gradient: {
      bgPrimary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      bgSecondary: "bg-pink-50",
      textPrimary: "text-white",
      textSecondary: "text-pink-600",
      hoverBg: "hover:bg-pink-100",
      hoverText: "hover:text-pink-800",
      borderColor: "border-pink-200",
      buttonBg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      buttonHover: "hover:opacity-90",
      animateColor: "bg-indigo-500",
    },
    dark: {
      bgPrimary: "bg-gray-800",
      bgSecondary: "bg-gray-100",
      textPrimary: "text-white",
      textSecondary: "text-gray-800",
      hoverBg: "hover:bg-gray-200",
      hoverText: "hover:text-black",
      borderColor: "border-gray-300",
      buttonBg: "bg-gray-800",
      buttonHover: "hover:bg-gray-900",
      animateColor: "bg-gray-700",
    },
  };

  const theme = themes[colorTheme];

  // Function to cycle through themes (for demo purposes)
  const cycleTheme = () => {
    const themeOptions = Object.keys(themes);
    const currentIndex = themeOptions.indexOf(colorTheme);
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    setColorTheme(themeOptions[nextIndex]);
  };

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const backendChatURL = import.meta.env.VITE_BACK_END_URL_CHAT;

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${backendChatURL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, sessionId }),
      });
      const data = await response.json();

      // Process response
      let botMessage;
      if (!data.success) {
        botMessage = (
          <div className="text-red-600">
            {data.message || "Đã có lỗi xảy ra. Vui lòng thử lại!"}
          </div>
        );
      } else if (data.data && data.data.length > 0) {
        // Display product list with images
        botMessage = (
          <div>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: data.answer }}
            />
            {data.data && data.data.length > 0 && (
              <div className="space-y-3 mt-4">
                {data.data.map((product, idx) => (
                  <div
                    key={idx}
                    className={`p-3 bg-white rounded-lg shadow-sm border ${theme.borderColor} flex items-start`}
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md mr-3"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80";
                        }}
                      />
                    )}
                    <div>
                      <h3 className={`font-bold ${theme.textSecondary}`}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                      <p className="text-sm font-medium">
                        Giá: {product.price.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {data.totalPrice && (
              <p className="mt-4 font-bold text-lg text-red-600">
                Tổng chi phí: {data.totalPrice.toLocaleString()}đ
              </p>
            )}
          </div>
        );
      } else {
        // Display text response (fallback or vector)
        botMessage = <p>{data.answer}</p>;
      }

      setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: (
            <div className="text-red-600">
              Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại!
            </div>
          ),
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Chat button component with ripple effect
  const ChatButton = ({ icon, onClick }) => (
    <div className="relative">
      <div
        className={`absolute inset-0 rounded-full ${theme.animateColor} opacity-60 animate-ping`}
      ></div>
      <div
        className={`absolute inset-0 rounded-full ${theme.animateColor} opacity-40 animate-pulse delay-200`}
      ></div>
      <button
        onClick={onClick}
        className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-xl ${theme.buttonBg} ${theme.textPrimary} ${theme.buttonHover} focus:outline-none transition-transform duration-200 ease-out hover:scale-110 hover:-translate-y-1`}
      >
        {icon}
      </button>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      {!open && (
        <ChatButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          }
          onClick={() => setOpen(true)}
        />
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-4 right-4 w-120 h-[600px] flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
          {/* Header */}
          <div
            className={`px-5 py-4 ${theme.bgPrimary} ${theme.textPrimary} flex justify-between items-center`}
          >
            <h2 className="text-lg font-semibold">Hỗ trợ sản phẩm</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={cycleTheme}
                className={`text-xs opacity-70 ${theme.textPrimary} ${theme.buttonHover}`}
                title="Change theme (demo)"
              >
                Change
              </button>
              <button
                onClick={() => setOpen(false)}
                className="focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat content */}
          <div className={`flex-1 p-5 overflow-y-auto ${theme.bgSecondary}`}>
            {messages.length === 0 && (
              <div
                className={`bg-white text-gray-800 p-6 ml-8 rounded-xl max-w-md shadow-md text-center border ${theme.borderColor}`}
              >
                <p className="mb-2">
                  👋 <span className="font-semibold">Chào mừng bạn!</span> Tôi
                  là chatBox tư vấn khách hàng của website{" "}
                  <span className="font-semibold">3 chàng T</span>.
                </p>
                <p>
                  💬 Hãy hỏi về sản phẩm hoặc gõ{" "}
                  <span className={`font-bold ${theme.textSecondary}`}>
                    đặt lịch
                  </span>{" "}
                  để đặt lịch hẹn.
                </p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? `${theme.bgPrimary} ${theme.textPrimary}`
                      : `bg-white text-gray-800 shadow-sm border ${theme.borderColor}`
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input and send button */}
          <div
            className={`p-4 flex items-center border-t ${theme.borderColor} bg-white`}
          >
            <input
              type="text"
              className={`flex-1 border ${theme.borderColor} rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về sản phẩm..."
              disabled={loading}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !loading) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className={`ml-3 ${theme.buttonBg} ${theme.textPrimary} rounded-full w-10 h-10 flex items-center justify-center focus:outline-none disabled:opacity-50 transition-colors ${theme.buttonHover}`}
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
