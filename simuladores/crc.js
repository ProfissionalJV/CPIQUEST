// ═══════════════════════════════════════════════════════════
// SIMULADOR CRC - COM IMAGENS REAIS
// ═══════════════════════════════════════════════════════════

let crcState = {};
let crcDraggedItem = null;
let crcDraggedType = null;

function startCrcSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    crcState = {
        parafusos: [true, true, true, true],
        tampaAberta: false,
        triagem: false,
        diagnostico: false,
        manutencao: false,
        formatacao: false,
        teste: false,
        ferramentas: [
            { id: 'chave', nome: 'Chave de Fenda', icon: '🪛', cor: '#94a3b8', usado: false },
            { id: 'lupa', nome: 'Lupa', icon: '🔍', cor: '#3b82f6', usado: false },
            { id: 'peca_nova', nome: 'Peça Nova', icon: '🔩', cor: '#10b981', usado: false },
            { id: 'cd_linux', nome: 'Linux CD', icon: '💿', cor: '#8b5cf6', usado: false },
            { id: 'botao_power', nome: 'Power', icon: '⚡', cor: '#f59e0b', usado: false },
        ]
    };
    
    renderCrc(accent);
}

function animarParafusoSaindo(index) {
    const parafuso = document.getElementById(`parafuso-${index}`);
    if (!parafuso) {
        // Se o elemento não existe ainda, só atualiza o estado
        crcState.parafusos[index] = false;
        if (crcState.parafusos.filter(p => !p).length === 4) finalizarAbertura();
        return;
    }
    
    // Animação do parafuso girando e subindo
    parafuso.style.transition = 'all 0.5s ease-out';
    parafuso.style.transform = 'translateY(-40px) rotate(720deg)';
    parafuso.style.opacity = '0';
    
    // Remove depois da animação
    setTimeout(() => {
        crcState.parafusos[index] = false;
        if (crcState.parafusos.filter(p => !p).length === 4) {
            finalizarAbertura();
        } else {
            renderCrc(currentWorld?.color || '#2563EB');
        }
    }, 450);
}

function finalizarAbertura() {
    const chave = crcState.ferramentas.find(f => f.id === 'chave');
    if (chave) chave.usado = true;
    
    setTimeout(() => {
        crcState.tampaAberta = true;
        crcState.triagem = true;
        simLocked = true;
        showToast('✓ Tampa removida! Notebook aberto para inspeção!', 'success');
        advanceCrcTask();
    }, 300);
}

