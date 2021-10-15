import { S3_URL } from '@/config';
import placeholderImage from '@/assets/image_placeholder.png';

const libraryBucket = 'library-images';

export const fallbackImage = placeholderImage;
// export const fallbackImage = 'https://source.unsplash.com/random/800x600';

function getImageUrl(bucket: string, filename: string): string {
  return `${S3_URL}/${bucket}/${filename}`;
}

export function getLibraryImageUrlOrFallback(
  filename: string | null | undefined,
): string {
  if (filename !== null && filename !== undefined) {
    return getImageUrl(libraryBucket, filename);
  }
  return fallbackImage;
}
