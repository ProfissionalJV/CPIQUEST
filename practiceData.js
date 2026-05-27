// ═══════════════════════════════════════════════════════════
// InfoQuest — Dados de Prática por Fase
// ═══════════════════════════════════════════════════════════

const PRACTICE_BY_STAGE = {
  // ── MUNDO 1: Informática ──────────────────────────────────
     // ── MUNDO 1: Informática ──────────────────────────────────
  1: {
    type: "simulation",
    title: "Explorando o Windows",
    subtitle: "Conheça a Área de Trabalho",
    data: {
      tasks: [
        { label: "Clique no ícone 'Meu Computador'", hint: "🖥️ na Área de Trabalho", target: "meu-pc" },
        { label: "Abra o Menu Iniciar", hint: "Botão 🪟 na barra inferior", target: "start-button" },
        { label: "Clique no ícone 'Bloco de Notas'", hint: "📝 na Área de Trabalho", target: "bloco-notas" },
        { label: "Feche o Bloco de Notas", hint: "❌ bolinha vermelha", target: "close-notepad" },
        { label: "Clique no ícone 'Lixeira'", hint: "🗑️ na Área de Trabalho", target: "lixeira" },
      ]
    }
  },
  2: {
    type: "simulation",
    title: "Explorador de Arquivos",
    subtitle: "Navegue pelo Explorer",
    data: {
      tasks: [
        { label: "Abra o Explorador de Arquivos", hint: "Clique em 📁 Documentos", target: "documentos" },
        { label: "Dentro do Explorer, clique em 'Bloco de Notas'", hint: "Ícone 📝 na janela aberta", target: "bloco-notas-explorer" },
        { label: "Clique no botão '+ Nova Pasta' no Explorer", hint: "Botão verde no topo da janela", target: "nova-pasta" },
        { label: "Feche o Explorador", hint: "❌ bolinha vermelha", target: "close-explorer" },
        { label: "Abra o Menu Iniciar e clique em qualquer item", hint: "Botão 🪟 na barra inferior", target: "start-menu-item" },
      ]
    }
  },
  3: {
    type: "simulation",
    title: "Configurações do Windows",
    subtitle: "Personalize o sistema",
    data: {
      tasks: [
        { label: "Abra o Menu Iniciar", hint: "Botão 🪟 na barra inferior", target: "start-button" },
        { label: "Clique em '⚙️ Configurações' no Menu Iniciar", hint: "Está no final do menu", target: "config" },
        { label: "Clique em '🎨 Personalização'", hint: "Painel de configurações", target: "personalizacao" },
        { label: "Escolha um papel de parede diferente", hint: "Clique em um dos quadrados coloridos", target: "papel-parede" },
        { label: "Clique em '🔴 Desligar' no Menu Iniciar", hint: "Abra o Menu Iniciar novamente", target: "desligar" },
      ]
    }
  },
  4: {
    type: "simulation",
    title: "Formatação de Texto",
    subtitle: "Use Negrito, Itálico e Sublinhado",
    data: {
      tasks: [
        { label: "Abra o Bloco de Notas", hint: "📝 na Área de Trabalho", target: "bloco-notas" },
        { label: "Digite 'Relatório Final' e clique em Pronto", hint: "Escreva o título", target: "type-text" },
        { label: "Pressione Ctrl+B para NEGRITO", hint: "O texto ficará em negrito", target: "notepad", keyCombo: "Ctrl+B" },
        { label: "Pressione Ctrl+I para ITÁLICO", hint: "O texto ficará inclinado", target: "notepad", keyCombo: "Ctrl+I" },
        { label: "Pressione Ctrl+S para SALVAR", hint: "Salve o documento", target: "notepad", keyCombo: "Ctrl+S" },
      ]
    }
  },
  5: {
    type: "simulation",
    title: "Navegação com Atalhos",
    subtitle: "Domine os atalhos de janela",
    data: {
      tasks: [
        { label: "Abra o Bloco de Notas", hint: "📝 na Área de Trabalho", target: "bloco-notas" },
        { label: "Pressione Ctrl+D para MOSTRAR ÁREA DE TRABALHO (simulado, o atalho real é Win+D)", hint: "Minimiza janelas", target: "notepad", keyCombo: "Ctrl+D" },
        { label: "Pressione Ctrl+Q para ABRIR EXPLORER", hint: "Abre o Explorador de Arquivos (simulado, o atalho real é Win+E)", target: "notepad", keyCombo: "Ctrl+Q" },
        { label: "Pressione Alt+P para FECHAR JANELA", hint: "Fecha a janela ativa (simulado, o atalho real é Alt+F4)", target: "notepad", keyCombo: "Alt+P" },
        { label: "Pressione F2 para ATUALIZAR", hint: "Atualiza a página/explorer (simulado, o atalho real é F5)", target: "notepad", keyCombo: "F2" },
      ]
    }
  },
  6: {
    type: "simulation_word",
    title: "Trabalhe com Word",
    subtitle: "Formate seu documento profissional",
    data: {
      tasks: [
        { label: "Digite 'RELATÓRIO MENSAL' no documento", hint: "Clique na folha e digite o título", target: "type-doc-text" },
        { label: "Selecione o texto e clique no botão N (Negrito)", hint: "Clique no N na barra de formatação", target: "bold-btn" },
        { label: "Clique no botão de CENTRALIZAR", hint: "Ícone de centralizar na barra", target: "center-btn" },
        { label: "Pressione Enter e digite 'Resultados do mês...'", hint: "Nova linha com texto normal", target: "type-more-text" },
        { label: "Clique no botão 💾 Salvar", hint: "Salve seu documento", target: "save-btn" },
      ]
    }
  },
  7: {
    type: "simulation_word",
    title: "Recursos Avançados do Word",
    subtitle: "Use ferramentas profissionais",
    data: {
      tasks: [
        { label: "Digite 'Capítulo 1: Introdução' no documento", hint: "Título do capítulo", target: "type-doc-text" },
        { label: "Clique em N (Negrito) e depois em Centralizar", hint: "Formate o título", target: "bold-btn" },
        { label: "Pressione Enter e digite um parágrafo qualquer", hint: "Conteúdo do capítulo", target: "type-more-text" },
        { label: "Clique no botão JUSTIFICAR", hint: "Alinha o texto nas duas margens", target: "justify-btn" },
        { label: "Clique em 💾 Salvar para finalizar", hint: "Salve o documento", target: "save-btn" },
      ]
    }
  },
  8: {
    type: "simulation_excel",
    title: "Crie sua Primeira Planilha",
    subtitle: "Preencha os dados da tabela",
    data: {
      tasks: [
        { label: "Clique na célula A1 e digite 'PRODUTO'", hint: "Clique em A1 e digite no campo abaixo", target: "cell-a1" },
        { label: "Preencha B1='VALOR' e C1='QUANTIDADE'", hint: "Clique em cada célula e digite", target: "cell-b1" },
        { label: "Preencha A2='Mouse', B2='50' e C2='10'", hint: "Dados do primeiro produto", target: "cell-a2" },
        { label: "Preencha A3='Teclado', B3='120' e C3='5'", hint: "Dados do segundo produto", target: "cell-a3" },
        { label: "Clique em 'Formatar como Tabela'", hint: "Botão verde abaixo da planilha", target: "format-table" },
      ]
    }
  },
  9: {
    type: "simulation_excel",
    title: "Formatando Tabela no Excel",
    subtitle: "Preencha, formate e salve sua planilha",
    data: {
      tasks: [
        { label: "Preencha o cabeçalho: clique na célula A1 e digite 'NOME'", hint: "Clique na primeira célula e digite", target: "cell-a1" },
        { label: "Preencha B1 com 'NOTA' e C1 com 'SITUAÇÃO'", hint: "Clique em cada célula e digite", target: "cell-b1" },
        { label: "Preencha os nomes: A2='João', A3='Maria', A4='Pedro'", hint: "Digite os nomes nas células", target: "cell-a4" },
        { label: "Preencha as notas: B2=8.5, B3=9.0, B4=7.5", hint: "Digite as notas", target: "cell-b4" },
        { label: "Clique no botão 'Formatar como Tabela'", hint: "Botão abaixo da planilha", target: "format-table" },
      ]
    }
  },
  10: {
    type: "email_compose",
    title: "Redija um Email Profissional",
    subtitle: "Preencha todos os campos corretamente",
    data: {
      scenario: "Você precisa solicitar ao seu gestor (gestor@mcom.gov.br) o relatório de desempenho da equipe referente ao mês de abril. O assunto deve ser claro, o corpo do email deve ser formal e completo, com saudação, solicitação e despedida profissional."
    }
  },
  // ── MUNDO 2: MCom ──────────────────────────────────────
  11: {
    type: "simulation_map",
    title: "Programas do MCom nos Estados",
    subtitle: "Arraste cada programa para o estado correto",
    data: {
      tasks: [
        { label: "Arraste 'Wi-Fi Brasil' para uma escola no Tocantins", hint: "Leva internet via satélite para escolas rurais", target: "wifi-brasil" },
        { label: "Arraste 'Norte Conectado' para o Amazonas", hint: "Cabos subfluviais nos rios da Amazônia", target: "norte-conectado" },
        { label: "Arraste 'Digitaliza Brasil' para qualquer estado", hint: "Substitui sinal analógico de TV pelo digital", target: "digitaliza-brasil" },
        { label: "Arraste 'Telebras' para Brasília (DF)", hint: "Rede privativa do Governo Federal", target: "telebras" },
        { label: "Arraste '5G' para uma capital", hint: "Quinta geração de redes móveis", target: "5g" },
      ]
    }
  },
  12: {
    type: "simulation_norte",
    title: "Instale o Norte Conectado",
    subtitle: "Leve fibra óptica pelos rios do Amazonas",
    data: {
      tasks: [
        { label: "Clique no Rio Amazonas para instalar o cabo subfluvial", hint: "O rio principal que corta o estado", target: "rio-amazonas" },
        { label: "Conecte a fibra até Manaus (capital)", hint: "Onde o Rio Negro encontra o Solimões", target: "manaus" },
        { label: "Conecte a fibra até Parintins", hint: "Cidade a leste, às margens do Rio Amazonas", target: "parintins" },
        { label: "Conecte a fibra até Tefé", hint: "Cidade a oeste, no Rio Solimões", target: "tefe" },
        { label: "Conecte a fibra até São Gabriel da Cachoeira", hint: "Cidade ao norte, no Rio Negro", target: "sao-gabriel" },
      ]
    }
  },
  13: {
    type: "simulation_timeline",
    title: "Evolução das Redes Móveis",
    subtitle: "Ordene as gerações na linha do tempo",
    data: {
      tasks: [
        { label: "Arraste '1G' para a posição 1 na linha do tempo", hint: "Primeira geração - apenas voz", target: "1g" },
        { label: "Arraste '2G' para a posição 2", hint: "Segunda geração - SMS e voz digital", target: "2g" },
        { label: "Arraste '3G' para a posição 3", hint: "Terceira geração - internet móvel", target: "3g" },
        { label: "Arraste '4G' para a posição 4", hint: "Quarta geração - streaming de vídeo", target: "4g" },
        { label: "Arraste '5G' para a posição 5", hint: "Quinta geração - altíssima velocidade", target: "5g" },
      ]
    }
  },
  14: {
    type: "simulation_fluxo",
    title: "Fluxo do Programa",
    subtitle: "Ordene as etapas do Computadores para Inclusão",
    data: {
      tasks: [
        { label: "Arraste o 'CEDENTE' para a posição 1", hint: "Quem faz o processo de desfazimento de bens para o MCom.", target: "doador" },
        { label: "Arraste 'CRC' para a posição 2", hint: "Quem realiza o recondicionamento e a entrega dos equipamentos", target: "crc" },
        { label: "Arraste 'RECONDICIONAMENTO' para a posição 3", hint: "Nome dado para a revitalização dos equipamentos", target: "recondicionamento" },
        { label: "Arraste 'PID' para a posição 4", hint: "Quem recebe os equipamentos e se torna um ponto de inclusão digital", target: "pid" },
        { label: "Arraste 'INCLUSÃO DIGITAL' para a posição 5", hint: "Política Pública de transformação social", target: "comunidade" },
      ]
    }
  },
  15: {
    type: "simulation_crc",
    title: "Recondicione um Computador",
    subtitle: "Execute as etapas do CRC",
    data: {
      tasks: [
        { label: "ETAPA 1: Arraste a chave até os parafusos para abrir o notebook", hint: "Remova todos os 4 parafusos", target: "triagem" },
        { label: "ETAPA 2: Arraste a LUPA até o HD para diagnosticar", hint: "Verifique se o HD está funcionando", target: "diagnostico" },
        { label: "ETAPA 3: Arraste a PEÇA NOVA sobre a peça defeituosa", hint: "Substitua o componente com problema", target: "manutencao" },
        { label: "ETAPA 4: Arraste o CD DO LINUX até o drive", hint: "Instale o sistema operacional livre", target: "formatacao" },
        { label: "ETAPA 5: Arraste o POWER até o botão de ligar", hint: "Ligue o computador para testar", target: "teste" },
      ]
    }
  },
  16: {
    type: "simulation_calculadora",
    title: "Calculadora de Impacto Ambiental",
    subtitle: "Calcule o impacto do recondicionamento",
    introDialog: {
      character: "JonJon",
      lines: [
        "Antes de usar a calculadora, vou explicar como os números funcionam!",
        "O multiplicador de 8 kg foi baseado em estimativas médias de peso de computadores desktop completos descartados como lixo eletrônico.",
        "Estudos ambientais utilizam médias entre 7 kg e 12 kg por equipamento. Adotamos 8 kg como referência simplificada.",
        "Já o cálculo de metais pesados utiliza aproximadamente 3 kg de componentes contaminantes por computador (chumbo, mercúrio, cádmio).",
        "O objetivo não é um laudo técnico exato, mas demonstrar de forma educativa o impacto ambiental positivo do recondicionamento!",
        "Agora vamos calcular! Digite um número e veja a mágica acontecer! ♻️"
      ]
    },
    data: {
      tasks: [
        { label: "Digite quantos computadores foram recondicionados este mês", hint: "Ex: 150", target: "input-pcs" },
        { label: "Clique em CALCULAR para ver o impacto", hint: "Botão verde abaixo", target: "btn-calcular" },
        { label: "Veja quantas toneladas de lixo eletrônico foram evitadas", hint: "Clique no campo", target: "result-lixo" },
        { label: "Veja quantos kg de metais pesados deixaram de contaminar", hint: "Clique no campo", target: "result-metais" },
        { label: "Clique em REGISTRAR para salvar os dados", hint: "Botão azul abaixo", target: "btn-registrar" },
      ]
    }
  },
  17: {
    type: "simulation_checklist",
    title: "Quem Pode Receber?",
    subtitle: "Marque ✅ ou ❌ para cada entidade",
    data: {
      tasks: [
        { label: "Escola Municipal de Manaus - PODE receber?", hint: "Órgão público educacional", target: "escola", correto: true },
        { label: "Empresa XYZ Tecnologia Ltda - PODE receber?", hint: "Empresa com fins lucrativos", target: "empresa", correto: false },
        { label: "ONG de Inclusão Digital de Idosos - PODE receber?", hint: "Entidade sem fins lucrativos", target: "ong", correto: true },
        { label: "CRAS do município - PODE receber?", hint: "Centro de Referência de Assistência Social", target: "cras", correto: true },
        { label: "Partido Político Municipal - PODE receber?", hint: "Partidos políticos", target: "partido", correto: false },
      ]
    }
  },
  18: {
    type: "simulation_relatorio",
    title: "Relatório de Visita Técnica",
    subtitle: "Preencha o formulário de monitoramento",
    data: {
      tasks: [
        { label: "Preencha a DATA da visita", hint: "Formato: DD/MM/AAAA", target: "input-data" },
        { label: "Preencha o NOME DO PID visitado", hint: "Ex: Escola Municipal Santos Dumont", target: "input-pid" },
        { label: "Preencha quantos COMPUTADORES estão funcionando", hint: "Número de equipamentos operacionais", target: "input-pcs" },
        { label: "Selecione o STATUS da visita", hint: "Escolha uma opção", target: "select-status" },
        { label: "Clique em ENVIAR RELATÓRIO", hint: "Botão verde abaixo", target: "btn-enviar" },
      ]
    }
  },
  19: {
    type: "simulation_montagem",
    title: "Monte um Telecentro",
    subtitle: "Arraste os equipamentos para a sala",
    data: {
      tasks: [
        { label: "Arraste as MESAS para a sala", hint: "Móveis para apoiar os equipamentos", target: "mesas" },
        { label: "Arraste as CADEIRAS para a sala", hint: "Para os usuários sentarem", target: "cadeiras" },
        { label: "Arraste os COMPUTADORES para a sala", hint: "Equipamentos principais do telecentro", target: "computadores" },
        { label: "Arraste o ROTEADOR para a sala", hint: "Para fornecer internet", target: "roteador" },
        { label: "Arraste o MATERIAL DIDÁTICO para a sala", hint: "Apostilas e guias de uso", target: "material" },
      ]
    }
  },
  20: {
    type: "simulation_govbr",
    title: "Central de Serviços Gov.br",
    subtitle: "Ajude os cidadãos a encontrar o serviço certo",
    data: {
      tasks: [
        { label: "Ajude uma diva senhora a se aposentar", hint: "Serviço do INSS", target: "inss", opcoes: ["Meu INSS", "Carteira Digital", "e-CAC", "SUS Digital"], correto: "Meu INSS" },
        { label: "Ajude um jovem TDAH a solicitar uma nova carteira", hint: "Documento de habilitação digital", target: "cnh", opcoes: ["Meu INSS", "Carteira Digital de Trânsito", "Gov.br Serviços", "e-CAC"], correto: "Carteira Digital de Trânsito" },
        { label: "Ajude um ricasso a declarar imposto de renda", hint: "Serviço da Receita Federal", target: "ir", opcoes: ["Meu INSS", "SUS Digital", "e-CAC", "Carteira Digital"], correto: "e-CAC" },
        { label: "Ajude uma mãe a proteger seu filho para que ele não se torne um degustador de detergente", hint: "Serviço do Ministério da Saúde", target: "sus", opcoes: ["Meu INSS", "e-CAC", "Carteira Digital", "SUS Digital"], correto: "SUS Digital" },
        { label: "Ajude um trabalhador a ver seu fundo de garantia", hint: "Aplicativo da Caixa", target: "fgts", opcoes: ["FGTS Digital", "Meu INSS", "e-CAC", "SUS Digital"], correto: "FGTS Digital" },
      ]
    }
  },
    // ── MUNDO 3: CGID (ATUALIZADO) ──────────────────────────
  21: {
    type: "simulation_trem_mapa",
    title: "A Jornada da Inclusão Digital",
    subtitle: "Acompanhe o trem da CGID pelo Brasil",
    data: {
      tasks: [
        { label: "Clique no DESFAZIMENTO para iniciar", hint: "O processo começa aqui", target: "desfazimento" },
        { label: "Clique no CRC", hint: "Centro de Recondicionamento", target: "crc" },
        { label: "Clique no SETOR DE EVENTOS", hint: "Organiza a cerimônia", target: "eventos" },
        { label: "Clique no SETOR DE SISTEMAS", hint: "Registra os dados", target: "sistemas" },
        { label: "Clique na INCLUSÃO DIGITAL", hint: "Destino final!", target: "inclusao" },
      ]
    }
  },
  22: {
    type: "simulation_evento",
    title: "Organize um Evento Institucional",
    subtitle: "Preencha o briefing do evento",
    data: {
      tasks: [
        { label: "Preencha o NOME DO EVENTO", hint: "Ex: Cerimônia de Doação de Computadores", target: "nome-evento" },
        { label: "Preencha a DATA do evento", hint: "Formato: DD/MM/AAAA", target: "data-evento" },
        { label: "Preencha o LOCAL do evento", hint: "Ex: Auditório do MCom - Brasília/DF", target: "local-evento" },
        { label: "Selecione o PÚBLICO-ALVO", hint: "Quem participará?", target: "publico-evento" },
        { label: "Clique em FINALIZAR BRIEFING", hint: "Botão verde abaixo", target: "btn-finalizar" },
      ]
    }
  },
  23: {
    type: "simulation_desfazimento",
    title: "Jornada do Desfazimento",
    subtitle: "Acompanhe o caminhão do CRC",
    data: {
      tasks: [
        { label: "Clique no ÓRGÃO PÚBLICO para iniciar", hint: "É o ponto de partida", target: "orgao" },
        { label: "Clique no CAMINHÃO para buscar os equipamentos", hint: "Transporte para o CRC", target: "caminhao" },
        { label: "Clique no CRC para recondicionar", hint: "Centro de Recondicionamento", target: "crc" },
        { label: "Clique no CAMINHÃO para entregar ao PID", hint: "Levar os PCs recondicionados", target: "caminhao2" },
        { label: "Clique no PID para finalizar a entrega", hint: "Ponto de Inclusão Digital", target: "pid" },
      ]
    }
  },
  24: {
    type: "simulation_solicitacao",
    title: "Solicitação de Computadores",
    subtitle: "Preencha o formulário para solicitar equipamentos",
    data: {
      tasks: [
        { label: "Preencha o NOME DA INSTITUIÇÃO", hint: "Escola, ONG ou órgão público", target: "input-nome" },
        { label: "Preencha o CNPJ", hint: "14 dígitos - XX.XXX.XXX/XXXX-XX", target: "input-cnpj" },
        { label: "Preencha a QUANTIDADE de computadores", hint: "Número de equipamentos necessários", target: "input-qtd" },
        { label: "Selecione o TIPO DE INSTITUIÇÃO", hint: "Classificação da entidade", target: "select-tipo" },
        { label: "Clique em ENVIAR SOLICITAÇÃO", hint: "Botão verde abaixo", target: "btn-enviar" },
      ]
    }
  },
  25: {
    type: "simulation_act",
    title: "Monte o Plano de Trabalho do ACT",
    subtitle: "Preencha os campos essenciais do acordo",
    data: {
      tasks: [
        { label: "Preencha o NOME DO PARTÍCIPE 2", hint: "Órgão/entidade que firmará o acordo", target: "input-participe" },
        { label: "Preencha o OBJETO do acordo", hint: "Ex: Cooperação para doação de equipamentos", target: "input-objeto" },
        { label: "Selecione a META PRINCIPAL", hint: "O que se espera alcançar?", target: "select-meta" },
        { label: "Preencha o PRAZO de vigência (meses)", hint: "Duração do acordo", target: "input-prazo" },
        { label: "Clique em ASSINAR ACORDO", hint: "Botão verde abaixo", target: "btn-assinar" },
      ]
    }
  },
  26: {
    type: "simulation_pixelart",
    title: "Restaure o Painel Ambiental",
    subtitle: "Pinte o monitor do Dia Mundial do Meio Ambiente",
    data: {
      tasks: [
        { label: "Pinte o FUNDO AZUL do painel", hint: "Use a cor azul clarinho (1ª da paleta)", target: "pixel-fundo" },
        { label: "Pinte as ÁREAS VERDES", hint: "Use a cor verde (2ª da paleta)", target: "pixel-verde" },
        { label: "Pinte os DETALHES BRANCOS", hint: "Use a cor branca (3ª da paleta)", target: "pixel-branco" },
        { label: "Pinte a BARRA INFERIOR escura", hint: "Use a cor escura (4ª da paleta)", target: "pixel-barra" },
        { label: "Complete o painel e LIGUE O MONITOR", hint: "Pinte todos os pixels e clique em LIGAR", target: "btn-ligar" },
      ]
    }
  },
  27: {
    type: "simulation_termo_excel",
    title: "Registro de Termo de Doação",
    subtitle: "Confira o termo e preencha a planilha completa",
    data: {
      tasks: [
        { label: "Preencha o NOME DO PID", hint: "Conforme aparece no termo ao lado", target: "cell-a2" },
        { label: "Preencha a QTD de EQUIPAMENTOS", hint: "Número de computadores doados", target: "cell-b2" },
        { label: "Preencha o CNPJ", hint: "14 dígitos", target: "cell-c2" },
        { label: "Preencha o ENDEREÇO", hint: "Rua, número, bairro", target: "cell-d2" },
        { label: "Preencha o MUNICÍPIO", hint: "Cidade do PID", target: "cell-e2" },
        { label: "Preencha o ESTADO (UF)", hint: "Ex: DF, SP, MG", target: "cell-f2" },
        { label: "Preencha a DATA da doação", hint: "Formato DD/MM/AAAA", target: "cell-g2" },
        { label: "Clique em SALVAR REGISTRO", hint: "Botão verde abaixo", target: "btn-salvar" },
      ]
    }
  },
  28: {
    type: "simulation_prestacao",
    title: "Detetive Financeiro",
    subtitle: "Confira a prestação de contas do CRC",
    data: {
      tasks: [
        { label: "Confira a NOTA FISCAL 001/2025 - R$ 5.000", hint: "Cursos de Formação - valor correto?", target: "nf-001", valorDeclarado: 5000, valorCorreto: 5000, desc: "Pagamento de instrutor de TI" },
        { label: "Confira a NOTA FISCAL 002/2025 - R$ 3.500", hint: "Manutenção de Equipamentos - valor correto?", target: "nf-002", valorDeclarado: 3500, valorCorreto: 3500, desc: "Compra de peças de reposição" },
        { label: "Confira a NOTA FISCAL 003/2025 - R$ 2.000", hint: "Material Didático - valor correto?", target: "nf-003", valorDeclarado: 2000, valorCorreto: 2000, desc: "Apostilas e certificados" },
        { label: "Confira a NOTA FISCAL 004/2025 - R$ 12.000", hint: "Estrutura Física - valor correto?", target: "nf-004", valorDeclarado: 12000, valorCorreto: 12000, desc: "Aluguel do espaço" },
        { label: "Confira a NOTA FISCAL 005/2025 - R$ 4.500", hint: "Material de Escritório - valor correto?", target: "nf-005", valorDeclarado: 4500, valorCorreto: 4500, desc: "Canetas, papéis e pastas" },
      ]
    }
  },
  29: {
    type: "simulation_corrida_crc",
    title: "Corrida dos CRCs",
    subtitle: "Percorra o Brasil encontrando todos os CRCs",
    data: {
      tasks: [
        { label: "Qual CRC atende o CEARÁ?", hint: "Instituto de Assistência e Proteção Social", target: "CE", estado: "CE", resposta: "IAPS", sigla: "IAPS", nomeCompleto: "Instituto de Assistência e Proteção Social", opcoes: ["IAPS", "INAC", "IBAV", "IDC"] },
        { label: "Qual CRC atende o RIO DE JANEIRO?", hint: "Instituto Nova Ágora de Cidadania", target: "RJ", estado: "RJ", resposta: "INAC", sigla: "INAC", nomeCompleto: "Instituto Nova Agora de Cidadania", opcoes: ["IBAV", "IFMS", "IAPS", "INAC"] },
        { label: "Qual CRC atende GOIÁS?", hint: "Instituto Brasileiro Amigos da Vida", target: "GO", estado: "GO", resposta: "IBAV", sigla: "IBAV", nomeCompleto: "Instituto Brasileiro Amigos da Vida", opcoes: ["IFMA", "IEC", "IBAV", "INAC"] },
        { label: "Qual CRC atende PERNAMBUCO?", hint: "Instituto de Inovação e Economia Circular", target: "PE", estado: "PE", resposta: "IEC", sigla: "IEC", nomeCompleto: "Instituto de Inovacao e Economia Circular", opcoes: ["ITCD", "IEC", "INAC", "IFS"] },
        { label: "Qual CRC atende o AMAZONAS?", hint: "Instituto Descarte Correto", target: "AM", estado: "AM", resposta: "IDC", sigla: "IDC", nomeCompleto: "Instituto Descarte Correto", opcoes: ["FUNPAPI", "IGH", "IFMS", "IDC"] },
        { label: "Qual CRC atende o MARANHÃO?", hint: "Instituto Federal do Maranhão", target: "MA", estado: "MA", resposta: "IFMA", sigla: "IFMA", nomeCompleto: "Instituto Federal do Maranhão", opcoes: ["IEC", "IGH", "IDC", "IFMA"] },
        { label: "Qual CRC atende MATO GROSSO DO SUL?", hint: "Instituto Federal do Mato Grosso do Sul", target: "MS", estado: "MS", resposta: "IFMS", sigla: "IFMS", nomeCompleto: "Instituto Federal do Mato Grosso do Sul", opcoes: ["IFMA", "IFMS", "IFS", "INAC"] },
        { label: "Qual CRC atende SERGIPE?", hint: "Instituto Federal de Sergipe", target: "SE", estado: "SE", resposta: "IFS", sigla: "IFS", nomeCompleto: "Instituto Federal de Sergipe", opcoes: ["PRODABEL", "IFMS", "IFS", "IGH"] },
        { label: "Qual CRC atende a BAHIA?", hint: "Instituto Tecnológico Conexão Digital", target: "BA", estado: "BA", resposta: "ITCD", sigla: "ITCD", nomeCompleto: "Instituto Tecnologico Conexao Digital", opcoes: ["UFLA", "IEC", "IDC", "ITCD"] },
        { label: "Qual CRC atende o DISTRITO FEDERAL?", hint: "Programando o Futuro", target: "DF", estado: "DF", resposta: "Programando o Futuro", sigla: "PROGFUT", nomeCompleto: "Programando o Futuro", opcoes: ["INAC", "E-LETRO", "Programando o Futuro", "NCC Belém"] },
        { label: "Qual CRC atende o PARÁ?", hint: "Instituto Gustavo Hessel", target: "PA", estado: "PA", resposta: "IGH", sigla: "IGH", nomeCompleto: "Instituto Gustavo Hessel", opcoes: ["IAPS", "IDC", "IFMA", "IGH"] },
        { label: "Qual CRC atende o RIO GRANDE DO SUL?", hint: "Núcleo Comunitário e Cultural Belém Novo", target: "RS", estado: "RS", resposta: "NCC Belém Novo", sigla: "NCC", nomeCompleto: "Nucleo Comunitario e Cultural Belem Novo", opcoes: ["NCC Belém Novo", "E-LETRO", "IFS", "UNIVASF"] },
        { label: "Qual CRC atende o AMAPÁ?", hint: "Universidade Federal do Amapá", target: "AP", estado: "AP", resposta: "UNIFAP", sigla: "UNIFAP", nomeCompleto: "Universidade Federal do Amapa", opcoes: ["UNIFAP", "UFLA", "UNIVASF", "IFMA"] },
        { label: "Qual CRC atende MINAS GERAIS?", hint: "Empresa de Informática e Informação do Município de Belo Horizonte", target: "MG", estado: "MG", resposta: "PRODABEL", sigla: "PRODABEL", nomeCompleto: "Empresa de Informática e Informação do Município de Belo Horizonte", opcoes: ["IFS", "PRODABEL", "UNIFAP", "UNIVASF"] },
        { label: "Qual CRC atende TOCANTINS?", hint: "Programando o Futuro (filial TO)", target: "TO", estado: "TO", resposta: "Programando o Futuro", sigla: "PROGFUT", nomeCompleto: "Programando o Futuro", opcoes: ["Programando o Futuro", "E-LETRO", "FUNPAPI", "IFMS"] },
        { label: "Qual CRC atende o PIAUÍ?", hint: "Fundação de Proteção ao Meio Ambiente e Ecoturismo", target: "PI", estado: "PI", resposta: "FUNPAPI", sigla: "FUNPAPI", nomeCompleto: "Fundacao de Protecao ao Meio Ambiente e Ecoturismo", opcoes: ["FUNPAPI", "IFMA", "IEC", "IBAV"] },
        { label: "Qual CRC atende RORAIMA?", hint: "Instituto de Incubação e Aceleração", target: "RR", estado: "RR", resposta: "IA", sigla: "IA", nomeCompleto: "Instituto de Incubacao e Aceleracao", opcoes: ["IA", "IDC", "UNIFAP", "IGH"] },
      ]
    }
  },
  30: {
    type: "simulation_quiz_final",
    title: "Missão Final",
    subtitle: "Teste todos os seus conhecimentos!",
    data: {
      tasks: [
        { label: "Qual atalho abre o Explorador de Arquivos?", hint: "Windows + letra", target: "q1", resposta: "Windows+E", opcoes: ["Windows+E", "Ctrl+E", "Alt+F4", "Windows+D"] },
        { label: "Qual programa do MCom leva internet via satélite para escolas?", hint: "Wi-Fi + país", target: "q2", resposta: "Wi-Fi Brasil", opcoes: ["Wi-Fi Brasil", "Norte Conectado", "Digitaliza Brasil", "5G"] },
        { label: "O que significa a sigla CRC?", hint: "Centro de Recondicionamento...", target: "q3", resposta: "Centro de Recondicionamento de Computadores", opcoes: ["Centro de Recondicionamento de Computadores", "Central de Recursos Computacionais", "Comitê de Revisão de Comunicações", "Conselho de Recuperação Cibernética"] },
        { label: "Qual o fluxo correto do programa?", hint: "Cedente → ? → ? → Comunidade", target: "q4", resposta: "CRC → Recondicionamento → PID", opcoes: ["CRC → Recondicionamento → PID", "Recondicionamento → CRC → PID", "CRC → PID → Recondicionamento", "PID → CRC → Recondicionamento"] },
        { label: "Qual setor organiza cerimônias de doação?", hint: "Setor de...", target: "q5", resposta: "Eventos", opcoes: ["Eventos", "Desfazimento", "Sistemas", "Design"] },
      ]
    }
  },
}