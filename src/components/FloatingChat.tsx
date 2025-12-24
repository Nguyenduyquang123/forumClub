import { useState } from "react";
import ChatBox from "./ChatBox";
import { MessageCircle, X } from "lucide-react";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CHAT BOX */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[360px] h-[500px]">
          <ChatBox />
        </div>
      )}

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </>
  );
};

export default FloatingChat;
