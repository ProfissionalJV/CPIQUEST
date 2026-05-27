// ═══════════════════════════════════════════════════════════
// SIMULADOR BRIEFING DE EVENTO
// ═══════════════════════════════════════════════════════════

let eventoState = {};

function startEventoSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    eventoState = {
        nome: '',
        data: '',
        local: '',
        publico: '',
        finalizado: false
    };
    renderEvento(accent);
}

function renderEvento(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishEventoSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    var preenchidos = [eventoState.nome, eventoState.data, eventoState.local, eventoState.publico].filter(Boolean).length;
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">';
    html += '<span style="background:' + accent + '; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">' + (simTaskIndex+1) + '/' + simTasks.length + '</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:13px">💡 ' + (task.hint || 'Preencha o campo') + '</p></div></div>';
    
    // Formulário de Briefing
    html += '<div style="background:#1e293b; border:2px solid #334155; border-radius:14px; padding:24px">';
    
    // Cabeçalho
    html += '<div style="background:#185abd; color:white; padding:12px 16px; border-radius:8px; margin-bottom:20px; display:flex; align-items:center; gap:8px">';
    html += '<span style="font-size:20px">📋</span><div><div style="font-weight:700; font-size:14px">BRIEFING DE EVENTO</div><div style="font-size:10px; opacity:0.8">Setor de Eventos - CGID</div></div>';
    html += '<div style="margin-left:auto; font-size:10px">' + preenchidos + '/4 campos</div></div>';
    
    // Campos
    html += '<div style="display:flex; flex-direction:column; gap:14px">';
    
    // Nome do Evento
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">🎯 Nome do Evento</label>';
    html += '<input id="evento-nome" type="text" placeholder="Ex: Cerimônia de Doação de Computadores" value="' + eventoState.nome + '" oninput="eventoState.nome = this.value" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (eventoState.nome ? '#10b981' : simTaskIndex===0 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none">';
    if (simTaskIndex === 0) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>';
    html += '</div>';
    
    // Data
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">📅 Data do Evento</label>';
    html += '<input id="evento-data" type="text" placeholder="DD/MM/AAAA" value="' + eventoState.data + '" oninput="eventoState.data = this.value" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (eventoState.data ? '#10b981' : simTaskIndex===1 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none">';
    if (simTaskIndex === 1) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>';
    html += '</div>';
    
    // Local
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">📍 Local do Evento</label>';
    html += '<input id="evento-local" type="text" placeholder="Ex: Auditório do MCom - Brasília/DF" value="' + eventoState.local + '" oninput="eventoState.local = this.value" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (eventoState.local ? '#10b981' : simTaskIndex===2 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none">';
    if (simTaskIndex === 2) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>';
    html += '</div>';
    
    // Público-alvo
    html += '<div><label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">👥 Público-Alvo</label>';
    html += '<select id="evento-publico" onchange="eventoState.publico = this.value; handleEventoChange()" style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ' + (eventoState.publico ? '#10b981' : simTaskIndex===3 ? accent : '#334155') + '; border-radius:8px; color:white; font-size:14px; outline:none; cursor:pointer">';
    html += '<option value="" style="background:#1e293b">Selecione...</option>';
    html += '<option value="escolas" ' + (eventoState.publico==='escolas'?'selected':'') + ' style="background:#1e293b">🏫 Escolas e Instituições de Ensino</option>';
    html += '<option value="ongs" ' + (eventoState.publico==='ongs'?'selected':'') + ' style="background:#1e293b">🤝 ONGs e Associações</option>';
    html += '<option value="autoridades" ' + (eventoState.publico==='autoridades'?'selected':'') + ' style="background:#1e293b">🏛️ Autoridades Governamentais</option>';
    html += '<option value="imprensa" ' + (eventoState.publico==='imprensa'?'selected':'') + ' style="background:#1e293b">📰 Imprensa e Mídia</option>';
    html += '<option value="comunidade" ' + (eventoState.publico==='comunidade'?'selected':'') + ' style="background:#1e293b">👨‍👩‍👧‍👦 Comunidade em Geral</option>';
    html += '</select>';
    if (simTaskIndex === 3) html += '<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Selecione uma opção para avançar</div>';
    html += '</div></div>';
    
    // Botão Finalizar
    if (preenchidos >= 4 && !eventoState.finalizado) {
        html += '<div style="text-align:center; margin-top:20px"><button onclick="handleFinalizarEvento()" style="padding:14px 40px; background:#10b981; border:none; border-radius:10px; color:white; font-weight:700; font-size:15px; cursor:pointer; box-shadow:0 4px 15px rgba(16,185,129,0.3)">📤 FINALIZAR BRIEFING</button></div>';
    }
    
    if (eventoState.finalizado) {
        html += '<div style="text-align:center; margin-top:20px; padding:16px; background:#065f4620; border:2px solid #10b981; border-radius:10px"><span style="font-size:30px">✅</span><p style="color:#6ee7b7; font-weight:700; margin-top:4px">Briefing finalizado com sucesso!</p></div>';
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
        ['evento-nome', 'evento-data', 'evento-local'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') handleEventoChange();
                });
            }
        });
    }, 200);
}

function handleEventoChange() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    
    var preenchido = false;
    if (task.target === 'nome-evento' && eventoState.nome) preenchido = true;
    if (task.target === 'data-evento' && eventoState.data) preenchido = true;
    if (task.target === 'local-evento' && eventoState.local) preenchido = true;
    if (task.target === 'publico-evento' && eventoState.publico) preenchido = true;
    
    if (preenchido) {
        simLocked = true;
        showToast('✓ Campo preenchido!', 'success');
        advanceEventoTask();
    }
}

function handleFinalizarEvento() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task || task.target !== 'btn-finalizar') return;
    
    eventoState.finalizado = true;
    simLocked = true;
    showToast('✓ Briefing finalizado! Evento pronto para organização!', 'success');
    advanceEventoTask();
}

function advanceEventoTask() {
    simTaskIndex++;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishEventoSimulation();
        else renderEvento(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishEventoSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">📋</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Briefing Finalizado!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Evento: ' + eventoState.nome + ' | ' + eventoState.data + ' | ' + eventoState.local + '</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}