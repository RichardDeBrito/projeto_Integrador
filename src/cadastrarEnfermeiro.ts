import { Nurse } from "./classes/nurse.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-atendente') as HTMLFormElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();


        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const coren = (document.getElementById('coren') as HTMLInputElement).value;

            
        const enfermeiro = new Nurse(
            nome, 
            coren,
        );

        const res = await fetch('/cadastrarPaciente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enfermeiro)
        });

        form.reset();
    });
});