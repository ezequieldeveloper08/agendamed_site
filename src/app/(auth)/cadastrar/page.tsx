import { CreateAccountForm } from "@/components/forms/create-account-form"

export default function LoginPage() {
  return (
    <div className="bg-gray-50 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <CreateAccountForm />
      </div>
    </div>
  )
}
