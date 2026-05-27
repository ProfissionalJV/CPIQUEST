// ═══════════════════════════════════════════════════════════
// SIMULADOR WORD
// ═══════════════════════════════════════════════════════════

let wordState = {};

function startWordSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    wordState = {
        text: '',
        bold: false,
        italic: false,
        underline: false,
        align: 'left',
        saved: false
    };
    
    renderWord(accent);
}

function renderWord(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishWordSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    
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
        
        <!-- SIMULADOR WORD -->
        <div style="background:#d4d4d4; border:1px solid #999; border-radius:8px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.4)">
            
            <!-- Barra de Título -->
            <div style="background:#185abd; color:white; padding:8px 14px; font-size:12px; font-weight:600; display:flex; align-items:center; gap:8px">
                <span>📄</span> Documento1 - Word
                <div style="margin-left:auto; display:flex; gap:6px">
                    <span style="font-size:16px; cursor:pointer">_</span>
                    <span style="font-size:16px; cursor:pointer">□</span>
                    <span style="font-size:16px; cursor:pointer; color:#ff5f57">✕</span>
                </div>
            </div>
            
            <!-- Barra de Ferramentas (Ribbon simplificada) -->
            <div style="background:#f0f0f0; border-bottom:1px solid #ccc; padding:8px 12px; display:flex; gap:6px; flex-wrap:wrap; align-items:center">
                <span style="font-size:10px; color:#666; font-weight:700; margin-right:4px">Arquivo</span>
                <span style="font-size:10px; color:#666; font-weight:700; margin-right:8px">Página Inicial</span>
                <div style="width:1px; height:20px; background:#ccc; margin:0 4px"></div>
                
                <!-- Botões de Formatação -->
                <button id="word-bold-btn" onclick="wordBold()" 
                    style="width:30px; height:30px; border:1px solid #ccc; border-radius:4px; background:${wordState.bold ? '#185abd' : 'white'}; color:${wordState.bold ? 'white' : '#333'}; font-weight:700; font-size:14px; cursor:pointer">N</button>
                <button id="word-italic-btn" onclick="wordItalic()" 
                    style="width:30px; height:30px; border:1px solid #ccc; border-radius:4px; background:${wordState.italic ? '#185abd' : 'white'}; color:${wordState.italic ? 'white' : '#333'}; font-style:italic; font-size:14px; cursor:pointer">I</button>
                <button id="word-underline-btn" onclick="wordUnderline()" 
                    style="width:30px; height:30px; border:1px solid #ccc; border-radius:4px; background:${wordState.underline ? '#185abd' : 'white'}; color:${wordState.underline ? 'white' : '#333'}; text-decoration:underline; font-size:14px; cursor:pointer">S</button>
                
                <div style="width:1px; height:20px; background:#ccc; margin:0 4px"></div>
                
                <!-- Alinhamento -->
                <button id="word-left-btn" onclick="wordAlign('left')" 
                    style="width:30px; height:30px; border:1px solid #ccc; border-radius:4px; background:${wordState.align==='left'?'#185abd':'white'}; color:${wordState.align==='left'?'white':'#333'}; font-size:12px; cursor:pointer">⫷</button>
                <button id="word-center-btn" onclick="wordAlign('center')" 
                    style="width:30px; height:30px; border:1px solid #ccc; border-radius:4px; background:${wordState.align==='center'?'#185abd':'white'}; color:${wordState.align==='center'?'white':'#333'}; font-size:12px; cursor:pointer">≣</button>
                <button id="word-right-btn" onclick="wordAlign('right')" 
                    style="width:30px; height:30px; border:1px solid #ccc; border-radius:4px; background:${wordState.align==='right'?'#185abd':'white'}; color:${wordState.align==='right'?'white':'#333'}; font-size:12px; cursor:pointer">⫸</button>
                <button id="word-justify-btn" onclick="wordAlign('justify')" 
                    style="width:30px; height:30px; border:1px solid #ccc; border-radius:4px; background:${wordState.align==='justify'?'#185abd':'white'}; color:${wordState.align==='justify'?'white':'#333'}; font-size:12px; cursor:pointer">≋</button>
                
                <div style="width:1px; height:20px; background:#ccc; margin:0 4px"></div>
                
                <!-- Salvar -->
                <button id="word-save-btn" onclick="wordSave()" 
                    style="height:30px; padding:0 12px; border:1px solid #ccc; border-radius:4px; background:#185abd; color:white; font-weight:600; font-size:11px; cursor:pointer">💾 Salvar</button>
            </div>
            
            <!-- Régua simulada -->
            <div style="background:#e8e8e8; height:20px; border-bottom:1px solid #ccc; display:flex; align-items:center; padding:0 8px; font-size:8px; color:#999">
                <span>1</span><span style="margin-left:18px">2</span><span style="margin-left:18px">3</span><span style="margin-left:18px">4</span><span style="margin-left:18px">5</span>
            </div>
            
            <!-- Página (Folha A4 simulada) -->
            <div style="background:#fafafa; padding:20px; min-height:300px">
                <div style="background:white; max-width:600px; margin:0 auto; min-height:250px; padding:30px; box-shadow:0 2px 10px rgba(0,0,0,0.15); border:1px solid #e0e0e0">
                    <div id="word-document" contenteditable="true" 
                        oninput="wordState.text = this.innerText"
                        style="outline:none; min-height:200px; font-size:14px; line-height:1.8; color:#333;
                            font-weight:${wordState.bold ? 'bold' : 'normal'};
                            font-style:${wordState.italic ? 'italic' : 'normal'};
                            text-decoration:${wordState.underline ? 'underline' : 'none'};
                            text-align:${wordState.align};
                            font-family:'Calibri', 'Segoe UI', sans-serif">
                        ${wordState.text || ''}
                    </div>
                    <div style="text-align:right; margin-top:12px">
                        <button onclick="wordReady()" 
                            style="background:${accent}; color:white; border:none; padding:8px 20px; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer">
                            Pronto ✓
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Barra de Status -->
            <div style="background:#185abd; color:white; padding:4px 12px; font-size:10px; display:flex; align-items:center; gap:12px">
                <span>Página 1 de 1</span>
                <span>0 palavras</span>
                <span style="margin-left:auto">Português (Brasil)</span>
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
    
    // Foca no documento
    setTimeout(() => {
        const doc = document.getElementById('word-document');
        if (doc && !wordState.text) {
            doc.focus();
        }
    }, 200);
}

