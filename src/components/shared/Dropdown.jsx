import React, { useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

function Dropdown({ buttonFontSize, menuClass, title, children }) {
  const menuRef = useRef(null);
  const [dropped, setDropped] = useState(false);
  const controls = useAnimationControls();

  const menu = {
    close: {
      opacity: 0,
      height: 0,
    },
    drop: {
      opacity: 1,
      height: "auto",
    },
  };

  const button = {
    close: {
      rotate: 0,
    },
    drop: {
      rotate: 180,
    },
  };

  const handleClick = () => {
    if (dropped) {
      controls.start("close");
    } else {
      controls.start("drop");
    }
    setDropped(!dropped);
  };

  return (
    <div className="dropdown-wrapper">
      <button
        className={`my-3 flex w-full items-center justify-between rounded-xl border-y border-gray-300 bg-gray-300 px-5 py-2 font-bold dark:border-gray-700 dark:bg-gray-600 ${buttonFontSize}`}
        onClick={handleClick}
      >
        <span>{title}</span>
        <motion.svg
          initial="close"
          animate={controls}
          variants={button}
          fill="#030712"
          width="28px"
          height="28px"
          className="rounded-full bg-gray-100 dark:bg-gray-400"
          viewBox="-8.5 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>angle-down</title>
          <path d="M7.28 20.040c-0.24 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l5.84 5.84 5.84-5.84c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24z"></path>
        </motion.svg>
      </button>
      <motion.div
        ref={menuRef}
        className={`menu overflow-hidden ${menuClass}`}
        initial="close"
        variants={menu}
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Dropdown;
