document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado - script iniciado'); // Adicione este log
    
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const mensagemErro = document.getElementById('mensagem-erro') as HTMLDivElement;

    console.log('Elementos do formulário:', {loginForm, mensagemErro}); // Verifique se os elementos são encontrados

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const matricula = (document.getElementById('matricula') as HTMLInputElement).value;
        console.log('Dados do formulário:', {nome, matricula});

        try {
            const response = await fetch('/logarAtendente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, matricula })
            });

            const data = await response.json();
            
            if (data.success) {
                window.location.href = '/paginaAtendente.html';
            } else {
                alert('Credenciais inválidas');
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        }
    });
});