import { createValidator } from '@zalib/core/typebox';
import { describe, it, expect } from 'vitest';

import {
  FirstExampleCreateValuesBody,
  firstExampleCreateValuesBodySchema,
} from '../createValues';

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
  {
    name: 'Запись с лишними полями, юзер полный',
    input: {
      values: [
        { description: 'Описание', name: 'Наименование', other: 'Лишнее поле' },
      ],
      user: { extProp: 1, id: 123 },
    },
    result: {
      values: [{ description: 'Описание', name: 'Наименование' }],
      user: { extProp: 1, id: 123 },
    },
  },
  {
    name: 'Лишнее свойство на всего объекта',
    input: {
      values: [
        { description: 'Описание', name: 'Наименование', other: 'Лишнее поле' },
      ],
      user: { extProp: 1, id: 123 },
      zzz: 1235,
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
];

describe('firstExampleCreateValuesBodySchema', () => {
  const validator = createValidator(firstExampleCreateValuesBodySchema);

  it.each(VALID_TESTS)('$name', ({ input, result }) => {
    // проверка на подмножество, но это плохой путь
    expect(validator.compile(input)).toMatchObject(result);
  });

  it.each(INVALID_TESTS)('$name', ({ input }) => {
    expect(() => validator.compile(input)).toThrow();
  });
});
