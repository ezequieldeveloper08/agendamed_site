import { fetchGeneric } from "@/hooks/use-fetch";
import { EstabelecimentosContent } from "./components/content";
import { ILocation } from "@/types/user";

export default async function Page() {
    const {data} = await fetchGeneric<{data: Array<ILocation>, page: number, total: number, success: boolean}>({endpoint: 'locations'});

    return (
        <EstabelecimentosContent data={data} />
    )
}