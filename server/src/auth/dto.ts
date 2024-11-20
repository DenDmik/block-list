import { ApiProperty } from "@nestjs/swagger";
// чтоб заработало необходимо через npm установить class-validator из nest
import {IsEmail, IsNotEmpty} from 'class-validator'

export class SignUpDto{
    //  @ApiProperty используется для связки со swagger
    @ApiProperty({
        example:'test@gmail.com'
    })
    @IsEmail()
    email:string

    @ApiProperty({
        example:'1234'
    })
    @IsNotEmpty()
    password:string

    @ApiProperty({
        example:'123456'
    })
    @IsNotEmpty()
    codeOtp:string
}

export class SignInDto{
    @ApiProperty({
        example:'dmikdenis@gmail.com'
    })
    @IsEmail()
    email:string

    @ApiProperty({
        example:'1234'
    })
    @IsNotEmpty()
    password:string

    @ApiProperty({
        example:'123456'
    })
    @IsNotEmpty()
    codeOtp:string
}



export class GetSessionInfoDto{
    @ApiProperty()
    id:number

    @ApiProperty()
    email:string
    @ApiProperty()
    'iat':number
    @ApiProperty()
    'exp':number
}

export class SignOtpDto{
    @ApiProperty({
        example:'dmikdenis@gmail.com'
    })

    @ApiProperty()
    @IsEmail()
    email:string
}