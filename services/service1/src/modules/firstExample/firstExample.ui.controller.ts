import { Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiController,
  ApiResponse,
  apiResponse,
  ApiSwagger,
  TypeboxQueries,
} from '@zalib/nest';
import { UiUrls } from 'shared/common';
import {
  FirstExampleGetValuesQueries,
  firstExampleGetValuesQueriesSchema,
  firstExampleGetValuesResponse200Schema,
  FirstExampleGetValuesResult,
} from 'shared/services';

@ApiTags('[UI] SimpleModule')
@ApiController(`${UiUrls.Service1}/first`)
export class FirstExampleUiController {
  @Get()
  @ApiOperation({ summary: 'Получение списка значений' })
  @ApiSwagger({
    request: {
      queries: firstExampleGetValuesQueriesSchema,
    },
    response: {
      200: firstExampleGetValuesResponse200Schema,
    },
  })
  public async getValues(
    @TypeboxQueries(firstExampleGetValuesQueriesSchema)
    queries: FirstExampleGetValuesQueries,
  ): Promise<ApiResponse<FirstExampleGetValuesResult>> {
    console.warn('FirstExampleUiController.getValues', queries);

    const values = await Promise.resolve([]);

    return apiResponse(values);
  }
}
