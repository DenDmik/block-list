import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { SignInDto, SignUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import argon2 from "argon2"

@Injectable()
export class AuthService {
// не понял зачем нежен UserService если можно получить клиента тут так как 
// получаем в userService, 
// здесь исп методы из UserService
    constructor(
         private readonly userService: UserService,
         private passWordService:PasswordService,
         private jwtService:JwtService,
         private mailerService: MailerService,
         
      
        ) {}
 ///Sign Up (запрос@Post('sign-up')) !!! ЭТО БУДЕТ OTP VEREFICATION  (регистрация)  
// у нас есть SignUpDto, почему автор пишет 
// singUp(email:string, password:string)
   async signUp(password:string,codeOtp:string,tokenOtp:string){
       
//////////////////////////////////
const sessionInfo=  await this.jwtService.verifyAsync(tokenOtp,{secret:process.env.JWT_SECRET})
console.log(sessionInfo)
const code = sessionInfo.code
const email = sessionInfo.email
///////////////// проверка кода otp
if(code !== codeOtp){throw new BadRequestException('неверный код Otp')}
//////////////
const user = await this.userService.findByEmail(email)
    
//////////////////////////////

    //    проверка на существование user в БД
       if(user){
        throw new BadRequestException({type:'email-alredy-exists'})
       }


       const salt=  this.passWordService.getSalt()
       const hash =  this.passWordService.getHash(password,salt)
      // /////////////////////////////////////////////////////
  
    //    здесь регистрация нового пользователя метод из UserService
       const newUser = await this.userService.create(email,hash,salt,)
    //    получаем и возвращаем accessToken
       const accessToken = await this.jwtService.signAsync({
        email:newUser.email,
        id:newUser.id})
        return {accessToken}
       }
    /// SIGN IN(запрос @Post('sign-in')) !!! ЭТО БУДЕТ OTP VEREFICATION  (вход) 
    async signIn(password:string,codeOtp:string ,tokenOtp:string){ 
        ///////////////////////////////////////////////////
        
     const sessionInfo=  await this.jwtService.verifyAsync(tokenOtp,{secret:process.env.JWT_SECRET})
           
    console.log(sessionInfo)
    const code = sessionInfo.code
    const email = sessionInfo.email
        ///////////////// проверка кода otp
        if(code !== codeOtp){throw new BadRequestException('неверный код Otp')}
        ///////
       const user = await this.userService.findByEmail(email)
       if(!user){throw  new UnauthorizedException()}
        //////////////////////////////////////////////////
        const hash= this.passWordService.getHash(password,user.salt)
        if(hash !==user.hash){throw new UnauthorizedException() }
        const accessToken = await this.jwtService.signAsync({
            id:user.id,
            email:user.email,
        })
        return {accessToken}
    }
    // ЭТО БУДЕТ В SIGN UP и SIGN IN страницах!!! (запрос @Post('sing-up-otp'))
    // функция отправки Otp на почту пользователя и создание токена
    async signOtp(email:string){
      // еще генерпция кода , работает , 6 цифр.//////////////
      const code = Math.floor(100000+ Math.random()*900000).toString()
      console.log(code)
      // /////////////////////////////////////////////////////
          //  функция сенд емайл 
        //   проверь на правильность код

     await this.mailerService.sendMail({
        to:`${email}`,
        from:'dmytriievdenistest@gmail.com',
        subject:'Testing email',
        text:`Welcome `,
        html:`<div>HELLO ${code}</div>`})
       ////////////////////////////////////// 
        const accessCode = await this.jwtService.signAsync({
            email:email,
            code:code
        })
        return{accessCode}
   }
}



