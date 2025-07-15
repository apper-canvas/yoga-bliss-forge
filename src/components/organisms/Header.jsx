import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ title, subtitle, showBackButton = false, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
      </div>
      
      <div className="relative px-6 py-8">
        {showBackButton && (
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="mb-4 text-white hover:bg-white/20"
          >
            <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
            Back
          </Button>
        )}
        
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold font-display mb-2">{title}</h1>
          {subtitle && (
            <p className="text-white/90 text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;