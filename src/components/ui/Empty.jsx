import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing here yet", 
  icon = "Search",
  actionText,
  onAction
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name={icon} size={40} className="text-primary-600" />
            </div>
            
            <h3 className="text-xl font-display font-semibold text-gray-800 mb-3">
              {title}
            </h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            
            {actionText && onAction && (
              <Button onClick={onAction} variant="primary" className="w-full">
                {actionText}
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Empty;