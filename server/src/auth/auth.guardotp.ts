import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CookieOtpServ } from './cookie.otpserv';
// AuthGuardOtp проверяет токен access-codeotp на валидность,
// и это проверка сущесвования почты 
@Injectable()
export class AuthGuardOtp implements CanActivate {

  constructor(private jwtService:JwtService){}
  // проверка токена access-codeotp на валидность 
  canActivate(
    context:ExecutionContext,
  ){
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieOtpServ.tokenKey]
    if(!token){
      throw new UnauthorizedException()
    }
    try{
      const sessionInfo= this.jwtService.verifyAsync(token,{secret:process.env.JWT_SECRET})
     //  записываем информацию о сесии в запрос в поле 'session'
      req['session']=sessionInfo
     }catch{
       throw new UnauthorizedException()
     }
     return true;

  }

}