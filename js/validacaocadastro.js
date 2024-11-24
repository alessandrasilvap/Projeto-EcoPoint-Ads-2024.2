/*Essa função faz com que cada usuário tenha um id único ao se cadastrar, não vou saber
explicar com detalhes*/
function generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
       var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
       return uuid.toString(16);
    });
}



/*Essa função é responsável por salvar os dados do campo usuário e campo senha*/
/*Criei uma variavel chamada usuario e senha, e peguei os elementos do campo de usuario, senha e email, no html e seus valores*/
function SalvarDados() {
    var usuario = document.getElementById('campousuario').value;
    var senha = document.getElementById('camposenha').value;
    var email = document.getElementById('inserirEmail').value;

    // Quando a gente coloca o JSON.parse é para converter uma string em um objeto.
    /*Criei uma variável chamada usuarios e coloquei um JSON.parse para que, toda vez que criar um novo usuário
    o JSON converter o objeto "novoUsuário" em uma string, pq se não converter, dá erro pra acessar as propriedades login, senha e email
    daí junto com o JSON tem o sinal de "||" que significa "ou" e ao lado tem o "[]" que se chama Array*/
    //Array é uma estrutura que serve pra armazenar qualquer tipo de dado, e abaixo o array está vazio
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    //Criei um objeto com os dados abaixo, e chamando a funçao acima no id. Assim, cada novoUsuario (que é um objeto) vai ter seus próprios dados
    var novoUsuario = {
        id: generate_uuidv4(), //Chama primeira função que eu expliquei acima
        login: usuario,
        senha: senha,
        email: email
    };

    //Aqui a gente pega a variável (usuarios) e Adiciona o novo usuário (objeto) ao array
    usuarios.push(novoUsuario);


    //Depois que puxamos os novos dados, a gente usa o localStorage.setItem para salvar os novos dados no array, dentro do localstorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    //E aqui, aparece uma mensagem no console (apertando f12 aparece aquela janela de inspecionar, e lá na aba "console" aparece a mensagem abaixo)
    console.log(usuarios)
    console.log('Dados salvos');

    alert('Cadastro realizado com sucesso!')
}



//Validando todos os campos para serem preenchidos
function validarcadastro(event) {
    event.preventDefault(); //Impede que o formulário seja enviado, caso esteja fora do padrão
    var nomecompleto = document.getElementById('nomecompleto').value;
    var datanascimento = document.getElementById('datanascimento').value;
    var genero = document.getElementById('genero').value;
    var usuario = document.getElementById('campousuario').value;
    var senha = document.getElementById('camposenha').value;
    var confirmasenha = document.getElementById('confirmasenha').value;
    var cep = document.getElementById('cep').value;
    var num = document.getElementById('num').value;
    var tel = document.getElementById('tel').value;
    var cpf = document.getElementById('cpf').value;
    var Inseriremail = document.getElementById('inserirEmail').value;


    //Impedindo que o formulário seja enviado com campos em branco
    if (nomecompleto === '' || datanascimento === '' || genero === '' || senha === '' || confirmasenha === '' || usuario === '' || cep === '' || num === '' || tel === '' || cpf === '' || Inseriremail === ''){
        alert('[ERRO] Os campos são obrigatórios, por favor não deixe de preencher.')
        return false;
    }

    //Validando se as duas senhas estão iguais
    if (senha !== confirmasenha){
        alert('[ERRO] As senhas não coincidem.')
        return false;
    }

    //Não deixa passar a validação do CPF
    if (!validarCPF(cpf)) {
        return false;
    }

    //aqui a gente chama a função acima, mas só se os dados forem devidamente validados.
    SalvarDados();

    window.location.href="../html/telalogin.html"
}



//Formato XXXXX-XXX do CEP
function formatarCEP(input) {
    let cep = input.value.replace(/\D/g, ''); //Remove caracteres não numéricos

    if (cep.length > 8) { //Verifica se o CEP tem 8 dígitos
        cep = cep.slice(0, 8);
    }
    if (cep.length > 5) { //Adiciona o hífen
        cep = cep.slice(0, 5) + '-' + cep.slice(5); //'.slice' é usado para extrair uma parte de uma string ou de um array e retorná-la como uma nova string
    }
    input.value = cep;
}



