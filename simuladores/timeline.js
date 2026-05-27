// ═══════════════════════════════════════════════════════════
// SIMULADOR LINHA DO TEMPO
// ═══════════════════════════════════════════════════════════

let timelineState = {};
let timelineDragged = null;

function startTimelineSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    timelineState = {
        placed: {},
        items: [
            { id: '1g', name: '1G', year: '1980s', icon: '📞', info: 'Apenas voz analógica', color: '#ef4444' },
            { id: '2g', name: '2G', year: '1990s', icon: '💬', info: 'Voz digital + SMS', color: '#f59e0b' },
            { id: '3g', name: '3G', year: '2000s', icon: '🌐', info: 'Internet móvel', color: '#10b981' },
            { id: '4g', name: '4G', year: '2010s', icon: '🎬', info: 'Streaming de vídeo', color: '#3b82f6' },
            { id: '5g', name: '5G', year: '2020s', icon: '⚡', info: 'Velocidade altíssima + IoT', color: '#8b5cf6' },
        ]
    };
    
    renderTimeline(accent);
}

function renderTimeline(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishTimelineSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    const availableItems = timelineState.items.filter(item => !timelineState.placed[item.id]);
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        
        <div style="background:${accent}15; border:2px solid ${accent}50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">
            <span style="background:${accent}; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">${simTaskIndex+1}/${simTasks.length}</span>
            <div>
                <p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">${task.label}</p>
                <p style="color:#93c5fd; font-size:13px">💡 ${task.hint || 'Arraste o item para o local correto'}</p>
            </div>
        </div>
        
        <!-- Itens para arrastar -->
        <div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap; justify-content:center">
            ${availableItems.map(item => `
                <div id="tl-drag-${item.id}" draggable="true" 
                    ondragstart="timelineDragStart(event, '${item.id}')"
                    ondragend="timelineDragEnd()"
                    style="background:${item.color}20; border:2px solid ${item.color}50; border-radius:12px; padding:12px 16px; cursor:grab; display:flex; align-items:center; gap:8px; transition:0.2s"
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'">
                    <span style="font-size:24px">${item.icon}</span>
                    <div>
                        <div style="color:white; font-weight:700; font-size:14px">${item.name}</div>
                        <div style="color:${item.color}; font-size:10px">${item.info}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Linha do Tempo -->
        <div style="background:#1e293b; border:2px solid #334155; border-radius:14px; padding:30px 20px; position:relative">
            
            <!-- Linha horizontal -->
            <div style="position:relative; height:4px; background:linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6); border-radius:2px; margin:0 30px"></div>
            
            <!-- Slots -->
            <div style="display:flex; justify-content:space-between; margin-top:-12px; padding:0 15px">
                ${[1,2,3,4,5].map(pos => {
                    const placedItem = Object.entries(timelineState.placed).find(([itemId, p]) => p === pos);
                    const item = placedItem ? timelineState.items.find(i => i.id === placedItem[0]) : null;
                    return `
                        <div id="tl-slot-${pos}" 
                            style="width:70px; height:70px; background:${item ? item.color + '30' : 'rgba(255,255,255,0.03)'}; 
                                border:3px solid ${item ? item.color : '#334155'}; border-radius:12px;
                                display:flex; flex-direction:column; align-items:center; justify-content:center;
                                transition:0.3s; ${!item ? 'cursor:pointer' : ''}"
                            ondragover="event.preventDefault()"
                            ondrop="timelineDrop(event, ${pos})"
                            onmouseover="if(!${!!item}) this.style.borderColor='#64748b'"
                            onmouseout="if(!${!!item}) this.style.borderColor='#334155'">
                            ${item ? `
                                <span style="font-size:24px">${item.icon}</span>
                                <span style="color:white; font-weight:700; font-size:12px">${item.name}</span>
                            ` : `
                                <span style="color:#64748b; font-size:20px">${pos}ª</span>
                                <span style="color:#64748b; font-size:9px">solte aqui</span>
                            `}
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- Anos -->
            <div style="display:flex; justify-content:space-between; padding:0 20px; margin-top:10px">
                <span style="color:#64748b; font-size:9px">1980</span>
                <span style="color:#64748b; font-size:9px">1990</span>
                <span style="color:#64748b; font-size:9px">2000</span>
                <span style="color:#64748b; font-size:9px">2010</span>
                <span style="color:#64748b; font-size:9px">2020+</span>
            </div>
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

function timelineDragStart(e, itemId) {
    timelineDragged = itemId;
    e.target.style.opacity = '0.5';
}

function timelineDragEnd() {
    timelineDragged = null;
    // Restaura opacidade
    document.querySelectorAll('[id^="tl-drag-"]').forEach(el => el.style.opacity = '1');
}

function timelineDrop(e, pos) {
    e.preventDefault();
    if (!timelineDragged || simLocked) return;
    
    const task = simTasks[simTaskIndex];
    if (!task) return;
    
    // Verifica se o item corresponde à tarefa
    if (timelineDragged === task.target) {
        timelineState.placed[timelineDragged] = pos;
        simLocked = true;
        const item = timelineState.items.find(i => i.id === timelineDragged);
        showToast(`✓ ${item.name} posicionado na ${pos}ª geração!`, 'success');
        advanceTimelineTask();
    } else {
        showToast('⚠️ Esta não é a geração correta para esta tarefa!', 'error');
    }
    
    timelineDragged = null;
}

function advanceTimelineTask() {
    simTaskIndex++;
    
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) {
            finishTimelineSimulation();
        } else {
            renderTimeline(currentWorld?.color || '#2563EB');
        }
    }, 400);
}

function finishTimelineSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">📶</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Linha do Tempo Completa!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Todas as gerações ordenadas corretamente!</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}