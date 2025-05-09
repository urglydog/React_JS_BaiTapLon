import { useState } from "react";
import { MessageCircle, X, ExternalLink, Facebook } from "lucide-react";

const MessengerContact = () => {
  const [showDevLinks, setShowDevLinks] = useState(false);
  
  const developers = [
    {
      name: "Tống Phan Kim Thạch",
      role: "FullStack Developer",
      link: "https://www.facebook.com/profile.php?id=100072961725632",
      linkText: "Facebook Profile",
      icon: <Facebook size={18} />
    },
    {
      name: "Trương Thanh Tùng",
      role: "FullStack Developer",
      link: "#",
      linkText: "Facebook Profile",
      icon: <Facebook size={18} />
    },
    {
      name: "Nguyễn Chí Thiện",
      role: "FullStack Developer",
      link: "#",
      linkText: "Facebook Profile",
      icon: <Facebook size={18} />
    }
  ];

  const toggleDevLinks = () => {
    setShowDevLinks(!showDevLinks);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        {/* Developer Links Modal */}
        {showDevLinks && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out pointer-events-auto">
              {/* Header */}
              <div className="bg-teal-500 text-white p-5 relative">
                <h3 className="font-bold text-xl">Our Development Team</h3>
                <p className="text-opacity-90 text-sm">Connect with our talented developers</p>
                <button 
                  onClick={toggleDevLinks}
                  className="absolute top-5 right-5 text-white hover:opacity-80 focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Developer Links */}
              <div className="p-6 space-y-6">
                {developers.map((dev, index) => (
                  <div key={index} className={`pb-5 last:pb-0 ${index !== developers.length - 1 ? 'border-b border-teal-200' : ''}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{dev.name}</h4>
                        <p className="text-sm text-gray-500">{dev.role}</p>
                      </div>
                      <a 
                        href={dev.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-teal-500 hover:text-teal-800 transition-colors"
                      >
                        {dev.linkText} <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                    
                    <a 
                      href={dev.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 p-3 bg-teal-50 hover:bg-teal-100 rounded-lg text-teal-500 transition-colors text-sm"
                    >
                      <div className="bg-teal-500 text-white p-2 rounded-full">
                        {dev.icon}
                      </div>
                      <span className="truncate flex-1">{dev.link}</span>
                    </a>
                  </div>
                ))}
                
                <div className="text-center text-sm text-gray-500 mt-3">
                  <p>Thank you for visiting our website!</p>
                  <p className="text-xs mt-1">Made with ❤️ by our team</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ripple Effects */}
        <div className="absolute inset-0 rounded-full bg-teal-500 opacity-60 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-teal-500 opacity-40 animate-pulse delay-200"></div>

        {/* Messenger Button */}
        <button
          onClick={toggleDevLinks}
          className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-xl text-white bg-teal-500 hover:bg-teal-600 transition-transform duration-200 ease-out hover:scale-110 hover:-translate-y-1 focus:outline-none"
          title="Connect with Developers"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default MessengerContact;