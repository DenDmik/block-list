import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { CookieOtpServ } from './cookie.otpserv';

@Module({
  ////////////так подкл JwtModule в другом видео
  // JwtModule.registerAsync({
  //   imports:[ConfigModule],
  //   useFactory:(configService:ConfigService)=>({
  //     secret:configService.getOrThrow('JWT_SECRET'),
  //     signOptions:{expiresIn:'30d'},
  //   }),
  //////////
  // импорт сюда UserModule
  imports:[UserModule,JwtModule.register({
    global:true,
    // В инструкции Nest js рекомендуют доставать JWT_SECRET используя
    // ConfigService(как в ком. выше . а не через process.env.JWT_SECRET)
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'1d'}
  }),
MailerModule.forRootAsync({
  useFactory:()=>({
    transport:{
      host:'smtp.gmail.com',
      secure:false,
      port: 587,
      auth:{
        user:'dmytriievdenistest@gmail.com',
        pass:'xrdw ixxd nsts eref'
      }
    }
    ////////////////////////////////////
    // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    // defaults: {
    //   from: '"nest-modules" <modules@nestjs.com>',
    // },
  })
})],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieService,CookieOtpServ],
  
})
export class AuthModule {}
