// ═══════════════════════════════════════════════════════════
// SIMULADOR TERMO DE DOAÇÃO + PLANILHA FULLSCREEN
// ═══════════════════════════════════════════════════════════

let termoExcelState = {};

function startTermoExcelSimulation(tasks, accent) {

    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;

    termoExcelState = {
        dados: {
            'A2': '',
            'B2': '',
            'C2': '',
            'D2': '',
            'E2': '',
            'F2': '',
            'G2': ''
        },
        salvo: false
    };

    renderTermoExcel(accent);
}

function renderTermoExcel(accent) {

    var task = simTasks[simTaskIndex];

    if (!task) {
        finishTermoExcelSimulation();
        return;
    }

    simLocked = false;

    var content = document.getElementById('stage-content');

    // FULLSCREEN REAL
    content.style.width = '100vw';
    content.style.maxWidth = '100vw';
    content.style.height = '100vh';
    content.style.padding = '18px';
    content.style.boxSizing = 'border-box';
    content.style.overflow = 'hidden';

    var html = '';

    // TOPO
    html += `
    <div style="
        text-align:center;
        margin-bottom:14px;
        font-size:14px;
        color:#94a3b8;
        font-weight:600;
    ">
        ✅ Introdução → ✅ Quiz →
        <strong style="color:white">⚡ Prática</strong>
    </div>
    `;

    // CARD TAREFA
    html += `
    <div style="
        background:${accent}15;
        border:2px solid ${accent}50;
        border-radius:14px;
        padding:14px;
        margin-bottom:16px;
        display:flex;
        align-items:start;
        gap:10px;
    ">

        <span style="
            background:${accent};
            color:white;
            width:30px;
            height:30px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-weight:700;
            font-size:13px;
            flex-shrink:0;
        ">
            ${simTaskIndex + 1}/${simTasks.length}
        </span>

        <div>
            <p style="
                color:white;
                font-weight:700;
                font-size:15px;
                margin-bottom:4px;
            ">
                ${task.label}
            </p>

            <p style="
                color:#93c5fd;
                font-size:13px;
            ">
                💡 ${task.hint || 'Preencha o campo'}
            </p>
        </div>

    </div>
    `;

    // GRID PRINCIPAL
    html += `
    <div style="
        display:grid;
        grid-template-columns:420px 0.95fr;
        gap:20px;
        width:100%;
        height:82vh;
    ">
    `;

    // ═══════════════════════════════════════
    // TERMO
    // ═══════════════════════════════════════

    html += `
    <div style="
        background:white;
        border:2px solid #ccc;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 4px 20px rgba(0,0,0,0.3);
        display:flex;
        flex-direction:column;
        height:100%;
    ">
    `;

    html += `
    <div style="
        background:#185abd;
        color:white;
        padding:14px;
        font-size:18px;
        font-weight:700;
        text-align:center;
    ">
        📄 TERMO DE DOAÇÃO
    </div>
    `;

    html += `
    <div style="
        flex:1;
        overflow:auto;
        background:white;
        padding:12px;
    ">
        <img
            src="img2/termo.jpeg"

            style="
                width:100%;
                height:auto;
                object-fit:contain;
                display:block;
            "

            alt="Termo de Doação"
        />
    </div>
    `;

    html += `
    <div style="
        padding:10px;
        background:#f0f4ff;
        text-align:center;
        font-size:11px;
        color:#666;
    ">
        Programa Computadores para Inclusão
    </div>
    `;

    html += `</div>`;

    // ═══════════════════════════════════════
    // PLANILHA
    // ═══════════════════════════════════════

    html += `
    <div style="
        background:#1e293b;
        border:2px solid #334155;
        border-radius:12px;
        padding:20px;
        overflow:auto;
        display:flex;
        flex-direction:column;
        width:100%;
        height:100%;
        box-sizing:border-box;
    ">
    `;

    html += `
    <div style="
        color:#10b981;
        font-size:20px;
        font-weight:700;
        margin-bottom:18px;
    ">
        📊 REGISTRO DE DOAÇÕES - PLANILHA
    </div>
    `;

    // TABELA
    html += `
    <table style="
        border-collapse:collapse;
        width:100%;
        table-layout:fixed;
    ">
    `;

    html += `
    <tr style="background:#0f172a">

        <th style="
            padding:16px 10px;
            border:1px solid #334155;
            color:#94a3b8;
            width:22%;
            white-space:nowrap;
            font-size:14px;
        ">
            NOME DO PID
        </th>

        <th style="
            padding:16px 10px;
            border:1px solid #334155;
            color:#94a3b8;
            width:8%;
            white-space:nowrap;
            font-size:14px;
        ">
            QTD
        </th>

        <th style="
            padding:16px 10px;
            border:1px solid #334155;
            color:#94a3b8;
            width:18%;
            white-space:nowrap;
            font-size:14px;
        ">
            CNPJ
        </th>

        <th style="
            padding:16px 10px;
            border:1px solid #334155;
            color:#94a3b8;
            width:24%;
            white-space:nowrap;
            font-size:14px;
        ">
            ENDEREÇO
        </th>

        <th style="
            padding:16px 10px;
            border:1px solid #334155;
            color:#94a3b8;
            width:14%;
            white-space:nowrap;
            font-size:14px;
        ">
            MUNICÍPIO
        </th>

        <th style="
            padding:16px 10px;
            border:1px solid #334155;
            color:#94a3b8;
            width:6%;
            white-space:nowrap;
            font-size:14px;
        ">
            UF
        </th>

        <th style="
            padding:16px 10px;
            border:1px solid #334155;
            color:#94a3b8;
            width:14%;
            white-space:nowrap;
            font-size:14px;
        ">
            DATA
        </th>

    </tr>
    `;

    var campos = [
        'A2',
        'B2',
        'C2',
        'D2',
        'E2',
        'F2',
        'G2'
    ];

    var placeholders = [
        'Escola Municipal Santos Dumont',
        '20',
        '12.345.678/0001-99',
        'Rua das Flores, 123 - Centro',
        'Brasília',
        'DF',
        '15/05/2025'
    ];

    var targets = [
        'cell-a2',
        'cell-b2',
        'cell-c2',
        'cell-d2',
        'cell-e2',
        'cell-f2',
        'cell-g2'
    ];

    html += `<tr>`;

    campos.forEach(function(campo, i) {

        var ativo =
            simTasks[simTaskIndex] &&
            simTasks[simTaskIndex].target === targets[i];

        html += `
        <td style="
            padding:6px;
            border:1px solid #334155;
        ">

            <input
                id="cell-${campo}"
                type="text"

                placeholder="${placeholders[i]}"

                value="${termoExcelState.dados[campo] || ''}"

                oninput="
                    termoExcelState.dados['${campo}'] = this.value
                "

                style="
                    width:100%;
                    padding:16px 12px;
                    background:${ativo ? '#1e40af' : '#0f172a'};
                    border:2px solid ${ativo ? accent : '#334155'};
                    border-radius:8px;
                    color:white;
                    font-size:15px;
                    outline:none;
                    text-align:center;
                    white-space:nowrap;
                    box-sizing:border-box;
                "
            >

        </td>
        `;
    });

    html += `</tr>`;

    html += `</table>`;

    // BOTÃO SALVAR
    var todosPreenchidos = campos.every(function(c) {
        return termoExcelState.dados[c];
    });

    if (todosPreenchidos && !termoExcelState.salvo) {

        html += `
        <div style="
            text-align:center;
            margin-top:24px;
        ">

            <button
                onclick="salvarTermoExcel()"

                style="
                    padding:16px 42px;
                    background:#10b981;
                    border:none;
                    border-radius:12px;
                    color:white;
                    font-weight:700;
                    font-size:16px;
                    cursor:pointer;
                    box-shadow:0 4px 15px rgba(16,185,129,0.3);
                "
            >
                💾 SALVAR REGISTRO
            </button>

        </div>
        `;
    }

    // SALVO
    if (termoExcelState.salvo) {

        html += `
        <div style="
            text-align:center;
            margin-top:24px;
            padding:18px;
            background:#065f4620;
            border:2px solid #10b981;
            border-radius:12px;
        ">

            <span style="
                color:#6ee7b7;
                font-weight:700;
                font-size:16px;
            ">
                ✅ Registro salvo com sucesso!
            </span>

        </div>
        `;
    }

    html += `</div>`;
    html += `</div>`;

    // TOAST
    html += `
    <div
        id="sim-toast"

        style="
            display:none;
            position:fixed;
            bottom:20px;
            left:50%;
            transform:translateX(-50%);
            padding:12px 24px;
            border-radius:12px;
            font-size:14px;
            font-weight:700;
            z-index:40;
            white-space:nowrap;
            box-shadow:0 4px 20px rgba(0,0,0,0.4);
        "
    ></div>
    `;

    // PROGRESSO
    html += `
    <div style="
        display:flex;
        gap:8px;
        justify-content:center;
        margin-top:16px;
    ">
    `;

    simTasks.forEach(function(_, i) {

        html += `
        <div style="
            width:${i === simTaskIndex ? 34 : 12}px;
            height:12px;
            border-radius:6px;

            background:${
                i < simTaskIndex
                ? '#10b981'
                : i === simTaskIndex
                    ? accent
                    : '#334155'
            };

            transition:0.3s;
        "></div>
        `;
    });

    html += `</div>`;

    content.innerHTML = html;

    // ENTER
    setTimeout(function() {

        document.querySelectorAll('input[id^="cell-"]')
            .forEach(function(input) {

                input.addEventListener('keydown', function(e) {

                    if (e.key === 'Enter') {
                        verificarCelulaPreenchida();
                    }

                });

            });

    }, 200);
}

