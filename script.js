// =====================================================================
// CONFIGURAÇÃO
// Cole aqui a URL do seu "Web app" do Google Apps Script (veja README.md
// para o passo a passo de como gerar essa URL a partir de uma planilha
// do Google Sheets).
// =====================================================================
const SCRIPT_URL = "COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT";

const form = document.getElementById('form-inscricao');
const btn = document.getElementById('btn-enviar');
const status = document.getElementById('form-status');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const erroNome = document.getElementById('erro-nome');
const erroEmail = document.getElementById('erro-email');

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function limparErros() {
  inputNome.classList.remove('invalid');
  inputEmail.classList.remove('invalid');
  erroNome.textContent = '';
  erroEmail.textContent = '';
  status.textContent = '';
  status.className = 'form-status';
}

function validar() {
  let ok = true;
  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  if (nome.length < 3) {
    inputNome.classList.add('invalid');
    erroNome.textContent = 'Informe seu nome completo.';
    ok = false;
  }
  if (!emailValido(email)) {
    inputEmail.classList.add('invalid');
    erroEmail.textContent = 'Informe um email válido.';
    ok = false;
  }
  return ok;
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  limparErros();

  if (!validar()) return;

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  btn.disabled = true;
  btn.textContent = 'Enviando...';
  status.textContent = '';

  try {
    if (SCRIPT_URL && SCRIPT_URL.indexOf('COLE_AQUI') === -1) {
      // "no-cors" é necessário porque o Apps Script não retorna cabeçalhos
      // CORS completos. Por isso não conseguimos ler a resposta aqui —
      // assumimos sucesso e seguimos em frente.
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ nome: nome, email: email })
      });
    }

    // Guarda localmente para exibir o nome na página da live
    localStorage.setItem('inscricao_nome', nome);
    localStorage.setItem('inscricao_email', email);

    status.textContent = 'Inscrição confirmada! Redirecionando...';
    status.className = 'form-status success';

    setTimeout(function () {
      window.location.href = 'live.html?nome=' + encodeURIComponent(nome);
    }, 900);

  } catch (err) {
    status.textContent = 'Não foi possível enviar agora. Tente novamente.';
    status.className = 'form-status error';
    btn.disabled = false;
    btn.textContent = 'Confirmar inscrição';
  }
});
