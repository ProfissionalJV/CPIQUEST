// ═══════════════════════════════════════════════════════════
// SIMULADOR CORRIDA DOS CRCs - 17 CRCs (NOME + SIGLA)
// ═══════════════════════════════════════════════════════════

let corridaState = {};

function startCorridaSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    corridaState = {
        posicao: 0,
        acertos: 0,
        erros: 0,
        respondido: false,
        fasePergunta: 'nome', // 'nome' ou 'sigla'
        ultimaResposta: '',
        siglaDigitada: '',
        // Posições no mapa para 17 estados
        etapas: [
            { estado: 'CE', nome: 'Ceará', x: 76, y: 28, icon: '📍' },
            { estado: 'RJ', nome: 'Rio de Janeiro', x: 69, y: 73, icon: '📍' },
            { estado: 'GO', nome: 'Goiás', x: 58, y: 58, icon: '📍' },
            { estado: 'PE', nome: 'Pernambuco', x: 80, y: 37, icon: '📍' },
            { estado: 'AM', nome: 'Amazonas', x: 32, y: 25, icon: '📍' },
            { estado: 'MA', nome: 'Maranhão', x: 67, y: 27, icon: '📍' },
            { estado: 'MS', nome: 'Mato Grosso do Sul', x: 49, y: 67, icon: '📍' },
            { estado: 'SE', nome: 'Sergipe', x: 83, y: 43, icon: '📍' },
            { estado: 'BA', nome: 'Bahia', x: 72, y: 47, icon: '📍' },
            { estado: 'DF', nome: 'Distrito Federal', x: 63, y: 55, icon: '📍' },
            { estado: 'PA', nome: 'Pará', x: 52, y: 25, icon: '📍' },
            { estado: 'RS', nome: 'Rio Grande do Sul', x: 52, y: 90, icon: '📍' },
            { estado: 'AP', nome: 'Amapá', x: 55, y: 12, icon: '📍' },
            { estado: 'MG', nome: 'Minas Gerais', x: 68, y: 62, icon: '📍' },
            { estado: 'TO', nome: 'Tocantins', x: 60, y: 42, icon: '📍' },
            { estado: 'PI', nome: 'Piauí', x: 70, y: 35, icon: '📍' },
            { estado: 'RR', nome: 'Roraima', x: 37, y: 10, icon: '🏁' },
        ]
    };
    renderCorrida(accent);
}

