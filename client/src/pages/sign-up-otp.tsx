import { SignUpFormOtp } from "@/features/auth/ui/singn-up-otp-form";

import { UiFormPageLayout } from "@/shared/ui/layouts/ui-form-page-layout";
import { UiHeader } from "@/shared/ui/ui-header";

export function SignUpOtpPage(){

    return (
        <UiFormPageLayout
        title="Send Code Otp"
        header={<UiHeader/>}
        form = {<SignUpFormOtp/>}
         />

    )

}