const buildingBucket = 'building-images';

export const fallbackImage = 'https://source.unsplash.com/random/800x600';

export function getImageUrl(filename: string): string {
  return `http://localhost:9000/${buildingBucket}/${filename}`;
}

export function getImageUrlOrFallback(
  filename: string | null | undefined,
): string {
  if (filename !== null && filename !== undefined) {
    return getImageUrl(filename);
  }
  return fallbackImage;
}
