import sessionsData from "@/services/mockData/sessions.json";

const mockSessions = [...sessionsData];

export const sessionService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSessions.map(session => ({
      ...session,
      date: new Date(session.date).toISOString()
    }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const session = mockSessions.find(s => s.Id === id);
    if (!session) {
      throw new Error("Session not found");
    }
    return {
      ...session,
      date: new Date(session.date).toISOString()
    };
  },

  create: async (sessionData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newSession = {
      ...sessionData,
      Id: Math.max(...mockSessions.map(s => s.Id)) + 1,
      date: new Date(sessionData.date).toISOString()
    };
    mockSessions.push(newSession);
    return newSession;
  },

  update: async (id, sessionData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSessions.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Session not found");
    }
    const updatedSession = {
      ...mockSessions[index],
      ...sessionData,
      date: new Date(sessionData.date).toISOString()
    };
    mockSessions[index] = updatedSession;
    return updatedSession;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockSessions.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Session not found");
    }
    mockSessions.splice(index, 1);
    return true;
  }
};