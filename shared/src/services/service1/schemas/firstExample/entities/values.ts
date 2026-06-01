import { Type, Static } from '@zalib/core/typebox';

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
  description: 'Значение',
});

export type FirstExampleValue = Static<typeof firstExampleValueSchema>;
