import bookingsData from "@/services/mockData/bookings.json";

const mockBookings = [...bookingsData];

export const bookingService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBookings.map(booking => ({
      ...booking,
      createdAt: new Date(booking.createdAt).toISOString(),
      session: {
        ...booking.session,
        date: new Date(booking.session.date).toISOString()
      }
    }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const booking = mockBookings.find(b => b.Id === id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return {
      ...booking,
      createdAt: new Date(booking.createdAt).toISOString(),
      session: {
        ...booking.session,
        date: new Date(booking.session.date).toISOString()
      }
    };
  },

  create: async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newBooking = {
      ...bookingData,
      Id: Math.max(...mockBookings.map(b => b.Id)) + 1,
      createdAt: new Date(bookingData.createdAt).toISOString()
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  update: async (id, bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockBookings.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error("Booking not found");
    }
    const updatedBooking = {
      ...mockBookings[index],
      ...bookingData,
      createdAt: new Date(bookingData.createdAt).toISOString()
    };
    mockBookings[index] = updatedBooking;
    return updatedBooking;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockBookings.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error("Booking not found");
    }
    mockBookings.splice(index, 1);
    return true;
  }
};