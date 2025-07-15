import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const BookingCard = ({ booking, onCancel, onReschedule }) => {
  const isStudio = booking.session.type === "studio";
  const isUpcoming = new Date(booking.session.date) > new Date();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${isStudio ? 'bg-gradient-to-r from-primary-100 to-secondary-100' : 'bg-gradient-to-r from-accent-100 to-primary-100'}`}>
              <ApperIcon 
                name={isStudio ? "Users" : "Home"} 
                size={24} 
                className={isStudio ? "text-primary-600" : "text-accent-600"}
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-800">
                {isStudio ? "Studio Class" : "Personal Training"}
              </h3>
              <p className="text-sm text-gray-600">
                {new Date(booking.session.date).toLocaleDateString()} at {booking.session.time}
              </p>
            </div>
          </div>
          <Badge variant={isUpcoming ? "primary" : "secondary"}>
            {isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium">${booking.totalAmount}</span>
          </div>
          {booking.discountApplied > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Discount Applied:</span>
              <span className="font-medium text-green-600">{booking.discountApplied}%</span>
            </div>
          )}
        </div>
        
        {isUpcoming && (
          <div className="flex space-x-2">
            <Button 
              onClick={() => onReschedule(booking)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Reschedule
            </Button>
            <Button 
              onClick={() => onCancel(booking)}
              variant="ghost"
              size="sm"
              className="flex-1 text-red-600 hover:bg-red-50"
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default BookingCard;