export const IMG_EXTENSIONS = [
  'bmp',
  'gif',
  'ico',
  'jpeg',
  'jpg',
  'png',
  'svg',
  'tiff',
  'tif',
  'webp',
] as const;
export const DOC_EXTENSIONS = ['doc', 'docx'] as const;
export const PDF_EXTENSIONS = ['pdf'] as const;

export const INLINE_EXTENSIONS = new Set<string>([
  ...IMG_EXTENSIONS,
  ...DOC_EXTENSIONS,
  ...PDF_EXTENSIONS,
]);
