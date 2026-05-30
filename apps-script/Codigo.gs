/**
 * Backend de coleta da Pesquisa Unigran — Festa da Primavera
 *
 * Este código vive no Google Apps Script (NÃO roda no site).
 * Ele recebe os dados do formulário (pesquisa.html) e grava cada
 * resposta como uma nova linha na planilha do Google Sheets.
 *
 * COMO USAR:
 *  1. Crie uma planilha no Google Sheets (na SUA conta).
 *  2. Menu: Extensões > Apps Script.
 *  3. Apague o conteúdo padrão e cole TODO este arquivo.
 *  4. Implante como App da Web (veja o passo a passo no PR / README).
 *  5. Copie a URL terminada em /exec e cole no JS/script.js do site.
 */

const NOME_DA_ABA = "Respostas";

function doPost(e) {
  // Evita perda de dados quando dois envios chegam ao mesmo tempo.
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    let aba = planilha.getSheetByName(NOME_DA_ABA);

    // Cria a aba e o cabeçalho na primeira execução.
    if (!aba) {
      aba = planilha.insertSheet(NOME_DA_ABA);
    }
    if (aba.getLastRow() === 0) {
      aba.appendRow(["Data/Hora", "Nome", "Curso", "Pretende graduação"]);
    }

    const dados = JSON.parse(e.postData.contents);

    aba.appendRow([
      new Date(),
      dados.nome || "",
      dados.curso || "",
      dados.graduacao || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ resultado: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ resultado: "erro", mensagem: String(erro) }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Permite testar no navegador se o Web App está no ar (abrir a URL /exec).
function doGet() {
  return ContentService.createTextOutput(
    "Web App ativo. Os dados são recebidos via POST a partir do formulário."
  );
}
