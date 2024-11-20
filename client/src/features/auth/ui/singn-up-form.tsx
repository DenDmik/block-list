import { UiButton } from "@/shared/ui/ui-button"
import { UiTextField } from "@/shared/ui/ui-text-field"
import { ROUTES } from "@/shared/constants/routes";
import { useSignUpForm } from "../model/use-sign-up-form";
import { UiLink } from "@/shared/ui/ui-link";

export function SignUpForm(){

    const{handleSubmit, isPanding,register,errorMessage}=useSignUpForm()

    return (
        <form className="flex flex-col gap-2" 
              onSubmit={handleSubmit}>


            <UiTextField label="Email"
             inputProps={{type:'email',...register('email',{required:true})}}
             />
            <UiTextField label="Password"
             inputProps={{type:'password',...register('password',{required:true})}}
             />
             <UiTextField label="Code Otp from Your email"
             inputProps={{type:'password',...register('codeOtp',{required:true})}}
             />



             {/* не находит signUpMutation.isLoading заменил пока на isPanding */}
            <UiButton disabled={isPanding} variant="primary">
                Sign Up
                </UiButton>

            <UiLink className="text-center" href={ROUTES.SIGN_IN}>
                Sign In
            </UiLink>

            {errorMessage&& <div className="text-rose-500">{errorMessage}</div>}

        </form>
    )
}