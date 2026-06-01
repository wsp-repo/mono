import { Type, Static } from '@zalib/core/typebox';

export const firstExampleFiltersSchema = Type.Object(
  {
    ids: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: 'Массив идентификаторов',
        minItems: 1,
      }),
    ),
    name: Type.Optional(
      Type.String({
        description: 'Строка для поиска по вхождению',
        minLength: 3,
      }),
    ),
  },
  { description: 'Фильтры для формироавния данных' },
);

export type FirstExampleFilters = Static<typeof firstExampleFiltersSchema>;
