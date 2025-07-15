import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg animate-pulse w-2/3"></div>
      </div>
      
      {/* Cards skeleton */}
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 premium-shadow border border-white/20"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gradient-to-r from-primary-100 to-secondary-100 rounded animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded animate-pulse w-3/4"></div>
              </div>
              <div className="w-16 h-6 bg-gradient-to-r from-accent-100 to-primary-100 rounded-full animate-pulse"></div>
            </div>
            <div className="mt-4 h-10 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl animate-pulse"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        .animate-pulse {
          background: linear-gradient(90deg, rgba(155, 126, 189, 0.1) 0%, rgba(155, 126, 189, 0.2) 50%, rgba(155, 126, 189, 0.1) 100%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;