document.getElementById('buscar').addEventListener('click', function() {

    const cep = document.getElementById('cep').value;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            alert('CEP não encontrado.');
            return;
        }
        document.querySelector('input#rua').value = data.logradouro;
        document.querySelector('input#bairro').value = data.bairro;
        document.querySelector('input#cidade').value = data.localidade;
    })

    .catch(error => {
        alert('Erro ao buscar o CEP.');
        console.error('Erro:', error);
    });
});



document.getElementById('buscar').addEventListener('click', function() {
document.getElementById('rua').textContent = '';
document.getElementById('bairro').textContent = '';
document.getElementById('cidade').textContent = '';
});



//Formato (XX) XXXXX-XXXX do TELEFONE
function formatarTEL(input){
    let tel = input.value.replace(/\D/g, ''); //Remove caracteres não numéricos

    if (tel.length > 11) { //Verifica se o TEL tem 11 dígitos
        tel = tel.slice(0, 11);
    }
    if (tel.length === 11) { //Adiciona os parenteses e o hífen
        tel = `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7)}`;
    } else if (tel.length === 10) {
        tel = `(${tel.slice(0, 2)}) ${tele.slice(2, 6)}-${tele.slice(6)}`;
    }
    input.value = tel;
}



//Validando o CPF com o digito verificador
function validarCPF(cpf) {
    /*O código implementa o algorito de validação de CPF definido pela Receita Federal
    O calculo do primeiro dígito verificar(dv1):
    -Multiplica os primeiros 9 dígitos do CPF por pesos decrescente de 10 a 2;
    -Calcula o resto da divisão da soma pelo número 11;
    -Se o resto for 10 ou 11, o dv1 é 0; caso contrário, é o próprio resto.
    O calculo do segundo dígito verificador(dv2):
    -Multiplica os primeiros 9 dígitos do CPF por pesos decrescente de 11 a 2, incluindo o dv1;
    -Calcula o resto da divisão da soma pelo número 11;
    -Se o resto for 10 ou 11, o dv2 é 0; caso contrário, é o próprio resto.
    O código verifica se os 2 dígitos verificadores calculados correspondem aos 2 últimos dígitos do CPF informado, Se correspondem, o CPF é considerado válido.*/

    soma = 0;
    soma += cpf[0] * 10;
    soma += cpf[1] * 9;
    soma += cpf[2] * 8;
    soma += cpf[3] * 7;
    soma += cpf[4] * 6;
    soma += cpf[5] * 5;
    soma += cpf[6] * 4;
    soma += cpf[7] * 3;
    soma += cpf[8] * 2;
    soma = (soma * 10) % 11;
    if (soma == 10 || soma == 11) soma = 0;
    if (soma != cpf[9]) {
      alert('[ERRO] CPF inválido!');
      return false;
    }

    soma = 0;
    soma += cpf[0] * 11;
    soma += cpf[1] * 10;
    soma += cpf[2] * 9;
    soma += cpf[3] * 8;
    soma += cpf[4] * 7;
    soma += cpf[5] * 6;
    soma += cpf[6] * 5;
    soma += cpf[7] * 4;
    soma += cpf[8] * 3;
    soma += cpf[9] * 2;
    soma = (soma * 10) % 11;
    if (soma == 10 || soma == 11) soma = 0;
    if (soma != cpf[10]) {
      alert('[ERRO] CPF inválido!');
      return false;
    }
    return true;
}



//Formato exemplo@email.com do E-mail
function validarEmail(input) {
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(input);
/*expressão regular  
- ^ : início da string
- [a-zA-Z0-9._%+-]+ : caracteres permitidos antes do @ (letras, números, ., _, %, +, -)
- @ : símbolo @
- [a-zA-Z0-9.-]+ : caracteres permitidos após o @ (letras, números, ., -)
- \. : ponto antes da extensão
- [a-zA-Z]{2,} : extensão do domínio (letras, mínimo 2 caracteres)
- $ : fim da string*/
}



//Restrição de idade
function validarIdade(dataNascimento) {
    var data = new Date(dataNascimento); //A data de nascimento é convertida para um objeto
    var dataAtual = new Date(); //Uma nova instância de Date é criada para obter a data atual
    var anoAtual = dataAtual.getFullYear(); //O ano atual é extraído da data atual usando o método 'getFullYear()'
    var anoNascimento = data.getFullYear();
    
    var idade = anoAtual - anoNascimento; //A idade é calculada subtraindo o ano de nascimento do ano atual.
    
    if (idade < 12) {
      alert("Você deve ter pelo menos 10 anos para continuar.");
      document.getElementById("datanascimento").value = ""; // Limpa o campo
      return false;
    } else {
      return true;
    }
}
