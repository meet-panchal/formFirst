const EARTH_RADIUS_METERS = 6_371_000;

export function distanceMeters(lat1, lon1, lat2, lon2) {
  const toRadians = value => value * Math.PI / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(Math.min(1, a)));
}

export function getCurrentPosition(options = {}) {
  if (!navigator.geolocation) {
    return Promise.reject(new DOMException('Geolocation is unavailable', 'NotSupportedError'));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12_000,
      maximumAge: 0,
      ...options
    });
  });
}
