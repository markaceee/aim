import ChatBot from "./ChatBot/ChatBot";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Container = ({ children }) => {
  return (
    <div className="flex flex-col h-full xl:h-screen">
      <Header />
      <div className="content-container flex">
        <Sidebar />
        {children}
      </div>
      {/* <Footer /> */}
      <ChatBot />
    </div>
  );
};

export default Container;
