// Lógica do Painel do Produtor (Agricultor)
// Script simples, sem localStorage e sem banco de dados, ideal para iniciantes!

// 1. Nossa lista de projetos inicial (uma lista básica de objetos Javascript)
let listaProjetos = [
  {
    id: 1,
    titulo: "Plantio de Milho - Safra 2026",
    roi: 16.5,
    captado: 45000,
    meta: 60000,
    investidores: 18,
    status: "Ativo", // Pode ser "Ativo" ou "Finalizado"
    localizacao: "Sorriso - MT",
    imagem: "../img/milho.png",
    prazo: "Dezembro 2026",
    detalhes: "Projeto destinado à compra de sementes selecionadas e fertilizantes para a safra de milho safrinha de 2026 no Mato Grosso, com uso de tecnologia de agricultura de precisão."
  },
  {
    id: 2,
    titulo: "Horta Orgânica Comercial",
    roi: 14.2,
    captado: 25000,
    meta: 25000,
    investidores: 12,
    status: "Finalizado",
    localizacao: "Ibiúna - SP",
    imagem: "../img/horta.png",
    prazo: "Finalizado",
    detalhes: "Ampliação da área produtiva de folhosas e legumes orgânicos certificados, com instalação de sistema de irrigação por gotejamento automatizado alimentado por energia solar."
  }
];

// 2. Executa assim que a página termina de carregar no navegador
window.addEventListener("DOMContentLoaded", () => {
  renderizarProjetos();
});

// 3. Função para abrir a janela de cadastro (Modal)
function abrirModal() {
  let modal = document.getElementById("modal-cadastro");
  if (modal) {
    modal.classList.add("mostrar"); // Adiciona a classe CSS que torna o modal visível
  }
}

// 4. Função para fechar a janela de cadastro (Modal)
function fecharModal() {
  let modal = document.getElementById("modal-cadastro");
  if (modal) {
    modal.classList.remove("mostrar"); // Remove a classe CSS deixando o modal invisível
    document.getElementById("form-cadastro").reset(); // Limpa os campos digitados
  }
}

// 5. Função para desenhar os projetos na tela e atualizar as estatísticas do topo
function renderizarProjetos() {
  let container = document.getElementById("lista-projetos-container");
  if (!container) return;
  
  // Limpa o contêiner para redesenhar a lista limpa
  container.innerHTML = "";
  
  // Variáveis básicas para somar os totais
  let projetosAtivos = 0;
  let totalCaptado = 0;
  let totalInvestidores = 0;

  // Passamos por cada projeto da lista usando um laço simples (forEach)
  listaProjetos.forEach((projeto) => {
    // Somamos para os cards do topo
    if (projeto.status === "Ativo") {
      projetosAtivos++;
    }
    totalCaptado += projeto.captado;
    totalInvestidores += projeto.investidores;

    // Calcula a porcentagem do progresso de captação
    let porcentagem = (projeto.captado / projeto.meta) * 100;
    if (porcentagem > 100) porcentagem = 100; // Impede que a barra passe de 100%

    // Cria a estrutura HTML do projeto injetando as variáveis do objeto
    let projetoItemHTML = `
      <div class="projeto-item">
        <div class="projeto-cabecalho">
          <div>
            <h2>${projeto.titulo}</h2>
            <p class="projeto-sub">${projeto.investidores} investidores • ROI ${projeto.roi}% • ${projeto.localizacao}</p>
          </div>
          <span class="status-tag ${projeto.status.toLowerCase() === 'ativo' ? 'ativo' : 'finalizado'}">
            ${projeto.status}
          </span>
        </div>

        <div class="projeto-progresso">
          <div class="progresso-valores">
            <span>Captado</span>
            <strong>R$ ${projeto.captado.toLocaleString("pt-BR")} de R$ ${projeto.meta.toLocaleString("pt-BR")}</strong>
          </div>
          <div class="barra-fundo">
            <div class="barra-preenchida" style="width: ${porcentagem}%;"></div>
          </div>
        </div>

        <div class="projeto-botoes">
          <button class="btn-secundario" onclick="verDetalhesDoProjeto('${projeto.titulo}', '${projeto.detalhes}', '${projeto.localizacao}', '${projeto.prazo}', ${projeto.roi})">Ver Detalhes</button>
          <button class="btn-secundario" onclick="alert('Relatório gerado com sucesso!')">Relatório</button>
        </div>
      </div>
    `;

    // Adiciona o novo card dentro do contêiner HTML
    container.innerHTML += projetoItemHTML;
  });

  // Atualiza os textos dos cards de resumo usando getElementById
  document.getElementById("card-projetos-ativos").innerText = projetosAtivos;
  document.getElementById("card-total-captado").innerText = "R$ " + totalCaptado.toLocaleString("pt-BR");
  document.getElementById("card-total-investidores").innerText = totalInvestidores;
}

// 6. Função chamada quando o produtor envia o formulário de cadastro
function salvarNovoProjeto(evento) {
  evento.preventDefault(); // Evita que a página seja recarregada ao clicar em enviar

  // Pegamos os textos que o usuário escreveu nos inputs do formulário
  let titulo = document.getElementById("titulo-projeto").value;
  let roi = parseFloat(document.getElementById("roi-projeto").value);
  let meta = parseInt(document.getElementById("meta-projeto").value);
  let localizacao = document.getElementById("local-projeto").value;
  let prazo = document.getElementById("prazo-projeto").value;
  let imagem = document.getElementById("imagem-projeto").value;

  // Criamos um novo objeto com essas informações recebidas
  let novoProjeto = {
    id: Date.now(), // Cria um ID único usando a hora atual em milissegundos
    titulo: titulo,
    roi: roi,
    captado: 0, // Um projeto novo começa sem nenhuma captação
    meta: meta,
    investidores: 0,
    status: "Ativo",
    localizacao: localizacao,
    imagem: imagem,
    prazo: prazo,
    detalhes: `Este projeto em ${localizacao} visa captar R$ ${meta.toLocaleString("pt-BR")} para apoiar o cultivo ecológico. Retorno estimado em ${prazo}.`
  };

  // Adiciona o novo projeto no final da nossa lista (array)
  listaProjetos.push(novoProjeto);

  // Redesenha os projetos na tela para mostrar o projeto recém-criado imediatamente!
  renderizarProjetos();

  // Fecha a janelinha modal
  fecharModal();

  // Mostra um aviso na tela avisando que deu certo
  alert("Projeto cadastrado com sucesso!");
}

// 7. Abre um alerta simples com os detalhes do projeto
function verDetalhesDoProjeto(titulo, detalhes, local, prazo, roi) {
  alert(
    `📋 Detalhes do Projeto:\n\n` +
    `Título: ${titulo}\n` +
    `Local: ${local}\n` +
    `Prazo: ${prazo}\n` +
    `ROI: ${roi}%\n\n` +
    `Descrição: ${detalhes}`
  );
}
