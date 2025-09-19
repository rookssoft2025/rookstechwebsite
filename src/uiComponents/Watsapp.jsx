import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { TiArrowUpThick } from "react-icons/ti";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-3 animate-bounce z-50">
        {visible && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B3470] to-black cursor-pointer
                       text-white flex items-center justify-center
                       shadow-lg font-bold text-xl transition-transform duration-300 hover:-translate-y-1" >
            <TiArrowUpThick />
          </button>
        )}

        <a
          href="https://wa.me/917598707071"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-green-600 text-white cursor-pointer
                     flex items-center justify-center shadow-lg
                     text-2xl font-bold"
        >
          <FaWhatsapp />
        </a>
      </div>
    </>
  );
}

export default ScrollToTopButton;
