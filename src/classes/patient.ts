export type typeSexo = 'M' | 'F';

export class Patient {
    constructor(
        readonly name: string,
        readonly datanasc: Date,
        readonly cpf: string,
        readonly sexo: typeSexo,
        readonly telefone: string,
        readonly susCard: string
    ){}
}


