import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";

const Liked = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setPageTitle} = useOutletContext()

  function getMessages() {
    axios
      .get(`https://api.cause.monster/api-invitation/messages`)
      .then((res) => {
        setData(res.data.data); // [{full_name, rsvp_message}]
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setPageTitle("Liked");
    setLoading(true);
    getMessages();

    // 🔁 Poll every 2 seconds
    const interval = setInterval(() => {
      getMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 pt-2 space-y-5">
        <Link to={'/chats'}>
            <div className="bg-primary p-3 mb-3 rounded-xl">
                <h1 className="">Click here to send us your wishes!</h1>
            </div>
        </Link>


      {/* 🌀 Loading */}
      {loading && (
        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading messages...
        </motion.p>
      )}

      {/* 💌 List */}
      <div className="space-y-3">
        <AnimatePresence>
          {data.map((item, i) => (
            <motion.div
              key={item.full_name + i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-gray-100 border border-gray-200 rounded-xl shadow-sm"
            >
              <p className="font-semibold text-gray-800">{item.full_name}</p>
              <p className="text-gray-600">{item.rsvp_message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 📭 Empty State */}
      {!loading && data.length === 0 && (
        <motion.p
          className="text-gray-500 text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No messages yet 💌
        </motion.p>
      )}
    </div>
  );
};

export default Liked;
