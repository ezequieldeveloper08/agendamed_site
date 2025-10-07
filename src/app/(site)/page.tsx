import { HomeFormSearch } from "./(components)/home-form-search";
import { HomeHeader } from "./(components)/home-header";
import { HomeMedicalSpecialties } from "./(components)/home-medical-specialties";
import { HomeProfessionals } from "./(components)/home-professionals";

export default function Home() {
  return (
    <div>
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-gray-50">
        <h1 className="text-6xl font-bold text-center text-gray-900">Encontre o médico ideal<br /><span className="text-primary">para você</span></h1>
        <span className="max-w-lg text-center text-lg font-normal text-gray-700">Conectamos você aos melhores profissionais de saúde da sua região. Agende consultas online de forma rápida e segura.</span>
        <HomeFormSearch />
      </div>
      <HomeProfessionals />
      <HomeMedicalSpecialties />
    </div>
  );
}
