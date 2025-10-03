import { fetchGeneric } from "@/hooks/use-fetch"
import { IProfessional } from "@/types/user"
import { MedicosContent } from "./components/content";

export default async function MedicosPage() {
  const {data} = await fetchGeneric<{data: Array<IProfessional>, page: number, total: number, success: boolean}>({endpoint: 'professionals', revalidate: 0});

  return <MedicosContent professionals={data} />
}
