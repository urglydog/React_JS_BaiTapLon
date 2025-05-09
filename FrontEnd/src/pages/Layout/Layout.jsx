import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import Phone from "../../components/chatbox/Phone";
import ChatBox from "../../components/chatbox/ChatBox";
import Messenger from "../../components/chatbox/MessengerContact";

function Layout() {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Phone />
      <ChatBox />
      <Messenger />
      <Footer />
    </>
  );
}

export default Layout;
