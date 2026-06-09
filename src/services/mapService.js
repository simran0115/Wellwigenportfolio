/**
 * Map Service
 * Provides dummy location data and static map visualizations
 */

const HOSPITAL_LOCATION = {
  lat: 28.6139,
  lng: 77.2090,
  address: "Sansad Marg, Janpath, Connaught Place, New Delhi, Delhi 110001",
  name: "Wellwigen General Hospital"
};

/**
 * Fetches the current hospital location data
 */
export const getHospitalLocation = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(HOSPITAL_LOCATION);
    }, 500);
  });
};

/**
 * Generates a static map URL based on coordinates
 */
export const getStaticMapUrl = (lat, lng, zoom = 15) => {
  // Using Yandex Static Maps API for a real, interactive map look without requiring a complex key for this demo
  // This provides the classic "Google Maps" street/roadmap style
  return `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=${zoom}&l=map&size=650,450`;
};

/**
 * Generates a link to Google Maps
 */
export const getGoogleMapsLink = (lat, lng) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};
