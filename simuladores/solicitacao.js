// ═══════════════════════════════════════════════════════════
// SIMULADOR SOLICITAÇÃO DE COMPUTADORES
// ═══════════════════════════════════════════════════════════

let solicitacaoState = {};

function startSolicitacaoSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    solicitacaoState = {
        nome: '',
        cnpj: '',
        qtd: '',
        tipo: '',
        enviado: false
    };
    renderSolicitacao(accent);
}

function renderSolicitacao(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishSolicitacaoSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    var preenchidos = [solicitacaoState.nome, solicitacaoState.cnpj, solicitacaoState.qtd, solicitacaoState.tipo].filter(Boolean).length;
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">';
    html += '<span style="background:' + accent + '; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">' + (simTaskIndex+1) + '/' + simTasks.length + '</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:13px">💡 ' + (task.hint || 'Preencha o campo') + '</p></div></div>';
    
    // FORMULÁRIO DE SOLICITAÇÃO
    html += '<div style="background:#1e293b; border:2px solid #334155; border-radius:14px; padding:24px">';
    
    // Cabeçalho
    html += '<div style="background:#185abd; color:white; padding:12px 16px; border-radius:8px; margin-bottom:20px; display:flex; align-items:center; gap:8px">';
    html += '<span style="font-size:20px">📋</span>';
    html += '<div><div style="font-weight:700; font-size:14px">SOLICITAÇÃO DE COMPUTADORES</div>';
    html += '<div style="font-size:10px; opacity:0.8">Programa Computadores para Inclusão</div></div>';
    html += '<div style="margin-left:auto; font-size:10px">' + preenchidos + '/4 campos</div></div>';
    
    // Campos
    html += '<div style="display:flex; flex-direction:column; gap:14px">';
    
    // Nome da Instituição
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">🏫 Nome da Instituição</label>';
    html += '<input id="sol-nome" type="text" placeholder="Ex: Escola Municipal Santos Dumont" value="' + solicitacaoState.nome + '" oninput="solicitacaoState.nome = this.value" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (solicitacaoState.nome ? '#10b981' : simTaskIndex===0 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none">';
    if (simTaskIndex === 0) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>';
    html += '</div>';
    
    // CNPJ
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">📄 CNPJ</label>';
    html += '<input id="sol-cnpj" type="text" placeholder="XX.XXX.XXX/XXXX-XX" value="' + solicitacaoState.cnpj + '" oninput="solicitacaoState.cnpj = this.value" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (solicitacaoState.cnpj ? '#10b981' : simTaskIndex===1 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none">';
    if (simTaskIndex === 1) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>';
    html += '</div>';
    
    // Quantidade
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">🖥️ Quantidade de Computadores</label>';
    html += '<input id="sol-qtd" type="number" min="1" placeholder="Ex: 10" value="' + solicitacaoState.qtd + '" oninput="solicitacaoState.qtd = this.value" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (solicitacaoState.qtd ? '#10b981' : simTaskIndex===2 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none">';
    if (simTaskIndex === 2) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>';
    html += '</div>';
    
    // Tipo de Instituição
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">🏛️ Tipo de Instituição</label>';
    html += '<select id="sol-tipo" onchange="solicitacaoState.tipo = this.value; verificarSolicitacao()" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (solicitacaoState.tipo ? '#10b981' : simTaskIndex===3 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none; cursor:pointer">';
    html += '<option value="" style="background:#1e293b">Selecione...</option>';
    html += '<option value="escola" ' + (solicitacaoState.tipo==='escola'?'selected':'') + ' style="background:#1e293b">🏫 Escola Pública</option>';
    html += '<option value="ong" ' + (solicitacaoState.tipo==='ong'?'selected':'') + ' style="background:#1e293b">🤝 ONG / Associação</option>';
    html += '<option value="biblioteca" ' + (solicitacaoState.tipo==='biblioteca'?'selected':'') + ' style="background:#1e293b">📚 Biblioteca Pública</option>';
    html += '<option value="telecentro" ' + (solicitacaoState.tipo==='telecentro'?'selected':'') + ' style="background:#1e293b">💻 Telecentro</option>';
    html += '<option value="cras" ' + (solicitacaoState.tipo==='cras'?'selected':'') + ' style="background:#1e293b">🏛️ CRAS / CREAS</option>';
    html += '<option value="outro" ' + (solicitacaoState.tipo==='outro'?'selected':'') + ' style="background:#1e293b">📋 Outro</option>';
    html += '</select>';
    if (simTaskIndex === 3) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Selecione uma opção para avançar</div>';
    html += '</div>';
    
    html += '</div>';
    
    // Botão Enviar
    if (preenchidos >= 4 && !solicitacaoState.enviado) {
        html += '<div style="text-align:center; margin-top:20px"><button onclick="enviarSolicitacao()" style="padding:14px 40px; background:#10b981; border:none; border-radius:10px; color:white; font-weight:700; font-size:15px; cursor:pointer; box-shadow:0 4px 15px rgba(16,185,129,0.3)">📤 ENVIAR SOLICITAÇÃO</button></div>';
    }
    
    if (solicitacaoState.enviado) {
        html += '<div style="text-align:center; margin-top:20px; padding:16px; background:#065f4620; border:2px solid #10b981; border-radius:10px"><span style="font-size:30px">✅</span><p style="color:#6ee7b7; font-weight:700; margin-top:4px">Solicitação enviada com sucesso!</p><p style="color:#94a3b8; font-size:11px">Sua solicitação será analisada pela equipe da CGID.</p></div>';
    }
    
    html += '</div>';
    
    // Toast
    html += '<div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>';
    
    // Progresso
    html += '<div style="display:flex; gap:8px; justify-content:center; margin-top:14px">';
    simTasks.forEach(function(_, i) {
        html += '<div style="width:' + (i===simTaskIndex?30:12) + 'px; height:12px; border-radius:6px; background:' + (i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155') + '; transition:0.3s"></div>';
    });
    html += '</div>';
    
    content.innerHTML = html;
    
    // Enter nos inputs
    setTimeout(function() {
        ['sol-nome', 'sol-cnpj', 'sol-qtd'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') verificarSolicitacao();
                });
            }
        });
    }, 200);
}

function verificarSolicitacao() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    
    var preenchido = false;
    if (task.target === 'input-nome' && solicitacaoState.nome) preenchido = true;
    if (task.target === 'input-cnpj' && solicitacaoState.cnpj) preenchido = true;
    if (task.target === 'input-qtd' && solicitacaoState.qtd) preenchido = true;
    if (task.target === 'select-tipo' && solicitacaoState.tipo) preenchido = true;
    
    if (preenchido) {
        simLocked = true;
        showToast('✓ Campo preenchido!', 'success');
        advanceSolicitacaoTask();
    }
}

function enviarSolicitacao() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task || task.target !== 'btn-enviar') return;
    
    solicitacaoState.enviado = true;
    simLocked = true;
    showToast('✓ Solicitação enviada com sucesso!', 'success');
    advanceSolicitacaoTask();
}

function advanceSolicitacaoTask() {
    simTaskIndex++;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishSolicitacaoSimulation();
        else renderSolicitacao(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishSolicitacaoSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">📋</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Solicitação Enviada!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">' + solicitacaoState.nome + ' | ' + solicitacaoState.qtd + ' computadores solicitados</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}