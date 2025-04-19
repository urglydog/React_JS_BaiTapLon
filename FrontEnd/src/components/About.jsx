import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const About = () => {
  // Hiển thị userContext đang có
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>About Us</h1>
      {
        // Set lại giá trị userContext
        

      console.log("User hiện tại:", user || "Chưa đăng nhập")
      
      
      }
    </div>
  );
};

export default About;
