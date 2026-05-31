import { describe, it, expect } from 'vitest';

import { getSysName } from '../index';

import { MAX_DB_VARCHAR } from '../../constants';

type GetSysNameInput = Parameters<typeof getSysName>[0];
type GetSysNameResult = ReturnType<typeof getSysName>;

type GetSysNameValidTestCase = {
  input: GetSysNameInput;
  name: string;
  result: GetSysNameResult;
};

type GetSysNameInvalidTestCase = {
  error: string;
  input: GetSysNameInput;
  name: string;
};

const TESTS_GET_SYS_NAME_VALID: GetSysNameValidTestCase[] = [
  {
    name: 'транслитерирует русские буквы',
    input: 'Привет Мир',
    result: 'privet-mir',
  },
  {
    name: 'приводит латиницу к нижнему регистру',
    input: 'HeLLo WoRLD',
    result: 'hello-world',
  },
  {
    name: 'удаляет лишние символы и схлопывает дефисы',
    input: '  A!@#B   C  ',
    result: 'a-b-c',
  },
  {
    name: 'корректно обрабатывает букву ё',
    input: 'Ёжик',
    result: 'yozhik',
  },
  {
    name: 'обрезает результат по MAX_DB_VARCHAR',
    input: 'a'.repeat(MAX_DB_VARCHAR + 10),
    result: 'a'.repeat(MAX_DB_VARCHAR),
  },
  {
    name: 'возвращает пустую строку для пустого значения',
    input: '',
    result: '',
  },
];

const TESTS_GET_SYS_NAME_INVALID: GetSysNameInvalidTestCase[] = [
  {
    name: 'выбрасывает ошибку для undefined',
    input: undefined,
    error: 'Undefined value for create sysName',
  },
];

describe('getSysName', () => {
  it.each(TESTS_GET_SYS_NAME_VALID)('$name', ({ input, result }) => {
    expect(getSysName(input)).toBe(result);
  });

  it.each(TESTS_GET_SYS_NAME_INVALID)('$name', ({ input, error }) => {
    error
      ? expect(() => getSysName(input)).toThrow(error)
      : expect(() => getSysName(input)).toThrow();
  });
});
