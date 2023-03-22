import React, { useState } from "react";
// import { motion } from "framer-motion";
import styles from "./Popover.module.less";



function Popover({ content, children }) {
  const [showPopover, setShowPopover] = useState(false);

  const handleMouseEnter = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showPopover && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#fff",
            padding: "8px",
            boxShadow: "02px8px rgba(0,0,0,0.15)",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Popover;
