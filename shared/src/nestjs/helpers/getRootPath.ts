import { dirname, resolve } from 'path';

import { isDefined } from '@zalib/core/helpers';

import { fsStatSafe } from './fsStatSafe';

// Кеш для значения
let rootPath: string;

/**
 * Возвращает путь до корня проекта (package.json)
 */
export function getRootPath(): string | undefined {
  if (isDefined(rootPath)) return rootPath;

  let checkPath = resolve(process.cwd());

  while (true) {
    const packagePath = resolve(checkPath, 'package.json');

    if (fsStatSafe(packagePath)?.isFile()) {
      return (rootPath = checkPath);
    }

    const parentPath = dirname(checkPath);

    // проверка, что уже дошло до корня FS
    if (checkPath === parentPath) {
      return (rootPath = checkPath);
    }

    checkPath = parentPath;
  }
}
