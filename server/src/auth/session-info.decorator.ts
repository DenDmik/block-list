import { createParamDecorator,ExecutionContext } from "@nestjs/common";

export const SessionInfo = createParamDecorator(
// здесь кокойто непонятный процесс : если сделать со скобками {}, 
// (_,ctx: ExecutionContext)=> {ctx.switchToHttp().getRequest().session}
// то не работает, а так работает
// суука еле нашел ошибку
        (_,ctx: ExecutionContext)=> ctx.switchToHttp().getRequest().session

)