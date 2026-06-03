import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { MetricsInterceptor } from './http/http.interceptor';
import { MetricsController } from './metrics.controller';
import {
  httpRequestDurationHistogramProvider,
  queryDurationHistogramProvider,
  transactionDurationHistogramProvider,
} from './metrics.providers';

@Module({
  exports: [
    MetricsInterceptor,
    httpRequestDurationHistogramProvider,
    transactionDurationHistogramProvider,
    queryDurationHistogramProvider,
  ],
  imports: [
    PrometheusModule.register({
      controller: MetricsController,
      defaultMetrics: { enabled: true },
    }),
  ],
  providers: [
    MetricsInterceptor,
    httpRequestDurationHistogramProvider,
    transactionDurationHistogramProvider,
    queryDurationHistogramProvider,
  ],
})
export class MetricsModule {}
