// ═══════════════════════════════════════════════════════════
// SIMULADOR CHECKLIST DE BENEFICIÁRIOS
// ═══════════════════════════════════════════════════════════

let checklistState = {};

function startChecklistSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    checklistState = {
        answers: {},
        entidades: [
            { id: 'escola', nome: 'Escola Municipal de Manaus', info: 'Órgão público educacional', icon: '🏫' },
            { id: 'empresa', nome: 'Empresa XYZ Tecnologia Ltda', info: 'Empresa com fins lucrativos', icon: '🏢' },
            { id: 'ong', nome: 'ONG de Inclusão Digital de Idosos', info: 'Entidade sem fins lucrativos', icon: '🤝' },
            { id: 'cras', nome: 'CRAS do município', info: 'Centro de Referência de Assistência Social', icon: '🏛️' },
            { id: 'partido', nome: 'Partido Político Municipal', info: 'Partido político', icon: '🗳️' },
        ]
    };
    
    renderChecklist(accent);
}

function renderChecklist(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishChecklistSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    const entidade = checklistState.entidades[simTaskIndex];
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        
        <div style="background:${accent}15; border:2px solid ${accent}50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">
            <span style="background:${accent}; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">${simTaskIndex+1}/${simTasks.length}</span>
            <div>
                <p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">${task.label}</p>
                <p style="color:#93c5fd; font-size:13px">💡 ${task.hint || 'Marque SIM ou NÃO'}</p>
            </div>
        </div>
        
        <!-- Entidade atual -->
        <div style="background:#1e293b; border:2px solid #334155; border-radius:14px; padding:24px; text-align:center">
            
            <div style="font-size:50px; margin-bottom:8px">${entidade.icon}</div>
            <h3 style="color:white; font-size:18px; margin-bottom:4px">${entidade.nome}</h3>
            <p style="color:#94a3b8; font-size:12px; margin-bottom:20px">${entidade.info}</p>
            
            <div style="font-size:18px; color:#fbbf24; margin-bottom:20px">Esta entidade PODE receber computadores do programa?</div>
            
            <div style="display:flex; gap:16px; justify-content:center">
                <button onclick="handleChecklistAnswer(true)"
                    style="padding:16px 40px; background:#10b98120; border:3px solid #10b981; border-radius:14px; color:#10b981; 
                        font-weight:700; font-size:18px; cursor:pointer; transition:0.3s"
                    onmouseover="this.style.background='#10b98130'; this.style.transform='scale(1.05)'"
                    onmouseout="this.style.background='#10b98120'; this.style.transform='scale(1)'">
                    ✅ SIM
                </button>
                <button onclick="handleChecklistAnswer(false)"
                    style="padding:16px 40px; background:#ef444420; border:3px solid #ef4444; border-radius:14px; color:#ef4444; 
                        font-weight:700; font-size:18px; cursor:pointer; transition:0.3s"
                    onmouseover="this.style.background='#ef444430'; this.style.transform='scale(1.05)'"
                    onmouseout="this.style.background='#ef444420'; this.style.transform='scale(1)'">
                    ❌ NÃO
                </button>
            </div>
            
            <!-- Resposta anterior -->
            ${checklistState.answers[entidade.id] !== undefined ? `
            <div style="margin-top:16px; padding:12px; background:${checklistState.answers[entidade.id] === task.correto ? '#065f4620' : '#7f1d1d20'}; 
                border:2px solid ${checklistState.answers[entidade.id] === task.correto ? '#10b981' : '#ef4444'}; border-radius:10px">
                <span style="color:${checklistState.answers[entidade.id] === task.correto ? '#6ee7b7' : '#fca5a5'}; font-weight:700">
                    ${checklistState.answers[entidade.id] === task.correto ? '✅ Correto!' : '❌ Incorreto!'}
                </span>
                <span style="color:#94a3b8; font-size:12px; margin-left:8px">
                    ${entidade.id === 'empresa' || entidade.id === 'partido' ? 
                        'Empresas com fins lucrativos e partidos políticos NÃO podem receber.' : 
                        'Órgãos públicos e entidades sem fins lucrativos PODEM receber.'}
                </span>
            </div>
            ` : ''}
        </div>
        
        <!-- Progresso das entidades -->
        <div style="display:flex; gap:8px; justify-content:center; margin-top:16px">
            ${checklistState.entidades.map((e, i) => `
                <div style="width:40px; height:40px; border-radius:50%; 
                    background:${checklistState.answers[e.id] !== undefined ? (checklistState.answers[e.id] === simTasks[i]?.correto ? '#10b981' : '#ef4444') : '#1e293b'}; 
                    border:3px solid ${i === simTaskIndex ? accent : checklistState.answers[e.id] !== undefined ? '#334155' : '#334155'};
                    display:flex; align-items:center; justify-content:center; font-size:16px; transition:0.3s;
                    ${i === simTaskIndex ? 'box-shadow:0 0 15px ' + accent + '60;' : ''}">
                    ${checklistState.answers[e.id] !== undefined ? (checklistState.answers[e.id] === simTasks[i]?.correto ? '✅' : '❌') : e.icon}
                </div>
            `).join('')}
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
}

function handleChecklistAnswer(resposta) {
    if (simLocked) return;
    
    const task = simTasks[simTaskIndex];
    if (!task) return;
    
    const entidade = checklistState.entidades[simTaskIndex];
    checklistState.answers[entidade.id] = resposta;
    
    if (resposta === task.correto) {
        showToast('✅ Correto!', 'success');
    } else {
        showToast('❌ Incorreto!', 'error');
    }
    
    simLocked = true;
    advanceChecklistTask();
}

function advanceChecklistTask() {
    simTaskIndex++;
    
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) finishChecklistSimulation();
        else renderChecklist(currentWorld?.color || '#2563EB');
    }, 800);
}

function finishChecklistSimulation() {
    simCompleted = true;
    const corretas = simTasks.filter((t, i) => {
        const entidade = checklistState.entidades[i];
        return checklistState.answers[entidade.id] === t.correto;
    }).length;
    window._practiceStars = corretas;
    
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">✅</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Checklist Concluído!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">${corretas} de ${simTasks.length} respostas corretas</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:${i<=corretas?'#fbbf24':'#334155'}; filter:${i<=corretas?'drop-shadow(0 0 8px rgba(251,191,36,0.6))':'none'}">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}