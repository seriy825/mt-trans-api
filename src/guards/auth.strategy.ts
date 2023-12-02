import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../modules/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.JWT_SECRET
    });
  }

  async validate(payload){
    const { email } = payload;
    
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }      

    return user;
  }
}