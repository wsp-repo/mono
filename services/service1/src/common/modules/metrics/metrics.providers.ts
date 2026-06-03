import { makeHistogramProvider } from '@willsoto/nestjs-prometheus';

import { MetricNameKeys } from './types';

import {
  HTTP_DURATION_BUCKETS,
  QUERY_DURATION_BUCKETS,
  TRANSACTION_DURATION_BUCKETS,
} from './constants';

export const httpRequestDurationHistogramProvider = makeHistogramProvider({
  buckets: HTTP_DURATION_BUCKETS,
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  name: MetricNameKeys.HttpRequestDurationSeconds,
});

export const transactionDurationHistogramProvider = makeHistogramProvider({
  buckets: TRANSACTION_DURATION_BUCKETS,
  help: 'Duration of transaction in seconds by queryName',
  labelNames: ['queryName'],
  name: MetricNameKeys.TransactionDurationSeconds,
});

export const queryDurationHistogramProvider = makeHistogramProvider({
  buckets: QUERY_DURATION_BUCKETS,
  help: 'Duration of query in seconds by queryName and unitName',
  labelNames: ['unitName', 'queryName'],
  name: MetricNameKeys.QueryDurationSeconds,
});
