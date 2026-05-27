// ═══════════════════════════════════════════════════════════
// SIMULADOR EXCEL
// ═══════════════════════════════════════════════════════════

let excelData = {};
let excelActiveCell = null;
let excelFormatted = false;

function startExcelSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    excelData = {
        'A1': '', 'B1': '', 'C1': '',
        'A2': '', 'B2': '', 'C2': '',
        'A3': '', 'B3': '', 'C3': '',
        'A4': '', 'B4': '', 'C4': '',
    };
    excelActiveCell = null;
    excelFormatted = false;
    
    renderExcel(accent);
}

function renderExcel(accent) {
    const task = simTasks[simTaskIndex];
    if (!task) { finishExcelSimulation(); return; }
    
    simLocked = false;
    const content = document.getElementById('stage-content');
    
    // Estilo das células
    const cellStyle = (cellId) => {
        const isActive = excelActiveCell === cellId;
        const isHeader = cellId.includes('1');
        let bg = isHeader ? '#1e3a5f' : '#0f172a';
        if (isActive) bg = '#1e40af';
        return `
            background:${bg}; 
            border:2px solid ${isActive ? accent : '#334155'}; 
            color:white; 
            padding:8px; 
            text-align:center; 
            font-size:13px; 
            cursor:pointer;
            min-width:80px;
            ${excelFormatted && isHeader ? 'font-weight:bold;' : ''}
            ${excelFormatted ? 'border:2px solid #3b82f6;' : ''}
        `;
    };
    
    content.innerHTML = `
        <div style="text-align:center; margin-bottom:12px; font-size:14px; color:#94a3b8; font-weight:600">
            ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp; <strong style="color:white">⚡ Prática</strong>
        </div>
        
        <!-- Instrução -->
        <div style="background:${accent}15; border:2px solid ${accent}50; border-radius:14px; padding:16px; margin-bottom:16px; display:flex; align-items:start; gap:12px">
            <span style="background:${accent}; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0">${simTaskIndex+1}/${simTasks.length}</span>
            <div>
                <p style="color:white; font-weight:700; font-size:15px; margin-bottom:4px">${task.label}</p>
                <p style="color:#93c5fd; font-size:13px">💡 ${task.hint || 'Siga as instruções'}</p>
            </div>
        </div>
        
        <!-- PLANILHA EXCEL -->
        <div style="background:#1e293b; border:1px solid #334155; border-radius:14px; padding:20px; overflow-x:auto">
            
            <!-- Barra de ferramentas do Excel -->
            <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap">
                <button onclick="excelBold()" style="padding:8px 14px; background:#334155; border:none; border-radius:6px; color:white; font-weight:700; font-size:12px; cursor:pointer">N</button>
                <button onclick="excelItalic()" style="padding:8px 14px; background:#334155; border:none; border-radius:6px; color:white; font-style:italic; font-size:12px; cursor:pointer">I</button>
                <button onclick="excelSave()" style="padding:8px 14px; background:#2563eb; border:none; border-radius:6px; color:white; font-weight:700; font-size:12px; cursor:pointer">💾 Salvar</button>
                <button id="format-table-btn" onclick="formatAsTable()" style="padding:8px 14px; background:#059669; border:none; border-radius:6px; color:white; font-weight:700; font-size:12px; cursor:pointer">📊 Formatar como Tabela</button>
            </div>
            
            <!-- Grade de células -->
            <table style="border-collapse:collapse; width:100%; max-width:500px">
                <tr>
                    <td style="color:#94a3b8; font-size:11px; padding:4px; text-align:center; width:30px"></td>
                    <td style="color:#94a3b8; font-size:11px; padding:4px; text-align:center">A</td>
                    <td style="color:#94a3b8; font-size:11px; padding:4px; text-align:center">B</td>
                    <td style="color:#94a3b8; font-size:11px; padding:4px; text-align:center">C</td>
                </tr>
                ${[1,2,3,4].map(row => `
                    <tr>
                        <td style="color:#94a3b8; font-size:11px; padding:4px; text-align:center">${row}</td>
                        ${['A','B','C'].map(col => {
                            const cellId = col + row;
                            return `
                                <td id="cell-${cellId}" onclick="selectExcelCell('${cellId}')" 
                                                        ondblclick="editExcelCell('${cellId}')"
                                    style="${cellStyle(cellId)}"
                                    ondblclick="editExcelCell('${cellId}')">
                                    ${excelData[cellId] || ''}
                                </td>
                            `;
                        }).join('')}
                    </tr>
                `).join('')}
            </table>
            
            <!-- Campo de edição -->
            <div id="excel-formula-bar" style="display:flex; align-items:center; gap:8px; margin-top:12px; padding:8px 12px; background:#0f172a; border:1px solid #334155; border-radius:8px">
                <span id="excel-cell-ref" style="color:#fbbf24; font-weight:700; font-size:13px; min-width:40px">${excelActiveCell || ''}</span>
                <input id="excel-cell-input" type="text" placeholder="Digite o valor da célula..."
                    style="flex:1; background:transparent; border:none; color:white; font-size:13px; outline:none"
                    onkeydown="if(event.key==='Enter') saveExcelCell()">
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

function selectExcelCell(cellId) {
    excelActiveCell = cellId;
    renderExcel(currentWorld?.color || '#2563EB');
    
    // Verifica tarefa
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'cell-' + cellId.toLowerCase()) {
        setTimeout(() => {
            const input = document.getElementById('excel-cell-input');
            if (input) input.focus();
        }, 200);
    }

    // Depois de renderizar a tabela, adicione:
    setTimeout(() => {
    const table = document.querySelector('#stage-content table');
    if (table) {
        table.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && excelActiveCell) {
                e.preventDefault();
                const input = document.getElementById('excel-cell-input');
                if (input) input.focus();
            }
        });
    }
}, 300);
}

function editExcelCell(cellId) {
    excelActiveCell = cellId;
    renderExcel(currentWorld?.color || '#2563EB');
    setTimeout(() => {
        const input = document.getElementById('excel-cell-input');
        if (input) {
            input.value = excelData[cellId] || '';
            input.focus();
        }
    }, 200);
}

function saveExcelCell() {
    if (!excelActiveCell) return;
    const input = document.getElementById('excel-cell-input');
    if (!input) return;
    
    excelData[excelActiveCell] = input.value;
    
    const task = simTasks[simTaskIndex];
    if (task) {
        let completed = false;
        
        if (task.target === 'cell-a1' && excelData['A1']) completed = true;
        if (task.target === 'cell-b1' && excelData['B1'] && excelData['C1']) completed = true;
        if (task.target === 'cell-a2' && excelData['A2'] && excelData['B2'] && excelData['C2']) completed = true;  // 🆕
        if (task.target === 'cell-a3' && excelData['A3'] && excelData['B3'] && excelData['C3']) completed = true;  // 🆕
        if (task.target === 'cell-a4' && excelData['A2'] && excelData['A3'] && excelData['A4']) completed = true;
        if (task.target === 'cell-b4' && excelData['B2'] && excelData['B3'] && excelData['B4']) completed = true;
        
        if (completed) {
            simLocked = true;
            showToast('✓ ' + task.label, 'success');
            advanceExcelTask();
            return;
        }
    }
    
    renderExcel(currentWorld?.color || '#2563EB');
}

function formatAsTable() {
    excelFormatted = true;
    renderExcel(currentWorld?.color || '#2563EB');
    
    const task = simTasks[simTaskIndex];
    if (task && task.target === 'format-table') {
        simLocked = true;
        showToast('✓ Tabela formatada com sucesso!', 'success');
        advanceExcelTask();
    }
}

function excelBold() {
    if (excelActiveCell) {
        showToast('🔤 Negrito aplicado!', 'success');
    }
}

function excelItalic() {
    if (excelActiveCell) {
        showToast('🔤 Itálico aplicado!', 'success');
    }
}

function excelSave() {
    showToast('💾 Planilha salva com sucesso!', 'success');
}

function advanceExcelTask() {
    simTaskIndex++;
    
    setTimeout(() => {
        if (simTaskIndex >= simTasks.length) {
            finishExcelSimulation();
        } else {
            renderExcel(currentWorld?.color || '#2563EB');
        }
    }, 500);
}

function finishExcelSimulation() {
    simCompleted = true;
    
    // Salva as estrelas da prática
    window._practiceStars = 5;
    
    const accent = currentWorld?.color || '#2563EB';
    document.getElementById('stage-content').innerHTML = `
        <div style="text-align:center; padding:40px 20px">
            <div style="font-size:80px; margin-bottom:16px">📊</div>
            <h2 style="color:white; font-size:22px; margin-bottom:8px">Planilha Finalizada!</h2>
            <p style="color:#94a3b8; font-size:15px; margin-bottom:20px">Tabela formatada e salva com sucesso!</p>
            <div style="display:flex; justify-content:center; gap:8px; margin:20px 0">
                ${[1,2,3,4,5].map(i => `<span style="font-size:44px; color:#fbbf24; filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))">★</span>`).join('')}
            </div>
            <button class="dialog-btn" style="background:${accent}; padding:14px 36px; font-size:15px" onclick="finishStage()">
                Concluir Fase →
            </button>
        </div>
    `;
}