// Firebase Storage utilities for media files
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

/**
 * Upload an image file to Firebase Storage
 * @param file - The image file to upload
 * @param path - Storage path (e.g., "projects/project-1.jpg")
 * @returns Promise with the download URL
 */
export const uploadImage = async (
  file: File,
  path: string
): Promise<string> => {
  if (!storage) {
    throw new Error("Firebase Storage not initialized");
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5MB");
  }

  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

/**
 * Upload a base64 image to Firebase Storage
 * @param base64String - Base64 data URL (e.g., "data:image/png;base64,...")
 * @param path - Storage path (e.g., "projects/project-1.jpg")
 * @returns Promise with the download URL
 */
export const uploadBase64Image = async (
  base64String: string,
  path: string
): Promise<string> => {
  if (!storage) {
    throw new Error("Firebase Storage not initialized");
  }

  try {
    // Convert base64 to blob
    const response = await fetch(base64String);
    const blob = await response.blob();
    
    // Determine file extension from base64 string
    const matches = base64String.match(/data:image\/([a-zA-Z]*);base64,/);
    const extension = matches ? matches[1] : "jpg";
    const fullPath = path.endsWith(`.${extension}`) ? path : `${path}.${extension}`;

    const storageRef = ref(storage, fullPath);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading base64 image:", error);
    throw error;
  }
};

/**
 * Delete an image from Firebase Storage
 * @param path - Storage path of the file to delete
 */
export const deleteImage = async (path: string): Promise<void> => {
  if (!storage) {
    throw new Error("Firebase Storage not initialized");
  }

  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

/**
 * Generate a unique path for a project image
 * @param projectId - The project ID
 * @param filename - Original filename (optional)
 * @returns Storage path
 */
export const getProjectImagePath = (projectId: number, filename?: string): string => {
  const extension = filename?.split(".").pop() || "jpg";
  return `projects/${projectId}/image.${extension}`;
};

/**
 * Extract Firebase Storage path from a download URL
 * @param url - Firebase Storage download URL
 * @returns Storage path or null if not a Firebase Storage URL
 */
export const getStoragePathFromUrl = (url: string): string | null => {
  try {
    // Firebase Storage URLs have a specific pattern
    // Example: https://firebasestorage.googleapis.com/v0/b/project.appspot.com/o/projects%2F123%2Fimage.jpg?alt=media&token=...
    const match = url.match(/\/o\/([^?]+)/);
    if (match) {
      return decodeURIComponent(match[1]);
    }
    return null;
  } catch (error) {
    console.error("Error extracting storage path from URL:", error);
    return null;
  }
};

/**
 * Delete old project image if it exists in Firebase Storage
 * @param oldImageUrl - The old image URL (Firebase Storage URL)
 */
export const deleteOldProjectImage = async (oldImageUrl: string | null | undefined): Promise<void> => {
  if (!oldImageUrl || !storage) return;
  
  // Only delete if it's a Firebase Storage URL
  if (!oldImageUrl.startsWith("https://")) return;
  
  try {
    const storagePath = getStoragePathFromUrl(oldImageUrl);
    if (storagePath) {
      await deleteImage(storagePath);
      console.log("Deleted old image from storage:", storagePath);
    }
  } catch (error) {
    // Don't throw - it's okay if the old image doesn't exist
    console.warn("Could not delete old image (may not exist):", error);
  }
};

