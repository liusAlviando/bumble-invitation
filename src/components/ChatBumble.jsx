import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Present from "../pages/Present";
import axios from "axios";

const ChatBumble = () => {
  const [phase, setPhase] = useState(1);
  const [answers, setAnswers] = useState({ question1: "", question2: "" });
  const [customMessage, setCustomMessage] = useState("");

  const [loading, setLoading] = useState(false);          // 👈 Sending API
  const [typing, setTyping] = useState(false);            // 👈 A typing...
  const [failedRequest, setFailedRequest] = useState(null); // 👈 Save failed request to retry

  const [chat, setChat] = useState([
    {
      id: 1,
      from: "A",
      text: `Hello ${localStorage.getItem("full_name")}, Will you be able to attend our wedding ceremony?`,
    },
  ]);

  const chatEndRef = useRef(null);
  const chatScroll = useRef(null);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // 👇 Auto scroll bottom
  useEffect(() => {
    if (chatScroll.current) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [chat, typing]);

  /** ================================
   * 🚀 SEND ANSWER TO API
   * ================================ */
  function sendAnswer(request) {
    setLoading(true);
    setTyping(true);
    axios
      .post(`https://api.cause.monster/api-invitation/post`, request)
      .then(() => {
        setFailedRequest(null);
        setLoading(false);
      
        // 👇 Stop typing animation after delay
        setTimeout(() => {
          setTyping(false);
      
          // 👇 If the message we sent was a custom message, send a bot reply
          if (request.message) {
            setChat((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                from: "A",
                component: (
                  <div>
                    Thank you, see you on the D-Day! 💛{" "}
                    <a
                      href="/liked"
                      className="underline text-primary font-semibold"
                    >
                      here
                    </a>{" "}
                    to see the other messages.
                  </div>
                ),
                time: getTime(),
              },
            ]);
          }
        }, 800);
      })      
      .catch(() => {
        setLoading(false);
        setTyping(false);
        setFailedRequest(request); // Save failed request => allow retry
        // 👇 Show error bubble
        setChat((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            from: "A",
            component: (
              <div className="text-red-500">
                Failed to send 😞
                <button
                  className="ml-3 px-2 py-1 bg-red-400 text-white rounded-lg text-xs"
                  onClick={() => retrySend()}
                >
                  Retry
                </button>
              </div>
            ),
          },
        ]);
      });
  }

  // 🔁 Retry Failed Request
  const retrySend = () => {
    if (failedRequest) sendAnswer(failedRequest);
  };

  /** ================================
   * 🎯 HANDLE USER ANSWERS
   * ================================ */
  const handleAnswer = (q, value) => {
    if (loading) return; // prevent double click

    const newAnswers = { ...answers, [q]: value };
    setAnswers(newAnswers);

    setChat((prev) => [
      ...prev,
      { id: prev.length + 1, from: "B", text: value, time: getTime() },
    ]);

    // Next questions
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
      const req = {
        event: newAnswers.question1,
        person: newAnswers.question2,
        slug: localStorage.getItem("slug"),
      };
      sendAnswer(req);

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

  /** ================================
   * 💬 HANDLE CUSTOM MESSAGE
   * ================================ */
  const handleCustomMessage = () => {
    if (!customMessage.trim() || loading) return;

    setChat((prev) => [
      ...prev,
      { id: prev.length + 1, from: "B", text: customMessage.trim(), time: getTime() },
    ]);

    const req = {
      message: customMessage.trim(),
      slug: localStorage.getItem("slug"),
    };

    sendAnswer(req);
    setCustomMessage("");
  };

  /** ================================
   * 🧠 TYPING INDICATOR COMPONENT
   * ================================ */
  const TypingBubble = () => (
    <div className="flex items-start">
      <div className="px-3 py-2 bg-gray-100 rounded-2xl rounded-bl-none shadow-md text-sm text-gray-600">
        <span className="flex space-x-1">
          <span className="animate-bounce">•</span>
          <span className="animate-bounce delay-200">•</span>
          <span className="animate-bounce delay-300">•</span>
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full max-w-md p-4 bg-white rounded-xl overflow-hidden">
      {/* Chat Box */}
      <div ref={chatScroll} className="overflow-x-hidden flex-1 overflow-y-auto space-y-3 mb-2 scroll-smooth">
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
                    : "bg-primary text-white rounded-br-none"
                }`}
              >
                {msg.component ? msg.component : msg.text}
                {/* bubble pointer */}
                {!msg.component && (
                  <div
                    className={`absolute bottom-0 w-0 h-0 border-t-[10px] border-t-transparent ${
                      msg.from === "A"
                        ? "border-r-[10px] border-r-gray-100 left-0 -translate-x-[9px]"
                        : "border-l-[10px] border-l-primary right-0 translate-x-[9px]"
                    }`}
                  />
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-2">
                {msg.time || getTime()}
              </span>
            </motion.div>
          ))}
          {typing && <TypingBubble />}
        </AnimatePresence>
      </div>

      {/* Choices */}
      {phase === 1 && chat[chat.length - 1].from === "A" && !loading && !failedRequest && (
        <div className="flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden relative bg-primary text-white text-sm px-3 py-2 rounded-2xl rounded-br-none shadow-md max-w-[80%]"
          >
            {chat[chat.length - 1].text.includes("wedding ceremony") && (
              <div className="flex flex-col space-y-1">
                {["Holy Matrimony", "Wedding Ceremony", "Both"].map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handleAnswer("question1", choice)}
                    className="bg-white text-black rounded-lg py-1 font-medium px-2 hover:bg-yellow-50 transition"
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
                    className="bg-white text-black rounded-lg px-3 py-1 font-medium hover:bg-yellow-50 transition"
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
          <span className="text-[10px] text-gray-400 mt-1 px-2">{getTime()}</span>
        </div>
      )}

      {/* Custom Message */}
      {phase === 2 && (
        <div className="flex mt-2 space-x-2">
          <input
            type="text"
            maxLength={150}
            disabled={loading}
            placeholder="Type a message..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-xl focus:outline-none disabled:bg-gray-100"
          />
          <button
            disabled={loading}
            onClick={handleCustomMessage}
            className="px-4 py-2 bg-primary text-white rounded-xl font-semibold disabled:opacity-50"
          >
            <FontAwesomeIcon icon={loading ? faRotateRight : faPaperPlane} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBumble;
