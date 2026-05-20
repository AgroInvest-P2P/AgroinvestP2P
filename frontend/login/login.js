function entrar() {
  // 1. Buscamos os elementos da tela com nomes bem claros
  let elementoUsuario = document.getElementById("usuario");
  let elementoSenha = document.getElementById("senha");
  let elementoPerfil = document.getElementById("tipo-perfil");

  // 2. Segurança: se algum sumir, avisa no console e não quebra o código
  if (!elementoUsuario || !elementoSenha || !elementoPerfil) {
    console.error("Erro: Um ou mais elementos não foram encontrados no HTML.");
    return;
  }

  // 3. Pegamos os TEXTOS digitados/selecionados (com nomes diferentes para não dar conflito!)
  let textoUsuario = elementoUsuario.value;
  let textoSenha = elementoSenha.value;
  let perfilSelecionado = elementoPerfil.value;

  // 4. Validação dos dados
  if (textoUsuario === "fiapagro" && textoSenha === "fiap123") {
    if (perfilSelecionado === "investidor") {
      window.location.href = "../investidor/investidor.html";
    } else if (perfilSelecionado === "produtor") {
      window.location.href = "../agricultor/agricultor.html";
    }
  } else {
    document.getElementById("mensagem").innerHTML =
      "Usuário ou senha incorretos";
  }
}
