// ═══════════════════════════════════════════════════════════
// SIMULADOR GOV.BR
// ═══════════════════════════════════════════════════════════

let govState = {};

function startGovSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    govState = { respostas: {} };
    renderGov(accent);
}

function renderGov(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishGovSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    var respostaAtual = govState.respostas[task.target];
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">';
    html += '<span style="background:' + accent + '; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">' + (simTaskIndex+1) + '/' + simTasks.length + '</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:13px">💡 ' + (task.hint || 'Escolha o serviço correto') + '</p></div></div>';
    
    // Tela do Gov.br
    html += '<div style="background:linear-gradient(180deg, #1a3a6b, #0f2444); border:2px solid #2d5aa0; border-radius:14px; overflow:hidden; min-height:420px; position:relative">';
    
    // Barra superior Gov.br
    html += '<div style="background:#0b1e3a; padding:12px 16px; display:flex; align-items:center; gap:10px">';
    html += '<span style="color:white; font-weight:700; font-size:14px">🇧🇷 GOV.BR</span>';
    html += '<div style="flex:1; background:white; border-radius:20px; padding:8px 14px; display:flex; align-items:center; gap:8px">';
    html += '<span style="font-size:14px">🔍</span>';
    html += '<span style="color:#666; font-size:12px">Buscar serviço...</span>';
    html += '</div></div>';
    
    // Conteúdo
    html += '<div style="padding:20px">';
    html += '<p style="color:#94a3b8; font-size:13px; margin-bottom:8px">📋 Selecione o serviço correto para esta situação:</p>';
    
    // Cidadão
    html += '<div style="background:white; border-radius:10px; padding:14px; margin-bottom:16px; display:flex; align-items:center; gap:10px">';
    html += '<div style="font-size:36px">' + ({inss:'👵', cnh:'🧑', ir:'👨‍💼', sus:'👩‍👦', fgts:'👷'}[task.target] || '👤') + '</div>';
    html += '<div style="color:#333; font-size:13px; font-weight:600">' + task.label + '</div>';
    html += '</div>';
    
    // Opções de serviços
    task.opcoes.forEach(function(opcao) {
        var selecionado = respostaAtual === opcao;
        var correto = respostaAtual !== undefined && opcao === task.correto;
        var errado = respostaAtual === opcao && opcao !== task.correto;
        
        html += '<div onclick="responderGov(\'' + opcao + '\')" style="background:' + (correto ? '#10b98115' : errado ? '#ef444415' : 'white') + '; border:2px solid ' + (correto ? '#10b981' : errado ? '#ef4444' : selecionado ? accent : '#ddd') + '; border-radius:10px; padding:12px 16px; margin-bottom:8px; cursor:' + (respostaAtual ? 'default' : 'pointer') + '; display:flex; align-items:center; gap:10px; transition:0.3s">';
       html += '<span style="width:10px; height:10px; border-radius:50%; background:' + ({'Meu INSS':'#3b82f6', 'Carteira Digital de Trânsito':'#10b981', 'e-CAC':'#f59e0b', 'SUS Digital':'#ef4444', 'FGTS Digital':'#8b5cf6'}[opcao] || '#64748b') + '; display:inline-block; margin-right:4px"></span>';
        html += '<span style="color:' + (correto ? '#10b981' : errado ? '#ef4444' : '#333') + '; font-weight:600; font-size:13px">' + opcao + '</span>';
        if (correto) html += '<span style="margin-left:auto; color:#10b981; font-weight:700">✓ Correto!</span>';
        if (errado) html += '<span style="margin-left:auto; color:#ef4444; font-weight:700">✗</span>';
        html += '</div>';
    });
    
    // Próximo
    if (respostaAtual) {
        html += '<button onclick="avancarGov()" style="width:100%; margin-top:8px; padding:14px; background:' + accent + '; border:none; border-radius:10px; color:white; font-weight:700; font-size:14px; cursor:pointer">Próximo →</button>';
    }
    
    html += '</div></div>';
    
    // Toast
    html += '<div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>';
    
    // Progresso
    html += '<div style="display:flex; gap:8px; justify-content:center; margin-top:14px">';
    simTasks.forEach(function(_, i) {
        html += '<div style="width:' + (i===simTaskIndex?30:12) + 'px; height:12px; border-radius:6px; background:' + (i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155') + '; transition:0.3s"></div>';
    });
    html += '</div>';
    
    content.innerHTML = html;
}

function responderGov(opcao) {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    if (govState.respostas[task.target] !== undefined) return;
    
    govState.respostas[task.target] = opcao;
    
    if (opcao === task.correto) {
        showToast('✅ Correto! Serviço encontrado!', 'success');
    } else {
        showToast('❌ Serviço errado! O correto é: ' + task.correto, 'error');
    }
    
    renderGov(currentWorld?.color || '#2563EB');
}

function avancarGov() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task || govState.respostas[task.target] === undefined) return;
    
    simLocked = true;
    advanceGovTask();
}

function advanceGovTask() {
    simTaskIndex++;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishGovSimulation();
        else renderGov(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishGovSimulation() {
    simCompleted = true;
    var corretas = simTasks.filter(function(t) {
        return govState.respostas[t.target] === t.correto;
    }).length;
    window._practiceStars = corretas;
    var accent = currentWorld?.color || '#2563EB';
    
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">🏛️</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Central Gov.br Dominada!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">' + corretas + ' de ' + simTasks.length + ' serviços encontrados corretamente!</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:' + (i<=corretas?'#fbbf24':'#334155') + '; filter:' + (i<=corretas?'drop-shadow(0 0 8px rgba(251,191,36,0.6))':'none') + '">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}