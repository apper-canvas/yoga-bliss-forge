import packagesData from "@/services/mockData/packages.json";

const mockPackages = [...packagesData];

export const packageService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPackages.map(pkg => ({
      ...pkg,
      expiryDate: new Date(pkg.expiryDate).toISOString()
    }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const pkg = mockPackages.find(p => p.Id === id);
    if (!pkg) {
      throw new Error("Package not found");
    }
    return {
      ...pkg,
      expiryDate: new Date(pkg.expiryDate).toISOString()
    };
  },

  create: async (packageData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newPackage = {
      ...packageData,
      Id: Math.max(...mockPackages.map(p => p.Id)) + 1,
      expiryDate: new Date(packageData.expiryDate).toISOString()
    };
    mockPackages.push(newPackage);
    return newPackage;
  },

  update: async (id, packageData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockPackages.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Package not found");
    }
    const updatedPackage = {
      ...mockPackages[index],
      ...packageData,
      expiryDate: new Date(packageData.expiryDate).toISOString()
    };
    mockPackages[index] = updatedPackage;
    return updatedPackage;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockPackages.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Package not found");
    }
    mockPackages.splice(index, 1);
    return true;
  }
};