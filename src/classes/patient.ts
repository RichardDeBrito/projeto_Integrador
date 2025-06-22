export class Patient {
    constructor(
        public nome: string,
        public datanasc: string,
        public cpf: string,
        public sexo: string,
        public telefone: string,
        public susCard: string
    ) {}

    toString(): string {
        return `${this.nome}, ${this.cpf}, ${this.datanasc}`;
    }
}