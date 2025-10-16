const NUMERO_DESTINO = '5583996000281'; // WhatsApp da empresa

function validarWhats(numero) {
  const limpo = numero.replace(/\D/g, '');
  const regex = /^(?:\+?55)?(?:[1-9][0-9])9[0-9]{8}$/;
  return regex.test(limpo);
}

document.getElementById('leadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const whats = document.getElementById('whats').value;
  const erro = document.getElementById('erro');

  if (!validarWhats(whats)) {
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