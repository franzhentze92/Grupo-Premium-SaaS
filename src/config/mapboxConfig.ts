// Mapbox configuration
// You'll need to get a free API token from https://account.mapbox.com/
// For development, you can use a public token, but for production, use a restricted token

export const MAPBOX_CONFIG = {
  // IMPORTANT: Replace this with your own Mapbox token
  // Get a free token at: https://account.mapbox.com/
  // This is a placeholder - you need to sign up and get your own token
  accessToken: 'pk.eyJ1IjoiaGVudHplZnJhbno5MiIsImEiOiJja3RvdmN2b2QwZ211MzFxNXd2Y2luYzI3In0.uK8MrqFXnTkB4Oprqife9w', // Your Mapbox token
  
  // Default map style (satellite)
  defaultStyle: 'mapbox://styles/mapbox/satellite-v9',
  
  // Alternative styles
  styles: {
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v12',
    streets: 'mapbox://styles/mapbox/streets-v12',
    outdoors: 'mapbox://styles/mapbox/outdoors-v12',
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11',
    navigation: 'mapbox://styles/mapbox/navigation-day-v1',
    navigationNight: 'mapbox://styles/mapbox/navigation-night-v1'
  },
  
  // Default center (Guatemala City)
  defaultCenter: {
    lng: -90.5133,
    lat: 14.6349
  },
  
  // Default zoom level
  defaultZoom: 10,
  
  // Min and max zoom levels
  minZoom: 5,
  maxZoom: 18
};

// QUICK SETUP INSTRUCTIONS:
// 1. Go to https://account.mapbox.com/
// 2. Click "Sign up" (it's free)
// 3. After signing up, copy your default public token
// 4. Replace the accessToken above with your token
// 5. Restart your development server: npm run dev

// Instructions for getting a Mapbox token:
// 1. Go to https://account.mapbox.com/
// 2. Sign up for a free account
// 3. Create a new token or use the default public token
// 4. Replace the accessToken above with your actual token
// 5. For production, create a restricted token with only the necessary scopes 