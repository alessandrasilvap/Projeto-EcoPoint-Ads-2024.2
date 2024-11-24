//Código JavaScript para o painel de acessibilidade
let menuVisible = false;
let fonteGrande = false;
let fundoEscuro = false;
let utterance = null;  //Variável para armazenar a utterance de leitura

//Função para mostrar/ocultar o painel de acessibilidade
function toggleAcessMenu() {
  menuVisible = !menuVisible;
  const painel = document.getElementById('painel-acessibilidade');
  painel.style.display = menuVisible ? 'block' : 'none';
}



//Para aumentar e diminuir a fonte
document.getElementById('increaseFont').addEventListener('click', function() {
  //Seleciona o elemento que contém o conteúdo cujo tamanho de fonte será alterado
  var content = document.querySelector('.conteudo');
    
  //Obtém o tamanho atual da fonte em pixels
  var currentFontSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
  currentFontSize = parseInt(currentFontSize); //Converte o valor para inteiro

  // Define o tamanho máximo permitido (em px)
  var maxFontSize = 34;
  
  // Verifica se o tamanho atual é menor que o máximo permitido
  if (currentFontSize < maxFontSize) {
    // Aumenta o tamanho da fonte em 2px
    content.style.fontSize = (currentFontSize + 2) + 'px';
    // Ajusta o tamanho da caixa
    content.style.height = content.scrollHeight + 'px';
  }
});



document.getElementById('decreaseFont').addEventListener('click', function() {
  //Seleciona o elemento que contém o conteúdo cujo tamanho de fonte será alterado
  var content = document.querySelector('.conteudo');
    
  //Obtém o tamanho atual da fonte em pixels
  var currentFontSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
  currentFontSize = parseInt(currentFontSize); //Converte o valor para inteiro

  // Define o tamanho mínimo permitido (em px)
  var minFontSize = 10;
  
  // Verifica se o tamanho atual é maior que o mínimo permitido
  if (currentFontSize > minFontSize) {
    // Diminui o tamanho da fonte em 2px
    content.style.fontSize = (currentFontSize - 2) + 'px';
    // Ajusta o tamanho da caixa
    content.style.height = content.scrollHeight + 'px';
  }
});



//Função para alterar o contraste
function mudarContraste() {
  const body = document.body;
  fundoEscuro = !fundoEscuro;
  if (fundoEscuro) {
    body.classList.add('fundo-escuro');
  } else {
    body.classList.remove('fundo-escuro');
  }
}



//Função para ler o conteúdo
function lerConteudo() {
  const texto = document.body.innerText;
  utterance = new SpeechSynthesisUtterance(texto);  //Cria a utterance para a leitura
  window.speechSynthesis.speak(utterance);  //Inicia a leitura do conteúdo
}



//Função para parar a leitura
function pararLeitura() {
  if (utterance) {
    window.speechSynthesis.cancel();  //Cancela a leitura em andamento
  }
}



//Função para enviar o feedback
function enviarFeedbackAceb() {
  const feedback = document.getElementById('feedback').value;
  if (feedback) {
    alert('Obrigado pelo seu feedback!');
    document.getElementById('feedback').value = ''; //Limpa o campo de feedback
  } else {
    alert('Por favor, deixe seu feedback antes de enviar.');
  }
}










//Código JavaScript para o painel de feedback
let feedbackMenuVisible = false;

//Função para mostrar/ocultar o painel de feedback
function toggleFeedbackMenu() {
  feedbackMenuVisible = !feedbackMenuVisible;
  const painel = document.getElementById('painel-feedback');
  painel.style.display = feedbackMenuVisible ? 'block' : 'none';
}



//Função para enviar o feedback
function enviarFeedback() {
  const feedback = document.getElementById('feedback-text').value;
  if (feedback) {
    alert('Obrigado pelo seu feedback!');
    document.getElementById('feedback-text').value = ''; //Limpa o campo de feedback
  } else {
    alert('Por favor, digite um feedback antes de enviar.');
  }
}
