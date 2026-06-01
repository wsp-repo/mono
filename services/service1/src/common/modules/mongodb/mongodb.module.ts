import { Global, Module } from '@nestjs/common';

import { getClientProvider } from 'shared/db/mongodb';

import { MetricsModule } from '../metrics/metrics.module';
import { MONGODB_INJECT_NAME, MongodbQueries } from './mongodb.queries';

import { MongodbConfig } from './mongodb.config';

@Global()
@Module({
  exports: [MONGODB_INJECT_NAME, MongodbQueries],
  imports: [MetricsModule],
  providers: [
    MongodbConfig,
    getClientProvider(MONGODB_INJECT_NAME, MongodbConfig),
    MongodbQueries,
  ],
})
export class MongodbModule {}
