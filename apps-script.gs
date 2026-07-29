/**
 * Cole este código no editor de Apps Script vinculado à sua planilha do
 * Google Sheets (veja o passo a passo completo no README.md).
 *
 * O que ele faz: recebe o POST enviado pelo formulário do site e adiciona
 * uma nova linha na planilha com Data, Nome e Email. A planilha pode ser
 * baixada como Excel a qualquer momento (Arquivo > Fazer download >
 * Microsoft Excel).
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Cadastros');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Cadastros');
  }

  // Cria o cabeçalho na primeira vez, se a planilha estiver vazia
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data', 'Nome', 'Email']);
  }

  var dados = JSON.parse(e.postData.contents);
  var nome = dados.nome || '';
  var email = dados.email || '';

  sheet.appendRow([new Date(), nome, email]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
