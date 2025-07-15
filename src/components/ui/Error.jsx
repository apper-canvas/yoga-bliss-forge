import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
            </div>
            
            <h3 className="text-lg font-display font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            
            {onRetry && (
              <Button onClick={onRetry} variant="primary" className="w-full">
                <ApperIcon name="RefreshCw" size={20} className="mr-2" />
                Try Again
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Error;