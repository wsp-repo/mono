import {
  addRequestId,
  getYamlString,
  HealthcheckModule,
  logRequests,
} from '@common/nest';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MetricsModule, MongodbModule } from './common/modules';
import { FirstExampleModule } from './modules/firstExample/firstExample.module';

import { AppConfig } from './app.config';

@Module({
  imports: [
    // core modules
    MetricsModule,
    MongodbModule,
    HealthcheckModule,

    // work modules
    FirstExampleModule,
  ],
  providers: [AppConfig],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    const excludeMiddlewaresRoutes = [
      // паттерны сваггера
      '{*path}/swagger',
      '{*path}/swagger/{*path}',
      getYamlString('application.metrics.route'),
      'healthcheck',
    ] as const;

    // глобальные мидлвары
    consumer
      .apply(addRequestId, logRequests)
      .exclude(...excludeMiddlewaresRoutes)
      .forRoutes('*');
  }
}
