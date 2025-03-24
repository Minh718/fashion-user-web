import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import React from "react";
import Footer from "../components/Footer";
import ChatIcon from "../components/ChatIcon";
import { ToastContainer } from "react-toastify";
import ChatBox from "../components/chatbox";
export default function Home() {
  return (
    <>
      <div className="relative">
        <Header />
        <main>
          <div className="flex justify-center bg-slate-200">
            <div className="max-w-screen-xl w-[95%]">
              <Outlet />
            </div>
          </div>
        </main>
        <ChatBox />
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}
