import { getFileExt } from './mimes';

import { INLINE_EXTENSIONS, INLINE_MIME_TYPES } from '../constants';

export function getHeaderDisposition(
  fileName: string,
  mimeType: string,
  force?: 'attachment' | 'inline',
): string {
  const fileNameEncoded = encodeURIComponent(fileName);

  const defaultAction =
    INLINE_MIME_TYPES.has(mimeType.toLowerCase()) ||
    INLINE_EXTENSIONS.has(getFileExt(fileName))
      ? 'inline'
      : 'attachment';

  const action = force || defaultAction;

  return `${action}; filename*=UTF-8''${fileNameEncoded}`;
}
