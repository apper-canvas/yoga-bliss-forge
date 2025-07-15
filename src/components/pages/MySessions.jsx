import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import BookingCard from "@/components/molecules/BookingCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { bookingService } from "@/services/api/bookingService";

const MySessions = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (booking) => {
    try {
      await bookingService.delete(booking.Id);
      setBookings(bookings.filter(b => b.Id !== booking.Id));
      toast.success("Booking cancelled successfully");
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleRescheduleBooking = (booking) => {
    navigate("/book", { state: { rescheduleBooking: booking } });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBookings} />;

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.session.date);
    const now = new Date();
    
    switch (filter) {
      case "upcoming":
        return bookingDate > now;
      case "past":
        return bookingDate <= now;
      default:
        return true;
    }
  });

  const filters = [
    { id: "all", label: "All Sessions", icon: "Calendar" },
    { id: "upcoming", label: "Upcoming", icon: "Clock" },
    { id: "past", label: "Past", icon: "History" }
  ];

  return (
    <div className="min-h-screen">
      <Header 
        title="My Sessions" 
        subtitle="Manage your yoga bookings"
        showBackButton={true}
        onBack={() => navigate("/")}
      />
      
      <div className="px-6 py-8 space-y-6">
        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filterOption) => (
            <Button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              variant={filter === filterOption.id ? "primary" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              <ApperIcon name={filterOption.icon} size={16} className="mr-2" />
              {filterOption.label}
            </Button>
          ))}
        </div>

        {/* Sessions List */}
        {filteredBookings.length === 0 ? (
          <Empty
            title="No sessions found"
            description={
              filter === "upcoming" 
                ? "You don't have any upcoming sessions"
                : filter === "past"
                  ? "You haven't completed any sessions yet"
                  : "You haven't booked any sessions yet"
            }
            icon="Calendar"
            actionText="Book Your First Session"
            onAction={() => navigate("/book")}
          />
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.Id}
                booking={booking}
                onCancel={handleCancelBooking}
                onReschedule={handleRescheduleBooking}
              />
            ))}
          </div>
        )}

        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-8"
        >
          <Button
            onClick={() => navigate("/book")}
            size="lg"
            className="w-full sm:w-auto"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Book New Session
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MySessions;