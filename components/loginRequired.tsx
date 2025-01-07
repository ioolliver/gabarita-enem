import { LoginButton } from "./loginButton";

export function LoginRequired() {
    return (
        <div className="flex p-16 w-full flex-col items-center gap-8">
            <p>Para usar essa função, faça login com o Google. É rápido!</p>
            <LoginButton />
        </div>
    )
}