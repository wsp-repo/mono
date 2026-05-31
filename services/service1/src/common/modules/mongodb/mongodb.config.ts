import { Injectable } from '@nestjs/common';
import { YamlCustom, YamlString } from '@zalib/nest';
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
