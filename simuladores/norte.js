// ═══════════════════════════════════════════════════════════
// SIMULADOR NORTE CONECTADO (COMPLETO)
// ═══════════════════════════════════════════════════════════

let norteState = {};

function startNorteSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    norteState = {
        caboInstalado: false,
        manausConectada: false,
        parintinsConectada: false,
        tefeConectada: false,
        saoGabrielConectada: false,
        ativado: false,
        cidades: [
            { id: 'manaus', name: 'Manaus', x: 70, y: 43, conectada: false },
            { id: 'parintins', name: 'Parintins', x: 73, y: 50, conectada: false },
            { id: 'tefe', name: 'Tefé', x: 28, y: 47, conectada: false },
            { id: 'sao-gabriel', name: 'São Gabriel da Cachoeira', x: 38, y: 20, conectada: false },
        ]
    };
    
    renderNorte(accent);
}

function renderNorte(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishNorteSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    
    // Lista de cidades na ordem de conexão
    const ordemCidades = ['manaus', 'parintins', 'tefe', 'sao-gabriel'];
    const cidadesConectadas = ordemCidades.filter(id => norteState[id + 'Conectada']);
    
    // Gera o SVG do fio conectando as cidades já clicadas
    let fioSVG = '';
    if (norteState.caboInstalado && cidadesConectadas.length >= 2) {
        for (let i = 0; i < cidadesConectadas.length - 1; i++) {
            const c1 = norteState.cidades.find(c => c.id === cidadesConectadas[i]);
            const c2 = norteState.cidades.find(c => c.id === cidadesConectadas[i + 1]);
            if (c1 && c2) {
                fioSVG += `
                    <line x1="${c1.x}%" y1="${c1.y}%" x2="${c2.x}%" y2="${c2.y}%" 
                        stroke="#3b82f6" stroke-width="3" opacity="0.8" stroke-linecap="round">
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze"/>
                    </line>
                    <line x1="${c1.x}%" y1="${c1.y}%" x2="${c2.x}%" y2="${c2.y}%" 
                        stroke="#60a5fa" stroke-width="1.5" opacity="0.5" stroke-linecap="round" stroke-dasharray="8,4">
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.5s" fill="freeze"/>
                    </line>
                `;
            }
        }
    }
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        
        <div style="background:${accent}15; border:2px solid ${accent}50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">
            <span style="background:${accent}; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">${simTaskIndex+1}/${simTasks.length}</span>
            <div>
                <p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">${task.label}</p>
                <p style="color:#93c5fd; font-size:13px">💡 ${task.hint || 'Siga as instruções'}</p>
            </div>
        </div>
        
        <div style="background:#0d1f0d; border:2px solid #1a3b66; border-radius:14px; overflow:hidden; min-height:480px; position:relative">
            
            <div style="position:relative; height:380px; padding:10px">
                
                <!-- Mapa -->
                <img src="img2/amazonas.png" style="position:absolute; inset:0; width:100%; height:100%; opacity:1.0; object-fit:contain; pointer-events:none" />
                
                <!-- Fios SVG conectando cidades -->
                ${norteState.caboInstalado ? `
                <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:4">
                    ${fioSVG}
                </svg>
                ` : ''}
                
                <!-- Rio Amazonas clicável -->
                ${!norteState.caboInstalado ? `
                <div id="rio-click" onclick="handleRioClick()" 
                    style="position:absolute; top:155px; left:412px; width:120px; height:20px; cursor:pointer; z-index:5; border-radius:10px"
                    onmouseover="this.style.background='rgba(59,130,246,0.15)'"
                    onmouseout="this.style.background='transparent'">
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#000000; font-size:14px; font-weight:700; text-align:center; text-shadow:none">
                        📍 Instale Aqui
                    </div>
                </div>
                ` : ''}
                
                <!-- Cidades -->
                ${norteState.cidades.map(cidade => {
                    const conectada = norteState[cidade.id + 'Conectada'];
                    return `
                    <div onclick="handleCityClick('${cidade.id}')"
                        style="position:absolute; left:${cidade.x}%; top:${cidade.y}%; transform:translate(-50%,-50%);
                            width:${conectada ? '36px' : '28px'}; 
                            height:${conectada ? '36px' : '28px'};
                            background:${conectada ? 'rgba(6, 55, 95, 0.9)' : 'transparent'}; 
                            border:${conectada ? '3px solid #10b981' : 'none'};
                            border-radius:50%; cursor:${norteState.caboInstalado && !conectada ? 'pointer' : 'default'};
                            display:flex; align-items:center; justify-content:center;
                            z-index:6; transition:0.3s;
                            box-shadow:${conectada ? '0 0 20px rgba(16,185,129,0.6)' : 'none'}">
                        <span style="font-size:${conectada ? '16px' : '18px'}">
                            ${conectada ? '✅' : '📍'}
                        </span>
                    </div>
                `}).join('')}
            </div>
            
            <!-- Painel -->
            <div style="background:#1e293b; border-top:2px solid #334155; padding:16px; display:flex; align-items:center; justify-content:space-between">
                <div style="display:flex; gap:16px; align-items:center">
                    <div style="display:flex; align-items:center; gap:6px">
                        <div style="width:12px; height:12px; border-radius:50%; background:${norteState.caboInstalado ? '#10b981' : '#ef4444'}"></div>
                        <span style="color:white; font-size:12px; font-weight:600">Cabo</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px">
                        <div style="width:12px; height:12px; border-radius:50%; background:${cidadesConectadas.length >= 4 ? '#10b981' : '#ef4444'}"></div>
                        <span style="color:white; font-size:12px; font-weight:600">${cidadesConectadas.length}/4 Cidades</span>
                    </div>
                </div>
                <button onclick="handleAtivar()"
                    style="padding:12px 28px; border:none; border-radius:10px; font-weight:700; font-size:14px; cursor:pointer;
                        background:${norteState.ativado ? '#065f46' : accent}; color:white;
                        opacity:${cidadesConectadas.length >= 4 ? '1' : '0.5'}">
                    ${norteState.ativado ? '✅ Conectado!' : '⚡ Ativar Conexão'}
                </button>
            </div>
        </div>
        
        <div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); 
            padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap;
            box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>
        
        <div style="display:flex; gap:8px; justify-content:center; margin-top:14px">
            ${simTasks.map((_, i) => `
                <div style="width:${i===simTaskIndex?30:12}px; height:12px; border-radius:6px; 
                    background:${i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155'}; transition:0.3s"></div>
            `).join('')}
        </div>
    `;
}

function handleRioClick() {
    if (simLocked) return;
    
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'rio-amazonas') {
        norteState.caboInstalado = true;
        simLocked = true;
        showToast('✓ Cabo subfluvial instalado no Rio Amazonas!', 'success');
        advanceNorteTask();
    }
}

function handleCityClick(cityId) {
    if (simLocked || !norteState.caboInstalado) return;
    if (norteState[cityId + 'Conectada']) return;
    
    const task = simTasks[simTaskIndex];
    if (task && task.target === cityId) {
        norteState[cityId + 'Conectada'] = true;
        simLocked = true;
        const nomes = { 
            'manaus': 'Manaus', 
            'parintins': 'Parintins', 
            'tefe': 'Tefé',
            'sao-gabriel': 'São Gabriel da Cachoeira'
        };
        showToast('✓ ' + nomes[cityId] + ' conectada!', 'success');
        advanceNorteTask();
    }
}

function handleAtivar() {
    if (simLocked || !norteState.caboInstalado) return;
    
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'ativar-btn') {
        norteState.ativado = true;
        simLocked = true;
        showToast('⚡ Norte Conectado ATIVADO com sucesso!', 'success');
        advanceNorteTask();
    }
}

function advanceNorteTask() {
    simTaskIndex++;
    
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) {
            finishNorteSimulation();
        } else {
            renderNorte(currentWorld?.color || '#2563EB');
        }
    }, 400);
}

function finishNorteSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">🔌</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Norte Conectado!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Fibra óptica instalada em Manaus, Parintins, Tefé e São Gabriel!</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}