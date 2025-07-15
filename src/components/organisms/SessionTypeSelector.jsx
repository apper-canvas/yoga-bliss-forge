import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const SessionTypeSelector = ({ selectedType, onTypeChange }) => {
  const sessionTypes = [
    {
      id: "studio",
      name: "Studio Classes",
      description: "Group yoga sessions in our peaceful studio",
      price: 2,
      icon: "Users",
      benefits: ["Group energy", "Professional space", "Equipment provided"]
    },
    {
      id: "personal",
      name: "Personal Training",
      description: "One-on-one sessions at your home",
      price: 20,
      icon: "Home",
      benefits: ["Personalized attention", "Flexible schedule", "Comfort of home"]
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-semibold text-gray-800 mb-4">
        Choose Your Session Type
      </h2>
      
      <div className="grid gap-4">
        {sessionTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTypeChange(type.id)}
            className="cursor-pointer"
          >
            <Card className={`transition-all duration-300 ${selectedType === type.id ? 'ring-2 ring-primary-400 zen-glow' : ''}`}>
              <div className="flex items-start space-x-4">
                <div className={`p-4 rounded-xl ${type.id === 'studio' ? 'bg-gradient-to-r from-primary-100 to-secondary-100' : 'bg-gradient-to-r from-accent-100 to-primary-100'}`}>
                  <ApperIcon 
                    name={type.icon} 
                    size={28} 
                    className={type.id === 'studio' ? 'text-primary-600' : 'text-accent-600'}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-display font-semibold text-gray-800">
                      {type.name}
                    </h3>
                    <span className="text-xl font-bold text-primary-600">
                      ${type.price}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{type.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {type.benefits.map((benefit, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SessionTypeSelector;