function renderCorrida(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishCorridaSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    var pos = simTaskIndex;
    var etapa = corridaState.etapas[pos];
    var isSigla = corridaState.fasePergunta === 'sigla';
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:8px; font-size:13px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:12px; padding:12px; margin-bottom:10px; display:flex; align-items:start; gap:8px">';
    html += '<span style="background:' + accent + '; color:white; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; flex-shrink:0">' + (pos+1) + '/17</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:13px; margin-bottom:2px">' + (isSigla ? 'Digite o NOME COMPLETO do CRC de ' + etapa.nome : task.label) + '</p>';
    html += '<p style="color:#93c5fd; font-size:11px">💡 ' + (isSigla ? 'Escreva o nome completo do instituto' : task.hint) + '</p></div></div>';
    
    // MAPA DO BRASIL (GRANDE)
    html += '<div style="position:relative; background:#0a0e1a; border:2px solid #1a3a5c; border-radius:14px; min-height:420px; overflow:hidden; margin-bottom:12px">';
    html += '<img src="img2/brasil2.png" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.6; object-fit:contain; pointer-events:none" />';
    
    // Linhas do percurso
    html += '<svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2">';
    for (var i = 0; i < pos; i++) {
        var e1 = corridaState.etapas[i];
        var e2 = corridaState.etapas[i+1];
        if (e2) {
            html += '<line x1="' + e1.x + '%" y1="' + e1.y + '%" x2="' + e2.x + '%" y2="' + e2.y + '%" stroke="#10b981" stroke-width="3" opacity="0.5" stroke-linecap="round"/>';
        }
    }
    html += '</svg>';
    
    // Estados no mapa
    corridaState.etapas.forEach(function(e, i) {
        var visitado = i < pos;
        var atual = i === pos;
        
        html += '<div style="position:absolute; left:' + e.x + '%; top:' + e.y + '%; transform:translate(-50%,-50%); text-align:center; z-index:5; ' + (atual ? 'animation: pulse 1s infinite;' : '') + '">';
        
        if (visitado) {
            html += '<div style="width:32px; height:32px; border-radius:50%; background:#10b981; border:3px solid #065f46; display:flex; align-items:center; justify-content:center; font-size:14px; margin:0 auto; box-shadow:0 0 12px rgba(16,185,129,0.4)">✅</div>';
        } else if (atual) {
            html += '<div style="width:42px; height:42px; border-radius:50%; background:#fbbf24; border:4px solid #f59e0b; display:flex; align-items:center; justify-content:center; font-size:18px; margin:0 auto; box-shadow:0 0 20px rgba(251,191,36,0.6)">📍</div>';
        } else {
            html += '<div style="width:26px; height:26px; border-radius:50%; background:#334155; border:2px solid #64748b; display:flex; align-items:center; justify-content:center; font-size:10px; margin:0 auto">🔒</div>';
        }
        
        html += '<div style="background:rgba(0,0,0,0.7); border-radius:4px; padding:2px 6px; font-size:8px; font-weight:700; color:white; margin-top:3px; white-space:nowrap">' + e.estado + (i===16?' 🏁':'') + '</div>';
        html += '</div>';
    });
    
    html += '</div>'; // FIM DO MAPA
    
    // PERGUNTA (EMBAIXO)
    html += '<div style="background:#1e293b; border:2px solid #334155; border-radius:10px; padding:18px; text-align:center">';
    
    html += '<div style="font-size:30px; margin-bottom:4px">' + (isSigla ? '🔤' : '📍') + '</div>';
    html += '<div style="color:white; font-weight:700; font-size:15px; margin-bottom:2px">' + etapa.nome + ' (' + etapa.estado + ')</div>';
    html += '<div style="color:#fbbf24; font-size:11px; margin-bottom:14px">CRC ' + (pos+1) + ' de 17</div>';
    
    if (!corridaState.respondido) {
        if (!isSigla) {
            // Pergunta: qual CRC?
            html += '<div style="background:#0f172a; border:2px solid #334155; border-radius:8px; padding:12px; margin-bottom:14px">';
            html += '<p style="color:white; font-weight:700; font-size:14px; margin-bottom:2px">' + task.label + '</p>';
            html += '</div>';
            
            html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px">';
            task.opcoes.forEach(function(opcao) {
                html += '<button onclick="responderCorrida(\'' + opcao + '\')" style="padding:12px; background:#0f172a; border:2px solid #334155; border-radius:8px; color:white; font-weight:600; font-size:13px; cursor:pointer; transition:0.2s" onmouseover="this.style.borderColor=\'' + accent + '\'" onmouseout="this.style.borderColor=\'#334155\'">' + opcao + '</button>';
            });
            html += '</div>';
        } else {
            // Pergunta: NOME COMPLETO
            html += '<div style="background:#0f172a; border:2px solid #334155; border-radius:8px; padding:12px; margin-bottom:14px">';
            html += '<p style="color:white; font-weight:700; font-size:14px; margin-bottom:2px">Qual o NOME COMPLETO do <strong style="color:#fbbf24">' + task.resposta + '</strong>?</p>';
            html += '<p style="color:#94a3b8; font-size:10px">Escreva o nome completo do instituto</p>';
            html += '</div>';

            html += '<input id="sigla-input" type="text" placeholder="Digite o nome completo..." value="' + corridaState.siglaDigitada + '" oninput="corridaState.siglaDigitada = this.value" style="width:100%; max-width:500px; padding:12px; margin-bottom:12px; background:#0f172a; border:2px solid ' + accent + '; border-radius:8px; color:white; font-size:14px; text-align:center; outline:none; font-weight:600">';
            
            html += '<br><button onclick="verificarNomeCompleto()" style="padding:12px 40px; background:' + accent + '; border:none; border-radius:8px; color:white; font-weight:700; font-size:14px; cursor:pointer">✅ VERIFICAR NOME</button>';
        }
    } else {
        var acertou = corridaState.ultimoAcerto;
        html += '<div style="padding:12px; background:' + (acertou ? '#065f4620' : '#7f1d1d20') + '; border:2px solid ' + (acertou ? '#10b981' : '#ef4444') + '; border-radius:8px; margin-bottom:12px">';
        html += '<span style="color:' + (acertou ? '#10b981' : '#ef4444') + '; font-weight:700; font-size:14px">' + (acertou ? '✅ CORRETO!' : '❌ INCORRETO!') + '</span>';
        html += '</div>';
        html += '<button onclick="avancarCorrida()" style="padding:12px 40px; background:' + accent + '; border:none; border-radius:8px; color:white; font-weight:700; font-size:14px; cursor:pointer">' + (pos < 16 ? 'Próximo Estado →' : 'Finalizar 🏁') + '</button>';
    }
    
    // Placar
    html += '<div style="display:flex; gap:20px; justify-content:center; margin-top:14px; padding-top:12px; border-top:1px solid #334155">';
    html += '<div style="color:#10b981; font-weight:700; font-size:12px">✅ ' + corridaState.acertos + ' acertos</div>';
    html += '<div style="color:#ef4444; font-weight:700; font-size:12px">❌ ' + corridaState.erros + ' erros</div>';
    html += '</div>';
    
    html += '</div>'; // FIM DA PERGUNTA
    
    // Toast
    html += '<div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:8px 16px; border-radius:8px; font-size:12px; font-weight:700; z-index:40; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>';
    
    // Progresso
    html += '<div style="display:flex; gap:4px; justify-content:center; margin-top:8px; flex-wrap:wrap">';
    simTasks.forEach(function(_, i) {
        html += '<div style="width:' + (i===pos?20:8) + 'px; height:8px; border-radius:4px; background:' + (i<pos?'#10b981':i===pos?accent:'#334155') + '; transition:0.3s"></div>';
    });
    html += '</div>';
    
    content.innerHTML = html;
    
    if (isSigla) {
        setTimeout(function() {
            var input = document.getElementById('sigla-input');
            if (input) input.focus();
        }, 200);
    }
}

