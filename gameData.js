// ═══════════════════════════════════════════════════════════
// CPIQuest — 3 Mundos com perguntas reais (FORMATO COM ID)
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
// MUNDO 1 — Informática (CONVERTIDO)
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
      options: [
        { id: "opt_0", text: "Armazenar arquivos permanentemente", isCorrect: false },
        { id: "opt_1", text: "Excluir arquivos imediatamente", isCorrect: false },
        { id: "opt_2", text: "Armazenar arquivos temporariamente", isCorrect: true },
        { id: "opt_3", text: "Armazenar arquivos na nuvem", isCorrect: false },
        { id: "opt_4", text: "Compactar arquivos automaticamente", isCorrect: false }
      ] },
    { question: "Diferença entre 'Arquivo' e 'Pasta'?", 
      options: [
        { id: "opt_0", text: "Arquivo contém dados, Pasta organiza", isCorrect: true },
        { id: "opt_1", text: "Pasta contém dados, Arquivo organiza", isCorrect: false },
        { id: "opt_2", text: "Arquivo e Pasta são a mesma coisa", isCorrect: false },
        { id: "opt_3", text: "Arquivo é só texto, Pasta é só imagem", isCorrect: false },
        { id: "opt_4", text: "Arquivo não pode ser excluído", isCorrect: false }
      ] },
    { question: "Onde fica o botão do Menu Iniciar?", 
      options: [
        { id: "opt_0", text: "Canto superior esquerdo", isCorrect: false },
        { id: "opt_1", text: "Canto superior direito", isCorrect: false },
        { id: "opt_2", text: "Barra de tarefas (inferior esquerdo)", isCorrect: true },
        { id: "opt_3", text: "Centro da Área de Trabalho", isCorrect: false },
        { id: "opt_4", text: "Dentro do Explorador de Arquivos", isCorrect: false }
      ] },
    { question: "O que é a 'Barra de Tarefas'?", 
      options: [
        { id: "opt_0", text: "Barra que mostra programas abertos e relógio", isCorrect: true },
        { id: "opt_1", text: "Barra que edita documentos", isCorrect: false },
        { id: "opt_2", text: "Barra que pesquisa na internet", isCorrect: false },
        { id: "opt_3", text: "Barra que formata textos", isCorrect: false },
        { id: "opt_4", text: "Barra que controla volume", isCorrect: false }
      ] },
    { question: "Qual recurso organiza janelas em áreas virtuais?", 
      options: [
        { id: "opt_0", text: "Gerenciador de Tarefas", isCorrect: false },
        { id: "opt_1", text: "Visão de Tarefas (Task View)", isCorrect: true },
        { id: "opt_2", text: "Painel de Controle", isCorrect: false },
        { id: "opt_3", text: "Menu de Contexto", isCorrect: false },
        { id: "opt_4", text: "Barra de Ferramentas", isCorrect: false }
      ] }
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
      options: [
        { id: "opt_0", text: "Criar atalho na barra lateral do Explorer", isCorrect: true },
        { id: "opt_1", text: "Bloquear o arquivo com senha", isCorrect: false },
        { id: "opt_2", text: "Mover arquivo para nuvem", isCorrect: false },
        { id: "opt_3", text: "Acelerar a abertura do arquivo", isCorrect: false },
        { id: "opt_4", text: "Copiar para área de transferência", isCorrect: false }
      ] },
    { question: "Windows + L faz o quê?", 
      options: [
        { id: "opt_0", text: "Bloquear a sessão do usuário", isCorrect: true },
        { id: "opt_1", text: "Limpar a memória RAM", isCorrect: false },
        { id: "opt_2", text: "Abrir o Explorador", isCorrect: false },
        { id: "opt_3", text: "Desligar o computador", isCorrect: false },
        { id: "opt_4", text: "Alternar entre janelas", isCorrect: false }
      ] },
    { question: "Shift + Delete faz o quê?", 
      options: [
        { id: "opt_0", text: "Excluir permanentemente (sem Lixeira)", isCorrect: true },
        { id: "opt_1", text: "Enviar para Lixeira", isCorrect: false },
        { id: "opt_2", text: "Compactar em arquivo ZIP", isCorrect: false },
        { id: "opt_3", text: "Criar backup do arquivo", isCorrect: false },
        { id: "opt_4", text: "Renomear o arquivo", isCorrect: false }
      ] },
    { question: "Diferença entre COPIAR e RECORTAR?", 
      options: [
        { id: "opt_0", text: "Copiar duplica; Recortar move", isCorrect: true },
        { id: "opt_1", text: "Recortar duplica; Copiar move", isCorrect: false },
        { id: "opt_2", text: "Ambos fazem a mesma coisa", isCorrect: false },
        { id: "opt_3", text: "Copiar é só texto; Recortar é imagem", isCorrect: false },
        { id: "opt_4", text: "Copiar precisa de internet; Recortar não", isCorrect: false }
      ] },
    { question: "Atalho para abrir o Explorador de Arquivos?", 
      options: [
        { id: "opt_0", text: "Windows+E", isCorrect: true },
        { id: "opt_1", text: "Windows+F", isCorrect: false },
        { id: "opt_2", text: "Windows+R", isCorrect: false },
        { id: "opt_3", text: "Windows+D", isCorrect: false },
        { id: "opt_4", text: "Windows+L", isCorrect: false }
      ] }
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
      options: [
        { id: "opt_0", text: "Ctrl+Shift+Esc", isCorrect: true },
        { id: "opt_1", text: "Ctrl+Alt+Del", isCorrect: false },
        { id: "opt_2", text: "Crtl+Alt+Del", isCorrect: false },
        { id: "opt_3", text: "Crtl+Shift+Del", isCorrect: false },
        { id: "opt_4", text: "Windows+X", isCorrect: false }
      ] },
    { question: "Atalho para COPIAR um arquivo?", 
      options: [
        { id: "opt_0", text: "Ctrl+C", isCorrect: true },
        { id: "opt_1", text: "Ctrl+X", isCorrect: false },
        { id: "opt_2", text: "Ctrl+V", isCorrect: false },
        { id: "opt_3", text: "Crtl+C", isCorrect: false },
        { id: "opt_4", text: "Ctrl+Y", isCorrect: false }
      ] },
    { question: "Atalho para abrir o Explorador de Arquivos?", 
      options: [
        { id: "opt_0", text: "Windows+E", isCorrect: true },
        { id: "opt_1", text: "Windows+F", isCorrect: false },
        { id: "opt_2", text: "Windows+R", isCorrect: false },
        { id: "opt_3", text: "Windows+D", isCorrect: false },
        { id: "opt_4", text: "Windows+L", isCorrect: false }
      ] },
    { question: "Programa com status 'Sem Resposta' significa:", 
      options: [
        { id: "opt_0", text: "Travou, precisa ser encerrado", isCorrect: true },
        { id: "opt_1", text: "Está economizando bateria", isCorrect: false },
        { id: "opt_2", text: "Está atualizando em segundo plano", isCorrect: false },
        { id: "opt_3", text: "Aguardando impressão", isCorrect: false },
        { id: "opt_4", text: "Está em modo de economia", isCorrect: false }
      ] },
    { question: "Windows+D faz o quê?", 
      options: [
        { id: "opt_0", text: "Mostrar a Área de Trabalho", isCorrect: true },
        { id: "opt_1", text: "Abrir documentos recentes", isCorrect: false },
        { id: "opt_2", text: "Desligar o computador", isCorrect: false },
        { id: "opt_3", text: "Abrir configurações", isCorrect: false },
        { id: "opt_4", text: "Bloquear a sessão", isCorrect: false }
      ] }
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
      options: [
        { id: "opt_0", text: "Ctrl+A", isCorrect: true },
        { id: "opt_1", text: "Ctrl+T", isCorrect: false },
        { id: "opt_2", text: "Ctrl+E", isCorrect: false },
        { id: "opt_3", text: "Ctrl+Shift+A", isCorrect: false },
        { id: "opt_4", text: "Alt+A", isCorrect: false }
      ] },
    { question: "Reabrir a última aba fechada no navegador?", 
      options: [
        { id: "opt_0", text: "Ctrl+Shift+T", isCorrect: true },
        { id: "opt_1", text: "Ctrl+T", isCorrect: false },
        { id: "opt_2", text: "Ctrl+W", isCorrect: false },
        { id: "opt_3", text: "Ctrl+N", isCorrect: false },
        { id: "opt_4", text: "Ctrl+Shift+N", isCorrect: false }
      ] },
    { question: "Qual destes NÃO é um atalho válido do Windows?", 
      options: [
        { id: "opt_0", text: "Ctrl+C", isCorrect: false },
        { id: "opt_1", text: "Ctrl+V", isCorrect: false },
        { id: "opt_2", text: "Ctrl+Z", isCorrect: false },
        { id: "opt_3", text: "Ctrl+J", isCorrect: true },
        { id: "opt_4", text: "Ctrl+X", isCorrect: false }
      ] },
    { question: "Atalho para SALVAR o documento atual?", 
      options: [
        { id: "opt_0", text: "Ctrl+S", isCorrect: true },
        { id: "opt_1", text: "Ctrl+P", isCorrect: false },
        { id: "opt_2", text: "Ctrl+N", isCorrect: false },
        { id: "opt_3", text: "Ctrl+O", isCorrect: false },
        { id: "opt_4", text: "Ctrl+F", isCorrect: false }
      ] },
    { question: "Qual atalho é usado para DESFAZER a última ação?", 
      options: [
        { id: "opt_0", text: "Ctrl+Z", isCorrect: true },
        { id: "opt_1", text: "Ctrl+Y", isCorrect: false },
        { id: "opt_2", text: "Ctrl+D", isCorrect: false },
        { id: "opt_3", text: "Ctrl+X", isCorrect: false },
        { id: "opt_4", text: "Ctrl+R", isCorrect: false }
      ] }
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
    "Windows + . (ponto): Abre o painel de emojis e GIFs. Windows + ALT + R inicia uma gravação de tela.",
    "Muita coisa né? Anotem, talvez ajude no futuro."
  ]},
  quiz: [
    { question: "Alternar entre janelas abertas (trocar de programa)?", 
      options: [
        { id: "opt_0", text: "Alt+Tab", isCorrect: true },
        { id: "opt_1", text: "Ctrl+Tab", isCorrect: false },
        { id: "opt_2", text: "Windows+Tab", isCorrect: false },
        { id: "opt_3", text: "Shift+Tab", isCorrect: false },
        { id: "opt_4", text: "Alt+Shift", isCorrect: false }
      ] },
    { question: "Renomear um arquivo sem usar o mouse?", 
      options: [
        { id: "opt_0", text: "F2", isCorrect: true },
        { id: "opt_1", text: "F1", isCorrect: false },
        { id: "opt_2", text: "F5", isCorrect: false },
        { id: "opt_3", text: "F3", isCorrect: false },
        { id: "opt_4", text: "F4", isCorrect: false }
      ] },
    { question: "Capturar apenas a janela ativa (print screen)?", 
      options: [
        { id: "opt_0", text: "Alt+PrtScn", isCorrect: true },
        { id: "opt_1", text: "PrtScn", isCorrect: false },
        { id: "opt_2", text: "Win+PrtScn", isCorrect: false },
        { id: "opt_3", text: "Ctrl+PrtScn", isCorrect: false },
        { id: "opt_4", text: "Shift+PrtScn", isCorrect: false }
      ] },
    { question: "Atalho para colar sem Formatação?", 
      options: [
        { id: "opt_0", text: "Ctrl+Shift+V", isCorrect: true },
        { id: "opt_1", text: "Ctrl+V", isCorrect: false },
        { id: "opt_2", text: "Ctrl+C", isCorrect: false },
        { id: "opt_3", text: "Ctrl+X", isCorrect: false },
        { id: "opt_4", text: "Ctrl+Z", isCorrect: false }
      ] },
    { question: "Win+Shift+S serve para qual função?", 
      options: [
        { id: "opt_0", text: "Ferramenta de recorte (capturar área)", isCorrect: true },
        { id: "opt_1", text: "Salvar arquivo", isCorrect: false },
        { id: "opt_2", text: "Desligar monitor", isCorrect: false },
        { id: "opt_3", text: "Configurar som", isCorrect: false },
        { id: "opt_4", text: "Bloquear sessão", isCorrect: false }
      ] }
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
      options: [
        { id: "opt_0", text: "Pincel de Formatação", isCorrect: true },
        { id: "opt_1", text: "AutoCorreção", isCorrect: false },
        { id: "opt_2", text: "Quebra de Página", isCorrect: false },
        { id: "opt_3", text: "Layout", isCorrect: false },
        { id: "opt_4", text: "Marcadores", isCorrect: false }
      ] },
    { question: "Ferramenta visual que define recuos e margens no Word?", 
      options: [
        { id: "opt_0", text: "Régua", isCorrect: true },
        { id: "opt_1", text: "Barra de Status", isCorrect: false },
        { id: "opt_2", text: "Painel de Navegação", isCorrect: false },
        { id: "opt_3", text: "Grade", isCorrect: false },
        { id: "opt_4", text: "Ribbon", isCorrect: false }
      ] },
    { question: "Lista com símbolos (•) é chamada de:", 
      options: [
        { id: "opt_0", text: "Marcadores", isCorrect: true },
        { id: "opt_1", text: "Numeração", isCorrect: false },
        { id: "opt_2", text: "Estilos", isCorrect: false },
        { id: "opt_3", text: "Sumário", isCorrect: false },
        { id: "opt_4", text: "Tópicos", isCorrect: false }
      ] },
    { question: "Atalho para justificar o texto (alinhar dos dois lados)?", 
      options: [
        { id: "opt_0", text: "Ctrl+J", isCorrect: true },
        { id: "opt_1", text: "Ctrl+E", isCorrect: false },
        { id: "opt_2", text: "Ctrl+D", isCorrect: false },
        { id: "opt_3", text: "Ctrl+L", isCorrect: false },
        { id: "opt_4", text: "Ctrl+R", isCorrect: false }
      ] },
    { question: "O que é a Faixa de Opções (Ribbon) no Word?", 
      options: [
        { id: "opt_0", text: "Abas no topo com ferramentas", isCorrect: true },
        { id: "opt_1", text: "Barra de rolagem lateral", isCorrect: false },
        { id: "opt_2", text: "Espaço de digitação", isCorrect: false },
        { id: "opt_3", text: "Rodapé do documento", isCorrect: false },
        { id: "opt_4", text: "Barra de status", isCorrect: false }
      ] }
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
      options: [
        { id: "opt_0", text: "Mala Direta", isCorrect: true },
        { id: "opt_1", text: "Macro", isCorrect: false },
        { id: "opt_2", text: "Hiperlink", isCorrect: false },
        { id: "opt_3", text: "Direta Mala", isCorrect: false },
        { id: "opt_4", text: "Comentários", isCorrect: false }
      ] },
    { question: "Formato de arquivo editável padrão do Word (extensão)?", 
      options: [
        { id: "opt_0", text: ".docx", isCorrect: true },
        { id: "opt_1", text: ".doc", isCorrect: false },
        { id: "opt_2", text: ".dotx", isCorrect: false },
        { id: "opt_3", text: ".pdf", isCorrect: false },
        { id: "opt_4", text: ".txt", isCorrect: false }
      ] },
    { question: "Para o Sumário Automático funcionar, é necessário:", 
      options: [
        { id: "opt_0", text: "Usar Estilos de Título", isCorrect: true },
        { id: "opt_1", text: "Salvar como PDF", isCorrect: false },
        { id: "opt_2", text: "Numerar manualmente", isCorrect: false },
        { id: "opt_3", text: "Ativar Controle de Alterações", isCorrect: false },
        { id: "opt_4", text: "Inserir quebras de seção", isCorrect: false }
      ] },
    { question: "O atalho Ctrl+H no Word executa qual função?", 
      options: [
        { id: "opt_0", text: "Localizar e Substituir", isCorrect: true },
        { id: "opt_1", text: "Salvar documento", isCorrect: false },
        { id: "opt_2", text: "Inserir hiperlink", isCorrect: false },
        { id: "opt_3", text: "Ocultar faixa de opções", isCorrect: false },
        { id: "opt_4", text: "Aplicar negrito", isCorrect: false }
      ] },
    { question: "Atalho para forçar uma quebra de página (nova página)?", 
      options: [
        { id: "opt_0", text: "Ctrl+Enter", isCorrect: true },
        { id: "opt_1", text: "Ctrl+P", isCorrect: false },
        { id: "opt_2", text: "Shift+Enter", isCorrect: false },
        { id: "opt_3", text: "Alt+Enter", isCorrect: false },
        { id: "opt_4", text: "Ctrl+Shift+Enter", isCorrect: false }
      ] }
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
    "No Excel também temos o pincel de formatação, que copia o estilo de uma célula e aplica em outra. Lembrem-se dele, estagiários, principalmente quem mexe com planilhas que já estão padronizadas. Pegaram né Duda, Clara, Micheli, Thauanne, Paulo?"
  ]},
  quiz: [
    { question: "No Excel, o cruzamento de uma coluna com uma linha é chamado de:", 
      options: [
        { id: "opt_0", text: "Célula", isCorrect: true },
        { id: "opt_1", text: "Bloco", isCorrect: false },
        { id: "opt_2", text: "Matriz", isCorrect: false },
        { id: "opt_3", text: "Campo", isCorrect: false },
        { id: "opt_4", text: "Registro", isCorrect: false }
      ] },
    { question: "Qual fórmula correta para somar os valores de A1 a A10?", 
      options: [
        { id: "opt_0", text: "=SOMA(A1:A10)", isCorrect: true },
        { id: "opt_1", text: "=SOMA(A1;A10)", isCorrect: false },
        { id: "opt_2", text: "=SOMA(A1,A10)", isCorrect: false },
        { id: "opt_3", text: "=SOMA(A1-A10)", isCorrect: false },
        { id: "opt_4", text: "=SOMA(A1*A10)", isCorrect: false }
      ] },
    { question: "Onde fica a opção 'Formatar como Tabela' no Excel?", 
      options: [
        { id: "opt_0", text: "Página Inicial → Formatar como Tabela", isCorrect: true },
        { id: "opt_1", text: "Inserir → Tabela", isCorrect: false },
        { id: "opt_2", text: "Página Inicial → Formatar", isCorrect: false },
        { id: "opt_3", text: "Fórmulas → Tabela", isCorrect: false },
        { id: "opt_4", text: "Arquivo → Tabela", isCorrect: false }
      ] },
    { question: "Para digitar um valor em uma célula, você deve:", 
      options: [
        { id: "opt_0", text: "Clicar na célula e digitar", isCorrect: false },
        { id: "opt_1", text: "Clicar duas vezes e digitar", isCorrect: false },
        { id: "opt_2", text: "Pressionar Enter e digitar", isCorrect: false },
        { id: "opt_3", text: "Usar a barra de fórmulas", isCorrect: false },
        { id: "opt_4", text: "Todas as anteriores estão corretas", isCorrect: true }
      ] },
    { question: "O botão 'Formatar como Tabela' aplica quais estilos automaticamente?", 
      options: [
        { id: "opt_0", text: "Cores alternadas, filtros e bordas", isCorrect: true },
        { id: "opt_1", text: "Apenas bordas", isCorrect: false },
        { id: "opt_2", text: "Apenas cores", isCorrect: false },
        { id: "opt_3", text: "Apenas filtros", isCorrect: false },
        { id: "opt_4", text: "Apenas negrito", isCorrect: false }
      ] }
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
      options: [
        { id: "opt_0", text: "Página Inicial → Formatar como Tabela", isCorrect: true },
        { id: "opt_1", text: "Inserir → Tabela Dinâmica", isCorrect: false },
        { id: "opt_2", text: "Arquivo → Novo → Tabela", isCorrect: false },
        { id: "opt_3", text: "Fórmulas → Criar Tabela", isCorrect: false },
        { id: "opt_4", text: "Dados → Conectar → Tabela", isCorrect: false }
      ] },
    { question: "Qual atalho aplica formatação NEGRITO no Excel?", 
      options: [
        { id: "opt_0", text: "Ctrl+N", isCorrect: true },
        { id: "opt_1", text: "Ctrl+B", isCorrect: false },
        { id: "opt_2", text: "Ctrl+G", isCorrect: false },
        { id: "opt_3", text: "Alt+N", isCorrect: false },
        { id: "opt_4", text: "Ctrl+Shift+N", isCorrect: false }
      ] },
    { question: "Para salvar um arquivo do Excel em uma pasta específica, o procedimento é:", 
      options: [
        { id: "opt_0", text: "Arquivo → Salvar Como → Selecionar pasta → Salvar", isCorrect: true },
        { id: "opt_1", text: "Arquivo → Salvar → Selecionar pasta", isCorrect: false },
        { id: "opt_2", text: "Ctrl+S → Selecionar pasta", isCorrect: false },
        { id: "opt_3", text: "F12 → Selecionar pasta", isCorrect: false },
        { id: "opt_4", text: "Arquivo → Exportar → Salvar", isCorrect: false }
      ] },
    { question: "O atalho Ctrl+S no Excel executa qual função?", 
      options: [
        { id: "opt_0", text: "Sublinhar texto", isCorrect: false },
        { id: "opt_1", text: "Substituir texto", isCorrect: false },
        { id: "opt_2", text: "Salvar o arquivo atual", isCorrect: true },
        { id: "opt_3", text: "Selecionar todas as células", isCorrect: false },
        { id: "opt_4", text: "Inserir símbolo", isCorrect: false }
      ] },
    { question: "Uma tabela formatada automaticamente pelo recurso 'Formatar como Tabela' inclui:", 
      options: [
        { id: "opt_0", text: "Cores alternadas, filtros e bordas profissionais", isCorrect: true },
        { id: "opt_1", text: "Apenas bordas nas células", isCorrect: false },
        { id: "opt_2", text: "Apenas cores de fundo", isCorrect: false },
        { id: "opt_3", text: "Apenas filtros automáticos", isCorrect: false },
        { id: "opt_4", text: "Apenas formatação de números", isCorrect: false }
      ] }
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
      options: [
        { id: "opt_0", text: "Cco oculta os destinatários uns dos outros", isCorrect: true },
        { id: "opt_1", text: "Cc oculta os destinatários", isCorrect: false },
        { id: "opt_2", text: "Cco envia sem anexos", isCorrect: false },
        { id: "opt_3", text: "Cc é mais rápido", isCorrect: false },
        { id: "opt_4", text: "Cco é apenas para externos", isCorrect: false }
      ] },
    { question: "Para que serve o recurso 'Respostas Automáticas' no Outlook?", 
      options: [
        { id: "opt_0", text: "Avisar sobre ausência/férias", isCorrect: true },
        { id: "opt_1", text: "Responder emails com IA", isCorrect: false },
        { id: "opt_2", text: "Enviar SMS automático", isCorrect: false },
        { id: "opt_3", text: "Apagar spam automaticamente", isCorrect: false },
        { id: "opt_4", text: "Organizar emails por pasta", isCorrect: false }
      ] },
    { question: "Qual a função de uma 'Regra' (Rule) no Outlook?", 
      options: [
        { id: "opt_0", text: "Automatizar ações (mover, deletar, categorizar emails)", isCorrect: true },
        { id: "opt_1", text: "Mudar o plano de fundo", isCorrect: false },
        { id: "opt_2", text: "Bloquear anexos maliciosos", isCorrect: false },
        { id: "opt_3", text: "Aumentar velocidade de envio", isCorrect: false },
        { id: "opt_4", text: "Criptografar mensagens", isCorrect: false }
      ] },
    { question: "Para que serve a 'Bandeira' (Flag) em um email?", 
      options: [
        { id: "opt_0", text: "Marcar como tarefa pendente", isCorrect: true },
        { id: "opt_1", text: "Excluir o email", isCorrect: false },
        { id: "opt_2", text: "Bloquear o remetente", isCorrect: false },
        { id: "opt_3", text: "Criptografar a mensagem", isCorrect: false },
        { id: "opt_4", text: "Arquivar o email", isCorrect: false }
      ] },
    { question: "Qual é a boa prática para preencher o campo 'Assunto' de um email profissional?", 
      options: [
        { id: "opt_0", text: "Claro, objetivo e descritivo", isCorrect: true },
        { id: "opt_1", text: "Deixar em branco", isCorrect: false },
        { id: "opt_2", text: "Usar apenas 'Oi'", isCorrect: false },
        { id: "opt_3", text: "Escrever tudo em maiúsculo", isCorrect: false },
        { id: "opt_4", text: "Usar apenas números", isCorrect: false }
      ] }
  ]
}
];

