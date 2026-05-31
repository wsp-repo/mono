import { Type } from '@common/core/typebox';
import type { Static } from '@sinclair/typebox';

export const userCoreProps = {
  id: Type.Number({
    description: 'Идентификатор пользователя',
    minimum: 1,
  }),
};

export const userCoreSchema = Type.Object(userCoreProps, {
  description: 'Контекст пользователя',
});

export type UserCore = Static<typeof userCoreSchema>;
