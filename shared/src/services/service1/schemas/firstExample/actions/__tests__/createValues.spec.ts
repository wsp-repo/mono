import { Value } from '@sinclair/typebox/value';
import { describe, it, expect } from 'vitest';

import type { FirstExampleCreateValuesBody } from '../createValues';
import { firstExampleCreateValuesBodySchema } from '../createValues';

/**
 * Хелпер валидации, нужно заменить на пакетный
 * ToDo проверить на предмет очистки от лишних полей
 */
function validate(value: unknown): FirstExampleCreateValuesBody {
  const result = Value.Check(firstExampleCreateValuesBodySchema, value);

  if (!result) {
    const errors = [...Value.Errors(firstExampleCreateValuesBodySchema, value)];

    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }

  return value;
}

type ValidTest = {
  input: unknown;
  name: string;
  result: FirstExampleCreateValuesBody;
};

const VALID_TESTS: ValidTest[] = [
  {
    name: 'Запись полная, юзер полный',
    input: {
      values: [{ description: 'Описание', name: 'Наименование' }],
      user: { extProp: 1, id: 123 },
    },
    result: {
      values: [{ description: 'Описание', name: 'Наименование' }],
      user: { extProp: 1, id: 123 },
    },
  },
  {
    name: 'Запись полная, юзер c лишними полями',
    input: {
      values: [{ description: 'Описание', name: 'Наименование' }],
      user: { extProp: 1, id: 123, organizations: [1, 2, 3, 4] },
    },
    result: {
      values: [{ description: 'Описание', name: 'Наименование' }],
      user: { extProp: 1, id: 123 },
    },
  },
];

type InvalidTest = {
  input?: unknown;
  name: string;
};

const INVALID_TESTS: InvalidTest[] = [
  {
    name: 'Ошибка для undefined',
    input: undefined,
  },
  {
    name: 'Запись с лишними полями, юзер полный',
    input: {
      values: [
        { description: 'Описание', name: 'Наименование', other: 'Лишнее поле' },
      ],
      user: { extProp: 1, id: 123 },
    },
  },
];

describe('firstExampleCreateValuesBodySchema', () => {
  it.each(VALID_TESTS)('$name', ({ input, result }) => {
    // проверка на подмножество, но это плохой путь
    expect(validate(input)).toMatchObject(result);
  });

  it.each(INVALID_TESTS)('$name', ({ input }) => {
    expect(() => validate(input)).toThrow();
  });
});
