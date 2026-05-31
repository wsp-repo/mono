import { Type } from '@zalib/core/typebox';
import type { Static } from '@zalib/core/typebox';

import { createSuccessResponseSchema } from 'src/common';

import { firstExampleFiltersSchema } from '../entities/filters';
import { firstExampleValueSchema } from '../entities/values';

export const firstExampleGetValuesQueriesSchema = Type.Object(
  firstExampleFiltersSchema, // параметры запроса = фильтры
  { description: 'Параметры получения значений' },
);

export const firstExampleGetValuesResultSchema = Type.Array(
  firstExampleValueSchema,
  { description: 'Массив подходящих значений' },
);

export const firstExampleGetValuesResponse200Schema =
  createSuccessResponseSchema(firstExampleGetValuesResultSchema);

export type FirstExampleGetValuesQueries = Static<
  typeof firstExampleGetValuesQueriesSchema
>;
export type FirstExampleGetValuesResult = Static<
  typeof firstExampleGetValuesResultSchema
>;
export type FirstExampleGetValuesResponse200 = Static<
  typeof firstExampleGetValuesResponse200Schema
>;
