import { fetchGeneric } from "@/hooks/use-fetch";
import { EstabelecimentoForm } from "../../components/form";
import { ILocation } from "@/types/user";

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const {data} = await fetchGeneric<{data: ILocation, page: number, total: number, success: boolean}>({endpoint: `locations/${id}`, revalidate: 0});

    return <EstabelecimentoForm data={data} />
}