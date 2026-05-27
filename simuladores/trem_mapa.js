// ═══════════════════════════════════════════════════════════
// SIMULADOR TREM NO MAPA - JORNADA DA INCLUSÃO DIGITAL (COMPLETO)
// ═══════════════════════════════════════════════════════════

let tremMapaState = {};

function startTremMapaSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    tremMapaState = {
        fase: 0,
        tremX: 50,
        tremY: 50,
        rastro: [{ x: 50, y: 50 }],
        rastroAnimado: null,
        estacoes: [
            { id: 'desfazimento', nome: 'DESFAZIMENTO', icon: '🏢', x: 22, y: 30, cor: '#3b82f6',
            texto: 'O PROCESSO COMEÇA COM O DESFAZIMENTO, QUANDO ÓRGÃOS PÚBLICOS DISPONIBILIZAM UMA LISTA DE EQUIPAMENTOS QUE NÃO UTILIZAM MAIS E QUE SERÃO ENVIADOS PARA RECONDICIONAMENTO.' },
            { id: 'crc', nome: 'CRC', icon: '🔧', x: 16, y: 68, cor: '#f59e0b',
            texto: 'QUANDO O CRC DÁ O ACEITE E RETIRA A LISTA DE DESFAZIMENTO, ELE INICIA O PROCESSO DE RECONDICIONAMENTO: TRIAGEM, DIAGNÓSTICO, MANUTENÇÃO E FORMATAÇÃO COM SOFTWARE LIVRE.' },
            { id: 'eventos', nome: 'EVENTOS', icon: '🎪', x: 73, y: 23, cor: '#8b5cf6',
            texto: 'QUANDO O CRC TERMINA DE RECONDICIONAR OS EQUIPAMENTOS, ELE SINALIZA AO SETOR DE EVENTOS QUE HÁ COMPUTADORES PRONTOS PARA SEREM DOADOS EM UMA CERIMÔNIA DE INCLUSÃO DIGITAL.' },
            { id: 'sistemas', nome: 'SISTEMAS', icon: '💾', x: 83, y: 45, cor: '#ec4899',
            texto: 'QUANDO O EVENTO É CONCLUÍDO COM SUCESSO, OS TERMOS DE DOAÇÃO E CERTIFICADOS DE FORMAÇÃO CHEGAM AO SETOR DE SISTEMAS PARA SEREM CONTABILIZADOS, ORGANIZADOS E ARMAZENADOS.' },
            { id: 'inclusao', nome: 'INCLUSÃO DIGITAL', icon: '🌍', x: 88, y: 70, cor: '#10b981',
            texto: 'APÓS TODAS AS ETAPAS, A INCLUSÃO DIGITAL COMEÇA A SER FEITA! COMPUTADORES RECONDICIONADOS CHEGAM ÀS ESCOLAS, TELECENTROS, BIBLIOTECAS E COMUNIDADES, TRANSFORMANDO VIDAS ATRAVÉS DA TECNOLOGIA!' },
        ]
    };
    renderTremMapa(accent);
}

