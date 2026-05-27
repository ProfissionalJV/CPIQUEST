// ═══════════════════════════════════════════════════════════
// SIMULADOR DE MAPA INTERATIVO
// ═══════════════════════════════════════════════════════════

let mapState = {};
let draggedItem = null;

function startMapSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    mapState = {
        placed: {},
        items: [
            { id: 'wifi-brasil', name: 'Wi-Fi Brasil', icon: '🛜', color: '#10b981' },
            { id: 'norte-conectado', name: 'Norte Conectado', icon: '🔌', color: '#3b82f6' },
            { id: 'digitaliza-brasil', name: 'Digitaliza Brasil', icon: '🇧🇷', color: '#f59e0b' },
            { id: 'telebras', name: 'Telebras', icon: '📞', color: '#8b5cf6' },
            { id: '5g', name: '5G', icon: '📱', color: '#ef4444' },
        ],
        regions: [
            { id: 'am', name: 'AM', x: 30, y: 26, color: '#188d47'},
            { id: 'to', name: 'TO', x: 60, y: 41, color: '#46e71e' },
            { id: 'df', name: 'DF', x: 61, y: 56, color: '#7826dd' },
            { id: 'sp', name: 'SP', x: 59, y: 72, color: '#1245ec' },
            { id: 'ba', name: 'BA', x: 71, y: 46, color: '#b45309' },
        ],
    };
    
    renderMap(accent);
}

function renderMap(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishMapSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    
    // Itens não usados ainda
    const availableItems = mapState.items.filter(item => !mapState.placed[item.id]);
    
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
        <div style="display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap; justify-content:center">
            ${availableItems.map(item => `
                <div id="drag-${item.id}" draggable="true" 
                    ondragstart="dragStart(event, '${item.id}')"
                    ondragend="dragEnd()"
                    style="background:${item.color}20; border:2px solid ${item.color}50; border-radius:12px; padding:12px 16px; cursor:grab; display:flex; align-items:center; gap:8px; transition:0.2s"
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'">
                    <span style="font-size:24px">${item.icon}</span>
                    <span style="color:white; font-weight:600; font-size:13px">${item.name}</span>
                </div>
            `).join('')}
        </div>
        
        <!-- Mapa do Brasil simplificado -->
        <div id="map-area" style="background:#0a1628; border:2px solid #334155; border-radius:14px; padding:10px; position:relative; min-height:400px; overflow:hidden"
            ondragover="dragOver(event)"
            ondrop="dropItem(event)">
            
        <!-- Contorno do Brasil (SVG REAL) -->
        <img id="brasil-map" src="img2/brasil2.png" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.6; pointer-events:none; object-fit:contain; filter: brightness(0.8) sepia(0.3) hue-rotate(200deg) saturate(2)" />
            <!-- Contorno simplificado do Brasil -->
            <path d="M120,40 L160,25 L200,20 L240,22 L280,30 L310,50 L330,70 L340,90 L335,110 L320,130 L310,150 L290,160 L270,170 L250,175 L230,180 L210,185 L190,190 L170,195 L150,200 L130,210 L115,225 L105,240 L100,260 L105,280 L115,295 L130,305 L145,310 L155,305 L160,290 L165,275 L175,265 L190,260 L210,258 L230,260 L245,265 L250,255 L240,240 L225,225 L210,215 L200,210 L190,215 L180,225 L165,230 L150,225 L140,210 L130,190 L125,170 L120,150 L115,130 L118,100 L120,70 Z"
                fill="#0a3a1a" stroke="#10b981" stroke-width="1.5"/>
            
            <!-- Divisas estaduais (linhas internas) -->
            <line x1="150" y1="50" x2="160" y2="180" stroke="#10b981" stroke-width="0.5" opacity="0.4"/>
            <line x1="120" y1="100" x2="300" y2="80" stroke="#10b981" stroke-width="0.5" opacity="0.4"/>
            <line x1="100" y1="200" x2="280" y2="180" stroke="#10b981" stroke-width="0.5" opacity="0.4"/>
            <line x1="200" y1="30" x2="210" y2="250" stroke="#10b981" stroke-width="0.5" opacity="0.4"/>
        </svg>
                    
            <!-- Regiões -->
            ${mapState.regions.map(region => {
                const placed = mapState.placed;
                const placedItem = Object.entries(placed).find(([itemId, regId]) => regId === region.id);
                return `
                    <div id="region-${region.id}" 
                        style="position:absolute; left:${region.x}%; top:${region.y}%; transform:translate(-50%,-50%);
                        width:40px; height:40px; background:${region.color}40; border:2px solid ${placedItem ? '#10b981' : region.color}80;
                        border-radius:6px; display:flex; flex-direction:column; align-items:center; justify-content:center;
                            transition:0.3s; ${!placedItem ? 'cursor:pointer' : ''}"
                        onmouseover="if(!${!!placedItem}) this.style.background='${region.color}50'"
                        onmouseout="if(!${!!placedItem}) this.style.background='${region.color}30'"
                        ${!placedItem ? `ondragover="dragOver(event)" ondrop="dropOnRegion(event, '${region.id}')"` : ''}>
                        <span style="font-size:9px; color:white; font-weight:700">${region.id.toUpperCase()}</span>
                        ${placedItem ? `<span style="font-size:14px; margin-top:1px">✅</span>` : `<span style="font-size:8px; color:#64748b">solte</span>`}
                    </div>
                `;
            }).join('')}
            
            ${Object.keys(mapState.placed).length === 0 ? `
                <div style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); color:#64748b; font-size:13px; font-weight:600">
                    🖱️ Arraste os itens acima para as regiões
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
}

function dragStart(e, itemId) {
    draggedItem = itemId;
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
}

function dragEnd() {
    if (draggedItem) {
        const el = document.getElementById('drag-' + draggedItem);
        if (el) el.style.opacity = '1';
    }
    draggedItem = null;
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function dropItem(e) {
    e.preventDefault();
    // Drop genérico (não faz nada, só nas regiões)
}

function dropOnRegion(e, regionId) {
    e.preventDefault();
    if (!draggedItem || simLocked) return;
    
    const task = simTasks[simTaskIndex];
    if (!task) return;
    
    // Verifica se o item arrastado corresponde à tarefa
    if (draggedItem === task.target) {
        mapState.placed[draggedItem] = regionId;
        simLocked = true;
        showToast('✓ Programa alocado corretamente!', 'success');
        advanceMapTask();
    } else {
        showToast('⚠️ Este não é o programa correto para esta tarefa!', 'error');
    }
    
    draggedItem = null;
}

function advanceMapTask() {
    simTaskIndex++;
    
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) {
            finishMapSimulation();
        } else {
            renderMap(currentWorld?.color || '#2563EB');
        }
    }, 400);
}

function finishMapSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">🗺️</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Mapa Completo!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Todos os programas alocados corretamente!</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}
