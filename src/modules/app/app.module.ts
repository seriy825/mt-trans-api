import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from 'src/modules/users/users.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      cache:true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    DriversModule
  ],
  providers: [UsersService],
})
export class AppModule {}
