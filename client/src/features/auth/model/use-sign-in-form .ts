import { authControllerSignIn } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function useSignInForm(){
    
    const router = useRouter()
    
    const{register,handleSubmit}= useForm<{
        email:string;
        password:string;
        codeOtp:string;
    }>()
// это обработчик формы ,когда наж. UiButton , данные формы передаются в
// функцию authControllerSignIm(получена из swagger документации через Orval в файл
// generated.ts)
    const signInMutation = useMutation({
        mutationFn : authControllerSignIn,
        onSuccess(){
           router.push(ROUTES.HOME) 
        }
    })
    const errorMessage = signInMutation.error?'Sign in failed':undefined
return{
    register,
    errorMessage,
    handleSubmit: handleSubmit(data => signInMutation.mutate(data)),
    isPanding :signInMutation.isPending,
}

}