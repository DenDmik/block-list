import { UiButton } from "@/shared/ui/ui-button"
import { UiTextField } from "@/shared/ui/ui-text-field"
import { ROUTES } from "@/shared/constants/routes";
import { useSignUpFormOtp } from "../model/use-otp";
import { UiLink } from "@/shared/ui/ui-link";

export function SignUpFormOtp(){

    const{handleSubmit, isPanding,register,errorMessage}=useSignUpFormOtp()

    return (
        <form className="flex flex-col gap-2" 
              onSubmit={handleSubmit}>


            <UiTextField label="Enter your Email end receive code Otp"
             inputProps={{type:'email',...register('email',{required:true})}}
             />
            <UiButton disabled={isPanding} variant="primary">
                Send Code Otp
                </UiButton>
            <UiLink className="text-center" href={ROUTES.SIGN_IN}>
            </UiLink>   


            {errorMessage&& <div className="text-rose-500">{errorMessage}</div>}

        </form>
    )
}