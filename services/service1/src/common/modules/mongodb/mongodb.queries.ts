import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { MongoQueriesParent } from 'shared/db/mongodb';

export const MONGODB_INJECT_NAME = 'MONGODB_INJECT_NAME';

@Injectable()
export class MongodbQueries extends MongoQueriesParent {
  @Inject(MONGODB_INJECT_NAME) protected dbConnection!: Db;
}
