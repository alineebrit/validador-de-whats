const NUMERO_DESTINO = '5583996000281'; // WhatsApp da empresa

async function avaliarNumero(numero) {
  const url = `https://whatsapp-checker.p.rapidapi.com/check?phone=%2B55${numero}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '960aec5688mshce87f4beeeed823p11a6fejsnc81fecd27042',
      'x-rapidapi-host': 'whatsapp-checker.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result[0].exists;
  } catch (error) {
    console.error(error);
  }
}

async function validarWhats(numero) {
  const limpo = numero.replace(/\D/g, '');
  const regex = /^(?:\+?55)?(?:[1-9][0-9])9[0-9]{8}$/;
  //return regex.test(limpo);

    // 1.Validar formatação do número  
  const isNumeroFormatado = regex.test(limpo);

  // 2. Validar existência do número via API
  let isNumeroValido = await avaliarNumero(limpo);

  return isNumeroFormatado && isNumeroValido;
}

document.getElementById('leadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const whats = document.getElementById('whats').value;
  const erro = document.getElementById('erro');

  const isNumeroValido = await validarWhats(whats);

  if (!isNumeroValido) {
    erro.textContent = 'Número inválido! Informe um WhatsApp válido com DDD.';
    return;
  }

  erro.textContent = '';
  const numeroLimpo = whats.replace(/\D/g, '');
  const mensagem = encodeURIComponent(`Olá! Gostaria de mais informações sobre a Menos Juros Brasil Assessoria.\nNome: ${nome}\nMeu WhatsApp: ${whats}`);
  window.open(`https://wa.me/${NUMERO_DESTINO}?text=${mensagem}`, '_blank');

  limparInputs();
});

function limparInputs() {
  document.getElementById('nome').value = '';
  document.getElementById('whats').value = '';
}

document.getElementById('whats').addEventListener('input', function(e) {
  let valor = e.target.value.replace(/\D/g, ''); 
  valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
  valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
  e.target.value = valor;
});

const ano = new Date().getFullYear();
document.getElementById("footer-main-page").innerHTML = `© ${ano} Menos Juros Brasil Assessoria`;