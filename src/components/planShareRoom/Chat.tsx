import { ChangeEvent, useState, useEffect, useRef } from "react";
import { ReactComponent as ChatEmotion } from "../../assets/chatEmotion.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { Stomp } from "@stomp/stompjs";
import { getMemberByAccessToken } from "../../api/memberAPI";
import { useRecoilValue } from "recoil";
import { shareRoomInfo } from "../../store/shareRoomInfo";
import { sendTokenEnteringShareRoom } from "../../api/shareRoomAPI";
import { getChatRoomEnterMessage } from "../../api/chatAPI";

declare global {
  interface Window {
    SockJS: any;
  }
}

interface IChatMessage {
  nickName: string;
  shareId: number;
  message: string;
  shareRoomEnterId: number;
  type: "ENTER" | "JOIN" | "TALK";
}

const Chat = () => {
  const stompClient = useRef<any | null>(null);
  const [openChatStatus, setOpenChatStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [username, setUsername] = useState<string>("");
  const [shareRoomEnterId, setShareRoomEnterId] = useState<number>(0);
  const shareRoomData = useRecoilValue(shareRoomInfo);
  const shareId: number = shareRoomData.shareId;
  const [composing, setComposing] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const onClickChatStatusHandler = () => {
    if (!openChatStatus) {
      connect();
    } else {
      disconnect();
    }
    setOpenChatStatus(!openChatStatus);
  };

  const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const memberData = await getMemberByAccessToken();
      const userName = memberData.nickname;
      setUsername(userName);

      if (shareId) {
        const enterData = await sendTokenEnteringShareRoom(shareId);
        if (enterData && enterData.shareRoomEnterId) {
          setShareRoomEnterId(enterData.shareRoomEnterId);
        }
      }
    };

    if (shareId !== 0) {
      fetchDetails()
        .then(() => console.log("fetchDetails has completed"))
        .catch((error) => console.error("Failed to fetch details:", error));
    }
  }, [shareId]);

  const connect = async () => {
    const socketFactory = () =>
      new window.SockJS(`${import.meta.env.VITE_CHAT_URL}`);
    const client = Stomp.over(socketFactory);
    stompClient.current = client;
    client.connect({}, onConnected, onError);
  };

  const onConnected = async () => {
    const previousShareId = sessionStorage.getItem("lastEnteredChatRoom");
    if (previousShareId !== String(shareId)) {
      stompClient.current?.send(
        "/pub/chat/message",
        {},
        JSON.stringify({
          shareId: shareId,
          nickName: username,
          shareRoomEnterId: shareRoomEnterId,
          type: "ENTER",
        })
      );
      sessionStorage.setItem("lastEnteredChatRoom", String(shareId));
    }

    await stompClient.current?.subscribe(
      `/sub/share-room/${shareId}`,
      onMessageReceived
    );

    const pastMessages = await getChatRoomEnterMessage(shareId);
    if (pastMessages && Array.isArray(pastMessages)) {
      setMessages(pastMessages);
    }
  };

  const onError = (error: any) => {
    console.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!",
      error
    );
  };

  const sendMessageHandler = () => {
    if (message && stompClient.current) {
      const chatMessage = {
        shareId: shareId,
        shareRoomEnterId: shareRoomEnterId,
        nickName: username!,
        message: message,
        type: "TALK",
      };

      stompClient.current.send(
        "/pub/chat/message",
        {},
        JSON.stringify(chatMessage)
      );
      setMessage("");
    }
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!composing && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler();
    }
  };

  const onCompositionStart = () => {
    setComposing(true);
  };

  const onCompositionEnd = () => {
    setComposing(false);
  };

  const onMessageReceived = (payload: any) => {
    const message: IChatMessage = JSON.parse(payload.body);

    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const disconnect = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.disconnect();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div
        role="button"
        onClick={onClickChatStatusHandler}
        className="absolute bottom-10 right-10 w-[5rem] h-[5rem] rounded-full hover:bg-gray-003 cursor-pointer z-[1016]"
      >
        <ChatEmotion className="w-[5rem] h-[5rem]" />
      </div>
      {openChatStatus && (
        <div
          className={`absolute right-5 bottom-10 w-[20rem] h-[35rem] bg-black-002 rounded-2xl z-[1017] ]`}
        >
          <div className="flex flex-row-reverse mt-3 mr-4">
            <Close
              role="button"
              onClick={onClickChatStatusHandler}
              className="w-[25px] h-[25px] fill-white"
            />
          </div>
          <div className="flex flex-col mt-3 m-center w-[18rem] h-[30rem] bg-blue-005 rounded-md">
            <div className="flex flex-col overflow-y-scroll no-scrollbar m-3 h-[25rem] bg-blue-005 rounded-md">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`w-fit text-black ${
                    msg.nickName === username
                      ? "text-right place-self-end"
                      : "place-self-start"
                  } ${
                    index > 0 && messages[index - 1].nickName === msg.nickName
                      ? ""
                      : "mt-3"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      msg.nickName === username
                        ? "mr-1 place-self-end"
                        : "ml-1 place-self-start"
                    } ${
                      index > 0 && messages[index - 1].nickName === msg.nickName
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {msg.nickName}
                  </span>
                  <p
                    className={`px-2 py-1 mt-1 w-fit rounded-lg ${
                      msg.nickName === username
                        ? "bg-yellow-004"
                        : "bg-green-005"
                    }`}
                  >
                    {msg.message}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex">
              <textarea
                placeholder="내용을 입력해주세요"
                value={message}
                onChange={onChangeMessageHandler}
                onKeyDown={onEnterPress}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                className="p-1 mb-2 ml-3 w-full h-[4rem] rounded-l-lg outline-none"
                style={{ resize: "none" }}
              />
              <button
                type="button"
                onClick={sendMessageHandler}
                className="flex justify-center items-center px-2 mb-2 mr-2 min-w-max h-[4rem] rounded-r-lg bg-yellow-004 text-orange-001 hover:bg-yellow-003 cursor-pointer transition-all duration-150"
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
