import { LayoutProvider } from "@/providers/layout-provider";
import { ProfessionalHeader } from "../(components)/professional-header";
import { cookies } from "next/headers";

export default async function Layoute({ children }) {
    const c = await cookies();
        const userData = c.get('agendamed.user');
    
        const user = userData?.value && JSON.parse(userData.value);

    return (
        <LayoutProvider user={user}>
            <div className="flex flex-col min-h-screen">
                <ProfessionalHeader />
                <div className="container mx-auto flex flex-col flex-1">
                    {children}
                </div>
            </div>
        </LayoutProvider>
    )
}