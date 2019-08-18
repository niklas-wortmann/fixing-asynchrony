import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformationController } from './transformation/transformation.controller';
import { FlakyController } from './flaky/flaky.controller';
import { StreamController } from './stream/stream.controller';

@Module({
  imports: [],
  controllers: [AppController, TransformationController, FlakyController, StreamController],
  providers: [AppService],
})
export class AppModule {}
