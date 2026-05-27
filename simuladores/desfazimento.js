// ═══════════════════════════════════════════════════════════
// SIMULADOR LABIRINTO DO DESFAZIMENTO + ETAPAS EMBARALHADAS
// ═══════════════════════════════════════════════════════════

let desfazState = {};

function startDesfazSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    
    // Reseta o estado
    desfazState = {
        etapaAtual: 0,
        acertos: 0,
        mostrarFeedback: false,
        mensagemFeedback: '',
        erroFeedback: false,
        modoLabirinto: true,
        etapasEmbaralhadas: [],
        ordemCorreta: ["Órgão Público", "Caminhão", "CRC", "Caminhão", "PID", "Comunidade"],
        respostasEtapas: []
    };
    
    // Embaralha as etapas
    desfazState.etapasEmbaralhadas = [...desfazState.ordemCorreta];
    for (var i = desfazState.etapasEmbaralhadas.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [desfazState.etapasEmbaralhadas[i], desfazState.etapasEmbaralhadas[j]] = [desfazState.etapasEmbaralhadas[j], desfazState.etapasEmbaralhadas[i]];
    }
    
    renderDesfazLabirinto(accent);
}

function getIconeEtapa(etapa) {
    var icones = {
        "Órgão Público": "🏢",
        "Caminhão": "🚛",
        "CRC": "🔧",
        "PID": "📚",
        "Comunidade": "👥"
    };
    return icones[etapa] || "📦";
}

