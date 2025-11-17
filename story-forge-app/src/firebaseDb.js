import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqeUUKP0OGdyLRkSsIC3lwaDh8Fl3IZhE",
  authDomain: "story-forge-app.firebaseapp.com",
  projectId: "story-forge-app",
  storageBucket: "story-forge-app.firebasestorage.app",
  messagingSenderId: "934296970027",
  appId: "1:934296970027:web:e516253787e2a86aa2db6e",
  measurementId: "G-KJQT61S1HB"
};

// Initialize Firebase (reuse existing app or create new)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
