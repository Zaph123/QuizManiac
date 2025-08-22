import React from "react";
import { motion } from "framer-motion";

 // Render icon with proper positioning
  export const renderIcon = (Icon, iconPosition, size, color = "inherit", showIcon = {breakpoint: ""}) => {
    if (!Icon) return null;
    
    return (
      <span className={`inline-flex ${showIcon.breakpoint} ${color} ${iconPosition === 'right' ? 'order-1' : ''}`}>
        <Icon size={size ? size : "20"} />
      </span>
    );
  };

const Button = ({ 
  children, 
  type = "button", 
  onClick, 
  className = "", 
  variant = "primary",
  disabled = false,
  showIcon = {breakpoint: ""},
  icon: Icon, // Accepts a React icon component
  iconPosition = "left" // 'left' or 'right'
}) => {
  // Base button classes
  const baseClasses = "rounded-lg gap-2 z-10 py-2 px-4 flex text-sm items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-primary shadow-sm text-white hover:bg-pink focus:ring-primary",
    withdraw: "bg-white focus:ring-white",
    secondary: "text-gray-500 border focus:ring-primary hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
    danger: "bg-red-600 text-white focus:ring-red-700 hover:bg-red-700",
    ghost: "text-gray-500 hover:bg-gray-100",
    warning: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-600",
    disabled: "bg-gray-200 focus:ring-primary text-gray-300 cursor-not-allowed"
  };

  // Combine classes
  const buttonClasses = `${className} ${baseClasses} ${
    disabled ? variantClasses.disabled : variantClasses[variant]
  }`;

 

  return (
    <motion.button
      initial={{ scale: 0.7, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      whileHover={!disabled ? { scale: 1.01, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.99 } : {}}
      transition={{ duration: 0.025 }}
      type={type}
      onClick={!disabled ? onClick : () => {}}
      className={buttonClasses}
      disabled={disabled}
    >
      {iconPosition === 'left' && renderIcon(Icon, iconPosition, null, "inherit", showIcon)}
      {children}
      {iconPosition === 'right' && renderIcon(Icon, iconPosition, null, "inherit", showIcon)}
    </motion.button>
  );
};

export default Button;