function wordReady() {
    if (simLocked) return;
    
    const doc = document.getElementById('word-document');
    if (doc) wordState.text = doc.innerText;
    
    const task = simTasks[simTaskIndex];
    if (!task) return;
    
    // Verifica se a tarefa atual é de digitar
    if (task.target === 'type-doc-text' || task.target === 'type-more-text') {
        if (!wordState.text || wordState.text.trim().length < 1) {
            showToast('⚠️ Digite algo antes de continuar!', 'error');
            return;
        }
        simLocked = true;
        showToast('✓ Texto digitado!', 'success');
        advanceWordTask();
    }
}

function wordBold() {
    wordState.bold = !wordState.bold;
    renderWord(currentWorld?.color || '#2563EB');
    
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'bold-btn') {
        simLocked = true;
        showToast('✓ Negrito aplicado!', 'success');
        advanceWordTask();
    }
}

function wordItalic() {
    wordState.italic = !wordState.italic;
    renderWord(currentWorld?.color || '#2563EB');
}

function wordUnderline() {
    wordState.underline = !wordState.underline;
    renderWord(currentWorld?.color || '#2563EB');
}

function wordAlign(align) {
    if (simLocked) return;  // ← ADICIONE ISSO
    wordState.align = align;
    renderWord(currentWorld?.color || '#2563EB');
    
    const task = simTasks[simTaskIndex];
    if (task) {
        if ((align === 'center' && task.target === 'center-btn') ||
            (align === 'justify' && task.target === 'justify-btn')) {
            simLocked = true;
            showToast('✓ Texto alinhado!', 'success');
            advanceWordTask();
        }
    }
}

function wordSave() {
    wordState.saved = true;
    showToast('💾 Documento salvo!', 'success');
    
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'save-btn') {
        simLocked = true;
        advanceWordTask();
    }
}

function advanceWordTask() {
    const doc = document.getElementById('word-document');
    if (doc) wordState.text = doc.innerText;
    
    simTaskIndex++;
    
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) {
            finishWordSimulation();
        } else {
            renderWord(currentWorld?.color || '#2563EB');
        }
    }, 400);
}

function finishWordSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">📄</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Documento Finalizado!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Documento formatado e salvo com sucesso!</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}