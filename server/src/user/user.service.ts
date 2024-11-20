import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { DbService } from 'src/db/db.service';
import otpGenerator from 'otp-generator'


@Injectable()
// 
export class UserService {
    // создание клиента(пользователя db из класса DbServise)
    constructor(
        private db:DbService,
        private accountService:AccountService
    ){}
// почему это не ассинхронная функция ???
     findByEmail(email:string){
        return this.db.user.findFirst({where:{email}})
    }

    async create(email:string,hash:string,salt:string){
        const user = await this.db.user.create({data:{email,hash,salt}})
        await this.accountService.create(user.id)
        return user
    }
    //  здесь надо добавить update
    //  async updateOtp(email:string,codeOtp:number){
    //     const user = await this.db.user.update({
    //         where:{email:email},
    //     data:{codeOtp}})
    //  }
    // не работает
    // otpGenetator(){
    //     const otp = otpGenerator.generate ( 6 ,  { upperCaseAlphabets : false , specialChars : false } ) ;
    //     console.log(otp)

    // }
      }

