import { useSessionQuery } from "@/entiities/session/queries";
import { authControllerGetSessionInfo } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/routes";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactElement } from "react";

export function protectedPage<P>(Component: (props:P)=> ReactElement){
    return function ProtectedPage(props:PropsWithChildren<P>){

    const router = useRouter();

    const{isPending,isError}= useSessionQuery()


      if(isPending){
        return <UiPageSpinner/>
      }
      if(isError){
        // здесь адрес первой страницы при загрузке ROUTES.SING_UP_OTP
        router.replace(ROUTES.HOME)
      }


        return <Component {...props}/>
    }

}