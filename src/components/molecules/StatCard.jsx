import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StatCard = ({ title, value, icon, color = "primary", trend }) => {
  const colorClasses = {
    primary: "text-primary-600 bg-primary-100",
    secondary: "text-secondary-600 bg-secondary-100",
    accent: "text-accent-600 bg-accent-100",
    success: "text-green-600 bg-green-100"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold font-display text-gray-800">{value}</p>
            {trend && (
              <div className="flex items-center space-x-1 mt-1">
                <ApperIcon 
                  name={trend.direction === "up" ? "TrendingUp" : "TrendingDown"} 
                  size={14} 
                  className={trend.direction === "up" ? "text-green-500" : "text-red-500"}
                />
                <span className={`text-xs ${trend.direction === "up" ? "text-green-500" : "text-red-500"}`}>
                  {trend.value}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <ApperIcon name={icon} size={24} />
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full opacity-30 blur-xl"></div>
      </Card>
    </motion.div>
  );
};

export default StatCard;