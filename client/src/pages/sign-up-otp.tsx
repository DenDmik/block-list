import { SignUpFormOtp } from "@/features/auth/ui/singn-up-otp-form";

import { UiHeader2 } from "@/shared/ui/2ui-header";
import { UiFormPageLayout } from "@/shared/ui/layouts/ui-form-page-layout";
import { UiHeader } from "@/shared/ui/ui-header";

export function SignUpPage(){

    return (
        <UiFormPageLayout
        title="Sign Up"
        header={<UiHeader2/>}
        form = {<SignUpFormOtp/>}
         />

    )

}