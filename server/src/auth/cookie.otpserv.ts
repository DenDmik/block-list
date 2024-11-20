import { Injectable } from '@nestjs/common';
import { Response } from 'express';
//  установка токена проверки существования почты в куки
@Injectable()
export class CookieOtpServ {
    static tokenKey = 'access-codeotp'
    setToken(res: Response,token:string){
        res.cookie(CookieOtpServ.tokenKey,token,{
            httpOnly:true,
            // срок годности 15 мин
             maxAge:15*60*1000
            })
        }
    removeToken(res: Response){
        res.clearCookie(CookieOtpServ.tokenKey)
    }    
}
