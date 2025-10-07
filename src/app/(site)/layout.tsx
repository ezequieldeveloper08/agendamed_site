import { LayoutProvider } from "@/providers/layout-provider";
import { HomeFooter } from "./(components)/home-footer";
import { HomeHeader } from "./(components)/home-header";
import { cookies } from "next/headers";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const c = await cookies();
    const userData = c.get('agendamed.user');

    const user = userData?.value && JSON.parse(userData.value);


    return (
        <LayoutProvider user={user}>
            <div className="flex flex-col min-h-screen">
                <HomeHeader />
                <div className="flex-1 flex flex-col">
                    {children}
                </div>
                <HomeFooter />
            </div>
        </LayoutProvider>
    );
} 