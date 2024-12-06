export const getRandomCoordinates = (userLocation) => {
    const latitude = userLocation.latitude + Math.random() * 0.0004 - 0.0002;
    const longitude = userLocation.longitude + Math.random() * 0.0004 - 0.0002;

    return { latitude, longitude };
};