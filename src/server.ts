import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { salvarAtendente, salvarEnfermeiro, salvarPaciente, verificarLoginAtendente, salvarMedico, verificarLoginEnfermeiro, verificarLoginMedico } from './salvarDadosNoBanco.js';
import { Database } from './database.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/cadastroAtendente.html'));
});

// Rotas de login
app.get('/logarAtendente', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/paginaAtendente.html'));
});

app.get('/logarEnfermeiro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/paginaEnfermeiro.html'));
});

app.get('/logarMedico', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/paginaMedico.html'))
});

// Rotas de cadastro protegidas por verificação de admin
app.post('/cadastrarPaciente', async (req: Request, res: Response) => {
    try {
        await salvarPaciente(req.body);
        res.status(201).json({ success: true, message: 'Paciente salvo com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao salvar no banco.' });
    }
});

app.post('/cadastrarAtendente', async (req: Request, res: Response) => {
    try {
        await salvarAtendente(req.body);
        res.status(201).json({ success: true, message: 'Atendente salvo com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao salvar no banco.' });
    }
});

app.post('/cadastrarEnfermeiro', async (req: Request, res: Response) => {
    try {
        await salvarEnfermeiro(req.body);
        res.status(201).json({ success: true, message: 'Enfermeiro salvo com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao salvar no banco.' });
    }
});

app.post('/cadastrarMedico', async (req: Request, res: Response) => {
    try {
        await salvarMedico(req.body);
        res.status(201).json({ success: true, message: 'Médico salvo com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao salvar no banco.' });
    }
});

// Rotas para páginas após login
app.get('/paginaAtendente', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/paginaAtendente.html'));
});

app.get('/paginaEnfermeiro', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/paginaEnfermeiro.html'));
});

app.get('/paginaMedico', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/paginaMedico.html'));
});

// Rotas para obter dados
app.get('/obterEnfermeiros', async (req: Request, res: Response) => {
    try {
        await Database.connect();
        const enfermeiros = await Database.queryMany<any>('SELECT * FROM Enfermeiro ORDER BY nome');
        res.json(enfermeiros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter enfermeiros' });
    } finally {
        await Database.disconnect();
    }
});

app.get('/obterPacientes', async (req: Request, res: Response) => {
    try {
        await Database.connect();
        const pacientes = await Database.queryMany<any>('SELECT * FROM Paciente ORDER BY nome');
        res.json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter pacientes' });
    } finally {
        await Database.disconnect();
    }
});

app.get('/obterTriagens', async (req: Request, res: Response) => {
    try {
        await Database.connect();
        const triagens = await Database.queryMany<any>(`
            SELECT t.*, p.nome as paciente_nome, e.nome as enfermeiro_nome 
            FROM Triagem t
            JOIN Paciente p ON t.paciente_id = p.id_paciente
            LEFT JOIN Enfermeiro e ON t.enfermeiro_id = e.id_enfermeiro
            ORDER BY t.data_hora_triagem DESC
        `);
        res.json(triagens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter triagens' });
    } finally {
        await Database.disconnect();
    }
});

// Rotas para operações de atendimento
app.post('/iniciarAtendimento', async (req: Request, res: Response) => {
    try {
        await Database.connect();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro ao iniciar atendimento' });
    } finally {
        await Database.disconnect();
    }
});

app.post('/salvarTriagem', async (req: Request, res: Response) => {
    try {
        await Database.connect();
        await Database.queryNone(
            'INSERT INTO Triagem (enfermeiro_id, paciente_id, data_hora_triagem, sintomas, pressao, temperatura, frequencia_cardiaca, prioridade_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.enfermeiroId, req.body.pacienteId, req.body.dataHora, req.body.sintomas, req.body.pressao, req.body.temperatura, req.body.frequenciaCardiaca, req.body.prioridade]
        );
        res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro ao salvar triagem' });
    } finally {
        await Database.disconnect();
    }
});

app.post('/concluirAtendimento', async (req: Request, res: Response) => {
    try {
        await Database.connect();
        const { triagemId } = req.body;
        
        await Database.queryNone(
            'DELETE FROM Triagem WHERE id_triagem = ?',
            [triagemId]
        );
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erro ao concluir atendimento' });
    } finally {
        await Database.disconnect();
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000: http://localhost:3000');
});