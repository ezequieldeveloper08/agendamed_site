export const professions = [
  {
    value: "medico",
    label: "Médico",
    council: "CRM",
    placeholder: "CRM/SP 123456",
  },
  {
    value: "dentista",
    label: "Dentista",
    council: "CRO",
    placeholder: "CRO/SP 12345",
  },
  {
    value: "nutricionista",
    label: "Nutricionista",
    council: "CRN",
    placeholder: "CRN-3 12345",
  },
  {
    value: "psicologo",
    label: "Psicólogo",
    council: "CRP",
    placeholder: "CRP 06/123456",
  },
  {
    value: "enfermeiro",
    label: "Enfermeiro",
    council: "COREN",
    placeholder: "COREN-SP 123456",
  },
  {
    value: "fisioterapeuta",
    label: "Fisioterapeuta",
    council: "CREFITO",
    placeholder: "CREFITO-3 123456-F",
  },
  {
    value: "farmaceutico",
    label: "Farmacêutico",
    council: "CRF",
    placeholder: "CRF-SP 12345",
  },
]

export const specialtiesByProfession = {
  medico: [
    "Cardiologia",
    "Dermatologia",
    "Endocrinologia",
    "Gastroenterologia",
    "Ginecologia",
    "Neurologia",
    "Oftalmologia",
    "Ortopedia",
    "Pediatria",
    "Psiquiatria",
    "Urologia",
    "Clínico Geral",
  ],
  dentista: [
    "Ortodontia",
    "Endodontia",
    "Periodontia",
    "Implantodontia",
    "Odontopediatria",
    "Cirurgia Oral",
    "Estética Dental",
    "Prótese Dentária",
    "Dentística",
    "Radiologia Odontológica",
  ],
  nutricionista: [
    "Nutrição Clínica",
    "Nutrição Esportiva",
    "Nutrição Materno-Infantil",
    "Nutrição Geriátrica",
    "Nutrição Oncológica",
    "Nutrição Comportamental",
    "Nutrição Funcional",
    "Nutrição Vegana/Vegetariana",
  ],
  psicologo: [
    "Psicologia Clínica",
    "Psicologia Cognitivo-Comportamental",
    "Psicanálise",
    "Psicologia Infantil",
    "Psicologia do Casal",
    "Psicologia Organizacional",
    "Neuropsicologia",
    "Psicologia Social",
  ],
  enfermeiro: [
    "Enfermagem Geral",
    "UTI",
    "Emergência",
    "Pediatria",
    "Obstetrícia",
    "Saúde Mental",
    "Geriatria",
    "Home Care",
  ],
  fisioterapeuta: [
    "Fisioterapia Ortopédica",
    "Fisioterapia Neurológica",
    "Fisioterapia Respiratória",
    "Fisioterapia Esportiva",
    "Fisioterapia Pediátrica",
    "Fisioterapia Geriátrica",
    "Fisioterapia Aquática",
    "RPG",
  ],
  farmaceutico: [
    "Farmácia Clínica",
    "Farmácia Hospitalar",
    "Análises Clínicas",
    "Farmácia Estética",
    "Homeopatia",
    "Manipulação",
    "Farmácia Popular",
    "Vigilância Sanitária",
  ],
}

export enum ProfessionalType {
  medico = "Médico",
  dentista = "Dentista",
  nutricionista = "Nutricionista",
  psicologo = "Psicólogo",
  enfermeiro = "Enfermeiro",
  fisioterapeuta = "Fisioterapeuta",
  farmaceutico = "Farmacêutico",
}

export interface Professional {
  id: string
  type: ProfessionalType
  specialties?: string[]
  agreements?: string[]
  name: string
  cost: number
  description: string
  bio: string
  avatar?: string
  cellphone?: string
  document?: string
}
