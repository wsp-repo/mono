import { describe, it, expect } from 'vitest';

import { sharedHelper } from '../sharedHelper';

type InputType = Parameters<typeof sharedHelper>[0];
type ResultType = ReturnType<typeof sharedHelper>;

type ValidTest = {
  input: InputType;
  name: string;
  result: ResultType;
};

const VALID_TESTS: ValidTest[] = [
  {
    name: 'Русский текст без обрезки',
    input: 'Русский текст БЕЗ обрезки',
    result: 'русский текст без обрезки',
  },
  {
    name: 'Русский текст с обрезкой',
    input: '   русский Текст С обрезкой ',
    result: 'русский текст с обрезкой',
  },
];

type InvalidTest = {
  input?: InputType;
  name: string;
};

const INVALID_TESTS: InvalidTest[] = [
  {
    name: 'Ошибка при undefined-значении',
    input: undefined,
  },
];

describe('sharedHelper', () => {
  it.each(VALID_TESTS)('$name', ({ input, result }) => {
    expect(sharedHelper(input)).toBe(result);
  });

  it.each(INVALID_TESTS)('$name', ({ input }) => {
    // "грязный хак" для запуска тестов с `undefined`
    expect(() => sharedHelper(input!)).toThrow();
  });
});
