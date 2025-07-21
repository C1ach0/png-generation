import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { ImageModule } from './image.module';
import { AppService } from '../services/app.service';

@Module({
  imports: [ImageModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}