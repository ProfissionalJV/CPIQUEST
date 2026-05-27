// ═══════════════════════════════════════════════════════════
// InfoQuest — Lógica principal do jogo (VERSÃO CORRIGIDA)
// ═══════════════════════════════════════════════════════════

const API = 'https://cpiquest.onrender.com/api';

let currentUser = null;
let currentProfile = null;
let currentWorld = null;
let currentStage = null;
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let dialogLines = [];
let dialogIndex = 0;
let dialogTyping = false;
let dialogTimer = null;
let timerInterval = null;
let timeLeft = 0;
let vidas = 3;
let timerActive = false;
let avatarConfig = { ...DEFAULT_AVATAR };
let avatarTab = 'gender';
let comboAtual = 0;
let maiorCombo = 0;
let tempoRespostaInicio = 0;
let distratorInterval = null;
let distratorElement = null;
let aleatorioTimeout = null;
let shuffleCount = 0;
let maxShuffle = 0;
let opcoesCorretasOriginal = null;
let indiceCorretoDinamico = null;
let falsoFinalAtivo = false; 

// ═══════════════════════════════════════════════════════════
// CONTROLE DE SOM (MUTE)
// ═══════════════════════════════════════════════════════════

let somAtivo = true;

function tocarSom(tipo) {
    console.log(`🔊 Tentando tocar som: ${tipo}, somAtivo = ${somAtivo}`);
    if (!somAtivo) {
        console.log('🔇 Som desativado, não vai tocar');
        return;
    }
    let mundoId = currentWorld?.id || 1;
    let audioId = '';
    switch (tipo) {
        case 'acerto': audioId = 'som-acerto-m' + mundoId; break;
        case 'erro': audioId = 'som-erro-m' + mundoId; break;
        case 'gameover': audioId = 'som-gameover-m' + mundoId; break;
        case 'vitoria': audioId = 'som-vitoria-m' + mundoId; break;
        default: return;
    }
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(function (e) { console.log('Erro ao tocar som:', e); });
    }
}

function setupSoundButton() {
    const soundBtn = document.getElementById('sound-toggle');
    if (!soundBtn) return;
    soundBtn.addEventListener('click', function () {
        somAtivo = !somAtivo;
        if (somAtivo) {
            this.innerHTML = '🔊';
            this.classList.remove('muted');
            tocarSom('acerto');
        } else {
            this.innerHTML = '🔇';
            this.classList.add('muted');
        }
        localStorage.setItem('somAtivo', somAtivo);
    });
}

// ═══════════════════════════════════════════════════════════
// MENSAGENS
// ═══════════════════════════════════════════════════════════

const MENSAGENS_ERRO = [
    "ERROUUUU! CAIU NA PEGADINHA!",
    "KKKKKK TROUXA! ERA PEGADINHA!",
    "A VERDE ERA ARMADILHA! CAIU IGUAL PATO",
    "AINDA BEM QUE NAO APOSTOU DINHEIRO",
    "SE FOSSE NO SHOW DO MILHAO, IA CHORAR",
    "PARABENS! TIME TROUXA GANHOU MAIS UM"
];

const MENSAGENS_ACERTO = [
    "OLOCO, CE E O BICHAO MESMO",
    "DESVIOU DA PEGADINHA! REFLEXO DE VIDEOGAME",
    "NEM O PISCAR VERDE TE ENGANOU",
    "ISSO AI! TEM FUTURO NESSE JOGO",
    "CABULOSO! RESPOSTA CERTA NO PELO",
    "TU E O CARA! NINGUEM TE ENGANA"
];

const MENSAGENS_VITORIA = [
    "TU E FERA DEMAIS! QUER TRABALHAR NA CGID?",
    "OLHA O MONSTRO! DEPOIS DESSE JOGO VAI PRA NASA",
    "SEU QI E MAIOR QUE A CIDADE DE PATOS/PB",
    "PARABENS! VOCE E O NOVO MINISTRO DAS COMUNICACOES"
];

const MENSAGENS_GAMEOVER = [
    "GAME OVER! PERDEU TODAS AS VIDAS",
    "VOLTA PRA ESCOLA, AMIGAO! ZERO CONHECIMENTO",
    "SEU PAI TA TRISTE COM VOCE HOJE",
    "TENTA DE NOVO... SE VOCE FOR CAPAZ",
    "MORREU! E O PIOR: NEM DOCINHO GANHOU"
];

// ═══════════════════════════════════════════════════════════
// DIFICULDADE
// ═══════════════════════════════════════════════════════════

const PEGADINHA_NIVEIS = {
    facil: { chance: 0.30, penalidadeTempo: 5, penalidadeVidas: 0, icone: '😅', tipos: ['INVERSAO', 'CONTEXTO'] },
    medio: { chance: 0.65, penalidadeTempo: 10, penalidadeVidas: 0, icone: '😤', tipos: ['INVERSAO', 'SINTAXE', 'CONTEXTO', 'DUPLA_NEGACAO'] },
    dificil: { chance: 0.80, penalidadeTempo: 12, penalidadeVidas: 1, icone: '💀', tipos: ['INVERSAO', 'SINTAXE', 'CONTEXTO', 'ARMADILHA_LOGICA'] },
    muitoDificil: { chance: 0.90, penalidadeTempo: 15, penalidadeVidas: 2, icone: '☠️', tipos: ['ARMADILHA_LOGICA', 'INFORMACAO_FALSA', 'DUPLA_VERDADE', 'CONFUSAO_PROFISSIONAL'] }
};

function getNivelPegadinha() {
    const stageId = currentStage?.id || 1;
    if (stageId >= 21) return PEGADINHA_NIVEIS.muitoDificil;
    if (stageId >= 11) return PEGADINHA_NIVEIS.dificil;
    if (stageId >= 8) return PEGADINHA_NIVEIS.medio;
    if (stageId >= 4) return PEGADINHA_NIVEIS.medio;
    return PEGADINHA_NIVEIS.facil;
}

// ═══════════════════════════════════════════════════════════
// TIPOS DE PEGADINHAS (SUTIS)
// ═══════════════════════════════════════════════════════════

const TIPOS_PEGADINHA = {
    INVERSAO: {
        nome: 'INVERSÃO', icone: '🔄',
        gerar: (opts, correctIdx) => {
            if (opts.length >= 2) {
                const trocarCom = (correctIdx + 1) % opts.length;
                if (trocarCom !== correctIdx) {
                    const novoOpts = [...opts];
                    [novoOpts[correctIdx], novoOpts[trocarCom]] = [novoOpts[trocarCom], novoOpts[correctIdx]];
                    return { novoCorrect: trocarCom, novoOpts, explicacao: `Confundiu "${opts[correctIdx]}" com "${opts[trocarCom]}"` };
                }
            }
            return null;
        }
    },
    SINTAXE: {
        nome: 'SINTAXE', icone: '⌨️',
        gerar: (opts, correctIdx) => {
            const correta = opts[correctIdx];
            if (correta && (correta.includes('Ctrl+') || correta.includes('Alt+'))) {
                const nova = correta.includes('Ctrl+') ? correta.replace('Ctrl+', 'Alt+') : correta.replace('Alt+', 'Ctrl+');
                const novoOpts = [...opts, nova];
                return { novoCorrect: correctIdx, novoOpts, explicacao: `"${nova}" não é o mesmo que "${correta}"` };
            }
            return null;
        }
    },
    ARMADILHA_LOGICA: {
        nome: 'ARMADILHA LÓGICA', icone: '🧠',
        gerar: (opts, correctIdx) => {
            const correta = opts[correctIdx];
            const palavras = correta.split(' ');
            let quaseCorreta = '';
            if (palavras.length > 2) {
                quaseCorreta = `${palavras[0]} ${palavras[1]}...`;
            } else {
                quaseCorreta = `${correta}...`;
            }
            const novoOpts = [...opts, quaseCorreta];
            return { novoCorrect: correctIdx, novoOpts, explicacao: `"${quaseCorreta}" está incompleta. Resposta certa: "${correta}"` };
        }
    },
    DUPLA_VERDADE: {
        nome: 'DUPLA VERDADE', icone: '⚖️',
        gerar: (opts, correctIdx) => {
            const correta = opts[correctIdx];
            const palavras = correta.split(' ');
            let segundaVerdade = '';
            if (palavras.length > 2) {
                segundaVerdade = `${palavras[0]} ${palavras[1]} (depende do caso)`;
            } else {
                segundaVerdade = `${correta} (depende)`;
            }
            const novoOpts = [...opts, segundaVerdade];
            return { novoCorrect: correctIdx, novoOpts, explicacao: `Ambas podem estar certas, mas "${correta}" é a mais completa.` };
        }
    },
    CONFUSAO_PROFISSIONAL: {
        nome: 'CONFUSÃO TÉCNICA', icone: '👔',
        gerar: (opts, correctIdx, pergunta) => {
            const termosTecnicos = {
                'CGID': 'CGD', 'CRC': 'CR', 'PID': 'PDI', 'MCom': 'MEC', 'desfazimento': 'descaracterização'
            };
            for (let [termo, confusao] of Object.entries(termosTecnicos)) {
                if (pergunta.includes(termo)) {
                    const novoOpts = [...opts, confusao];
                    return { novoCorrect: correctIdx, novoOpts, explicacao: `${termo} é diferente de ${confusao}` };
                }
            }
            return null;
        }
    }
};

// ═══════════════════════════════════════════════════════════
// PEGADINHAS ESPECÍFICAS MUNDO 1
// ═══════════════════════════════════════════════════════════

const PEGADINHAS_MUNDO1 = {
    4: {
        0: { ativa: true, respostaCorreta: "Ctrl+Z", variacoes: ["CRTL+Z", "Ctrl + Z", "CTRL+Z", "Ctrl-Z"], explicacao: "⚠️ 'CRTL+Z' é diferente de 'Ctrl+Z'!" },
        1: { ativa: true, respostaCorreta: "Ctrl+J", variacoes: ["CRTL+J", "Ctrl + J", "CTRL+J", "Ctr1+J"], explicacao: "⚠️ 'CRTL+J' vs 'Ctrl+J'!" },
        2: { ativa: true, respostaCorreta: "Ctrl+A", variacoes: ["CRTL+A", "Ctrl + A", "CTRL+A", "Ctrl-A"], explicacao: "⚠️ 'CRTL+A' tem as letras R e T trocadas!" },
        3: { ativa: true, respostaCorreta: "Ctrl+Shift+T", variacoes: ["CRTL+SHIFT+T", "Ctrl + Shift + T", "CTRL+SHIFT+T"], explicacao: "⚠️ A grafia exata é 'Ctrl+Shift+T'!" },
        4: { ativa: true, respostaCorreta: "Ctrl+S", variacoes: ["CRTL+S", "Ctrl + S", "CTRL+S", "Ctrl-S"], explicacao: "⚠️ 'CRTL+S' é a pegadinha clássica!" }
    },
    5: {
        0: { ativa: true, respostaCorreta: "Alt+Tab", variacoes: ["ALT+TAB", "Alt + Tab", "Alt-Tab"], explicacao: "⚠️ 'ALT+TAB' maiúsculo vs 'Alt+Tab'!" },
        1: { ativa: true, respostaCorreta: "F2", variacoes: ["F2 ", "F 2", "f2", "F02"], explicacao: "⚠️ 'F 2' com espaço não é o mesmo que 'F2'!" },
        2: { ativa: true, respostaCorreta: "Alt+PrtScn", variacoes: ["ALT+PRTSCN", "Alt + PrtScn", "Alt-PrtScn"], explicacao: "⚠️ Grafia correta é 'Alt+PrtScn'!" },
        3: { ativa: true, respostaCorreta: "Ctrl+B", variacoes: ["CRTL+B", "Ctrl + B", "CTRL+B", "Ctrl-B"], explicacao: "⚠️ 'CRTL+B' vs 'Ctrl+B'!" },
        4: { ativa: false, variacoes: [] }
    },
    6: {
        0: { ativa: true, respostaCorreta: "Pincel de Formatação", variacoes: ["Pincel de formatação", "Pincel da Formatação", "Pincel Formatação"], explicacao: "⚠️ Grafia correta é 'Pincel de Formatação'!" },
        1: { ativa: true, respostaCorreta: "Régua", variacoes: ["Regua", "Régua ", "Régua.", "A Régua"], explicacao: "⚠️ 'Regua' sem acento não é o mesmo!" },
        2: { ativa: true, respostaCorreta: "Marcadores", variacoes: ["marcadores", "Marcadores ", "Marcadores.", "Os Marcadores"], explicacao: "⚠️ Grafia correta é 'Marcadores' com M maiúsculo!" },
        3: { ativa: true, respostaCorreta: "Ctrl+J", variacoes: ["CRTL+J", "Ctrl + J", "CTRL+J", "Ctrl-J"], explicacao: "⚠️ 'CRTL+J' vs 'Ctrl+J'!" },
        4: { ativa: false, variacoes: [] }
    },
    8: {
        0: { ativa: true, respostaCorreta: "Célula", variacoes: ["Celula", "Célula ", "Célula.", "A Célula", "Célulla"], explicacao: "⚠️ 'Celula' sem acento não é o termo técnico!" },
        1: { ativa: true, respostaCorreta: "Sinal de igual (=)", variacoes: ["Sinal de igual", "Sinal de igual =", "sinal de igual (=)"], explicacao: "⚠️ Grafia EXATA é 'Sinal de igual (=)'!" },
        2: { ativa: true, respostaCorreta: "Página Inicial → Formatar como Tabela", variacoes: ["Pagina Inicial → Formatar como Tabela", "Página inicial → formatar como tabela"], explicacao: "⚠️ Atenção aos acentos!" },
        3: { ativa: false, variacoes: [] },
        4: { ativa: false, variacoes: [] }
    },
    9: {
        0: { ativa: true, respostaCorreta: "Página Inicial → Formatar como Tabela", variacoes: ["Pagina Inicial → Formatar como Tabela", "Página inicial → formatar como tabela"], explicacao: "⚠️ Atenção aos acentos!" },
        1: { ativa: true, respostaCorreta: "Ctrl+N", variacoes: ["CRTL+N", "Ctrl + N", "CTRL+N", "Ctrl-N"], explicacao: "⚠️ 'Ctrl+N' vs 'CRTL+N'!" },
        2: { ativa: false, variacoes: [] },
        3: { ativa: true, respostaCorreta: "Salvar o arquivo", variacoes: ["salvar o arquivo", "Salvar o Arquivo", "Salvar arquivo"], explicacao: "⚠️ Grafia exata é 'Salvar o arquivo'!" },
        4: { ativa: false, variacoes: [] }
    }
};

// ═══════════════════════════════════════════════════════════
// PEGADINHAS ESPECÍFICAS MUNDO 2
// ═══════════════════════════════════════════════════════════

