import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

  async login(logInDto: LoginDto): Promise<any> {    
    const user = await this.usersService.getByEmail(logInDto.email);
    if(!user) throw new HttpException('This user is not registered in the system!',HttpStatus.UNAUTHORIZED);;
    const passwordValid = await bcrypt.compare(logInDto.password, user.password)
    if (!passwordValid) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
      userId:user._id
    };
  }
}