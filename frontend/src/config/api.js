const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_ENDPOINTS = {
  DONATE: `${API_BASE_URL}/api/donate`,
  STATE_DISTRICT: `${API_BASE_URL}/api/location`,
};

export const ERAKTKOSH_API = {
  NEARBY_BLOOD_BANKS: import.meta.env.VITE_ERAKTKOSH_URL,
  BLOOD_STOCK: import.meta.env.VITE_ERAKTKOSH_URL,
};

export default API_BASE_URL;
