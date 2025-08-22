import { useState } from "react";
import Button from "../button/Button";
import { AnimatePresence, motion } from "framer-motion";
import ButtonLoader from "../loaders/ButtonLoader";
import { FiAlertCircle, FiCheck, FiX } from "react-icons/fi";

const SubmitConfirmationModal = ({ isOpen, toggleModal, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onSubmit();
    toggleModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={toggleModal}
          className="fixed inset-0 p-5 flex items-center justify-center z-[60]"
        >
          {/* Overlay with subtle blur effect */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="bg-black/30 fixed inset-0 backdrop-blur-sm"
          />

          {/* Modal container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 400,
              bounce: 0.1
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-gray-800 z-50 w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700"
          >
            {/* Close button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Modal content */}
            <div className="p-6">
              {/* Icon header */}
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400">
                  <FiAlertCircle className="w-8 h-8" />
                </div>
              </div>

              {/* Text content */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Confirm Submission
                </h2>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  Are you ready to submit your quiz? Once you do, your answers will be final.
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
                <Button
                variant="danger"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit();
                  }}
                >
                  {isLoading ? (
                    <ButtonLoader />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FiCheck className="w-5 h-5" />
                      Yes, Submit
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Footer note */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Double-check your information before submitting.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubmitConfirmationModal;