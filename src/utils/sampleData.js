// Sample blood camp data for testing
export const sampleBloodCamps = [
  {
    campName: "Community Blood Drive - Downtown",
    organizer: "Red Cross Society",
    location: "Community Center, Downtown",
    district: "Downtown",
    state: "California",
    campDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    campTime: "9:00 AM - 5:00 PM",
    description: "Annual community blood drive. All blood types welcome. Refreshments provided.",
    nearbyDistricts: ["University Area", "Westside"],
    isActive: true
  },
  {
    campName: "University Blood Camp",
    organizer: "Medical Students Association",
    location: "University Medical Center",
    district: "University Area",
    state: "California",
    campDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    campTime: "10:00 AM - 4:00 PM",
    description: "Student-organized blood donation camp. Free health checkup included.",
    nearbyDistricts: ["Downtown", "Westside"],
    isActive: true
  },
  {
    campName: "Corporate Blood Drive",
    organizer: "TechCorp Industries",
    location: "TechCorp Campus",
    district: "Westside",
    state: "California",
    campDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    campTime: "8:00 AM - 6:00 PM",
    description: "Employee blood donation drive. Open to public. Parking available.",
    nearbyDistricts: ["Downtown", "University Area"],
    isActive: true
  }
];

// Function to create sample blood camps in Firestore
export const createSampleBloodCamps = async (createBloodCamp) => {
  try {
    for (const camp of sampleBloodCamps) {
      await createBloodCamp(camp);
    }
    console.log("Sample blood camps created successfully");
    return true;
  } catch (error) {
    console.error("Error creating sample blood camps:", error);
    return false;
  }
};