const PEGADINHAS_MUNDO2 = {
    11: {
        0: { ativa: true, respostaCorreta: "Políticas de telecomunicações e inclusão digital", variacoes: ["Políticas de educação e cultura", "Políticas de comunicação social e radiodifusão", "Regulação de serviços postais e telecomunicações"], explicacao: "⚠️ PEGADINHA! O MCom cuida de TELECOMUNICAÇÕES e INCLUSÃO DIGITAL, não de educação ou radiodifusão." },
        1: { ativa: true, respostaCorreta: "Ministério das Comunicações", variacoes: ["Ministério da Educação", "Ministério da Ciência e Tecnologia", "Ministério da Cultura"], explicacao: "⚠️ PEGADINHA! A sigla MCom é do MINISTÉRIO DAS COMUNICAÇÕES." },
        2: { ativa: true, respostaCorreta: "Garantir acesso às tecnologias para todos", variacoes: ["Garantir acesso à internet para todos", "Digitalizar serviços públicos", "Distribuir computadores para escolas"], explicacao: "⚠️ PEGADINHA! Inclusão Digital é MAIS que internet grátis - é garantir ACESSO ÀS TECNOLOGIAS PARA TODOS." }
    },
    12: {
        0: { ativa: true, respostaCorreta: "Cabos subfluviais nos rios", variacoes: ["Satélites de baixa órbita", "Torres de rádio na floresta", "Fibra óptica aérea"], explicacao: "⚠️ PEGADINHA! Norte Conectado usa CABOS SUBFLUVIAIS (no fundo dos rios), não satélites ou torres." },
        1: { ativa: true, respostaCorreta: "Amazônia Legal", variacoes: ["Região Norte", "Floresta Amazônica", "Norte do Brasil"], explicacao: "⚠️ PEGADINHA! O programa atende a AMAZÔNIA LEGAL (9 estados)." },
        2: { ativa: true, respostaCorreta: "Rios são vias de acesso na Amazônia", variacoes: ["É mais barato que satélite", "Evita desmatamento", "A água conduz melhor o sinal"], explicacao: "⚠️ PEGADINHA! O motivo principal: os RIOS são as ESTRADAS da Amazônia, principal via de acesso." }
    },
    13: {
        0: { ativa: true, respostaCorreta: "Tecnologia de comunicação móvel", variacoes: ["Internet de alta velocidade", "Telefonia celular", "Redes sociais"], explicacao: "⚠️ PEGADINHA! 5G é uma TECNOLOGIA DE COMUNICAÇÃO MÓVEL, não é apenas internet." },
        1: { ativa: true, respostaCorreta: "5ª geração de redes móveis", variacoes: ["5ª geração de telecomunicações", "500 Mbps de velocidade", "5º plano de conectividade"], explicacao: "⚠️ PEGADINHA! 5G é a QUINTA GERAÇÃO de REDES MÓVEIS, não confunda com velocidade específica." },
        2: { ativa: true, respostaCorreta: "Menor latência e mais dispositivos conectados", variacoes: ["Maior velocidade apenas", "Mais caro", "Só funciona em cidade grande"], explicacao: "⚠️ PEGADINHA! A principal vantagem do 5G é MENOR LATÊNCIA e MAIS DISPOSITIVOS conectados." },
        3: { ativa: true, respostaCorreta: "4G", variacoes: ["3G", "5G", "Wi-Fi"], explicacao: "⚠️ PEGADINHA! Quem popularizou o STREAMING foi o 4G, não o 5G." }
    },
    14: {
        0: { ativa: true, respostaCorreta: "Centro de Recondicionamento de Computadores", variacoes: ["Centro de Reciclagem de Computadores", "Comitê de Recondicionamento", "Central de Reaproveitamento"], explicacao: "⚠️ PEGADINHA! CRC = Centro de RECONDICIONAMENTO, não de reciclagem." },
        1: { ativa: true, respostaCorreta: "Desfazimento de órgãos públicos e Acordos de Cooperação", variacoes: ["Troca com cidadãos", "Compra internacional", "Apreensões da PF"], explicacao: "⚠️ PEGADINHA! Os equipamentos vêm do DESFAZIMENTO de órgãos públicos e ACORDOS DE COOPERAÇÃO, não de troca com cidadãos." },
        2: { ativa: true, respostaCorreta: "Ponto de Inclusão Digital", variacoes: ["Programa de Inclusão Digital", "Plano de Inclusão Digital", "Posto de Inclusão Digital"], explicacao: "⚠️ PEGADINHA! PID = PONTO de Inclusão Digital." },
        3: { ativa: true, respostaCorreta: "Resíduos de Equipamentos Eletroeletrônicos", variacoes: ["Lixo eletrônico", "Material reciclável", "Sucata digital"], explicacao: "⚠️ PEGADINHA! REEE = Resíduos de Equipamentos ELETROELETRÔNICOS (lixo eletrônico)." }
    },
    15: {
        0: { ativa: true, respostaCorreta: "Software que pode ser usado, copiado e modificado livremente", variacoes: ["Software grátis", "Software sem vírus", "Software do governo"], explicacao: "⚠️ PEGADINHA! Software Livre permite USAR, COPIAR e MODIFICAR, não é só grátis." },
        1: { ativa: true, respostaCorreta: "Eliminar custos de licenças", variacoes: ["É mais seguro", "É mais fácil de usar", "É obrigatório por lei"], explicacao: "⚠️ PEGADINHA! A principal vantagem financeira é ELIMINAR CUSTOS DE LICENÇAS." },
        2: { ativa: true, respostaCorreta: "Cursos técnicos de TI para toda a população", variacoes: ["Alfabetização digital básica", "Manutenção de computadores", "Formação de professores"], explicacao: "⚠️ PEGADINHA! O pilar educacional dos CRCs são CURSOS TÉCNICOS DE TI para formação profissional." },
        3: { ativa: true, respostaCorreta: "Doação de computadores recondicionados", variacoes: ["Venda de computadores", "Aluguel de equipamentos", "Descarte de lixo"], explicacao: "⚠️ PEGADINHA! O programa faz DOAÇÃO de computadores RECONDICIONADOS." }
    },
    16: {
        0: { ativa: true, respostaCorreta: "Reduzindo lixo eletrônico e descarte correto", variacoes: ["Plantando árvores", "Reciclando papel", "Economizando energia"], explicacao: "⚠️ PEGADINHA! O programa reduz LIXO ELETRÔNICO e promove descarte correto." },
        1: { ativa: true, respostaCorreta: "Inclusão digital e social", variacoes: ["Geração de emprego", "Economia de energia", "Preservação ambiental"], explicacao: "⚠️ PEGADINHA! O impacto social é INCLUSÃO DIGITAL E SOCIAL." },
        2: { ativa: true, respostaCorreta: "Parceria com CRCs e PIDs", variacoes: ["Compra de equipamentos novos", "Importação de tecnologia", "Fabricação nacional"], explicacao: "⚠️ PEGADINHA! O modelo funciona com PARCERIA entre CRCs e PIDs." },
        3: { ativa: true, respostaCorreta: "12.305/2010", variacoes: ["13.709/2018 (LGPD)", "9.605/1998 (Lei de Crimes Ambientais)", "12.305/2010"], explicacao: "⚠️ PEGADINHA! A lei do lixo eletrônico é a 12.305/2010 (Política Nacional de Resíduos Sólidos)." }
    },
    17: {
        0: { ativa: true, respostaCorreta: "Entidades sem fins lucrativos e órgãos públicos", variacoes: ["Pessoas físicas", "Empresas de tecnologia", "Organizações religiosas"], explicacao: "⚠️ PEGADINHA! Podem receber: ENTIDADES SEM FINS LUCRATIVOS e ÓRGÃOS PÚBLICOS." },
        1: { ativa: true, respostaCorreta: "Pessoas físicas", variacoes: ["Entidades Públicas", "Empresas privadas", "Partidos políticos"], explicacao: "⚠️ PEGADINHA! PESSOAS FÍSICAS NÃO podem receber equipamentos, a resposta é justamente essa!" },
        2: { ativa: true, respostaCorreta: "Recondicionamento e capacitação", variacoes: ["Venda e lucro", "Estoque e descarte", "Importação e exportação"], explicacao: "⚠️ PEGADINHA! O CRC faz RECONDICIONAMENTO dos equipamentos e CAPACITAÇÃO da comunidade." },
        3: { ativa: true, respostaCorreta: "Bens de informática inservíveis", variacoes: ["Computadores novos", "Celulares usados", "Impressoras velhas"], explicacao: "⚠️ PEGADINHA! O programa trabalha com BENS DE INFORMÁTICA INSERVÍVEIS (que não servem mais)." }
    },
    18: {
        0: { ativa: true, respostaCorreta: "Telecentro", variacoes: ["Lan house", "Cyber café", "Biblioteca digital"], explicacao: "⚠️ PEGADINHA! Telecentro é um ESPAÇO PÚBLICO com computadores para a comunidade." },
        1: { ativa: true, respostaCorreta: "Inclusão produtiva e geração de renda", variacoes: ["Lazer e entretenimento", "Redes sociais", "Jogos online"], explicacao: "⚠️ PEGADINHA! O objetivo é INCLUSÃO PRODUTIVA e GERAÇÃO DE RENDA, não só lazer." },
        2: { ativa: true, respostaCorreta: "Gabinete Digital", variacoes: ["Computador popular", "Notebook social", "Tablet comunitário"], explicacao: "⚠️ PEGADINHA! É o GABINETE DIGITAL (espaço com computadores para atendimento ao público)." },
        3: { ativa: true, respostaCorreta: "Espaços públicos com atendimento assistido", variacoes: ["Locais com Wi-Fi grátis", "Praças digitais", "Pontos de ônibus digitais"], explicacao: "⚠️ PEGADINHA! Gabinete Digital = ESPAÇOS PÚBLICOS com ATENDIMENTO ASSISTIDO por monitores." }
    },
    19: {
        0: { ativa: true, respostaCorreta: "Espaços públicos com internet gratuita", variacoes: ["Laboratórios de informática", "Lan houses gratuitas", "Pontos de inclusão digital (PIDs)"], explicacao: "⚠️ PEGADINHA! Telecentro = ESPAÇO PÚBLICO com internet GRATUITA para a comunidade." },
        1: { ativa: true, respostaCorreta: "Inclusão digital e cidadania", variacoes: ["Entretenimento", "Comércio eletrônico", "Redes sociais"], explicacao: "⚠️ PEGADINHA! O objetivo é INCLUSÃO DIGITAL e CIDADANIA, não só lazer." },
        2: { ativa: true, respostaCorreta: "Kit Telecentro", variacoes: ["Computadores novos", "Tablets", "Notebooks"], explicacao: "⚠️ PEGADINHA! É o KIT TELECENTRO (equipamentos e mobiliário padronizado)." },
        3: { ativa: true, respostaCorreta: "Projeto de capacitação itinerante", variacoes: ["Fibra óptica móvel", "Ônibus com computadores", "Laboratório móvel"], explicacao: "⚠️ PEGADINHA! Carreta Digital é um PROJETO DE CAPACITAÇÃO ITINERANTE que leva cursos para áreas remotas." }
    },
    20: {
        0: { ativa: true, respostaCorreta: "Mais de 4.000", variacoes: ["Cerca de 1.000", "Mais de 10.000", "Exatamente 4.253"], explicacao: "⚠️ PEGADINHA! O portal Gov.br tem MAIS DE 4.000 serviços (não é um número exato)." },
        1: { ativa: true, respostaCorreta: "Governo Digital", variacoes: ["Governo Eletrônico", "Governo Online", "Governo 4.0"], explicacao: "⚠️ PEGADINHA! Gov.br é a plataforma de GOVERNO DIGITAL (digitalização de serviços públicos)." },
        2: { ativa: true, respostaCorreta: "Estar entre os 10 mais digitais do mundo", variacoes: ["Ser o país mais digital do mundo", "Digitalizar 100% dos serviços", "Ter internet em todas as escolas"], explicacao: "⚠️ PEGADINHA! A meta do Brasil é estar entre os 10 MAIS DIGITAIS do mundo." },
        3: { ativa: true, respostaCorreta: "Simplificação e desburocratização", variacoes: ["Economia de dinheiro", "Mais servidores", "Privatização"], explicacao: "⚠️ PEGADINHA! O objetivo do Governo Digital é SIMPLIFICAÇÃO e DESBUROCRATIZAÇÃO dos serviços." }
    }
};

// ═══════════════════════════════════════════════════════════
// NAVEGAÇÃO
// ═══════════════════════════════════════════════════════════

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');
    if (screenId === 'menu-screen') loadMenu();
    if (screenId === 'ranking-screen') loadRanking();
    if (screenId === 'settings-screen') loadSettings();
    if (screenId === 'avatar-screen') initAvatar();
}

// ═══════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('login-name').value.trim();
    const email = document.getElementById('login-email').value.trim();
    const errorDiv = document.getElementById('login-error');
    if (!name || !email) {
        errorDiv.textContent = 'Preencha todos os campos!';
        errorDiv.classList.remove('hidden');
        return;
    }
    const btn = e.target.querySelector('button');
    btn.textContent = 'Entrando...';
    btn.disabled = true;
    try {
        const res = await fetch(`${API}/players/search?email=${encodeURIComponent(email)}`);
        let player = await res.json();
        if (!player) {
            const createRes = await fetch(`${API}/players`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_email: email,
                    display_name: name,
                    total_score: 0,
                    current_stage: 1,
                    completed_stages: [],
                    stage_stars: {},
                    avatar_config: DEFAULT_AVATAR
                })
            });
            player = await createRes.json();
        }
        currentUser = { id: player.id, email, name: player.display_name };
        currentProfile = player;
        avatarConfig = player.avatar_config || DEFAULT_AVATAR;
        localStorage.setItem('infoquest_user', JSON.stringify(currentUser));
        showScreen('menu-screen');
    } catch (err) {
        errorDiv.textContent = 'Erro ao conectar. O servidor está rodando? (python server.py)';
        errorDiv.classList.remove('hidden');
    }
    btn.textContent = 'Entrar no Jogo';
    btn.disabled = false;
});

// ═══════════════════════════════════════════════════════════
// MENU PRINCIPAL
// ═══════════════════════════════════════════════════════════

async function loadMenu() {
    if (currentUser && !currentProfile) {
        try {
            const res = await fetch(`${API}/players/search?email=${encodeURIComponent(currentUser.email)}`);
            currentProfile = await res.json();
            if (currentProfile?.avatar_config) avatarConfig = currentProfile.avatar_config;
        } catch (e) { }
    }
    const p = currentProfile;
    if (!p) return;
    document.getElementById('player-name').textContent = p.display_name || 'Jogador';
    const level = Math.floor((p.completed_stages?.length || 0) / 3) + 1;
    document.getElementById('player-level').textContent = 'Nv.' + level;
    const totalStars = Object.values(p.stage_stars || {}).reduce((a, b) => a + b, 0);
    document.getElementById('player-stars').textContent = totalStars;
    document.getElementById('player-score').textContent = p.total_score || 0;
    const completedCount = (p.completed_stages || []).length;
    document.getElementById('player-progress').textContent = `${completedCount}/30`;
    document.getElementById('xp-fill').style.width = `${(completedCount / 30) * 100}%`;
    drawAvatar('menu-avatar', 48, 72, avatarConfig);
    const worldsList = document.getElementById('worlds-list');
    worldsList.innerHTML = WORLDS.map(w => {
        const stages = getStagesByWorld(w.id);
        const done = stages.filter(s => (p.completed_stages || []).includes(s.id)).length;
        return `
            <button class="world-btn" onclick="selectWorld(${w.id})">
                <div class="world-emoji" style="background:${w.color}20; border:2px solid ${w.color}40">${w.emoji}</div>
                <div class="world-info">
                    <div class="name">${w.name}</div>
                    <div class="sub">${w.subtitle}</div>
                    <div class="world-bar">
                        <div class="world-bar-fill" style="width:${(done / w.totalStages) * 100}%; background:${w.color}"></div>
                    </div>
                </div>
                <div class="world-count" style="color:${w.color}">${done}/${w.totalStages}</div>
            </button>
        `;
    }).join('');
}

