import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import ChatIcon from "../components/ChatIcon";
import { ToastContainer } from "react-toastify";
import ChatBox from "../components/chatbox";
import { notifyOrderSuccess } from "../components/toastNotify";
import sockjs from "sockjs-client/dist/sockjs";

import { API_URL } from "../constants/baseURL";
import { Stomp } from "@stomp/stompjs";
export default function Home() {
  useEffect(() => {
    const privateSocket = new sockjs(API_URL + `/ws`);
    const stompClient = Stomp.over(privateSocket);
    stompClient.connect({}, (frame) => {
      stompClient.subscribe("/topic/order-notification", (data) => {
        const notification = JSON.parse(data.body);
        const comp = (
          <div className="flex gap-2 justify-between">
            <img
              alt="avatar"
              src={notification.picture || "/public/avatar.jpg"}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <p>{notification.message}</p>
          </div>
        );
        notifyOrderSuccess(comp);
      });
    });

    return () => stompClient.disconnect();
  }, []);
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