function renderDesfazLabirinto(accent) {
    // Se completou o labirinto, vai para a parte de etapas embaralhadas
    if (!desfazState.modoLabirinto || desfazState.etapaAtual >= 5) {
        renderEtapasEmbaralhadas(accent);
        return;
    }
    
    var content = document.getElementById('stage-content');
    
    // Dados das perguntas do labirinto
    var perguntas = [
        {
            pergunta: "📦 O equipamento está quebrado ou funcionando?",
            opcoes: [
                { texto: "Funcionando perfeitamente", correto: false, mensagem: "Equipamento funcionando NÃO precisa de desfazimento! Ele pode ser reutilizado diretamente ou doado." },
                { texto: "Quebrado / Inservível", correto: true, mensagem: "Correto! Equipamento quebrado entra no processo de desfazimento." }
            ]
        },
        {
            pergunta: "📋 O equipamento tem documentação completa?",
            opcoes: [
                { texto: "Sim, toda documentação está OK", correto: true, mensagem: "Documentação correta! O processo pode prosseguir." },
                { texto: "Não, falta documentação", correto: false, mensagem: "SEM DOCUMENTAÇÃO! Não é possível dar baixa no patrimônio." },
                { texto: "Tenho só parte dela", correto: false, mensagem: "DOCUMENTAÇÃO INCOMPLETA! Regularize antes de prosseguir." }
            ]
        },
        {
            pergunta: "🚛 Para onde o equipamento deve ser enviado primeiro?",
            opcoes: [
                { texto: "Direto para o PID", correto: false, mensagem: "ERRO! Equipamento quebrado precisa ir primeiro para o CRC." },
                { texto: "Para o CRC (Centro de Recondicionamento)", correto: true, mensagem: "Correto! Primeiro o equipamento vai para o CRC." },
                { texto: "Direto para o descarte", correto: false, mensagem: "ERRO! Equipamentos recuperáveis não devem ir direto para descarte." }
            ]
        },
        {
            pergunta: "🔧 Após o recondicionamento no CRC, o equipamento...",
            opcoes: [
                { texto: "Vai direto para a comunidade", correto: false, mensagem: "CUIDADO! Precisa ir para um PID primeiro." },
                { texto: "Volta para o órgão doador", correto: false, mensagem: "Não! O equipamento já foi dado como desfazido." },
                { texto: "É destinado a um PID (Ponto de Inclusão Digital)", correto: true, mensagem: "Correto! O PID recebe o equipamento." }
            ]
        },
        {
            pergunta: "🏫 O que é um PID?",
            opcoes: [
                { texto: "Programa de Inclusão Digital", correto: false, mensagem: "PID = PONTO de Inclusão Digital (o local físico)." },
                { texto: "Ponto de Inclusão Digital (escola, telecentro, ONG)", correto: true, mensagem: "Correto! PID é o local onde a comunidade acessa os computadores." },
                { texto: "Processo de Inclusão Digital", correto: false, mensagem: "PID é o PONTO (local físico), não o processo." }
            ]
        }
    ];
    
    var perguntaAtual = perguntas[desfazState.etapaAtual];
    var porcentagem = ((desfazState.etapaAtual) / perguntas.length) * 100;
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:10px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:#1e293b; border-radius:10px; padding:12px 16px; margin-bottom:16px; border:1px solid #334155">';
    html += '<div style="display:flex; justify-content:space-between; margin-bottom:8px">';
    html += '<span style="color:#93c5fd; font-size:12px; font-weight:700">📊 LABIRINTO DO DESFAZIMENTO</span>';
    html += '<span style="color:#fbbf24; font-size:12px; font-weight:700">' + desfazState.acertos + '/' + perguntas.length + ' acertos</span>';
    html += '</div>';
    html += '<div style="height:6px; background:#334155; border-radius:3px; overflow:hidden">';
    html += '<div style="width:' + porcentagem + '%; height:100%; background:linear-gradient(90deg, #10b981, #34d399); border-radius:3px; transition:0.3s"></div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div style="background:linear-gradient(135deg, #1e293b, #0f172a); border:2px solid ' + accent + '50; border-radius:16px; padding:24px; margin-bottom:16px">';
    html += '<div style="display:flex; align-items:center; gap:10px; margin-bottom:20px">';
    html += '<div style="background:' + accent + '; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px">❓</div>';
    html += '<div style="font-weight:700; font-size:16px; color:white">Pergunta ' + (desfazState.etapaAtual + 1) + ' de ' + perguntas.length + '</div>';
    html += '</div>';
    
    html += '<div style="font-size:18px; margin-bottom:24px; color:white; font-weight:600">' + perguntaAtual.pergunta + '</div>';
    
    for (var i = 0; i < perguntaAtual.opcoes.length; i++) {
        var opt = perguntaAtual.opcoes[i];
        html += '<button class="quiz-option" onclick="responderDesfazLabirinto(' + i + ')" style="width:100%; padding:14px 18px; margin-bottom:10px; font-size:14px; text-align:left; display:flex; align-items:center; gap:12px; background:#0f172a; border:2px solid #334155; border-radius:10px; color:#cbd5e1; cursor:pointer">';
        html += '<span style="width:30px; height:30px; border-radius:8px; background:' + accent + '20; color:' + accent + '; display:flex; align-items:center; justify-content:center; font-weight:800">' + String.fromCharCode(65 + i) + '</span>';
        html += '<span style="flex:1">' + opt.texto + '</span>';
        html += '</button>';
    }
    
    html += '</div>';
    
    if (desfazState.mostrarFeedback) {
        var corFeedback = desfazState.erroFeedback ? '#ef4444' : '#10b981';
        html += '<div style="background:' + corFeedback + '20; border:2px solid ' + corFeedback + '; border-radius:12px; padding:14px; margin-top:8px">';
        html += '<div style="display:flex; gap:10px; align-items:center">';
        html += '<span style="font-size:24px">' + (desfazState.erroFeedback ? '❌' : '✅') + '</span>';
        html += '<div><span style="font-weight:700; color:' + corFeedback + '">' + (desfazState.erroFeedback ? 'ERROU!' : 'ACERTOU!') + '</span><br>';
        html += '<span style="font-size:13px; color:' + corFeedback + '">' + desfazState.mensagemFeedback + '</span></div>';
        html += '</div>';
        html += '<button onclick="proximoDesfazLabirinto()" style="background:' + corFeedback + '; margin-top:12px; width:100%; padding:10px; border:none; border-radius:8px; color:white; font-weight:700; cursor:pointer">Continuar →</button>';
        html += '</div>';
    }
    
    html += '<div style="text-align:center; margin-top:16px; font-size:11px; color:#64748b">⚠️ Cada erro te leva a um beco sem saída! Pense com cuidado.</div>';
    
    content.innerHTML = html;
}

