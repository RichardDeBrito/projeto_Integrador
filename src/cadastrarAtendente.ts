import { Attendant } from "./classes/attendant.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-atendente') as HTMLFormElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();


            // Coletar dados do formulário
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const matricula = (document.getElementById('matricula') as HTMLInputElement).value;

            
        // Criar paciente
        const atendente = new Attendant(
            nome, 
            matricula,
        );

        const res = await fetch('/cadastrarPaciente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(atendente)
        });

        // Limpar formulário
        form.reset();
    });
});