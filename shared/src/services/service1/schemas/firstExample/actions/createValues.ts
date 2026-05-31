import { Omit, Type } from '@zalib/core/typebox';
import type { Static } from '@zalib/core/typebox';

import { createSuccessResponseSchema } from 'src/common';

import { firstExampleUserSchema } from '../entities/users';
import { firstExampleValueSchema } from '../entities/values';

export const firstExampleCreateValuesBodySchema = Type.Object(
  {
    user: firstExampleUserSchema,
    values: Type.Array(Omit(firstExampleValueSchema, ['id']), {
      description: 'Массив создаваемых значений',
      minItems: 1,
    }),
  },
  { description: 'Параметры создания значений' },
);

export const firstExampleCreateValuesResultSchema = Type.Array(
  firstExampleValueSchema,
  { description: 'Массив созданных значений' },
);

export const firstExampleCreateValuesResponse201Schema =
  createSuccessResponseSchema(firstExampleCreateValuesResultSchema);

export type FirstExampleCreateValuesBody = Static<
  typeof firstExampleCreateValuesBodySchema
>;
export type FirstExampleCreateValuesResult = Static<
  typeof firstExampleCreateValuesResultSchema
>;
export type FirstExampleGetReportResponse201 = Static<
  typeof firstExampleCreateValuesResponse201Schema
>;
