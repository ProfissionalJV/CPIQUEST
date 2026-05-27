// ═══════════════════════════════════════════════════════════
// SIMULADOR DETETIVE FINANCEIRO
// ═══════════════════════════════════════════════════════════

let detetiveState = {};

function startDetetiveSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    detetiveState = {
        respostas: {},
        corretas: 0,
        erradas: 0
    };
    renderDetetive(accent);
}

function renderDetetive(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishDetetiveSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:10px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:14px; margin-bottom:12px; display:flex; align-items:start; gap:10px">';
    html += '<span style="background:' + accent + '; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; flex-shrink:0">' + (simTaskIndex+1) + '/' + simTasks.length + '</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:14px; margin-bottom:3px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:12px">💡 ' + (task.hint || 'Verifique o valor') + '</p></div></div>';
    
    // PAINEL DO DETETIVE
    html += '<div style="display:flex; gap:20px">';
    
    // RELATÓRIO (ESQUERDA)
    html += '<div style="width:45%; background:#fafafa; border:2px solid #ccc; border-radius:10px; padding:20px; font-family:Arial; box-shadow:0 4px 15px rgba(0,0,0,0.1)">';
    html += '<div style="border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:14px">';
    html += '<div style="font-size:14px; font-weight:700; text-align:center; color:#000">RELATÓRIO SEMESTRAL</div>';
    html += '<div style="font-size:9px; color:#333; text-align:center">CRC - Prestação de Contas</div>';
    html += '</div>';
    
    // Cabeçalho da tabela
    html += '<table style="width:100%; font-size:10px; border-collapse:collapse">';
    html += '<tr style="background:#e8e8e8; font-weight:700">';
    html += '<td style="padding:6px; border:1px solid #ccc; color:#000">NF</td>';
    html += '<td style="padding:6px; border:1px solid #ccc; color:#000">Descrição</td>';
    html += '<td style="padding:6px; border:1px solid #ccc; text-align:right; color:#000">Valor</td>';
    html += '<td style="padding:6px; border:1px solid #ccc; text-align:center; color:#000">Status</td>';
    html += '</tr>';
    
    // Linhas das notas fiscais
    simTasks.forEach(function(t, i) {
        var status = detetiveState.respostas[t.target];
        var statusTexto = '';
        var statusCor = '#000';
        
        if (status === 'correto') { statusTexto = '✅ OK'; statusCor = '#10b981'; }
        else if (status === 'errado') { statusTexto = '⚠️ R$ ' + t.valorCorreto.toLocaleString(); statusCor = '#ef4444'; }
        
        html += '<tr style="background:' + (i === simTaskIndex ? '#fef3c7' : 'white') + '">';
        html += '<td style="padding:6px; border:1px solid #ccc; font-weight:700; color:#000">' + t.target.replace('nf-','') + '</td>';
        html += '<td style="padding:6px; border:1px solid #ccc; font-size:9px; color:#000">' + t.desc + '</td>';
        html += '<td style="padding:6px; border:1px solid #ccc; text-align:right; font-weight:700; color:#000">R$ ' + t.valorDeclarado.toLocaleString() + '</td>';
        html += '<td style="padding:6px; border:1px solid #ccc; text-align:center; color:' + statusCor + '; font-size:9px; font-weight:700">' + statusTexto + '</td>';
        html += '</tr>';
    });
    
    html += '</table></div>';
    
    // ÁREA DE CONFERÊNCIA (DIREITA)
    html += '<div style="flex:1; background:#1e293b; border:2px solid #334155; border-radius:10px; padding:20px; text-align:center">';
    
    // Nota fiscal atual
    html += '<div style="background:white; border:2px solid #ccc; border-radius:8px; padding:16px; margin-bottom:16px; font-family:Arial">';
    html += '<div style="font-size:12px; font-weight:700; border-bottom:1px solid #ccc; padding-bottom:8px; margin-bottom:8px; color:#000">📄 NOTA FISCAL ' + task.target.replace('nf-','') + '/2025</div>';
    html += '<div style="font-size:10px; color:#333; margin-bottom:4px">Descrição: ' + task.desc + '</div>';
    html += '<div style="font-size:18px; font-weight:700; color:#000; margin:8px 0">Valor Declarado: <span style="color:#3b82f6">R$ ' + task.valorDeclarado.toLocaleString() + '</span></div>';
    html += '<div style="font-size:9px; color:#666">Valor Real (confira no sistema): <strong style="color:#10b981">R$ ' + task.valorCorreto.toLocaleString() + '</strong></div>';
    html += '</div>';
    
    // Botões de decisão
    if (!detetiveState.respostas[task.target]) {
        html += '<p style="color:white; font-weight:700; font-size:14px; margin-bottom:12px">🔍 O valor está CORRETO?</p>';
        html += '<div style="display:flex; gap:12px; justify-content:center">';
        html += '<button onclick="julgarNota(\'correto\')" style="padding:14px 36px; background:#10b981; border:none; border-radius:10px; color:white; font-weight:700; font-size:14px; cursor:pointer; transition:0.2s" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">✅ CORRETO</button>';
        html += '<button onclick="julgarNota(\'errado\')" style="padding:14px 36px; background:#ef4444; border:none; border-radius:10px; color:white; font-weight:700; font-size:14px; cursor:pointer; transition:0.2s" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">❌ ERRADO</button>';
        html += '</div>';
    } else {
        var acertou = (detetiveState.respostas[task.target] === 'correto' && task.valorDeclarado === task.valorCorreto) || 
                      (detetiveState.respostas[task.target] === 'errado' && task.valorDeclarado !== task.valorCorreto);
        
        html += '<div style="padding:14px; background:' + (acertou ? '#065f4620' : '#7f1d1d20') + '; border:2px solid ' + (acertou ? '#10b981' : '#ef4444') + '; border-radius:10px; margin-bottom:12px">';
        html += '<span style="color:' + (acertou ? '#10b981' : '#ef4444') + '; font-weight:700; font-size:14px">' + (acertou ? '✅ Você acertou!' : '❌ Você errou!') + '</span>';
        html += '<p style="color:#94a3b8; font-size:11px; margin-top:4px">' + (acertou ? 'Nota fiscal corretamente analisada!' : 'O valor real é R$ ' + task.valorCorreto.toLocaleString()) + '</p>';
        html += '</div>';
        
        html += '<button onclick="avancarDetetive()" style="padding:12px 36px; background:' + accent + '; border:none; border-radius:10px; color:white; font-weight:700; font-size:14px; cursor:pointer">Próxima Nota →</button>';
    }
    
    // Placar
    html += '<div style="display:flex; gap:20px; justify-content:center; margin-top:16px; padding-top:12px; border-top:1px solid #334155">';
    html += '<div style="color:#10b981; font-weight:700">✅ ' + detetiveState.corretas + ' acertos</div>';
    html += '<div style="color:#ef4444; font-weight:700">❌ ' + detetiveState.erradas + ' erros</div>';
    html += '</div>';
    
    html += '</div></div>';
    
    // Toast
    html += '<div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>';
    
    // Progresso
    html += '<div style="display:flex; gap:8px; justify-content:center; margin-top:12px">';
    simTasks.forEach(function(_, i) {
        html += '<div style="width:' + (i===simTaskIndex?30:12) + 'px; height:12px; border-radius:6px; background:' + (i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155') + '; transition:0.3s"></div>';
    });
    html += '</div>';
    
    content.innerHTML = html;
}

function julgarNota(resposta) {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    
    detetiveState.respostas[task.target] = resposta;
    
    var acertou = (resposta === 'correto' && task.valorDeclarado === task.valorCorreto) || 
                  (resposta === 'errado' && task.valorDeclarado !== task.valorCorreto);
    
    if (acertou) {
        detetiveState.corretas++;
        showToast('✅ Análise correta!', 'success');
    } else {
        detetiveState.erradas++;
        showToast('❌ Análise incorreta! O valor real é R$ ' + task.valorCorreto.toLocaleString(), 'error');
    }
    
    renderDetetive(currentWorld?.color || '#2563EB');
}

function avancarDetetive() {
    if (simLocked) return;
    simLocked = true;
    advanceDetetiveTask();
}

function advanceDetetiveTask() {
    simTaskIndex++;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishDetetiveSimulation();
        else renderDetetive(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishDetetiveSimulation() {
    simCompleted = true;
    var total = simTasks.length;
    var corretas = detetiveState.corretas;
    window._practiceStars = corretas;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">🔍</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Prestação de Contas Analisada!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">' + corretas + ' de ' + total + ' notas analisadas corretamente</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:' + (i<=corretas?'#fbbf24':'#334155') + '; filter:' + (i<=corretas?'drop-shadow(0 0 8px rgba(251,191,36,0.6))':'none') + '">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}