// ═══════════════════════════════════════════════════════════
// SIMULADOR WINDOWS INTERATIVO (FINAL - SIMPLIFICADO)
// ═══════════════════════════════════════════════════════════

let simState = {};
let simTaskIndex = 0;
let simTasks = [];
let simCompleted = false;
let simLocked = false;

function startSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    simState = {
        textBold: false,
        textItalic: false,
        textUnderline: false,
        savedText: '',
        history: [],
        notepadOpen: false,
        notepadHasText: false,
        explorerOpen: false,
        startMenuOpen: false,
        pastaCriada: false,
        papelParede: 0,
        configOpen: false,
        desktopIcons: [
            { id: 'meu-pc', label: 'Meu Computador', icon: '🖥️' },
            { id: 'documentos', label: 'Documentos', icon: '📁' },
            { id: 'lixeira', label: 'Lixeira', icon: '🗑️' },
            { id: 'navegador', label: 'Navegador', icon: '🌐' },
            { id: 'bloco-notas', label: 'Bloco de Notas', icon: '📝' }
        ],
        explorerFiles: [
            { id: 'bloco-notas-explorer', label: 'Bloco de Notas', icon: '📝' },
            { id: 'navegador', label: 'Navegador', icon: '🌐' },
            { id: 'lixeira', label: 'Lixeira', icon: '🗑️' },
            { id: 'documentos', label: 'Documentos', icon: '📁' }
        ]
    };

    document.addEventListener('keydown', handleSimKeydown);
    renderSimulation(accent);
}

function handleNotepadReady() {
    if (simLocked) return;
    const task = simTasks[simTaskIndex];
    if (!task) return;
    if (task.target === 'type-text' || task.target === 'type-text-2') {
        const textarea = document.getElementById('notepad-textarea');
        if (!textarea || textarea.value.trim().length < 1) {
            showToast('⚠️ Digite algo antes de continuar!', 'error');
            return;
        }
        simLocked = true;
        showToast('✓ Texto digitado!', 'success');
        advanceTask();
    }
}

