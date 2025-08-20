// Firebase Admin SDK for server-side operations
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin (this would typically be on a server)
const serviceAccount = {
  type: "service_account",
  project_id: "ecolife-app",
  private_key_id: "your-private-key-id",
  private_key: "your-private-key",
  client_email: "firebase-adminsdk-xxxxx@ecolife-app.iam.gserviceaccount.com",
  client_id: "your-client-id",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40ecolife-app.iam.gserviceaccount.com",
};

// Initialize Firebase Admin
const adminApp = initializeApp({
  credential: cert(serviceAccount),
});

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);

// Cloud function to set custom claims
export const setUserRole = async (uid, role) => {
  try {
    await adminAuth.setCustomUserClaims(uid, { role });
    return { success: true };
  } catch (error) {
    console.error("Error setting custom claims:", error);
    return { success: false, error: error.message };
  }
};

// Cloud function to get user role
export const getUserRole = async (uid) => {
  try {
    const user = await adminAuth.getUser(uid);
    return user.customClaims?.role || "user";
  } catch (error) {
    console.error("Error getting user role:", error);
    return "user";
  }
};

export default adminApp;
