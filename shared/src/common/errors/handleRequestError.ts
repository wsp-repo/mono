/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ServiceError } from '@common/core';
import { isAxiosError } from 'axios';

export function handleRequestError(error: any): never {
  if (!isAxiosError(error)) throw error;

  const throwMessage =
    error.response?.data?.error || String(error.message || error);

  throw new ServiceError(throwMessage);
}