function renderSimulation(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishSimulation(); return; }
    simLocked = false;
    const content = document.getElementById('stage-content');

    var wallpapers = [
        'linear-gradient(135deg, #0d5b8a, #1a6b9e, #0f4c75)',
        'linear-gradient(135deg, #1a3a5c, #2563eb, #0f2444)',
        'linear-gradient(135deg, #065f46, #10b981, #064e3b)',
        'linear-gradient(135deg, #7c2d12, #ea580c, #431407)'
    ];
    var wallpaper = wallpapers[simState.papelParede] || wallpapers[0];

    content.innerHTML = `
        <div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        <div style="background:${accent}15; border:2px solid ${accent}50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">
            <span style="background:${accent}; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">${simTaskIndex+1}/${simTasks.length}</span>
            <div>
                <p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">${task.label}</p>
                <p style="color:#93c5fd; font-size:13px">💡 ${task.hint || 'Siga as instruções'}</p>
                ${task.keyCombo ? `<p style="color:#fbbf24; font-size:12px; margin-top:4px">⌨️ Atalho: <strong style="font-family:monospace; background:rgba(251,191,36,0.1); padding:2px 8px; border-radius:4px">${task.keyCombo}</strong></p>` : ''}
            </div>
        </div>
        
        <div id="sim-desktop" style="background:${wallpaper}; border:1px solid rgba(255,255,255,0.1); border-radius:14px; overflow:hidden; min-height:440px; position:relative; box-shadow:0 10px 40px rgba(0,0,0,0.4)">
            <div id="desktop-area" style="padding:24px; min-height:360px; position:relative">
                
                <!-- Ícones da Área de Trabalho -->
                <div style="display:grid; grid-template-columns:repeat(5, 85px); gap:20px">
                    ${simState.desktopIcons.map(icon => `
                        <div id="icon-${icon.id}" onclick="handleDesktopClick('${icon.id}', event)" 
                            style="text-align:center; cursor:pointer; padding:10px; border-radius:10px; transition:0.2s"
                            onmouseover="this.style.background='rgba(255,255,255,0.1)'"
                            onmouseout="this.style.background='transparent'">
                            <div style="font-size:40px; margin-bottom:6px; pointer-events:none">${icon.icon}</div>
                            <div style="color:white; font-size:11px; font-weight:600; text-shadow:1px 1px 3px rgba(0,0,0,0.9); pointer-events:none">${icon.label}</div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Bloco de Notas -->
                <div id="notepad-window" style="display:${simState.notepadOpen ? 'block' : 'none'}; position:absolute; top:20px; left:50%; transform:translateX(-50%); width:92%; max-width:500px; background:#1e1e2e; border:2px solid ${accent}50; border-radius:10px; overflow:hidden; z-index:20; box-shadow:0 15px 50px rgba(0,0,0,0.7)">
                    <div style="background:#2d2d3f; padding:10px 14px; display:flex; align-items:center; gap:10px">
                        <div style="display:flex; gap:6px">
                            <div id="notepad-close" onclick="handleCloseNotepad()" style="width:14px; height:14px; border-radius:50%; background:#ff5f57; cursor:pointer" title="Fechar"></div>
                            <div style="width:14px; height:14px; border-radius:50%; background:#ffbd2e"></div>
                            <div style="width:14px; height:14px; border-radius:50%; background:#27c93f"></div>
                        </div>
                        <span style="color:#94a3b8; font-size:12px">📝 Bloco de Notas</span>
                    </div>
                    <textarea id="notepad-textarea" 
                        oninput="simState.notepadHasText = this.value.trim().length > 0; simState.savedText = this.value"
                        placeholder="Digite seu texto aqui..."
                        style="width:100%; height:170px; background:#0d0d1a; border:none; color:white; padding:14px; 
                            font-family:'Consolas', monospace; font-size:14px; resize:none; outline:none;
                            font-weight:${simState.textBold ? 'bold' : 'normal'};
                            font-style:${simState.textItalic ? 'italic' : 'normal'};
                            text-decoration:${simState.textUnderline ? 'underline' : 'none'}">${simState.savedText || ''}</textarea>
                    <div style="background:#2d2d3f; padding:6px 14px; display:flex; justify-content:space-between; align-items:center">
                        <span style="color:#94a3b8; font-size:10px">Ctrl+A | Ctrl+C | Ctrl+V | Ctrl+X | Ctrl+Z | Ctrl+B | Ctrl+I</span>
                        <button onclick="handleNotepadReady()" style="background:${accent}; color:white; border:none; padding:6px 16px; border-radius:6px; font-weight:700; font-size:12px; cursor:pointer">Pronto ✓</button>
                    </div>
                </div>
                
                <!-- Explorador de Arquivos -->
                <div id="explorer-window" style="display:${simState.explorerOpen ? 'block' : 'none'}; position:absolute; top:20px; left:50%; transform:translateX(-50%); width:92%; max-width:500px; background:#1e1e2e; border:2px solid ${accent}50; border-radius:10px; overflow:hidden; z-index:20; box-shadow:0 15px 50px rgba(0,0,0,0.7)">
                    <div style="background:#2d2d3f; padding:10px 14px; display:flex; align-items:center; gap:10px">
                        <div style="display:flex; gap:6px">
                            <div id="explorer-close" onclick="handleCloseExplorer()" style="width:14px; height:14px; border-radius:50%; background:#ff5f57; cursor:pointer" title="Fechar"></div>
                            <div style="width:14px; height:14px; border-radius:50%; background:#ffbd2e"></div>
                            <div style="width:14px; height:14px; border-radius:50%; background:#27c93f"></div>
                        </div>
                        <span style="color:#94a3b8; font-size:12px">📁 Explorador de Arquivos</span>
                        <button id="btn-nova-pasta" onclick="handleExplorerAction('nova-pasta')" 
                            style="margin-left:auto; background:#10b98120; border:1px solid #10b98150; border-radius:4px; color:#10b981; font-size:9px; font-weight:700; padding:4px 8px; cursor:pointer">
                            📂+ Nova Pasta
                        </button>
                    </div>
                    <div style="padding:20px; display:grid; grid-template-columns:repeat(4, 75px); gap:16px; min-height:160px">
                        ${simState.explorerFiles.map(icon => `
                            <div onclick="handleExplorerClick('${icon.id}')" style="text-align:center; cursor:pointer; padding:8px; border-radius:8px"
                                onmouseover="this.style.background='rgba(255,255,255,0.05)'"
                                onmouseout="this.style.background='transparent'">
                                <div style="font-size:30px">${icon.icon}</div>
                                <div style="color:white; font-size:10px">${icon.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Painel de Configurações -->
                <div id="config-panel" style="display:${simState.configOpen ? 'block' : 'none'}; position:absolute; top:20px; left:50%; transform:translateX(-50%); width:92%; max-width:500px; background:#1e1e2e; border:2px solid ${accent}50; border-radius:10px; overflow:hidden; z-index:20; box-shadow:0 15px 50px rgba(0,0,0,0.7)">
                    <div style="background:#2d2d3f; padding:10px 14px; display:flex; align-items:center; gap:10px">
                        <span style="color:#94a3b8; font-size:12px">⚙️ Configurações</span>
                        <div onclick="simState.configOpen=false; renderSimulation(currentWorld?.color || '#2563EB')" style="margin-left:auto; width:14px; height:14px; border-radius:50%; background:#ff5f57; cursor:pointer"></div>
                    </div>
                    <div style="padding:20px; display:grid; grid-template-columns:1fr 1fr; gap:12px">
                        <div onclick="handleConfigClick('personalizacao')" style="text-align:center; cursor:pointer; padding:16px; background:#0f172a; border:2px solid #334155; border-radius:10px; transition:0.2s"
                            onmouseover="this.style.borderColor='${accent}'" onmouseout="this.style.borderColor='#334155'">
                            <div style="font-size:30px">🎨</div>
                            <div style="color:white; font-size:11px; font-weight:600; margin-top:6px">Personalização</div>
                        </div>
                        <div onclick="handleConfigClick('data-hora')" style="text-align:center; cursor:pointer; padding:16px; background:#0f172a; border:2px solid #334155; border-radius:10px; transition:0.2s"
                            onmouseover="this.style.borderColor='${accent}'" onmouseout="this.style.borderColor='#334155'">
                            <div style="font-size:30px">🕐</div>
                            <div style="color:white; font-size:11px; font-weight:600; margin-top:6px">Data e Hora</div>
                        </div>
                    </div>
                    <div style="padding:0 20px 16px">
                        <p style="color:white; font-size:11px; font-weight:600; margin-bottom:8px">Papel de Parede:</p>
                        <div style="display:flex; gap:8px">
                            ${['Azul', 'Escuro', 'Verde', 'Laranja'].map(function(nome, i) {
                                return '<div onclick="handlePapelParedeClick(' + (i+1) + ')"; simState.configOpen=false; renderSimulation(currentWorld?.color || \'#2563EB\')" style="width:60px; height:40px; background:' + wallpapers[i+1] + '; border:2px solid ' + (simState.papelParede === i+1 ? accent : '#334155') + '; border-radius:6px; cursor:pointer; transition:0.2s"></div>';
                            }).join('')}
                        </div>
                    </div>
                </div>
                
                <div id="sim-toast" style="display:none; position:absolute; bottom:20px; left:50%; transform:translateX(-50%); 
                    padding:10px 20px; border-radius:10px; font-size:13px; font-weight:700; z-index:40; white-space:nowrap;
                    box-shadow:0 4px 20px rgba(0,0,0,0.4)"></div>
            </div>
            
            <!-- Barra de Tarefas -->
            <div style="background:rgba(0,0,0,0.8); height:44px; display:flex; align-items:center; padding:0 12px; gap:8px; backdrop-filter:blur(10px)">
                <button onclick="handleStartButton()" id="start-btn" 
                    style="height:32px; padding:0 16px; border:none; border-radius:8px; background:rgba(255,255,255,0.1); color:white; font-weight:700; font-size:12px; cursor:pointer; display:flex; align-items:center; gap:6px; transition:0.2s">
                    🪟 Iniciar
                </button>
                <div style="width:1px; height:22px; background:rgba(255,255,255,0.15)"></div>
                <div style="flex:1"></div>
                <span style="color:white; font-size:11px">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            
            <!-- Menu Iniciar -->
            <div id="start-menu" style="display:${simState.startMenuOpen ? 'block' : 'none'}; position:absolute; bottom:44px; left:0; width:230px; background:#1e293b; border:1px solid rgba(255,255,255,0.15); border-radius:10px 10px 0 0; overflow:hidden; z-index:35; box-shadow:0 -5px 30px rgba(0,0,0,0.5)">
                ${simState.desktopIcons.map(icon => `
                    <div onclick="handleStartMenuItem('${icon.id}')" style="padding:12px 16px; cursor:pointer; display:flex; align-items:center; gap:10px;"
                        onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='transparent'">
                        <span style="font-size:18px">${icon.icon}</span>
                        <span style="color:white; font-size:13px">${icon.label}</span>
                    </div>
                `).join('')}
                <div style="border-top:1px solid rgba(255,255,255,0.1); margin:4px 0"></div>
                <div onclick="handleStartMenuItem('config')" style="padding:12px 16px; cursor:pointer; display:flex; align-items:center; gap:10px;"
                    onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='transparent'">
                    <span style="font-size:18px">⚙️</span>
                    <span style="color:white; font-size:13px">Configurações</span>
                </div>
                <div onclick="handleStartMenuItem('desligar')" style="padding:12px 16px; cursor:pointer; display:flex; align-items:center; gap:10px;"
                    onmouseover="this.style.background='rgba(239,68,68,0.15)'" onmouseout="this.style.background='transparent'">
                    <span style="font-size:18px">🔴</span>
                    <span style="color:#ef4444; font-size:13px">Desligar</span>
                </div>
            </div>
        </div>
        
        <div style="display:flex; gap:8px; justify-content:center; margin-top:14px">
            ${simTasks.map((_, i) => `
                <div style="width:${i === simTaskIndex ? 30 : 12}px; height:12px; border-radius:6px; 
                    background:${i < simTaskIndex ? '#10b981' : i === simTaskIndex ? accent : '#334155'}; transition:0.3s"></div>
            `).join('')}
        </div>
    `;
}

// ═══ AÇÕES ═══

function handlePapelParedeClick(index) {
    if (simLocked) return;
    simState.papelParede = index;
    simState.configOpen = false;
    
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'papel-parede') {
        simLocked = true;
        showToast('✓ Papel de parede alterado!', 'success');
        advanceTask();
    } else {
        renderSimulation(currentWorld?.color || '#2563EB');
    }
}

