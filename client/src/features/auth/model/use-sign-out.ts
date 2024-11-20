import { useResetSession } from "@/entiities/session/queries";
import { authControllerSignOut } from "@/shared/api/generated";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation,  } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useSignOut(){
// почему нельзя вызвать useResetSession() в onSuccess()?????
    const resetSession = useResetSession()
    const router = useRouter()
    const signOutMutation = useMutation({
        mutationFn: authControllerSignOut,
       async onSuccess() {
             router.push(ROUTES.SING_UP_OTP)
             resetSession()

        },
    })
    return{
        isPending:signOutMutation.isPending,
        signOut: signOutMutation.mutate
    }
}