// ═══════════════════════════════════════════════════════════
// MAPA DO MUNDO
// ═══════════════════════════════════════════════════════════

const WORLD_MAPS = {
    1: {
        nodes: [{ x: 12, y: 82 }, { x: 28, y: 65 }, { x: 48, y: 48 }, { x: 68, y: 55 }, { x: 85, y: 38 }, { x: 90, y: 62 }, { x: 78, y: 80 }, { x: 58, y: 84 }, { x: 38, y: 78 }, { x: 18, y: 58 }],
        islandPath: "M 50,5 C 75,0 92,18 96,38 C 100,58 88,82 70,90 C 52,98 25,96 10,84 C -5,72 0,48 6,28 C 12,8 25,10 50,5 Z",
        waterColor: "#0a1628"
    },
    2: {
        nodes: [{ x: 12, y: 80 }, { x: 28, y: 62 }, { x: 46, y: 45 }, { x: 64, y: 40 }, { x: 82, y: 48 }, { x: 88, y: 68 }, { x: 74, y: 82 }, { x: 54, y: 86 }, { x: 34, y: 78 }, { x: 16, y: 60 }],
        islandPath: "M 45,8 C 68,0 90,16 95,42 C 100,68 82,86 60,94 C 38,102 12,96 4,74 C -4,52 8,26 22,14 C 36,2 22,16 45,8 Z",
        waterColor: "#1a0808"
    },
    3: {
        nodes: [{ x: 16, y: 76 }, { x: 36, y: 58 }, { x: 56, y: 42 }, { x: 74, y: 50 }, { x: 88, y: 64 }, { x: 72, y: 78 }, { x: 50, y: 84 }, { x: 30, y: 72 }, { x: 14, y: 56 }, { x: 8, y: 38 }, { x: 20, y: 15 }],
        islandPath: "M 50,8 C 75,2 94,20 96,48 C 98,72 80,88 56,94 C 32,100 8,86 4,62 C 0,38 12,16 34,8 C 42,5 38,12 50,8 Z",
        waterColor: "#061a0e"
    }
};

const WELCOME_DIALOGS = {
    1: [
        "Seja bem-vindo(a) ao jogo da CGID! Sou JonJon, um dos personagens dessa aventura! 🎮",
        "Este jogo foi criado para que vocês conheçam mais sobre informática básica, o ministério em que estamos e a nossa coordenação.",
        "Atenção: as fases ficam cada vez mais DIFÍCEIS! Terão pegadinhas e distratores. ⚠️",
        "Para que tenhamos um bom fluxo de trabalho, é importante que saibam utilizar as ferramentas como Excel, Word, criar e fechar arquivos, salvar dados e entre outras coisas.",
        "Espero que ajude pelo menos um pouquinho este jogo! Lembre-se das regras: nada de copiar do ChatGPT hein... nem pegar resposta com coleguinha de mesa e muito menos com o criador do jogo! 😄",
        "No final, os três melhores ganharão docinhos! Mas saibam que só de terem aprendido e se divertido já é gratificante demais. E em caso de empate... competição da dancinha do Jamal! hahah 🕺",
        "Aproveitem e bom aprendizado! ;)"
    ]
};

// ═══════════════════════════════════════════════════════════
// DIALOGO DE BOAS-VINDAS
// ═══════════════════════════════════════════════════════════

