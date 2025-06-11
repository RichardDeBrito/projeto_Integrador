export type typeSexo = 'M' | 'F';

export interface patient {
    name: string;
    datanasc: Date;
    cpf: string;
    sexo: typeSexo;
    telefone: string;
}

