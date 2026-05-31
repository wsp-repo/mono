import { YamlNumber, YamlString } from '@common/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  @YamlString('config')
  public confKey!: string;

  @YamlString('application.name')
  public appName!: string;

  @YamlString('application.rest.host')
  public restHost!: string;

  @YamlNumber('application.rest.port')
  public restPort!: number;

  @YamlString('application.rest.path')
  public restPath!: string;
}
