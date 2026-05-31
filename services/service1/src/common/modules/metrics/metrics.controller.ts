/* eslint-disable @typescript-eslint/no-restricted-imports */

import { getYamlString, Response } from '@common/nest';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { PrometheusController } from '@willsoto/nestjs-prometheus';

@ApiExcludeController()
@Controller(getYamlString('application.metrics.route'))
export class MetricsController extends PrometheusController {
  @Get()
  public async index(
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    return super.index(response);
  }
}
