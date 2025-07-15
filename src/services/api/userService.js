import usersData from "@/services/mockData/users.json";

const mockUsers = [...usersData];

export const userService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.map(user => ({
      ...user,
      joinedDate: new Date(user.joinedDate).toISOString()
    }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = mockUsers.find(u => u.Id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      ...user,
      joinedDate: new Date(user.joinedDate).toISOString()
    };
  },

  create: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newUser = {
      ...userData,
      Id: Math.max(...mockUsers.map(u => u.Id)) + 1,
      joinedDate: new Date(userData.joinedDate).toISOString()
    };
    mockUsers.push(newUser);
    return newUser;
  },

  update: async (id, userData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockUsers.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...mockUsers[index],
      ...userData,
      joinedDate: new Date(userData.joinedDate).toISOString()
    };
    mockUsers[index] = updatedUser;
    return updatedUser;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockUsers.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    mockUsers.splice(index, 1);
    return true;
  }
};