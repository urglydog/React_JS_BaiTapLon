import { useState } from "react";
import { Phone, Clock, Mail, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PhoneCon = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const companyInfo = {
    name: "Acme Corporation",
    phone: "0123 456 789",
    email: "contact@acmecorp.com",
    address: "123 Business Street, City",
    hours: "Mon-Fri: 8:00 - 17:00",
  };

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleCallNowClick = () => {
    navigate("/appointment"); // Navigate to the AppointmentForm page
  };

  return (
    <div className="fixed bottom-6 left-25 z-50">
      <div className="relative">
        {/* Contact Form */}
        {showContactForm && (
          <div className="absolute bottom-16 left-1 w-72 bg-white rounded-lg shadow-xl border border-green-200 overflow-hidden transform transition-all duration-300 ease-out">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 relative">
              <h3 className="font-bold text-lg">Contact Us</h3>
              <p className="text-green-100 text-sm">{companyInfo.name}</p>
              <button
                onClick={toggleContactForm}
                className="absolute top-4 right-4 text-white hover:text-green-200 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contact Info */}
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Phone size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{companyInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Mail size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{companyInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <MapPin size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="font-medium text-gray-800">{companyInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Business Hours</p>
                  <p className="font-medium text-gray-800">{companyInfo.hours}</p>
                </div>
              </div>

              {/* Call to action */}
              <button
                onClick={handleCallNowClick} // Call the navigate function
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center mt-2 transition-colors"
              >
                Call Now
              </button>
            </div>
          </div>
        )}

        {/* Ripple Effects */}
        <div className="absolute inset-0 rounded-full bg-green-600 opacity-60 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-pulse delay-200"></div>

        {/* Phone Button */}
        <button
          onClick={toggleContactForm}
          className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-xl text-white bg-green-600 hover:bg-green-700 transition-transform duration-200 ease-out hover:scale-110 hover:-translate-y-1 focus:outline-none"
          title="Contact Us"
        >
          <Phone size={24} />
        </button>
      </div>
    </div>
  );
};

export default PhoneCon;