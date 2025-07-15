import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const CalendarSlot = ({ slot, isSelected, onSelect, isAvailable = true }) => {
  const handleClick = () => {
    if (isAvailable) {
      onSelect(slot);
    }
  };
  
  return (
    <motion.div
      whileHover={isAvailable ? { scale: 1.05 } : {}}
      whileTap={isAvailable ? { scale: 0.95 } : {}}
      onClick={handleClick}
      className={`
        p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center
        ${isSelected 
          ? 'border-primary-400 bg-primary-50 text-primary-700' 
          : isAvailable 
            ? 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50' 
            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
        }
      `}
    >
      <div className="flex items-center justify-center space-x-2">
        <ApperIcon name="Clock" size={16} />
        <span className="text-sm font-medium">{slot.time}</span>
      </div>
      {!isAvailable && (
        <div className="mt-1 text-xs text-gray-400">
          Booked
        </div>
      )}
    </motion.div>
  );
};

export default CalendarSlot;