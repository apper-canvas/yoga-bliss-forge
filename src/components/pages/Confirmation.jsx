import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};

  useEffect(() => {
    if (booking) {
      toast.success("Booking confirmed! Check your email for details.");
    }
  }, [booking]);

  if (!booking) {
    navigate("/");
    return null;
  }

  const isStudio = booking.session.type === "studio";

  return (
    <div className="min-h-screen">
      <Header 
        title="Booking Confirmed!" 
        subtitle="Your yoga session is all set"
      />
      
      <div className="px-6 py-8 space-y-6">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Check" size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600">
            Your yoga session has been successfully booked
          </p>
        </motion.div>

        {/* Booking Details */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-semibold text-gray-800">
                Booking Details
              </h3>
              <Badge variant="success">
                Confirmed
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${isStudio ? 'bg-gradient-to-r from-primary-100 to-secondary-100' : 'bg-gradient-to-r from-accent-100 to-primary-100'}`}>
                <ApperIcon 
                  name={isStudio ? "Users" : "Home"} 
                  size={24} 
                  className={isStudio ? "text-primary-600" : "text-accent-600"}
                />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {isStudio ? "Studio Class" : "Personal Training"}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(booking.session.date).toLocaleDateString()} at {booking.session.time}
                </p>
              </div>
            </div>
            
            {booking.package && (
              <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">
                      {booking.package.duration} Month Package
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.package.sessionsIncluded} sessions included
                    </p>
                  </div>
                  <Badge variant="accent">
                    {booking.discountApplied}% OFF
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Payment Summary */}
        <Card>
          <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
            Payment Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">{booking.paymentMethod || "Credit Card"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="text-lg font-semibold text-primary-600">${booking.totalAmount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium">#{booking.Id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <Badge variant="success">Paid</Badge>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card>
          <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
            What's Next?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                <ApperIcon name="Mail" size={16} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Check your email</p>
                <p className="text-sm text-gray-600">We've sent you a confirmation email with all the details</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mt-0.5">
                <ApperIcon name="Bell" size={16} className="text-secondary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Get reminders</p>
                <p className="text-sm text-gray-600">We'll send you SMS reminders before your session</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mt-0.5">
                <ApperIcon name="Calendar" size={16} className="text-accent-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Prepare for your session</p>
                <p className="text-sm text-gray-600">Wear comfortable clothes and bring water</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate("/my-sessions")}
            variant="primary"
            className="flex items-center justify-center space-x-2"
          >
            <ApperIcon name="Calendar" size={20} />
            <span>View Sessions</span>
          </Button>
          <Button
            onClick={() => navigate("/book")}
            variant="secondary"
            className="flex items-center justify-center space-x-2"
          >
            <ApperIcon name="Plus" size={20} />
            <span>Book More</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;