function responderCorrida(resposta) {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    
    corridaState.respondido = true;
    corridaState.ultimaResposta = resposta;
    
    if (resposta === task.resposta) {
        corridaState.ultimoAcerto = true;
        showToast('✅ CRC correto! Agora digite a SIGLA!', 'success');
        // Passa para a fase da sigla
        corridaState.fasePergunta = 'sigla';
        corridaState.respondido = false;
    } else {
        corridaState.ultimoAcerto = false;
        corridaState.erros++;
        showToast('❌ CRC incorreto! O correto é ' + task.resposta, 'error');
    }
    
    renderCorrida(currentWorld?.color || '#2563EB');
}

function verificarNomeCompleto() {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    
    var nomeDigitado = corridaState.siglaDigitada.trim();
    if (!nomeDigitado) {
        showToast('⚠️ Digite o nome completo do instituto!', 'error');
        return;
    }
    
    corridaState.respondido = true;
    
    // Remove acentos, espaços extras, e compara em minúsculas
    var nomeCorreto = task.nomeCompleto
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    var nomeDig = nomeDigitado
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    // Também compara com a sigla (caso digitem só a sigla)
    var siglaCorreta = task.sigla.toLowerCase().trim();
    
    if (nomeDig === nomeCorreto || nomeDig === siglaCorreta) {
        corridaState.ultimoAcerto = true;
        corridaState.acertos++;
        corridaState.posicao++;
        showToast('✅ NOME CORRETO! Avançou para ' + corridaState.etapas[corridaState.posicao]?.nome + '!', 'success');
    } else {
        corridaState.ultimoAcerto = false;
        corridaState.erros++;
        showToast('❌ Nome incorreto! O correto é: ' + task.nomeCompleto, 'error');
    }
    
    renderCorrida(currentWorld?.color || '#2563EB');
}

function avancarCorrida() {
    if (simLocked) return;
    corridaState.respondido = false;
    corridaState.fasePergunta = 'nome';
    corridaState.siglaDigitada = '';
    simLocked = true;
    advanceCorridaTask();
}

function advanceCorridaTask() {
    simTaskIndex++;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishCorridaSimulation();
        else renderCorrida(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishCorridaSimulation() {
    simCompleted = true;
    var corretas = corridaState.acertos;
    window._practiceStars = Math.round((corretas / 17) * 5);
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">🏁</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Corrida Finalizada!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">' + corretas + ' de 17 CRCs encontrados!</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:' + (i<=Math.round((corretas/17)*5)?'#fbbf24':'#334155') + '; filter:' + (i<=Math.round((corretas/17)*5)?'drop-shadow(0 0 8px rgba(251,191,36,0.6))':'none') + '">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}