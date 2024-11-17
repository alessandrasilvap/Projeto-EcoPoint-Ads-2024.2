//Recupera o usuário logado do localStorage
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    //Verifica se o usuário logado existe
    if (usuarioLogado) {
        //Seleciona o elemento onde quer exibir o nome
        const nomenatela = document.getElementById('nomenatela');
        nomenatela.innerText = usuarioLogado.login;
        document.getElementById('user-info').style.display = 'block';
    }
});



//Função para alternar o menu
function toggleMenu() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}



//A função de logout agora remove o item usuarioLogado corretamente
function logout() {
    window.location.href = '../html/telainicial.html';
}



//A função authenticateUser agora cria um objeto de usuário antes de armazená-lo, para manter a estrutura do seu código.
//Função para autenticar o usuário
function authenticateUser(username) {
    const userObject = { login: username }; //Cria um objeto de usuário
    localStorage.setItem('usuarioLogado', JSON.stringify(userObject)); //Armazena no localStorage
    //Redirecione ou atualize a interface conforme necessário
}
