import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Present from "../pages/Present";

const ChatBumble = () => {
  const [phase, setPhase] = useState(1);
  const [answers, setAnswers] = useState({ question1: "", question2: "" });
  const [customMessage, setCustomMessage] = useState("");
  const [chat, setChat] = useState([
    { id: 1, from: "A", text: "Will you be able to attend our wedding ceremony?" },
  ]);

  const chatEndRef = useRef(null); // 👈 reference to the bottom of the chat container
  const chatScroll = useRef(null); // 👈 reference to the bottom of the chat container

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // 👇 Smooth scroll to bottom every time chat updates
  useEffect(() => {
    if (chatScroll.current) {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    //   chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleAnswer = (q, value) => {
    const newAnswers = { ...answers, [q]: value };
    setAnswers(newAnswers);

    setChat((prev) => [
      ...prev,
      { id: prev.length + 1, from: "B", text: value, time: getTime() },
    ]);

    if (phase === 1 && q === "question1") {
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            from: "A",
            text: "How many people will attend?",
            time: getTime(),
          },
        ]);
      }, 600);
    } else if (phase === 1 && q === "question2") {
      setPhase(2);
      console.log("Phase 1 answers:", newAnswers);
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            from: "A",
            text: "Thank you for your confirmation 💛",
            time: getTime(),
          },
          {
            id: prev.length + 2,
            from: "A",
            component: (
              <div className="mt-2">
                <Present />
              </div>
            ),
            time: getTime(),
          },
          {
            id: prev.length + 3,
            from: "A",
            text: "Or, you can send us a message if you'd like:",
            time: getTime(),
          },
        ]);
      }, 800);
    }
  };

  const handleCustomMessage = () => {
    if (!customMessage.trim()) return;
    setChat((prev) => [
      ...prev,
      { id: prev.length + 1, from: "B", text: customMessage.trim(), time: getTime() },
    ]);
    console.log("Phase 2 message:", customMessage.trim());
    setCustomMessage("");
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md p-4 bg-white rounded-xl overflow-hidden">
      {/* Chat messages container */}
      <div ref={chatScroll} className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 mb-2 scroll-smooth">
        <AnimatePresence>
          {chat.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${
                msg.from === "A" ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`relative max-w-[80%] px-3 py-2 rounded-2xl text-sm break-words shadow-md ${
                  msg.from === "A"
                    ? "bg-gray-100 text-gray-800 rounded-bl-none"
                    : "bg-primary rounded-br-none"
                }`}
              >
                {msg.component ? msg.component : msg.text}
                {/* bubble pointer */}
                <div
                  className={`absolute bottom-0 w-0 h-0 border-t-[10px] border-t-transparent ${
                    msg.from === "A"
                      ? "border-r-[10px] border-r-gray-100 left-0 -translate-x-[9px]"
                      : "border-l-[10px] border-l-primary right-0 translate-x-[9px]"
                  }`}
                ></div>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-2">
                {msg.time || getTime()}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 👇 Scroll target */}
        <div ref={chatEndRef} />
      </div>

      {/* Choice bubbles inside chat */}
      {phase === 1 && chat[chat.length - 1].from === "A" && (
        <div className="flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-primary text-sm px-3 py-2 rounded-2xl rounded-br-none shadow-md max-w-[80%]"
          >
            {chat[chat.length - 1].text.includes("wedding ceremony") && (
              <div className="flex flex-col space-y-1">
                {["Holy Matrimony", "Wedding Ceremony", "Both"].map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handleAnswer("question1", choice)}
                    className="bg-white text-black rounded-lg py-1 font-medium px-2 hover:bg-pink-50 transition"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            )}

            {chat[chat.length - 1].text.includes("How many people") && (
              <div className="flex space-x-2">
                {[1, 2].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAnswer("question2", String(num))}
                    className="bg-white text-black rounded-lg px-3 py-1 font-medium hover:bg-pink-50 transition"
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}

            <div className="absolute bottom-0 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-primary right-0 translate-x-[9px]" />
          </motion.div>
          <span className="text-[10px] text-gray-400 mt-1 px-2">{getTime()}</span>
        </div>
      )}

      {/* Custom message input */}
      {phase === 2 && (
        <div className="flex mt-2 space-x-2">
          <input
            type="text"
            maxLength={150}
            placeholder="Type a message..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-xl focus:outline-none"
          />
          <button
            onClick={handleCustomMessage}
            className="px-4 py-2 bg-primary text-white rounded-xl font-semibold"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBumble;
