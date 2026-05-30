// ===================== CONFIGURAÇÃO =====================
// Cole aqui a URL do SEU Web App do Apps Script (termina em /exec).
// É só esta linha que define para qual planilha os dados vão.
const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbzXnB9L9gTs8oWC8aeqHlgJCy8KVoAfkti5c8JCGjuRYxUnbjJsrf5otuuHlf0T3uwP/exec";
// ========================================================

const form = document.getElementById("formulario");
const mensagemStatus = document.getElementById("mensagemStatus");
const btnEnviar = document.getElementById("btnEnviar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: form.nome.value.trim(),
    curso: form.curso.value.trim(),
    graduacao: form.graduacao.value,
  };

  // Validação antes de enviar
  if (!dados.nome) {
    mostrarStatus("Por favor, digite seu nome.", "text-red-700");
    return;
  }
  if (dados.graduacao === "Selecione" || !dados.graduacao) {
    mostrarStatus("Selecione se pretende iniciar uma graduação.", "text-red-700");
    return;
  }

  mostrarStatus("Enviando...", "text-gray-600");
  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando...";

  try {
    // Apps Script não devolve cabeçalhos CORS, então usamos no-cors.
    // O navegador não consegue ler a resposta — por isso a confiabilidade
    // depende do backend (acesso "Qualquer pessoa" + LockService no Codigo.gs).
    await fetch(URL_PLANILHA, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(dados),
    });

    mostrarStatus("Pesquisa enviada com sucesso!", "text-green-700");
    form.reset();
  } catch (erro) {
    mostrarStatus(
      "Erro ao enviar. Verifique sua conexão e tente novamente.",
      "text-red-700"
    );
    console.error(erro);
  } finally {
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Enviar Pesquisa";
  }
});

function mostrarStatus(texto, cor) {
  mensagemStatus.textContent = texto;
  mensagemStatus.className = `text-center font-semibold mt-4 ${cor}`;
}
