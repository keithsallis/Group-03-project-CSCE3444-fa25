import { collection, addDoc, getDocs, query, deleteDoc, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * Save a story to Firestore under the user's document
 * @param {string} userId - Firebase user ID
 * @param {object} storyData - { id, title, content, inputs, createdAt, updatedAt }
 * @returns {Promise<string>} Firestore document ID
 */
export const saveStory = async (userId, storyData) => {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "stories"), {
      ...storyData,
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving story:", error);
    throw error;
  }
};

/**
 * Update an existing story in Firestore
 * @param {string} userId - Firebase user ID
 * @param {string} storyId - Firestore story document ID
 * @param {object} updates - Fields to update (e.g., { content, title })
 * @returns {Promise<void>}
 */
export const updateStory = async (userId, storyId, updates) => {
  try {
    const storyRef = doc(db, "users", userId, "stories", storyId);
    await updateDoc(storyRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating story:", error);
    throw error;
  }
};

/**
 * Load all stories for a user from Firestore
 * @param {string} userId - Firebase user ID
 * @returns {Promise<array>} Array of story objects with firestoreId field
 */
export const loadUserStories = async (userId) => {
  try {
    const q = query(collection(db, "users", userId, "stories"));
    const querySnapshot = await getDocs(q);
    
    const stories = [];
    querySnapshot.forEach((doc) => {
      stories.push({
        firestoreId: doc.id, // Firestore document ID
        ...doc.data(),
      });
    });
    
    // Sort by updatedAt descending (most recent first)
    stories.sort((a, b) => (b.updatedAt?.toMillis?.() || 0) - (a.updatedAt?.toMillis?.() || 0));
    return stories;
  } catch (error) {
    console.error("Error loading stories:", error);
    throw error;
  }
};

/**
 * Delete a story from Firestore
 * @param {string} userId - Firebase user ID
 * @param {string} storyId - Firestore story document ID
 * @returns {Promise<void>}
 */
export const deleteStory = async (userId, storyId) => {
  try {
    const storyRef = doc(db, "users", userId, "stories", storyId);
    await deleteDoc(storyRef);
  } catch (error) {
    console.error("Error deleting story:", error);
    throw error;
  }
};

/**
 * Generate a unique 6-character alphanumeric code
 * @returns {string} 6-character code
 */
const generateShareCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Check if a share code already exists
 * @param {string} code - The share code to check
 * @returns {Promise<boolean>} True if code exists
 */
const checkCodeExists = async (code) => {
  try {
    const docRef = doc(db, "sharedStories", code);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking code:", error);
    return false;
  }
};

/**
 * Share a story and generate a unique code
 * @param {object} storyData - The story to share
 * @returns {Promise<string>} The generated share code
 */
export const shareStory = async (storyData) => {
  try {
    let code = generateShareCode();
    let attempts = 0;
    
    // Ensure unique code (max 10 attempts)
    while (await checkCodeExists(code) && attempts < 10) {
      code = generateShareCode();
      attempts++;
    }
    
    if (attempts >= 10) {
      throw new Error("Failed to generate unique code. Please try again.");
    }
    
    // Save story with the code as document ID
    await setDoc(doc(db, "sharedStories", code), {
      ...storyData,
      sharedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days expiration
    });
    
    return code;
  } catch (error) {
    console.error("Error sharing story:", error);
    throw error;
  }
};

/**
 * Import a story using a share code
 * @param {string} code - The 6-character share code
 * @returns {Promise<object>} The shared story data
 */
export const importStory = async (code) => {
  try {
    const docRef = doc(db, "sharedStories", code.toUpperCase());
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("Invalid code. Story not found.");
    }
    
    const storyData = docSnap.data();
    
    // Check if story has expired
    if (storyData.expiresAt && storyData.expiresAt.toDate() < new Date()) {
      throw new Error("This shared story has expired.");
    }
    
    return storyData;
  } catch (error) {
    console.error("Error importing story:", error);
    throw error;
  }
};
