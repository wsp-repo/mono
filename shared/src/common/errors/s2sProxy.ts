import { isObject, CoreError } from '@zalib/core';

/**
 * Ошибка, выбрасываемая при неуспешном ответе от внутреннего сервиса
 * монорепозитория через HTTP (Axios-запросы S2S).
 * Содержит статус-код и опциональный код ошибки из CoreError.
 */
export class S2sProxyError extends CoreError {
  public readonly code: string = 'SERVICE_PROXY_ERROR';
  public readonly statusCode: number = 500;

  constructor(
    error: { code?: string; details?: unknown; message?: string },
    statusCode = 500,
  ) {
    const { message, code, details } = error;

    super(message || 'Service Error', {
      ...(isObject(details) ? details : {}),
    });

    this.statusCode = statusCode;

    if (code) this.code = code;
  }
}
