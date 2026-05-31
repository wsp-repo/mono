import { isUndefined } from '@common/core';
import { isNumber } from '@nestjs/common/utils/shared.utils';

import { MAX_DB_VARCHAR } from '../constants';

/**
 * Возвращает timestamp или "0" из:
 * - Date - готовый объект даты
 * - string - строка в ISO-формате
 * - number - timestamp в мс
 */
export function getTimestamp(date?: Date | string | number): number {
  if (!date) return 0;

  if (isNumber(date) && date < 0) return 0;

  const timestamp = new Date(date).getTime();
  return isNaN(timestamp) ? 0 : timestamp;
}

/**
 * Транслитерирует русский текст в латиницу. Возвращает копию
 */
export function getSysName(value?: string): string {
  if (isUndefined(value)) {
    throw new Error('Undefined value for create sysName');
  }

  /* prettier-ignore */

  const translitMap: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k',
    л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  };

  /* prettier-ignore */

  return value.toLowerCase()
    .replace(/[а-яё]/g, (char) => translitMap[char] || char)
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, MAX_DB_VARCHAR);
}
