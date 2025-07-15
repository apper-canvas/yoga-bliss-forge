import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";

const PaymentForm = ({ booking, onPaymentSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "CreditCard" },
    { id: "upi", name: "UPI", icon: "Smartphone" },
    { id: "wallet", name: "Digital Wallet", icon: "Wallet" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit({ method: paymentMethod, data: cardData });
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <ApperIcon 
              name={booking.session.type === "studio" ? "Users" : "Home"} 
              size={20} 
              className="text-primary-600"
            />
            <div>
              <p className="font-medium text-gray-800">
                {booking.session.type === "studio" ? "Studio Class" : "Personal Training"}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(booking.session.date).toLocaleDateString()} at {booking.session.time}
              </p>
            </div>
          </div>
          
          {booking.package && (
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-800">
                {booking.package.duration} Month Package
              </p>
              <p className="text-xs text-gray-600">
                {booking.package.sessionsIncluded} sessions • {booking.package.discountRate}% discount
              </p>
            </div>
          )}
          
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>${booking.originalAmount}</span>
            </div>
            {booking.discountAmount > 0 && (
              <div className="flex items-center justify-between text-green-600">
                <span>Discount ({booking.discountRate}%):</span>
                <span>-${booking.discountAmount}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-lg font-semibold text-gray-800 mt-2">
              <span>Total:</span>
              <span>${booking.totalAmount}</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
          Payment Method
        </h3>
        
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod(method.id)}
              className={`
                flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${paymentMethod === method.id 
                  ? 'border-primary-400 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300'
                }
              `}
            >
              <div className={`p-2 rounded-lg ${paymentMethod === method.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                <ApperIcon name={method.icon} size={20} />
              </div>
              <span className="font-medium text-gray-800">{method.name}</span>
            </motion.div>
          ))}
        </div>
        
        {paymentMethod === "card" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Cardholder Name"
              type="text"
              value={cardData.cardholderName}
              onChange={(e) => setCardData({...cardData, cardholderName: e.target.value})}
              required
            />
            <FormField
              label="Card Number"
              type="text"
              value={cardData.cardNumber}
              onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
              placeholder="1234 5678 9012 3456"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Expiry Date"
                type="text"
                value={cardData.expiryDate}
                onChange={(e) => setCardData({...cardData, expiryDate: e.target.value})}
                placeholder="MM/YY"
                required
              />
              <FormField
                label="CVV"
                type="text"
                value={cardData.cvv}
                onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                placeholder="123"
                required
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              <ApperIcon name="Lock" size={20} className="mr-2" />
              Pay Securely ${booking.totalAmount}
            </Button>
          </form>
        )}
        
        {paymentMethod === "upi" && (
          <div className="text-center py-8">
            <ApperIcon name="Smartphone" size={48} className="mx-auto text-primary-600 mb-4" />
            <p className="text-gray-600 mb-4">Scan QR code or enter UPI ID</p>
            <Button onClick={() => onPaymentSubmit({ method: "upi" })} className="w-full" size="lg">
              Pay with UPI ${booking.totalAmount}
            </Button>
          </div>
        )}
        
        {paymentMethod === "wallet" && (
          <div className="text-center py-8">
            <ApperIcon name="Wallet" size={48} className="mx-auto text-accent-600 mb-4" />
            <p className="text-gray-600 mb-4">Pay using your digital wallet</p>
            <Button onClick={() => onPaymentSubmit({ method: "wallet" })} className="w-full" size="lg" variant="accent">
              Pay with Wallet ${booking.totalAmount}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentForm;