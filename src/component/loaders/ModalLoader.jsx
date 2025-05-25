import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ModalLoader = ({
  isOpen,
  toggleModal,
  message = "Please wait...",
}) => {
  

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 p-5 flex items-center justify-center"
        >
          {/* overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-500/40 fixed inset-0"
          />

          <motion.main
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="bg-white z-50 max-w-[450px] rounded-2xl p-5 flex flex-col gap-5"
          >
            <div className="flex gap-4 items-center flex-col">
              <p className="loader2 w-12 border-2 border-primary" />
              <p>{message}</p>
            </div>
          </motion.main>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalLoader;
