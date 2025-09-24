import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// Collection name for users
const USERS_COLLECTION = "users";

/**
 * Create a new user document in Firestore
 * @param {string} userId - The user's UID from Firebase Auth
 * @param {Object} userData - User data to store
 * @returns {Promise<boolean>} - Success status
 */
export const createUserDocument = async (userId, userData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    
    const userDoc = {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: null,
      isActive: true
    };

    await setDoc(userRef, userDoc);
    console.log("User document created successfully");
    return true;
  } catch (error) {
    console.error("Error creating user document:", error);
    return false;
  }
};

/**
 * Get user document from Firestore
 * @param {string} userId - The user's UID
 * @returns {Promise<Object|null>} - User data or null if not found
 */
export const getUserDocument = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      console.log("No user document found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user document:", error);
    return null;
  }
};

/**
 * Update user document in Firestore
 * @param {string} userId - The user's UID
 * @param {Object} updateData - Data to update
 * @returns {Promise<boolean>} - Success status
 */
export const updateUserDocument = async (userId, updateData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    
    const updatePayload = {
      ...updateData,
      updatedAt: serverTimestamp()
    };

    await updateDoc(userRef, updatePayload);
    console.log("User document updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating user document:", error);
    return false;
  }
};

/**
 * Update user's last login timestamp
 * @param {string} userId - The user's UID
 * @returns {Promise<boolean>} - Success status
 */
export const updateLastLogin = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating last login:", error);
    return false;
  }
};

/**
 * Check if email already exists in Firestore
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} - True if email exists
 */
export const checkEmailExists = async (email) => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};

/**
 * Check if phone number already exists in Firestore
 * @param {string} phone - Phone number to check
 * @returns {Promise<boolean>} - True if phone exists
 */
export const checkPhoneExists = async (phone) => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("phone", "==", phone));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking phone existence:", error);
    return false;
  }
};

/**
 * Delete user document from Firestore
 * @param {string} userId - The user's UID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteUserDocument = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await deleteDoc(userRef);
    console.log("User document deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting user document:", error);
    return false;
  }
};

/**
 * Get user by email
 * @param {string} email - Email to search for
 * @returns {Promise<Object|null>} - User data or null if not found
 */
export const getUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

/**
 * Get user by phone number
 * @param {string} phone - Phone number to search for
 * @returns {Promise<Object|null>} - User data or null if not found
 */
export const getUserByPhone = async (phone) => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where("phone", "==", phone));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user by phone:", error);
    return null;
  }
};

// Blood Donation Collections
const DONATIONS_COLLECTION = "donations";
const BLOOD_CAMPS_COLLECTION = "bloodCamps";
const BLOOD_REQUESTS_COLLECTION = "bloodRequests";

/**
 * Record a blood donation
 * @param {string} userId - The user's UID
 * @param {Object} donationData - Donation details
 * @returns {Promise<boolean>} - Success status
 */
export const recordBloodDonation = async (userId, donationData) => {
  try {
    const donationRef = doc(collection(db, DONATIONS_COLLECTION));
    
    const donationDoc = {
      userId,
      ...donationData,
      donationDate: serverTimestamp(),
      createdAt: serverTimestamp()
    };

    await setDoc(donationRef, donationDoc);
    
    // Update user's last donation date
    await updateUserDocument(userId, {
      lastDonationDate: serverTimestamp(),
      totalDonations: (donationData.previousDonations || 0) + 1
    });
    
    console.log("Blood donation recorded successfully");
    return true;
  } catch (error) {
    console.error("Error recording blood donation:", error);
    return false;
  }
};

/**
 * Get user's donation history
 * @param {string} userId - The user's UID
 * @returns {Promise<Array>} - Array of donations
 */
export const getUserDonationHistory = async (userId) => {
  try {
    const donationsRef = collection(db, DONATIONS_COLLECTION);
    const q = query(donationsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const donations = [];
    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() });
    });
    
    return donations.sort((a, b) => b.donationDate - a.donationDate);
  } catch (error) {
    console.error("Error getting donation history:", error);
    return [];
  }
};

/**
 * Check if user can donate based on last donation
 * @param {string} userId - The user's UID
 * @returns {Promise<Object>} - Can donate status and days remaining
 */
export const checkDonationEligibility = async (userId) => {
  try {
    const userDoc = await getUserDocument(userId);
    if (!userDoc || !userDoc.lastDonationDate) {
      return { canDonate: true, daysRemaining: 0, message: "No previous donations found" };
    }

    const lastDonation = userDoc.lastDonationDate.toDate();
    const now = new Date();
    const daysSinceLastDonation = Math.floor((now - lastDonation) / (1000 * 60 * 60 * 24));
    const requiredDays = 56; // 8 weeks minimum between donations
    
    if (daysSinceLastDonation >= requiredDays) {
      return { canDonate: true, daysRemaining: 0, message: "Eligible to donate" };
    } else {
      const daysRemaining = requiredDays - daysSinceLastDonation;
      return { 
        canDonate: false, 
        daysRemaining, 
        message: `Please wait ${daysRemaining} more days before donating again`,
        lastDonationDate: lastDonation
      };
    }
  } catch (error) {
    console.error("Error checking donation eligibility:", error);
    return { canDonate: false, daysRemaining: 0, message: "Error checking eligibility" };
  }
};

