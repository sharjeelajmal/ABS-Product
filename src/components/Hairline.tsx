"use client";

import { motion } from "framer-motion";

export function Hairline() {
  return (
    <motion.div
      className="figma-hairline-pad"
      initial={{ opacity: 0, scaleX: 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "0 72px",
        boxSizing: "border-box",
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}
