/*
import {
  ErrorsFilter,
  getYamlString,
  loggerFactory,
  SuccessInterceptor,
} from 'shared/nestjs';
*/
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { parse as querystringParse } from 'qs';
//import { initSwagger } from 'shared/application';
//import { S2sUrls, UiUrls } from 'shared/common';

import { AppModule } from './app.module';
import { MetricsInterceptor } from './common/modules';

import { AppConfig } from './app.config';

async function bootstrap(): Promise<void> {
  const logger = loggerFactory('bootstrap');
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        routerOptions: {
          querystringParser: (str: string) => {
            return querystringParse(str, {
              allowEmptyArrays: false,
              arrayLimit: 100000,
              duplicates: 'combine',
              throwOnLimitExceeded: true,
            });
          },
        },
      }),
      {
        bufferLogs: true,
        // зафиксировано
        rawBody: true,
      },
    );
    const logger = loggerFactory(app);

    const { appName, confKey, restHost, restPort, restPath } =
      app.get<AppConfig>(AppConfig);

    const successInterceptor = new SuccessInterceptor(app.get(Reflector));
    const errorsFilter = new ErrorsFilter(app.get(HttpAdapterHost));
    const metricsInterceptor = app.get(MetricsInterceptor);

    app.useGlobalInterceptors(successInterceptor, metricsInterceptor);
    app.useGlobalFilters(errorsFilter);
    app.useLogger(logger);

    // необработанные исключения убивают процесс
    process.on('unhandledRejection', (reason: unknown) => {
      const error = new Error('Process unhandledRejection');

      logger.error('Unhandled Rejection:', error, reason);

      app.close().then(() => process.exit(1));
    });
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);

      app.close().then(() => process.exit(1));
    });

    app.enableCors({
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      origin: true,
    });

    app.setGlobalPrefix(restPath, {
      exclude: ['healthcheck', getYamlString('application.metrics.route')],
    });

    initSwagger(app, [S2sUrls.Service1, UiUrls.Service1], restPath);

    logger.warn('Starting service params:', {
      appName,
      confKey,
      restHost,
      restPath,
      restPort,
    });

    await app.listen(restPort, restHost);

    logger.info('Server ready');
  } catch (error) {
    logger.error('Server error', error as Error);

    throw error;
  }
}

bootstrap();