// ═══════════════════════════════════════════════════════════
// MUNDO 2 — MCom (CONVERTIDO)
// ═══════════════════════════════════════════════════════════

const WORLD2_STAGES = [
{
  id: 11, worldId: 2, name: "Conectividade", icon: "🌐", difficulty: "easy",
  intro: { character: "Mini Fred", lines: [
    "Bem-vindo ao Mundo MCom — Ministério das Comunicações!, Eu sou o Mini Fred, seu guia nesse novo mundo. Vamos explorar o universo da conectividade e descobrir o que mais faz esse enorme órgão em que trabalhamos.",
    "O MCom formula e executa políticas de telecomunicações, radiodifusão e internet.",
    "TELECOMUNICAÇÕES: Telefonia, internet banda larga, fibra óptica, satélite.",
    "RADIODIFUSÃO: TV e rádio abertas. O MCom cuida das licenças.",
    "INCLUSÃO DIGITAL é a missão central: garantir acesso para TODOS."
  ]},
  quiz: [
    { question: "Papel principal do MCom?", 
      options: [
        { id: "opt_0", text: "Transporte aéreo", isCorrect: false },
        { id: "opt_1", text: "Políticas de telecomunicações e inclusão digital", isCorrect: true },
        { id: "opt_2", text: "Energia hidrelétrica", isCorrect: false },
        { id: "opt_3", text: "Previdência social", isCorrect: false }
      ] },
    { question: "Qual programa leva internet via satélite para escolas?", 
      options: [
        { id: "opt_0", text: "Digitaliza Brasil", isCorrect: false },
        { id: "opt_1", text: "Norte Conectado", isCorrect: false },
        { id: "opt_2", text: "Wi-Fi Brasil", isCorrect: true },
        { id: "opt_3", text: "Correios Digital", isCorrect: false }
      ] },
    { question: "Inclusão Digital significa?", 
      options: [
        { id: "opt_0", text: "Orçamento empresarial", isCorrect: false },
        { id: "opt_1", text: "Garantir acesso às tecnologias para todos", isCorrect: true },
        { id: "opt_2", text: "Digitalizar documentos", isCorrect: false },
        { id: "opt_3", text: "Criar redes sociais", isCorrect: false }
      ] },
    { question: "RADIODIFUSÃO inclui?", 
      options: [
        { id: "opt_0", text: "Só internet", isCorrect: false },
        { id: "opt_1", text: "TV e rádio abertas", isCorrect: true },
        { id: "opt_2", text: "Só 5G", isCorrect: false },
        { id: "opt_3", text: "Só streaming", isCorrect: false }
      ] }
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
    { question: "Norte Conectado usa qual meio?", 
      options: [
        { id: "opt_0", text: "Torres de rádio", isCorrect: false },
        { id: "opt_1", text: "Cabos subfluviais nos rios", isCorrect: true },
        { id: "opt_2", text: "Satélites apenas", isCorrect: false },
        { id: "opt_3", text: "Redes 2G", isCorrect: false }
      ] },
    { question: "Objetivo do Digitaliza Brasil?", 
      options: [
        { id: "opt_0", text: "Distribuir smartphones", isCorrect: false },
        { id: "opt_1", text: "Substituir TV analógica por digital", isCorrect: true },
        { id: "opt_2", text: "Criar rede social", isCorrect: false },
        { id: "opt_3", text: "Automatizar Correios", isCorrect: false }
      ] },
    { question: "Por que cabos subfluviais?", 
      options: [
        { id: "opt_0", text: "Mais barato", isCorrect: false },
        { id: "opt_1", text: "Rios são vias de acesso na Amazônia", isCorrect: true },
        { id: "opt_2", text: "Água conduz melhor", isCorrect: false },
        { id: "opt_3", text: "Única tecnologia aprovada", isCorrect: false }
      ] },
    { question: "Problema do sinal ANALÓGICO?", 
      options: [
        { id: "opt_0", text: "Muito caro", isCorrect: false },
        { id: "opt_1", text: "Qualidade inferior, chuviscos", isCorrect: true },
        { id: "opt_2", text: "Só funciona em smartphone", isCorrect: false },
        { id: "opt_3", text: "Não funciona de dia", isCorrect: false }
      ] }
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
    { question: "Função estratégica da Telebras?", 
      options: [
        { id: "opt_0", text: "Emissora de TV", isCorrect: false },
        { id: "opt_1", text: "Operar rede privativa federal", isCorrect: true },
        { id: "opt_2", text: "Fabricar componentes", isCorrect: false },
        { id: "opt_3", text: "Substituir Correios", isCorrect: false }
      ] },
    { question: "5G é?", 
      options: [
        { id: "opt_0", text: "5ª geração de PCs", isCorrect: false },
        { id: "opt_1", text: "5ª geração de redes móveis", isCorrect: true },
        { id: "opt_2", text: "Plano de 5 anos", isCorrect: false },
        { id: "opt_3", text: "Banda de rádio exclusiva", isCorrect: false }
      ] },
    { question: "Diferencial do Leilão do 5G?", 
      options: [
        { id: "opt_0", text: "Chips gratuitos", isCorrect: false },
        { id: "opt_1", text: "Obrigação de investir em escolas", isCorrect: true },
        { id: "opt_2", text: "Proibição de estrangeiras", isCorrect: false },
        { id: "opt_3", text: "Limite de preço", isCorrect: false }
      ] },
    { question: "Geração que popularizou streaming?", 
      options: [
        { id: "opt_0", text: "2G", isCorrect: false },
        { id: "opt_1", text: "3G", isCorrect: false },
        { id: "opt_2", text: "4G", isCorrect: true },
        { id: "opt_3", text: "5G", isCorrect: false }
      ] }
  ]
},
{
  id: 14, worldId: 2, name: "Computadores p/ Inclusão", icon: "🖥️", difficulty: "easy",
  intro: { character: "Mini Fred", lines: [
    "PROGRAMA COMPUTADORES PARA INCLUSÃO: Criado desde 2004 e aproveita computadores sem funcionamento, recondiciona e doa.",
    "FLUXO: Cedente → CRC (recondiciona) → PID (Ponto de Inclusão Digital) → Inclusão Digital (Transformação Social e digital).",
    "CRC: Centro de Recondicionamento de Computadores. Parceiro que realiza a manutenção, doação dos equipamentos, capacitação e descarte ambientalmente correto.",
    "PID: Escola públicas, telecentro, biblioteca, ONG, Com.Quilombolas, Povos Originários, Público LGBTQIAP+",
    "REEE: Resíduos de Equipamentos Eletroeletrônicos, popularmente conhecido como lixo eletrônico."
  ]},
  quiz: [
    { question: "CRC significa?", 
      options: [
        { id: "opt_0", text: "Centro de Reciclagem", isCorrect: false },
        { id: "opt_1", text: "Centro de Recondicionamento de Computadores", isCorrect: true },
        { id: "opt_2", text: "Comitê de Revisão", isCorrect: false },
        { id: "opt_3", text: "Conselho de Recuperação", isCorrect: false }
      ] },
    { question: "De onde vêm os equipamentos?", 
      options: [
        { id: "opt_0", text: "Compra internacional", isCorrect: false },
        { id: "opt_1", text: "Desfazimento de órgãos públicos e Acordos de Cooperação", isCorrect: true },
        { id: "opt_2", text: "Apreensões da PF", isCorrect: false },
        { id: "opt_3", text: "Troca com cidadãos", isCorrect: false }
      ] },
    { question: "PID significa?", 
      options: [
        { id: "opt_0", text: "Programa de Inclusão Digital", isCorrect: false },
        { id: "opt_1", text: "Ponto de Inclusão Digital", isCorrect: true },
        { id: "opt_2", text: "Protocolo de Instalação", isCorrect: false },
        { id: "opt_3", text: "Plano Integrado", isCorrect: false }
      ] },
    { question: "Economia Circular no programa?", 
      options: [
        { id: "opt_0", text: "Circular dinheiro", isCorrect: false },
        { id: "opt_1", text: "Reaproveitar equipamentos descartados", isCorrect: true },
        { id: "opt_2", text: "Girar entre escolas", isCorrect: false },
        { id: "opt_3", text: "Comprar e revender", isCorrect: false }
      ] }
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
    { question: "Destino final dos computadores?", 
      options: [
        { id: "opt_0", text: "Vendidos em bazares", isCorrect: false },
        { id: "opt_1", text: "Doados a PIDs (escolas, telecentros)", isCorrect: true },
        { id: "opt_2", text: "Devolvidos ao doador", isCorrect: false },
        { id: "opt_3", text: "Sorteio no insta", isCorrect: false }
      ] },
    { question: "Por que Software Livre?", 
      options: [
        { id: "opt_0", text: "Mais fácil", isCorrect: false },
        { id: "opt_1", text: "Eliminar custos de licenças", isCorrect: true },
        { id: "opt_2", text: "Obrigatório por lei", isCorrect: false },
        { id: "opt_3", text: "Dificultar uso indevido", isCorrect: false }
      ] },
    { question: "Pilar educacional dos CRCs?", 
      options: [
        { id: "opt_0", text: "Alfabetização", isCorrect: false },
        { id: "opt_1", text: "Cursos técnicos de TI para toda a população", isCorrect: true },
        { id: "opt_2", text: "Educação física", isCorrect: false },
        { id: "opt_3", text: "Treinamento de motoristas", isCorrect: false }
      ] },
    { question: "Peças irrecuperáveis?", 
      options: [
        { id: "opt_0", text: "Guardar em estoque", isCorrect: false },
        { id: "opt_1", text: "Enviar para reciclagem correta", isCorrect: true },
        { id: "opt_2", text: "Jogar no lixo comum", isCorrect: false },
        { id: "opt_3", text: "Devolver ao doador", isCorrect: false }
      ] }
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
    { question: "Como o programa preserva o ambiente?", 
      options: [
        { id: "opt_0", text: "Plantando árvores", isCorrect: false },
        { id: "opt_1", text: "Reduzindo lixo eletrônico e descarte correto", isCorrect: true },
        { id: "opt_2", text: "Substituindo papel", isCorrect: false },
        { id: "opt_3", text: "Painéis solares", isCorrect: false }
      ] },
    { question: "Peças irrecuperáveis vão para?", 
      options: [
        { id: "opt_0", text: "Aterro comum", isCorrect: false },
        { id: "opt_1", text: "Reciclagem especializada", isCorrect: true },
        { id: "opt_2", text: "Jogadas no mar", isCorrect: false },
        { id: "opt_3", text: "Incineradas", isCorrect: false }
      ] },
    { question: "Metais pesados são perigosos por quê?", 
      options: [
        { id: "opt_0", text: "Roubo para joias", isCorrect: false },
        { id: "opt_1", text: "Contaminam solo e água por décadas", isCorrect: true },
        { id: "opt_2", text: "Atraem animais", isCorrect: false },
        { id: "opt_3", text: "Interferem em sinal", isCorrect: false }
      ] },
    { question: "Lei do lixo eletrônico?", 
      options: [
        { id: "opt_0", text: "8.666", isCorrect: false },
        { id: "opt_1", text: "12.305/2010", isCorrect: true },
        { id: "opt_2", text: "9.504", isCorrect: false },
        { id: "opt_3", text: "13.709 (LGPD)", isCorrect: false }
      ] }
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
    { question: "Quem pode ser beneficiário?", 
      options: [
        { id: "opt_0", text: "Pessoas físicas", isCorrect: false },
        { id: "opt_1", text: "Entidades sem fins lucrativos e órgãos públicos", isCorrect: true },
        { id: "opt_2", text: "Empresas de tecnologia", isCorrect: false },
        { id: "opt_3", text: "Bancos estatais", isCorrect: false }
      ] },
    { question: "Quem näo pode receber?", 
      options: [
        { id: "opt_0", text: "OSC", isCorrect: false },
        { id: "opt_1", text: "Eu-Pessoa Física", isCorrect: true },
        { id: "opt_2", text: "Entidades Públicas", isCorrect: false },
        { id: "opt_3", text: "Entidades com CNPJ ativo", isCorrect: false }
      ] },
    { question: "Documentação exigida do PID", 
      options: [
        { id: "opt_0", text: "Carta de intenção", isCorrect: false },
        { id: "opt_1", text: "CNPJ, endereço, responsável técnico", isCorrect: true },
        { id: "opt_2", text: "Comprovante residencial", isCorrect: false },
        { id: "opt_3", text: "Autorização de Deputado", isCorrect: false }
      ] },
    { question: "Por que prisões são beneficiários?", 
      options: [
        { id: "opt_0", text: "Mais espaço", isCorrect: false },
        { id: "opt_1", text: "Inclusão digital é ressocialização", isCorrect: true },
        { id: "opt_2", text: "Economiza segurança", isCorrect: false },
        { id: "opt_3", text: "Logística mais fácil", isCorrect: false }
      ] }
  ]
},
{
  id: 18, worldId: 2, name: "Monitoramento", icon: "📊", difficulty: "hard",
  intro: { character: "Mini Fred", lines: [
    "MONITORAMENTO PÓS-DOAÇÃO: o MCom não entrega e esquece!",
    "VISITAS TÉCNICAS: Equipes verificam se computadores estão sendo usados.",
    "INDICADORES: Nº de usuários, cursos, horas de uso.",
    "O monitoramento é importante para que tenhamos o qualitativo de nossas ações, garantindo que as políticas públicas estejam sendo feitas corretamente."
  ]},
  quiz: [
    { question: "Como o MCom monitora os PIDs?", 
      options: [
        { id: "opt_0", text: "Redes sociais", isCorrect: false },
        { id: "opt_1", text: "Visitas técnicas e formulários de satisfação", isCorrect: true },
        { id: "opt_2", text: "Não monitora", isCorrect: false },
        { id: "opt_3", text: "Jornais locais", isCorrect: false }
      ] },
    { question: "Papel das universidades parceiras?", 
      options: [
        { id: "opt_0", text: "Emprestar espaço", isCorrect: false },
        { id: "opt_1", text: "Gestão técnica e pesquisa", isCorrect: true },
        { id: "opt_2", text: "Vender equipamentos", isCorrect: false },
        { id: "opt_3", text: "Nenhuma relação", isCorrect: false }
      ] },
    { question: "O que os beneficiários assinam?", 
      options: [
        { id: "opt_0", text: "Carta de agradecimento", isCorrect: false },
        { id: "opt_1", text: "Termos de Doação", isCorrect: true },
        { id: "opt_2", text: "Contrato de compra", isCorrect: false },
        { id: "opt_3", text: "Declaração de nunca vender", isCorrect: false }
      ] },
    { question: "Dados de impacto são?", 
      options: [
        { id: "opt_0", text: "Sigilosos", isCorrect: false },
        { id: "opt_1", text: "Publicados em portais abertos", isCorrect: true },
        { id: "opt_2", text: "Só para o Congresso", isCorrect: false },
        { id: "opt_3", text: "Não são coletados", isCorrect: false }
      ] }
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
    { question: "Telecentros são?", 
      options: [
        { id: "opt_0", text: "Call centers", isCorrect: false },
        { id: "opt_1", text: "Espaços públicos com internet gratuita", isCorrect: true },
        { id: "opt_2", text: "Antenas de celular", isCorrect: false },
        { id: "opt_3", text: "Lojas de eletrônicos", isCorrect: false }
      ] },
    { question: "Serviço postal vinculado ao MCom?", 
      options: [
        { id: "opt_0", text: "FedEx", isCorrect: false },
        { id: "opt_1", text: "Correios (ECT)", isCorrect: true },
        { id: "opt_2", text: "DHL", isCorrect: false },
        { id: "opt_3", text: "Jadlog", isCorrect: false }
      ] },
    { question: "Por que Correios são estratégicos?", 
      options: [
        { id: "opt_0", text: "Mais modernos", isCorrect: false },
        { id: "opt_1", text: "Presentes em 5.570 municípios", isCorrect: true },
        { id: "opt_2", text: "Maiores empregadores", isCorrect: false },
        { id: "opt_3", text: "Distribuem chips", isCorrect: false }
      ] },
    { question: "Carreta Digital é?", 
      options: [
        { id: "opt_0", text: "Fibra óptica", isCorrect: false },
        { id: "opt_1", text: "É um projeto de capacitação itinerante", isCorrect: true },
        { id: "opt_2", text: "Financiamento", isCorrect: false },
        { id: "opt_3", text: "Plataforma de ensino", isCorrect: false }
      ] }
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
    "O programa Computadores para Inclusão faz parte dessa transformação: cada computador doado é uma porta de acesso ao Gov.br e à cidadania digital."
  ]},
  quiz: [
    { question: "Quantos serviços o Gov.br oferece atualmente?", 
      options: [
        { id: "opt_0", text: "Menos de 100", isCorrect: false },
        { id: "opt_1", text: "Cerca de 500", isCorrect: false },
        { id: "opt_2", text: "Mais de 4.000", isCorrect: true },
        { id: "opt_3", text: "Apenas 10", isCorrect: false }
      ] },
    { question: "Qual serviço do Gov.br é usado para aposentadoria?", 
      options: [
        { id: "opt_0", text: "e-CAC", isCorrect: false },
        { id: "opt_1", text: "Meu INSS", isCorrect: true },
        { id: "opt_2", text: "SUS Digital", isCorrect: false },
        { id: "opt_3", text: "FGTS Digital", isCorrect: false }
      ] },
    { question: "Qual a meta do Brasil até 2030?", 
      options: [
        { id: "opt_0", text: "Ser o país com mais celulares", isCorrect: false },
        { id: "opt_1", text: "Estar entre os 10 mais digitais do mundo", isCorrect: true },
        { id: "opt_2", text: "Substituir todos os computadores", isCorrect: false },
        { id: "opt_3", text: "Criar internet gratuita total", isCorrect: false }
      ] },
    { question: "O que é a E-Digital?", 
      options: [
        { id: "opt_0", text: "Um aplicativo", isCorrect: false },
        { id: "opt_1", text: "A Estratégia Brasileira para Transformação Digital", isCorrect: true },
        { id: "opt_2", text: "Uma lei sobre internet", isCorrect: false },
        { id: "opt_3", text: "Um programa de bolsas", isCorrect: false }
      ] },
    { question: "O programa Computadores para Inclusão se conecta ao Gov.br porque:", 
      options: [
        { id: "opt_0", text: "Fornece internet grátis", isCorrect: false },
        { id: "opt_1", text: "Cada PC doado é uma porta de acesso à cidadania digital", isCorrect: true },
        { id: "opt_2", text: "Cria aplicativos", isCorrect: false },
        { id: "opt_3", text: "Gerencia o site", isCorrect: false }
      ] }
  ]
}
];

