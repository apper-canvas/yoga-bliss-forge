import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const PackageCard = ({ package: pkg, onSelect, isSelected, totalPrice, originalPrice }) => {
  const savings = originalPrice - totalPrice;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onSelect}
    >
      <Card className={`relative overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-accent-400 zen-glow' : ''}`}>
        {pkg.discountRate > 0 && (
          <div className="absolute top-4 right-4">
            <Badge variant="accent">
              {pkg.discountRate}% OFF
            </Badge>
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-accent-100 to-primary-100 rounded-lg">
              <ApperIcon name="Package" size={20} className="text-accent-600" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-800">
              {pkg.duration} Month Package
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {pkg.sessionsIncluded} sessions included
          </p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Original Price:</span>
            <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Package Price:</span>
            <span className="text-lg font-semibold text-primary-600">${totalPrice}</span>
          </div>
          {savings > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">You Save:</span>
              <span className="text-sm font-medium text-green-600">${savings}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
          <ApperIcon name="Clock" size={14} />
          <span>Valid for {pkg.duration} months</span>
        </div>
        
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="w-full"
          variant="accent"
        >
          Select Package
        </Button>
      </Card>
    </motion.div>
  );
};

export default PackageCard;