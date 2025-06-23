document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado - script iniciado'); // Adicione este log
    
    const loginForm = document.getElementById('login-Medicoform') as HTMLFormElement;
    const mensagemErro = document.getElementById('mensagem-erro') as HTMLDivElement;

    console.log('Elementos do formulário:', {loginForm, mensagemErro}); // Verifique se os elementos são encontrados

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const crm = (document.getElementById('crm') as HTMLInputElement).value;
        console.log('Dados do formulário:', {nome, crm});

        try {
            const response = await fetch('/logarMedico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, crm })
            });

            const data = await response.json();
            
            if (data.success) {
                window.location.href = '/paginaMedico.html';
            } else {
                alert('Credenciais inválidas');
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        }
    });
});