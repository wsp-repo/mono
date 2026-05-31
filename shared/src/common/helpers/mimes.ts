import mime from 'mime';
import { extname } from 'path';

const DEFAULT_MIME_TYPE = 'application/octet-stream';

/**
 * Возвращает MIME-тип по имени файла/пути к файлу
 * !Внимание! Не читает файл, работает только по строке
 */
export function getMimeType(fileName: string): string {
  return mime.getType(fileName) || DEFAULT_MIME_TYPE;
}

/**
 * Возвращает расширение файла
 */
export function getFileExt(fileName: string): string {
  return extname(fileName).toLowerCase().substring(1);
}
