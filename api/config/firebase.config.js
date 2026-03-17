const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

let serviceAccount = null;

// 1. Try to read from firebase-service-account.json in the root
const serviceAccountPath = path.join(__dirname, "../../firebase-service-account.json");

if (fs.existsSync(serviceAccountPath)) {
  try {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  } catch (e) {
    console.error("Error parsing firebase-service-account.json:", e.message);
  }
}

// 2. Fallback to FIREBASE_SERVICE_ACCOUNT environment variable
if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.warn("FIREBASE_SERVICE_ACCOUNT in .env is invalid JSON.");
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "tokotitoh-cd962.appspot.com",
  });
} else {
  console.error("Firebase Service Account not found. Please provide firebase-service-account.json or set FIREBASE_SERVICE_ACCOUNT in .env");
}

const bucket = serviceAccount ? admin.storage().bucket() : null;

module.exports = { bucket };
