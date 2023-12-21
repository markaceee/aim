import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Container = ({ children }) => {
  return (
    <div className="flex flex-col h-full xl:h-screen">
      <Header />
      <div className="content-container flex">
        <Sidebar />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Container;
