import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common'
import {DriversService} from './drivers.service'
import {Driver} from 'src/schemas/driver.schema'

@Controller('api/drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async create(@Body() driver: Driver): Promise<Driver> {
    return this.driversService.create(driver)
  }

  @Get()
  async findAll(): Promise<Driver[]> {
    return this.driversService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Driver> {
    return this.driversService.findById(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() driver: Driver
  ): Promise<Driver> {
    return this.driversService.update(id, driver)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.driversService.delete(id)
  }

  @Post('deactivateAll')
  async deactivateAll(): Promise<boolean> {
    return this.driversService.deactivateAll()
  }
}
