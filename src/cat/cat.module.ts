import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatService } from './cat.service';
import { CatSchema } from './cat.model';
import { CatController } from './cat.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
