import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {User} from 'src/schemas/user.schema'
import {Model} from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find().exec()
  }
  async getByEmail(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({email}).lean().exec()
    return user
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username})
  }
}
