import { fetchGeneric } from "@/hooks/use-fetch";
import { ProfissionalForm } from "../../components/form";
import { IProfessional } from "@/types/user";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data } = await fetchGeneric<{ data: IProfessional, page: number, total: number, success: boolean }>({ endpoint: `professionals/${id}`, revalidate: 0 });


    return <ProfissionalForm data={data}/>
}