import { Type } from '@common/core/typebox';
import type { Static } from '@sinclair/typebox';

export const firstExampleValueProps = {
  description: Type.Optional(
    Type.String({
      description: 'Идентификатор',
      minimum: 1,
    }),
  ),
  id: Type.String({
    description: 'Идентификатор',
    minimum: 1,
  }),
  name: Type.String({
    description: 'Идентификатор',
    minimum: 1,
  }),
};

export const firstExampleValueSchema = Type.Object(firstExampleValueProps, {
  additionalProperties: false,
  description: 'Значение',
});

export type FirstExampleValue = Static<typeof firstExampleValueSchema>;
