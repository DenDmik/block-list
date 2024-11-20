import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CookieService } from './cookie.service';
import { CookieOtpServ } from './cookie.otpserv';
// AuthGuard проверяет токен на валидность,
// и 
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ){
    // получение запроса и затем токена access-token из него
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.tokenKey]

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
  
  

