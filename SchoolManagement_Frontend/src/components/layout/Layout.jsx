import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f7fb",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Area */}
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: "25px",
            overflowX: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;