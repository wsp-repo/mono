import { describe, it, expect } from 'vitest';

import { getTimestamp } from '../index';

type GetTimestampInput = Parameters<typeof getTimestamp>[0];
type GetTimestampResult = ReturnType<typeof getTimestamp>;

type GetTimestampTestCase = {
  input: GetTimestampInput;
  name: string;
  result: GetTimestampResult;
};

const FIXED_DATE = new Date('2026-01-01T00:00:00.000Z');

const TESTS_GET_TIMESTAMP: GetTimestampTestCase[] = [
  {
    name: 'возвращает 0 при undefined',
    input: undefined,
    result: 0,
  },
  {
    name: 'возвращает timestamp для объекта Date',
    input: FIXED_DATE,
    result: FIXED_DATE.getTime(),
  },
  {
    name: 'возвращает timestamp для строки даты в ISO формате',
    input: '2026-04-07T12:34:56.000Z',
    result: 1775565296000,
  },
  {
    name: 'возвращает то же значение для timestamp в миллисекундах',
    input: 1775565296000,
    result: 1775565296000,
  },
  {
    name: 'возвращает timestamp для отрицательного числа',
    input: -1,
    result: 0,
  },
  {
    name: 'возвращает 0 для невалидной строки даты',
    input: 'invalid-date',
    result: 0,
  },
  {
    name: 'возвращает 0 для невалидного объекта Date',
    input: new Date('invalid-date'),
    result: 0,
  },
  {
    name: 'возвращает 0 для пустой строки',
    input: '',
    result: 0,
  },
  {
    name: 'возвращает 0 для строки из пробелов',
    input: '   ',
    result: 0,
  },
  {
    name: 'возвращает 0 для NaN как входного значения',
    input: Number.NaN,
    result: 0,
  },
  {
    name: 'возвращает 0 для null',
    input: null as unknown as GetTimestampInput,
    result: 0,
  },
];

describe('getTimestamp', () => {
  it.each(TESTS_GET_TIMESTAMP)('$name', ({ input, result }) => {
    expect(getTimestamp(input)).toBe(result);
  });
});
