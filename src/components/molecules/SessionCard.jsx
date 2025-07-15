import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const SessionCard = ({ session, onBook, isSelected, onSelect }) => {
  const isStudio = session.type === "studio";
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onSelect}
    >
      <Card className={`relative overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-primary-400 zen-glow' : ''}`}>
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
                {isStudio ? "Group session with others" : "One-on-one at your home"}
              </p>
            </div>
          </div>
          <Badge variant={isStudio ? "primary" : "accent"}>
            ${session.price}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ApperIcon name="Clock" size={16} />
            <span>{session.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ApperIcon name="Calendar" size={16} />
            <span>{new Date(session.date).toLocaleDateString()}</span>
          </div>
          {isStudio && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="Users" size={16} />
              <span>{session.bookedCount}/{session.maxCapacity} spots filled</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onBook(session);
          }}
          className="w-full"
          variant={isStudio ? "primary" : "accent"}
        >
          Book Session
        </Button>
      </Card>
    </motion.div>
  );
};

export default SessionCard;