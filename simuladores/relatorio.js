// ═══════════════════════════════════════════════════════════
// SIMULADOR RELATÓRIO DE VISITA TÉCNICA
// ═══════════════════════════════════════════════════════════

let relatorioState = {};

function startRelatorioSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    relatorioState = {
        data: '',
        pid: '',
        pcs: '',
        status: '',
        enviado: false
    };
    
    renderRelatorio(accent);
}

function renderRelatorio(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishRelatorioSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    
    const preenchidos = [
        relatorioState.data ? 1 : 0,
        relatorioState.pid ? 1 : 0,
        relatorioState.pcs ? 1 : 0,
        relatorioState.status ? 1 : 0,
    ].reduce((a, b) => a + b, 0);
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        
        <div style="background:${accent}15; border:2px solid ${accent}50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">
            <span style="background:${accent}; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">${simTaskIndex+1}/${simTasks.length}</span>
            <div>
                <p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">${task.label}</p>
                <p style="color:#93c5fd; font-size:13px">💡 ${task.hint || 'Preencha o campo'}</p>
            </div>
        </div>
        
        <!-- FORMULÁRIO DE VISITA -->
        <div style="background:#1e293b; border:2px solid #334155; border-radius:14px; padding:24px">
            
            <!-- Cabeçalho do formulário -->
            <div style="background:#185abd; color:white; padding:12px 16px; border-radius:8px; margin-bottom:20px; display:flex; align-items:center; gap:8px">
                <span style="font-size:20px">📋</span>
                <div>
                    <div style="font-weight:700; font-size:14px">RELATÓRIO DE VISITA TÉCNICA</div>
                    <div style="font-size:10px; opacity:0.8">Programa Computadores para Inclusão</div>
                </div>
                <div style="margin-left:auto; font-size:10px">${preenchidos}/4 campos</div>
            </div>
            
            <!-- Campos -->
            <div style="display:flex; flex-direction:column; gap:14px">
                
                <!-- Data -->
                <div>
                    <label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">📅 Data da Visita</label>
                    <input id="relatorio-data" type="text" placeholder="DD/MM/AAAA" value="${relatorioState.data}"
                        oninput="relatorioState.data = this.value"
                        style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ${relatorioState.data ? '#10b981' : simTaskIndex===0 ? accent : '#334155'}; 
                            border-radius:8px; color:white; font-size:14px; outline:none">
                    ${simTaskIndex === 0 ? `<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>` : ''}
                </div>
                
                <!-- Nome do PID -->
                <div>
                    <label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">🏫 Nome do PID Visitado</label>
                    <input id="relatorio-pid" type="text" placeholder="Ex: Escola Municipal Santos Dumont" value="${relatorioState.pid}"
                        oninput="relatorioState.pid = this.value"
                        style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ${relatorioState.pid ? '#10b981' : simTaskIndex===1 ? accent : '#334155'}; 
                            border-radius:8px; color:white; font-size:14px; outline:none">
                    ${simTaskIndex === 1 ? `<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>` : ''}
                </div>
                
                <!-- Quantidade de PCs -->
                <div>
                    <label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">🖥️ Computadores Funcionando</label>
                    <input id="relatorio-pcs" type="number" min="0" placeholder="Ex: 15" value="${relatorioState.pcs}"
                        oninput="relatorioState.pcs = this.value"
                        style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ${relatorioState.pcs ? '#10b981' : simTaskIndex===2 ? accent : '#334155'}; 
                            border-radius:8px; color:white; font-size:14px; outline:none">
                    ${simTaskIndex === 2 ? `<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Preencha e pressione Enter para avançar</div>` : ''}
                </div>
                
                <!-- Status -->
                <div>
                    <label style="color:#94a3b8; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px">📊 Status da Visita</label>
                    <select id="relatorio-status" onchange="relatorioState.status = this.value; handleRelatorioChange()"
                        style="width:100%; padding:10px; margin-top:4px; background:#0f172a; border:2px solid ${relatorioState.status ? '#10b981' : simTaskIndex===3 ? accent : '#334155'}; 
                            border-radius:8px; color:white; font-size:14px; outline:none; cursor:pointer">
                        <option value="" style="background:#1e293b">Selecione...</option>
                        <option value="otimo" ${relatorioState.status==='otimo'?'selected':''} style="background:#1e293b">✅ Ótimo - Todos equipamentos funcionando</option>
                        <option value="bom" ${relatorioState.status==='bom'?'selected':''} style="background:#1e293b">👍 Bom - Pequenos ajustes necessários</option>
                        <option value="regular" ${relatorioState.status==='regular'?'selected':''} style="background:#1e293b">⚠️ Regular - Alguns equipamentos com problema</option>
                        <option value="ruim" ${relatorioState.status==='ruim'?'selected':''} style="background:#1e293b">❌ Ruim - Maioria dos equipamentos parados</option>
                    </select>
                    ${simTaskIndex === 3 ? `<div style="color:#fbbf24; font-size:10px; margin-top:4px">👆 Selecione uma opção para avançar</div>` : ''}
                </div>
            </div>
            
            <!-- Botão Enviar -->
            ${preenchidos >= 4 && !relatorioState.enviado ? `
            <div style="text-align:center; margin-top:20px">
                <button onclick="handleEnviarRelatorio()"
                    style="padding:14px 40px; background:#10b981; border:none; border-radius:10px; color:white; font-weight:700; 
                        font-size:15px; cursor:pointer; box-shadow:0 4px 15px rgba(16,185,129,0.3)">
                    📤 ENVIAR RELATÓRIO
                </button>
            </div>
            ` : ''}
            
            ${relatorioState.enviado ? `
            <div style="text-align:center; margin-top:20px; padding:16px; background:#065f4620; border:2px solid #10b981; border-radius:10px">
                <span style="font-size:30px">✅</span>
                <p style="color:#6ee7b7; font-weight:700; margin-top:4px">Relatório enviado com sucesso!</p>
            </div>
            ` : ''}
        </div>
        
        <!-- Toast -->
        <div id="sim-toast" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); 
            padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap;
            box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>
        
        <!-- Progresso -->
        <div style="display:flex; gap:8px; justify-content:center; margin-top:14px">
            ${simTasks.map((_, i) => `
                <div style="width:${i===simTaskIndex?30:12}px; height:12px; border-radius:6px; 
                    background:${i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155'}; transition:0.3s"></div>
            `).join('')}
        </div>
    `;
    
    // Enter nos inputs avança
    setTimeout(() => {
        ['relatorio-data', 'relatorio-pid', 'relatorio-pcs'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        handleRelatorioChange();
                    }
                });
            }
        });
    }, 200);
}

function handleRelatorioChange() {
    if (simLocked) return;
    
    const task = simTasks[simTaskIndex];
    if (!task) return;
    
    // Verifica se o campo atual foi preenchido
    let preenchido = false;
    if (task.target === 'input-data' && relatorioState.data) preenchido = true;
    if (task.target === 'input-pid' && relatorioState.pid) preenchido = true;
    if (task.target === 'input-pcs' && relatorioState.pcs) preenchido = true;
    if (task.target === 'select-status' && relatorioState.status) preenchido = true;
    
    if (preenchido) {
        simLocked = true;
        showToast('✓ Campo preenchido!', 'success');
        advanceRelatorioTask();
    }
}

function handleEnviarRelatorio() {
    if (simLocked) return;
    
    const task = simTasks[simTaskIndex];
    if (!task || task.target !== 'btn-enviar') return;
    
    relatorioState.enviado = true;
    simLocked = true;
    showToast('✓ Relatório enviado com sucesso!', 'success');
    advanceRelatorioTask();
}

function advanceRelatorioTask() {
    simTaskIndex++;
    
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) finishRelatorioSimulation();
        else renderRelatorio(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishRelatorioSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">📋</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Relatório Enviado!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">PID: ${relatorioState.pid} | ${relatorioState.pcs} PCs | Status: ${relatorioState.status}</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}