import type {
  TAny,
  TLiteral,
  TObject,
  TSchema,
  TString,
} from '@zalib/core/typebox';
import { Type } from '@zalib/core/typebox';

export function createSuccessResponseSchema(): TObject<{
  success: TLiteral<true>;
}>;
export function createSuccessResponseSchema<T extends TSchema>(
  resultSchema: T,
): TObject<{
  result: T;
  success: TLiteral<true>;
}>;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function createSuccessResponseSchema<T extends TSchema>(
  resultSchema?: T,
) {
  const successField = Type.Literal(true, {
    description: 'Успешно ли выполнен запрос',
    example: true,
  });

  return resultSchema
    ? Type.Object({ result: resultSchema, success: successField })
    : Type.Object({ success: successField });
}

/**
 * Создает схему, соответствующую ErrorResponse<T>
 * @returns схема для ошибки
 */
/*
export function createErrorResponseSchema(): TObject<{
  error: TObject<{
    code: TString;
    details: TAny;
    message: TString;
  }>;
  success: TLiteral<false>;
}>;
export function createErrorResponseSchema<T extends string>(
  code: T,
): TObject<{
  error: TObject<{
    code: TLiteral<T>;
    details: TAny;
    message: TString;
  }>;
  success: TLiteral<false>;
}>;
export function createErrorResponseSchema<T extends string, D extends TSchema>(
  code: T,
  details: D,
): TObject<{
  error: TObject<{
    code: TLiteral<T>;
    details: D;
    message: TString;
  }>;
  success: TLiteral<false>;
}>;
*/
export function createErrorResponseSchema<T extends string, D extends TSchema>(
  code?: T,
  details?: D,
): TObject<{
  error: TObject<{
    code: TLiteral<T> | TString;
    details: D | TAny;
    message: TString;
  }>;
  success: TLiteral<false>;
}> {
  return Type.Object(
    {
      error: Type.Object({
        code: code
          ? Type.Literal(code, {
              description: 'Внутренний код ошибки',
            })
          : Type.String({
              description: 'Внутренний код ошибки',
            }),
        details: details
          ? details
          : Type.Any({
              description: 'Дополнительные данные об ошибке',
            }),
        message: Type.String({
          description: 'Описание ошибки',
        }),
      }),
      success: Type.Literal(false, {
        description: 'Успешно ли выполнен запрос',
        example: false,
      }),
    },
    {
      description: 'Ошибка при выполнении запроса',
    },
  );
}
