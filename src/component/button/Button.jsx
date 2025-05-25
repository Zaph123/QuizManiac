import React from "react";
import { motion } from "framer-motion";

const Button = ({ 
  children, 
  type = "button", 
  onClick, 
  className = "", 
  variant = "primary",
  disabled = false
}) => {
  // Base button classes
  const baseClasses = "rounded-full gap-2 py-2.5 px-5 flex text-sm items-center justify-center transition-all";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-600",
    secondary: "bg-white text-primary border hover:border-primary hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-700 hover:bg-gray-100",
    disabled: "bg-gray-100 text-gray-300 cursor-not-allowed"
  };

  // Combine classes
  const buttonClasses = `${baseClasses}  ${className} ${
    disabled ? variantClasses.disabled : variantClasses[variant]
  }`;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{duration: .025}}
      type={type}
      onClick={!disabled ? onClick : ()=>{}}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