// ═══════════════════════════════════════════════════════════
// MUNDO 3 — CGID (CONVERTIDO - PARCIAL)
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
    { question: "Qual é a missão principal da CGID?", 
      options: [
        { id: "opt_0", text: "Fiscalizar empresas privadas", isCorrect: false },
        { id: "opt_1", text: "Desenvolver ações de inclusão tecnológica e sustentabilidade", isCorrect: true },
        { id: "opt_2", text: "Vender equipamentos de informática", isCorrect: false },
        { id: "opt_3", text: "Gerenciar recursos humanos", isCorrect: false }
      ] },
    { question: "Com quais áreas a CGID trabalha diretamente?", 
      options: [
        { id: "opt_0", text: "Apenas eventos", isCorrect: false },
        { id: "opt_1", text: "Desfazimento, doação, CRCs, acordos e automação", isCorrect: true },
        { id: "opt_2", text: "Somente financeiro", isCorrect: false },
        { id: "opt_3", text: "Exclusivamente design", isCorrect: false }
      ] },
    { question: "O trabalho da CGID conecta quais áreas?", 
      options: [
        { id: "opt_0", text: "Apenas tecnologia", isCorrect: false },
        { id: "opt_1", text: "Tecnologia, educação, sustentabilidade e impacto social", isCorrect: true },
        { id: "opt_2", text: "Somente educação", isCorrect: false },
        { id: "opt_3", text: "Apenas sustentabilidade", isCorrect: false }
      ] },
    { question: "O programa principal da CGID é:", 
      options: [
        { id: "opt_0", text: "Bolsa Família", isCorrect: false },
        { id: "opt_1", text: "Computadores para Inclusão", isCorrect: true },
        { id: "opt_2", text: "Minha Casa Minha Vida", isCorrect: false },
        { id: "opt_3", text: "Farmácia Popular", isCorrect: false }
      ] },
    { question: "A CGID está vinculada a qual ministério?", 
      options: [
        { id: "opt_0", text: "Ministério da Saúde", isCorrect: false },
        { id: "opt_1", text: "Ministério das Comunicações", isCorrect: true },
        { id: "opt_2", text: "Ministério da Educação", isCorrect: false },
        { id: "opt_3", text: "Ministério da Fazenda", isCorrect: false }
      ] }
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
    { question: "Qual atividade faz parte da rotina do Setor de Eventos?", 
      options: [
        { id: "opt_0", text: "Compra de passagens particulares", isCorrect: false },
        { id: "opt_1", text: "Briefing, roteiro e articulação com ASCOM e Cerimonial", isCorrect: true },
        { id: "opt_2", text: "Manutenção mecânica da Carreta Digital", isCorrect: false },
        { id: "opt_3", text: "Apenas envio de e-mails internos", isCorrect: false }
      ] },
    { question: "Qual plataforma é usada para acesso à informação?", 
      options: [
        { id: "opt_0", text: "Teams", isCorrect: false },
        { id: "opt_1", text: "GovPlay", isCorrect: false },
        { id: "opt_2", text: "Fala.Br", isCorrect: true },
        { id: "opt_3", text: "SIGEPE", isCorrect: false }
      ] },
    { question: "O acompanhamento da Carreta Digital está relacionado a:", 
      options: [
        { id: "opt_0", text: "Organização das ações institucionais", isCorrect: true },
        { id: "opt_1", text: "Descarte de lixo eletrônico", isCorrect: false },
        { id: "opt_2", text: "Manutenção de servidores físicos", isCorrect: false },
        { id: "opt_3", text: "Fiscalização ambiental", isCorrect: false }
      ] },
    { question: "O Setor de Eventos articula com quais áreas?", 
      options: [
        { id: "opt_0", text: "Apenas financeiro", isCorrect: false },
        { id: "opt_1", text: "ASCOM e Cerimonial", isCorrect: true },
        { id: "opt_2", text: "Somente jurídico", isCorrect: false },
        { id: "opt_3", text: "Exclusivamente TI", isCorrect: false }
      ] },
    { question: "Qual desses eventos estão pendentes?", 
      options: [
        { id: "opt_0", text: "Formatura em Patos/PB", isCorrect: false },
        { id: "opt_1", text: "Nenhum, porque o Gustavinho não avisou da existência dele", isCorrect: true },
        { id: "opt_2", text: "Doação em Juazeiro/CE", isCorrect: false },
        { id: "opt_3", text: "Inauguração do CRC no Acre", isCorrect: false }
      ] }
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
    { question: "Qual o objetivo do desfazimento de bens públicos?", 
      options: [
        { id: "opt_0", text: "Comprar novos computadores", isCorrect: false },
        { id: "opt_1", text: "Destinar corretamente equipamentos sem uso", isCorrect: true },
        { id: "opt_2", text: "Cancelar eventos", isCorrect: false },
        { id: "opt_3", text: "Reduzir servidores", isCorrect: false }
      ] },
    { question: "Os equipamentos recebidos pelos CRCs passam por:", 
      options: [
        { id: "opt_0", text: "Revenda comercial obrigatória", isCorrect: false },
        { id: "opt_1", text: "Recondicionamento e reaproveitamento", isCorrect: true },
        { id: "opt_2", text: "Destruição imediata", isCorrect: false },
        { id: "opt_3", text: "Exportação internacional", isCorrect: false }
      ] },
    { question: "Uma dificuldade do processo de desfazimento é:", 
      options: [
        { id: "opt_0", text: "Controle de combustível", isCorrect: false },
        { id: "opt_1", text: "Falta de veículos oficiais", isCorrect: false },
        { id: "opt_2", text: "Listas de desfazimento sem padrão", isCorrect: true },
        { id: "opt_3", text: "Organização de eventos culturais", isCorrect: false }
      ] },
    { question: "O que é feito com equipamentos irrecuperáveis?", 
      options: [
        { id: "opt_0", text: "Guardados em estoque", isCorrect: false },
        { id: "opt_1", text: "Enviados para reciclagem", isCorrect: true },
        { id: "opt_2", text: "Jogados no lixo comum", isCorrect: false },
        { id: "opt_3", text: "Devolvidos ao doador", isCorrect: false }
      ] },
    { question: "O desfazimento segue normas de qual instrução?", 
      options: [
        { id: "opt_0", text: "IN SEGES", isCorrect: true },
        { id: "opt_1", text: "LGPD", isCorrect: false },
        { id: "opt_2", text: "Lei 8.666", isCorrect: false },
        { id: "opt_3", text: "Constituição Federal", isCorrect: false }
      ] }
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
    { question: "Qual o objetivo das solicitações de computadores?", 
      options: [
        { id: "opt_0", text: "Atender instituições beneficiadas pelo programa", isCorrect: true },
        { id: "opt_1", text: "Comprar veículos administrativos", isCorrect: false },
        { id: "opt_2", text: "Cancelar processos", isCorrect: false },
        { id: "opt_3", text: "Realizar eventos culturais", isCorrect: false }
      ] },
    { question: "Os computadores doados são destinados para:", 
      options: [
        { id: "opt_0", text: "Revenda comercial", isCorrect: false },
        { id: "opt_1", text: "Inclusão digital e apoio social", isCorrect: true },
        { id: "opt_2", text: "Leilões privados", isCorrect: false },
        { id: "opt_3", text: "Uso exclusivo do Ministério", isCorrect: false }
      ] },
    { question: "O acompanhamento das solicitações garante:", 
      options: [
        { id: "opt_0", text: "Organização e controle dos pedidos", isCorrect: true },
        { id: "opt_1", text: "Suspensão das entregas", isCorrect: false },
        { id: "opt_2", text: "Redução da comunicação", isCorrect: false },
        { id: "opt_3", text: "Cancelamento automático", isCorrect: false }
      ] },
    { question: "Quem pode solicitar computadores?", 
      options: [
        { id: "opt_0", text: "Apenas empresas", isCorrect: false },
        { id: "opt_1", text: "Escolas, associações e instituições públicas", isCorrect: true },
        { id: "opt_2", text: "Somente ONGs", isCorrect: false },
        { id: "opt_3", text: "Qualquer pessoa física", isCorrect: false }
      ] },
    { question: "Após o recondicionamento, os computadores vão para:", 
      options: [
        { id: "opt_0", text: "Venda", isCorrect: false },
        { id: "opt_1", text: "Pontos de Inclusão Digital", isCorrect: true },
        { id: "opt_2", text: "Estoque permanente", isCorrect: false },
        { id: "opt_3", text: "Descarte", isCorrect: false }
      ] }
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
    { question: "O que caracteriza um ACT?", 
      options: [
        { id: "opt_0", text: "Transferência obrigatória de recursos", isCorrect: false },
        { id: "opt_1", text: "Parceria institucional sem transferência financeira", isCorrect: true },
        { id: "opt_2", text: "Compra de equipamentos", isCorrect: false },
        { id: "opt_3", text: "Contratação de empresas privadas", isCorrect: false }
      ] },
    { question: "Quem pode participar de ACTs?", 
      options: [
        { id: "opt_0", text: "Caixa Econômica Federal", isCorrect: false },
        { id: "opt_1", text: "Banco do Brasil", isCorrect: false },
        { id: "opt_2", text: "Correios", isCorrect: false },
        { id: "opt_3", text: "Todas as anteriores", isCorrect: true }
      ] },
    { question: "Uma atividade da equipe de ACTs é:", 
      options: [
        { id: "opt_0", text: "Elaboração de relatórios periódicos", isCorrect: true },
        { id: "opt_1", text: "Fiscalização de trânsito", isCorrect: false },
        { id: "opt_2", text: "Manutenção predial", isCorrect: false },
        { id: "opt_3", text: "Controle de combustível", isCorrect: false }
      ] },
    { question: "O ACT envolve dinheiro?", 
      options: [
        { id: "opt_0", text: "Sim, sempre", isCorrect: false },
        { id: "opt_1", text: "Não, é parceria sem repasse financeiro", isCorrect: true },
        { id: "opt_2", text: "Depende do caso", isCorrect: false },
        { id: "opt_3", text: "Apenas emendas", isCorrect: false }
      ] },
    { question: "Em qual sistema o ACT é instruído?", 
      options: [
        { id: "opt_0", text: "Excel", isCorrect: false },
        { id: "opt_1", text: "SEI", isCorrect: true },
        { id: "opt_2", text: "WhatsApp", isCorrect: false },
        { id: "opt_3", text: "Google Forms", isCorrect: false }
      ] }
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
    { question: "Qual atividade pertence ao setor de Design?", 
      options: [
        { id: "opt_0", text: "Desenvolvimento de certificados e peças gráficas", isCorrect: true },
        { id: "opt_1", text: "Manutenção de computadores", isCorrect: false },
        { id: "opt_2", text: "Fiscalização financeira", isCorrect: false },
        { id: "opt_3", text: "Controle de combustível", isCorrect: false }
      ] },
    { question: "O objetivo da padronização visual é:", 
      options: [
        { id: "opt_0", text: "Garantir alinhamento institucional dos materiais", isCorrect: true },
        { id: "opt_1", text: "Reduzir a produção de documentos", isCorrect: false },
        { id: "opt_2", text: "Evitar apresentações", isCorrect: false },
        { id: "opt_3", text: "Eliminar materiais gráficos", isCorrect: false }
      ] },
    { question: "O tratamento de imagens auxilia em:", 
      options: [
        { id: "opt_0", text: "Produção de materiais digitais e impressos", isCorrect: true },
        { id: "opt_1", text: "Manutenção elétrica", isCorrect: false },
        { id: "opt_2", text: "Controle financeiro", isCorrect: false },
        { id: "opt_3", text: "Fiscalização de contratos", isCorrect: false }
      ] },
    { question: "Qual resolução para materiais impressos?", 
      options: [
        { id: "opt_0", text: "72 DPI", isCorrect: false },
        { id: "opt_1", text: "300 DPI", isCorrect: true },
        { id: "opt_2", text: "150 DPI", isCorrect: false },
        { id: "opt_3", text: "600 DPI", isCorrect: false }
      ] },
    { question: "Quem define a identidade visual do governo?", 
      options: [
        { id: "opt_0", text: "Cada setor", isCorrect: false },
        { id: "opt_1", text: "Secom", isCorrect: true },
        { id: "opt_2", text: "Presidente", isCorrect: false },
        { id: "opt_3", text: "TCU", isCorrect: false }
      ] }
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
    { question: "Qual o objetivo das automações da equipe?", 
      options: [
        { id: "opt_0", text: "Aumentar tarefas manuais", isCorrect: false },
        { id: "opt_1", text: "Melhorar o fluxo de trabalho e otimizar processos", isCorrect: true },
        { id: "opt_2", text: "Reduzir doações", isCorrect: false },
        { id: "opt_3", text: "Substituir servidores", isCorrect: false }
      ] },
    { question: "O que é um Termo de Doação?", 
      options: [
        { id: "opt_0", text: "Documento de compra", isCorrect: false },
        { id: "opt_1", text: "Documento que formaliza e comprova a entrega dos computadores", isCorrect: true },
        { id: "opt_2", text: "Relatório financeiro anual", isCorrect: false },
        { id: "opt_3", text: "Contrato de manutenção", isCorrect: false }
      ] },
    { question: "O gerenciamento das comprovações garante:", 
      options: [
        { id: "opt_0", text: "Rastreamento e organização das informações", isCorrect: true },
        { id: "opt_1", text: "Controle de combustível", isCorrect: false },
        { id: "opt_2", text: "Redução das doações", isCorrect: false },
        { id: "opt_3", text: "Cancelamento de processos", isCorrect: false }
      ] },
    { question: "O Termo de Doação deve conter:", 
      options: [
        { id: "opt_0", text: "Apenas nome", isCorrect: false },
        { id: "opt_1", text: "Nome, CNPJ, cidade, quantidade", isCorrect: true },
        { id: "opt_2", text: "Só CNPJ", isCorrect: false },
        { id: "opt_3", text: "Qualquer informação", isCorrect: false }
      ] },
    { question: "Qual sistema centraliza os dados do programa?", 
      options: [
        { id: "opt_0", text: "Excel", isCorrect: false },
        { id: "opt_1", text: "Processo GAIA", isCorrect: true },
        { id: "opt_2", text: "Word", isCorrect: false },
        { id: "opt_3", text: "Bloco de Notas", isCorrect: false }
      ] }
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
    { question: "Qual o objetivo do acompanhamento financeiro dos CRCs?", 
      options: [
        { id: "opt_0", text: "Comprar prédios", isCorrect: false },
        { id: "opt_1", text: "Garantir controle e transparência dos recursos públicos", isCorrect: true },
        { id: "opt_2", text: "Cancelar atividades", isCorrect: false },
        { id: "opt_3", text: "Reduzir cursos", isCorrect: false }
      ] },
    { question: "Os recursos dos CRCs podem vir de:", 
      options: [
        { id: "opt_0", text: "Emendas parlamentares", isCorrect: false },
        { id: "opt_1", text: "Editais públicos", isCorrect: false },
        { id: "opt_2", text: "Repasses institucionais", isCorrect: false },
        { id: "opt_3", text: "Todas as anteriores", isCorrect: true }
      ] },
    { question: "O Relatório de Execução Semestral é usado para:", 
      options: [
        { id: "opt_0", text: "Registrar férias", isCorrect: false },
        { id: "opt_1", text: "Acompanhar execução financeira e metas", isCorrect: true },
        { id: "opt_2", text: "Solicitar veículos", isCorrect: false },
        { id: "opt_3", text: "Organizar eventos", isCorrect: false }
      ] },
    { question: "Além dos gastos, o relatório apresenta:", 
      options: [
        { id: "opt_0", text: "Metas de formação e doação", isCorrect: true },
        { id: "opt_1", text: "Controle de trânsito", isCorrect: false },
        { id: "opt_2", text: "Fiscalização de rodovias", isCorrect: false },
        { id: "opt_3", text: "Resultados eleitorais", isCorrect: false }
      ] },
    { question: "O que são indicadores de desempenho?", 
      options: [
        { id: "opt_0", text: "Lista de funcionários", isCorrect: false },
        { id: "opt_1", text: "Métricas para avaliar resultados", isCorrect: true },
        { id: "opt_2", text: "Controle de ponto", isCorrect: false },
        { id: "opt_3", text: "Registro de faltas", isCorrect: false }
      ] }
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
    { question: "Qual o significado da sigla INAC?", 
      options: [
        { id: "opt_0", text: "Instituto Nacional de Ação Comunitária", isCorrect: false },
        { id: "opt_1", text: "Instituto Nova Ágora da Cidadania", isCorrect: true },
        { id: "opt_2", text: "Instituto Nacional de Apoio ao Cidadão", isCorrect: false },
        { id: "opt_3", text: "Instituto Nova Ação Civil", isCorrect: false }
      ] },
    { question: "Qual o significado da sigla IAPS?", 
      options: [
        { id: "opt_0", text: "Instituto de Apoio à Pesquisa Social", isCorrect: false },
        { id: "opt_1", text: "Instituto de Assistência e Proteção Social", isCorrect: true },
        { id: "opt_2", text: "Instituto de Ação e Promoção Social", isCorrect: false },
        { id: "opt_3", text: "Instituto de Apoio e Proteção à Saúde", isCorrect: false }
      ] },
    { question: "Qual o significado da sigla IBAV?", 
      options: [
        { id: "opt_0", text: "Instituto Brasileiro de Apoio à Vida", isCorrect: false },
        { id: "opt_1", text: "Instituto Brasileiro Amigos da Vida", isCorrect: true },
        { id: "opt_2", text: "Instituto Beneficente de Amparo à Vida", isCorrect: false },
        { id: "opt_3", text: "Instituto Brasileiro de Ação Voluntária", isCorrect: false }
      ] },
    { question: "Qual o significado da sigla IEC?", 
      options: [
        { id: "opt_0", text: "Instituto de Educação e Cultura", isCorrect: false },
        { id: "opt_1", text: "Instituto de Inovação e Economia Circular", isCorrect: true },
        { id: "opt_2", text: "Instituto de Economia Criativa", isCorrect: false },
        { id: "opt_3", text: "Instituto de Ecologia e Ciência", isCorrect: false }
      ] },
    { question: "Qual o significado da sigla IDC?", 
      options: [
        { id: "opt_0", text: "Instituto de Direito do Consumidor", isCorrect: false },
        { id: "opt_1", text: "Instituto Descarte Correto", isCorrect: true },
        { id: "opt_2", text: "Instituto de Desenvolvimento Comunitário", isCorrect: false },
        { id: "opt_3", text: "Instituto Digital de Comunicação", isCorrect: false }
      ] },
    { question: "O CRC IAPS está em quais estados?", 
      options: [
        { id: "opt_0", text: "Apenas CE", isCorrect: false },
        { id: "opt_1", text: "CE e RN", isCorrect: true },
        { id: "opt_2", text: "CE, PE e BA", isCorrect: false },
        { id: "opt_3", text: "Apenas RN", isCorrect: false }
      ] },
    { question: "O CRC IBAV está em quais estados?", 
      options: [
        { id: "opt_0", text: "Apenas GO", isCorrect: false },
        { id: "opt_1", text: "GO, MG e DF", isCorrect: true },
        { id: "opt_2", text: "GO e SP", isCorrect: false },
        { id: "opt_3", text: "Apenas DF", isCorrect: false }
      ] },
    { question: "O CRC IEC está em quais estados?", 
      options: [
        { id: "opt_0", text: "Apenas PE", isCorrect: false },
        { id: "opt_1", text: "PE, BA, PB e AL", isCorrect: true },
        { id: "opt_2", text: "PE e BA", isCorrect: false },
        { id: "opt_3", text: "Todos do Nordeste", isCorrect: false }
      ] },
    { question: "O CRC INAC está em quais estados?", 
      options: [
        { id: "opt_0", text: "Apenas RJ", isCorrect: false },
        { id: "opt_1", text: "RJ, ES e SP", isCorrect: false },
        { id: "opt_2", text: "RJ e SP", isCorrect: true },
        { id: "opt_3", text: "Todos do Sudeste", isCorrect: false }
      ] },
    { question: "O CRC IGH está em quais estados?", 
      options: [
        { id: "opt_0", text: "Apenas MA", isCorrect: false },
        { id: "opt_1", text: "MA, PA, AP e SP", isCorrect: true },
        { id: "opt_2", text: "MA e PI", isCorrect: false },
        { id: "opt_3", text: "Todos do Norte", isCorrect: false }
      ] },
    { question: "O CRC E-LETRO está em quais estados?", 
      options: [
        { id: "opt_0", text: "Apenas PR", isCorrect: false },
        { id: "opt_1", text: "PR e SC", isCorrect: true },
        { id: "opt_2", text: "PR, SC e RS", isCorrect: false },
        { id: "opt_3", text: "Todos do Sul", isCorrect: false }
      ] },
    { question: "O CRC PROGRAMANDO está em quais estados?", 
      options: [
        { id: "opt_0", text: "Apenas DF", isCorrect: false },
        { id: "opt_1", text: "MT, DF, TO e GO", isCorrect: true },
        { id: "opt_2", text: "DF e GO", isCorrect: false },
        { id: "opt_3", text: "Todos do Centro-Oeste", isCorrect: false }
      ] },
    { question: "Onde fica o CRC UNIVASF?", 
      options: [
        { id: "opt_0", text: "Bahia", isCorrect: false },
        { id: "opt_1", text: "Pernambuco", isCorrect: true },
        { id: "opt_2", text: "Sergipe", isCorrect: false },
        { id: "opt_3", text: "Alagoas", isCorrect: false }
      ] },
    { question: "Onde fica o CRC IFMS?", 
      options: [
        { id: "opt_0", text: "Mato Grosso", isCorrect: false },
        { id: "opt_1", text: "Mato Grosso do Sul", isCorrect: true },
        { id: "opt_2", text: "Minas Gerais", isCorrect: false },
        { id: "opt_3", text: "Maranhão", isCorrect: false }
      ] },
    { question: "Quantos CRCs existem atualmente?", 
      options: [
        { id: "opt_0", text: "10", isCorrect: false },
        { id: "opt_1", text: "17", isCorrect: true },
        { id: "opt_2", text: "20", isCorrect: false },
        { id: "opt_3", text: "15", isCorrect: false }
      ] }
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
    { question: "Qual o fluxo completo do programa?", 
      options: [
        { id: "opt_0", text: "Governo compra → distribui", isCorrect: false },
        { id: "opt_1", text: "Doador → CRC → PID → comunidade", isCorrect: true },
        { id: "opt_2", text: "CRC compra → doa", isCorrect: false },
        { id: "opt_3", text: "MCom importa → vende", isCorrect: false }
      ] },
    { question: "Quais os três impactos principais?", 
      options: [
        { id: "opt_0", text: "Econômico, militar, diplomático", isCorrect: false },
        { id: "opt_1", text: "Ambiental, social e digital", isCorrect: true },
        { id: "opt_2", text: "Tecnológico, comercial, esportivo", isCorrect: false },
        { id: "opt_3", text: "Só educacional", isCorrect: false }
      ] },
    { question: "O que diferencia a CGID?", 
      options: [
        { id: "opt_0", text: "Maior orçamento", isCorrect: false },
        { id: "opt_1", text: "Unir sustentabilidade, inclusão digital e capacitação", isCorrect: true },
        { id: "opt_2", text: "Só comunicação", isCorrect: false },
        { id: "opt_3", text: "Única com concursados", isCorrect: false }
      ] },
    { question: "Quantos CRCs existem atualmente?", 
      options: [
        { id: "opt_0", text: "5", isCorrect: false },
        { id: "opt_1", text: "17", isCorrect: true },
        { id: "opt_2", text: "10", isCorrect: false },
        { id: "opt_3", text: "3", isCorrect: false }
      ] },
    { question: "Qual região tem mais CRCs?", 
      options: [
        { id: "opt_0", text: "Sul", isCorrect: false },
        { id: "opt_1", text: "Nordeste", isCorrect: true },
        { id: "opt_2", text: "Norte", isCorrect: false },
        { id: "opt_3", text: "Centro-Oeste", isCorrect: false }
      ] }
  ]
},
{
  id: 31, worldId: 3, name: "Bônus: Adivinhe a Mesa", icon: "🕵️", difficulty: "hard",
  intro: { character: "JonJon", lines: [
    "Pra encerrar, temos um desafio especial: Adivinhe a Mesa!",
    "Você vai ver a foto da MESA de alguns membros da nossa coordenação.",
    "Sua missão: adivinhar DE QUEM é a mesa!",
    "Cada mesa tem características únicas.",
    "Preste atenção nos detalhes!",
    "Boa sorte, detetives! 🕵️‍♂️"  
  ]},
  quiz: [
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Karol", isCorrect: false },
        { id: "opt_1", text: "Thiago", isCorrect: false },
        { id: "opt_2", text: "Henrique", isCorrect: true },
        { id: "opt_3", text: "Victoria", isCorrect: false },
        { id: "opt_4", text: "Viana", isCorrect: false }
      ], imagem: "img2/mesas/henrique.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Gustavo", isCorrect: false },
        { id: "opt_1", text: "Yara", isCorrect: false },
        { id: "opt_2", text: "Viana", isCorrect: false },
        { id: "opt_3", text: "Karol", isCorrect: true },
        { id: "opt_4", text: "Victoria", isCorrect: false }
      ], imagem: "img2/mesas/karol.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Daliane", isCorrect: false },
        { id: "opt_1", text: "Karol", isCorrect: false },
        { id: "opt_2", text: "Victoria", isCorrect: false },
        { id: "opt_3", text: "Viana", isCorrect: true },
        { id: "opt_4", text: "Yara", isCorrect: false }
      ], imagem: "img2/mesas/viana.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Karine", isCorrect: false },
        { id: "opt_1", text: "Victoria", isCorrect: true },
        { id: "opt_2", text: "Henrique", isCorrect: false },
        { id: "opt_3", text: "Viana", isCorrect: false },
        { id: "opt_4", text: "Karol", isCorrect: false }
      ], imagem: "img2/mesas/victoria.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Gustavo", isCorrect: false },
        { id: "opt_1", text: "Yara", isCorrect: true },
        { id: "opt_2", text: "Thiago", isCorrect: false },
        { id: "opt_3", text: "Jon", isCorrect: false },
        { id: "opt_4", text: "Leticia", isCorrect: false }
      ], imagem: "img2/mesas/yara.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Jon", isCorrect: false },
        { id: "opt_1", text: "Thiago", isCorrect: false },
        { id: "opt_2", text: "Karine", isCorrect: false },
        { id: "opt_3", text: "Daliane", isCorrect: false },
        { id: "opt_4", text: "Gustavo", isCorrect: true }
      ], imagem: "img2/mesas/gustavo.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Karol", isCorrect: false },
        { id: "opt_1", text: "Leticia", isCorrect: false },
        { id: "opt_2", text: "Henrique", isCorrect: false },
        { id: "opt_3", text: "Daliane", isCorrect: true },
        { id: "opt_4", text: "Victoria", isCorrect: false }
      ], imagem: "img2/mesas/daliane.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Thiago", isCorrect: false },
        { id: "opt_1", text: "Karine", isCorrect: true },
        { id: "opt_2", text: "Jon", isCorrect: false },
        { id: "opt_3", text: "Viana", isCorrect: false },
        { id: "opt_4", text: "Karol", isCorrect: false }
      ], imagem: "img2/mesas/karine.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Viana", isCorrect: false },
        { id: "opt_1", text: "Daliane", isCorrect: false },
        { id: "opt_2", text: "Leticia", isCorrect: true },
        { id: "opt_3", text: "Karine", isCorrect: false },
        { id: "opt_4", text: "Henrique", isCorrect: false }
      ], imagem: "img2/mesas/leticia.jpeg" },
    { question: "🔍 De quem é esta mesa?", 
      options: [
        { id: "opt_0", text: "Jon", isCorrect: true },
        { id: "opt_1", text: "Victoria", isCorrect: false },
        { id: "opt_2", text: "Thiago", isCorrect: false },
        { id: "opt_3", text: "Leticia", isCorrect: false },
        { id: "opt_4", text: "Gustavo", isCorrect: false }
      ], imagem: "img2/mesas/jon.jpeg" }
  ]
}
];

// ═══════════════════════════════════════════════════════════
// FUNÇÕES GLOBAIS
// ═══════════════════════════════════════════════════════════

const ALL_STAGES = [...WORLD1_STAGES, ...WORLD2_STAGES, ...WORLD3_STAGES];

function getStageById(id) { return ALL_STAGES.find(s => s.id === id) || null; }
function getWorldById(id) { return WORLDS.find(w => w.id === id) || null; }
function getStagesByWorld(worldId) { return ALL_STAGES.filter(s => s.worldId === worldId); }
