import { Type, Static } from '@zalib/core/typebox';

import { userCoreProps } from 'src/common';

export const firstExampleUserSchema = Type.Object(
  {
    ...userCoreProps,
    extProp: Type.Number({
      description: 'Дополнительное свойство юзера нужное только в этом модуле',
    }),
  },
  { description: 'Контекст пользователя' },
);

export type FirstExampleUser = Static<typeof firstExampleUserSchema>;
