import { Database } from "./database.js";

export async function salvarPaciente(dados: any): 
Promise<void> {
  // código para salvar dados no banco, exemplo:
  
  Database.connect()
  Database.queryNone('INSERT INTO Paciente (nome, datanasc, cpf, sexo, telefone, sus_card) VALUES (?,?,?,?,?,?)', [dados.nome, dados.nasc, dados.cpf, dados.sexo, dados.telefone, dados.sus_card]);

}

export async function salvarAtendente(dados: any): 
Promise<void> {
  // código para salvar dados no banco, exemplo:
  
  Database.connect()
  Database.queryNone('INSERT INTO Atendente (nome, matricula) VALUES (?,?)', [dados.nome, dados.matricula]);

}

export async function salvarEnfermeiro(dados: any): 
Promise<void> {
  // código para salvar dados no banco, exemplo:
  
  Database.connect()
  Database.queryNone('INSERT INTO Enfermeiro (nome, coren) VALUES (?,?)', [dados.nome, dados.coren]);

}

export async function verificarLoginAtendente(dados: any): Promise<{ success: boolean }> {
    Database.connect();
    try {
        const atendente = Database.queryOne<{ id: number }>(
            'SELECT id_atendente FROM Atendente WHERE nome = ? AND matricula = ?', 
            [dados.nome, dados.matricula]
        );

        console.log('Verificando login para:', dados);
        console.log('SQL sendo executado:', 'SELECT id_atendente FROM Atendente WHERE nome = ? AND matricula = ?', [dados.nome, dados.matricula]);
        
        return { success: !!atendente };
    } finally {
        Database.disconnect();
    }

    
}