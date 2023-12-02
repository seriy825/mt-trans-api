import { Module } from '@nestjs/common';
import { ZipToCoordsService } from './zipToCoords.service';

@Module({
  providers: [ZipToCoordsService],
})
export class ZipToCoordsModule {}