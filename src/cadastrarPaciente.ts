import { Patient } from "./classes/patient.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-paciente') as HTMLFormElement;
    const resultadoDiv = document.getElementById('resultado') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();


            // Coletar dados do formulário
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const nasc = (document.getElementById('nasc') as HTMLInputElement).value;
        const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
        const sexo = (document.querySelector('input[name="sexo"]:checked') as HTMLInputElement).value;
        const telefone = (document.getElementById('telefone') as HTMLInputElement).value;
        const susCard = (document.getElementById('sus_card') as HTMLInputElement).value;

            
        // Criar paciente
        const paciente = new Patient(
            nome, 
            nasc, 
            cpf, 
            sexo, 
            telefone, 
            susCard
        );

        const res = await fetch('/cadastrarPaciente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paciente)
        });

        // Mostrar confirmação
        resultadoDiv.innerHTML = `
        <div style="background-color: #e6f7e6; padding: 15px; border-radius: 8px; border-left: 5px solid #4CAF50;">
                <h3 style="margin-top: 0; color: #4CAF50;">Paciente cadastrado com sucesso!</h3>
                <p><strong>Nome:</strong> ${paciente.nome}</p>
                <p><strong>CPF:</strong> ${paciente.cpf}</p>
                <p><strong>Data de Nascimento:</strong> ${new Date(paciente.datanasc).toLocaleDateString('pt-BR')}</p>
                </div>
            `;

        // Limpar formulário
        form.reset();

        // Opcional: rolar até o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    });
});