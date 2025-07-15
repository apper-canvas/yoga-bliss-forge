import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import SessionTypeSelector from "@/components/organisms/SessionTypeSelector";
import CalendarView from "@/components/organisms/CalendarView";
import PackageSelector from "@/components/organisms/PackageSelector";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { sessionService } from "@/services/api/sessionService";
import { packageService } from "@/services/api/packageService";

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rescheduleBooking = location.state?.rescheduleBooking;
  
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState(rescheduleBooking?.session.type || "");
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [sessionsData, packagesData] = await Promise.all([
        sessionService.getAll(),
        packageService.getAll()
      ]);
      setSessions(sessionsData);
      setPackages(packagesData);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && !sessionType) {
      toast.error("Please select a session type");
      return;
    }
    if (step === 2 && !selectedSession) {
      toast.error("Please select a session");
      return;
    }
    if (step === 3 && !selectedPackage) {
      toast.error("Please select a package");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep(step - 1);
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedSession || !selectedPackage) {
      toast.error("Please complete all selections");
      return;
    }

    const originalAmount = selectedPackage.sessionsIncluded * selectedSession.price;
    const discountAmount = originalAmount * (selectedPackage.discountRate / 100);
    const totalAmount = originalAmount - discountAmount;

    const bookingData = {
      session: selectedSession,
      package: selectedPackage,
      originalAmount,
      discountAmount,
      discountRate: selectedPackage.discountRate,
      totalAmount,
      rescheduleBooking
    };

    navigate("/payment", { state: { booking: bookingData } });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const stepTitles = [
    "Choose Session Type",
    "Select Date & Time",
    "Choose Package",
    "Review & Book"
  ];

  return (
    <div className="min-h-screen">
      <Header 
        title={rescheduleBooking ? "Reschedule Session" : "Book Your Session"}
        subtitle={stepTitles[step - 1]}
        showBackButton={true}
        onBack={handleBack}
      />
      
      <div className="px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {step} of 3
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((step / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <SessionTypeSelector
                selectedType={sessionType}
                onTypeChange={setSessionType}
              />
            )}
            
            {step === 2 && (
              <CalendarView
                sessions={sessions}
                selectedSession={selectedSession}
                onSessionSelect={setSelectedSession}
                sessionType={sessionType}
              />
            )}
            
            {step === 3 && (
              <PackageSelector
                packages={packages}
                selectedPackage={selectedPackage}
                onPackageSelect={setSelectedPackage}
                sessionPrice={selectedSession?.price || 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
            Back
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={handleNext}
              size="lg"
              className="flex-1"
              disabled={
                (step === 1 && !sessionType) ||
                (step === 2 && !selectedSession)
              }
            >
              Continue
              <ApperIcon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleProceedToPayment}
              size="lg"
              className="flex-1"
              disabled={!selectedSession || !selectedPackage}
            >
              Proceed to Payment
              <ApperIcon name="CreditCard" size={20} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;