function showWelcomeDialog(step) {
    const dialogs = WELCOME_DIALOGS[1];
    if (!dialogs || step >= dialogs.length) return;

    // Remove overlay anterior se existir
    const oldOverlay = document.getElementById('welcome-overlay');
    if (oldOverlay) oldOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'welcome-overlay';
    overlay.style.cssText = `
        position: fixed; 
        top: 0; left: 0; right: 0; bottom: 0; 
        z-index: 100; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        padding: 20px;
    `;

    overlay.innerHTML = `
        <div style="background: linear-gradient(135deg, #1e293b, #0f172a); 
            border: 2px solid #3b82f6; 
            border-radius: 20px; 
            padding: 30px 24px; 
            max-width: 500px; 
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);">
            
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px">
                <div style="width:50px; height:50px; border-radius:50%; 
                    border: 2px solid #3b82f6;
                    overflow:hidden; flex-shrink:0;
                    background: #1e3a8a;
                    display:flex; align-items:center; justify-content:center;
                    font-size:24px">🎮</div>
                <div>
                    <span style="font-weight:700; color:#60a5fa; font-size:16px">JonJon</span>
                    <div style="font-size:11px; color:#64748b">Guia do Jogo</div>
                </div>
                <span style="margin-left:auto; font-size:12px; color:#64748b; font-weight:600">
                    ${step + 1}/${dialogs.length}
                </span>
            </div>
            
            <p style="color:#e2e8f0; font-size:15px; line-height:1.8; margin-bottom:24px; text-align:left">
                ${dialogs[step]}
            </p>
            
            <div style="display:flex; gap:10px">
                ${step < dialogs.length - 1 ? `
                    <button onclick="document.getElementById('welcome-overlay').remove(); showWelcomeDialog(${step + 1})" 
                        style="flex:1; padding:14px; border-radius:12px; border:none; font-weight:700; font-size:14px; 
                            cursor:pointer; background:linear-gradient(135deg, #1e3a8a, #2563eb); color:white;">
                        Próximo →
                    </button>
                ` : `
                    <button onclick="document.getElementById('welcome-overlay').remove()" 
                        style="flex:1; padding:14px; border-radius:12px; border:none; font-weight:700; font-size:14px; 
                            cursor:pointer; background:linear-gradient(135deg, #059669, #10b981); color:white;">
                        Vamos jogar! 🎮
                    </button>
                `}
                <button onclick="document.getElementById('welcome-overlay').remove()" 
                    style="padding:14px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); 
                        cursor:pointer; background:rgba(255,255,255,0.05); color:#94a3b8; font-size:13px; font-weight:600">
                    Pular
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function selectWorld(worldId) {
 currentWorld = getWorldById(worldId);
    const stages = getStagesByWorld(worldId);
    const completed = currentProfile?.completed_stages || [];
    const mapConfig = WORLD_MAPS[worldId] || WORLD_MAPS[1];
    const nodes = mapConfig.nodes.slice(0, stages.length);

    document.getElementById('world-title').innerHTML = `
        <div style="text-align:center">
            <div style="font-size:24px">${currentWorld.emoji}</div>
            <div style="font-weight:700; font-size:14px">${currentWorld.name}</div>
            <div style="font-size:11px; color:${currentWorld.color}">${stages.filter(s => completed.includes(s.id)).length}/${stages.length} fases</div>
        </div>
    `;

    const stagesDiv = document.getElementById('world-stages');
    function isUnlocked(stage, idx) { if (idx === 0) return true; return completed.includes(stages[idx - 1].id); }

    let pathsSVG = '';
    nodes.slice(0, -1).forEach((n, i) => {
        const next = nodes[i + 1];
        const unlocked = isUnlocked(stages[i + 1], i + 1);
        pathsSVG += `<line x1="${n.x}%" y1="${n.y}%" x2="${next.x}%" y2="${next.y}%" stroke="${unlocked ? currentWorld.color : '#374151'}" stroke-width="${unlocked ? '6' : '3'}" stroke-dasharray="${unlocked ? 'none' : '6,4'}" opacity="${unlocked ? '0.8' : '0.3'}" stroke-linecap="round"/>`;
    });

    let nodesHTML = stages.map((stage, idx) => {
        const node = nodes[idx]; 
        if (!node) return '';
        
        let unlocked = isUnlocked(stage, idx);
        if (stage.id === 31) unlocked = true;  // Fase bônus sempre desbloqueada
        
        const done = completed.includes(stage.id);
        const stars = currentProfile?.stage_stars?.[stage.id] || 0;
        
        return `<div style="position:absolute; left:${node.x}%; top:${node.y}%; transform:translate(-50%,-50%); z-index:10">
            ${unlocked && !done ? `<div style="position:absolute; inset:0; border-radius:50%; background:${currentWorld.color}; opacity:0.2; transform:scale(2); animation: ping 2s infinite"></div>` : ''}
            <button onclick="startStage(${stage.id})" ${!unlocked ? 'disabled' : ''} style="width:80px; height:80px; border-radius:50%; background:#1f2937; border:5px solid ${done ? currentWorld.color : unlocked ? currentWorld.color + '80' : '#374151'}; cursor:${unlocked ? 'pointer' : 'not-allowed'}; font-size:32px; display:flex; align-items:center; justify-content:center; position:relative; transition: all 0.3s">
                ${done ? '⭐' : unlocked ? stage.icon : '🔒'}
                <span style="position:absolute; top:-8px; right:-8px; width:28px; height:28px; border-radius:50%; background:${currentWorld.color}; color:white; font-size:12px; font-weight:900; display:flex; align-items:center; justify-content:center">${idx + 1}</span>
            </button>
            ${done ? `<div style="display:flex; justify-content:center; gap:2px; margin-top:4px">${[1, 2, 3].map(s => `<span style="font-size:11px; color:${s <= stars ? '#fbbf24' : '#374151'}">★</span>`).join('')}</div>` : ''}
        </div>`;
    }).join('');

    stagesDiv.innerHTML = `<div style="position:relative; height:calc(100vh - 160px); min-height:500px; background:${mapConfig.waterColor}; border-radius:16px; overflow:hidden">
        ${Array.from({ length: 40}, (_, i) => `<div style="position:absolute; width:${Math.random() * 2 + 1}px; height:${Math.random() * 2 + 1}px; background:white; border-radius:50%; left:${Math.random() * 100}%; top:${Math.random() * 100}%; opacity:${Math.random() * 0.4 + 0.1}"></div>`).join('')}
        <svg style="position:absolute; inset:0; width:100%; height:100%; opacity:0.35; pointer-events:none" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><radialGradient id="islandGrad"><stop offset="0%" stop-color="${currentWorld.color}" stop-opacity="0.8"/><stop offset="100%" stop-color="${currentWorld.color}" stop-opacity="0.2"/></radialGradient></defs><path d="${mapConfig.islandPath}" fill="url(#islandGrad)" stroke="${currentWorld.color}" stroke-width="0.5" stroke-opacity="0.4"/></svg>
        <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none">${pathsSVG}</svg>
        ${nodesHTML}
    </div>`;

    setTimeout(() => drawAvatar('world-player-avatar', 25, 38, avatarConfig), 100);

    if (Number(worldId) === 1) {
        const key = 'welcome_shown_w1';
        if (!sessionStorage.getItem(key)) { sessionStorage.setItem(key, '1'); showWelcomeDialog(0); }
    }
    showScreen('world-screen');
}

function nextQuestion() { quizAnswered = false; quizIndex++; if (quizIndex >= quizQuestions.length) startPractice(); else renderQuiz(); }

function backToWorld() {
    if (currentWorld) {
        selectWorld(currentWorld.id);
    } else {
        showScreen('menu-screen');
    }
}

function nextStage() {
    const nextId = currentStage.id + 1;
    const next = getStageById(nextId);
    
    if (next) {
        // 🔥 Atualiza o mundo atual para o mundo da próxima fase
        const novoMundo = getWorldById(next.worldId);
        if (novoMundo) {
            currentWorld = novoMundo;
            console.log(`🌍 Mudando para o mundo ${currentWorld.name} (${currentWorld.id}) - Fase ${next.id}`);
        }
        startStage(next.id);
    } else {
        // Se não tem próxima fase (fase 30), volta pro menu
        console.log("🏆 Jogo completo! Voltando ao menu.");
        showScreen('menu-screen');
    }
}

// ═══════════════════════════════════════════════════════════
// INÍCIO DA FASE
// ═══════════════════════════════════════════════════════════

let phase = 'intro';
let practiceData = null;
let practiceState = {};

function startStage(stageId) {
    currentStage = getStageById(stageId);
    if (!currentStage) return;

    phase = 'intro';
    vidas = 3;
    comboAtual = 0;
    quizScore = 0;
    quizIndex = 0;
    quizAnswered = false;
    timerActive = false;

    if (timerInterval) clearInterval(timerInterval);
    if (distratorInterval) clearInterval(distratorInterval);

    // Atualiza cabeçalho da fase
    const stageTitle = document.getElementById('stage-title');
    if (stageTitle) {
        stageTitle.innerHTML = `<div style="text-align:center"><span style="font-size:20px">${currentStage.icon}</span> <span style="font-weight:700">${currentStage.name}</span></div>`;
    }

    const stageDifficulty = document.getElementById('stage-difficulty');
    if (stageDifficulty) {
        const diffConfig = DIFFICULTY_CONFIG[currentStage.difficulty] || DIFFICULTY_CONFIG.easy;
        stageDifficulty.innerHTML = `<span style="color:${diffConfig.color}; font-size:12px; font-weight:600">${diffConfig.label}</span>`;
    }

    // Mostra tela da fase
    showScreen('stage-screen');

    // Mostra timer
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.style.display = 'block';

    // Mostra vidas
    const vidasDisplay = document.getElementById('vidas-display');
    if (vidasDisplay) {
        vidasDisplay.style.display = 'block';
        vidasDisplay.innerHTML = '❤️❤️❤️';
    }

    // Inicia introdução
    showIntro();
}

function showIntro() {
    dialogLines = currentStage.intro.lines;
    dialogIndex = 0;
    phase = 'intro';

    const content = document.getElementById('stage-content');
    const accent = currentWorld?.color || '#2563EB';
    const avatarSize = '100px';

    let avatarHTML = `<span style="font-size:32px">🎓</span>`;
    if (currentWorld && currentWorld.id === 3) avatarHTML = `<img src="img2/tavin.png" style="width:${avatarSize}; height:${avatarSize}; object-fit:cover; border-radius:50%"/>`;
    else if (currentWorld && currentWorld.id === 2) avatarHTML = `<img src="img2/mini_fred.png" style="width:${avatarSize}; height:${avatarSize}; object-fit:cover; border-radius:50%"/>`;
    else if (currentWorld && currentWorld.id === 1) avatarHTML = `<img src="img2/jonjon.png" style="width:${avatarSize}; height:${avatarSize}; object-fit:cover; border-radius:50%"/>`;

    content.innerHTML = `<div style="text-align:center; margin-bottom:20px; font-size:18px; color:#94a3b8; font-weight:600">📖 Introdução → ❓ Quiz → ⚡ Prática</div>
    <div class="dialog-box" style="max-width:900px; margin:0 auto; width:100%">
        <div class="dialog-header" style="padding:24px 30px; gap:20px">
            <div style="width:${avatarSize}; height:${avatarSize}; border-radius:50%; border:3px solid ${accent}40; overflow:hidden; display:flex; align-items:center; justify-content:center; background:${accent}20; flex-shrink:0">${avatarHTML}</div>
            <div style="flex:1">
                <div class="char-name" style="font-size:24px; font-weight:700">${currentStage.intro.character}</div>
                <div id="typing-indicator" style="color:${accent}; font-size:14px; margin-top:6px">digitando...</div>
            </div>
            <div style="display:flex; gap:6px; align-self:flex-start; margin-top:12px">
                ${dialogLines.map((_, i) => `<div id="dot-${i}" style="width:${i === 0 ? 30 : 10}px; height:10px; border-radius:5px; background:#374151; transition:all 0.3s"></div>`).join('')}
            </div>
        </div>
        <div class="dialog-text" id="dialog-text" onclick="advanceDialog()" style="font-size:20px; line-height:2.0; padding:40px 30px; min-height:180px; color:#e2e8f0; letter-spacing:0.5px; font-weight:500"></div>
        <div class="dialog-footer">
            <button class="dialog-btn" id="dialog-btn" style="background:${accent}" onclick="advanceDialog()">Próximo</button>
        </div>
    </div>`;

    typeDialog();
}

function typeDialog() {
    if (dialogIndex >= dialogLines.length) {
        startQuiz();
        return;
    }

    const text = dialogLines[dialogIndex];
    const textEl = document.getElementById('dialog-text');
    const indicator = document.getElementById('typing-indicator');
    const btn = document.getElementById('dialog-btn');

    let i = 0;
    dialogTyping = true;
    textEl.textContent = '';
    indicator.textContent = 'digitando...';

    // Atualiza dots
    document.querySelectorAll('[id^="dot-"]').forEach((dot, idx) => {
        dot.style.width = idx === dialogIndex ? '30px' : '10px';
        dot.style.background = idx <= dialogIndex ? (currentWorld?.color || '#2563EB') : '#374151';
    });

    if (dialogTimer) clearInterval(dialogTimer);

    dialogTimer = setInterval(() => {
        textEl.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(dialogTimer);
            dialogTyping = false;
            indicator.textContent = 'toque para continuar';
            btn.textContent = dialogIndex < dialogLines.length - 1 ? 'Próximo' : 'Começar Quiz';
        }
    }, 16);
}

function advanceDialog() {
    const textEl = document.getElementById('dialog-text');
    const indicator = document.getElementById('typing-indicator');
    const btn = document.getElementById('dialog-btn');

    if (!textEl || !indicator || !btn) return;

    if (dialogTyping) {
        clearInterval(dialogTimer);
        textEl.textContent = dialogLines[dialogIndex];
        indicator.textContent = 'toque para continuar';
        btn.textContent = dialogIndex < dialogLines.length - 1 ? 'Próximo' : 'Começar Quiz';
        dialogTyping = false;
        return;
    }

    dialogIndex++;
    if (dialogIndex >= dialogLines.length) {
        startQuiz();
    } else {
        typeDialog();
    }
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ═══════════════════════════════════════════════════════════
// QUIZ
// ═══════════════════════════════════════════════════════════

function startQuiz() {
    phase = 'quiz';

    // MOSTRAR TIMER E VIDAS APENAS NO QUIZ
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.style.display = 'block';
        timerDisplay.style.position = 'fixed';
        timerDisplay.style.top = '20px';
        timerDisplay.style.right = '20px';
        timerDisplay.style.background = 'rgba(0,0,0,0.8)';
        timerDisplay.style.padding = '10px 20px';
        timerDisplay.style.borderRadius = '30px';
        timerDisplay.style.fontSize = '18px';
        timerDisplay.style.fontWeight = 'bold';
        timerDisplay.style.zIndex = '100';
        timerDisplay.style.backdropFilter = 'blur(5px)';
        timerDisplay.style.fontFamily = 'monospace';
    }

    const vidasDisplay = document.getElementById('vidas-display');
    if (vidasDisplay) {
        vidasDisplay.style.display = 'block';
        vidasDisplay.innerHTML = '❤️❤️❤️';
    }

    // Prepara perguntas do quiz
    quizQuestions = currentStage.quiz.map(q => {
        const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
        const shuffled = shuffleArray(indexed);
        return {
            ...q,
            options: shuffled.map(x => x.opt),
            correct: shuffled.findIndex(x => x.isCorrect),
            _pegadinhaInfo: null
        };
    });

    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;

    renderQuiz();
}

// ═══════════════════════════════════════════════════════════
// EMBARALHAMENTO DINÂMICO - FAZ O POVO SE LASCAR 😈
// ═══════════════════════════════════════════════════════════

function iniciarEmbaralhamentoDinamico() {
    shuffleCount = 0;
    falsoFinalAtivo = false;

    maxShuffle = Math.floor(Math.random() * 8) + 3; // 3 a 10 embaralhamentos
    console.log(`🎲 EMBARALHAMENTO MALUCO ATIVADO! Vai trocar ${maxShuffle} vezes`);

    if (aleatorioTimeout) {
        clearTimeout(aleatorioTimeout);
        aleatorioTimeout = null;
    }

    function executarEmbaralhamento() {
        const botoes = document.querySelectorAll('.quiz-option');
        if (botoes.length === 0) return;

        // Pega os textos atuais das opções
        const opcoesTextos = Array.from(botoes).map(btn => {
            const span = btn.querySelector('span:last-child');
            return span ? span.textContent : '';
        });

        // Embaralha os textos
        const textosEmbaralhados = shuffleArray([...opcoesTextos]);

        // Aplica os textos embaralhados nos botões
        botoes.forEach((btn, idx) => {
            const span = btn.querySelector('span:last-child');
            if (span) {
                span.textContent = textosEmbaralhados[idx];
            }
        });

        // Encontra onde está a resposta correta agora
        const novoIndiceCorreto = textosEmbaralhados.findIndex(texto => texto === opcoesCorretasOriginal);
        indiceCorretoDinamico = novoIndiceCorreto;
        
        // Atualiza o índice correto no quizQuestions
        if (quizQuestions[quizIndex]) {
            quizQuestions[quizIndex]._correctIndex = novoIndiceCorreto;
        }

        shuffleCount++;
        console.log(`🔄 EMBARALHAMENTO ${shuffleCount}/${maxShuffle} - Resposta correta foi para posição ${novoIndiceCorreto}`);

        // Decide se continua ou para
        if (shuffleCount >= maxShuffle) {
            // Falso final: às vezes engana o jogador achando que acabou
            if (!falsoFinalAtivo && Math.random() < 0.35) {
                falsoFinalAtivo = true;
                console.log(`🎭 FALSO FINAL! O jogador vai achar que acabou, mas vai mexer de novo... 😈`);
                aleatorioTimeout = setTimeout(executarEmbaralhamento, 2000);
            } else {
                console.log(`✅ EMBARALHAMENTO FINALIZADO! O jogador sofreu ${shuffleCount} vezes!`);
            }
            return;
        }

        // Tempo aleatório entre 1 e 3 segundos para o próximo embaralhamento
        const tempoAleatorio = Math.random() * 2000 + 1000;
        aleatorioTimeout = setTimeout(executarEmbaralhamento, tempoAleatorio);
    }

    // Primeiro embaralhamento depois de 1.5 segundos
    aleatorioTimeout = setTimeout(executarEmbaralhamento, 1500);
}

function renderQuiz() {
    if (quizIndex >= quizQuestions.length) {
        startPractice();
        return;
    }

    const q = quizQuestions[quizIndex];
    const accent = currentWorld?.color || '#2563EB';
    const nivelPegadinha = getNivelPegadinha();

    let options = [...q.options];
    let correctIndex = q.correct;

    // GARANTIA: A resposta correta está nas opções
    const respostaCorretaFinal = options[correctIndex];
    if (!options.includes(respostaCorretaFinal)) {
        options.push(respostaCorretaFinal);
        correctIndex = options.length - 1;
    }

    // DISTRATOR - Opção que pisca
    let distratorIndex = -1;
    if (Math.random() < 0.5 && options.length >= 2) {
        const todasOpcoes = [];
        for (let i = 0; i < options.length; i++) todasOpcoes.push(i);
        if (todasOpcoes.length > 0) {
            distratorIndex = todasOpcoes[Math.floor(Math.random() * todasOpcoes.length)];
            console.log(`🎯 DISTRATOR - Pergunta ${quizIndex + 1}: pisca na opção ${distratorIndex}`);
        }
    }

    // Embaralha as opções
    const indexedOptions = options.map((opt, idx) => ({ opt, isCorrect: idx === correctIndex, isDistrator: idx === distratorIndex }));
    const shuffled = shuffleArray(indexedOptions);
    const finalOptions = shuffled.map(x => x.opt);
    const finalCorrectIndex = shuffled.findIndex(x => x.isCorrect);
    const finalDistratorIndex = shuffled.findIndex(x => x.isDistrator);

    // Salva os dados para o answerQuiz
    quizQuestions[quizIndex]._correctIndex = finalCorrectIndex;
    quizQuestions[quizIndex]._options = finalOptions;
    quizQuestions[quizIndex]._distratorIndex = finalDistratorIndex;

    const labels = ['A', 'B', 'C', 'D', 'E'];

    document.getElementById('stage-content').innerHTML = `
    <div style="text-align:center; margin-bottom:16px; font-size:14px; color:#94a3b8; font-weight:600">
        ✅ Introdução → <strong style="color:white; font-size:15px">❓ Quiz</strong> → ⚡ Prática
    </div>
    <div class="quiz-card">
        <div class="quiz-header" style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px">
            <span style="font-size:14px; font-weight:700">Pergunta ${quizIndex + 1} de ${quizQuestions.length}</span>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap">
                ${nivelPegadinha.penalidadeVidas > 0 ? `<span style="background:#ef4444; color:white; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:900">💀 -${nivelPegadinha.penalidadeVidas} vida</span>` : ''}
            </div>
            <div style="display:flex; align-items:center; gap:12px">
                <span style="background:rgba(251,191,36,0.2); padding:4px 10px; border-radius:20px; font-weight:700; color:#fbbf24">⭐ ${quizScore}</span>
                ${comboAtual > 1 ? `<span style="background:#f97316; padding:4px 10px; border-radius:20px; font-weight:700; color:white; animation:pulse 0.5s infinite">🔥 ${comboAtual}x COMBO</span>` : ''}
            </div>
        </div>
        <div class="quiz-body" style="padding:24px 20px">
            <div class="quiz-question" style="font-size:18px; margin-bottom:24px; color:white; font-weight:600">
                ${q.question}
            </div>
            
            ${q.imagem ? `
                <div style="text-align:center; margin-bottom:20px">
                    <img src="${q.imagem}" alt="Imagem da mesa" style="max-width:100%; max-height:300px; border-radius:12px; border:2px solid ${accent}; box-shadow:0 4px 20px rgba(0,0,0,0.3)">
                    <p style="font-size:11px; color:#64748b; margin-top:6px">📸 Clique na imagem para ampliar</p>
                </div>
            ` : ''}
            
            ${finalOptions.slice(0, 5).map((opt, i) => {
        return `<button class="quiz-option" id="opt-${i}" onclick="answerQuiz(${i}, ${Date.now()})" style="padding:16px 18px; margin-bottom:10px; font-size:15px; width:100%; text-align:left; display:flex; align-items:center; gap:12px; background:#0f172a; border:2px solid #334155; border-radius:10px; color:#cbd5e1; cursor:pointer">
                    <span class="opt-letter" style="background:${accent}20; color:${accent}; font-size:13px; font-weight:800; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0">${labels[i]}</span>
                    <span style="flex:1; font-weight:500">${opt}</span>
                </button>`;
    }).join('')}
        </div>
        <div class="quiz-footer" id="quiz-footer" style="display:none; padding:16px 20px; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px">
            <span id="quiz-feedback" style="font-size:14px; font-weight:500"></span>
            <button class="dialog-btn" style="background:${accent}; padding:12px 28px; font-size:14px; font-weight:700" onclick="nextQuestion()">
                ${quizIndex < quizQuestions.length - 1 ? 'Próxima Pergunta →' : 'Ir para Prática ⚡'}
            </button>
        </div>
    </div>
`;

    // EMBARALHAMENTO DINÂMICO
    const nivel = getNivelPegadinha();
    if (nivel === PEGADINHA_NIVEIS.dificil || nivel === PEGADINHA_NIVEIS.muitoDificil) {
        const deveEmbaralhar = Math.random() < 0.5;
        if (deveEmbaralhar) {
            // 🔥 CORREÇÃO: define a variável antes de usar
            const textoCorretoOriginal = q.options[q.correct];
            opcoesCorretasOriginal = textoCorretoOriginal;
            indiceCorretoDinamico = finalCorrectIndex;
            setTimeout(() => {
                iniciarEmbaralhamentoDinamico();
            }, 500);
        }
    }
    
    // DISTRATOR PISCANTE
    if (finalDistratorIndex !== -1 && finalDistratorIndex < 5) {
        setTimeout(() => {
            ativarDistratorPiscanteNaOpcao(finalDistratorIndex);
        }, 1500);
    }
}

// ═══════════════════════════════════════════════════════════
// DISTRATOR PISCANTE
// ═══════════════════════════════════════════════════════════

function ativarDistratorPiscanteNaOpcao(opcaoIndex) {
    if (distratorInterval) clearInterval(distratorInterval);

    const alvo = document.getElementById(`opt-${opcaoIndex}`);
    if (!alvo) return;

    const cores = [
        { borda: '#10b981', fundo: '#064e3a', nome: 'VERDE' },
        { borda: '#ef4444', fundo: '#7f1d1d', nome: 'VERMELHO' }
    ];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    console.log(`🎯 DISTRATOR PISCANDO na opção ${opcaoIndex} - COR: ${corAleatoria.nome}`);

    const originalBorder = alvo.style.border;
    const originalBg = alvo.style.background;
    const originalShadow = alvo.style.boxShadow;

    let contador = 0;
    const DURACAO = 2500;
    const INTERVALO = 250;
    const totalPiscadas = DURACAO / INTERVALO;

    distratorInterval = setInterval(() => {
        contador++;
        if (contador % 2 === 0) {
            alvo.style.border = originalBorder || '';
            alvo.style.background = originalBg || '';
            alvo.style.boxShadow = originalShadow || '';
        } else {
            alvo.style.border = `3px solid ${corAleatoria.borda}`;
            alvo.style.background = corAleatoria.fundo;
            alvo.style.boxShadow = `0 0 20px ${corAleatoria.borda}`;
            alvo.style.transition = 'all 0.1s ease';
        }
        if (contador >= totalPiscadas) {
            clearInterval(distratorInterval);
            distratorInterval = null;
            alvo.style.border = originalBorder || '';
            alvo.style.background = originalBg || '';
            alvo.style.boxShadow = originalShadow || '';
            alvo.style.transition = '';
        }
    }, INTERVALO);
}

// ═══════════════════════════════════════════════════════════
// FUNÇÕES DE VIDA, COMBO E TIMER (ADICIONAR ANTES DO answerQuiz)
// ═══════════════════════════════════════════════════════════

function atualizarDisplayVidas() {
    const vidasEl = document.getElementById('vidas-display');
    if (vidasEl) {
        if (vidas >= 3) vidasEl.innerHTML = '❤️❤️❤️';
        else if (vidas === 2) vidasEl.innerHTML = '❤️❤️🖤';
        else if (vidas === 1) vidasEl.innerHTML = '❤️🖤🖤';
        else vidasEl.innerHTML = '🖤🖤🖤';

        if (vidas === 1) {
            vidasEl.style.animation = 'pulse 0.5s infinite';
            vidasEl.style.color = '#ef4444';
        } else {
            vidasEl.style.animation = '';
            vidasEl.style.color = '';
        }
    }
}

function atualizarCombo(acertou) {
    if (acertou) {
        comboAtual++;
        maiorCombo = Math.max(maiorCombo, comboAtual);

        const comboEl = document.getElementById('combo-display') || criarDisplayCombo();
        if (comboAtual >= 2) {
            comboEl.textContent = `🔥 ${comboAtual}x COMBO!`;
            comboEl.style.display = 'block';
            comboEl.style.animation = 'bounce 0.3s ease';
            setTimeout(() => {
                if (comboEl) comboEl.style.animation = '';
            }, 300);
        }

        if (comboAtual === 3) {
            timeLeft = Math.min(120, timeLeft + 8);
            showToast('🔥 COMBO x3! +8 segundos!', 'bonus');
            updateTimerDisplay();
        } else if (comboAtual === 5) {
            timeLeft = Math.min(120, timeLeft + 12);
            vidas = Math.min(5, vidas + 1);
            showToast('⚡ COMBO x5! +12 segundos e +1 VIDA!', 'bonus');
            updateTimerDisplay();
            atualizarDisplayVidas();
        }
    } else {
        comboAtual = 0;
        const comboEl = document.getElementById('combo-display');
        if (comboEl) comboEl.style.display = 'none';
    }
}

function criarDisplayCombo() {
    let el = document.getElementById('combo-display');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'combo-display';
    el.style.cssText = 'position:fixed; bottom:80px; right:20px; background:linear-gradient(135deg,#f97316,#ea580c); color:white; padding:10px 20px; border-radius:40px; font-weight:900; font-size:16px; z-index:100; box-shadow:0 0 30px rgba(249,115,22,0.6); display:none; font-family:monospace; letter-spacing:1px';
    document.body.appendChild(el);
    return el;
}

function showToast(mensagem, tipo) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
        background:${tipo === 'bonus' ? '#10b981' : '#ef4444'};
        color:white; padding:12px 24px; border-radius:50px;
        font-weight:700; font-size:14px; z-index:1000;
        animation: fadeInUp 0.3s ease;
        box-shadow:0 4px 15px rgba(0,0,0,0.3);
        white-space:nowrap;
    `;
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer-display');
    if (!timerEl) return;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `⏱️ ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft < 10) {
        timerEl.style.color = '#ef4444';
        timerEl.style.animation = 'pulse 0.5s infinite';
    } else if (timeLeft < 30) {
        timerEl.style.color = '#fbbf24';
        timerEl.style.animation = 'pulse 1s infinite';
    } else {
        timerEl.style.color = '#10b981';
        timerEl.style.animation = 'none';
    }
}

function answerQuiz(selectedIndex, tempoRespostaMs) {
    // Para o embaralhamento se estiver ativo
    if (aleatorioTimeout) {
        clearTimeout(aleatorioTimeout);
        aleatorioTimeout = null;
    }

    if (quizAnswered) return;
    quizAnswered = true;

    if (distratorInterval) {
        clearInterval(distratorInterval);
        distratorInterval = null;
    }

    const q = quizQuestions[quizIndex];
    
    // 🔥 USA O ÍNDICE DINÂMICO SE EXISTIR (embaralhamento ativo)
    let correctIndex;
    if (indiceCorretoDinamico !== null && indiceCorretoDinamico !== undefined) {
        correctIndex = indiceCorretoDinamico;
        console.log(`🎯 USANDO ÍNDICE DINÂMICO: ${correctIndex}`);
    } else {
        correctIndex = q._correctIndex;
    }
    
    const isCorrect = (selectedIndex === correctIndex);
    const foiRapido = (Date.now() - tempoRespostaMs) < 5000;

    // Marca visual
    document.querySelectorAll('.quiz-option').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) {
            btn.style.background = '#065f4620';
            btn.style.border = '2px solid #10b981';
        }
        if (idx === selectedIndex && !isCorrect) {
            btn.style.background = '#7f1d1d20';
            btn.style.border = '2px solid #ef4444';
        }
    });

    document.getElementById('quiz-footer').style.display = 'flex';
    let feedbackHTML = '';

    if (isCorrect) {
        quizScore++;
        atualizarCombo(true);
        const msg = MENSAGENS_ACERTO[Math.floor(Math.random() * MENSAGENS_ACERTO.length)];
        feedbackHTML = `<span style="color:#10b981; font-weight:700">✅ ${msg}</span>`;
        tocarSom('acerto');

        if (foiRapido) {
            timeLeft = Math.min(120, timeLeft + 5);
            feedbackHTML += '<br><span style="color:#fbbf24; font-size:12px">⚡ RAPIDÃO! +5 segundos</span>';
            updateTimerDisplay();
        }

        if (quizScore === quizQuestions.length) {
            feedbackHTML += '<br><span style="color:#fbbf24; font-size:14px; font-weight:700">🏆 PERFEITO!</span>';
        }
    } else {
        atualizarCombo(false);
        timeLeft = Math.max(10, timeLeft - 8);
        const msg = MENSAGENS_ERRO[Math.floor(Math.random() * MENSAGENS_ERRO.length)];
        feedbackHTML = `<span style="color:#ef4444; font-weight:700">❌ ${msg}</span>`;
        feedbackHTML += '<br><span style="color:#64748b; font-size:12px">⏱️ -8 segundos</span>';
        
        const respostaCorreta = q.options[q.correct];
        feedbackHTML += `<br><span style="color:#10b981; font-size:13px; font-weight:600">✅ RESPOSTA CORRETA: ${respostaCorreta}</span>`;
        
        tocarSom('erro');
        updateTimerDisplay();
        atualizarDisplayVidas();

        if (vidas <= 0) {
            const gameoverMsg = MENSAGENS_GAMEOVER[Math.floor(Math.random() * MENSAGENS_GAMEOVER.length)];
            feedbackHTML += `<br><br><span style="color:#dc2626; font-weight:700; font-size:16px">💀 ${gameoverMsg}</span>`;
            feedbackHTML += `<br><button onclick="backToWorld()" style="background:#3b82f6; border:none; padding:8px 16px; border-radius:8px; color:white; margin-top:12px; cursor:pointer">🗺️ VOLTAR PRO MAPA</button>`;
            document.getElementById('quiz-footer').style.display = 'none';
            if (timerInterval) clearInterval(timerInterval);
            tocarSom('gameover');
            return;
        }
    }

    updateTimerDisplay();
    document.getElementById('quiz-feedback').innerHTML = feedbackHTML;
}

function atualizarCombo(acertou) {
    if (acertou) {
        comboAtual++;
        maiorCombo = Math.max(maiorCombo, comboAtual);

        const comboEl = document.getElementById('combo-display') || criarDisplayCombo();
        if (comboAtual >= 2) {
            comboEl.textContent = `🔥 ${comboAtual}x COMBO!`;
            comboEl.style.display = 'block';
            comboEl.style.animation = 'bounce 0.3s ease';
            setTimeout(() => {
                if (comboEl) comboEl.style.animation = '';
            }, 300);
        }

        if (comboAtual === 3) {
            timeLeft = Math.min(120, timeLeft + 8);
            showToast('🔥 COMBO x3! +8 segundos!', 'bonus');
            updateTimerDisplay();
        } else if (comboAtual === 5) {
            timeLeft = Math.min(120, timeLeft + 12);
            vidas = Math.min(5, vidas + 1);
            showToast('⚡ COMBO x5! +12 segundos e +1 VIDA!', 'bonus');
            updateTimerDisplay();
            atualizarDisplayVidas();
        }
    } else {
        comboAtual = 0;
        const comboEl = document.getElementById('combo-display');
        if (comboEl) comboEl.style.display = 'none';
    }
}

function criarDisplayCombo() {
    let el = document.getElementById('combo-display');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'combo-display';
    el.style.cssText = 'position:fixed; bottom:80px; right:20px; background:linear-gradient(135deg,#f97316,#ea580c); color:white; padding:10px 20px; border-radius:40px; font-weight:900; font-size:16px; z-index:100; box-shadow:0 0 30px rgba(249,115,22,0.6); display:none; font-family:monospace; letter-spacing:1px';
    document.body.appendChild(el);
    return el;
}

function showToast(mensagem, tipo) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
        background:${tipo === 'bonus' ? '#10b981' : '#ef4444'};
        color:white; padding:12px 24px; border-radius:50px;
        font-weight:700; font-size:14px; z-index:1000;
        animation: fadeInUp 0.3s ease;
        box-shadow:0 4px 15px rgba(0,0,0,0.3);
        white-space:nowrap;
    `;
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer-display');
    if (!timerEl) return;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `⏱️ ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft < 10) {
        timerEl.style.color = '#ef4444';
        timerEl.style.animation = 'pulse 0.5s infinite';
    } else if (timeLeft < 30) {
        timerEl.style.color = '#fbbf24';
        timerEl.style.animation = 'pulse 1s infinite';
    } else {
        timerEl.style.color = '#10b981';
        timerEl.style.animation = 'none';
    }
}

function nextQuestion() {
    quizAnswered = false;
    quizIndex++;
    if (quizIndex >= quizQuestions.length) {
        startPractice();
    } else {
        renderQuiz();
    }
}

// ═══════════════════════════════════════════════════════════
// PRÁTICA
// ═══════════════════════════════════════════════════════════

function startPractice() {
    phase = 'practice';
    timeLeft = 120; timerActive = true; updateTimerDisplay();
    document.getElementById('vidas-display').style.display = 'block';
    document.getElementById('vidas-display').textContent = '❤️'.repeat(vidas);
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function () {
        timeLeft--; updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval); timerActive = false; showToast('⏰ Tempo esgotado!', 'error'); vidas--;
            if (vidas <= 0) { alert('💀 Você perdeu todas as vidas! Tente novamente.'); backToWorld(); }
            else { startPractice(); }
        }
    }, 1000);

    const accent = currentWorld?.color || '#2563EB';
    const stagePractice = PRACTICE_BY_STAGE[currentStage.id];
    if (stagePractice) {
        practiceData = stagePractice;
    } else {
        // Fallback: criar prática genérica com 5 cenários
        practiceData = {
            type: 'scenario',
            title: 'Aplique o Conhecimento',
            subtitle: 'Baseado no que aprendeu',
            data: {
                scenarios: [
                    { scenario: 'Com base no conteúdo desta fase...', question: 'Qual a melhor prática?', options: ['Improvisar', 'Seguir o procedimento padrão', 'Ignorar', 'Perguntar depois'], correct: 1, explanation: 'Sempre siga os procedimentos estabelecidos.' },
                    { scenario: 'Um colega pede ajuda com uma dúvida...', question: 'O que fazer?', options: ['Ignorar', 'Compartilhar o conhecimento', 'Dizer que não sabe', 'Mandar procurar sozinho'], correct: 1, explanation: 'Compartilhar conhecimento fortalece a equipe.' },
                    { scenario: 'Você encontra um erro no sistema...', question: 'Como proceder?', options: ['Esconder o erro', 'Reportar ao responsável', 'Corrigir sozinho sem avisar', 'Esperar alguém descobrir'], correct: 1, explanation: 'Reportar problemas é dever do servidor público.' },
                    { scenario: 'Recebe uma demanda urgente...', question: 'Atitude correta?', options: ['Fazer correndo sem conferir', 'Planejar, executar e revisar', 'Delegar sem orientação', 'Adiar indefinidamente'], correct: 1, explanation: 'Planejamento evita retrabalho e garante qualidade.' },
                    { scenario: 'No trabalho em equipe...', question: 'Melhor abordagem?', options: ['Trabalhar isolado', 'Colaborar e comunicar', 'Competir com colegas', 'Deixar os outros fazerem'], correct: 1, explanation: 'Colaboração é fundamental no serviço público.' },
                ]
            }
        };
    }

    practiceState = { selected: null, answers: [], step: 0, matchAnswers: {} };

    // ✨ SIMULAÇÃO (Mundo 1 - Informática)
    if (practiceData.type === 'simulation' ||
        practiceData.type === 'simulation_windows' ||
        practiceData.type === 'simulation_explorer' ||
        practiceData.type === 'simulation_config') {
        startSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_excel') {
        startExcelSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_word') {
        startWordSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_map') {
        startMapSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_norte') {
        startNorteSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_timeline') {
        startTimelineSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_fluxo') {
        startFluxoSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_crc') {
        startCrcSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_calculadora') {
        // Mostra diálogo do JvPlayer antes
        if (practiceData.introDialog) {
            showPracticeIntroDialog(practiceData.introDialog, () => {
                startCalculadoraSimulation(practiceData.data.tasks, accent);
            });
        } else {
            startCalculadoraSimulation(practiceData.data.tasks, accent);
        }
        return;
    }

    if (practiceData.type === 'simulation_checklist') {
        startChecklistSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_relatorio') {
        startRelatorioSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_montagem') {
        startMontagemSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_govbr') {
        startGovSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_trem_mapa') {
        startTremMapaSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_evento') {
        startEventoSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_desfazimento') {
        startDesfazSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_solicitacao') {
        startSolicitacaoSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_act') {
        startActSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_pixelart') {
        startPixelArtSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_termo_excel') {
        startTermoExcelSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_prestacao') {
        startDetetiveSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_corrida_crc') {
        startCorridaSimulation(practiceData.data.tasks, accent);
        return;
    }

    if (practiceData.type === 'simulation_quiz_final') {
        startQuizFinalSimulation(practiceData.data.tasks, accent);
        return;
    }

    renderPractice();
}

// 🆕 updateTimerDisplay FORA, depois da função
function updateTimerDisplay() {
    var timerEl = document.getElementById('timer-display');
    if (!timerEl) return;

    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    timerEl.textContent = '⏱️ ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    timerEl.style.color = timeLeft < 30 ? '#ef4444' : timeLeft < 60 ? '#fbbf24' : '#10b981';
}

function showPracticeIntroDialog(dialogData, callback) {
    const overlay = document.createElement('div');
    overlay.id = 'practice-intro-overlay';
    overlay.style.cssText = `
        position:fixed; top:0; left:0; right:0; bottom:0; z-index:100;
        display:flex; align-items:center; justify-content:center;
        background:rgba(0,0,0,0.8); backdrop-filter:blur(5px); padding:20px;
    `;

    overlay.innerHTML = `
    <div style="background: linear-gradient(135deg, #1e293b, #0f172a); 
        border: 2px solid #3b82f6; 
        border-radius: 20px; 
        padding: 30px 24px; 
        max-width: 500px; 
        width: 100%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(37, 99, 235, 0.2);">
        
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px">
        <div style="width:50px; height:50px; border-radius:50%; 
            border: 2px solid #3b82f6;
            overflow:hidden; flex-shrink:0;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.5)">
            <img src="img2/jonjon.png" style="width:100%; height:100%; object-fit:cover" />
        </div>
            <div>
                <span style="font-weight:700; color:#60a5fa; font-size:16px">${dialogData.character}</span>
                <div style="font-size:11px; color:#64748b">Explicação dos Cálculos</div>
            </div>
        </div>
        
        <div id="practice-dialog-text" style="color:#e2e8f0; font-size:15px; line-height:1.8; min-height:80px; margin-bottom:24px; text-align:left"></div>
        
        <button id="practice-dialog-btn" style="width:100%; padding:14px; border:none; border-radius:12px; 
            background:linear-gradient(135deg, #1e3a8a, #2563eb); color:white; font-weight:700; font-size:14px; cursor:pointer;
            box-shadow:0 4px 15px rgba(37, 99, 235, 0.3)">
            Próximo
        </button>
    </div>
`;

    document.body.appendChild(overlay);

    let lineIndex = 0;
    const textEl = document.getElementById('practice-dialog-text');
    const btn = document.getElementById('practice-dialog-btn');

    function typeLine() {
        if (lineIndex >= dialogData.lines.length) {
            overlay.remove();
            callback();
            return;
        }

        const text = dialogData.lines[lineIndex];
        textEl.textContent = '';
        let i = 0;

        btn.textContent = lineIndex < dialogData.lines.length - 1 ? 'Próximo' : 'Vamos calcular! ♻️';

        const timer = setInterval(() => {
            textEl.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, 20);

        btn.onclick = () => {
            clearInterval(timer);
            lineIndex++;
            typeLine();
        };
    }

    typeLine();
}

function renderPractice() {
    const accent = currentWorld?.color || '#2563EB';
    let html = `
        <div style="text-align:center; margin-bottom:12px; font-size:12px; color:#94a3b8">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        <div style="background:#1e293b; border:1px solid #334155; border-radius:14px; padding:16px">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px; padding-bottom:12px; border-bottom:1px solid #334155">
                <span style="font-size:20px">⚡</span>
                <div>
                    <div style="font-weight:700; font-size:14px; color:white">${practiceData.title || 'Prática'}</div>
                    ${practiceData.subtitle ? `<div style="font-size:11px; color:#64748b">${practiceData.subtitle}</div>` : ''}
                </div>
            </div>
    `;

    if (practiceData.type === 'shortcut_match') {
        html += renderShortcutMatch(accent);
    } else if (practiceData.type === 'scenario') {
        html += renderScenario(accent);
    } else if (practiceData.type === 'fill_blank') {
        html += renderFillBlank(accent);
    } else if (practiceData.type === 'email_compose') {
        html += renderEmailCompose(accent);
    }

    html += '</div>';
    document.getElementById('stage-content').innerHTML = html;
}

// ─── CAIXA DE ATENÇÃO (FORMATO) ───
function formatHint(type) {
    const hints = {
        'shortcut_match': '🖱️ Clique em um ATALHO (esquerda) e depois na AÇÃO correspondente (direita).',
        'scenario': '📋 Leia a situação e escolha a MELHOR alternativa entre as opções.',
        'fill_blank': '⌨️ Digite EXATAMENTE como o sistema espera (ex: Ctrl+C, Alt+Tab). Use o formato indicado!',
        'email_compose': '📧 Preencha TODOS os campos corretamente. Email deve ter @, assunto 10+ caracteres, corpo 30+ caracteres.',
    };
    return hints[type] || '📝 Siga as instruções com atenção!';
}

// ─── SHORTCUT MATCH ───
function renderShortcutMatch(accent) {
    const pairs = practiceData.data.pairs;
    const matched = practiceState.matchAnswers || {};
    const allMatched = Object.keys(matched).length === pairs.length;

    if (allMatched) {
        const correct = pairs.filter(p => matched[p.key] === p.action).length;
        const total = pairs.length;
        const stars = Math.round((correct / total) * 5);
        return practiceComplete(stars, correct, total, accent);
    }

    // Embaralhar para mostrar
    const displayPairs = [...pairs];
    const shuffledKeys = shuffleArray(displayPairs.map(p => p.key));
    const shuffledActions = shuffleArray(displayPairs.map(p => p.action));

    return `
        ${formatBox(formatHint('shortcut_match'), 'blue')}
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px">
            <div>
                <p style="font-size:10px; color:#64748b; text-align:center; margin-bottom:8px; font-weight:700">ATALHOS</p>
                ${shuffledKeys.map(key => {
        const isMatched = !!matched[key];
        const isSelected = practiceState.selected === key;
        return `
                        <button onclick="selectMatchKey('${key}')" 
                            style="width:100%; padding:12px; margin-bottom:8px; border-radius:10px; 
                                font-family:monospace; font-weight:700; font-size:14px; transition:0.2s;
                                background:${isMatched ? '#065f46' : isSelected ? accent + '25' : '#0f172a'}; 
                                border:2px solid ${isMatched ? '#10b981' : isSelected ? accent : '#374151'};
                                color:${isMatched ? '#6ee7b7' : isSelected ? 'white' : '#cbd5e1'};
                                cursor:${isMatched ? 'default' : 'pointer'}">
                            ${key} ${isMatched ? '✓' : ''}
                        </button>
                    `;
    }).join('')}
            </div>
            <div>
                <p style="font-size:10px; color:#64748b; text-align:center; margin-bottom:8px; font-weight:700">AÇÕES</p>
                ${shuffledActions.map(action => {
        const isMatched = Object.values(matched).includes(action);
        return `
                        <button onclick="selectMatchAction('${action.replace(/'/g, "\\'")}')"
                            style="width:100%; padding:12px; margin-bottom:8px; border-radius:10px; 
                                font-weight:600; font-size:13px; transition:0.2s;
                                background:${isMatched ? '#065f46' : practiceState.selected ? '#0f172a' : '#0f172a'}; 
                                border:2px solid ${isMatched ? '#10b981' : practiceState.selected ? accent + '60' : '#374151'};
                                color:${isMatched ? '#6ee7b7' : practiceState.selected ? '#cbd5e1' : '#64748b'};
                                cursor:${isMatched || !practiceState.selected ? 'default' : 'pointer'}">
                            ${action} ${isMatched ? '✓' : ''}
                        </button>
                    `;
    }).join('')}
            </div>
        </div>
        <p style="text-align:center; color:#64748b; font-size:12px; margin-top:10px; font-weight:600">
            ${Object.keys(matched).length}/${pairs.length} associados
        </p>
    `;
}

function selectMatchKey(key) {
    if (practiceState.matchAnswers?.[key]) return;
    practiceState.selected = key;
    if (!practiceState.matchAnswers) practiceState.matchAnswers = {};
    renderPractice();
}

function selectMatchAction(action) {
    if (!practiceState.selected) return;
    if (Object.values(practiceState.matchAnswers || {}).includes(action)) return;

    if (!practiceState.matchAnswers) practiceState.matchAnswers = {};
    practiceState.matchAnswers[practiceState.selected] = action;
    practiceState.selected = null;
    renderPractice();
}

// ─── SCENARIO ───
function renderScenario(accent) {
    const scenarios = practiceData.data.scenarios;

    if (practiceState.step >= scenarios.length) {
        const correct = (practiceState.answers || []).filter(Boolean).length;
        const total = scenarios.length;
        const stars = Math.round((correct / total) * 5);
        return practiceComplete(stars, correct, total, accent);
    }

    const s = scenarios[practiceState.step];
    const answered = practiceState.answers?.[practiceState.step] !== undefined;

    return `
        ${formatBox(formatHint('scenario'), 'yellow')}
        <div style="display:flex; justify-content:space-between; align-items:center; margin:12px 0">
            <span style="color:#64748b; font-size:11px; font-weight:600">Cenário ${practiceState.step + 1} de ${scenarios.length}</span>
            <div style="display:flex; gap:4px">
                ${scenarios.map((_, i) => `<div style="width:10px; height:10px; border-radius:3px; background:${i < practiceState.step ? '#10b981' : i === practiceState.step ? accent : '#374151'}"></div>`).join('')}
            </div>
        </div>
        <div style="background:rgba(255,255,255,0.03); border:1px solid #334155; border-radius:10px; padding:14px; margin-bottom:14px">
            <p style="color:#60a5fa; font-size:10px; font-weight:700; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px">🎯 Situação Real</p>
            <p style="color:#cbd5e1; font-size:14px; line-height:1.5; font-weight:500">${s.scenario}</p>
        </div>
        <p style="color:white; font-weight:700; font-size:15px; margin-bottom:12px">${s.question}</p>
        ${s.options.map((opt, i) => {
        let bg = '#0f172a', border = '#334155', color = '#cbd5e1';
        if (answered) {
            if (i === s.correct) { bg = '#065f4620'; border = '#10b981'; color = '#6ee7b7'; }
            else if (i === practiceState.answers[practiceState.step]) { bg = '#7f1d1d20'; border = '#ef4444'; color = '#fca5a5'; }
            else { bg = '#0f172a'; border = '#1f2937'; color = '#475569'; }
        }
        return `
                <button onclick="answerScenario(${i})" ${answered ? 'disabled' : ''}
                    style="width:100%; padding:14px; margin-bottom:8px; border-radius:10px; text-align:left; transition:0.2s;
                        background:${bg}; border:2px solid ${border}; color:${color};
                        cursor:${answered ? 'default' : 'pointer'}; font-size:14px; display:flex; align-items:center; gap:10px;
                        ${!answered ? 'hover:border-' + accent : ''}">
                    <span style="width:28px; height:28px; border-radius:8px; background:${accent}20; color:${accent}; 
                        display:flex; align-items:center; justify-content:center; font-weight:800; font-size:11px; flex-shrink:0">
                        ${['A', 'B', 'C', 'D'][i]}
                    </span>
                    <span style="font-weight:500">${opt}</span>
                </button>
            `;
    }).join('')}
        ${answered ? `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:12px; border-top:1px solid #334155">
                <span style="font-weight:700; font-size:14px; color:${practiceState.answers[practiceState.step] === s.correct ? '#10b981' : '#ef4444'}">
                    ${practiceState.answers[practiceState.step] === s.correct ? '✓ Correto!' : '✗ Incorreto'}
                </span>
                <button class="dialog-btn" style="background:${accent}; padding:10px 20px" onclick="nextScenario()">
                    ${practiceState.step < scenarios.length - 1 ? 'Próximo →' : 'Ver Resultado'}
                </button>
            </div>
            ${practiceState.answers[practiceState.step] !== s.correct && s.explanation ?
                `<div style="background:#0f172a; border:1px solid #334155; border-radius:8px; padding:10px; margin-top:8px">
                    <p style="color:#94a3b8; font-size:12px">💡 ${s.explanation}</p>
                </div>` : ''}
        ` : ''}
    `;
}

function answerScenario(i) {
    if (!practiceState.answers) practiceState.answers = [];
    practiceState.answers[practiceState.step] = i;
    renderPractice();
}

function nextScenario() {
    practiceState.step++;
    renderPractice();
}

// ─── FILL BLANK ───
function renderFillBlank(accent) {
    const blanks = practiceData.data.blanks;

    if (practiceState.step >= blanks.length) {
        const correct = (practiceState.answers || []).filter((a, i) => {
            const expected = blanks[i].answer.toLowerCase().replace(/\s+/g, '');
            const given = (a || '').toLowerCase().replace(/\s+/g, '');
            return given === expected;
        }).length;
        const total = blanks.length;
        const stars = Math.round((correct / total) * 5);
        return practiceComplete(stars, correct, total, accent);
    }

    const b = blanks[practiceState.step];
    const answered = practiceState.answers?.[practiceState.step] !== undefined;
    const isCorrect = answered && (practiceState.answers[practiceState.step] || '').toLowerCase().replace(/\s+/g, '') === b.answer.toLowerCase().replace(/\s+/g, '');

    return `
        ${formatBox(formatHint('fill_blank'), 'purple')}
        <div style="display:flex; justify-content:space-between; align-items:center; margin:12px 0">
            <span style="color:#64748b; font-size:11px; font-weight:600">Questão ${practiceState.step + 1} de ${blanks.length}</span>
            <div style="display:flex; gap:4px">
                ${blanks.map((_, i) => `<div style="width:10px; height:10px; border-radius:3px; background:${i < practiceState.step ? '#10b981' : i === practiceState.step ? accent : '#374151'}"></div>`).join('')}
            </div>
        </div>
        ${practiceState.step === 0 && practiceData.data.instruction ?
            `<p style="color:#cbd5e1; font-size:13px; margin-bottom:12px">${practiceData.data.instruction}</p>` : ''}
        <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:16px; margin-bottom:12px">
            <p style="color:white; font-weight:600; font-size:14px; margin-bottom:10px">${b.prompt}</p>
            <input id="blank-input" type="text" placeholder="${b.placeholder || 'Digite sua resposta...'}"
                style="width:100%; padding:12px; background:#1e293b; border:2px solid ${answered ? (isCorrect ? '#10b981' : '#ef4444') : '#334155'}; 
                    border-radius:8px; color:white; font-size:15px; font-family:monospace; outline:none; transition:0.2s"
                value="${answered ? practiceState.answers[practiceState.step] : ''}"
                ${answered ? 'disabled' : ''}
                onkeydown="if(event.key==='Enter' && !${answered}) submitBlank()">
            ${answered ? `
                <div style="margin-top:8px; font-size:13px; font-weight:600; color:${isCorrect ? '#10b981' : '#ef4444'}">
                    ${isCorrect ? '✓ Correto!' : `✗ Incorreto. Resposta: <span style="color:#10b981; font-family:monospace">${b.answer}</span>`}
                </div>
            ` : ''}
        </div>
        ${!answered ? `
            <button class="dialog-btn" style="background:${accent}; width:100%" onclick="submitBlank()">
                Verificar Resposta
            </button>
        ` : `
            <button class="dialog-btn" style="background:${accent}; width:100%" onclick="nextBlank()">
                ${practiceState.step < blanks.length - 1 ? 'Próxima →' : 'Ver Resultado'}
            </button>
        `}
    `;
}

function submitBlank() {
    const input = document.getElementById('blank-input');
    if (!input || !input.value.trim()) return;
    if (!practiceState.answers) practiceState.answers = [];
    practiceState.answers[practiceState.step] = input.value.trim();
    renderPractice();
}

function nextBlank() {
    practiceState.step++;
    renderPractice();
}

// ─── EMAIL COMPOSE ───
function renderEmailCompose(accent) {
    if (practiceState.step > 0) {
        const stars = Math.round((practiceState.answers?.filter(Boolean).length || 0) / 3 * 5);
        return practiceComplete(stars, practiceState.answers?.filter(Boolean).length || 0, 3, accent);
    }

    return `
        ${formatBox(formatHint('email_compose'), 'green')}
        <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; padding:14px; margin:12px 0">
            <p style="color:#fbbf24; font-size:10px; font-weight:700; margin-bottom:4px">📧 CENÁRIO</p>
            <p style="color:#cbd5e1; font-size:13px">${practiceData.data.scenario}</p>
        </div>
        <div style="background:#0f172a; border:1px solid #334155; border-radius:10px; overflow:hidden">
            <div style="background:#1e293b; padding:10px 14px; border-bottom:1px solid #334155; display:flex; align-items:center; gap:6px">
                <span style="font-size:14px">📧</span>
                <span style="font-weight:700; font-size:12px; color:#94a3b8">NOVO EMAIL</span>
            </div>
            <div style="padding:14px">
                <div style="margin-bottom:10px">
                    <label style="font-size:10px; color:#64748b; font-weight:700; text-transform:uppercase">Para:</label>
                    <input id="email-to" type="text" placeholder="nome@exemplo.gov.br"
                        style="width:100%; padding:10px; background:#1e293b; border:1px solid #334155; border-radius:6px; color:white; font-size:13px; outline:none; margin-top:4px">
                </div>
                <div style="margin-bottom:10px">
                    <label style="font-size:10px; color:#64748b; font-weight:700; text-transform:uppercase">Assunto:</label>
                    <input id="email-subject" type="text" placeholder="Assunto claro e objetivo (mín. 10 caracteres)"
                        style="width:100%; padding:10px; background:#1e293b; border:1px solid #334155; border-radius:6px; color:white; font-size:13px; outline:none; margin-top:4px">
                </div>
                <div style="margin-bottom:10px">
                    <label style="font-size:10px; color:#64748b; font-weight:700; text-transform:uppercase">Mensagem:</label>
                    <textarea id="email-body" placeholder="Escreva sua mensagem de forma clara e profissional (mín. 30 caracteres)..." rows="4"
                        style="width:100%; padding:10px; background:#1e293b; border:1px solid #334155; border-radius:6px; color:white; font-size:13px; outline:none; resize:none; margin-top:4px; font-family:'Nunito',sans-serif"></textarea>
                </div>
                <button class="dialog-btn" style="background:${accent}; width:100%" onclick="submitEmail()">
                    Enviar Email ✉️
                </button>
            </div>
        </div>
    `;
}

function submitEmail() {
    const to = document.getElementById('email-to')?.value || '';
    const subject = document.getElementById('email-subject')?.value || '';
    const body = document.getElementById('email-body')?.value || '';

    let score = 0;
    if (to.includes('@') && to.length > 5) score++;
    if (subject.length >= 10) score++;
    if (body.length >= 30) score++;

    practiceState.answers = [score >= 1, score >= 2, score >= 3];
    practiceState.step = 1;
    renderPractice();
}

// ─── COMPONENTES AUXILIARES ───
function formatBox(message, color) {
    const colors = {
        blue: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
        yellow: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' },
        purple: { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)', text: '#a78bfa' },
        green: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#34d399' },
    };
    const c = colors[color] || colors.blue;
    return `
        <div style="background:${c.bg}; border:1px solid ${c.border}; border-radius:8px; padding:10px 14px; margin-bottom:8px">
            <p style="color:${c.text}; font-size:12px; font-weight:600; margin:0">💡 ${message}</p>
        </div>
    `;
}

function practiceComplete(stars, correct, total, accent) {
    return `
        <div style="text-align:center; padding:20px">
            <div style="font-size:56px; margin-bottom:12px">${stars >= 5 ? '🏆' : stars >= 3 ? '⭐' : '📚'}</div>
            <h3 style="color:white; font-size:20px; margin-bottom:8px">${stars >= 5 ? 'Perfeito!' : stars >= 3 ? 'Muito bem!' : 'Continue!'}</h3>
            <p style="color:#94a3b8; font-size:14px; margin-bottom:6px">${correct} de ${total} corretos</p>
            <div style="display:flex; justify-content:center; gap:6px; margin:16px 0">
                ${[1, 2, 3, 4, 5].map(i => `
                    <span style="font-size:40px; color:${i <= stars ? '#fbbf24' : '#374151'}; 
                        filter:${i <= stars ? 'drop-shadow(0 0 6px rgba(251,191,36,0.5))' : 'none'}">
                        ★
                    </span>
                `).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:12px 32px; font-size:14px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}

async function finishStage() {
    phase = 'complete';

    document.getElementById('timer-display').style.display = 'none';
    document.getElementById('vidas-display').style.display = 'none';

    // Estrelas do Quiz
    const pct = quizQuestions.length > 0 ? quizScore / quizQuestions.length : 0;
    const quizStars = Math.round(pct * 5);

    // Estrelas da Prática
    let practiceStars = 0;

    if (practiceData?.type === 'scenario') {
        const total = practiceData.data.scenarios.length;
        const correct = (practiceState.answers || []).filter((a, i) => a === practiceData.data.scenarios[i].correct).length;
        practiceStars = Math.round((correct / total) * 5);
    } else if (practiceData?.type === 'shortcut_match') {
        const pairs = practiceData.data.pairs;
        const total = pairs.length;
        const correct = pairs.filter(p => (practiceState.matchAnswers || {})[p.key] === p.action).length;
        practiceStars = Math.round((correct / total) * 5);
    } else if (practiceData?.type === 'fill_blank') {
        const blanks = practiceData.data.blanks;
        const total = blanks.length;
        const correct = blanks.filter((b, i) => {
            const expected = (b.answer || '').toLowerCase().replace(/\s+/g, '');
            const given = ((practiceState.answers || [])[i] || '').toLowerCase().replace(/\s+/g, '');
            return given === expected;
        }).length;
        practiceStars = Math.round((correct / total) * 5);
    } else if (practiceData?.type === 'email_compose') {
        const checks = (practiceState.answers || []);
        const correct = checks.filter(Boolean).length;
        practiceStars = Math.round((correct / 3) * 5);
    } else if (practiceData?.type === 'simulation' || practiceData?.type === 'simulation_windows' || practiceData?.type === 'simulation_excel' || practiceData?.type === 'simulation_map' || practiceData?.type === 'simulation_word' || practiceData?.type === 'simulation_norte' || practiceData?.type === 'simulation_timeline' || practiceData?.type === 'simulation_fluxo' || practiceData?.type === 'simulation_crc' || practiceData?.type === 'simulation_calculadora' || practiceData?.type === 'simulation_checklist' || practiceData?.type === 'simulation_relatorio' || practiceData?.type === 'simulation_montagem' || practiceData?.type === 'simulation_govbr' || practiceData?.type === 'simulation_trem_mapa' || practiceData?.type === 'simulation_evento' || practiceData?.type === 'simulation_desfazimento' || practiceData?.type === 'simulation_solicitacao' || practiceData?.type === 'simulation_act' || practiceData?.type === 'simulation_pixelart' || practiceData?.type === 'simulation_termo_excel' || practiceData?.type === 'simulation_prestacao' || practiceData?.type === 'simulation_corrida_crc' || practiceData?.type === 'simulation_quiz_final') {
        // Se completou a simulação, 5 estrelas
        practiceStars = 5;
        console.log('SIMULATION STARS SET TO:', practiceStars);
    }

    // Garantir mínimo de 1 estrela se fez alguma coisa
    if (practiceStars < 1 && simTaskIndex > 0) practiceStars = 1;
    if (practiceStars > 5) practiceStars = 5;

    const totalStars = Math.max(quizStars, practiceStars);

    // Salvar no banco
    const completed = [...(currentProfile.completed_stages || [])];
    if (!completed.includes(currentStage.id)) completed.push(currentStage.id);
    const ss = { ...(currentProfile.stage_stars || {}) };
    ss[currentStage.id] = Math.max(ss[currentStage.id] || 0, totalStars);
    const newScore = (currentProfile.total_score || 0) + totalStars * 100;
    const nextStage = Math.max(currentProfile.current_stage || 1, currentStage.id + 1);

    try {
        const res = await fetch(`${API}/players/${currentProfile.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed_stages: completed,
                stage_stars: ss,
                total_score: newScore,
                current_stage: nextStage
            })
        });
        currentProfile = { ...currentProfile, completed_stages: completed, stage_stars: ss, total_score: newScore, current_stage: nextStage };
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }

    if (totalStars === 5) {
        var msgVitoria = MENSAGENS_VITORIA[Math.floor(Math.random() * MENSAGENS_VITORIA.length)];
        setTimeout(function () {
            showToast(msgVitoria, 'bonus');
            tocarSom('vitoria');
        }, 500);
    }

    const accent = currentWorld?.color || '#2563EB';

    document.getElementById('stage-content').innerHTML = `
        <div class="completion-screen">
            <div class="big-emoji">${totalStars >= 5 ? '🏆' : totalStars >= 3 ? '⭐' : '📚'}</div>
            <h2>Fase Concluída!</h2>
            <p style="color:#94a3b8; margin-bottom:4px; font-size:16px">${currentStage.name}</p>
            <div class="stars-display" style="gap:6px">
                ${[1, 2, 3, 4, 5].map(i => `
                    <span style="font-size:44px; color:${i <= totalStars ? '#fbbf24' : '#334155'}; filter:${i <= totalStars ? 'drop-shadow(0 0 8px rgba(251,191,36,0.6))' : 'none'}">
                        ★
                    </span>
                `).join('')}
            </div>
            <div style="background:#0f172a; border:1px solid #334155; border-radius:12px; padding:16px; margin:20px 0; text-align:left">
                <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:15px">
                    <span style="color:#94a3b8">Quiz</span>
                    <span>${'★'.repeat(quizStars)}${'☆'.repeat(5 - quizStars)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:8px 0; border-top:1px solid #334155; margin-top:4px; font-size:15px">
                    <span style="color:#94a3b8">Prática</span>
                    <span>${'★'.repeat(practiceStars)}${'☆'.repeat(5 - practiceStars)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-top:12px; margin-top:8px; border-top:1px solid #334155">
                    <span style="font-weight:700; color:white; font-size:16px">Total</span>
                    <span style="font-weight:700; font-size:22px; color:${accent}">+${totalStars * 100} pts</span>
                </div>
            </div>
            <div class="completion-actions">
                <button style="background:#334155; padding:14px 28px; border-radius:12px; border:none; font-weight:700; font-size:15px; cursor:pointer; color:white" onclick="backToWorld()">← Mapa</button>
                <button style="background:${accent}; padding:14px 28px; border-radius:12px; border:none; font-weight:700; font-size:15px; cursor:pointer; color:white" onclick="nextStage()">Próxima →</button>
            </div>
        </div>
    `;

    if (currentStage && currentStage.id === 30) {
        setTimeout(function () {
            showWelcomeDialogFinal();
        }, 2000);
    }
}


// ═══════════════════════════════════════════════════════════
// AVATAR COMPLETO
// ═══════════════════════════════════════════════════════════

const SKIN_TONES = [
    { id: 'light', color: '#FDDBB4', label: 'Clara' },
    { id: 'medium', color: '#D4956A', label: 'Média' },
    { id: 'dark', color: '#7C4A2D', label: 'Escura' },
    { id: 'olive', color: '#C8A97A', label: 'Oliva' },
];

const HAIR_COLORS = ['#2C1810', '#3D2B1F', '#8B4513', '#C8860A', '#F5E6CA', '#FFD700', '#1A1A2E', '#DC143C', '#4169E1', '#2D5A1B'];
const TOP_COLORS = ['#2563EB', '#DC2626', '#059669', '#7C3AED', '#D97706', '#0891B2', '#DB2777', '#374151'];
const BOTTOM_COLORS = ['#1E40AF', '#7C3AED', '#065F46', '#831843', '#374151', '#1E3A5F', '#4C1D95', '#064E3B'];

const HAIR_STYLES_MALE = [
    { id: 'short', label: 'Curto' },
    { id: 'curly', label: 'Cacheado' },
    { id: 'shaved', label: 'Raspado' },
];

const HAIR_STYLES_FEMALE = [
    { id: 'long', label: 'Longo' },
    { id: 'curly', label: 'Cacheado' },
    { id: 'bun', label: 'Coque' },
];

const ACCESSORIES = [
    { id: 'none', label: 'Nenhum', emoji: '🚫' },
    { id: 'cap', label: 'Boné', emoji: '🧢' },
    { id: 'hat', label: 'Chapéu', emoji: '🎩' },
    { id: 'glasses', label: 'Óculos', emoji: '👓' },
    { id: 'sunglasses', label: 'Sol', emoji: '🕶️' },
    { id: 'headband', label: 'Faixa', emoji: '🎀' },
];

const AVATAR_TABS = ['gender', 'skin', 'hair', 'hairCol', 'top', 'bottom', 'accessories'];
const AVATAR_LABELS = ['Gênero', 'Tom de Pele', 'Cabelo', 'Cor Cabelo', 'Roupa Superior', 'Roupa Inferior', 'Acessórios'];

function initAvatar() {
    if (currentProfile?.avatar_config) avatarConfig = { ...DEFAULT_AVATAR, ...currentProfile.avatar_config };
    avatarTab = 'gender';
    drawFullAvatar('avatar-canvas', 80, 120, avatarConfig);
    renderAvatarTabs();
    renderAvatarOptions();
}

function renderAvatarTabs() {
    document.getElementById('avatar-tabs').innerHTML = AVATAR_TABS.map((t, i) => `
        <button class="${avatarTab === t ? 'active' : ''}" onclick="avatarTab='${t}'; renderAvatarTabs(); renderAvatarOptions()">
            ${AVATAR_LABELS[i]}
        </button>
    `).join('');
}

function renderAvatarOptions() {
    const container = document.getElementById('avatar-options');
    let html = '';
    const isFemale = avatarConfig.gender === 'female';
    const hairStyles = isFemale ? HAIR_STYLES_FEMALE : HAIR_STYLES_MALE;

    switch (avatarTab) {
        case 'gender':
            container.style.gridTemplateColumns = 'repeat(2, 1fr)';
            html = [
                { val: 'male', emoji: '👨', label: 'Masculino' },
                { val: 'female', emoji: '👩', label: 'Feminino' }
            ].map(g => `
                <button class="avatar-opt ${avatarConfig.gender === g.val ? 'selected' : ''}" 
                    onclick="avatarConfig.gender='${g.val}'; avatarConfig.hairStyle='${g.val === 'female' ? 'long' : 'short'}'; renderAvatarTabs(); renderAvatarOptions(); drawFullAvatar('avatar-canvas',80,120,avatarConfig)">
                    <span style="font-size:28px">${g.emoji}</span>
                    <span style="font-size:11px; font-weight:600; margin-top:4px">${g.label}</span>
                </button>
            `).join('');
            break;

        case 'skin':
            container.style.gridTemplateColumns = 'repeat(4, 1fr)';
            html = SKIN_TONES.map(s => `
                <button class="avatar-opt ${avatarConfig.skinTone === s.id ? 'selected' : ''}" 
                    onclick="avatarConfig.skinTone='${s.id}'; renderAvatarOptions(); drawFullAvatar('avatar-canvas',80,120,avatarConfig)">
                    <div class="color-swatch" style="background:${s.color}"></div>
                    <span style="font-size:9px; font-weight:600; margin-top:4px">${s.label}</span>
                </button>
            `).join('');
            break;

        case 'hair':
            container.style.gridTemplateColumns = 'repeat(3, 1fr)';
            html = hairStyles.map(s => `
                <button class="avatar-opt ${avatarConfig.hairStyle === s.id ? 'selected' : ''}" 
                    onclick="avatarConfig.hairStyle='${s.id}'; renderAvatarOptions(); drawFullAvatar('avatar-canvas',80,120,avatarConfig)">
                    <span style="font-size:11px; font-weight:600">${s.label}</span>
                </button>
            `).join('');
            break;

        case 'hairCol':
            container.style.gridTemplateColumns = 'repeat(5, 1fr)';
            html = HAIR_COLORS.map(c => `
                <button class="avatar-opt ${avatarConfig.hairColor === c ? 'selected' : ''}" 
                    onclick="avatarConfig.hairColor='${c}'; renderAvatarOptions(); drawFullAvatar('avatar-canvas',80,120,avatarConfig)">
                    <div class="color-swatch" style="background:${c}"></div>
                </button>
            `).join('');
            break;

        case 'top':
            container.style.gridTemplateColumns = 'repeat(4, 1fr)';
            html = TOP_COLORS.map(c => `
                <button class="avatar-opt ${avatarConfig.topColor === c ? 'selected' : ''}" 
                    onclick="avatarConfig.topColor='${c}'; renderAvatarOptions(); drawFullAvatar('avatar-canvas',80,120,avatarConfig)">
                    <div class="color-swatch" style="background:${c}"></div>
                </button>
            `).join('');
            break;

        case 'bottom':
            container.style.gridTemplateColumns = 'repeat(4, 1fr)';
            html = BOTTOM_COLORS.map(c => `
                <button class="avatar-opt ${avatarConfig.bottomColor === c ? 'selected' : ''}" 
                    onclick="avatarConfig.bottomColor='${c}'; renderAvatarOptions(); drawFullAvatar('avatar-canvas',80,120,avatarConfig)">
                    <div class="color-swatch" style="background:${c}"></div>
                </button>
            `).join('');
            break;

        case 'accessories':
            container.style.gridTemplateColumns = 'repeat(3, 1fr)';
            html = ACCESSORIES.map(a => `
                <button class="avatar-opt ${(avatarConfig.accessory || 'none') === a.id ? 'selected' : ''}" 
                    onclick="avatarConfig.accessory='${a.id}'; renderAvatarOptions(); drawFullAvatar('avatar-canvas',80,120,avatarConfig)">
                    <span style="font-size:22px">${a.emoji}</span>
                    <span style="font-size:9px; font-weight:600; margin-top:2px">${a.label}</span>
                </button>
            `).join('');
            break;
    }

    container.innerHTML = html;
}

async function saveAvatar() {
    try {
        await fetch(`${API}/players/${currentProfile.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar_config: avatarConfig })
        });
        currentProfile.avatar_config = avatarConfig;
        showScreen('menu-screen');
    } catch (e) {
        alert('Erro ao salvar avatar. Tente novamente.');
    }
}

// ─── DESENHO DO AVATAR COMPLETO ───
function drawFullAvatar(canvasId, w, h, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;

    const skinColors = { light: '#FDDBB4', medium: '#D4956A', dark: '#7C4A2D', olive: '#C8A97A' };
    const skin = skinColors[config.skinTone] || '#D4956A';
    const isFemale = config.gender === 'female';
    const scale = w / 60;
    const hair = config.hairColor || '#2C1810';
    const top = config.topColor || '#2563EB';
    const bottom = config.bottomColor || (isFemale ? '#7C3AED' : '#1E40AF');

    ctx.save();
    ctx.scale(scale, scale);

    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(30, 68, 12, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    if (isFemale) {
        // FEMININO
        // Vestido/Saia
        ctx.fillStyle = bottom;
        ctx.beginPath();
        ctx.moveTo(17, 48);
        ctx.lineTo(13, 68);
        ctx.lineTo(47, 68);
        ctx.lineTo(43, 48);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.moveTo(19, 50);
        ctx.lineTo(16, 66);
        ctx.lineTo(21, 66);
        ctx.lineTo(21, 50);
        ctx.fill();

        // Blusa
        ctx.fillStyle = top;
        ctx.fillRect(17, 36, 26, 14);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(18, 37, 7, 3);

        // Braços
        ctx.fillStyle = top;
        ctx.fillRect(9, 38, 9, 12);
        ctx.fillRect(42, 38, 9, 12);

        // Mãos
        ctx.fillStyle = skin;
        ctx.beginPath();
        ctx.ellipse(13.5, 51, 4, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(46.5, 51, 4, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pescoço
        ctx.fillStyle = skin;
        ctx.fillRect(26, 31, 8, 6);

        // Cabeça
        ctx.fillStyle = skin;
        ctx.beginPath();
        ctx.ellipse(30, 22, 13, 13.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.ellipse(25, 16, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cabelo (feminino)
        ctx.fillStyle = hair;
        if (config.hairStyle === 'curly') {
            ctx.beginPath();
            ctx.ellipse(30, 11, 14, 9, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(20, 12, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(40, 12, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(16, 15, 5, 16);
            ctx.fillRect(39, 15, 5, 16);
        } else if (config.hairStyle === 'bun') {
            ctx.beginPath();
            ctx.ellipse(30, 12, 13, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(30, 4, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(17, 15, 4, 10);
            ctx.fillRect(39, 15, 4, 10);
        } else {
            // Longo
            ctx.beginPath();
            ctx.ellipse(30, 11, 14, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(16, 14, 5, 18);
            ctx.fillRect(39, 14, 5, 18);
        }

        // Olhos
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(24, 23, 3.2, 3.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(36, 23, 3.2, 3.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(24.5, 23.5, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(36.5, 23.5, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(25, 22.5, 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(37, 22.5, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Sobrancelhas
        ctx.strokeStyle = hair;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(21, 20);
        ctx.quadraticCurveTo(24, 17.5, 27, 19);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(33, 19);
        ctx.quadraticCurveTo(36, 17.5, 39, 20);
        ctx.stroke();

        // Nariz
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(29, 26);
        ctx.quadraticCurveTo(30, 28, 31, 26);
        ctx.stroke();

        // Boca
        ctx.strokeStyle = '#c06080';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(30, 30, 4, 0.1, Math.PI - 0.1);
        ctx.stroke();

        // Blush
        ctx.fillStyle = 'rgba(255,150,150,0.3)';
        ctx.beginPath();
        ctx.ellipse(20, 27, 3.5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(40, 27, 3.5, 2, 0, 0, Math.PI * 2);
        ctx.fill();

    } else {
        // MASCULINO
        // Calças
        ctx.fillStyle = bottom;
        ctx.fillRect(18, 50, 10, 16);
        ctx.fillRect(32, 50, 10, 16);

        // Sapatos
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.ellipse(23, 67, 6, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(37, 67, 6, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cinto
        ctx.fillStyle = '#2c1810';
        ctx.fillRect(17, 48, 26, 3);

        // Camisa
        ctx.fillStyle = top;
        ctx.fillRect(17, 35, 26, 14);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(18, 36, 7, 3);

        // Braços
        ctx.fillStyle = top;
        ctx.fillRect(8, 36, 10, 13);
        ctx.fillRect(42, 36, 10, 13);

        // Mãos
        ctx.fillStyle = skin;
        ctx.beginPath();
        ctx.ellipse(13, 50, 5, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(47, 50, 5, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pescoço
        ctx.fillStyle = skin;
        ctx.fillRect(25, 30, 10, 6);

        // Cabeça
        ctx.fillStyle = skin;
        ctx.beginPath();
        ctx.ellipse(30, 21, 14, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.beginPath();
        ctx.ellipse(24, 14, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cabelo (masculino)
        ctx.fillStyle = hair;
        if (config.hairStyle === 'curly') {
            ctx.beginPath();
            ctx.ellipse(30, 10, 14, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(22, 10, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(38, 10, 4, 0, Math.PI * 2);
            ctx.fill();
        } else if (config.hairStyle === 'shaved') {
            ctx.fillStyle = hair;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.ellipse(30, 11, 14, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        } else {
            // Curto
            ctx.beginPath();
            ctx.ellipse(30, 10, 14, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            ctx.beginPath();
            ctx.moveTo(16, 13);
            ctx.quadraticCurveTo(22, 9, 30, 11);
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Olhos
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(23.5, 21, 3.2, 3.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(36.5, 21, 3.2, 3.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(24, 21.5, 1.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(37, 21.5, 1.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(24.5, 20.8, 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(37.5, 20.8, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Sobrancelhas
        ctx.strokeStyle = hair;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20.5, 17.5);
        ctx.quadraticCurveTo(24, 15.5, 27, 17);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(33, 17);
        ctx.quadraticCurveTo(36, 15.5, 39.5, 17.5);
        ctx.stroke();

        // Nariz
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(28.5, 24.5);
        ctx.quadraticCurveTo(30, 26, 31.5, 24.5);
        ctx.stroke();

        // Boca
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(30, 28, 5, 0.1, Math.PI - 0.1);
        ctx.stroke();
    }

    // ─── ACESSÓRIOS ───
    const acc = config.accessory || 'none';

    if (acc === 'cap') {
        ctx.fillStyle = '#1e3a5f';
        ctx.beginPath();
        ctx.ellipse(30, 8, 14, 4, 0, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(16, 5, 28, 8);
        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(13, 11, 8, 2.5);
    } else if (acc === 'hat') {
        ctx.fillStyle = '#222';
        ctx.fillRect(20, 1, 20, 12);
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(12, 12, 36, 3);
        ctx.fillStyle = '#7c3aed';
        ctx.globalAlpha = 0.8;
        ctx.fillRect(20, 9, 20, 3);
        ctx.globalAlpha = 1;
    } else if (acc === 'glasses') {
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(17, 20, 10, 7);
        ctx.strokeRect(33, 20, 10, 7);
        ctx.fillStyle = 'rgba(147,197,253,0.25)';
        ctx.fillRect(17, 20, 10, 7);
        ctx.fillRect(33, 20, 10, 7);
        ctx.beginPath();
        ctx.moveTo(27, 23);
        ctx.lineTo(33, 23);
        ctx.stroke();
    } else if (acc === 'sunglasses') {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(17, 19, 10, 7);
        ctx.fillRect(33, 19, 10, 7);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(17, 19, 10, 7);
        ctx.strokeRect(33, 19, 10, 7);
        ctx.beginPath();
        ctx.moveTo(27, 22);
        ctx.lineTo(33, 22);
        ctx.stroke();
    } else if (acc === 'headband') {
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(17, 15);
        ctx.quadraticCurveTo(30, 9, 43, 15);
        ctx.stroke();
    }

    ctx.restore();
}

// Versão simplificada para o menu
function drawAvatar(canvasId, w, h, config) {
    drawFullAvatar(canvasId, w, h, config);
}

// ═══════════════════════════════════════════════════════════
// RANKING
// ═══════════════════════════════════════════════════════════
async function loadRanking() {
    const list = document.getElementById('ranking-list');
    
    const acessoAutorizado = sessionStorage.getItem('ranking_autorizado') === 'true';
    
    if (!acessoAutorizado) {
        list.innerHTML = `
            <div style="text-align:center; padding:60px 20px">
                <div style="font-size:100px; margin-bottom:5px; animation: float 2s ease-in-out infinite; filter:drop-shadow(0 0 10px rgba(251,191,36,0.5))">🕵️‍♂️</div>
                <div style="font-size:22px; font-weight:900; background:linear-gradient(135deg, #fbbf24, #ef4444); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:5px">TE PEGUEI!</div>
                <div style="font-size:14px; color:#94a3b8; margin-bottom:20px">Veio curiar aqui né?</div>
                <div style="background:#1e293b; border:1px solid #334155; border-radius:16px; padding:20px; max-width:300px; margin:0 auto">
                    <div style="font-size:14px; color:#93c5fd; margin-bottom:15px">🔒 RANKING BLOQUEADO 🔒</div>
                    <input type="password" id="senha-ranking" placeholder="Digite a senha secreta" style="width:100%; padding:12px; border-radius:10px; background:#0f172a; border:1px solid #3b82f6; color:white; text-align:center; font-size:14px; margin-bottom:12px; outline:none">
                    <button onclick="verificarSenhaRanking()" style="background:linear-gradient(135deg, #1e3a8a, #2563eb); border:none; padding:12px 20px; border-radius:10px; color:white; font-weight:700; cursor:pointer; width:100%">🔓 DESBLOQUEAR</button>
                </div>
                <div style="margin-top:25px">
                    <button onclick="showScreen('menu-screen')" style="background:#334155; border:none; padding:10px 24px; border-radius:10px; color:white; font-weight:700; cursor:pointer">← Voltar</button>
                </div>
                <div style="margin-top:20px; font-size:10px; color:#475569">💡 A senha está com o criador...</div>
            </div>
        `;
        return;
    }
    
    // Ranking normal (autenticado)
    try {
        const res = await fetch(`${API}/players`);
        const players = await res.json();
        if (!players || players.length === 0) {
            list.innerHTML = `<div style="text-align:center; padding:40px">🏆 Nenhum herói ainda!</div>`;
            return;
        }
        const emojis = ['🥇', '🥈', '🥉'];
        list.innerHTML = players.map((p, i) => {
            const stars = Object.values(p.stage_stars || {}).reduce((a, b) => a + b, 0);
            const completed = (p.completed_stages || []).length;
            return `<div class="ranking-item"><div class="ranking-pos">${i < 3 ? emojis[i] : `#${i+1}`}</div><div style="flex:1"><div style="font-weight:600">${p.display_name}</div><div style="font-size:11px; color:#94a3b8">⭐ ${stars} | 🏁 ${completed}/30</div></div><div style="font-weight:700; color:#60a5fa">⚡ ${p.total_score || 0}</div></div>`;
        }).join('');
    } catch(e) {
        list.innerHTML = `<div style="text-align:center; padding:40px; color:#ef4444">Erro ao carregar ranking</div>`;
    }
}

function verificarSenhaRanking() {
    const senha = document.getElementById('senha-ranking')?.value;
    const SENHA_CORRETA = "1984"; // 🔥 MUDE AQUI
    
    if (senha === SENHA_CORRETA) {
        sessionStorage.setItem('ranking_autorizado', 'true');
        loadRanking();
        showToast("🔓 Ranking desbloqueado! Bem-vindo, criador!", "bonus");
    } else {
        showToast("❌ Senha errada! Acesso negado, curioso.", "error");
        document.getElementById('senha-ranking').value = '';
    }
}
// ═══════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════
function loadSettings() {
    document.getElementById('settings-name').textContent = currentProfile?.display_name || currentUser?.name || 'Jogador';
    document.getElementById('settings-email').textContent = currentUser?.email || '';
}

function logout() {
    currentUser = null;
    currentProfile = null;
    localStorage.removeItem('infoquest_user');
    showScreen('login-screen');
}

// ═══════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('infoquest_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        showScreen('menu-screen');
    } else {
        showScreen('login-screen');
    }
    setupSoundButton();
});

// Animação de float
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
    }
    @keyframes ping {
        0% { transform: scale(1); opacity: 0.4; }
        100% { transform: scale(2.5); opacity: 0; }
    }
    .color-swatch {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.1);
    }
    .avatar-opt {
        aspect-ratio: 1;
        border-radius: 10px;
        border: 2px solid #334155;
        cursor: pointer;
        transition: 0.2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.03);
        color: #94a3b8;
        font-family: 'Nunito', sans-serif;
        padding: 8px;
    }
    .avatar-opt:hover {
        border-color: #64748b;
    }
    .avatar-opt.selected {
        border-color: #3b82f6;
        background: rgba(37,99,235,0.15);
        color: white;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Ampliar imagem ao clicar
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && e.target.closest('.quiz-body')) {
        const imgSrc = e.target.src;
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top:0; left:0; right:0; bottom:0;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
        overlay.innerHTML = `<img src="${imgSrc}" style="max-width:90%; max-height:90%; border-radius:16px; box-shadow:0 0 50px rgba(0,0,0,0.5)">`;
        overlay.onclick = () => overlay.remove();
        document.body.appendChild(overlay);
    }
});

// ═══════════════════════════════════════════════════════════
// MODO TESTE - Pular para qualquer fase
// ═══════════════════════════════════════════════════════════
document.addEventListener('keydown', function (e) {
    // Pressione Ctrl + número da fase para testar
    if (e.ctrlKey && e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        const stageNum = parseInt(e.key);
        if (stageNum >= 1 && stageNum <= 30) {
            // Cria perfil fake se não existir
            if (!currentProfile) {
                currentProfile = {
                    id: 999,
                    user_email: 'teste@teste.com',
                    display_name: 'Testador',
                    total_score: 0,
                    current_stage: stageNum,
                    completed_stages: [],
                    stage_stars: {},
                    avatar_config: DEFAULT_AVATAR
                };
                currentUser = { id: 999, email: 'teste@teste.com', name: 'Testador' };
                currentWorld = getWorldById(Math.ceil(stageNum / 10));
            }
            // Vai direto pra fase
            currentWorld = getWorldById(Math.ceil(stageNum / 10));
            startStage(stageNum);
            showScreen('stage-screen');
            console.log('🧪 MODO TESTE: Fase ' + stageNum);
        }
    }

    // Ctrl+Shift+P para pular o quiz e ir direto pra prática
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        if (phase === 'quiz') {
            quizScore = quizQuestions.length; // Acerta tudo
            startPractice();
            console.log('🧪 Quiz pulado! Indo pra prática...');
        }
    }

    // Ctrl+Shift+F para finalizar fase atual
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        if (currentStage) {
            quizScore = quizQuestions.length || 5;
            window._practiceStars = 5;
            practiceData = { type: 'simulation' };
            simCompleted = true;
            finishStage();
            console.log('🧪 Fase finalizada!');
        }
    }
});
