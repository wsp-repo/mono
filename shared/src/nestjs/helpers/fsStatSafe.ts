/* eslint-disable @typescript-eslint/no-unused-vars */

import { Stats, statSync } from 'fs';

/**
 * Безопасный аналог fs.statSync
 */
export function fsStatSafe(path: string): Stats | null {
  try {
    return statSync(path);
  } catch (e) {}

  return null;
}
