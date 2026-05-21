// Lógica do Perfil do Investidor
// Script básico, sem localStorage, ideal para iniciantes!

// 1. Variável numérica simples para controlar o saldo da carteira
let saldo = 10000.00;

// 2. Lista (Array) contendo os projetos agrícolas cadastrados na tela
let listaProjetos = [
  {
    id: 1,
    titulo: "Plantio de Soja Orgânica 2026",
    roi: 18.5,
    captado: 128000,
    meta: 170000,
    investidores: 34,
    status: "Ativo",
    localizacao: "Rio Verde - GO",
    imagem: "../img/soja.png",
    prazo: "Junho 2026",
    detalhes: "Cultivo de soja orgânica livre de transgênicos para atender a demanda de exportação. O projeto visa financiar os insumos biológicos e o preparo do solo com biofertilizantes."
  },
  {
    id: 2,
    titulo: "Plantio de Milho - Safra 2026",
    roi: 16.5,
    captado: 45000,
    meta: 60000,
    investidores: 18,
    status: "Ativo",
    localizacao: "Sorriso - MT",
    imagem: "../img/milho.png",
    prazo: "Dezembro 2026",
    detalhes: "Projeto destinado à compra de sementes selecionadas e fertilizantes para a safra de milho safrinha de 2026 no Mato Grosso, com uso de tecnologia de agricultura de precisão."
  },
  {
    id: 3,
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

// 3. Projetos que o investidor já colocou dinheiro inicialmente
let meusInvestimentos = [
  { projetoId: 2, valor: 3000 }, // R$ 3.000,00 no Plantio de Milho
  { projetoId: 3, valor: 2000 }  // R$ 2.000,00 na Horta Orgânica
];

// ID auxiliar para guardarmos qual projeto o investidor escolheu ao abrir o modal
let projetoSelecionadoId = null;

// Executa assim que a página carrega completamente no navegador
window.addEventListener("DOMContentLoaded", () => {
  renderizarPagina();
});

// 4. Desenha a página inteira: Saldo, Estatísticas do topo e Lista de Projetos
function renderizarPagina() {
  // A. Atualiza o texto do saldo disponível
  document.getElementById("saldo-investidor").innerText = "R$ " + saldo.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // B. Variáveis para calcular as estatísticas do topo
  let investimentosAtivosContador = 0;
  let capitalTotalInvestido = 0;
  let retornoFinanceiroProjetado = 0;
  let somaRois = 0;

  // Calculamos os dados com base na nossa lista de investimentos pessoais
  meusInvestimentos.forEach((investimento) => {
    // Procuramos os dados do projeto correspondente
    let projeto = listaProjetos.find(p => p.id === investimento.projetoId);
    
    if (projeto) {
      capitalTotalInvestido += investimento.valor;
      
      // Retorno do investimento = valor investido * (ROI em decimal)
      let retornoItem = investimento.valor * (projeto.roi / 100);
      retornoFinanceiroProjetado += retornoItem;
      somaRois += projeto.roi;

      if (projeto.status === "Ativo") {
        investimentosAtivosContador++;
      }
    }
  });

  // Média simples de ROI dos projetos apoiados
  let mediaRetorno = meusInvestimentos.length > 0 ? (somaRois / meusInvestimentos.length) : 0;

  // Injeta os dados calculados nos elementos do painel
  document.getElementById("stat-investimentos-ativos").innerText = investimentosAtivosContador;
  document.getElementById("stat-novos-mes").innerText = "+" + meusInvestimentos.length + " no total";
  document.getElementById("stat-retorno-medio").innerText = mediaRetorno.toFixed(1) + "%";
  document.getElementById("stat-capital-investido").innerText = "R$ " + capitalTotalInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  document.getElementById("stat-retorno-projetado").innerText = "R$ " + retornoFinanceiroProjetado.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  // C. Injeta a lista de projetos disponíveis
  let container = document.getElementById("lista-investimentos");
  if (!container) return;

  container.innerHTML = ""; // Limpa a lista antes de desenhar

  listaProjetos.forEach((projeto) => {
    // Porcentagem do progresso de captação
    let porcentagem = (projeto.captado / projeto.meta) * 100;
    if (porcentagem > 100) porcentagem = 100;

    let estaFinalizado = projeto.status === "Finalizado" || projeto.captado >= projeto.meta;

    // Constrói o elemento HTML do card
    let cardHTML = `
      <div class="card2">
        <img src="${projeto.imagem}" alt="${projeto.titulo}" class="imagem-card">

        <div class="conteudo-card2">
          <h2>${projeto.titulo}</h2>
          <p class="info-secundaria">📍 ${projeto.localizacao} • 👥 ${projeto.investidores} investidores</p>

          <!-- Parte do Progresso -->
          <div style="display: flex; justify-content: space-between; font-size: 12px;">
            <span>Captado</span>
            <strong>R$ ${projeto.captado.toLocaleString("pt-BR")} de R$ ${projeto.meta.toLocaleString("pt-BR")}</strong>
          </div>
          <div class="progresso-barra">
            <div class="progresso-preenchido" style="width: ${porcentagem}%;"></div>
          </div>
          <small style="color: #999; font-size: 11px;">${porcentagem.toFixed(1)}% do objetivo</small>

          <!-- Bloco do Retorno -->
          <div class="bloco-roi-card">
            <div>
              <small style="color: #00a859; display: block;">Retorno Projetado (ROI)</small>
              <span class="roi-valor">${projeto.roi}%</span>
            </div>
            <span>📈</span>
          </div>

          <!-- Prazo -->
          <p style="font-size: 13px; color: #555;">Prazo: <strong>${projeto.prazo}</strong></p>

          ${
            estaFinalizado 
            ? `<button class="btn-investir" style="background-color: #ccc; cursor: not-allowed;" disabled>Captação Encerrada</button>`
            : `<button class="btn-investir" onclick="abrirModalInvestimento(${projeto.id})">Investir Agora</button>`
          }
        </div>
      </div>
    `;

    container.innerHTML += cardHTML;
  });
}

// 5. Abre a janela do Modal carregando as informações do projeto clicado
function abrirModalInvestimento(id) {
  // Encontra o projeto pelo ID
  let projeto = listaProjetos.find(p => p.id === id);
  if (!projeto) return;

  // Salva o ID globalmente para saber onde aplicar o investimento depois
  projetoSelecionadoId = id;

  // Injeta as informações do projeto dentro do modal
  document.getElementById("modal-titulo").innerText = projeto.titulo;
  document.getElementById("modal-detalhes").innerText = projeto.detalhes;
  document.getElementById("modal-local").innerText = projeto.localizacao;
  document.getElementById("modal-roi").innerText = projeto.roi + "%";
  document.getElementById("modal-prazo").innerText = projeto.prazo;
  document.getElementById("modal-progresso-texto").innerText = `R$ ${projeto.captado.toLocaleString("pt-BR")} de R$ ${projeto.meta.toLocaleString("pt-BR")}`;
  
  // Mostra o saldo atual do investidor no modal
  document.getElementById("modal-saldo-disponivel").innerText = "R$ " + saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  // Exibe o modal na tela adicionando a classe CSS
  let modal = document.getElementById("modal-investimento");
  if (modal) {
    modal.classList.add("mostrar");
  }
}

// 6. Fecha o modal de investimentos
function fecharModal() {
  let modal = document.getElementById("modal-investimento");
  if (modal) {
    modal.classList.remove("mostrar");
    document.getElementById("valor-aporte").value = ""; // Limpa a caixa de texto do valor
  }
}

// 7. Confirma e simula o investimento financeiro no projeto
function confirmarAporte() {
  let campoValor = document.getElementById("valor-aporte");
  let valorInvestido = parseFloat(campoValor.value);

  // Validação 1: O campo precisa ter um número válido e maior que zero
  if (isNaN(valorInvestido) || valorInvestido <= 0) {
    alert("Por favor, digite um valor de investimento válido.");
    return;
  }

  // Validação 2: Valor mínimo exigido
  if (valorInvestido < 50) {
    alert("O valor mínimo para investir é de R$ 50,00.");
    return;
  }

  // Validação 3: Se o investidor tem saldo suficiente na carteira
  if (valorInvestido > saldo) {
    alert("Saldo insuficiente para realizar este investimento!");
    return;
  }

  // Encontra o projeto selecionado na lista
  let projeto = listaProjetos.find(p => p.id === projetoSelecionadoId);
  if (!projeto) return;

  // Validação 4: Não estourar a meta do projeto
  let restante = projeto.meta - projeto.captado;
  if (valorInvestido > restante) {
    alert(`O valor máximo restante que você pode investir neste projeto é R$ ${restante.toLocaleString("pt-BR")}. Por favor, ajuste seu aporte.`);
    return;
  }

  // AÇÕES DO INVESTIMENTO:
  // A. Reduz o saldo da carteira local
  saldo = saldo - valorInvestido;

  // B. Atualiza as informações do projeto
  projeto.captado += valorInvestido;
  projeto.investidores += 1;

  // C. Se bater a meta máxima de captação, encerra o projeto
  if (projeto.captado >= projeto.meta) {
    projeto.status = "Finalizado";
  }

  // D. Adiciona o investimento à lista pessoal do investidor para recalcular as estatísticas
  let investimentoExistente = meusInvestimentos.find(i => i.projetoId === projetoSelecionadoId);
  if (investimentoExistente) {
    investimentoExistente.valor += valorInvestido;
  } else {
    meusInvestimentos.push({
      projetoId: projetoSelecionadoId,
      valor: valorInvestido
    });
  }

  // Redesenha a tela inteira com as novas informações
  renderizarPagina();

  // Fecha o modal de confirmação
  fecharModal();

  // Alerta de sucesso!
  alert(`Parabéns! Você investiu R$ ${valorInvestido.toLocaleString("pt-BR")} no projeto "${projeto.titulo}".`);
}
