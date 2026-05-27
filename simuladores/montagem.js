// ═══════════════════════════════════════════════════════════
// SIMULADOR MONTAGEM DE TELECENTRO (COMPLETO E CORRIGIDO)
// ═══════════════════════════════════════════════════════════

let montagemState = {};
let montagemDragged = null;

function startMontagemSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    montagemState = {
        colocados: {},
        equipamentos: [
            { id: 'mesas', nome: 'Mesas', icon: '🪑', cor: '#8b5cf6' },
            { id: 'cadeiras', nome: 'Cadeiras', icon: '💺', cor: '#3b82f6' },
            { id: 'computadores', nome: 'Computadores', icon: '🖥️', cor: '#10b981' },
            { id: 'roteador', nome: 'Roteador', icon: '🌐', cor: '#f59e0b' },
            { id: 'material', nome: 'Material Didático', icon: '📚', cor: '#ec4899' },
        ]
    };
    renderMontagem(accent);
}

function renderMontagem(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishMontagemSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    var disponiveis = montagemState.equipamentos.filter(function(e) { return !montagemState.colocados[e.id]; });
    var totalColocados = Object.keys(montagemState.colocados).length;
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong></div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">';
    html += '<span style="background:' + accent + '; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">' + (simTaskIndex+1) + '/' + simTasks.length + '</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:13px">💡 ' + (task.hint || 'Arraste para a sala') + '</p></div></div>';
    
    html += '<div style="display:flex; gap:12px">';
    
    // Depósito
    html += '<div style="width:110px; flex-shrink:0">';
    html += '<p style="color:#64748b; font-size:9px; font-weight:700; text-align:center; margin-bottom:8px">DEPÓSITO</p>';
    disponiveis.forEach(function(e) {
        html += '<div id="dep-' + e.id + '" draggable="true" ondragstart="montagemDragStart(event,\'' + e.id + '\')" ondragend="montagemDragEnd()" style="background:' + e.cor + '20; border:2px solid ' + e.cor + '50; border-radius:10px; padding:10px; margin-bottom:6px; cursor:grab; text-align:center; transition:0.2s" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">';
        html += '<div style="font-size:28px">' + e.icon + '</div>';
        html += '<div style="color:white; font-size:9px; font-weight:700; margin-top:2px">' + e.nome + '</div></div>';
    });
    if (disponiveis.length === 0) {
        html += '<div style="color:#10b981; font-size:11px; text-align:center; font-weight:700">✅ Tudo pronto!</div>';
    }
    html += '</div>';
    
    // Sala
    html += '<div style="flex:1; background:#f5f0e8; border:3px solid #8b7355; border-radius:12px; min-height:440px; position:relative; overflow:hidden" ondragover="event.preventDefault()" ondrop="montagemDrop(event)">';
    
    // Piso
    html += '<div style="position:absolute; bottom:0; left:0; right:0; height:62%; background:linear-gradient(90deg, #c49a6c, #d4a87c, #c49a6c); background-image:repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 41px)"></div>';
    // Parede
    html += '<div style="position:absolute; top:0; left:0; right:0; height:38%; background:linear-gradient(180deg, #fff8e7, #f0e6d3); border-bottom:4px solid #8b7355"></div>';
    // Rodapé
    html += '<div style="position:absolute; top:38%; left:0; right:0; height:8px; background:#6b4f3a"></div>';
    // Janela
    html += '<div style="position:absolute; top:8%; right:5%; width:60px; height:45px; background:linear-gradient(180deg, #87ceeb, #b8e6f0); border:4px solid #8b7355; border-radius:4px; overflow:hidden"><div style="font-size:6px; text-align:center; padding-top:3px">☀️</div><div style="background:#7ec34a; height:12px; margin-top:6px"></div></div>';
    // Banner
    html += '<div style="position:absolute; top:8%; left:50%; transform:translateX(-50%); width:90px; height:30px; background:linear-gradient(135deg, #1e3a8a, #2563eb); border-radius:4px; display:flex; align-items:center; justify-content:center; box-shadow:2px 2px 5px rgba(0,0,0,0.2)"><span style="color:white; font-size:7px; font-weight:700; text-align:center; line-height:1.2">VALEU<br>MCom!</span></div>';
    
    // Roteador
    if (montagemState.colocados['roteador']) {
        html += '<div style="position:absolute; right:8%; top:10%; pointer-events:none; text-align:center">';
        html += '<div style="width:20px; height:25px; background:#1e293b; border:2px solid #334155; border-radius:4px; margin:0 auto"></div>';
        html += '<div style="width:6px; height:10px; background:#334155; margin:-1px auto 0"></div>';
        html += '<div style="font-size:6px; color:#10b981; margin-top:2px">📶📶📶</div>';
        html += '<div style="color:#333; font-size:6px; font-weight:700">WI-FI</div></div>';
    }
    
    // 4 Mesas
    if (montagemState.colocados['mesas']) {

        // 🌱 Planta decorativa esquerda
        html += '<div style="position:absolute; left:4%; bottom:8%; z-index:3">';
        html += '<div style="width:28px; height:28px; background:#7c5a3a; border-radius:0 0 8px 8px; margin:0 auto"></div>';
        html += '<div style="font-size:30px; margin-top:-48px">🌿</div>';
        html += '</div>';

        // 🌱 Planta decorativa direita
        html += '<div style="position:absolute; right:5%; bottom:10%; z-index:3">';
        html += '<div style="width:28px; height:28px; background:#7c5a3a; border-radius:0 0 8px 8px; margin:0 auto"></div>';
        html += '<div style="font-size:30px; margin-top:-48px">🪴</div>';
        html += '</div>';

        // 📚 Biblioteca embutida
        if (montagemState.colocados['material']) {

            // parede esquerda
            html += '<div style="position:absolute; left:2%; top:18%; width:72px; z-index:2">';

            for (var s = 0; s < 3; s++) {

                html += '<div style="height:8px; background:#7a5230; border-radius:4px; margin-bottom:5px; box-shadow:0 2px 5px rgba(0,0,0,0.2)"></div>';

                html += '<div style="display:flex; gap:3px; align-items:end; margin-bottom:8px">';

                var cores = ['#ef4444','#3b82f6','#10b981','#f59e0b','#8b5cf6','#ec4899'];

                cores.forEach(function(cor, i) {

                    var altura = 18 + (Math.random() * 12);

                    html += '<div style="width:8px; height:' + altura + 'px; background:' + cor + '; border-radius:2px 2px 0 0"></div>';
                });

                html += '</div>';
            }

            html += '<div style="display:flex; justify-content:center; gap:4px; margin-top:4px">';
            html += '<div style="font-size:14px">📘</div>';
            html += '<div style="font-size:14px">📗</div>';
            html += '</div>';

            html += '</div>';

            // parede direita
            html += '<div style="position:absolute; right:2%; top:24%; width:58px; z-index:2; opacity:0.95">';

            for (var t = 0; t < 2; t++) {

                html += '<div style="height:7px; background:#7a5230; border-radius:4px; margin-bottom:5px"></div>';

                html += '<div style="display:flex; gap:2px; align-items:end; margin-bottom:7px">';

                var cores2 = ['#06b6d4','#84cc16','#f97316','#ec4899','#eab308'];

                cores2.forEach(function(cor) {

                    var altura2 = 16 + (Math.random() * 10);

                    html += '<div style="width:7px; height:' + altura2 + 'px; background:' + cor + '; border-radius:2px 2px 0 0"></div>';
                });

                html += '</div>';
            }

            html += '</div>';
        }

        var mesas = [
            { left:'12%', top:'48%', pessoa:'🧑🏽‍💻' },
            { left:'58%', top:'48%', pessoa:'👩🏾‍💻' },
            { left:'12%', top:'72%', pessoa:'🧑🏻‍💻' },
            { left:'58%', top:'72%', pessoa:'👩🏿‍💻' }
        ];

        mesas.forEach(function(m) {

            html += '<div style="position:absolute; left:' + m.left + '; top:' + m.top + '; width:130px; height:120px; z-index:4">';

            // sombra da mesa
            html += '<div style="position:absolute; top:56px; left:10px; width:100px; height:18px; background:rgba(0,0,0,0.12); filter:blur(8px); border-radius:50%"></div>';

            // cadeira
            if (montagemState.colocados['cadeiras']) {

                // encosto
                html += '<div style="position:absolute; top:12px; left:40px; width:34px; height:34px; background:linear-gradient(180deg,#4f83ff,#2563eb); border-radius:12px 12px 6px 6px; z-index:1"></div>';

                // assento
                html += '<div style="position:absolute; top:38px; left:38px; width:38px; height:10px; background:#1d4ed8; border-radius:6px; z-index:1"></div>';

                // pernas cadeira
                html += '<div style="position:absolute; top:46px; left:44px; width:4px; height:24px; background:#475569"></div>';
                html += '<div style="position:absolute; top:46px; left:64px; width:4px; height:24px; background:#475569"></div>';
            }

            // mesa
            html += '<div style="position:absolute; top:48px; left:16px; width:92px; height:14px; background:linear-gradient(180deg,#b08968,#8b5e3c); border-radius:6px; box-shadow:0 4px 10px rgba(0,0,0,0.25); z-index:3"></div>';

            // pernas mesa
            html += '<div style="position:absolute; top:60px; left:20px; width:8px; height:34px; background:#6b3f2a"></div>';
            html += '<div style="position:absolute; top:60px; right:20px; width:8px; height:34px; background:#6b3f2a"></div>';

            // computador
            if (montagemState.colocados['computadores']) {

                // monitor
                html += '<div style="position:absolute; top:6px; left:40px; width:42px; height:28px; background:#1e293b; border:3px solid #334155; border-radius:6px; z-index:5; box-shadow:0 0 10px rgba(59,130,246,0.35)">';

                // brilho tela
                html += '<div style="width:100%; height:100%; background:linear-gradient(135deg,rgba(255,255,255,0.25),transparent); border-radius:3px"></div>';

                html += '</div>';

                // base monitor
                html += '<div style="position:absolute; top:34px; left:57px; width:8px; height:10px; background:#475569; z-index:5"></div>';

                // teclado
                html += '<div style="position:absolute; top:42px; left:47px; width:28px; height:5px; background:#374151; border-radius:3px; z-index:5"></div>';

                // mouse
                html += '<div style="position:absolute; top:42px; left:80px; width:6px; height:8px; background:#475569; border-radius:4px; z-index:5"></div>';
            }

            // pessoa
            if (totalColocados >= 5) {

                html += '<div style="position:absolute; top:-6px; left:42px; font-size:30px; z-index:6; filter:drop-shadow(0 2px 3px rgba(0,0,0,0.25))">';
                html += m.pessoa;
                html += '</div>';
            }

            html += '</div>';
        });

        // ✨ faixa final
        if (totalColocados >= 5) {

            html += '<div style="position:absolute; bottom:3%; left:50%; transform:translateX(-50%); background:rgba(255,255,255,0.88); backdrop-filter:blur(4px); padding:10px 18px; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:20">';

            html += '<div style="color:#14532d; font-size:14px; font-weight:800; letter-spacing:0.3px">';
            html += '✨ Inclusão Digital Acontecendo ✨';
            html += '</div>';

            html += '</div>';
        }
    }
    
    // Barra de progresso
    html += '<div style="display:flex; gap:8px; justify-content:center; margin-top:14px">';
    simTasks.forEach(function(_, i) {
        html += '<div style="width:' + (i===simTaskIndex?30:12) + 'px; height:12px; border-radius:6px; background:' + (i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155') + '; transition:0.3s"></div>';
    });
    html += '</div>';
    
    // Toast
    html += '<div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>';
    
    content.innerHTML = html;
}

function montagemDragStart(e, itemId) {
    montagemDragged = itemId;
    e.target.style.opacity = '0.5';
}

function montagemDragEnd() {
    montagemDragged = null;
    var deps = document.querySelectorAll('[id^="dep-"]');
    deps.forEach(function(el) { el.style.opacity = '1'; });
}

function montagemDrop(e) {
    e.preventDefault();
    if (!montagemDragged || simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    if (montagemDragged === task.target) {
        montagemState.colocados[montagemDragged] = true;
        simLocked = true;
        
        // Força a re-renderização imediata pra mostrar tudo
        renderMontagem(currentWorld?.color || '#2563EB');
        
        var eq = montagemState.equipamentos.find(function(e) { return e.id === montagemDragged; });
        showToast('✓ ' + eq.nome + ' colocados na sala!', 'success');
        advanceMontagemTask();
        return;
    } else {
        showToast('⚠️ Coloque os equipamentos na ordem correta!', 'error');
    }
    montagemDragged = null;
}

function advanceMontagemTask() {
    simTaskIndex++;
    var delay = simTaskIndex >= simTasks.length ? 2500 : 400;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishMontagemSimulation();
        else renderMontagem(currentWorld?.color || '#2563EB');
    }, delay);
}

function finishMontagemSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = '<div style="text-align:center; padding:40px 20px"><div style="font-size:80px; margin-bottom:16px">🏗️</div><h2 style="color:white; font-size:22px; margin-bottom:8px">Telecentro Montado!</h2><p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Todos os equipamentos instalados! Inclusão digital acontecendo!</p><div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + [1,2,3,4,5].map(function(i) { return '<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>'; }).join('') + '</div><button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button></div>';
}