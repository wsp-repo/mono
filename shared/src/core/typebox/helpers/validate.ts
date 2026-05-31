import { Value } from '@sinclair/typebox/value';
import type { Static, TSchema } from '@zalib/core/typebox';

/**
 * Хелпер валидации, нужно заменить на пакетный
 * ToDo проверить на предмет очистки от лишних полей
 */
export function validate<T extends TSchema>(
  schema: T,
  value: unknown,
): Static<T> {
  const result = Value.Check(schema, value);

  if (!result) {
    const errors = [...Value.Errors(schema, value)];

    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }

  return value;
}
