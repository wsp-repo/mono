import { isObject, CoreError } from '@common/core';

/**
 * Ошибка при взаимодействии со Storage Service.
 *
 * В details сохраняются оригинальные message и code из ответа storage-service,
 * а клиенту возвращается обобщённое сообщение.
 */
export class StorageError extends CoreError {
  public code = 'STORAGE_ERROR';

  constructor(
    message: string,
    original?: {
      code?: string;
      message?: string;
    },
  ) {
    super(
      message,
      original ? { code: original.code, message: original.message } : undefined,
    );
  }
}

/**
 * Ошибка, выбрасываемая при неуспешном ответе от внутреннего сервиса
 * монорепозитория через HTTP (Axios-запросы S2S).
 * Содержит статус-код и опциональный код ошибки из CoreError.
 */
export class S2sProxyError extends CoreError {
  public code: string = 'SERVICE_PROXY_ERROR';
  public readonly statusCode: number = 500;

  constructor(
    error: { code?: string; details?: unknown; message?: string },
    statusCode = 500,
  ) {
    const { message, code, details } = error;

    super(message || 'Service Error', {
      ...(isObject(details) ? details : {}),
    });

    if (code) this.code = code;

    this.statusCode = statusCode;
  }
}
