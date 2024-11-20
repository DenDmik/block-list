import { Injectable } from '@nestjs/common';
import { PatchAccountDto } from './dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {
    constructor(private db: DbService){}
    // в видео нет await , почему??? ведь есть async 
    async create(userId:number){

        return await this.db.account.create({
            data:{
                ownerId:userId,
                isBlockingEnabled:false,
            }
        })
    }

    async getAccount(userId:number){
 //в видео нет await , почему??? ведь есть async 
        return await this.db.account.findFirstOrThrow({where:{ownerId:userId}})
    }

    async patchAccount(userId:number, patch:PatchAccountDto){
        // в видео нет await , почему??? ведь есть async 
        return await this.db.account.update({
           where:{ownerId:userId},
           data:{...patch} ,
    })
    }
    
}
