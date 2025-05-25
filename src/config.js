// src/config.js
import dotenv from 'dotenv';

// Load .env file in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const GOOGLE_MAPS_API_KEY =
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  import.meta.env?.VITE_GOOGLE_MAPS_API_KEY ||
  ''; // Fallback to empty string