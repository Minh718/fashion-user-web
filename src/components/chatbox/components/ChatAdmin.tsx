import React, { useEffect, useState } from "react";
import ChatBox from "./Chatbox";
import {
  userSendMessage,
  userGetMessages,
} from "../../../services/messageService";
import { notifyError } from "../../toastNotify";
export default function ChatAdmin({
  messages,
  setMessages,
  setOpen,
  sendPrivateMessage,
}) {
  const [size, setSize] = React.useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const handleSendMessage = async (message) => {
    try {
      const res = await userSendMessage(message);
      console.log(res);
      setMessages([...messages, res]);
      sendPrivateMessage();
    } catch (err) {
      notifyError("Error occured");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const data = await userGetMessages(size);
        setMessages(data.reverse());
        setIsLoading(false);
      } catch (err) {
        notifyError("Error occured");
      }
    })();
  }, [size]);

  return (
    <ChatBox
      messages={messages}
      setSize={setSize}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      size={size}
      handleSendMessage={handleSendMessage}
      name="ADMIN"
      setOpen={setOpen}
    />
  );
}
