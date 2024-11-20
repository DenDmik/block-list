import { Controller,HttpStatus,Post,HttpCode,
     Get, Body,Res, UseGuards, 
     Req} from '@nestjs/common';
import { GetSessionInfoDto, SignInDto, SignUpDto ,SignOtpDto} from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { Response,Request } from 'express';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';
import { CookieOtpServ } from './cookie.otpserv';

@Controller('auth')
export class AuthController { 

    constructor(private readonly authService:AuthService,
                private cookieService:CookieService,
                private cookieOtpServ: CookieOtpServ,
    ) {}

// запрос выполняется на странице проверки сущесвования почты
// там отправляется codeOtp на почту пользователя и одновременно
// устанавливается его хеш в куки ответа
@Post('sing-up-otp')
@ApiCreatedResponse()
async signOtp(
    @Body() body:SignOtpDto, 
    @Res({passthrough:true}) res: Response
){
    // получили email из тела запроса и передали в authService.signOtp(body.email)
    const{accessCode}= await this.authService.signOtp(body.email)
    //функция authService.signOtp(body.email) вернула accessCode 
    //вставили в куку в ответе res
    this.cookieOtpServ.setToken(res,accessCode)
}
   





@Post('sign-up')
@ApiCreatedResponse()
// внимательно с Response , он может вставиться из др библиотеки , а надо из express
// что такое  @Res({passthrough:true})???
async signUp(
    @Body() body:SignUpDto, 
    @Req() req: Request,
    @Res({passthrough:true}) res: Response,){
        // достаем из куки токен с названием tokenKey('access-codeotp')
        // передаем tokenOtp в функцию authService.signUp вместе с данными
        // из тела запроса в т.ч. и код полученный из почты body.codeOtp
        const tokenOtp = req.cookies[CookieOtpServ.tokenKey]
        console.log(tokenOtp)
//     // в видео написано this.authService.signUp(body.email,body.password),но
//     // у меня это не работает т.к в auth.service у меня async signUp(signUp:SignUpDto).
//     // а у него singUp(email:string, password:string)
//     // в authService метод singUp регистрирует нового пользователя и
//     // создает accessToken с помощью jwtServise.signAsync и возвращает его,
//     // здесь accessToken присваевается переменной accessToken
//     // body.email ,body.password,body.codeotp(код полученный из почты)
//     //  данне из формы регистрации
         const{accessToken} = await this.authService.signUp(
           body.email,
           body.password,
           body.codeOtp,
           tokenOtp)

//     // вызывается метод setToken из cookieService который устанавливает токен
//     // в HTTP ответе res
    this.cookieService.setToken(res,accessToken)
}

@Post('sign-in')
@ApiOkResponse()
@HttpCode(HttpStatus.OK)
async signIn(
    @Body() body:SignInDto,
    @Req() req: Request,
    @Res({passthrough:true}) res: Response,){
        const tokenOtp= req.cookies[CookieOtpServ.tokenKey]
        console.log(tokenOtp)

    const{accessToken} = await this.authService.signIn(
        body.email,
        body.password,
        body.codeOtp,
    tokenOtp)
//почему нет return??? и нет await
    this.cookieService.setToken(res,accessToken)
}

@Post('sign-out')
@HttpCode(HttpStatus.OK)
@ApiOkResponse()
@UseGuards(AuthGuard)
async signOut(@Res({passthrough:true}) res: Response){
    
//почему нет return??? и нет await
  this.cookieService.removeToken(res)  
  this.cookieOtpServ.removeToken(res)
}

@Get('session')
@ApiOkResponse({type: GetSessionInfoDto})
@UseGuards(AuthGuard)
// почему не ассинхронно???
getSessionInfo(@SessionInfo() session:GetSessionInfoDto){return session}
}