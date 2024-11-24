//'$startGameButton' está sendo usado quando uma variavel é criada com um elemento que já exista no html
const $startGameButton = document.querySelector('.start-quiz');
const $questionsContainer = document.querySelector('.questions-container');
const $answersContainer = document.querySelector('.answers-container');
const $questionText = document.querySelector('.question');
const $nextQuestionButton = document.querySelector('.next-questin');


$startGameButton.addEventListener('click', startGame); //Ao cliclar no botão será rodado a função startGame()
$nextQuestionButton.addEventListener('click', displayNextQuestion); //Ao cliclar no botão será rodado a função displayNextQuestion()


let currentQuestionIndex = 0
let totalCorrect = 0



function startGame() {
    $startGameButton.classList.add('hide'); //A função vai fazer com que o botão desapareça adicionando o 'hide'
    $questionsContainer.classList.remove('hide'); //A função vai fazer com que o botão apareça removendo o 'hide'
    displayNextQuestion(); //Depois a função 'displayNextQuestion()' é criada
}



function displayNextQuestion() { //Função criada para que as perguntas apareçam
    resetState(); //Chama a função que reseta as questões

    if (questions.length === currentQuestionIndex) { //Comando de condição para saber se foram todas as questões
        //SE o número de questões(1 a 12) for igual ao número de indice(0 a 11) a função 'finishGame()' é retornada
        return finishGame(); 
    }

    //Mostrará as perguntas começando com índice 0(primeira pergunta) usando variavel 'currentQuestionIndex'
    $questionText.textContent = questions[currentQuestionIndex].question;

    //Mostrará as respostas começando pelo índice 0 usando a variavel 'currentQuestionIndex'
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement('button'); //Criando um elemento button
        //Adicionando as duas classes existentes do codigo html dos botões de respostas, nessa nova variavel
        newAnswer.classList.add('button', 'answer'); 
        newAnswer.textContent = answer.text //Adicinando os textos das respostas

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
            /*Nesse comando está enviando uma informação para o botão, para caso seja o botão correto adiciona 
            nele 'correct = true' para poder recuperar essa informação depois, para saber se o usuario acertou 
            ou não a resposta*/
        }
        $answersContainer.appendChild(newAnswer); //Adicionando um elemento filho na variavel
        /*Após esses comandos ao ir na página criada e clicar em F12 poderá visualizar que dentro do button 
        com a resposta correnta está escrito 'data-correct='true'' como desejamos*/

        newAnswer.addEventListener('click', selectAnswer); /*Adicionando um ouvidor de eventos do tipo click 
        para quando clicar nas respoastas a função 'selectAnswer' ser chamada*/
    });
}



function resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }
    /*É usado o comando de repetição 'While', onde na variavel '$answerContainer' é verificada se existe algum 
    'elemento filho' que é o div com os botões respostas no código inicial do html*/
    //Dessa maneira se ele tiver o elemento filho dentro dele ele será removido


    document.body.removeAttribute('class'); //Remove a cor quando passa para a próxima pergunta
    $nextQuestionButton.classList.add('hide'); 
    //Adiciona o 'hide' para que o botão 'Próxima pergunta' suma quando vai para a próxima questão
}



function selectAnswer(event) {
    const answerClicked = event.target;
    /*console.log(event.target); Com esse comando ao usuário clicar em alguma das respostas no console da 
    pagina aparecerá a resposta clicada, ou seja, será salvo a resposta dada*/

    if (answerClicked.dataset.correct) { //SE ele clicou na resposta correta
        //document.body.classList.add('correct');
        //Adiciona um novo elmento para mudar a cor no body qundo estiver correta, toda a tela fica verde
        totalCorrect++; 
        //Esta sendo incrementado a quantidade de questões que o usuário acertou que começou com 0
    } else { //SENÃO
        //document.body.classList.add('incorrect');
        //Adiciona um novo elmento para mudar a cor no body qundo estiver incorreta, a tela fica vermelho
    }

    document.querySelectorAll('.answer').forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
            //Adiciona um elmento para mudar a cor do botão com a resposta correta, o botão fica verde
        } else {
            button.classList.add('incorrect');
            //Adiciona um elmento para mudar a cor do botão com a resposta correta, o botão fica vermelho
        }

        button.disabled = true; //Faz com que não permita o usuário clicar em outro botão após sua escolha.
    });

    $nextQuestionButton.classList.remove('hide'); //É uma função que remove a classe 'hide'
    //Incrementa a variável, isso significa que a variável será aumentada para o próximo valor
    currentQuestionIndex ++;
}



