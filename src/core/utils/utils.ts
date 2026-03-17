import { envs } from "src/config/envs"

export const generateMapboxImage = (
  foundLat: number,
  foundLon: number,
  lostLat: number,
  lostLon: number
): string => {

  const accessToken = envs.MAPBOX_TOKEN;

  const centerLat = (foundLat + lostLat) / 2;
  const centerLon = (foundLon + lostLon) / 2;

  const zoom = 14;

  const width = 800;
  const height = 400;

  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+00ff00(${foundLon},${foundLat}),pin-s-l+ff0000(${lostLon},${lostLat})/${centerLon},${centerLat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};