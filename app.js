let nomes = [];

function limparInput() {
  const input = document.getElementById('nomeInput');
  input.value = '';
  input.focus();
}

function adicionarNome() {
  const input = document.getElementById('nomeInput');
  const nome = input.value.trim();
  if (!nome) return;

  const existe = nomes.some(n => n.toLowerCase() === nome.toLowerCase());
  if (existe) {
    alert('Este nome já foi adicionado!');
    limparInput();
    return;
  }

  nomes.push(nome);
  atualizarLista();
  limparInput();
  esconderResultado();
}

function atualizarLista() {
  const lista = document.getElementById('listaNomes');
  lista.innerHTML = '';

  nomes.forEach((nome, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${nome}
      <button class="remover-nome" onclick="removerNome(${index})">✖</button>
    `;
    lista.appendChild(li);
  });
}

function removerNome(index) {
  nomes.splice(index, 1);
  atualizarLista();
  esconderResultado();
}

function sortearAmigo() {
  if (nomes.length < 2) {
    alert('Adicione pelo menos dois nomes.');
    return;
  }

  const sorteadores = [...nomes];
  const sorteados = [...nomes];
  const resultado = {};

  for (let i = 0; i < sorteadores.length; i++) {
    const sorteador = sorteadores[i];
    const possiveis = sorteados.filter(n => n !== sorteador);

    if (possiveis.length === 0) {
      return sortearAmigo(); // reinicia sorteio
    }

    const sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
    resultado[sorteador] = sorteado;
    sorteados.splice(sorteados.indexOf(sorteado), 1);
  }

  exibirResultado(resultado);
}

function exibirResultado(resultado) {
  const div = document.getElementById('resultadoSorteio');
  let html = '';
  for (const [de, para] of Object.entries(resultado)) {
    html += `${de} → ${para}<br>`;
  }
  div.innerHTML = html;
  document.getElementById('copiarResultadoBtn').style.display = 'inline-block';
}

function copiarResultado() {
  const texto = document.getElementById('resultadoSorteio').innerText;
  navigator.clipboard.writeText(texto)
    .then(() => alert('Resultado copiado!'))
    .catch(() => alert('Erro ao copiar.'));
}

function limparLista() {
  nomes = [];
  atualizarLista();
  esconderResultado();
}

function esconderResultado() {
  document.getElementById('resultadoSorteio').innerHTML = '';
  document.getElementById('copiarResultadoBtn').style.display = 'none';
}
