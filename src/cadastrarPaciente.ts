import { Patient } from "./classes/patient.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-paciente') as HTMLFormElement;
    const resultadoDiv = document.getElementById('resultado') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const nasc = (document.getElementById('nasc') as HTMLInputElement).value;
        const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
        const sexo = (document.querySelector('input[name="sexo"]:checked') as HTMLInputElement).value;
        const telefone = (document.getElementById('telefone') as HTMLInputElement).value;
        const susCard = (document.getElementById('sus_card') as HTMLInputElement).value;

            
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

        form.reset();

        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    });
});