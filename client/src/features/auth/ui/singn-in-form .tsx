import { UiButton } from "@/shared/ui/ui-button"
import { UiTextField } from "@/shared/ui/ui-text-field"
import { ROUTES } from "@/shared/constants/routes";
import { useSignInForm } from "../model/use-sign-in-form ";
import { UiLink } from "@/shared/ui/ui-link";

export function SignInForm(){

    const{handleSubmit, isPanding,register,errorMessage}=useSignInForm()

    return (
        <form className="flex flex-col gap-2" 
              onSubmit={handleSubmit}>


            <UiTextField label="Email"
             inputProps={{type:'email',...register('email',{required:true})}}
             />
            <UiTextField label="Password"
             inputProps={{type:'password',...register('password',{required:true})}}
             />
             {/* не находит signUpMutation.isLoading заменил пока на isPanding */}
            <UiButton disabled={isPanding} variant="primary">
                Sign In
            </UiButton>

            <UiLink className="text-center" href={ROUTES.SIGN_UP}>
                Sign Up
            </UiLink>

            {errorMessage&& <div className="text-rose-500">{errorMessage}</div>}

        </form>
    )
}