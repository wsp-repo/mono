import { Module } from '@nestjs/common';

import { FirstExampleS2sController } from './firstExample.s2s.controller';
import { FirstExampleUiController } from './firstExample.ui.controller';

@Module({
  controllers: [FirstExampleS2sController, FirstExampleUiController],
})
export class FirstExampleModule {}