function renderTremMapa(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishTremMapaSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    var fase = tremMapaState.fase;
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">';
    html += '<span style="background:' + accent + '; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">' + (simTaskIndex+1) + '/' + simTasks.length + '</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:13px">💡 ' + (task.hint || 'Clique na estação destacada') + '</p></div></div>';
    
    // MAPA
    // PLANETA TERRA DE FUNDO
    html += '<div style="background-image:url(\'img2/terra.png\'); background-size:cover; background-position:center; border:2px solid #334155; border-radius:14px; min-height:500px; position:relative; overflow:hidden">';
    
    

    // TRILHO DE FUNDO (cinza pontilhado)
    html += '<svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1">';
    html += '<path d="M50,50 Q35,25 22,30 Q18,50 16,68 Q40,45 73,23 Q78,30 83,45 Q85,58 88,70" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-dasharray="10,8" opacity="0.5"/>';
    html += '</svg>';
    
    // RASTRO DO TREM (linha verde que segue ele)
    // RASTRO DE BOLINHAS VERDES
    if (tremMapaState.rastro && tremMapaState.rastro.length > 0) {
        tremMapaState.rastro.forEach(function(ponto, i) {
            // Só desenha algumas bolinhas (1 a cada 2)
            if (i % 2 === 0) {
                html += '<div style="position:absolute; left:' + ponto.x + '%; top:' + ponto.y + '%; width:6px; height:6px; background:#000; border-radius:50%; transform:translate(-50%,-50%); z-index:8; box-shadow:0 0 6px #00000080"></div>';
            }
        });
    }
        
    // ESTAÇÕES
    tremMapaState.estacoes.forEach(function(est, idx) {
        var visitada = idx < simTaskIndex;
        var atual = idx === simTaskIndex;
        html += '<div onclick="clicarEstacao(\'' + est.id + '\')" style="position:absolute; left:' + est.x + '%; top:' + est.y + '%; transform:translate(-50%,-50%); cursor:' + (atual ? 'pointer' : 'default') + '; text-align:center; z-index:10; ' + (atual ? 'animation: pulse 1.2s infinite;' : '') + '">';
        
        html += '<div style="width:' + (atual ? '55px' : '40px') + '; height:' + (atual ? '55px' : '40px') + '; border-radius:50%; background:' + (visitada ? '#10b981' : est.cor + '30') + '; border:3px solid ' + (visitada ? '#10b981' : est.cor) + '; display:flex; align-items:center; justify-content:center; margin:0 auto; transition:0.3s; ' + (atual ? 'box-shadow:0 0 25px ' + est.cor + '80;' : '') + '">';
        html += '<span style="font-size:' + (atual ? '26px' : '18px') + '">' + (visitada ? '✅' : est.icon) + '</span>';
        html += '</div>';
        
        html += '<div style="background:rgba(0,0,0,0.7); border-radius:6px; padding:3px 8px; font-size:9px; font-weight:700; color:white; margin-top:4px; white-space:nowrap">' + est.nome + '</div>';
        
        if (atual) {
            html += '<div style="color:#fbbf24; font-size:10px; font-weight:700; margin-top:3px; background:rgba(0,0,0,0.5); border-radius:4px; padding:2px 6px">👆 CLIQUE</div>';
        }
        html += '</div>';
    });
    
    // TREM (locomotiva)
    html += '<div style="position:absolute; left:' + tremMapaState.tremX + '%; top:' + tremMapaState.tremY + '%; transition: none; z-index:12; font-size:32px; transform:translate(-50%,-50%)">🚂</div>';
    

    // CAIXA DE TEXTO FIXA NO BOTTOM
    html += '<div id="trem-texto-box" style="position:absolute; bottom:8px; left:50%; transform:translateX(-50%); width:90%; max-width:500px; background:rgba(0,0,0,0.9); border:2px solid ' + (fase > 0 ? tremMapaState.estacoes[fase-1].cor : '#334155') + '; border-radius:12px; padding:12px 16px; z-index:15">';
    if (fase > 0 && fase <= tremMapaState.estacoes.length) {
        var estAtual = tremMapaState.estacoes[fase - 1];
        html += '<div style="display:flex; align-items:center; gap:8px; margin-bottom:6px">';
        html += '<span style="font-size:22px">' + estAtual.icon + '</span>';
        html += '<span style="color:' + estAtual.cor + '; font-weight:700; font-size:14px">' + estAtual.nome + '</span>';
        html += '<span style="margin-left:auto; color:#64748b; font-size:9px">Etapa ' + fase + ' de 5</span></div>';
        html += '<p style="color:#e2e8f0; font-size:12px; line-height:1.6; margin:0">' + estAtual.texto + '</p>';
    } else {
        html += '<p style="color:#94a3b8; font-size:12px; text-align:center; margin:0">🚂 Clique na primeira estação para começar a jornada!</p>';
    }
    html += '</div>';
    
    // MENSAGEM FINAL
    if (fase >= 5) {
        html += '<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:white; border:4px solid #10b981; border-radius:20px; padding:24px 36px; text-align:center; box-shadow:0 15px 50px rgba(0,0,0,0.4); z-index:20; animation: float 2s ease-in-out infinite">';
        html += '<div style="font-size:60px; margin-bottom:12px">🎉</div>';
        html += '<div style="font-size:20px; font-weight:700; color:#10b981; margin-bottom:8px">INCLUSÃO DIGITAL REALIZADA!</div>';
        html += '<div style="font-size:14px; color:#333; margin-bottom:4px">O trem da CGID completou sua jornada!</div>';
        html += '<div style="font-size:12px; color:#666">Computadores chegando às escolas, telecentros e bibliotecas 🚀</div></div>';
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
}

// ═══ NOVA ANIMAÇÃO COM BOLINHAS ═══

function clicarEstacao(estId) {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task || task.target !== estId) return;
    
    simLocked = true;
    
    var posicoesX = [22, 16, 73, 83, 88];
    var posicoesY = [30, 68, 23, 45, 70];
    
    var inicioX = tremMapaState.tremX;
    var inicioY = tremMapaState.tremY;
    var destinoX = posicoesX[simTaskIndex];
    var destinoY = posicoesY[simTaskIndex];
    
    // Cria rastro de bolinhas entre início e destino
    var rastroTemp = [];
    var passos = 20;
    for (var i = 0; i <= passos; i++) {
        var progress = i / passos;
        var rx = inicioX + (destinoX - inicioX) * progress;
        var ry = inicioY + (destinoY - inicioY) * progress;
        rastroTemp.push({ x: rx, y: ry });
    }
    
    // Adiciona ao rastro permanente
    if (!tremMapaState.rastro) tremMapaState.rastro = [];
    tremMapaState.rastro = tremMapaState.rastro.concat(rastroTemp);
    
    tremMapaState.fase = simTaskIndex + 1;
    tremMapaState.tremX = destinoX;
    tremMapaState.tremY = destinoY;
    
    var est = tremMapaState.estacoes[simTaskIndex];
    showToast('✓ ' + est.nome + ' concluído!', 'success');
    
    renderTremMapa(currentWorld?.color || '#2563EB');
    setTimeout(function() { advanceTremMapaTask(); }, 2000);
}

// Função de animação frame a frame
function animarTrem(x1, y1, x2, y2, callback) {
    var steps = 30;
    var step = 0;
    var rastroTemp = [];
    
    var interval = setInterval(function() {
        step++;
        var progress = step / steps;
        var cx = x1 + (x2 - x1) * progress;
        var cy = y1 + (y2 - y1) * progress;
        
        tremMapaState.tremX = cx;
        tremMapaState.tremY = cy;
        
        // Adiciona ponto ao rastro temporário
        rastroTemp.push({ x: cx, y: cy });
        tremMapaState.rastroAnimado = rastroTemp;
        
        renderTremMapa(currentWorld?.color || '#2563EB');
        
        if (step >= steps) {
            clearInterval(interval);
            tremMapaState.rastroAnimado = null;
            if (callback) callback();
        }
    }, 50);
}

function advanceTremMapaTask() {
    simTaskIndex++;
    if (simTaskIndex >= simTasks.length) finishTremMapaSimulation();
    else renderTremMapa(currentWorld?.color || '#2563EB');
}

function finishTremMapaSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">🚂</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Jornada Completa!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Desfazimento → CRC → Eventos → Sistemas → Inclusão Digital 🌍</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}