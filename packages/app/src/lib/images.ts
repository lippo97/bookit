import placeholderImage from '@/assets/image_placeholder.png';

export const fallbackImage = placeholderImage;

export function getLibraryImageUrlOrFallback(
  filename: string | null | undefined,
): string {
  if (filename !== null && filename !== undefined) {
    return filename;
  }
  return fallbackImage;
}
