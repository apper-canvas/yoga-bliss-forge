import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import StatCard from "@/components/molecules/StatCard";
import BookingCard from "@/components/molecules/BookingCard";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { bookingService } from "@/services/api/bookingService";

const Home = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const upcomingBookings = bookings.filter(b => 
    new Date(b.session.date) > new Date()
  ).slice(0, 3);

  const stats = {
    totalBookings: bookings.length,
    upcomingBookings: upcomingBookings.length,
    totalSpent: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
    thisMonth: bookings.filter(b => {
      const bookingDate = new Date(b.createdAt);
      const now = new Date();
      return bookingDate.getMonth() === now.getMonth() && 
             bookingDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Yoga Bliss" 
        subtitle="Find your inner peace through yoga"
      />
      
      <div className="px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">
            Welcome Back, Namaste! 🙏
          </h2>
          <p className="text-gray-600 mb-6">
            Ready to continue your yoga journey?
          </p>
          
<Button 
            onClick={() => navigate("/book")}
            size="lg"
            className="w-full sm:w-auto"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Book New Session
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Sessions"
            value={stats.totalBookings}
            icon="Calendar"
            color="primary"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcomingBookings}
            icon="Clock"
            color="secondary"
          />
          <StatCard
            title="Total Spent"
            value={`$${stats.totalSpent}`}
            icon="DollarSign"
            color="accent"
          />
          <StatCard
            title="This Month"
            value={stats.thisMonth}
            icon="TrendingUp"
            color="success"
          />
        </div>

        {/* Upcoming Sessions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-semibold text-gray-800">
              Upcoming Sessions
            </h3>
            <Button 
              onClick={() => navigate("/my-sessions")}
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </div>
          
          {upcomingBookings.length === 0 ? (
            <Empty
              title="No upcoming sessions"
              description="Book your next yoga session to start your wellness journey"
              icon="Calendar"
              actionText="Book Session"
              onAction={() => navigate("/book")}
            />
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.Id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  onReschedule={handleRescheduleBooking}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => navigate("/book")}
              variant="primary"
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <ApperIcon name="Calendar" size={24} />
              <span>Book Session</span>
            </Button>
            <Button
              onClick={() => navigate("/my-sessions")}
              variant="secondary"
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <ApperIcon name="User" size={24} />
              <span>My Sessions</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;