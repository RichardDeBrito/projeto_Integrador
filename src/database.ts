import sqlite3 from "sqlite3";
import { open } from "sqlite";


export async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });    
}

export async function initDb() {
    const db = await openDb();
    await db.run('CREATE TABLE if not exists Paciente (paciente_id integer primary key AUTOINCREMENT, nome text not null, datanasc text not null, cpf text not null, sexo text not null, telefone text, sus_card text not null)');
}

console.log("teste")