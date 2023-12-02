import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/guards/auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from '../../schemas/user.schema';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({defaultStrategy:'jwt', session:true}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config: ConfigService) =>{
        return {
          secret: config.get<string>('JWT_SECRET'),
        }
      }      
    }),
  ],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy],
  
})
export class AuthModule {}