function responderDesfazLabirinto(opcaoIndex) {
    if (simLocked) return;
    if (desfazState.mostrarFeedback) return;
    
    var respostasCorretas = [1, 0, 1, 2, 1];
    
    var mensagens = [
        ["❌ Equipamento funcionando NÃO precisa de desfazimento!", "✅ Correto! Equipamento quebrado entra no processo."],
        ["✅ Documentação correta! O processo pode prosseguir.", "❌ SEM DOCUMENTAÇÃO! Não é possível dar baixa.", "❌ DOCUMENTAÇÃO INCOMPLETA! Regularize antes."],
        ["❌ ERRO! Equipamento quebrado precisa ir primeiro para o CRC.", "✅ Correto! Primeiro o equipamento vai para o CRC.", "❌ ERRO! Equipamentos recuperáveis não devem ir direto para descarte."],
        ["❌ CUIDADO! Precisa ir para um PID primeiro.", "❌ Não! O equipamento já foi dado como desfazido.", "✅ Correto! O PID recebe o equipamento."],
        ["❌ PID = PONTO de Inclusão Digital (o local físico).", "✅ Correto! PID é o local onde a comunidade acessa.", "❌ PID é o PONTO (local físico), não o processo."]
    ];
    
    var isCorrect = (opcaoIndex === respostasCorretas[desfazState.etapaAtual]);
    
    desfazState.mostrarFeedback = true;
    desfazState.mensagemFeedback = mensagens[desfazState.etapaAtual][opcaoIndex];
    
    if (isCorrect) {
        desfazState.acertos++;
        desfazState.erroFeedback = false;
    } else {
        desfazState.erroFeedback = true;
    }
    
    simLocked = true;
    renderDesfazLabirinto(currentWorld?.color || '#2563EB');
}

function proximoDesfazLabirinto() {
    if (!simLocked) return;
    
    // Se errou, reseta o feedback mas fica na mesma pergunta
    if (desfazState.erroFeedback) {
        desfazState.mostrarFeedback = false;
        simLocked = false;
        renderDesfazLabirinto(currentWorld?.color || '#2563EB');
        return;
    }
    
    // Verifica se é a última pergunta (índice 4)
    if (desfazState.etapaAtual >= 4) {
        // Última pergunta acertada - vai para etapas embaralhadas
        desfazState.modoLabirinto = false;
        desfazState.mostrarFeedback = false;
        simLocked = false;
        
        // Reseta as etapas
        desfazState.etapasEmbaralhadas = [...desfazState.ordemCorreta];
        for (var i = desfazState.etapasEmbaralhadas.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [desfazState.etapasEmbaralhadas[i], desfazState.etapasEmbaralhadas[j]] = [desfazState.etapasEmbaralhadas[j], desfazState.etapasEmbaralhadas[i]];
        }
        desfazState.respostasEtapas = [];
        
        renderEtapasEmbaralhadas(currentWorld?.color || '#2563EB');
        return;
    }
    
    // Avança para a próxima pergunta
    desfazState.etapaAtual++;
    desfazState.mostrarFeedback = false;
    simLocked = false;
    renderDesfazLabirinto(currentWorld?.color || '#2563EB');
}

