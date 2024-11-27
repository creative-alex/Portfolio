// Função para criar o efeito de digitação
function typeWriter(element, text, callback) {
  let i = 0;
  // Limpa o conteúdo do elemento
  element.innerHTML = '';
  function type() {
    // Se ainda não digitou todo o texto
    if (i < text.length) {
      // Adiciona o próximo caractere ao conteúdo do elemento
      element.innerHTML += text.charAt(i);
      i++;
      // Continua digitando após um pequeno intervalo
      setTimeout(type, 100); // Ajusta a velocidade da digitação aqui
    } else if (callback) {
      // Chama o callback (se fornecido) após terminar de digitar
      callback();
    }
  }
  type();
}

// Função para criar o efeito de apagar o texto
function eraseText(element, callback) {
  let text = element.innerHTML;
  let length = text.length;
  function erase() {
    // Se ainda há caracteres para apagar
    if (length > 0) {
      // Remove o último caractere do conteúdo do elemento
      element.innerHTML = text.substring(0, length - 1);
      length--;
      // Continua apagando após um pequeno intervalo
      setTimeout(erase, 50); // Ajusta a velocidade da exclusão aqui
    } else if (callback) {
      // Chama o callback (se fornecido) após terminar de apagar
      callback();
    }
  }
  erase();
}

// Função para gerenciar a animação de digitação no elemento 'world'
function startWorldTypingAnimation() {
  const worldElement = document.getElementById('world-text'); // Atualizado para 'world-text'
  const texts = ['World !!', 'There !!', 'Friend ツ'];
  let index = 0;

  function nextText() {
    if (index >= texts.length) {
      index = 0;
    }
    const text = texts[index];
    typeWriter(worldElement, text, function() {
      setTimeout(() => {
        eraseText(worldElement, function() {
          index++;
          nextText();
        });
      }, 1000);
    });
    document.querySelector('.glitch').style.border = '0'; // Referencia à classe .glitch
  }

  nextText();
}

// Inicia o efeito de digitação no elemento 'hello'
typeWriter(document.getElementById('hello-text'), 'Hello;', function() {
  startWorldTypingAnimation();
  document.querySelector('#world-text');
});









animateElements();

const ASCII_OF_A = "A".charCodeAt();
const NO_OF_ALPHABETS = 26;

function animateElement(element, originalText, options) {
    let iteration = 0;

    if (options.interval) {
        return;
    }

    options.interval = setInterval(() => {
        const newWord = originalText
            .split("")
            .map((_, idx) => {
                if (idx < iteration) {
                    return originalText[idx];
                }
                return String.fromCharCode(
                    Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A
                );
            })
            .join("");
        element.innerText = newWord;

        iteration += 1;

        if (iteration > originalText.length) {
            clearInterval(options.interval);
            options.interval = null;
        }
    }, 30);
}

function getRandomLetter() {}

function animateElements() {
    const elements = document.getElementsByClassName("animate");

    for (const element of elements) {
        const originalText = element.innerText;
        const options = {
            interval: null
        };
        animateElement(element, originalText, options);

        element.addEventListener("mouseover", (event) => {
            animateElement(event.target, originalText, options);
        });
    }
}
