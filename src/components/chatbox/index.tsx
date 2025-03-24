if (typeof global === "undefined" || global === null) {
  (window as any).global = window;
}

import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { FaUserGear } from "react-icons/fa6";

import { Stomp } from "@stomp/stompjs";
import { IoAdd, IoChatbox } from "react-icons/io5";
import { MdChat, MdRemove } from "react-icons/md";
import { useSelector } from "react-redux";
import { getInfoChatBox } from "../../services/messageService";
import { API_URL } from "../../constants/baseURL";
import { RootState } from "../../store";
import { FaRobot } from "react-icons/fa";
import ChatAdmin from "./components/ChatAdmin";
import ChatBot from "./components/ChatBot";
import { Message } from "../../types/Message";
import SockJS from "sockjs-client";
import sockjs from "sockjs-client/dist/sockjs";
interface InfoChatBox {
  idChatBox?: string;
  idAdmin?: string;
  seen: boolean;
}

const UserChatbox: React.FC = () => {
  const [openChat, setOpenChat] = useState(false);
  const [openChatBot, setOpenChatBot] = useState(false);
  const [openChatAdmin, setOpenChatAdmin] = useState(false);
  const [messagesBot, setMessagesBot] = useState(false);
  const [messagesAdmin, setMessagesAdmin] = useState<Message[]>([]);
  const [privateStompClient, setPrivateStompClient] = useState<any | null>(
    null
  );
  const [infoChatBox, setInfoChatBox] = useState<InfoChatBox>({ seen: true });

  const { userInfo, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const openChatAdminRef = useRef(openChatAdmin);

  const sendPrivateMessage = () => {
    if (privateStompClient && isAuthenticated && infoChatBox) {
      const message = JSON.stringify({
        id: infoChatBox?.idChatBox,
        userId: userInfo.id,
        name: userInfo.name,
        image: userInfo.picture,
        isSeen: false,
      });
      console.log({ text: message, to: infoChatBox.idAdmin });
      privateStompClient.send(
        "/app/private",
        {},
        JSON.stringify({ text: message, to: infoChatBox.idAdmin })
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const res = await getInfoChatBox();
        setInfoChatBox(res);
      })();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    openChatAdminRef.current = openChatAdmin;
  }, [openChatAdmin]);

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) return;
      const privateSocket = new sockjs(
        `${API_URL}/ws?access_token=${accessToken}`
      );
      const privateStomp = Stomp.over(privateSocket);

      privateStomp.connect({}, (frame: string) => {
        console.log("Connected to private channel: " + frame);
        privateStomp.subscribe("/user/specific", (data: any) => {
          const message: Message = JSON.parse(data.body);
          if (openChatAdminRef.current) {
            setMessagesAdmin((prevMessagesAdmin) => [
              ...prevMessagesAdmin,
              message,
            ]);
          } else {
            setOpenChatAdmin(true);
          }
          setInfoChatBox((prevInfoChatBox) => ({
            ...prevInfoChatBox,
            seen: true,
          }));
        });
      });

      setPrivateStompClient(privateStomp);
    }
    return () => {
      if (privateStompClient) privateStompClient.disconnect();
    };
  }, [isAuthenticated, privateStompClient]);

  return (
    <div className="fixed bottom-0 right-0 z-50">
      <div className="flex items-end">
        <div className="flex items-end gap-5">
          {openChatAdmin && (
            <ChatAdmin
              messages={messagesAdmin}
              setMessages={setMessagesAdmin}
              setOpen={setOpenChatAdmin}
              sendPrivateMessage={sendPrivateMessage}
            />
          )}
          {openChatBot && <ChatBot />}
        </div>

        <div className="pb-4 pr-4 ml-[20px]">
          {openChat && (
            <>
              {isAuthenticated && (
                <div
                  onClick={() => {
                    setOpenChatAdmin(!openChatAdmin);
                    setInfoChatBox({ ...infoChatBox, seen: true });
                  }}
                  className="relative mb-[10px] bg-white w-[55px] border-4 border-black h-[55px] rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer"
                >
                  <FaUserGear size={30} />
                  {!infoChatBox.seen && (
                    <div className="absolute -top-2 -right-1 w-[25px] h-[25px] bg-red-600 rounded-full flex items-center justify-center font-bold text-white">
                      1
                    </div>
                  )}
                </div>
              )}

              <div
                onClick={() => setOpenChatBot(!openChatBot)}
                className="border-4 border-black mb-[10px] bg-white w-[55px] h-[55px] rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer"
              >
                <FaRobot size={30} />
              </div>
            </>
          )}

          <div
            onClick={() => setOpenChat(!openChat)}
            className="relative bg-blue-600 w-[55px] h-[55px] rounded-full flex items-center justify-center text-white hover:opacity-80 cursor-pointer"
          >
            {openChat ? <MdRemove /> : <IoChatbox size={30} />}
            {!infoChatBox.seen && (
              <div className="absolute top-0 right-0 w-[25px] h-[25px] bg-red-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserChatbox;
