import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { salvarAtendente, salvarEnfermeiro, salvarPaciente, verificarLoginAtendente } from './salvarDadosNoBanco.js';
import { Database } from './database.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cadastroAtendente.html'));
});

app.post('/cadastrarPaciente', async (req, res) => {
    try {
        await salvarPaciente(req.body);
        res.status(201).send('Paciente salvo com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar no banco.');
    }
});

app.post('/cadastrarAtendente', async (req, res) => {
    try {
        await salvarAtendente(req.body);
        res.status(201).send('Atendente salvo com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar no banco.');
    }
});

app.post('/cadastrarEnfermeiro', async (req, res) => {
    try {
        await salvarEnfermeiro(req.body);
        res.status(201).send('Enfermeiro salvo com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar no banco.');
    }
});

app.post('/logarAtendente', async (req, res) => {
    try {
        const resultado = await verificarLoginAtendente(req.body);
        if(!!resultado){
            
        }
        console.log('Resultado do login:', resultado);
        res.json(resultado);
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ success: false });
    }
});

app.get('/logarAtendente', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/paginaAtendente.html'));
});

app.get('/logarEnfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/paginaEnfermeiro.html'));
});

app.get('/obterEnfermeiros', async (req, res) => {
    try {
        Database.connect();
        const enfermeiros = Database.queryMany<any>('SELECT * FROM Enfermeiro ORDER BY nome');
        res.send(enfermeiros);
        Database.disconnect();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter enfermeiros' });
    }
});

app.get('/obterPacientes', async (req, res) => {
    try {
        Database.connect();
        const pacientes = Database.queryMany<any>('SELECT * FROM Paciente ORDER BY nome');
        res.send(pacientes);
        Database.disconnect();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error ao obter pacientes' });
    }
});

app.get('/obterTriagens', async (req, res) => {
    try {
        Database.connect();
        const triagens = Database.queryMany<any>(`
            SELECT t.*, p.nome as paciente_nome, e.nome as enfermeiro_nome 
            FROM Triagem t
            JOIN Paciente p ON t.paciente_id = p.id_paciente
            LEFT JOIN Enfermeiro e ON t.enfermeiro_id = e.id_enfermeiro
            ORDER BY t.data_hora_triagem DESC
        `);
        console.log('Triagens obtidas:', triagens); // Adicione este log
        res.send(triagens);
        Database.disconnect();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter triagens' });
    }
});

app.post('/salvarTriagem', async (req, res) => {
    try {
        Database.connect();
        Database.queryNone(
            'INSERT INTO Triagem (enfermeiro_id, paciente_id, data_hora_triagem, sintomas, pressao, temperatura, frequencia_cardiaca, prioridade_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.enfermeiroId, req.body.pacienteId, req.body.dataHora, req.body.sintomas, req.body.pressao, req.body.temperatura, req.body.frequenciaCardiaca, req.body.prioridade]
        );
        res.status(201).json({ success: true });
        Database.disconnect();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro ao salvar triagem' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000: http://localhost:3000');
});