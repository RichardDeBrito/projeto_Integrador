import { Database } from "./database.js";

Database.connect();

Database.queryNone('INSERT INTO Paciente (nome, datanasc, cpf, sexo, telefone, sus_card) VALUES (?,?,?,?,?,?)', ['Richard', '03/10/2004', '07464198301', 'M', '86999614414', '238234'])

Database.disconnect();