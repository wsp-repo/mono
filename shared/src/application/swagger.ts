/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { deepClone } from '@zalib/core';

/**
 * Фильтрует только указанные по префиксу адреса
 */
function filterByPath(doc: any, pathPrefix: string): any {
  const filtered = { ...deepClone(doc), paths: {} };

  Object.entries(doc.paths).forEach(([path, methods]) => {
    if (path.startsWith(pathPrefix)) {
      Object.assign(filtered.paths, { [path]: methods });
    }
  });

  return filtered;
}

/**
 * Инициализирует сваггер по секциям
 */
export function initSwagger(
  app: NestFastifyApplication,
  sections: string[],
  restPref = '',
): void {
  sections.forEach((section) => {
    const prefix = restPref ? `/${restPref}/${section}` : `/${section}`;

    const config = new DocumentBuilder().setTitle('Документация').build();
    const swaggerDocument = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(
      `${prefix}/swagger`,
      app,
      filterByPath(swaggerDocument, prefix),
    );
  });
}