function handleDesktopClick(iconId, event) {
    if (simLocked) return;
    event.stopPropagation();
    const task = simTasks[simTaskIndex];
    if (!task) return;
    
    if (iconId === 'bloco-notas') {
        document.getElementById('notepad-window').style.display = 'block';
        simState.notepadOpen = true;
        setTimeout(() => { const ta = document.getElementById('notepad-textarea'); if (ta) ta.focus(); }, 200);
    }
    if (iconId === 'documentos' || iconId === 'meu-pc') {
        document.getElementById('explorer-window').style.display = 'block';
        simState.explorerOpen = true;
    }
    
    const match = (task.target === iconId) || 
                  (task.target === 'notepad' && iconId === 'bloco-notas') ||
                  (task.target === 'explorer' && (iconId === 'documentos' || iconId === 'meu-pc'));
    if (match) { simLocked = true; showToast('✓ ' + task.label, 'success'); advanceTask(); }
}

function handleCloseNotepad() {
    if (simLocked) return;
    document.getElementById('notepad-window').style.display = 'none';
    simState.notepadOpen = false;
    simState.notepadHasText = false;
    simState.history = [];
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'close-notepad') { simLocked = true; showToast('✓ Fechado!', 'success'); advanceTask(); }
}

function handleCloseExplorer() {
    if (simLocked) return;
    document.getElementById('explorer-window').style.display = 'none';
    simState.explorerOpen = false;
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'close-explorer') { simLocked = true; showToast('✓ Fechado!', 'success'); advanceTask(); }
}

