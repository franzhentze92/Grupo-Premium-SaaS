# Mapbox Setup Guide

This project now includes real satellite imagery using Mapbox GL JS. To get the map working, you need to obtain a free Mapbox API token.

## Getting a Mapbox API Token

### Step 1: Create a Mapbox Account
1. Go to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Click "Sign up" to create a free account
3. Verify your email address

### Step 2: Get Your Access Token
1. After signing in, you'll be taken to your account dashboard
2. Look for the "Default public token" or create a new one
3. Copy the token (it starts with `pk.`)

### Step 3: Update the Configuration
1. Open `src/config/mapboxConfig.ts`
2. Replace the placeholder token with your actual token:

```typescript
export const MAPBOX_CONFIG = {
  accessToken: 'pk.your_actual_token_here', // Replace with your token
  // ... rest of config
};
```

## Features Available

### Map Views
- **Satellite**: High-resolution satellite imagery
- **Terrain**: Topographic map with terrain features
- **Street**: Satellite imagery with street labels

### Interactive Features
- **Zoom Controls**: Zoom in/out and reset view
- **Navigation**: Pan and rotate the map
- **Fullscreen**: View map in fullscreen mode
- **Geolocation**: Find your current location
- **Project Markers**: Click markers to view project details
- **Popups**: Hover over markers for quick info

### Project Markers
- **Green**: Active projects
- **Blue**: Completed projects  
- **Yellow**: Planned projects
- **Selection**: Selected projects are highlighted with brand color

## Free Tier Limits

Mapbox offers a generous free tier:
- **50,000 map loads per month**
- **5,000 geocoding requests per month**
- **5,000 directions requests per month**

This should be more than sufficient for development and small to medium production use.

## Production Considerations

For production deployment:
1. Create a restricted token with only necessary scopes
2. Set up proper CORS settings
3. Monitor usage to stay within limits
4. Consider upgrading to a paid plan for higher limits

## Troubleshooting

### Map Not Loading
- Check that your API token is correct
- Ensure the token has the necessary scopes (public scopes for basic maps)
- Check browser console for error messages

### Markers Not Appearing
- Verify that project coordinates are valid
- Check that the map has loaded before adding markers
- Ensure CSS styles are properly loaded

### Performance Issues
- Reduce the number of markers if displaying many projects
- Use clustering for large datasets
- Optimize marker rendering for better performance

## Alternative Mapping Services

If you prefer other mapping services:
- **Google Maps**: More expensive but widely used
- **OpenStreetMap**: Free but requires more setup
- **Leaflet**: Lightweight alternative to Mapbox
- **Here Maps**: Good alternative with free tier

## Support

For Mapbox-specific issues:
- [Mapbox Documentation](https://docs.mapbox.com/)
- [Mapbox Support](https://support.mapbox.com/)
- [Mapbox Community](https://community.mapbox.com/) 