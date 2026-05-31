import { describe, it, expect } from 'vitest';

import { normalizeText } from '../string';

type InputType = Parameters<typeof normalizeText>[0];
type ResultType = ReturnType<typeof normalizeText>;

type ValidTest = {
  input: InputType;
  name: string;
  result: ResultType;
};

const VALID_TESTS: ValidTest[] = [
  {
    name: 'удаляет лишние символы',
    input: '  A!@#B   C  ',
    result: 'abc',
  },
  {
    name: 'корректно обрабатывает букву ё',
    input: 'Ёжик',
    result: 'ёжик',
  },
  {
    name: 'возвращает пустую строку',
    input: '   ',
    result: '',
  },
];

type InvalidTest = {
  input?: InputType;
  name: string;
};

const INVALID_TESTS: InvalidTest[] = [
  {
    name: 'ошибка для undefined',
    input: undefined,
  },
];

describe('normalizeText', () => {
  it.each(VALID_TESTS)('$name', ({ input, result }) => {
    expect(normalizeText(input)).toBe(result);
  });

  it.each(INVALID_TESTS)('$name', ({ input }) => {
    expect(() => normalizeText(input!)).toThrow();
  });
});
