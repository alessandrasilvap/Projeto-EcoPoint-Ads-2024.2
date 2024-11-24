document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});



function validarlogin() { //Essa função Verifca se os campos estão preenchidos ou não
    var usuario = document.getElementById('usuario').value; //".value" serve para armazenar os valores que vão ser inseridos no campo
    var senha = document.getElementById('senha').value;
    
    if (usuario === "" || senha === "") {
        alert('[ERRO] Usuário ou senha não preenchidos.')
        return false
    }
    return true; //Retorna True se os campos estão preenchidos
}



//Essa função pega os dados do input login e senha da tela de login;
function recuperarDados() {
    var campousuario = document.getElementById('usuario').value;
    var camposenha = document.getElementById('senha').value;

    /*Criei uma variável chamado usuarios, que está recebendo o valor do 
    LocalStorage.setItem, responsável por pegar os dados na página "testesalvardados"*/
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    /*Procurando o usuário que corresponde ao login e à senha. Para isso, criei uma variavel,
    onde coloquei o nome da variável que eu coloquei acima e '.find' para encontrar o objeto e as propriedades usuario e senha*/
    var usuarioEncontrado = usuarios.find(function(usuario) {
        return usuario.login === campousuario && usuario.senha === camposenha;
    });


    /*Aqui é um if básico, se os dados da variável acima forem encontrados, aparece o alerta de login bem sucedido
    e direciona para a tela sobre nós, caso não vai alertar que o usuário e a senha estão incorretos*/
    if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        alert('Login bem-sucedido!');
        window.location.href = "../html/telasobrenos.html";
    } else {
        alert('[ERRO]Usuário ou senha incorreto(a).');
    }
}



//Atualiza a função de login
function login() {
    if (!validarlogin()) return; //Verifica a validação antes de continuar
    recuperarDados();
}
