import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Driver, DriverSchema } from 'src/schemas/driver.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ZipToCoordsService } from '../coords/zipToCoords.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
  imports: [MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])],
  controllers: [DriversController],
  providers: [DriversService, ZipToCoordsService, SchedulerRegistry],
})
export class DriversModule {}