function handleStartButton() {
    if (simLocked) return;
    const menu = document.getElementById('start-menu');
    simState.startMenuOpen = !simState.startMenuOpen;
    menu.style.display = simState.startMenuOpen ? 'block' : 'none';
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'start-button' && simState.startMenuOpen) { simLocked = true; showToast('✓ Menu Iniciar aberto!', 'success'); advanceTask(); }
}

function handleStartMenuItem(iconId) {
    if (simLocked) return;
    document.getElementById('start-menu').style.display = 'none';
    simState.startMenuOpen = false;
    const task = simTasks[simTaskIndex];
    
    if (iconId === 'config') { simState.configOpen = true; renderSimulation(currentWorld?.color || '#2563EB'); }
    if (task && task.target === 'desligar' && iconId === 'desligar') { simLocked = true; showToast('🔴 Desligado!', 'success'); advanceTask(); return; }
    if (task && task.target === 'config' && iconId === 'config') { simLocked = true; showToast('✓ Configurações abertas!', 'success'); advanceTask(); return; }
    if (task && (task.target === 'start-menu-item' || task.target === iconId)) { simLocked = true; showToast('✓ Item selecionado!', 'success'); advanceTask(); }
}

function handleExplorerClick(iconId) {
    if (simLocked) return;
    const task = simTasks[simTaskIndex];
    if (task && (task.target === iconId || task.target === 'bloco-notas-explorer')) {
        if (iconId === 'bloco-notas-explorer' && task.target === 'bloco-notas-explorer') {
            simLocked = true; showToast('✓ Bloco de Notas selecionado!', 'success'); advanceTask();
        } else if (task.target === iconId) {
            simLocked = true; showToast('✓ ' + task.label, 'success'); advanceTask();
        }
    }
}

