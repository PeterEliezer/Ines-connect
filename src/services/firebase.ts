// src/services/firebase.ts
// Firebase initialization for INES Connect
//
// NOTE: These values were provided directly. For production it's recommended
// to put them in environment variables (REACT_APP_*) and not commit secrets
// to the repo. The project .gitignore already ignores .env files.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDRADX3vb5QRpggF2gIiMTAWIsdXxuJTrI",
  authDomain: "ines-connect.firebaseapp.com",
  projectId: "ines-connect",
  storageBucket: "ines-connect.firebasestorage.app",
  messagingSenderId: "222870330173",
  appId: "1:222870330173:web:72ce1fd4c6b548d2f6c354",
  measurementId: "G-NMLN49CLYM"
};

const firebaseApp = initializeApp(firebaseConfig);

// getAnalytics() throws when run in some non-browser environments (e.g. SSR).
// Wrap in try/catch so the module can be imported safely in Node tooling.
let analytics;
try {
  analytics = getAnalytics(firebaseApp);
} catch (err) {
  // Analytics not available (e.g. running tests or SSR). Ignore silently.
  analytics = undefined;
}

export { firebaseApp, analytics };
export default firebaseApp;
