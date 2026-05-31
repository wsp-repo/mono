import { YamlCustom, YamlString } from '@common/nest';
import { Injectable } from '@nestjs/common';
import {
  MongodbConnectionConfigPool,
  mongodbConnectionConfigPoolSchema,
  MongodbConnectionConfigProps,
} from 'shared/db/mongodb';

@Injectable()
export class MongodbConfig implements MongodbConnectionConfigProps {
  @YamlString('databases.mongodb.url')
  public url!: string;

  @YamlCustom('databases.mongodb.pool', {
    optional: true,
    schema: mongodbConnectionConfigPoolSchema,
  })
  public pool?: MongodbConnectionConfigPool;
}