function handleExplorerAction(action) {
    if (simLocked) return;
    if (action === 'nova-pasta') {
        simState.pastaCriada = true;
        const task = simTasks[simTaskIndex];
        if (task && task.target === 'nova-pasta') { simLocked = true; showToast('✓ Nova pasta criada!', 'success'); advanceTask(); return; }
        renderSimulation(currentWorld?.color || '#2563EB');
    }
}

function handleConfigClick(type) {
    if (simLocked) return;
    const task = simTasks[simTaskIndex];
    if (task && task.target === type) {
        simLocked = true;
        var msg = type === 'personalizacao' ? 'Personalização aberta!' : 'Data e Hora ajustados!';
        showToast('✓ ' + msg, 'success');
        advanceTask();
    }
}

function handleSimKeydown(e) {
    const task = simTasks[simTaskIndex];
    if (!task || !task.keyCombo) return;
    if (task.target === 'notepad' && !simState.notepadOpen) return;
    
    // Bloqueia atalhos do sistema
    if (task.keyCombo === 'Ctrl+D' || task.keyCombo === 'Ctrl+Q' || task.keyCombo === 'Alt+P') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
    
    let pressed = '';
    if (e.ctrlKey) pressed += 'Ctrl+';
    if (e.altKey) pressed += 'Alt+';
    if (e.shiftKey) pressed += 'Shift+';
    if (e.metaKey) pressed += 'Win+';
    const key = e.key;
    let keyName = '';
    if (key === 'Enter') keyName = 'Enter';
    else if (key === 'F5') keyName = 'F5';
    else if (key.length === 1) keyName = key.toUpperCase();
    else keyName = key;
    if (!['Control', 'Alt', 'Shift', 'Meta'].includes(key)) pressed += keyName;
    
    if (pressed === task.keyCombo) {
        e.preventDefault(); e.stopPropagation();
        var ta = document.getElementById('notepad-textarea');
        if (ta && simState.history) { simState.history.push(ta.value); if (simState.history.length > 20) simState.history.shift(); }
        applyTextEffect(task.keyCombo);
        simLocked = true; showToast('✓ ' + task.label, 'success'); advanceTask();
    }
}

