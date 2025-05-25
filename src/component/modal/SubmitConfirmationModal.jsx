import { useState } from "react";
import Button from "../button/Button";
import { AnimatePresence, motion } from "framer-motion";
import ButtonLoader from "../loaders/ButtonLoader";

const SubmitConfirmationModal = ({ isOpen, toggleModal, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onSubmit();
    toggleModal()
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={toggleModal}
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
            <div className="space-y-3">
              <h1 className="font-semibold text-xl">Confirm Submission</h1>
              <p className="">
                You are about to submit, this action cannot be undone
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={toggleModal}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit();
                }}
              >
                {isLoading ? <ButtonLoader /> : "Submit"}
              </Button>
            </div>
          </motion.main>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubmitConfirmationModal;
