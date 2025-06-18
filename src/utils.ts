import { openDb } from "./database";

export async function verify(name: string, cpf: string ) {
    const db = await openDb();
    const valido = await db.run("SELECT nome, cpf from paciente where name=? and cpf=?", [name, cpf]);
    if(!valido) {
        return true;
    }
    return false;
}