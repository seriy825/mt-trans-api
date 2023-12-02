import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { DriversService } from '../drivers/drivers.service';


@Injectable()
export class DriverScheduler {
  constructor(
    private readonly driverService: DriversService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

//   @Cron('0 0 * * * *') // Запускаем каждый час, можно изменить по необходимости
//   async updateDriverStatus() {
//     const driversToUpdate = await this.driverService.findDriversToUpdate();

//     for (const driver of driversToUpdate) {
//       // Ваша логика для проверки и обновления поля active
//       const isActive = 

//       if (isActive !== driver.active) {
//         await this.driverService.updateDriverActiveStatus(driver._id, isActive);
//       }
//     }
//   }
}