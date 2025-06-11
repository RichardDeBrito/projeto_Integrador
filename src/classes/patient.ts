export type typeSexo = 'M' | 'F';

export interface patientI {
    name: string;
    datanasc: Date;
    cpf: string;
    sexo: typeSexo;
    telefone: string
}

