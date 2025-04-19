import React from 'react';
import ProfileCard from './ProfileCard';
import './TeamProfiles.css';
import taki from "../../../assets/taro.jpg";
import { FaTools, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdAccessTime, MdEmail } from 'react-icons/md';
const TeamProfiles = () => {
  // Array of team member data
  const teamMembers = [
    {
      id: 1,
      name: "Thach Taro",
      role: "Full stack developers",
      masterRole: "Master in Frontend Developer",
      location: "VietNam",
      image: taki,
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 2,
      name: "Tung",
      role: "Full stack developers",
      masterRole: "Master in Backend Architecture",
      location: "VietNam",
      image: "/assets/img/member2.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 3,
      name: "Thien",
      role: "Full stack developers",
      masterRole: "Master in User Experience",
      location: "VietNam",
      image: "/assets/img/member3.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    }
  ];

  return (
    <>
      {/* Team Section */}
      <div className="teamContainer">
        <h2 className="teamTitle">Team 01</h2>
        <div className="teamProfiles">
          {teamMembers.map((member) => (
            <ProfileCard key={member.id} memberData={member} />
          ))}
        </div>
      </div>
      
      {/* Contact Us Section */}
      <div className="contact-page">
        <div className="breadcrumb">
          <a href="/">Home</a> / Contact Us
        </div>
        
        <div className="contact-content">
          <div className="form-section">
            <h1 className="contact-title">Contact Us</h1>
            <p>We love hearing from you, our Shop customers.</p>
            <p>Please contact us and we will make sure to get back to you as soon as we possibly can.</p>
            
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name <span className="required">*</span></label>
                  <input type="text" placeholder="Your Name" />
                </div>
                
                <div className="form-group">
                  <label>Your Email <span className="required">*</span></label>
                  <input type="email" placeholder="Your Email" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Your Phone Number</label>
                <input type="tel" placeholder="Your Phone" />
              </div>
              
              <div className="form-group">
                <label>What's on your mind? <span className="required">*</span></label>
                <textarea placeholder="Just us a note and we'll get back to you as quickly as possible"></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
          
          <div className="info-section">
            <div className="info-item">
              <div className="icon">
                <MdLocationOn size={20} color="#0066ff" />
              </div>
              <div>
                <h3>Address:</h3>
                <p>123 Hung Vuong street, Tuy Hoa City, Phu Yen</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <MdPhone size={20} color="#0066ff" />
              </div>
              <div>
                <h3>Phone:</h3>
                <p>(00)1234 5678</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <MdAccessTime size={20} color="#0066ff" />
              </div>
              <div>
                <h3>We are open:</h3>
                <p>Monday - Thursday: 9:00 AM - 5:30 PM</p>
                <p>Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 11:00 AM - 5:00 PM</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <MdEmail size={20} color="#0066ff" />
              </div>
              <div>
                <h3>E-mail:</h3>
                <p><a href="mailto:thachtaro123@gmail.com">thachtaro123@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="features-section">
          <div className="feature">
            <div className="feature-icon">
              <FaTools size={25} color="white" />
            </div>
            <h3>Product Support</h3>
            <p>Up to 3 years on-site warranty available for your peace of mind.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <FaUser size={25} color="white" />
            </div>
            <h3>Personal Account</h3>
            <p>With big discounts, free delivery and a dedicated support specialist.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <FaMoneyBillWave size={25} color="white" />
            </div>
            <h3>Amazing Savings</h3>
            <p>Up to 70% off new Products, you can be sure of the best price.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamProfiles;