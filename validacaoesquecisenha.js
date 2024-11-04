//Essa função pega os dados do input login e senha da tela de login;
function recuperarSenha() {
    var email_esquecisenha = document.getElementById('email_esquecisenha').value
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


    /*Procurando o usuário que corresponde ao login e à senha. Para isso, criei uma variavel,
    daí coloquei o nome da variável que eu coloquei acima e '.find' para encontrar o objeto e as propriedades usuario e senha*/
    var emailEncontrado = usuarios.find(function(usuario) {
        return usuario.email === email_esquecisenha
    });


    /*Aqui é um if básico, se os dados da variável acima forem encontrados, aparece o alerta de login bem sucedido
    e direciona para a tela sobre nós, caso não vai alertar que o usuário e a senha estão incorretos*/
    if (emailEncontrado) {
        localStorage.setItem('emailLogado', JSON.stringify(emailEncontrado));
        alert('Um link de instruções foi encaminhado para o seu e-mail. Não esqueça de verificar sua caixa de spam.');
        document.getElementById('email_esquecisenha').value = ''
        document.getElementById('confirmaemail_esquecisenha').value = ''
    } else {
        alert('[ERRO] E-mail não encontrado. Por favor, verifique os dados inseridos');
        return false;
    }
}