function renderCrc(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishCrcSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    
    const ferramentaAtual = crcState.ferramentas[simTaskIndex];

    const posicoesAlvos = {
        hd:    { x: 112, y: 106, w: 58,  h: 40 },
        peca:  { x: 112, y: 105, w: 58,  h: 40 },
        cd:    { x: 238, y: 90,  w: 26,  h: 48 },
        power: { x: 260, y: 135,  w: 25,  h: 25 },
    };

    
    const etapas = [
        { nome: 'Abrir', icon: '🔓', feito: crcState.tampaAberta },
        { nome: 'Diagnóstico', icon: '🩺', feito: crcState.diagnostico },
        { nome: 'Manutenção', icon: '🔧', feito: crcState.manutencao },
        { nome: 'Formatação', icon: '💿', feito: crcState.formatacao },
        { nome: 'Teste', icon: '✅', feito: crcState.teste },
    ];
    
    // Define qual imagem mostrar
    let imagemAtual = 'img2/crc/etapa1_fechado.png';
    if (crcState.teste) imagemAtual = 'img2/crc/etapa6_teste.png';
    else if (crcState.formatacao) imagemAtual = 'img2/crc/etapa5_linux.png';
    else if (crcState.manutencao) imagemAtual = 'img2/crc/etapa4_manutencao.png';
    else if (crcState.diagnostico) imagemAtual = 'img2/crc/etapa3_diagnostico.png';
    else if (crcState.tampaAberta) imagemAtual = 'img2/crc/etapa2_aberto.png';
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        
        <div style="background:${accent}15; border:2px solid ${accent}50; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; align-items:start; gap:12px">
            <span style="background:${accent}; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">${simTaskIndex+1}/${simTasks.length}</span>
            <div>
                <p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">${task.label}</p>
                <p style="color:#93c5fd; font-size:13px">💡 ${task.hint || 'Arraste a ferramenta até o local indicado'}</p>
            </div>
        </div>
        
        <!-- ÁREA PRINCIPAL -->
        <div style="display:flex; gap:12px">
            
            <!-- PAINEL DE FERRAMENTAS (ESQUERDA) -->
            <div style="width:90px; flex-shrink:0">
                <p style="color:#64748b; font-size:9px; font-weight:700; text-align:center; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px">Ferramentas</p>
                <div style="display:flex; flex-direction:column; gap:6px">
                ${crcState.ferramentas.map(f => `
                    ${!f.usado ? `
                    <div id="tool-${f.id}" draggable="true"
                        ondragstart="crcDragStart(event, '${f.id}')"
                        ondragend="crcDragEnd()"
                        style="background:${f.cor}20; border:3px solid ${f.cor}50; border-radius:12px; 
                            padding:8px; cursor:grab; display:flex; flex-direction:column; align-items:center; gap:4px;
                            transition:0.3s; ${f.id === ferramentaAtual?.id ? 'box-shadow:0 0 20px ' + f.cor + '60; transform:scale(1.05);' : ''}"
                        onmouseover="this.style.transform='scale(1.1)'"
                        onmouseout="this.style.transform='${f.id === ferramentaAtual?.id ? 'scale(1.05)' : 'scale(1)'}'">
                        <span style="font-size:26px">${f.icon}</span>
                        <span style="color:white; font-size:9px; font-weight:700; text-align:center; line-height:1.1">${f.nome}</span>
                    </div>
                    ` : `
                    <div style="background:#065f4620; border:2px solid #10b98130; border-radius:12px; 
                        padding:8px; display:flex; flex-direction:column; align-items:center; gap:4px; opacity:0.5">
                        <span style="font-size:18px">✅</span>
                        <span style="color:#10b981; font-size:8px; font-weight:700">Usado</span>
                    </div>
                    `}
                `).join('')}
                </div>
            </div>
            
            <!-- BANCADA COM IMAGEM REAL -->
            <div style="flex:1; background:#2d1f1f; border:2px solid #5c3a3a; border-radius:14px; overflow:hidden; min-height:380px; position:relative">
                
                <!-- Imagem de fundo da etapa atual -->
                <div style="position:relative; display:flex; justify-content:center; padding:20px">
                    <div style="position:relative; display:inline-block">
                        <img src="${imagemAtual}" style="width:100%; max-width:380px; border-radius:10px; box-shadow:0 8px 25px rgba(0,0,0,0.5)" alt="Etapa CRC" />
                        
                        ${!crcState.tampaAberta ? `
                        <!-- Parafusos sobre a imagem -->
                        <div style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none">
                            ${crcState.parafusos.map((p, i) => {
                                // Posições fixas de cada parafuso (ajuste aqui!)
                                const posicoes = [
                                    { x: 108, y: 143 },  // Parafuso 1
                                    { x: 159, y: 143 },  // Parafuso 2
                                    { x: 211, y: 143 },  // Parafuso 3
                                    { x: 260, y: 143 },  // Parafuso 4
                                ];
                                const pos = posicoes[i];
                                return p ? `
                                <div id="parafuso-${i}"
                                    style="position:absolute; left:${pos.x}px; top:${pos.y}px;
                                        width:18px; height:18px; border-radius:50%; 
                                        background:linear-gradient(135deg, #c0c0c0, #888, #666);
                                        border:2px solid #555;
                                        box-shadow:0 3px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3);
                                        transition:0.3s; display:flex; align-items:center; justify-content:center; font-size:10px;
                                        pointer-events:auto; cursor:pointer;"
                                    ondragover="event.preventDefault()"
                                    ondrop="crcDropParafuso(event, ${i})">
                                    <div style="width:8px; height:2px; background:#444; border-radius:1px"></div>
                                </div>
                                ` : '';
                            }).join('')}
                        </div>
                        ` : ''}

                        ${crcState.tampaAberta && !crcState.diagnostico ? `
                        <!-- Área do HD -->
                        <div id="crc-hd-target"
                            style="position:absolute; left:${posicoesAlvos.hd.x}px; top:${posicoesAlvos.hd.y}px; 
                                width:${posicoesAlvos.hd.w}px; height:${posicoesAlvos.hd.h}px;
                                border:2px dashed #3b82f6; border-radius:4px; cursor:pointer;
                                animation: pulse 1.5s infinite;"
                            ondragover="event.preventDefault()"
                            ondrop="crcDropAlvo(event, 'diagnostico')"></div>
                        ` : ''}

                        ${crcState.diagnostico && !crcState.manutencao ? `
                        <!-- Área da peça defeituosa -->
                        <div style="position:absolute; left:${posicoesAlvos.peca.x}px; top:${posicoesAlvos.peca.y}px; 
                            width:${posicoesAlvos.peca.w}px; height:${posicoesAlvos.peca.h}px;
                            border:2px dashed #10b981; border-radius:4px; cursor:pointer;
                            animation: pulse 1s infinite;"
                            ondragover="event.preventDefault()"
                            ondrop="crcDropAlvo(event, 'manutencao')"></div>
                        ` : ''}

                        ${crcState.manutencao && !crcState.formatacao ? `
                        <!-- Área do CD -->
                        <div style="position:absolute; left:${posicoesAlvos.cd.x}px; top:${posicoesAlvos.cd.y}px; 
                            width:${posicoesAlvos.cd.w}px; height:${posicoesAlvos.cd.h}px;
                            border:2px dashed #8b5cf6; border-radius:4px; cursor:pointer;
                            animation: pulse 1.5s infinite;"
                            ondragover="event.preventDefault()"
                            ondrop="crcDropAlvo(event, 'formatacao')"></div>
                        ` : ''}

                        ${crcState.formatacao && !crcState.teste ? `
                        <!-- Botão Power -->
                        <div style="position:absolute; left:${posicoesAlvos.power.x}px; top:${posicoesAlvos.power.y}px; 
                            width:${posicoesAlvos.power.w}px; height:${posicoesAlvos.power.h}px;
                            border:3px dashed #7cf50b; border-radius:50%; cursor:pointer;
                            animation: pulse 1s infinite; display:flex; align-items:center; justify-content:center;
                            background:rgba(11, 245, 11, 0.1)"
                            ondragover="event.preventDefault()"
                            ondrop="crcDropAlvo(event, 'teste')">
                            <span style="color:#95f65c; font-size:20px">⏻</span>
                        </div>
                        ` : ''}
                                        
                <!-- Barra de etapas -->
                <div style="display:flex; justify-content:center; gap:14px; padding:12px 16px; background:rgba(0,0,0,0.6)">
                    ${etapas.map((e, i) => `
                        <div style="text-align:center">
                            <div style="width:34px; height:34px; border-radius:50%; 
                                background:${e.feito ? '#10b981' : '#1e293b'}; 
                                border:3px solid ${e.feito ? '#10b981' : '#334155'};
                                display:flex; align-items:center; justify-content:center; font-size:15px;
                                transition:0.3s; ${!e.feito && i === simTaskIndex ? 'box-shadow:0 0 15px #f59e0b80;' : ''}">
                                ${e.feito ? '✓' : e.icon}
                            </div>
                            <div style="color:${e.feito ? '#10b981' : '#64748b'}; font-size:7px; font-weight:700; margin-top:4px">${e.nome}</div>
                        </div>
                    `).join('')}
                </div>
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
    
    // Adiciona estilo da animação pulse
    if (!document.getElementById('crc-pulse-style')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'crc-pulse-style';
        styleEl.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(styleEl);
    }
}

