import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center p-10">
      <motion.div
        className="w-8 h-8 rounded-full border-3 border-t-primary will-change-transform"
        animate={{ rotate: 360 }}
        transition={{
          duration: .75,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}