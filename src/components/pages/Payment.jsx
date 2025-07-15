import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import PaymentForm from "@/components/organisms/PaymentForm";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { bookingService } from "@/services/api/bookingService";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};
  const [processing, setProcessing] = useState(false);

  if (!booking) {
    navigate("/book");
    return null;
  }

  const handlePaymentSubmit = async (paymentData) => {
    try {
      setProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create booking
      const newBooking = {
        userId: 1, // Current user
        sessionId: booking.session.Id,
        packageId: booking.package.Id,
        totalAmount: booking.totalAmount,
        discountApplied: booking.discountRate,
        paymentStatus: "completed",
        paymentMethod: paymentData.method,
        createdAt: new Date().toISOString()
      };

      const createdBooking = await bookingService.create(newBooking);
      
      // Navigate to confirmation
      navigate("/confirmation", { 
        state: { 
          booking: { 
            ...newBooking, 
            Id: createdBooking.Id,
            session: booking.session,
            package: booking.package
          }
        } 
      });
      
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Payment" 
        subtitle="Complete your booking"
        showBackButton={true}
        onBack={() => navigate("/book")}
      />
      
      <div className="px-6 py-8">
        {processing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <ApperIcon name="Loader" size={32} className="text-white" />
              </motion.div>
            </div>
            <h2 className="text-xl font-display font-semibold text-gray-800 mb-2">
              Processing Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we process your payment...
            </p>
          </motion.div>
        ) : (
          <PaymentForm
            booking={booking}
            onPaymentSubmit={handlePaymentSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Payment;