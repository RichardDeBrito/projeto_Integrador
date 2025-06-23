import { Doctor } from "./classes/doctor.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-atendente') as HTMLFormElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();


        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const crm = (document.getElementById('crm') as HTMLInputElement).value;

            
        const medico = new Doctor(
            nome, 
            crm,
        );

        const res = await fetch('/cadastrarMedico', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medico)
        });

        form.reset();
    });
});