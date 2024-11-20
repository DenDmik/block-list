import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DbModule } from 'src/db/db.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  // импортировали сюда DbModule
  imports:[DbModule,AccountModule],
  providers: [UserService],
  // чтоб использовать UserService в др модулях
  exports:[UserService]
})
export class UserModule {}
