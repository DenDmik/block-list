import { authControllerSignUp } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function useSignUpForm(){
    
    const router = useRouter()
    
    const{register,handleSubmit}= useForm<{
        email:string;
        password:string;
        codeOtp:string
    }>()
// это обработчик формы ,когда наж. UiButton , данные формы передаются в
// функцию authControllerSignUp(получена из swagger документации через Orval в файл
// generated.ts)
    const signUpMutation = useMutation({
        // здесь вопрос как кроме данных из формы сюда попадет access-code из куки???
        mutationFn : authControllerSignUp,
        onSuccess(){
           router.push(ROUTES.HOME) 
        }
    })
    const errorMessage = signUpMutation.error?'Sign up failed':undefined
return{
    register,
    errorMessage,
    handleSubmit: handleSubmit(data => signUpMutation.mutate(data)),
    isPanding :signUpMutation.isPending,
}

}