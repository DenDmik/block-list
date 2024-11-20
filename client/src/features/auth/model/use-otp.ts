import { authControllerSignOtp } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function useSignUpFormOtp(){
    
    const router = useRouter()
    
    const{register,handleSubmit}= useForm<{
        email:string;
        
    }>()
    const signUpMutation = useMutation({
        mutationFn : authControllerSignOtp,
        onSuccess(){
           router.push(ROUTES.SIGN_UP) 
        }
    })
    const errorMessage = signUpMutation.error?'Code Otp has not send':undefined

    return{
        register,
        errorMessage,
        handleSubmit: handleSubmit(data => signUpMutation.mutate(data)),
        isPanding :signUpMutation.isPending,
    }
    

}