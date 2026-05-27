// ═══════════════════════════════════════════════════════════
// SIMULADOR ACT - PLANO DE TRABALHO
// ═══════════════════════════════════════════════════════════

let actState = {};

function startActSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    actState = {
        participe: '',
        objeto: '',
        meta: '',
        prazo: '',
        assinado: false
    };
    renderAct(accent);
}

function renderAct(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishActSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    var preenchidos = [actState.participe, actState.objeto, actState.meta, actState.prazo].filter(Boolean).length;
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">';
    html += '<span style="background:' + accent + '; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">' + (simTaskIndex+1) + '/' + simTasks.length + '</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:13px">💡 ' + (task.hint || 'Preencha o campo') + '</p></div></div>';
    
    // DOCUMENTO DO ACT
    html += '<div style="background:#fafafa; border:2px solid #ccc; border-radius:10px; padding:20px; font-family:Arial; color:#333; box-shadow:0 4px 15px rgba(0,0,0,0.1)">';
    
    // Cabeçalho do documento
    html += '<div style="text-align:center; border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:16px">';
    html += '<div style="font-size:14px; font-weight:700; letter-spacing:1px">PLANO DE TRABALHO</div>';
    html += '<div style="font-size:10px; color:#666">Acordo de Cooperação Técnica - ACT</div>';
    html += '<div style="font-size:8px; color:#999">Programa Computadores para Inclusão</div></div>';
    
    // Partícipe 1 (fixo)
    html += '<div style="margin-bottom:14px; padding:10px; background:#f0f4ff; border-radius:6px">';
    html += '<div style="font-size:10px; font-weight:700; color:#1e3a8a; margin-bottom:4px">PARTÍCIPE 1</div>';
    html += '<div style="font-size:11px"><strong>Ministério das Comunicações</strong></div>';
    html += '<div style="font-size:10px; color:#666">CNPJ: 00.568.444/0001-28 | Esfera Federal</div></div>';
    
    // Partícipe 2 (editável)
    html += '<div style="margin-bottom:14px; padding:10px; background:' + (simTaskIndex===0 ? '#fef3c7' : '#f0f4ff') + '; border-radius:6px; border:2px solid ' + (simTaskIndex===0 ? accent : 'transparent') + '">';
    html += '<div style="font-size:10px; font-weight:700; color:#1e3a8a; margin-bottom:4px">PARTÍCIPE 2</div>';
    html += '<input id="act-participe" type="text" placeholder="Nome do órgão/entidade parceira..." value="' + actState.participe + '" oninput="actState.participe = this.value" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; font-size:11px; outline:none">';
    html += '</div>';
    
    // Objeto (editável)
    html += '<div style="margin-bottom:14px; padding:10px; background:' + (simTaskIndex===1 ? '#fef3c7' : '#f0f4ff') + '; border-radius:6px; border:2px solid ' + (simTaskIndex===1 ? accent : 'transparent') + '">';
    html += '<div style="font-size:10px; font-weight:700; color:#1e3a8a; margin-bottom:4px">OBJETO DO ACORDO</div>';
    html += '<input id="act-objeto" type="text" placeholder="Ex: Cooperação para doação de equipamentos eletroeletrônicos..." value="' + actState.objeto + '" oninput="actState.objeto = this.value" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; font-size:11px; outline:none">';
    html += '</div>';
    
    // Meta Principal (select)
    html += '<div style="margin-bottom:14px; padding:10px; background:' + (simTaskIndex===2 ? '#fef3c7' : '#f0f4ff') + '; border-radius:6px; border:2px solid ' + (simTaskIndex===2 ? accent : 'transparent') + '">';
    html += '<div style="font-size:10px; font-weight:700; color:#1e3a8a; margin-bottom:4px">META PRINCIPAL</div>';
    html += '<select id="act-meta" onchange="actState.meta = this.value; verificarAct()" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; font-size:11px; outline:none; cursor:pointer">';
    html += '<option value="">Selecione a meta...</option>';
    html += '<option value="meta1" ' + (actState.meta==='meta1'?'selected':'') + '>Meta 1 - Distribuição e Desfazimento de REEE aos CRCs</option>';
    html += '<option value="meta2" ' + (actState.meta==='meta2'?'selected':'') + '>Meta 2 - Capacitação de População Vulnerável para o Mercado de Trabalho</option>';
    html += '</select>';
    html += '</div>';
    
    // Prazo (editável)
    html += '<div style="margin-bottom:14px; padding:10px; background:' + (simTaskIndex===3 ? '#fef3c7' : '#f0f4ff') + '; border-radius:6px; border:2px solid ' + (simTaskIndex===3 ? accent : 'transparent') + '">';
    html += '<div style="font-size:10px; font-weight:700; color:#1e3a8a; margin-bottom:4px">PRAZO DE VIGÊNCIA (meses)</div>';
    html += '<input id="act-prazo" type="number" min="1" placeholder="Ex: 24" value="' + actState.prazo + '" oninput="actState.prazo = this.value" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; font-size:11px; outline:none">';
    html += '</div>';
    
    // Assinaturas
    html += '<div style="border-top:1px solid #ccc; padding-top:10px; text-align:center; margin-top:10px">';
    html += '<div style="font-size:9px; color:#666">_________________________________</div>';
    html += '<div style="font-size:8px; color:#999">Ministério das Comunicações</div>';
    html += '<div style="margin-top:10px; font-size:9px; color:#666">_________________________________</div>';
    html += '<div style="font-size:8px; color:#999">' + (actState.participe || 'Partícipe 2') + '</div>';
    html += '</div>';
    
    html += '</div>';
    
    // Botão Assinar
    if (preenchidos >= 4 && !actState.assinado) {
        html += '<div style="text-align:center; margin-top:16px"><button onclick="assinarAct()" style="padding:14px 40px; background:#10b981; border:none; border-radius:10px; color:white; font-weight:700; font-size:15px; cursor:pointer; box-shadow:0 4px 15px rgba(16,185,129,0.3)">✍️ ASSINAR ACORDO</button></div>';
    }
    
    if (actState.assinado) {
        html += '<div style="text-align:center; margin-top:16px; padding:16px; background:#065f4620; border:2px solid #10b981; border-radius:10px"><span style="font-size:30px">✅</span><p style="color:#6ee7b7; font-weight:700; margin-top:4px">Acordo assinado com sucesso!</p><p style="color:#94a3b8; font-size:11px">ACT firmado entre MCom e ' + (actState.participe || 'Parceiro') + '</p></div>';
    }
    
    // Toast
    html += '<div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>';
    
    // Progresso
    html += '<div style="display:flex; gap:8px; justify-content:center; margin-top:14px">';
    simTasks.forEach(function(_, i) {
        html += '<div style="width:' + (i===simTaskIndex?30:12) + 'px; height:12px; border-radius:6px; background:' + (i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155') + '; transition:0.3s"></div>';
    });
    html += '</div>';
    
    content.innerHTML = html;
    
    setTimeout(function() {
        ['act-participe', 'act-objeto', 'act-prazo'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.addEventListener('keydown', function(e) { if (e.key === 'Enter') verificarAct(); });
        });
    }, 200);
}

function verificarAct() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    
    var preenchido = false;
    if (task.target === 'input-participe' && actState.participe) preenchido = true;
    if (task.target === 'input-objeto' && actState.objeto) preenchido = true;
    if (task.target === 'select-meta' && actState.meta) preenchido = true;
    if (task.target === 'input-prazo' && actState.prazo) preenchido = true;
    
    if (preenchido) {
        simLocked = true;
        showToast('✓ Campo preenchido!', 'success');
        advanceActTask();
    }
}

function assinarAct() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task || task.target !== 'btn-assinar') return;
    
    actState.assinado = true;
    simLocked = true;
    showToast('✍️ Acordo assinado! ACT firmado com sucesso!', 'success');
    advanceActTask();
}

function advanceActTask() {
    simTaskIndex++;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishActSimulation();
        else renderAct(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishActSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">🤝</div><h2 style="color:white; font-size:22px; margin-bottom:8px">ACT Firmado!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">MCom + ' + (actState.participe || 'Parceiro') + ' | Meta: ' + (actState.meta==='meta1'?'Distribuição de REEE':'Capacitação Profissional') + '</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}