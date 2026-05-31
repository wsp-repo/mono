import { Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { S2sUrls } from 'shared/common';
import {
  ApiController,
  ApiResponse,
  apiResponse,
  ApiSwagger,
  TypeboxBody,
} from 'shared/nestjs';
import {
  FirstExampleCreateValuesBody,
  firstExampleCreateValuesBodySchema,
  firstExampleCreateValuesResponse201Schema,
  FirstExampleCreateValuesResult,
} from 'shared/services';

@ApiTags('[S2S] SimpleModule')
@ApiController(`${S2sUrls.Service1}/first`)
export class FirstExampleS2sController {
  @Post()
  @ApiOperation({ summary: 'Создание новых значений' })
  @ApiSwagger({
    request: {
      body: firstExampleCreateValuesBodySchema,
    },
    response: {
      200: firstExampleCreateValuesResponse201Schema,
    },
  })
  public async createValues(
    @TypeboxBody(firstExampleCreateValuesBodySchema)
    body: FirstExampleCreateValuesBody,
  ): Promise<ApiResponse<FirstExampleCreateValuesResult>> {
    console.warn('FirstExampleS2sController.createValues', body);

    const values = await Promise.resolve([]);

    return apiResponse(values);
  }
}