function renderEtapasEmbaralhadas(accent) {
    simLocked = false;
    var content = document.getElementById('stage-content');
    
    var ordemCorreta = ["Órgão Público", "Caminhão", "CRC", "Caminhão", "PID", "Comunidade"];
    
    // Se não tem etapas embaralhadas, cria
    if (desfazState.etapasEmbaralhadas.length === 0) {
        desfazState.etapasEmbaralhadas = [...ordemCorreta];
        for (var i = desfazState.etapasEmbaralhadas.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [desfazState.etapasEmbaralhadas[i], desfazState.etapasEmbaralhadas[j]] = [desfazState.etapasEmbaralhadas[j], desfazState.etapasEmbaralhadas[i]];
        }
    }
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:10px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:linear-gradient(135deg, #1e293b, #0f172a); border:2px solid ' + accent + '50; border-radius:16px; padding:20px; margin-bottom:16px">';
    html += '<div style="display:flex; align-items:center; gap:10px; margin-bottom:16px">';
    html += '<div style="background:#10b981; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px">✅</div>';
    html += '<div><span style="font-weight:700; font-size:16px; color:white">LABIRINTO CONCLUÍDO!</span><br><span style="font-size:12px; color:#94a3b8">Agora organize as etapas na ordem correta do processo de desfazimento</span></div>';
    html += '</div>';
    html += '</div>';
    
    // ETAPAS DISPONÍVEIS
    html += '<div style="margin-bottom:16px">';
    html += '<div style="color:#93c5fd; font-size:12px; font-weight:700; margin-bottom:8px">📦 ARRASTE AS ETAPAS NA ORDEM CORRETA</div>';
    html += '<div id="etapasDisponiveis" style="display:flex; flex-wrap:wrap; gap:10px; background:#1e293b; border-radius:12px; padding:12px; min-height:80px">';
    
    for (var i = 0; i < desfazState.etapasEmbaralhadas.length; i++) {
        var etapa = desfazState.etapasEmbaralhadas[i];
        html += '<div draggable="true" data-etapa="' + etapa + '" ondragstart="dragEtapa(event)" style="background:#0f172a; border:2px solid #334155; border-radius:12px; padding:12px 20px; text-align:center; cursor:grab; display:inline-flex; align-items:center; gap:8px; transition:0.2s" onmouseover="this.style.borderColor=\'' + accent + '\'" onmouseout="this.style.borderColor=\'#334155\'">';
        html += '<span style="font-size:24px">' + getIconeEtapa(etapa) + '</span>';
        html += '<span style="font-weight:600; font-size:14px; color:white">' + etapa + '</span>';
        html += '</div>';
    }
    
    html += '</div>';
    html += '</div>';
    
    // ÁREA DE DROP
    html += '<div style="background:#0f172a; border:2px dashed ' + accent + '; border-radius:16px; padding:16px; margin-bottom:16px">';
    html += '<div style="text-align:center; margin-bottom:12px"><span style="color:#93c5fd; font-size:12px; font-weight:700">📋 ORDEM CORRETA (solte as etapas aqui na sequência)</span></div>';
    html += '<div id="ordemContainer" style="display:flex; flex-direction:column; gap:8px; min-height:250px" ondrop="dropEtapa(event)" ondragover="allowDrop(event)">';
    
    for (var i = 0; i < desfazState.respostasEtapas.length; i++) {
        var etapaColocada = desfazState.respostasEtapas[i];
        html += '<div style="background:linear-gradient(135deg, #065f46, #047857); border:2px solid #10b981; border-radius:10px; padding:12px; display:flex; align-items:center; gap:12px">';
        html += '<span style="background:#10b981; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:white">' + (i+1) + '</span>';
        html += '<span style="font-size:24px">' + getIconeEtapa(etapaColocada) + '</span>';
        html += '<span style="font-weight:600; font-size:14px; color:white">' + etapaColocada + '</span>';
        html += '</div>';
    }
    
    if (desfazState.respostasEtapas.length === 0) {
        html += '<div style="text-align:center; padding:30px; color:#64748b; font-size:13px; border:1px dashed #334155; border-radius:10px">✨ Arraste as etapas para cá na ordem correta</div>';
    }
    
    html += '</div>';
    html += '</div>';
    
    // Botão de verificar
    if (desfazState.respostasEtapas.length === ordemCorreta.length) {
        html += '<button onclick="verificarOrdemEtapas()" class="dialog-btn" style="background:' + accent + '; width:100%; padding:14px; font-size:15px; border:none; border-radius:12px; color:white; font-weight:700; cursor:pointer">✅ VERIFICAR ORDEM</button>';
    }
    
    html += '<div style="text-align:center; margin-top:16px; font-size:11px; color:#64748b">💡 Dica: A sequência começa no Órgão Público e termina na Comunidade. O caminhão aparece duas vezes!</div>';
    
    content.innerHTML = html;
    
    // Força os elementos arrastáveis a terem o atributo correto após renderizar
    setTimeout(function() {
        var draggables = document.querySelectorAll('[draggable="true"]');
        for (var i = 0; i < draggables.length; i++) {
            draggables[i].setAttribute('draggable', 'true');
        }
    }, 50);
}

// FUNÇÕES DE DRAG AND DROP
// ═══════════════════════════════════════════════════════════
// FUNÇÕES DE DRAG AND DROP CORRIGIDAS
// ═══════════════════════════════════════════════════════════

function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
}

