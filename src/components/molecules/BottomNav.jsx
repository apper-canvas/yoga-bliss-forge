import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const BottomNav = () => {
  const navItems = [
    { path: "/", icon: "Home", label: "Home" },
    { path: "/book", icon: "Calendar", label: "Book" },
    { path: "/my-sessions", icon: "User", label: "Sessions" },
    { path: "/profile", icon: "Settings", label: "Profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-all duration-200
              ${isActive 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }
            `}
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center space-y-1"
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="w-1 h-1 bg-primary-600 rounded-full"
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;