function finishGame() {
    const totalQuestion = questions.length; //É uma variável que armazena um array de perguntas
    //'Math.floor' é uma função que retorna o valor mais próximo inteiro abaixo do valor passado
    const performance = Math.floor(totalCorrect * 100 / totalQuestion);

    let message = '';

    switch (true) {
        case (performance < 33):
            message = 'Iniciante: você está começando a explorar o mundo da reciclagem! Sabia que reciclagem foi assunto no Enem? É um assunto importante e você vai descobrir coisas incríveis no Eco Point! Cadastre-se ou entre com sua conta em nosso site para saber mais.';
            break;
        case (performance < 67):
            message = 'Intermediário: você está fazendo um ótimo trabalho, mas que tal aumentar o seu repertório sobre reciclagem eletrônica? Você vai aprender coisas novas e interessantes! Cadastre-se ou entre com sua conta em nosso site para saber mais.';
            break;
        case (performance >= 67):
            message = 'Especialista: você é um verdadeiro especialista em reciclagem eletrônica! Que tal saber mais sobre como descartar os resíduos eletrônicos corretamente? Você vai aprender coisas incríveis e poderá ajudar a proteger o meio ambiente! Cadastre-se ou entre com sua conta em nosso site para saber mais.';
            break;
        default:
            message = 'Erro';
            break;
    }

    $questionsContainer.innerHTML = '<p class="final-message">Você acertou ' + totalCorrect + ' de ' + totalQuestion + ' questões! <br> <span>' + message + ' </span></p><button class="button" onclick=window.location.reload()> Refazer teste </button>';
}










//Tipo de banco de dados das perguntas e respostas
const questions = [
    {
        question: 'Qual é o principal objetivo da reciclagem eletrônica?',
        answers: [
            { text: 'Reduzir custos de produção', correct: false},
            { text: 'Conservar recursos naturais e reduzir resíduos', correct: true},
            { text: 'Aumentar a vida útil dos produtos', correct: false},
            { text: 'Reduzir a dependência de recursos não renováveis', correct: false}
        ]
    },
    {
        question: 'Qual é o nome da diretiva da União Europeia que regula a reciclagem de equipamentos elétricos e eletrônicos?',
        answers: [
            { text: 'WEEE', correct: true},
            { text: 'RoHS', correct: false},
            { text: 'REACH', correct: false},
            { text: 'EEE', correct: false}
        ]
    },
    {
        question: 'Quais são os principais componentes tóxicos encontrados em equipamentos eletrônicos?',
        answers: [
            { text: 'Plástico, vidro e madeira', correct: false},
            { text: 'Cobre, alumínio e ferro', correct: false},
            { text: 'Chumbo, mercúrio e cádmio', correct: true},
            { text: 'Estanho, prata e ouro', correct: false}
        ]
    },
    {
        question: 'Qual é o processo de reciclagem que envolve a separação de materiais por densidade?',
        answers: [
            { text: 'Triagem', correct: true},
            { text: 'Fragmentação', correct: false}, 
            { text: 'Flutuação', correct: false},
            { text: 'Classificação por tamanho', correct: false}
        ]
    },
    {
        question: 'Qual é o tipo de resíduo eletrônico mais comum?',
        answers: [
            { text: 'Monitores', correct: false},
            { text: 'Computadores', correct: false},
            { text: 'Televisores', correct: false},
            { text: 'Telefones celulares', correct: true}
        ]
    },
    {
        question: 'Qual é o país com a maior quantidade de resíduos eletrônicos no mundo?',
        answers: [
            { text: 'Índia', correct: false},
            { text: 'Estados Unidos', correct: false},
            { text: 'China', correct: true}, 
            { text: 'Japão', correct: false}
        ]
    },
    {
        question: 'Qual é o termo técnico para a reciclagem de materiais eletrônicos por meio da aplicação de calor e pressão?',
        answers: [
            { text: 'Pirometálurgia', correct: true},
            { text: 'Hidrometálurgia', correct: false},
            { text: 'Eletrometálurgia', correct: false},
            { text: 'Siderurgia', correct: false}
        ]
    },
    {
        question: 'Qual é o nome do protocolo internacional que visa reduzir a produção de resíduos eletrônicos?',
        answers: [
            { text: 'Acordo de Paris', correct: false},
            { text: 'Convenção de Estocolmo', correct: false},
            { text: 'Protocolo de Basileia', correct: true},
            { text: 'Convenção de Genebra', correct: false}
        ]
    },
    {
        question: 'Qual é o processo mais comum utilizado para reciclar metais pesados em equipamentos eletrônicos?',
        answers: [
            { text: 'Fusão', correct: false},
            { text: 'Eletrolise', correct: false},
            { text: 'Separação magnética', correct: true},
            { text: 'Extração química', correct: false}
        ]
    },
    {
        question: 'Quais são os dois países que mais reciclam lixo eletrônico?',
        answers: [
            { text: 'Islândia e Suéci', correct: true},
            { text: 'China e EUA', correct: false},
            { text: 'Brasil e Japão', correct: false},
            { text: 'Canadá e Austrália', correct: false}
        ]
    },
    {
        question: 'Qual é o benefício da reciclagem eletrônica em relação à criação de empregos?',
        answers: [
            { text: 'Melhora a eficiência energética', correct: false},
            { text: 'Reduz a necessidade de mão de obra', correct: false},
            { text: 'Aumenta a automação', correct: false},
            { text: 'Gera empregos em diversas áreas', correct: true}
        ]
    },
    {
        question: 'Qual é o impacto ambiental do descarte inadequado de pilhas e baterias?',
        answers: [
            { text: 'Contaminação do solo e da água', correct: true},
            { text: 'Aquecimento global', correct: false},
            { text: 'Perda de biodiversidade', correct: false},
            { text: 'Alteração do ciclo de nutrientes', correct: false}
        ]
    }
]
