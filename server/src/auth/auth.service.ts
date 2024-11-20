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
 //////////////////////////Sign Up       
// у нас есть SignUpDto, почему автор пишет 
// singUp(email:string, password:string)
   async signUp(email:string,password:string,codeOtp:string,tokenOtp:string){
       const user = await this.userService.findByEmail(email)
//////////////////////////////////
const sessionInfo=  await this.jwtService.verifyAsync(tokenOtp,{secret:process.env.JWT_SECRET})
console.log(sessionInfo.code)
const code = sessionInfo.code
    ///////////////// проверка кода otp
    if(code !== codeOtp){throw new BadRequestException('неверный код Otp')}
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
       //////////////////////////////SIGN IN
    async signIn(email:string,password:string,codeOtp:string ,tokenOtp:string){
        const user = await this.userService.findByEmail(email)
        
        if(!user){throw  new UnauthorizedException()}
        ///////////////////////////////////////////////////
        
     const sessionInfo=  await this.jwtService.verifyAsync(tokenOtp,{secret:process.env.JWT_SECRET})
           
    console.log(sessionInfo.code)
    const code = sessionInfo.code
        ///////////////// проверка кода otp
        if(code !== codeOtp){throw new BadRequestException('неверный код Otp')}
       
        ///////////////////////////////////////
        ///проверка пароля true or false
        // const passwordIsMatch=(user)?await argon2.verify(tokenOtp,codeOtp):false
        ////////////////////////////////////////// 
        // if(!passwordIsMatch){throw new BadRequestException('неверный код Otp')}
        //////////////////////////////////////////////////
        const hash= this.passWordService.getHash(password,user.salt)
        if(hash !==user.hash){throw new UnauthorizedException() }
        const accessToken = await this.jwtService.signAsync({
            id:user.id,
            email:user.email,
        })
        return {accessToken}
    }
    // функция отправки Otp на почту пользователя и создание токена
    async signOtp(email:string){
              //  функция генерации кода не работает
      // const otp = this.userService.otpGenetator();
      //    console.log(otp)
      // еще генерпция кода , работает , 6 цифр.//////////////
      const code = Math.floor(100000+ Math.random()*900000).toString()
      console.log(code)
      // /////////////////////////////////////////////////////
          //  функция сенд емайл

     this.mailerService.sendMail({
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
        //////////////////////////////
        // const accessCode = await argon2.hash(code)
        return{accessCode}
        
   }
}