/**
 * Get blood camps near user location
 * @param {string} state - User's state
 * @param {string} district - User's district
 * @returns {Promise<Array>} - Array of nearby blood camps
 */
export const getNearbyBloodCamps = async (state, district) => {
  try {
    const campsRef = collection(db, BLOOD_CAMPS_COLLECTION);
    const q = query(
      campsRef, 
      where("state", "==", state),
      where("isActive", "==", true)
    );
    const querySnapshot = await getDocs(q);
    
    const camps = [];
    querySnapshot.forEach((doc) => {
      const campData = { id: doc.id, ...doc.data() };
      // Check if camp is in the same district or nearby
      if (campData.district === district || campData.nearbyDistricts?.includes(district)) {
        camps.push(campData);
      }
    });
    
    return camps.sort((a, b) => a.campDate - b.campDate);
  } catch (error) {
    console.error("Error getting nearby blood camps:", error);
    return [];
  }
};

/**
 * Create a blood camp
 * @param {Object} campData - Camp details
 * @returns {Promise<boolean>} - Success status
 */
export const createBloodCamp = async (campData) => {
  try {
    const campRef = doc(collection(db, BLOOD_CAMPS_COLLECTION));
    
    const campDoc = {
      ...campData,
      createdAt: serverTimestamp(),
      isActive: true
    };

    await setDoc(campRef, campDoc);
    console.log("Blood camp created successfully");
    return true;
  } catch (error) {
    console.error("Error creating blood camp:", error);
    return false;
  }
};

// Donor Registration Collection
const DONOR_REGISTRATIONS_COLLECTION = "donorRegistrations";

/**
 * Record a donor registration
 * @param {string} userId - The user's UID
 * @param {Object} registrationData - Registration details
 * @returns {Promise<boolean>} - Success status
 */
