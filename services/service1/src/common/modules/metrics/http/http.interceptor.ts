import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';
import { Observable, tap } from 'rxjs';

import { MetricNameKeys } from '../types';

import { MS_IN_SEC } from '../constants';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric(MetricNameKeys.HttpRequestDurationSeconds)
    private readonly httpRequestDurationHistogram: Histogram<string>,
  ) {}

  public intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<T> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        const route = request.route?.path || request.url;
        const method = request.method;
        const statusCode = response.statusCode;

        const delta = (Date.now() - now) / MS_IN_SEC;

        this.httpRequestDurationHistogram
          .labels(method, route, statusCode.toString())
          .observe(delta);
      }),
    );
  }
}
