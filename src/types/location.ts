export enum LocationType {
  hospital = "Hospital",
  clinica = "Clínica",
  laboratorio = "Laboratório",
  consultorio = "Consultório",
  prontoSocorro = "Pronto-Socorro",
  postoSaude = "Posto de Saúde",
  centroDiagnostico = "Centro de Diagnóstico",
  unidadeBasicaSaude = "Unidade Básica de Saúde",
  policlinica = "Policlínica",
  outro = "Outro",
}

export interface Location {
  id: string
  name: string
  description?: string
  images?: string[]
  type?: LocationType
  createdAt: Date
  updatedAt: Date
}