// ═══ DRAG AND DROP ═══

function crcDragStart(e, toolId) {
    crcDraggedItem = toolId;
    crcDraggedType = 'tool';
    e.target.style.opacity = '0.5';
}

function crcDragEnd() {
    crcDraggedItem = null;
    crcDraggedType = null;
    document.querySelectorAll('[id^="tool-"]').forEach(el => el.style.opacity = '1');
}

function crcDropParafuso(e, index) {
    e.preventDefault();
    if (!crcDraggedItem || simLocked) return;
    
    if (crcDraggedItem === 'chave' && crcState.parafusos[index]) {
        animarParafusoSaindo(index);
    } else if (crcDraggedItem !== 'chave') {
        showToast('⚠️ Use a chave de fenda para remover os parafusos!', 'error');
    }
    
    crcDraggedItem = null;
}

function crcDropAlvo(e, etapa) {
    e.preventDefault();
    if (!crcDraggedItem || simLocked) return;
    
    const task = simTasks[simTaskIndex];
    if (!task) return;
    
    const mapa = {
        'lupa': 'diagnostico',
        'peca_nova': 'manutencao',
        'cd_linux': 'formatacao',
        'botao_power': 'teste',
    };
    
    if (mapa[crcDraggedItem] === etapa && task.target === etapa) {
        if (etapa === 'diagnostico' && !crcState.triagem) {
            showToast('⚠️ Abra o notebook primeiro!', 'error');
            return;
        }
        if (etapa === 'manutencao' && !crcState.diagnostico) {
            showToast('⚠️ Faça o diagnóstico primeiro!', 'error');
            return;
        }
        if (etapa === 'formatacao' && (!crcState.diagnostico || !crcState.manutencao)) {
            showToast('⚠️ Conclua diagnóstico e manutenção primeiro!', 'error');
            return;
        }
        if (etapa === 'teste' && !crcState.formatacao) {
            showToast('⚠️ Instale o Linux primeiro!', 'error');
            return;
        }
        
        
        const ferramenta = crcState.ferramentas.find(f => f.id === crcDraggedItem);
        if (ferramenta) ferramenta.usado = true;
        
        crcState[etapa] = true;
        simLocked = true;
        
        const msgs = {
            'diagnostico': '✓ Diagnóstico concluído! HD verificado.',
            'manutencao': '✓ Peça substituída com sucesso!',
            'formatacao': '✓ Linux instalado! Sistema pronto.',
            'teste': '✓ Computador ligado e funcionando!'
        };
        showToast(msgs[etapa], 'success');
        advanceCrcTask();
    } else {
        showToast('⚠️ Use a ferramenta correta para esta etapa!', 'error');
    }

    crcDraggedItem = null;
    renderCrc(currentWorld?.color || '#2563EB');
}

function advanceCrcTask() {
    simTaskIndex++;
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) finishCrcSimulation();
        else renderCrc(currentWorld?.color || '#2563EB');
    }, 500);
}

function finishCrcSimulation() {
    simCompleted = true;
    window._practiceStars = 5;
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:30px 20px">
            <div style="font-size:60px; margin-bottom:10px">🔧</div>
            <h2 style="color:white; font-size:20px; margin-bottom:6px">Computador Recondicionado!</h2>
            <p style="color:#94a3b8; font-size:13px; margin-bottom:16px">Abertura → Diagnóstico → Manutenção → Linux → Teste ✅</p>
            
            <!-- IMAGEM DO PC LIGADO -->
            <img src="img2/crc/etapa6_teste.png" style="width:100%; max-width:350px; border-radius:12px; box-shadow:0 8px 25px rgba(0,0,0,0.5); margin-bottom:20px" alt="Linux instalado" />
            
            <div style="display:flex; justify-content:center; gap:6px; margin:16px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:40px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}