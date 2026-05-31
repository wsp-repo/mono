/* eslint-disable @typescript-eslint/naming-convention */

import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { camelCase } from '@zalib/core/helpers';
import type { TSchema, TypeboxOptions } from '@zalib/core/typebox';

import { addConvert } from '../helpers';
import { TypeboxValidatorPipe } from '../pipes/validator';

function getHeaders(ctx: ExecutionContext): Record<string, unknown> {
  const { headers } = ctx.switchToHttp().getRequest();

  const result: Record<string, unknown> = Object.create(null);

  const keys = Object.keys(headers);
  for (let i = 0; i < keys.length; i++) {
    const value = headers[keys[i]];

    result[keys[i].toLowerCase()] = value;
    result[camelCase(keys[i])] = value;
    result[keys[i]] = value;
  }

  return result;
}

// Фабричная функция для создания декоратора с несколькими параметрами
export function TypeboxHeader<Schema extends TSchema>(
  header: string,
  schema: Schema,
  options?: TypeboxOptions,
): ParameterDecorator {
  return createParamDecorator((_: undefined, ctx: ExecutionContext) => {
    return new TypeboxValidatorPipe(schema, addConvert(options)).transform(
      getHeaders(ctx)[header],
    );
  })();
}

// Фабричная функция для создания декоратора с несколькими параметрами
export function TypeboxHeaders<Schema extends TSchema>(
  schema: Schema,
  options?: TypeboxOptions,
): ParameterDecorator {
  return createParamDecorator((_: undefined, ctx: ExecutionContext) => {
    return new TypeboxValidatorPipe(schema, addConvert(options)).transform(
      getHeaders(ctx),
    );
  })();
}
