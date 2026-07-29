# Como colocar o site no ar

Você tem 5 arquivos:

- `index.html` → página de cadastro (nome + email)
- `live.html` → página com o vídeo/chat ao vivo
- `style.css` → visual das duas páginas
- `script.js` → valida o formulário e envia os dados
- `apps-script.gs` → código que grava os cadastros na planilha do Google

---

## Passo 1 — Criar a planilha que vai receber os cadastros

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha nova (ex: "Cadastros - Live").
2. No menu, vá em **Extensões > Apps Script**.
3. Apague o conteúdo padrão e cole o conteúdo do arquivo `apps-script.gs`.
4. Clique em **Salvar** (ícone de disquete).
5. Clique em **Implantar > Nova implantação**.
6. Em "Selecionar tipo", escolha **App da Web**.
7. Configure:
   - **Executar como:** Eu (seu email)
   - **Quem pode acessar:** Qualquer pessoa
8. Clique em **Implantar** e autorize as permissões pedidas (é o seu próprio script, pode aceitar).
9. Copie a **URL do app da Web** gerada — algo como:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Passo 2 — Conectar o formulário à planilha

1. Abra o arquivo `script.js`.
2. Na primeira linha de configuração, troque:
   ```js
   const SCRIPT_URL = "COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT";
   ```
   pela URL que você copiou no passo anterior.

Pronto — a partir de agora, cada envio do formulário cria uma nova linha na aba **Cadastros** da sua planilha, com Data, Nome e Email.

**Para baixar como Excel a qualquer momento:** na planilha, vá em **Arquivo > Fazer download > Microsoft Excel (.xlsx)**.

## Passo 3 — Colocar o vídeo ao vivo do Vimeo

1. Abra o arquivo `live.html`.
2. No painel do Vimeo, pegue o **código de incorporação (embed)** do seu evento ao vivo.
3. Substitua o bloco `<div class="player-placeholder">...</div>` pelo `<iframe>` fornecido pelo Vimeo.

⚠️ **Importante sobre o chat:** o chat ao lado do vídeo (como nas imagens que você mandou) só aparece automaticamente se o seu evento for criado como um **Vimeo Live Event** (produto de transmissão ao vivo do Vimeo, que já inclui chat, enquetes e "Entrar como público"). Um vídeo comum do Vimeo (upload normal) não tem esse chat. Se você ainda não tem o plano de Live do Vimeo e precisar de um chat customizado, me avise que eu monto uma alternativa.

## Passo 4 — Publicar o site

Como você vai usar hospedagem estática, a forma mais simples é o **Netlify**:

1. Acesse [app.netlify.com](https://app.netlify.com) e crie uma conta gratuita.
2. Na tela inicial, arraste a pasta com os 4 arquivos (`index.html`, `live.html`, `style.css`, `script.js`) para a área de deploy ("Deploy manually").
3. O Netlify já publica e te dá um link (ex: `seunome.netlify.app`).
4. Se quiser, depois é possível ligar um domínio próprio nas configurações do site.

(O mesmo processo funciona em Vercel ou GitHub Pages, só muda a forma de subir os arquivos.)

---

## Resumo do fluxo

1. Pessoa acessa `index.html`, preenche nome e email.
2. Ao confirmar, os dados são enviados para a sua planilha do Google (que funciona como seu "banco de dados" e pode virar Excel quando quiser).
3. A pessoa é redirecionada automaticamente para `live.html`, onde está o vídeo ao vivo com chat.