function applyTextEffect(keyCombo) {
    var ta = document.getElementById('notepad-textarea');
    
    // Atalhos de sistema
    if (keyCombo === 'Ctrl+D') { showToast('🖥️ Área de Trabalho!', 'success'); return; }
    if (keyCombo === 'Ctrl+Q') { showToast('📁 Explorer aberto!', 'success'); return; }
    if (keyCombo === 'Alt+P') { showToast('❌ Janela fechada!', 'success'); return; }
    if (keyCombo === 'F2') { showToast('🔄 Atualizado!', 'success'); return; }
    
    if (!ta) return;
    var text = ta.value;
    
    switch(keyCombo) {
        case 'Ctrl+A': ta.focus(); ta.select(); showToast('📝 Selecionado!', 'success'); break;
        case 'Ctrl+C': ta.select(); document.execCommand('copy'); showToast('📋 Copiado!', 'success'); break;
        case 'Ctrl+V': ta.focus(); document.execCommand('paste'); ta.value; simState.savedText = ta.value; simState.notepadHasText = true; showToast('📋 Colado!', 'success'); break;
        case 'Ctrl+X': ta.select(); document.execCommand('cut'); simState.savedText = ta.value; showToast('✂️ Recortado!', 'success'); break;
        case 'Ctrl+Z': if (simState.history && simState.history.length > 0) { ta.value = simState.history.pop(); simState.savedText = ta.value; showToast('↩️ Desfeito!', 'success'); } break;
        case 'Ctrl+S': simState.savedText = ta.value; showToast('💾 Salvo!', 'success'); break;
        case 'Ctrl+B': simState.textBold = !simState.textBold; ta.style.fontWeight = simState.textBold ? 'bold' : 'normal'; showToast('🔤 Negrito!', 'success'); break;
        case 'Ctrl+I': simState.textItalic = !simState.textItalic; ta.style.fontStyle = simState.textItalic ? 'italic' : 'normal'; showToast('🔤 Itálico!', 'success'); break;
        case 'Ctrl+U': simState.textUnderline = !simState.textUnderline; ta.style.textDecoration = simState.textUnderline ? 'underline' : 'none'; showToast('🔤 Sublinhado!', 'success'); break;
        case 'Ctrl+J': ta.style.textAlign = 'justify'; showToast('📝 Justificado!', 'success'); break;
        case 'Ctrl+E': ta.style.textAlign = 'center'; showToast('📝 Centralizado!', 'success'); break;
    }
    simState.savedText = ta.value;
}

function advanceTask() {
    var ta = document.getElementById('notepad-textarea');
    if (ta) simState.savedText = ta.value;
    simTaskIndex++;
    if (simTaskIndex >= simTasks.length) { setTimeout(() => finishSimulation(), 400); return; }
    renderSimulation(currentWorld?.color || '#2563EB');
    setTimeout(() => { var t = document.getElementById('notepad-textarea'); if (t && simState.savedText) { t.value = simState.savedText; simState.notepadHasText = true; } }, 100);
}

function showToast(msg, type) {
    var t = document.getElementById('sim-toast');
    if (!t) return;
    t.textContent = msg; t.style.display = 'block';
    t.style.background = type === 'error' ? '#7f1d1d' : '#065f46';
    t.style.border = '2px solid ' + (type === 'error' ? '#ef4444' : '#10b981');
    t.style.color = type === 'error' ? '#fca5a5' : '#6ee7b7';
    setTimeout(() => { t.style.display = 'none'; }, 1800);
}

function finishSimulation() {
    simCompleted = true;
    document.removeEventListener('keydown', handleSimKeydown);
    window._practiceStars = 5;
    var accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">🏆</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Simulação Completa!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Todas as ${simTasks.length} tarefas concluídas!</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Fase →</button>
        </div>
    `;
}