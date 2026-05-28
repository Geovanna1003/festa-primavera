const form = document.getElementById("formulario");
const mensagemStatus = document.getElementById("mensagemStatus");
const btnEnviar = document.getElementById("btnEnviar");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const dados = {
    nome: form.nome.value,
    curso: form.curso.value,
    graduacao: form.graduacao.value
  };

   mensagemStatus.textContent = "Enviando...";
   mensagemStatus.className = "text-center font-semibold mt-4 text-gray-600";
   btnEnviar.disabled = true;
   btnEnviar.textContent = "Enviando...";

  try {

    await fetch("https://script.google.com/macros/s/AKfycbxNw9rpx2XvRBSmt68EQpvOTX_Lr-Y6EH6tVB_VkTdZH0xqCM_346cHNgsEm0x-RMqz/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(dados)
      }
    );

    mensagemStatus.textContent = "Pesquisa enviada com sucesso!";
    mensagemStatus.className = "text-center font-semibold mt-4 text-green-700";

    form.reset();

  } catch (erro) {

    mensagemStatus.textContent = "Erro ao enviar pesquisa.";
    mensagemStatus.className = "text-center font-semibold mt-4 text-red-700";
    console.error(erro);

  }

  btnEnviar.disabled = false;
  btnEnviar.textContent =
    "Enviar Pesquisa";

});