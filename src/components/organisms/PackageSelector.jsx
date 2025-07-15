import { motion } from "framer-motion";
import PackageCard from "@/components/molecules/PackageCard";

const PackageSelector = ({ packages, selectedPackage, onPackageSelect, sessionPrice }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-display font-semibold text-gray-800 mb-2">
          Choose Your Package
        </h2>
        <p className="text-gray-600">
          Save more with longer commitments
        </p>
      </div>
      
      <div className="grid gap-4">
        {packages.map((pkg) => {
          const originalPrice = pkg.sessionsIncluded * sessionPrice;
          const discountAmount = originalPrice * (pkg.discountRate / 100);
          const totalPrice = originalPrice - discountAmount;
          
          return (
            <PackageCard
              key={pkg.Id}
              package={pkg}
              isSelected={selectedPackage?.Id === pkg.Id}
              onSelect={() => onPackageSelect(pkg)}
              totalPrice={totalPrice}
              originalPrice={originalPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PackageSelector;