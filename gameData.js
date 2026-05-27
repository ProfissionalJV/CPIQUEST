// ═══════════════════════════════════════════════════════════
// CPIQuest — 3 Mundos com perguntas reais dos PDFs
// ═══════════════════════════════════════════════════════════

const WORLDS = [
  { id: 1, name: "Internet das Coisas", subtitle: "Windows, Office & Atalhos", emoji: "💻", color: "#2563EB", totalStages: 10 },
  { id: 2, name: "MCom", subtitle: "Ministério das Comunicações", emoji: "📡", color: "#DC2626", totalStages: 10 },
  { id: 3, name: "CGID", subtitle: "Guia de Atribuições e Fluxos", emoji: "🏛️", color: "#059669", totalStages: 10 },
];

const DIFFICULTY_CONFIG = {
  easy:   { label: "Básico", color: "#059669" },
  medium: { label: "Intermediário", color: "#D97706" },
  hard:   { label: "Avançado", color: "#DC2626" },
};

const DEFAULT_AVATAR = {
  skinTone: "medium",
  hairStyle: "short",
  hairColor: "#2C1810",
  topColor: "#2563EB",
  bottomColor: "#1E40AF",
  gender: "male",
  accessory: "none"
};

// ═══════════════════════════════════════════════════════════
// MUNDO 1 — Informática (VERSÃO CONDENSADA)
// ═══════════════════════════════════════════════════════════