function dragEtapa(e) {
    // Procura o elemento que tem o atributo data-etapa
    var target = e.target;
    while (target && !target.getAttribute('data-etapa')) {
        target = target.parentElement;
    }
    if (target && target.getAttribute('data-etapa')) {
        var etapa = target.getAttribute('data-etapa');
        e.dataTransfer.setData("text/plain", etapa);
        e.dataTransfer.effectAllowed = "copy";
        console.log("🎯 Arrastando: " + etapa);
    }
}

function dropEtapa(e) {
    e.preventDefault();

    var etapa = e.dataTransfer.getData("text/plain");
    console.log("📦 Soltando: " + etapa);

    if (!etapa) return;

    // PRIMEIRO define a ordem correta
    var ordemCorreta = [
        "Órgão Público",
        "Caminhão",
        "CRC",
        "Caminhão",
        "PID",
        "Comunidade"
    ];

    // Conta quantas vezes a etapa já foi usada
    var quantidadeNaResposta = desfazState.respostasEtapas.filter(function(e) {
        return e === etapa;
    }).length;

    // Conta quantas vezes ela pode aparecer
    var quantidadePermitida = ordemCorreta.filter(function(e) {
        return e === etapa;
    }).length;

    // Bloqueia apenas se exceder o limite
    if (quantidadeNaResposta >= quantidadePermitida) {
        showToast("❌ A etapa '" + etapa + "' já foi adicionada!", "error");
        return;
    }

    var proximaEsperada = ordemCorreta[desfazState.respostasEtapas.length];

    console.log("🔍 Próxima esperada: " + proximaEsperada);

    if (etapa === proximaEsperada) {

        desfazState.respostasEtapas.push(etapa);

        showToast(
            "✅ Correto! " + etapa + " na posição " +
            desfazState.respostasEtapas.length,
            "success"
        );

        // Remove UM item da lista
        var index = desfazState.etapasEmbaralhadas.indexOf(etapa);

        if (index > -1) {
            desfazState.etapasEmbaralhadas.splice(index, 1);
        }

        renderEtapasEmbaralhadas(currentWorld?.color || '#2563EB');

    } else {

        showToast(
            "❌ Ordem errada! A próxima etapa deveria ser: " +
            proximaEsperada,
            "error"
        );
    }
}

function verificarOrdemEtapas() {
    var ordemCorreta = ["Órgão Público", "Caminhão", "CRC", "Caminhão", "PID", "Comunidade"];
    
    for (var i = 0; i < ordemCorreta.length; i++) {
        if (desfazState.respostasEtapas[i] !== ordemCorreta[i]) {
            showToast("❌ Ordem incorreta! Tente novamente.", "error");
            return;
        }
    }
    
    showToast("🎉 PARABÉNS! Você completou o desfazimento corretamente!", "success");
    setTimeout(function() {
        finishDesfazSimulation();
    }, 1500);
}

function finishDesfazSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">🏆</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Desfazimento Concluído!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Você domina o fluxo do desfazimento! 🚀</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}