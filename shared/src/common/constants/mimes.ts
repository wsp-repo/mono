import mime from 'mime';

import { IMG_EXTENSIONS, DOC_EXTENSIONS, PDF_EXTENSIONS } from './extensions';

/* prettier-ignore */
function buildMimeArray(extensions: readonly string[]): string[] {
  return extensions
    .map((ext) => mime.getType(ext))
    .filter(Boolean) as string[];
}

export const IMG_MIME_TYPES = buildMimeArray(IMG_EXTENSIONS);
export const DOC_MIME_TYPES = buildMimeArray(DOC_EXTENSIONS);
export const PDF_MIME_TYPES = buildMimeArray(PDF_EXTENSIONS);

export const INLINE_MIME_TYPES = new Set<string>([
  ...DOC_MIME_TYPES,
  ...PDF_MIME_TYPES,
  ...IMG_MIME_TYPES,
]);