export const recordDonorRegistration = async (userId, registrationData) => {
  try {
    const registrationRef = doc(collection(db, DONOR_REGISTRATIONS_COLLECTION));
    
    const registrationDoc = {
      userId,
      ...registrationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(registrationRef, registrationDoc);
    
    // Update user's registration status
    await updateUserDocument(userId, {
      isRegisteredDonor: true,
      donorRegistrationDate: serverTimestamp(),
      donorStatus: 'registered',
      hasSuccessfullyDonated: false
    });
    
    console.log("Donor registration recorded successfully");
    return true;
  } catch (error) {
    console.error("Error recording donor registration:", error);
    return false;
  }
};

/**
 * Get donor registration by user ID
 * @param {string} userId - The user's UID
 * @returns {Promise<Object|null>} - Registration data or null if not found
 */
export const getDonorRegistration = async (userId) => {
  try {
    const registrationsRef = collection(db, DONOR_REGISTRATIONS_COLLECTION);
    const q = query(registrationsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const registrationDoc = querySnapshot.docs[0];
      return { id: registrationDoc.id, ...registrationDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting donor registration:", error);
    return null;
  }
};

/**
 * Cancel donor registration
 * @param {string} userId - The user's UID
 * @returns {Promise<boolean>} - Success status
 */
export const cancelDonorRegistration = async (userId) => {
  try {
    // Update user profile to remove registration status
    await updateUserDocument(userId, {
      isRegisteredDonor: false,
      donorRegistrationDate: null,
      donorStatus: null,
      hasSuccessfullyDonated: false
    });

    // Update the latest donor registration record status
    const registrationsRef = collection(db, DONOR_REGISTRATIONS_COLLECTION);
    const q = query(registrationsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const registrationDoc = querySnapshot.docs[0];
      await updateDoc(registrationDoc.ref, {
        status: 'cancelled',
        cancelledAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    return true;
  } catch (error) {
    console.error("Error cancelling donor registration:", error);
    return false;
  }
};

/**
 * Create a blood request
 * @param {string} userId - The user's UID
 * @param {Object} requestData - Request details
 * @returns {Promise<boolean>} - Success status
 */
export const createBloodRequest = async (userId, requestData) => {
  try {
    const requestRef = doc(collection(db, BLOOD_REQUESTS_COLLECTION));
    
    const requestDoc = {
      userId,
      ...requestData,
      status: 'active', // active, fulfilled, cancelled
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(requestRef, requestDoc);
    
    console.log("Blood request created successfully");
    return requestRef.id;
  } catch (error) {
    console.error("Error creating blood request:", error);
    return null;
  }
};

/**
 * Find available donors for a blood request
 * @param {string} bloodType - Required blood type
 * @param {string} pincode - Location pincode
 * @returns {Promise<Array>} - Array of available donors
 */
export const findAvailableDonors = async (bloodType, pincode) => {
  try {
    const normalizedRequestedBloodType = (bloodType || "").replace(/\s+/g, "").toUpperCase();
    const normalizedRequestedPincode = String(pincode || "").trim();
    // Get all registered donors
    const registrationsRef = collection(db, DONOR_REGISTRATIONS_COLLECTION);
    const q = query(
      registrationsRef, 
      where("status", "==", "registered")
    );
    
    const querySnapshot = await getDocs(q);
    const donors = [];
    
    for (const docSnapshot of querySnapshot.docs) {
      const registrationData = docSnapshot.data();
      
      // Normalize stored blood group and pincode
      const normalizedRegistrationBloodType = (registrationData.bloodGroup || "").replace(/\s+/g, "").toUpperCase();
      const normalizedRegistrationPincode = String(registrationData.location?.pincode || "").trim();

      // Filter by blood type match and same pincode
      if (
        normalizedRegistrationBloodType === normalizedRequestedBloodType &&
        normalizedRegistrationPincode === normalizedRequestedPincode
      ) {
        // Get user details
        const userDoc = await getUserDocument(registrationData.userId);
        if (userDoc) {
          // Respect donor consent to be contacted for requests if available
          const consentFromRegistration = registrationData.consentBloodRequests;
          const consentFromProfile = userDoc.consentBloodRequests;
          const hasConsent = consentFromRegistration === true || consentFromProfile === true;
          if (!hasConsent) {
            continue;
          }
          // Calculate age from date of birth
          let age = 'N/A';
          if (userDoc.dob || userDoc.dateOfBirth) {
            const birthDate = new Date(userDoc.dob || userDoc.dateOfBirth);
            const today = new Date();
            age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
          }
          
          donors.push({
            id: docSnapshot.id,
            userId: registrationData.userId,
            donorName: registrationData.donorName,
            phone: registrationData.phone,
            bloodGroup: registrationData.bloodGroup,
            location: registrationData.location,
            registrationDate: registrationData.registrationDate,
            age: age,
            userData: userDoc
          });
        }
      }
    }
    
    return donors;
  } catch (error) {
    console.error("Error finding available donors:", error);
    return [];
  }
};

/**
 * Get blood requests by user
 * @param {string} userId - The user's UID
 * @returns {Promise<Array>} - Array of blood requests
 */
export const getUserBloodRequests = async (userId) => {
  try {
    const requestsRef = collection(db, BLOOD_REQUESTS_COLLECTION);
    // Avoid composite index requirement by filtering only, then sorting client-side
    const q = query(requestsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const requests = [];
    
    querySnapshot.forEach((doc) => {
      requests.push({
        id: doc.id,
        ...doc.data()
      });
    });
    // Sort by createdAt desc (support Firestore Timestamp or JS Date/string)
    requests.sort((a, b) => {
      const getMs = (v) => {
        if (!v) return 0;
        if (v.seconds) return v.seconds * 1000 + (v.nanoseconds ? v.nanoseconds / 1e6 : 0);
        const d = new Date(v);
        return isNaN(d.getTime()) ? 0 : d.getTime();
      };
      return getMs(b.createdAt) - getMs(a.createdAt);
    });

    return requests;
  } catch (error) {
    console.error("Error getting user blood requests:", error);
    return [];
  }
};

/**
 * Get a single blood request by ID
 * @param {string} requestId - Request document ID
 * @returns {Promise<Object|null>} - Request data or null
 */
export const getBloodRequestById = async (requestId) => {
  try {
    const ref = doc(db, BLOOD_REQUESTS_COLLECTION, requestId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (error) {
    console.error("Error getting blood request:", error);
    return null;
  }
};

/**
 * Update blood request status
 * @param {string} requestId - Request document ID
 * @param {string} status - New status
 * @returns {Promise<boolean>} - Success status
 */
export const updateBloodRequestStatus = async (requestId, status) => {
  try {
    const requestRef = doc(db, BLOOD_REQUESTS_COLLECTION, requestId);
    await updateDoc(requestRef, {
      status,
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error("Error updating blood request status:", error);
    return false;
  }
};

/**
 * Delete a blood request permanently
 * @param {string} requestId - Request document ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteBloodRequest = async (requestId) => {
  try {
    const requestRef = doc(db, BLOOD_REQUESTS_COLLECTION, requestId);
    await deleteDoc(requestRef);
    return true;
  } catch (error) {
    console.error("Error deleting blood request:", error);
    return false;
  }
};

