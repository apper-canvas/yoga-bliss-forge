import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import StatCard from "@/components/molecules/StatCard";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { userService } from "@/services/api/userService";
import { bookingService } from "@/services/api/bookingService";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    preferredType: "studio"
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [userData, bookingsData] = await Promise.all([
        userService.getById(1), // Current user
        bookingService.getAll()
      ]);
      setUser(userData);
      setBookings(bookingsData);
      setFormData(userData);
    } catch (err) {
      setError(err.message || "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = await userService.update(1, formData);
      setUser(updatedUser);
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setEditing(false);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const stats = {
    totalSessions: bookings.length,
    completedSessions: bookings.filter(b => new Date(b.session.date) <= new Date()).length,
    upcomingSessions: bookings.filter(b => new Date(b.session.date) > new Date()).length,
    totalSpent: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
    favoriteType: bookings.reduce((acc, b) => {
      acc[b.session.type] = (acc[b.session.type] || 0) + 1;
      return acc;
    }, {})
  };

  const favoriteSessionType = Object.keys(stats.favoriteType).reduce((a, b) => 
    stats.favoriteType[a] > stats.favoriteType[b] ? a : b, "studio"
  );

  return (
    <div className="min-h-screen">
      <Header 
        title="Profile" 
        subtitle="Manage your account and preferences"
        showBackButton={true}
        onBack={() => navigate("/")}
      />
      
      <div className="px-6 py-8 space-y-8">
        {/* Profile Card */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <Button
              onClick={() => setEditing(!editing)}
              variant="outline"
              size="sm"
            >
              <ApperIcon name={editing ? "X" : "Edit"} size={16} className="mr-2" />
              {editing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {editing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <FormField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <FormField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <FormField
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <FormField
                label="Age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Session Type
                </label>
                <select
                  value={formData.preferredType}
                  onChange={(e) => setFormData({...formData, preferredType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="studio">Studio Classes</option>
                  <option value="personal">Personal Training</option>
                </select>
              </div>
              
              <div className="flex space-x-4">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <ApperIcon name="Phone" size={16} className="text-gray-500" />
                <span className="text-gray-700">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Calendar" size={16} className="text-gray-500" />
                <span className="text-gray-700">{user.age} years old</span>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Heart" size={16} className="text-gray-500" />
                <span className="text-gray-700">
                  Prefers {user.preferredType === "studio" ? "Studio Classes" : "Personal Training"}
                </span>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Stats Grid */}
        <div>
          <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
            Your Yoga Journey
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Sessions"
              value={stats.totalSessions}
              icon="Calendar"
              color="primary"
            />
            <StatCard
              title="Completed"
              value={stats.completedSessions}
              icon="CheckCircle"
              color="success"
            />
            <StatCard
              title="Upcoming"
              value={stats.upcomingSessions}
              icon="Clock"
              color="secondary"
            />
            <StatCard
              title="Total Spent"
              value={`$${stats.totalSpent}`}
              icon="DollarSign"
              color="accent"
            />
          </div>
        </div>

        {/* Preferences */}
        <Card>
          <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
            Preferences & Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Bell" size={20} className="text-gray-500" />
                <span className="text-gray-700">Email Notifications</span>
              </div>
              <div className="w-12 h-6 bg-primary-500 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ApperIcon name="MessageCircle" size={20} className="text-gray-500" />
                <span className="text-gray-700">SMS Reminders</span>
              </div>
              <div className="w-12 h-6 bg-primary-500 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Heart" size={20} className="text-gray-500" />
                <span className="text-gray-700">Favorite Session Type</span>
              </div>
              <span className="text-sm text-primary-600 font-medium">
                {favoriteSessionType === "studio" ? "Studio Classes" : "Personal Training"}
              </span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate("/book")}
            variant="primary"
            className="flex flex-col items-center space-y-2 h-auto py-6"
          >
            <ApperIcon name="Plus" size={24} />
            <span>Book Session</span>
          </Button>
          <Button
            onClick={() => navigate("/my-sessions")}
            variant="secondary"
            className="flex flex-col items-center space-y-2 h-auto py-6"
          >
            <ApperIcon name="Calendar" size={24} />
            <span>View Sessions</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;