import { Database } from "./database.js";



export async function verificarLoginAtendente(dados: any): Promise<{ success: boolean }> {
    Database.connect();
    try {
        const atendente = Database.queryOne<{ id: number }>(
            'SELECT id_atendente FROM Atendente WHERE nome = ? AND matricula = ?', 
            [dados.nome, dados.matricula]
        );
        return { success: !!atendente };
    } finally {
        Database.disconnect();
    }
}

export async function verificarLoginEnfermeiro(dados: any): Promise<{ success: boolean }> {
    Database.connect();
    try {
        const enfermeiro = Database.queryOne<{ id: number }>(
            'SELECT id_enfermeiro FROM Enfermeiro WHERE nome = ? AND coren = ?', 
            [dados.nome, dados.coren]
        );
        return { success: !!enfermeiro };
    } finally {
        Database.disconnect();
    }
}

export async function verificarLoginMedico(dados: any): Promise<{ success: boolean }> {
    Database.connect();
    try {
        const medico = Database.queryOne<{ id: number }>(
            'SELECT id_medico FROM Medico WHERE nome = ? AND crm = ?', 
            [dados.nome, dados.crm]
        );
        return { success: !!medico };
    } finally {
        Database.disconnect();
    }
}

export async function verificarAdmin(dados: any): Promise<{ success: boolean }> {
    Database.connect();
    try {
        const admin = Database.queryOne<{ id: number }>(
            'SELECT id_admin FROM Admin WHERE usuario = ? AND senha = ?', 
            [dados.usuario, dados.senha]
        );
        return { success: !!admin };
    } finally {
        Database.disconnect();
    }
}

export async function salvarPaciente(dados: any): 
Promise<void> {
  
  Database.connect()
  Database.queryNone('INSERT INTO Paciente (nome, datanasc, cpf, sexo, telefone, sus_card) VALUES (?,?,?,?,?,?)', [dados.nome, dados.nasc, dados.cpf, dados.sexo, dados.telefone, dados.sus_card]);

}

export async function salvarAtendente(dados: any): 
Promise<void> {
  
  Database.connect()
  Database.queryNone('INSERT INTO Atendente (nome, matricula) VALUES (?,?)', [dados.nome, dados.matricula]);

}

export async function salvarMedico(dados: any): 
Promise<void> {
  
  Database.connect()
  Database.queryNone('INSERT INTO Medico (nome, crm) VALUES (?,?)', [dados.nome, dados.crm]);

}

export async function salvarEnfermeiro(dados: any): 
Promise<void> {
  
  Database.connect()
  Database.queryNone('INSERT INTO Enfermeiro (nome, coren) VALUES (?,?)', [dados.nome, dados.coren]);

}