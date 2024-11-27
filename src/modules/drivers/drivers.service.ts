import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Driver} from 'src/schemas/driver.schema'
import {Model} from 'mongoose'
import {ZipToCoordsService} from '../coords/zipToCoords.service'
import {IMapboxPlace} from 'src/types/mapbox-api-response'
import {WebSocketGateway, WebSocketServer} from '@nestjs/websockets'
import {Server} from 'socket.io'
import {SchedulerRegistry} from '@nestjs/schedule'

@Injectable()
@WebSocketGateway()
export class DriversService {
  @WebSocketServer() private readonly socketServer: Server
  constructor(
    @InjectModel(Driver.name) private readonly driverModel: Model<Driver>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly zipToCoordsService: ZipToCoordsService
  ) {}
  private scheduledJobs: Map<string, NodeJS.Timeout> = new Map()

  private clearScheduledJob(driverId: string) {
    const job = this.scheduledJobs.get(driverId)
    if (job) {
      clearTimeout(job)
      this.scheduledJobs.delete(driverId)
      this.schedulerRegistry.deleteTimeout(driverId)
    }
  }

  private scheduleDriverActivation(driverId: string, delay: number) {
    this.clearScheduledJob(driverId)
    const job = setTimeout(async () => {
      const newDriver = await this.driverModel.findOneAndUpdate(
        {id: {$eq: driverId}},
        {active: true},
        {new: true}
      )
      this.socketServer.emit('driverUpdated', newDriver)
      this.clearScheduledJob(driverId)
    }, delay)
    this.scheduledJobs.set(driverId, job)
    this.schedulerRegistry.addTimeout(driverId, job)
  }

  async create(driver: Driver): Promise<Driver> {
    const place: IMapboxPlace = await this.zipToCoordsService.getPlaceByZip(
      driver.zipCode
    )
    const position = [place.center[1], place.center[0]]
    driver.active = !(new Date(driver.dateAvailable) > new Date())
    const newDriver = new this.driverModel({
      ...driver,
      position,
      locationName: place.place_name,
    })
    if (
      !newDriver.active &&
      new Date(newDriver.dateAvailable).getTime() > new Date().getTime()
    ) {
      const delay =
        new Date(newDriver.dateAvailable).getTime() - new Date().getTime()
      this.clearScheduledJob(newDriver.id.toString())
      this.scheduleDriverActivation(newDriver.id.toString(), delay)
    }
    return await newDriver.save()
  }

  async findAll(): Promise<Driver[]> {
    console.log(123)
    return await this.driverModel.find().exec()
  }

  async findById(id: string): Promise<Driver> {
    return await this.driverModel.findOne({id: {$eq: id}}).exec()
  }

  async update(id: string, driver: Driver): Promise<Driver> {
    const now = Date.now()
    const dateAvailable = new Date(driver.dateAvailable).getTime()
    const place: IMapboxPlace = await this.zipToCoordsService.getPlaceByZip(
      driver.zipCode
    )
    const position = [place.center[1], place.center[0]]
    const newDriver: Driver = {
      ...driver,
      position,
      locationName: place.place_name,
    }
    if (!newDriver.active && dateAvailable > now) {
      const delay =
        new Date(newDriver.dateAvailable).getTime() - new Date().getTime()
      this.scheduleDriverActivation(newDriver.id.toString(), delay)
    }
    this.socketServer.emit('driverUpdated', newDriver)
    return await this.driverModel.findOneAndUpdate({id: {$eq: id}}, newDriver, {
      new: true,
    })
  }

  async delete(id: string): Promise<any> {
    return await this.driverModel.findOneAndDelete({id: {$eq: id}})
  }

  async deactivateAll(): Promise<boolean> {
    try {
      await this.driverModel.updateMany({active: true}, {$set: {active: false}})
      return true
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Failed to deactivate all',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }
  }
}