function verificarCelulaPreenchida() {

    if (simLocked) return;

    var task = simTasks[simTaskIndex];

    if (!task) return;

    var mapa = {
        'cell-a2': 'A2',
        'cell-b2': 'B2',
        'cell-c2': 'C2',
        'cell-d2': 'D2',
        'cell-e2': 'E2',
        'cell-f2': 'F2',
        'cell-g2': 'G2'
    };

    var campo = mapa[task.target];

    if (campo && termoExcelState.dados[campo]) {

        simLocked = true;

        showToast('✓ Campo preenchido!', 'success');

        advanceTermoExcelTask();
    }
}

function salvarTermoExcel() {

    if (simLocked) return;

    var task = simTasks[simTaskIndex];

    if (!task || task.target !== 'btn-salvar') return;

    termoExcelState.salvo = true;

    simLocked = true;

    showToast('✓ Registro salvo na planilha!', 'success');

    advanceTermoExcelTask();
}

function advanceTermoExcelTask() {

    simTaskIndex++;

    setTimeout(function() {

        if (simTaskIndex >= simTasks.length) {
            finishTermoExcelSimulation();
        } else {
            renderTermoExcel(currentWorld?.color || '#2563EB');
        }

    }, 400);
}

function finishTermoExcelSimulation() {

    simCompleted = true;

    window._practiceStars = 5;

    var accent = currentWorld?.color || '#2563EB';

    document.getElementById('stage-content').innerHTML = `
    <div style="
        text-align:center;
        padding:40px 20px;
    ">

        <div style="
            font-size:80px;
            margin-bottom:16px;
        ">
            📊
        </div>

        <h2 style="
            color:white;
            font-size:28px;
            margin-bottom:8px;
        ">
            Registro Concluído!
        </h2>

        <p style="
            color:#94a3b8;
            font-size:16px;
            margin-bottom:20px;
        ">
            PID: ${termoExcelState.dados['A2']} |
            ${termoExcelState.dados['B2']} computadores
        </p>

        <div style="
            display:flex;
            justify-content:center;
            gap:8px;
            margin:20px 0;
        ">
            ${
                [1,2,3,4,5].map(function() {

                    return `
                    <span style="
                        font-size:44px;
                        color:#fbbf24;
                        filter:drop-shadow(
                            0 0 8px rgba(251,191,36,0.6)
                        );
                    ">
                        ★
                    </span>
                    `;

                }).join('')
            }
        </div>

        <button
            class="dialog-btn"

            style="
                background:${accent};
                padding:14px 36px;
                font-size:16px;
            "

            onclick="finishStage()"
        >
            Concluir Fase →
        </button>

    </div>
    `;
}