const WORLD1_STAGES = [
{
  id: 1, worldId: 1, name: "Windows I", icon: "🖥️", difficulty: "easy",
  intro: { character: "JonJon", lines: [
    "Eai pessoal, eu sou o JonJon e serei o guia de vocês pelo mundo da informática.",
    "Vamos começar pelo Windows, o sistema operacional mais comum em escritório, estágio e faculdade.",
    "A Área de Trabalho é a tela principal. É onde a gente salva pasta, arquivo, atalho e tudo mais... ou deixa igual eu: clean aesthetic.",
    "A Barra de Tarefas fica na parte de baixo da tela. Ela deixa os aplicativos mais acessíveis (Chrome, Excel, WhatsApp, Explorer) e também tem o relógio - que sempre tem alguém acompanhando esperando dar o horário de ir embora, né Yara?",
    "O Menu Iniciar é aquele botão com o logo do Windows na barra de tarefas. Clicando ali dá pra pesquisar aplicativo, arquivo, configuração... basicamente qualquer coisa do computador.",
    "A Lixeira guarda arquivos que você deletou TEMPORARIAMENTE. Dá pra restaurar, viu? É tipo um 'armário' dos arquivos. Mas se você resolver fazer uma faxina e não prestar atenção, já era.",
    "O Explorador de Arquivos organiza seus documentos, imagens, downloads... é a central da bagunça organizada.",
    "A Visão de Tarefas (Task View) organiza janelas em áreas virtuais. Útil quando você tem 15 coisas abertas ao mesmo tempo.",
    "Entenderam? Vamos responder algumas perguntas pra descobrir."
  ]},
  quiz: [
    { question: "Qual é a função principal da 'Lixeira' no Windows?", 
      options: ["Armazenar arquivos permanentemente", "Excluir arquivos imediatamente", "Armazenar arquivos temporariamente", "Armazenar arquivos na nuvem", "Compactar arquivos automaticamente"], 
      correct: 2 },
    { question: "Diferença entre 'Arquivo' e 'Pasta'?", 
      options: ["Arquivo contém dados, Pasta organiza", "Pasta contém dados, Arquivo organiza", "Arquivo e Pasta são a mesma coisa", "Arquivo é só texto, Pasta é só imagem", "Arquivo não pode ser excluído"], 
      correct: 0 },
    { question: "Onde fica o botão do Menu Iniciar?", 
      options: ["Canto superior esquerdo", "Canto superior direito", "Barra de tarefas (inferior esquerdo)", "Centro da Área de Trabalho", "Dentro do Explorador de Arquivos"], 
      correct: 2 },
    { question: "O que é a 'Barra de Tarefas'?", 
      options: ["Barra que mostra programas abertos e relógio", "Barra que edita documentos", "Barra que pesquisa na internet", "Barra que formata textos", "Barra que controla volume"], 
      correct: 0 },
    { question: "Qual recurso organiza janelas em áreas virtuais?", 
      options: ["Gerenciador de Tarefas", "Visão de Tarefas (Task View)", "Painel de Controle", "Menu de Contexto", "Barra de Ferramentas"], 
      correct: 1 },
  ]
},

// ═══════════════════════════════════════════════════════════
// WINDOWS II
// ═══════════════════════════════════════════════════════════

{
  id: 2, worldId: 1, name: "Windows II", icon: "⚙️", difficulty: "easy",
  intro: { character: "JonJon", lines: [
    "Agora vamos pros atalhos. Depois que acostuma, usar computador sem atalho vira castigo.",
    "Ctrl+C copia, Ctrl+V cola, Ctrl+N duplica a janela, Ctrl+X recorta (tira de um lugar pra colar em outro). Ctrl+Z desfaz - o salvador da pátria.",
    "Windows+E abre o Explorador de Arquivos direto. Pode ajudar MUITO no dia a dia.",
    "Delete manda pra lixeira (ainda dá tempo de voltar atrás). Shift+Delete apaga de vez - o arquivo desaparece, te dá um ghosting igual aquele carinha ou menina do tinder.",
    "Windows+L bloqueia o computador rapidinho. Útil quando você levanta da mesa e não quer ninguém fique vendo as notificações do seu whatsapp ou os arquivos que você tá mexendo. Esse é top maiores inimigos da Clara e da Karine.",
    "'Fixar no Acesso Rápido' cria um atalho na barra lateral do Explorer para pastas que você usa todo dia.",
    "Captaram? Anotaram? Vamos ver se tão ligados."
  ]},
  quiz: [
    { question: "O que faz 'Fixar no Acesso Rápido'?", 
      options: ["Criar atalho na barra lateral do Explorer", "Bloquear o arquivo com senha", "Mover arquivo para nuvem", "Acelerar a abertura do arquivo", "Copiar para área de transferência"], 
      correct: 0 },
    { question: "Windows + L faz o quê?", 
      options: ["Bloquear a sessão do usuário", "Limpar a memória RAM", "Abrir o Explorador", "Desligar o computador", "Alternar entre janelas"], 
      correct: 0 },
    { question: "Shift + Delete faz o quê?", 
      options: ["Excluir permanentemente (sem Lixeira)", "Enviar para Lixeira", "Compactar em arquivo ZIP", "Criar backup do arquivo", "Renomear o arquivo"], 
      correct: 0 },
    { question: "Diferença entre COPIAR e RECORTAR?", 
      options: ["Copiar duplica; Recortar move", "Recortar duplica; Copiar move", "Ambos fazem a mesma coisa", "Copiar é só texto; Recortar é imagem", "Copiar precisa de internet; Recortar não"], 
      correct: 0 },
    { question: "Atalho para abrir o Explorador de Arquivos?", 
      options: ["Windows+E", "Windows+F", "Windows+R", "Windows+D", "Windows+L"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// WINDOWS III
// ═══════════════════════════════════════════════════════════

{
  id: 3, worldId: 1, name: "Windows III", icon: "🛠️", difficulty: "medium",
  intro: { character: "JonJon", lines: [
    "Agora vocês vão aprender a sobreviver quando o computador resolver sofrer. Porque uma hora isso acontece.",
    "Gerenciador de Tarefas (Ctrl+Alt+Del ou Ctrl+Shift+Esc) monitora o que tá acontecendo no PC. Se um programa fica 'Sem Resposta', significa que travou e precisa ser encerrado.",
    "Windows + D mostra a Área de Trabalho na hora - minimiza tudo que tá aberto. Windows + seta esquerda/direita organiza a janela na lateral da tela, bom pra dividir duas coisas ao mesmo tempo (Excel de um lado, pdf do outro).",
    "O Painel de Controle reúne configurações importantes: impressora, som, teclado, rede... o Windows esconde metade da vida lá dentro.",
    "Dúvidas? Infelizmente não posso resolver pois eu sou só um guia, mas vamos testar o que aprenderam."
  ]},
  quiz: [
    { question: "Como acessar o Gerenciador de Tarefas?", 
      options: ["Ctrl+Shift+Esc", "Ctrl+Alt+Del", "Crtl+Alt+Del", "Crtl+Shift+Del", "Windows+X"], 
      correct: 0 },
    { question: "Atalho para COPIAR um arquivo?", 
      options: ["Ctrl+C", "Ctrl+X", "Ctrl+V", "Crtl+C", "Ctrl+Y"], 
      correct: 0 },
    { question: "Atalho para abrir o Explorador de Arquivos?", 
      options: ["Windows+E", "Windows+F", "Windows+R", "Windows+D", "Windows+L"], 
      correct: 0 },
    { question: "Programa com status 'Sem Resposta' significa:", 
      options: ["Travou, precisa ser encerrado", "Está economizando bateria", "Está atualizando em segundo plano", "Aguardando impressão", "Está em modo de economia"], 
      correct: 0 },
    { question: "Windows+D faz o quê?", 
      options: ["Mostrar a Área de Trabalho", "Abrir documentos recentes", "Desligar o computador", "Abrir configurações", "Bloquear a sessão"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// ATALHOS I
// ═══════════════════════════════════════════════════════════

{
  id: 4, worldId: 1, name: "Atalhos I", icon: "⌨️", difficulty: "medium",
  intro: { character: "JonJon", lines: [
    "Quem aprende atalho começa a trabalhar muito mais rápido sem perceber. Esse eu demorei pra acostumar, de vez em quando faço como os incas e os astecas e uso o mouse.",
    "Alt+Tab troca entre as janelas abertas - ao invés de ficar minimizando tudo igual desesperado, você só alterna rapidinho.",
    "Ctrl+T abre nova aba no navegador. Ctrl+W fecha a aba atual. Ctrl+Shift+T reabre a última aba fechada - acho que esse já salvou muita gente.",
    "Ctrl+A seleciona TUDO. Tudo mesmo. Então cuidado pra não apagar coisa que não deveria.",
    "Ctrl+S salva o documento atual. Ctrl+P imprime. Ctrl+O abre arquivo. Ctrl+Y desfaz o que você acabou de desfazer. Ctrl+A+Enter abre varios arquivos de uma vez (só testei com pdf).",
    "Importante: Ctrl+J NÃO é um atalho válido do Windows (existe no navegador pra abrir downloads, mas no sistema em si? Não). Essa pega muito desavisado.",
    "Vamos testar."
  ]},
  quiz: [
    { question: "Para selecionar TODO o conteúdo, qual atalho?", 
      options: ["Ctrl+A", "Ctrl+T", "Ctrl+E", "Ctrl+Shift+A", "Alt+A"], 
      correct: 0 },
    { question: "Reabrir a última aba fechada no navegador?", 
      options: ["Ctrl+Shift+T", "Ctrl+T", "Ctrl+W", "Ctrl+N", "Ctrl+Shift+N"], 
      correct: 0 },
    { question: "Qual destes NÃO é um atalho válido do Windows?", 
      options: ["Ctrl+C", "Ctrl+V", "Ctrl+Z", "Ctrl+J", "Ctrl+X"], 
      correct: 3, negativa: true },
    { question: "Atalho para SALVAR o documento atual?", 
      options: ["Ctrl+S", "Ctrl+P", "Ctrl+N", "Ctrl+O", "Ctrl+F"], 
      correct: 0 },
    { question: "Qual atalho é usado para DESFAZER a última ação?", 
      options: ["Ctrl+Z", "Ctrl+Y", "Ctrl+D", "Ctrl+X", "Ctrl+R"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// ATALHOS II
// ═══════════════════════════════════════════════════════════

{
  id: 5, worldId: 1, name: "Atalhos II", icon: "🚀", difficulty: "medium",
  intro: { character: "JonJon", lines: [
    "Mais atalhos. Alguns pra usar todo dia, outros pra momentos específicos.",
    "F2 renomeia o arquivo ou pasta que você tá selecionando - bem mais rápido que clicar com botão direito.",
    "Alt+PrtScn captura apenas a janela ativa (não a tela inteira). Win+Shift+S abre a ferramenta de recorte pra selecionar uma área específica.",
    "Windows + V: Abre o histórico da área de transferência (permite colar vários itens copiados anteriormente). Ctrl+Shift+V: Cola sem formatação (útil pra evitar bagunçar o estilo do documento).",
    "Ctrl+F abre busca dentro da página ou documento - bom pra achar informação perdida num PDF gigante.",
    "Windows + . (ponto): Abre o painel de emojis e GIFs. Windows + ALT + R	inicia uma gravação de tela. ",
    "Muita coisa né? Anotem, talvez ajude no futuro."
  ]},
  quiz: [
    { question: "Alternar entre janelas abertas (trocar de programa)?", 
      options: ["Alt+Tab", "Ctrl+Tab", "Windows+Tab", "Shift+Tab", "Alt+Shift"], 
      correct: 0 },
    { question: "Renomear um arquivo sem usar o mouse?", 
      options: ["F2", "F1", "F5", "F3", "F4"], 
      correct: 0 },
    { question: "Capturar apenas a janela ativa (print screen)?", 
      options: ["Alt+PrtScn", "PrtScn", "Win+PrtScn", "Ctrl+PrtScn", "Shift+PrtScn"], 
      correct: 0 },
    { question: "Atalho para colar sem Formatação?", 
      options: ["Ctrl+Shift+V", "Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], 
      correct: 0 },
    { question: "Win+Shift+S serve para qual função?", 
      options: ["Ferramenta de recorte (capturar área)", "Salvar arquivo", "Desligar monitor", "Configurar som", "Bloquear sessão"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// WORD I
// ═══════════════════════════════════════════════════════════

{
  id: 6, worldId: 1, name: "Word I", icon: "📝", difficulty: "medium",
  intro: { character: "JonJon", lines: [
    "Word. É do babado, até hoje sofro para apagar uma página em branco.",
    "Ctrl+T seleciona todo o texto, Ctrl+B negrita, Ctrl+I itálico, Ctrl+U sublinha. Shift + F3 transforma a letra em maiúscula ou minuscula - é o básico da formatação.",
    "Alinhamento: Ctrl+L (esquerda), Ctrl+E (centro), Ctrl+R (direita), Ctrl+J (justificado - fica igual livro, margens dos dois lados alinhadas).",
    "Pincel de Formatação copia o estilo de um texto e aplica em outro, funciona melhor que tentar copiar manualmente.",
    "Régua é aquela faixa cinza em cima que define recuos, margens e tabulações. A maioria nunca usa, eu mesmo nunca usei.",
    "Faixa de Opções (Ribbon) são as abas no topo com as ferramentas: Página Inicial, Inserir, Layout...",
    "Marcadores são as bolinhas (•). Numeração é 1, 2, 3. Básico mas salva.",
    "Lembra da página em branco? Pra apagar siga: Página Inicial, clique no ícone de parágrafo (¶) pra mostrar os caracteres invisíveis, selecione tudo (Ctrl+T) e delete. Se não funcionar, tem um parágrafo escondido lá embaixo, é só selecionar e deletar também.",
    "Só o ouro né? Vamos para as perguntas."
  ]},
  quiz: [
    { question: "Qual recurso copia o estilo visual de um trecho para outro?", 
      options: ["Pincel de Formatação", "AutoCorreção", "Quebra de Página", "Layout", "Marcadores"], 
      correct: 0 },
    { question: "Ferramenta visual que define recuos e margens no Word?", 
      options: ["Régua", "Barra de Status", "Painel de Navegação", "Grade", "Ribbon"], 
      correct: 0 },
    { question: "Lista com símbolos (•) é chamada de:", 
      options: ["Marcadores", "Numeração", "Estilos", "Sumário", "Tópicos"], 
      correct: 0 },
    { question: "Atalho para justificar o texto (alinhar dos dois lados)?", 
      options: ["Ctrl+J", "Ctrl+E", "Ctrl+D", "Ctrl+L", "Ctrl+R"], 
      correct: 0 },
    { question: "O que é a Faixa de Opções (Ribbon) no Word?", 
      options: ["Abas no topo com ferramentas", "Barra de rolagem lateral", "Espaço de digitação", "Rodapé do documento", "Barra de status"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// WORD II
// ═══════════════════════════════════════════════════════════

{
  id: 7, worldId: 1, name: "Word II", icon: "✍️", difficulty: "hard",
  intro: { character: "JonJon", lines: [
    "Word avançado. Coisa que diferencia quem sabe de quem finge que sabe.",
    "Mala Direta: você cria um modelo e o Word gera versões personalizadas pra cada pessoa da sua lista. Thiago sabe dessa e ainda bem né? Já pensou ter que fazer 300 certificados de doação um por um? O Word faz isso, é só configurar direitinho.",
    "Sumário Automático: se você usou os Estilos de Título (Título 1, Título 2...), o Word monta sozinho sem você ficar digitando ponto.",
    "Controle de Alterações mostra cada mexida - quem escreveu o quê, quando, onde. É o radar do documento.",
    "Ctrl+Enter quebra a página (não precisa ficar dando Enter que nem louco). Ctrl+H localiza e substitui - alguém VAI errar o nome de um fulano no documento inteiro.",
    "O formato padrão editável do Word é .docx (versão antiga é .doc, .pdf é só leitura).",
    "Tem bastante funcionalidade, mas quis seguir no básico para que você explore aos poucos."
  ]},
  quiz: [
    { question: "Qual recurso envia um modelo personalizado para centenas de pessoas?", 
      options: ["Mala Direta", "Macro", "Hiperlink", "Direta Mala", "Comentários"], 
      correct: 0 },
    { question: "Formato de arquivo editável padrão do Word (extensão)?", 
      options: [".docx", ".doc", ".dotx", ".pdf", ".txt"], 
      correct: 0 },
    { question: "Para o Sumário Automático funcionar, é necessário:", 
      options: ["Usar Estilos de Título", "Salvar como PDF", "Numerar manualmente", "Ativar Controle de Alterações", "Inserir quebras de seção"], 
      correct: 0 },
    { question: "O atalho Ctrl+H no Word executa qual função?", 
      options: ["Localizar e Substituir", "Salvar documento", "Inserir hiperlink", "Ocultar faixa de opções", "Aplicar negrito"], 
      correct: 0 },
    { question: "Atalho para forçar uma quebra de página (nova página)?", 
      options: ["Ctrl+Enter", "Ctrl+P", "Shift+Enter", "Alt+Enter", "Ctrl+Shift+Enter"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// EXCEL I
// ═══════════════════════════════════════════════════════════ 

{
  id: 8, worldId: 1, name: "Excel I", icon: "📈", difficulty: "hard",
  intro: { character: "JonJon", lines: [
    "Agora vamos pro Excel. Respira antes de entrar em desespero, o povo escuta esse nome e já começa a suar frio, mas depois acostuma.",
    "E vocês vão usar MUITO aqui. Controle de ponto? Excel. Planilha de demandas? Excel. Retiradas da Caixa/Desfazimento/Computadores doados? Excel de novo.",
    "Linha é número, coluna é letra. O encontro de uma linha com uma coluna é uma CÉLULA: A1, B2, C10...",
    "Toda fórmula começa com SINAL DE IGUAL (=). Como por exemplo, se você quiser somar, utilize =SOMA(A1:A10) pra somar todos os valores entre a linha 1 e 10.",
    "Se você esquecer o =, o Excel acha que é texto e não calcula nada - aí a culpa vai pro Excel, mas na verdade foi tu que errou.",
    "O botão 'Formatar como Tabela' fica na Página Inicial. Ele aplica cores alternadas, filtros e bordas automaticamente - fica bonito, sua planilha vai parecer de profissional.",
    "Pra digitar um valor em uma célula, você pode: clicar e digitar, clicar duas vezes, pressionar Enter, ou usar a barra de fórmulas. Todas funcionam, escolhe a que preferir.",
    "Aquele quadradinho no canto da célula é o autopreenchimento, arrasta ele que o Excel continua o padrão sozinho. Tecnologia criada por alguém cansado de fazer tudo manualmente. Obrigado a essa pessoa.",
    "No Excel também temos o pincel de formatação, que copia o estilo de uma célula e aplica em outra. Lembrem-se dele, estagiários, principalmente quem mexe com planilhas que já estão padronizadas. Pegaram né Duda, Clara, Micheli, Thauanne, Paulo?",
  ]},
  quiz: [
    { question: "No Excel, o cruzamento de uma coluna com uma linha é chamado de:", 
      options: ["Célula", "Bloco", "Matriz", "Campo", "Registro"], 
      correct: 0 },
    { question: "Qual fórmula correta para somar os valores de A1 a A10?", 
      options: ["=SOMA(A1:A10)", "=SOMA(A1;A10)", "=SOMA(A1,A10)", "=SOMA(A1-A10)", "=SOMA(A1*A10)"], 
      correct: 0 },
    { question: "Onde fica a opção 'Formatar como Tabela' no Excel?", 
      options: ["Página Inicial → Formatar como Tabela", "Inserir → Tabela", "Página Inicial → Formatar", "Fórmulas → Tabela", "Arquivo → Tabela"], 
      correct: 0 },
    { question: "Para digitar um valor em uma célula, você deve:", 
      options: ["Clicar na célula e digitar", "Clicar duas vezes e digitar", "Pressionar Enter e digitar", "Usar a barra de fórmulas", "Todas as anteriores estão corretas"], 
      correct: 4 },
    { question: "O botão 'Formatar como Tabela' aplica quais estilos automaticamente?", 
      options: ["Cores alternadas, filtros e bordas", "Apenas bordas", "Apenas cores", "Apenas filtros", "Apenas negrito"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// EXCEL II
// ═══════════════════════════════════════════════════════════

{
  id: 9, worldId: 1, name: "Excel II", icon: "📊", difficulty: "hard",
  intro: { character: "JonJon", lines: [
    "Continuando no Excel. Agora a parte que deixa a planilha apresentável.",
    "O caminho pra formatar como tabela é: Página Inicial → Formatar como Tabela. O Excel aplica cores alternadas, filtro e bordas profissionais.",
    "Negrito no Excel é Ctrl+N. Ctrl+B é coisa de Word - essa confunde muita gente. Ctrl+I itálico, Ctrl+S sublinha, Ctrl+Shift+L liga e desliga os filtros.",
    "Pra salvar: F12 abre 'Salvar Como' pra escolher pasta e nome. Se não salvar... quando o PC reiniciar, o choro é livre. E se você confiar que o Excel vai salvar em um lugar, saiba que ele não vai e você que lute.",
    "Uma tabela formatada automaticamente inclui: cores alternadas (pra não confundir linha), filtros automáticos (pra buscar dados) e bordas profissionais.",
    "E um conselho: não usem Excel como bloco de notas, é horrível. Planilhas precisam estar padronizadas até a última instância, pois se nem nós conseguirmos entender o que tá escrito, imagina quem é de fora? Tomem cuidado, tudo é feito por um motivo. Se você não entende o motivo, é melhor não mexer e pedir ajuda. Se tiver dúvida, pergunta. Se não tiver dúvida, pergunta do mesmo jeito.",
    "Cabô"
  ]},
  quiz: [
    { question: "Qual caminho correto para formatar uma seleção como tabela no Excel?", 
      options: ["Página Inicial → Formatar como Tabela", "Inserir → Tabela Dinâmica", "Arquivo → Novo → Tabela", "Fórmulas → Criar Tabela", "Dados → Conectar → Tabela"], 
      correct: 0 },
    { question: "Qual atalho aplica formatação NEGRITO no Excel?", 
      options: ["Ctrl+N", "Ctrl+B", "Ctrl+G", "Alt+N", "Ctrl+Shift+N"], 
      correct: 0 },
    { question: "Para salvar um arquivo do Excel em uma pasta específica, o procedimento é:", 
      options: ["Arquivo → Salvar Como → Selecionar pasta → Salvar", "Arquivo → Salvar → Selecionar pasta", "Ctrl+S → Selecionar pasta", "F12 → Selecionar pasta", "Arquivo → Exportar → Salvar"], 
      correct: 0 },
    { question: "O atalho Ctrl+S no Excel executa qual função?", 
      options: ["Sublinhar texto", "Substituir texto", "Salvar o arquivo atual", "Selecionar todas as células", "Inserir símbolo"], 
      correct: 0 },
    { question: "Uma tabela formatada automaticamente pelo recurso 'Formatar como Tabela' inclui:", 
      options: ["Cores alternadas, filtros e bordas profissionais", "Apenas bordas nas células", "Apenas cores de fundo", "Apenas filtros automáticos", "Apenas formatação de números"], 
      correct: 0 },
  ]
},

// ═══════════════════════════════════════════════════════════
// OUTLOOK
// ═══════════════════════════════════════════════════════════

{
  id: 10, worldId: 1, name: "Outlook", icon: "📧", difficulty: "hard",
    intro: { character: "JonJon", lines: [
      "Outlook. O habitat natural do trabalhador brasileiro.",
      "PARA é quem precisa resolver a demanda. CC (Com Cópia) é quem só precisa acompanhar. CCO (Com Cópia Oculta) ninguém vê que a pessoa recebeu, é massa demais esse recurso.",
      "Respostas Automáticas avisam quando você tá fora. Ninguém fica no vácuo.",
      "Regras (Rules) automatizam ações: todo e-mail do coordenador vai pra pasta 'URGENTE'. Gustavinho gosta disso.",
      "Mentira, nem sei. Dali, Let, Vic, Henriques vão confirmar depois essa fake news que eu plantei aqui.",
      "Bandeira (Flag) marca e-mail como tarefa pendente. Se você usa, é organizado. Se não usa... bem, cada um sabe de si. Eu não uso, é o sujo querendo falar do mal lavado.",
      "E o campo ASSUNTO: seja claro, objetivo e descritivo. 'Bom dia' não é assunto. 'Trabalho' também não. A pessoa abre sem entender nada.",
      "Essa eu conversei pencas, mas me despeço de vocês aqui. Espero que tenham aprendido algo e até logo."
    ]},
  quiz: [
    { question: "Qual a principal diferença entre Cc (Com Cópia) e Cco (Com Cópia Oculta)?", 
      options: ["Cco oculta os destinatários uns dos outros", "Cc oculta os destinatários", "Cco envia sem anexos", "Cc é mais rápido", "Cco é apenas para externos"], 
      correct: 0 },
    { question: "Para que serve o recurso 'Respostas Automáticas' no Outlook?", 
      options: ["Avisar sobre ausência/férias", "Responder emails com IA", "Enviar SMS automático", "Apagar spam automaticamente", "Organizar emails por pasta"], 
      correct: 0 },
    { question: "Qual a função de uma 'Regra' (Rule) no Outlook?", 
      options: ["Automatizar ações (mover, deletar, categorizar emails)", "Mudar o plano de fundo", "Bloquear anexos maliciosos", "Aumentar velocidade de envio", "Criptografar mensagens"], 
      correct: 0 },
    { question: "Para que serve a 'Bandeira' (Flag) em um email?", 
      options: ["Marcar como tarefa pendente", "Excluir o email", "Bloquear o remetente", "Criptografar a mensagem", "Arquivar o email"], 
      correct: 0 },
    { question: "Qual é a boa prática para preencher o campo 'Assunto' de um email profissional?", 
      options: ["Claro, objetivo e descritivo", "Deixar em branco", "Usar apenas 'Oi'", "Escrever tudo em maiúsculo", "Usar apenas números"], 
      correct: 0 },
  ]
}
];

// ═══════════════════════════════════════════════════════════
// MUNDO 2 — MCom (10 fases)
// ═══════════════════════════════════════════════════════════
const WORLD2_STAGES = [
  {
    id: 11, worldId: 2, name: "Conectividade", icon: "🌐", difficulty: "easy",
    intro: { character: "Mini Fred", lines: [
      "Bem-vindo ao Mundo MCom — Ministério das Comunicações!, Eu sou o Mini Fred, seu guia nessse novo mundo. Vamos explorar o universo da conectividade e descobrir o que mais faz esse enorme órgão em que trabalhamos.",
      "O MCom formula e executa políticas de telecomunicações, radiodifusão e internet.",
      "TELECOMUNICAÇÕES: Telefonia, internet banda larga, fibra óptica, satélite.",
      "RADIODIFUSÃO: TV e rádio abertas. O MCom cuida das licenças.",
      "INCLUSÃO DIGITAL é a missão central: garantir acesso para TODOS."
    ]},
    quiz: [
      { question: "Papel principal do MCom?", options: ["Transporte aéreo", "Políticas de telecomunicações e inclusão digital", "Energia hidrelétrica", "Previdência social"], correct: 1 },
      { question: "Qual programa leva internet via satélite para escolas?", options: ["Digitaliza Brasil", "Norte Conectado", "Wi-Fi Brasil", "Correios Digital"], correct: 2 },
      { question: "Inclusão Digital significa?", options: ["Orçamento empresarial", "Garantir acesso às tecnologias para todos", "Digitalizar documentos", "Criar redes sociais"], correct: 1 },
      { question: "RADIODIFUSÃO inclui?", options: ["Só internet", "TV e rádio abertas", "Só 5G", "Só streaming"], correct: 1 },
    ]
  },
  {
    id: 12, worldId: 2, name: "Norte Conectado", icon: "📡", difficulty: "easy",
    intro: { character: "Mini Fred", lines: [
      "O Norte Conectado leva fibra óptica para a Região Norte!",
      "CABOS SUBFLUVIAIS: Fibra óptica no fundo dos rios Amazonas e Solimões.",
      "Na Amazônia, os rios são as 'estradas' — mais viável que torres na floresta.",
      "DIGITALIZA BRASIL: Substitui sinal de TV analógico pelo digital."
    ]},
    quiz: [
      { question: "Norte Conectado usa qual meio?", options: ["Torres de rádio", "Cabos subfluviais nos rios", "Satélites apenas", "Redes 2G"], correct: 1 },
      { question: "Objetivo do Digitaliza Brasil?", options: ["Distribuir smartphones", "Substituir TV analógica por digital", "Criar rede social", "Automatizar Correios"], correct: 1 },
      { question: "Por que cabos subfluviais?", options: ["Mais barato", "Rios são vias de acesso na Amazônia", "Água conduz melhor", "Única tecnologia aprovada"], correct: 1 },
      { question: "Problema do sinal ANALÓGICO?", options: ["Muito caro", "Qualidade inferior, chuviscos", "Só funciona em smartphone", "Não funciona de dia"], correct: 1 },
    ]
  },
  {
    id: 13, worldId: 2, name: "Telebras & 5G", icon: "📶", difficulty: "medium",
    intro: { character: "Mini Fred", lines: [
      "TELEBRAS: Empresa pública que opera a REDE PRIVATIVA do Governo Federal.",
      "Rede privativa: Infraestrutura exclusiva dos órgãos públicos federais.",
      "5G: Quinta geração de redes móveis — velocidade altíssima + baixa latência.",
      "LEILÃO DO 5G (2021): Operadoras compraram licenças com obrigações sociais."
    ]},
    quiz: [
      { question: "Função estratégica da Telebras?", options: ["Emissora de TV", "Operar rede privativa federal", "Fabricar componentes", "Substituir Correios"], correct: 1 },
      { question: "5G é?", options: ["5ª geração de PCs", "5ª geração de redes móveis", "Plano de 5 anos", "Banda de rádio exclusiva"], correct: 1 },
      { question: "Diferencial do Leilão do 5G?", options: ["Chips gratuitos", "Obrigação de investir em escolas", "Proibição de estrangeiras", "Limite de preço"], correct: 1 },
      { question: "Geração que popularizou streaming?", options: ["2G", "3G", "4G", "5G"], correct: 2 },
    ]
  },
  {
    id: 14, worldId: 2, name: "Computadores p/ Inclusão", icon: "🖥️", difficulty: "easy",
    intro: { character: "Mini Fred", lines: [
      "PROGRAMA COMPUTADORES PARA INCLUSÃO: Criado desde 2004 e aproveita computadores sem funcionamento, recondiciona e doa.",
      "FLUXO: Cedente → CRC (recondiciona) → PID (Ponto de Inclusão Digital) → Inclusão Digital (Transformação Social e digital).",
      "CRC: Centro de Recondicionamento de Computadores. Parceiro que realiza a manutenção, doação dos equipamentos, capacitação e descarte ambientalmente correto.",
      "PID: Escola públicas, telecentro, biblioteca, ONG, Com.Quilombolas, Povos Originários, Público LGBTQIAP+",
      "REEE: Resíduos de Equipamentos Eletroeletrônicos, popularmente conhecido como lixo eletrônico. Refere-se a qualquer aparelho que depende de energia elétrica, pilhas ou baterias para funcionar e que foi descartado pelo proprietário. O programa evita toneladas de e-lixo, promovendo a sustentabilidade ambiental e social.",
    ]},
    quiz: [
      { question: "CRC significa?", options: ["Centro de Reciclagem", "Centro de Recondicionamento de Computadores", "Comitê de Revisão", "Conselho de Recuperação"], correct: 1 },
      { question: "De onde vêm os equipamentos?", options: ["Compra internacional", "Desfazimento de órgãos públicos e Acordos de Cooperação", "Apreensões da PF", "Troca com cidadãos"], correct: 1 },
      { question: "PID significa?", options: ["Programa de Inclusão Digital", "Ponto de Inclusão Digital", "Protocolo de Instalação", "Plano Integrado"], correct: 1 },
      { question: "Economia Circular no programa?", options: ["Circular dinheiro", "Reaproveitar equipamentos descartados", "Girar entre escolas", "Comprar e revender"], correct: 1 },
    ]
  },
  {
    id: 15, worldId: 2, name: "CRCs na Prática", icon: "🔧", difficulty: "easy",
    intro: { character: "Mini Fred", lines: [
      "Etapas no CRC: 1) TRIAGEM, 2) DIAGNÓSTICO, 3) MANUTENÇÃO, 4) FORMATAÇÃO, 5) INSTALAÇÃO DE SOFTWARE LIVRE, 6) ENTREGA AO PID, 7) DESCARTE CORRETO.",
      "Usam SOFTWARE LIVRE: Linux, LibreOffice — sem custo de licenças!",
      "CRCs também CAPACITAM jovens e adultos vulneráveis com cursos técnicos.",
      "Dentro do ministério, cada CRC possui um código de identificação chamado SICONV, linkado à plataforma governamental Transfere.gov."
    ]},
    quiz: [
      { question: "Destino final dos computadores?", options: ["Vendidos em bazares", "Doados a PIDs (escolas, telecentros)", "Devolvidos ao doador", "Sorteio no insta"], correct: 1 },
      { question: "Por que Software Livre?", options: ["Mais fácil", "Eliminar custos de licenças", "Obrigatório por lei", "Dificultar uso indevido"], correct: 1 },
      { question: "Pilar educacional dos CRCs?", options: ["Alfabetização", "Cursos técnicos de TI para toda a população", "Educação física", "Treinamento de motoristas"], correct: 1 },
      { question: "Peças irrecuperáveis?", options: ["Guardar em estoque", "Enviar para reciclagem correta", "Jogar no lixo comum", "Devolver ao doador"], correct: 1 },
    ]
  },
  {
    id: 16, worldId: 2, name: "Sustentabilidade", icon: "♻️", difficulty: "medium",
    intro: { character: "Mini Fred", lines: [
      "LIXO ELETRÔNICO: um dos maiores problemas ambientais do século.",
      "Computadores contêm metais pesados (chumbo, mercúrio) que contaminam.",
      "LEI 12.305/2010: Política Nacional de Resíduos Sólidos.",
      "O programa EVITA toneladas de e-lixo e promove sustentabilidade social."
    ]},
    quiz: [
      { question: "Como o programa preserva o ambiente?", options: ["Plantando árvores", "Reduzindo lixo eletrônico e descarte correto", "Substituindo papel", "Painéis solares"], correct: 1 },
      { question: "Peças irrecuperáveis vão para?", options: ["Aterro comum", "Reciclagem especializada", "Jogadas no mar", "Incineradas"], correct: 1 },
      { question: "Metais pesados são perigosos por quê?", options: ["Roubo para joias", "Contaminam solo e água por décadas", "Atraem animais", "Interferem em sinal"], correct: 1 },
      { question: "Lei do lixo eletrônico?", options: ["8.666", "12.305/2010", "9.504", "13.709 (LGPD)"], correct: 1 },
    ]
  },
  {
    id: 17, worldId: 2, name: "Beneficiários", icon: "🤝", difficulty: "medium",
    intro: { character: "Mini Fred", lines: [
      "Quem pode receber? Instituições públicas e entidades sem fins lucrativos.",
      "NÃO podem: Pessoas físicas, empresas com fins lucrativos, partidos, Sharon14anos.",
      "PIDs prioritários: Escolas, telecentros, bibliotecas, CRAS.",
      "Documentação: CNPJ ativo, endereço válido, inep para escolas."
    ]},
    quiz: [
      { question: "Quem pode ser beneficiário?", options: ["Pessoas físicas", "Entidades sem fins lucrativos e órgãos públicos", "Empresas de tecnologia", "Bancos estatais"], correct: 1 },
      { question: "Quem näo pode receber?", options: ["OSC", "Eu-Pessoa Física", "Entidades Públicas", "Entidades com CNPJ ativo"], correct: 1 },
      { question: "Documentação exigida do PID", options: ["Carta de intenção", "CNPJ, endereço, responsável técnico", "Comprovante residencial", "Autorização de Deputado"], correct: 1 },
      { question: "Por que prisões são beneficiários?", options: ["Mais espaço", "Inclusão digital é ressocialização", "Economiza segurança", "Logística mais fácil"], correct: 1 },
    ]
  },
  {
    id: 18, worldId: 2, name: "Monitoramento", icon: "📊", difficulty: "hard",
    intro: { character: "Mini Fred", lines: [
      "MONITORAMENTO PÓS-DOAÇÃO: o MCom não entrega e esquece!",
      "VISITAS TÉCNICAS: Equipes verificam se computadores estão sendo usados.",
      "INDICADORES: Nº de usuários, cursos, horas de uso.",
      "O monitoramento é importante para que tenhamos o qualitativo de nossas acões, garantindo que as políticas públicas estejam sendo feitas corretamente."
    ]},
    quiz: [
      { question: "Como o MCom monitora os PIDs?", options: ["Redes sociais", "Visitas técnicas e formulários de satisfação", "Não monitora", "Jornais locais"], correct: 1 },
      { question: "Papel das universidades parceiras?", options: ["Emprestar espaço", "Gestão técnica e pesquisa", "Vender equipamentos", "Nenhuma relação"], correct: 1 },
      { question: "O que os beneficiários assinam?", options: ["Carta de agradecimento", "Termos de Doação", "Contrato de compra", "Declaração de nunca vender"], correct: 1 },
      { question: "Dados de impacto são?", options: ["Sigilosos", "Publicados em portais abertos", "Só para o Congresso", "Não são coletados"], correct: 1 },
    ]
  },
  {
    id: 19, worldId: 2, name: "Telecentros & Correios", icon: "📮", difficulty: "medium",
    intro: { character: "Mini Fred", lines: [
      "TELECENTROS: Espaços públicos com internet gratuita e computadores.",
      "OBJETIVOS: Porta de entrada digital para quem não tem acesso em casa.",
      "CORREIOS: Vinculados ao MCom, presentes em TODOS os 5.570 municípios!",
      "CARRETA DIGITAL: É um projeto de capacitação itinerante, voltado para estudantes de baixa renda que percorre o Brasil, fornecendo cursos de informática, montagem e manutenção de computadores e robótica."
    ]},
    quiz: [
      { question: "Telecentros são?", options: ["Call centers", "Espaços públicos com internet gratuita", "Antenas de celular", "Lojas de eletrônicos"], correct: 1 },
      { question: "Serviço postal vinculado ao MCom?", options: ["FedEx", "Correios (ECT)", "DHL", "Jadlog"], correct: 1 },
      { question: "Por que Correios são estratégicos?", options: ["Mais modernos", "Presentes em 5.570 municípios", "Maiores empregadores", "Distribuem chips"], correct: 1 },
      { question: "Carreta Digital é?", options: ["Fibra óptica", " É um projeto de capacitação itinerante", "Financiamento", "Plataforma de ensino"], correct: 1 },
    ]
  },
   {
    id: 20, worldId: 2, name: "E-Digital & Gov.br", icon: "🏆", difficulty: "hard",
    intro: { character: "Mini Fred", lines: [
      "Chegamos à última fase do Mundo MCom! Vamos falar do Gov.br e da transformação digital! 🏆",
      "O GOV.BR é a plataforma que centraliza os serviços públicos digitais do governo federal brasileiro.",
      "Hoje são MAIS DE 4.000 SERVIÇOS disponíveis — aposentadoria, carteira digital, imposto de renda, vacinação, FGTS e muito mais!",
      "Isso significa menos filas, menos papelada, menos burocracia. O cidadão resolve tudo pelo celular ou computador.",
      "A E-DIGITAL (Estratégia Brasileira para Transformação Digital) é o documento que orienta essa revolução digital no governo.",
      "A meta do Brasil é estar entre os 10 países mais digitais do mundo até 2030!",
      "O programa Computadores para Inclusão faz parte dessa transformação: cada computador doado é uma porta de acesso ao Gov.br e à cidadania digital.",
    ]},
    quiz: [
      { question: "Quantos serviços o Gov.br oferece atualmente?", options: ["Menos de 100", "Cerca de 500", "Mais de 4.000", "Apenas 10"], correct: 2 },
      { question: "Qual serviço do Gov.br é usado para aposentadoria?", options: ["e-CAC", "Meu INSS", "SUS Digital", "FGTS Digital"], correct: 1 },
      { question: "Qual a meta do Brasil até 2030?", options: ["Ser o país com mais celulares", "Estar entre os 10 mais digitais do mundo", "Substituir todos os computadores", "Criar internet gratuita total"], correct: 1 },
      { question: "O que é a E-Digital?", options: ["Um aplicativo", "A Estratégia Brasileira para Transformação Digital", "Uma lei sobre internet", "Um programa de bolsas"], correct: 1 },
      { question: "O programa Computadores para Inclusão se conecta ao Gov.br porque:", options: ["Fornece internet grátis", "Cada PC doado é uma porta de acesso à cidadania digital", "Cria aplicativos", "Gerencia o site"], correct: 1 },
    ]
  },
];

// ═══════════════════════════════════════════════════════════
// MUNDO 3 — CGID (ATUALIZADO COM NOVAS PERGUNTAS)
// ═══════════════════════════════════════════════════════════
const WORLD3_STAGES = [
  {
    id: 21, worldId: 3, name: "CGID: Visão Geral", icon: "🏢", difficulty: "easy",
    intro: { character: "Gustavinho", lines: [
      "Bem-vindo ao mundo da CGID! Eu sou o Gustavinho e vou te apresentar a Coordenação-Geral de Inclusão Digital.",
      "A CGID atua no desenvolvimento de ações voltadas à inclusão tecnológica, sustentabilidade e reaproveitamento de equipamentos.",
      "Trabalhamos com desfazimento de bens públicos, doação de computadores e acompanhamento de entregas.",
      "Também organizamos eventos, firmamos acordos institucionais e gerenciamos os CRCs.",
      "Nosso trabalho conecta tecnologia, educação, sustentabilidade e impacto social em todo o Brasil!"
    ]},
    quiz: [
      { question: "Qual é a missão principal da CGID?", options: ["Fiscalizar empresas privadas", "Desenvolver ações de inclusão tecnológica e sustentabilidade", "Vender equipamentos de informática", "Gerenciar recursos humanos"], correct: 1 },
      { question: "Com quais áreas a CGID trabalha diretamente?", options: ["Apenas eventos", "Desfazimento, doação, CRCs, acordos e automação", "Somente financeiro", "Exclusivamente design"], correct: 1 },
      { question: "O trabalho da CGID conecta quais áreas?", options: ["Apenas tecnologia", "Tecnologia, educação, sustentabilidade e impacto social", "Somente educação", "Apenas sustentabilidade"], correct: 1 },
      { question: "O programa principal da CGID é:", options: ["Bolsa Família", "Computadores para Inclusão", "Minha Casa Minha Vida", "Farmácia Popular"], correct: 1 },
      { question: "A CGID está vinculada a qual ministério?", options: ["Ministério da Saúde", "Ministério das Comunicações", "Ministério da Educação", "Ministério da Fazenda"], correct: 1 },
    ]
  },
  {
    id: 22, worldId: 3, name: "Setor de Eventos", icon: "🎪", difficulty: "easy",
    intro: { character: "Gustavinho", lines: [
      "O Setor de Eventos coordena a logística e a visibilidade institucional da CGID.",
      "Suas funções incluem organização de eventos, elaboração de roteiros e briefings.",
      "Articula com ASCOM, Cerimonial e outras áreas do Ministério.",
      "Também atua no Fala.Br, elaboração de relatórios e acompanhamento da Carreta Digital.",
      "A Carreta Digital leva inclusão digital para diversas regiões do Brasil!"
    ]},
    quiz: [
      { question: "Qual atividade faz parte da rotina do Setor de Eventos?", options: ["Compra de passagens particulares", "Briefing, roteiro e articulação com ASCOM e Cerimonial", "Manutenção mecânica da Carreta Digital", "Apenas envio de e-mails internos"], correct: 1 },
      { question: "Qual plataforma é usada para acesso à informação?", options: ["Teams", "GovPlay", "Fala.Br", "SIGEPE"], correct: 2 },
      { question: "O acompanhamento da Carreta Digital está relacionado a:", options: ["Organização das ações institucionais", "Descarte de lixo eletrônico", "Manutenção de servidores físicos", "Fiscalização ambiental"], correct: 0 },
      { question: "O Setor de Eventos articula com quais áreas?", options: ["Apenas financeiro", "ASCOM e Cerimonial", "Somente jurídico", "Exclusivamente TI"], correct: 1 },
      { question: "Qual desses eventos estão pendentes?", options: ["Formatura em Patos/PB", "Nenhum, porque o Gustavinho não avisou da existência dele", "Doação em Juazeiro/CE", "Inauguração do CRC no Acre"], correct: 1 },
    ]
  },
  {
    id: 23, worldId: 3, name: "Desfazimento de Bens", icon: "📦", difficulty: "easy",
    intro: { character: "Gustavinho", lines: [
      "O desfazimento de bens públicos é o processo de destinação correta de equipamentos sem uso.",
      "Equipamentos podem ser reaproveitados, recondicionados, reciclados ou destinados aos CRCs.",
      "A equipe acompanha processos administrativos, listas de desfazimento e pesagem.",
      "Uma das dificuldades são listas de desfazimento sem padronização.",
      "Mas o trabalho é essencial para a economia circular!"
    ]},
    quiz: [
      { question: "Qual o objetivo do desfazimento de bens públicos?", options: ["Comprar novos computadores", "Destinar corretamente equipamentos sem uso", "Cancelar eventos", "Reduzir servidores"], correct: 1 },
      { question: "Os equipamentos recebidos pelos CRCs passam por:", options: ["Revenda comercial obrigatória", "Recondicionamento e reaproveitamento", "Destruição imediata", "Exportação internacional"], correct: 1 },
      { question: "Uma dificuldade do processo de desfazimento é:", options: ["Controle de combustível", "Falta de veículos oficiais", "Listas de desfazimento sem padrão", "Organização de eventos culturais"], correct: 2 },
      { question: "O que é feito com equipamentos irrecuperáveis?", options: ["Guardados em estoque", "Enviados para reciclagem", "Jogados no lixo comum", "Devolvidos ao doador"], correct: 1 },
      { question: "O desfazimento segue normas de qual instrução?", options: ["IN SEGES", "LGPD", "Lei 8.666", "Constituição Federal"], correct: 0 },
    ]
  },
  {
    id: 24, worldId: 3, name: "Doação de Computadores", icon: "🎁", difficulty: "easy",
    intro: { character: "Gustavinho", lines: [
      "A Coordenação acompanha solicitações de computadores de escolas, associações e projetos sociais.",
      "Após recondicionamento pelos CRCs, os computadores são destinados à inclusão digital.",
      "A equipe controla solicitações, responde e-mails e acompanha entregas.",
      "Os computadores doados são para inclusão digital e apoio social.",
      "O acompanhamento garante organização e controle dos pedidos!"
    ]},
    quiz: [
      { question: "Qual o objetivo das solicitações de computadores?", options: ["Atender instituições beneficiadas pelo programa", "Comprar veículos administrativos", "Cancelar processos", "Realizar eventos culturais"], correct: 0 },
      { question: "Os computadores doados são destinados para:", options: ["Revenda comercial", "Inclusão digital e apoio social", "Leilões privados", "Uso exclusivo do Ministério"], correct: 1 },
      { question: "O acompanhamento das solicitações garante:", options: ["Organização e controle dos pedidos", "Suspensão das entregas", "Redução da comunicação", "Cancelamento automático"], correct: 0 },
      { question: "Quem pode solicitar computadores?", options: ["Apenas empresas", "Escolas, associações e instituições públicas", "Somente ONGs", "Qualquer pessoa física"], correct: 1 },
      { question: "Após o recondicionamento, os computadores vão para:", options: ["Venda", "Pontos de Inclusão Digital", "Estoque permanente", "Descarte"], correct: 1 },
    ]
  },
  {
    id: 25, worldId: 3, name: "Acordos (ACTs)", icon: "🤝", difficulty: "medium",
    intro: { character: "Gustavinho", lines: [
      "ACTs são Acordos de Cooperação Técnica — parcerias sem transferência de recursos financeiros.",
      "Podem participar: Caixa, Banco do Brasil, Correios e outras instituições.",
      "A equipe acompanha alinhamento, instrução processual e elaboração de relatórios.",
      "Os relatórios periódicos documentam metas, beneficiários e resultados.",
      "É uma ferramenta poderosa para expandir o alcance do programa!"
    ]},
    quiz: [
      { question: "O que caracteriza um ACT?", options: ["Transferência obrigatória de recursos", "Parceria institucional sem transferência financeira", "Compra de equipamentos", "Contratação de empresas privadas"], correct: 1 },
      { question: "Quem pode participar de ACTs?", options: ["Caixa Econômica Federal", "Banco do Brasil", "Correios", "Todas as anteriores"], correct: 3 },
      { question: "Uma atividade da equipe de ACTs é:", options: ["Elaboração de relatórios periódicos", "Fiscalização de trânsito", "Manutenção predial", "Controle de combustível"], correct: 0 },
      { question: "O ACT envolve dinheiro?", options: ["Sim, sempre", "Não, é parceria sem repasse financeiro", "Depende do caso", "Apenas emendas"], correct: 1 },
      { question: "Em qual sistema o ACT é instruído?", options: ["Excel", "SEI", "WhatsApp", "Google Forms"], correct: 1 },
    ]
  },
  {
    id: 26, worldId: 3, name: "Design e Comunicação", icon: "🎨", difficulty: "medium",
    intro: { character: "Gustavinho", lines: [
      "O setor de Design cria e padroniza materiais institucionais da CGID.",
      "Desenvolve certificados, apresentações, panfletos e peças gráficas.",
      "A padronização visual garante alinhamento institucional dos materiais.",
      "Também realiza tratamento de imagens para formatos digitais e impressos.",
      "Um trabalho essencial para a identidade visual do programa!"
    ]},
    quiz: [
      { question: "Qual atividade pertence ao setor de Design?", options: ["Desenvolvimento de certificados e peças gráficas", "Manutenção de computadores", "Fiscalização financeira", "Controle de combustível"], correct: 0 },
      { question: "O objetivo da padronização visual é:", options: ["Garantir alinhamento institucional dos materiais", "Reduzir a produção de documentos", "Evitar apresentações", "Eliminar materiais gráficos"], correct: 0 },
      { question: "O tratamento de imagens auxilia em:", options: ["Produção de materiais digitais e impressos", "Manutenção elétrica", "Controle financeiro", "Fiscalização de contratos"], correct: 0 },
      { question: "Qual resolução para materiais impressos?", options: ["72 DPI", "300 DPI", "150 DPI", "600 DPI"], correct: 1 },
      { question: "Quem define a identidade visual do governo?", options: ["Cada setor", "Secom", "Presidente", "TCU"], correct: 1 },
    ]
  },
  {
    id: 27, worldId: 3, name: "Automação e Dados", icon: "💾", difficulty: "medium",
    intro: { character: "Gustavinho", lines: [
      "O setor de Automação e Gestão de Dados desenvolve sistemas e ferramentas.",
      "Atua com automação de planilhas, criação de sistemas e gerenciamento de dados.",
      "Uma documentação importante é o Termo de Doação — comprova a entrega dos computadores.",
      "O termo garante rastreabilidade, transparência e segurança das informações.",
      "O gerenciamento correto é essencial para o sucesso do programa!"
    ]},
    quiz: [
      { question: "Qual o objetivo das automações da equipe?", options: ["Aumentar tarefas manuais", "Melhorar o fluxo de trabalho e otimizar processos", "Reduzir doações", "Substituir servidores"], correct: 1 },
      { question: "O que é um Termo de Doação?", options: ["Documento de compra", "Documento que formaliza e comprova a entrega dos computadores", "Relatório financeiro anual", "Contrato de manutenção"], correct: 1 },
      { question: "O gerenciamento das comprovações garante:", options: ["Rastreamento e organização das informações", "Controle de combustível", "Redução das doações", "Cancelamento de processos"], correct: 0 },
      { question: "O Termo de Doação deve conter:", options: ["Apenas nome", "Nome, CNPJ, cidade, quantidade", "Só CNPJ", "Qualquer informação"], correct: 1 },
      { question: "Qual sistema centraliza os dados do programa?", options: ["Excel", "Processo GAIA", "Word", "Bloco de Notas"], correct: 1 },
    ]
  },
  {
    id: 28, worldId: 3, name: "Acomp. Financeiro CRCs", icon: "💰", difficulty: "hard",
    intro: { character: "Gustavinho", lines: [
      "O setor de Acompanhamento Financeiro monitora a execução financeira dos CRCs.",
      "Os CRCs recebem recursos por emendas parlamentares, editais e repasses.",
      "Os recursos são para manutenção, cursos, materiais e estrutura física.",
      "Os CRCs prestam contas pelo Relatório de Execução Semestral.",
      "O relatório apresenta gastos, metas de formação, doação e indicadores!"
    ]},
    quiz: [
      { question: "Qual o objetivo do acompanhamento financeiro dos CRCs?", options: ["Comprar prédios", "Garantir controle e transparência dos recursos públicos", "Cancelar atividades", "Reduzir cursos"], correct: 1 },
      { question: "Os recursos dos CRCs podem vir de:", options: ["Emendas parlamentares", "Editais públicos", "Repasses institucionais", "Todas as anteriores"], correct: 3 },
      { question: "O Relatório de Execução Semestral é usado para:", options: ["Registrar férias", "Acompanhar execução financeira e metas", "Solicitar veículos", "Organizar eventos"], correct: 1 },
      { question: "Além dos gastos, o relatório apresenta:", options: ["Metas de formação e doação", "Controle de trânsito", "Fiscalização de rodovias", "Resultados eleitorais"], correct: 0 },
      { question: "O que são indicadores de desempenho?", options: ["Lista de funcionários", "Métricas para avaliar resultados", "Controle de ponto", "Registro de faltas"], correct: 1 },
    ]
  },
  {
    id: 29, worldId: 3, name: "CRCs: Centros e Siglas", icon: "🔧", difficulty: "hard",
    intro: { character: "Gustavinho", lines: [
      "Vamos conhecer TODOS os Centros de Recondicionamento de Computadores!",
      "CRC INAC no RJ e SP — Instituto Nova Ágora de Cidadania.",
      "CRC IGH no MA, PA e SP — Instituto Gustavo Hessel.",
      "CRC IAPS no CE e RN — Instituto de Assistência e Proteção Social.",
      "CRC IDC no AM, RO e RR — Instituto Descarte Correto.",
      "CRC IBAV em GO, MG e DF — Instituto Brasileiro Amigos da Vida.",
      "CRC IEC em PE, BA, PB e AL — Instituto de Inovação e Economia Circular.",
      "CRC ITCD na BA — Instituto Tecnológico Conexão Digital.",
      "CRC IFMS no MS, CRC IFMA no MA, CRC IFS em SE.",
      "CRC UNIVASF em PE, CRC UNIFAP no AP, CRC FUNPAPI no PI.",
      "CRC IA em RR, CRC PRODABEL em MG, CRC NCC BELÉM no RS.",
      "CRC E-LETRO no PR e SC, CRC PROGRAMANDO em MT, DF, TO e GO.",
      "Ao todo são 17 CRCs espalhados pelo Brasil!",
      "Conhecer as siglas e localizações é essencial para o programa!"
    ]},
    quiz: [
      { question: "Qual o significado da sigla INAC?", options: ["Instituto Nacional de Ação Comunitária", "Instituto Nova Ágora da Cidadania", "Instituto Nacional de Apoio ao Cidadão", "Instituto Nova Ação Civil"], correct: 1 },
      { question: "Qual o significado da sigla IAPS?", options: ["Instituto de Apoio à Pesquisa Social", "Instituto de Assistência e Proteção Social", "Instituto de Ação e Promoção Social", "Instituto de Apoio e Proteção à Saúde"], correct: 1 },
      { question: "Qual o significado da sigla IBAV?", options: ["Instituto Brasileiro de Apoio à Vida", "Instituto Brasileiro Amigos da Vida", "Instituto Beneficente de Amparo à Vida", "Instituto Brasileiro de Ação Voluntária"], correct: 1 },
      { question: "Qual o significado da sigla IEC?", options: ["Instituto de Educação e Cultura", "Instituto de Inovação e Economia Circular", "Instituto de Economia Criativa", "Instituto de Ecologia e Ciência"], correct: 1 },
      { question: "Qual o significado da sigla IDC?", options: ["Instituto de Direito do Consumidor", "Instituto Descarte Correto", "Instituto de Desenvolvimento Comunitário", "Instituto Digital de Comunicação"], correct: 1 },
      { question: "O CRC IAPS está em quais estados?", options: ["Apenas CE", "CE e RN", "CE, PE e BA", "Apenas RN"], correct: 1 },
      { question: "O CRC IBAV está em quais estados?", options: ["Apenas GO", "GO, MG e DF", "GO e SP", "Apenas DF"], correct: 1 },
      { question: "O CRC IEC está em quais estados?", options: ["Apenas PE", "PE, BA, PB e AL", "PE e BA", "Todos do Nordeste"], correct: 1 },
      { question: "O CRC INAC está em quais estados?", options: ["Apenas RJ", "RJ, ES e SP", "RJ e SP", "Todos do Sudeste"], correct: 1 },
      { question: "O CRC IGH está em quais estados?", options: ["Apenas MA", "MA, PA, AP e SP", "MA e PI", "Todos do Norte"], correct: 1 },
      { question: "O CRC E-LETRO está em quais estados?", options: ["Apenas PR", "PR e SC", "PR, SC e RS", "Todos do Sul"], correct: 1 },
      { question: "O CRC PROGRAMANDO está em quais estados?", options: ["Apenas DF", "MT, DF, TO e GO", "DF e GO", "Todos do Centro-Oeste"], correct: 1 },
      { question: "Onde fica o CRC UNIVASF?", options: ["Bahia", "Pernambuco", "Sergipe", "Alagoas"], correct: 1 },
      { question: "Onde fica o CRC IFMS?", options: ["Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Maranhão"], correct: 1 },
      { question: "Quantos CRCs existem atualmente?", options: ["10", "17", "20", "15"], correct: 1 },
    ]
  },
  {
    id: 30, worldId: 3, name: "CGID: Missão Final!", icon: "🏆", difficulty: "hard",
    intro: { character: "Gustavinho", lines: [
      "Parabéns por chegar até aqui! Esta é a última fase do jogo! 🎉",
      "Você aprendeu sobre todos os setores da CGID e o funcionamento do programa.",
      "Viu como cada área contribui para a inclusão digital no Brasil.",
      "O programa Computadores para Inclusão transforma vidas através da tecnologia.",
      "Obrigado por se dedicar! Agora mostre tudo que aprendeu! 💪"
    ]},
    quiz: [
      { question: "Qual o fluxo completo do programa?", options: ["Governo compra → distribui", "Doador → CRC → PID → comunidade", "CRC compra → doa", "MCom importa → vende"], correct: 1 },
      { question: "Quais os três impactos principais?", options: ["Econômico, militar, diplomático", "Ambiental, social e digital", "Tecnológico, comercial, esportivo", "Só educacional"], correct: 1 },
      { question: "O que diferencia a CGID?", options: ["Maior orçamento", "Unir sustentabilidade, inclusão digital e capacitação", "Só comunicação", "Única com concursados"], correct: 1 },
      { question: "Quantos CRCs existem atualmente?", options: ["5", "17", "10", "3"], correct: 1 },
      { question: "Qual região tem mais CRCs?", options: ["Sul", "Nordeste", "Norte", "Centro-Oeste"], correct: 1 },
    ]
  },
  {
    id: 31,
    worldId: 3,
    name: "Bônus: Adivinhe a Mesa",
    icon: "🕵️",
    difficulty: "hard",
    intro: {
      character: "JonJon", lines: [
        "Pra encerrar, temos um desafio especial: Adivinhe a Mesa!",
        "Você vai ver a foto da MESA de alguns membros da nossa coordenação.",
        "Sua missão: adivinhar DE QUEM é a mesa!",
        "Cada mesa tem características únicas.",
        "Preste atenção nos detalhes!",
        "Boa sorte, detetives! 🕵️‍♂️"  
      ]
    },
    quiz: [
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Karol", "Thiago", "Henrique", "Victoria", "Viana"],
        correct: 2,
        imagem: "img2/mesas/henrique.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Gustavo", "Yara", "Viana", "Karol", "Victoria"],
        correct: 3,
        imagem: "img2/mesas/karol.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Daliane", "Karol", "Victoria", "Viana", "Yara"],
        correct: 3,
        imagem: "img2/mesas/viana.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Karine", "Victoria", "Henrique", "Viana", "Karol"],
        correct: 1,
        imagem: "img2/mesas/victoria.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Gustavo", "Yara", "Thiago", "Jon", "Leticia"],
        correct: 1,
        imagem: "img2/mesas/yara.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Jon", "Thiago", "Karine", "Daliane", "Gustavo"],
        correct: 4,
        imagem: "img2/mesas/gustavo.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Karol", "Leticia", "Henrique", "Daliane", "Victoria"],
        correct: 3,
        imagem: "img2/mesas/daliane.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Thiago", "Karine", "Jon", "Viana", "Karol"],
        correct: 1,
        imagem: "img2/mesas/karine.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Viana", "Daliane", "Leticia", "Karine", "Henrique"],
        correct: 2,
        imagem: "img2/mesas/leticia.jpeg"
      },
      {
        question: "🔍 De quem é esta mesa?",
        options: ["Jon", "Victoria", "Thiago", "Leticia", "Gustavo"],
        correct: 0,
        imagem: "img2/mesas/jon.jpeg"
      }
    ]
  },
];

const ALL_STAGES = [...WORLD1_STAGES, ...WORLD2_STAGES, ...WORLD3_STAGES];

function getStageById(id) { return ALL_STAGES.find(s => s.id === id) || null; }
function getWorldById(id) { return WORLDS.find(w => w.id === id) || null; }
function getStagesByWorld(worldId) { return ALL_STAGES.filter(s => s.worldId === worldId); }