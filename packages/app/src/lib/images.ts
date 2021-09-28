import { S3_URL } from '@/config';
import placeholderImage from '@/assets/image_placeholder.png';

const libraryBucket = 'library-images';

export const fallbackImage = placeholderImage;
// export const fallbackImage = 'https://source.unsplash.com/random/800x600';

export function getImageUrl(filename: string): string {
  return `${S3_URL}/${libraryBucket}/${filename}`;
}

export function getImageUrlOrFallback(
  filename: string | null | undefined,
): string {
  if (filename !== null && filename !== undefined) {
    return filename;
    // return getImageUrl(filename);
  }
  return fallbackImage;
}
