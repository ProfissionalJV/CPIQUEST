// ═══════════════════════════════════════════════════════════
// SIMULADOR CALCULADORA DE IMPACTO AMBIENTAL
// ═══════════════════════════════════════════════════════════

let calcState = {};

function startCalculadoraSimulation(tasks, accent) {

    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;

    calcState = {
        pcs: 0,
        calculado: false,
        calculando: false,
        animStep: 0,
        lixoVisto: false,
        metaisVisto: false,
        registrado: false
    };

    renderCalculadora(accent);
}

function renderCalculadora(accent) {

    const task = simTasks[simTaskIndex];

    if (!task) {
        finishCalculadoraSimulation();
        return;
    }

    simLocked = false;

    const content = document.getElementById('stage-content');

    const pcs = calcState.pcs;

    const tonLixo = (pcs * 0.008).toFixed(1);
    const kgMetais = (pcs * 3).toFixed(0);
    const arvores = Math.round(pcs * 0.05);

    content.innerHTML = `

    <div style="
        text-align:center;
        margin-bottom:12px;
        font-size:14px;
        color:#94a3b8;
        font-weight:600
    ">
        ✅ Introdução &nbsp;→&nbsp; ✅ Quiz &nbsp;→&nbsp;
        <strong style="color:white">⚡ Prática</strong>
    </div>

    <div style="
        background:${accent}15;
        border:2px solid ${accent}50;
        border-radius:14px;
        padding:16px;
        margin-bottom:14px;
        display:flex;
        align-items:start;
        gap:12px
    ">

        <span style="
            background:${accent};
            color:white;
            width:32px;
            height:32px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-weight:700;
            font-size:14px;
            flex-shrink:0
        ">
            ${simTaskIndex + 1}/${simTasks.length}
        </span>

        <div>

            <p style="
                color:white;
                font-weight:700;
                font-size:15px;
                margin-bottom:4px
            ">
                ${task.label}
            </p>

            <p style="
                color:#93c5fd;
                font-size:13px
            ">
                💡 ${task.hint || 'Siga as instruções'}
            </p>

        </div>

    </div>

    <!-- CALCULADORA -->
    <div style="
        background:#1e293b;
        border:2px solid #334155;
        border-radius:14px;
        padding:24px;
        text-align:center
    ">

        <div style="
            font-size:50px;
            margin-bottom:12px
        ">
            ♻️
        </div>

        <h3 style="
            color:white;
            font-size:18px;
            margin-bottom:20px
        ">
            Calculadora de Impacto Ambiental
        </h3>

        <!-- INPUT -->
        <div style="
            background:#0f172a;
            border:2px solid ${
                task.target === 'input-pcs'
                ? '#f59e0b'
                : '#334155'
            };
            border-radius:10px;
            padding:16px;
            margin-bottom:20px;
            display:inline-block;
            ${
                task.target === 'input-pcs'
                ? 'animation:pulse 1s infinite;'
                : ''
            }
        ">

            <p style="
                color:#94a3b8;
                font-size:12px;
                margin-bottom:8px
            ">
                Quantos computadores foram recondicionados?
            </p>

            <div style="
                display:flex;
                gap:8px;
                align-items:center
            ">

                <span style="font-size:24px">🖥️</span>

                <input
                    id="calc-input"
                    type="number"
                    min="0"
                    max="9999"
                    placeholder="Ex: 150"

                    value="${calcState.pcs || ''}"

                    oninput="handleInputPCS(this.value)"

                    style="
                        width:120px;
                        padding:12px;
                        background:#1e293b;
                        border:2px solid #3b82f6;
                        border-radius:8px;
                        color:white;
                        font-size:20px;
                        font-weight:700;
                        text-align:center;
                        outline:none
                    "
                >

            </div>

        </div>

        <!-- BOTÃO -->
        ${!calcState.calculado ? `
            <div>

                <button
                    id="calc-btn"
                    onclick="handleCalcular()"

                    style="
                        padding:14px 40px;
                        background:#10b981;
                        border:none;
                        border-radius:10px;
                        color:white;
                        font-weight:700;
                        font-size:15px;
                        cursor:pointer;
                        box-shadow:0 4px 15px rgba(16,185,129,0.3)
                    "
                >
                    📊 CALCULAR IMPACTO
                </button>

            </div>
        ` : ''}

        <!-- ANIMAÇÃO -->
        ${calcState.calculando ? `

        <div style="
            margin-top:20px;
            background:#0f172a;
            border:2px solid #334155;
            border-radius:14px;
            padding:18px;
            max-width:420px;
            margin-left:auto;
            margin-right:auto;
            text-align:left;
            animation:pulse 1s infinite;
        ">

            <div style="
                color:#10b981;
                font-weight:700;
                margin-bottom:14px;
                font-size:15px;
                text-align:center
            ">
                ♻️ Processando impacto ambiental...
            </div>

            <!-- ETAPA 1 -->
            <div style="
                margin-bottom:10px;
                opacity:${calcState.animStep >= 1 ? 1 : 0.2};
                transition:0.3s
            ">

                <div style="
                    color:white;
                    font-size:14px
                ">
                    🖥️ ${calcState.pcs} computadores recondicionados
                </div>

            </div>

            <!-- ETAPA 2 -->
            <div style="
                margin-bottom:10px;
                opacity:${calcState.animStep >= 2 ? 1 : 0.2};
                transition:0.3s
            ">

                <div style="
                    color:#fbbf24;
                    font-size:14px
                ">
                    🗑️ ${calcState.pcs} × 8kg =
                    ${(calcState.pcs * 8).toFixed(0)}kg de lixo evitado
                </div>

            </div>

            <!-- ETAPA 3 -->
            <div style="
                margin-bottom:10px;
                opacity:${calcState.animStep >= 3 ? 1 : 0.2};
                transition:0.3s
            ">

                <div style="
                    color:#f87171;
                    font-size:14px
                ">
                    ⚠️ ${calcState.pcs} × 3kg =
                    ${(calcState.pcs * 3).toFixed(0)}kg de metais pesados evitados
                </div>

                <div style="
                    color:#4ade80;
                    font-size:14px;
                    margin-top:8px
                ">
                    🌳 ${calcState.pcs} × 0.05 =
                    ${Math.round(calcState.pcs * 0.05)} árvores preservadas
                </div>

            </div>

        </div>

        ` : ''}

        <!-- RESULTADOS -->
        ${calcState.calculado ? `

        <div style="margin-top:20px">

            <p style="
                color:#10b981;
                font-size:13px;
                font-weight:700;
                margin-bottom:16px
            ">
                ✅ Impacto calculado para ${pcs} computadores:
            </p>

            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:12px;
                max-width:400px;
                margin:0 auto
            ">

                <!-- LIXO -->
                <div

                    onclick="${
                        task.target === 'result-lixo'
                        ? "handleVerResultado('lixo')"
                        : ''
                    }"

                    style="
                        background:#0f172a;
                        border:2px solid ${
                            task.target === 'result-lixo'
                            ? '#f59e0b'
                            : '#334155'
                        };
                        border-radius:10px;
                        padding:16px;
                        text-align:center;
                        cursor:pointer;
                        ${
                            task.target === 'result-lixo'
                            ? 'animation:pulse 1s infinite;'
                            : ''
                        }
                    "
                >

                    <div style="font-size:30px">🗑️</div>

                    <div style="
                        color:white;
                        font-weight:700;
                        font-size:18px;
                        margin:6px 0
                    ">
                        ${tonLixo} ton
                    </div>

                    <div style="
                        color:#94a3b8;
                        font-size:10px
                    ">
                        Lixo eletrônico evitado
                    </div>

                </div>

                <!-- METAIS -->
                <div

                    onclick="${
                        task.target === 'result-metais'
                        ? "handleVerResultado('metais')"
                        : ''
                    }"

                    style="
                        background:#0f172a;
                        border:2px solid ${
                            task.target === 'result-metais'
                            ? '#f59e0b'
                            : '#334155'
                        };
                        border-radius:10px;
                        padding:16px;
                        text-align:center;
                        cursor:pointer;
                        ${
                            task.target === 'result-metais'
                            ? 'animation:pulse 1s infinite;'
                            : ''
                        }
                    "
                >

                    <div style="font-size:30px">⚠️</div>

                    <div style="
                        color:white;
                        font-weight:700;
                        font-size:18px;
                        margin:6px 0
                    ">
                        ${kgMetais} kg
                    </div>

                    <div style="
                        color:#94a3b8;
                        font-size:10px
                    ">
                        Metais pesados evitados
                    </div>

                </div>

            </div>

            <!-- ÁRVORES -->
            <div style="
                background:#0f172a;
                border:2px solid #334155;
                border-radius:10px;
                padding:14px;
                margin-top:12px;
                max-width:400px;
                margin-left:auto;
                margin-right:auto
            ">

                <span style="font-size:24px">🌳</span>

                <span style="
                    color:white;
                    font-weight:600;
                    font-size:14px
                ">
                    Equivalente a preservar
                    <strong style="color:#10b981">
                        ${arvores} árvores
                    </strong>
                </span>

            </div>

            ${
                calcState.lixoVisto &&
                calcState.metaisVisto &&
                !calcState.registrado

                ? `
                    <button

                        id="calc-registrar"
                        onclick="handleRegistrar()"

                        style="
                            margin-top:16px;
                            padding:14px 40px;
                            background:#3b82f6;
                            border:none;
                            border-radius:10px;
                            color:white;
                            font-weight:700;
                            font-size:15px;
                            cursor:pointer;
                            box-shadow:0 4px 15px rgba(59,130,246,0.3)
                        "
                    >
                        📝 REGISTRAR DADOS
                    </button>
                `
                : ''
            }

        </div>

        ` : ''}

    </div>
    `;
}

function handleInputPCS(value) {

    calcState.pcs = parseInt(value) || 0;

    const task = simTasks[simTaskIndex];

    if (
        task &&
        task.target === 'input-pcs' &&
        calcState.pcs > 0
    ) {

        showToast(
            '✓ Quantidade registrada!',
            'success'
        );

        advanceCalcTask();
    }
}

function handleCalcular() {

    if (simLocked) return;

    const task = simTasks[simTaskIndex];

    if (!task || task.target !== 'btn-calcular') return;

    if (!calcState.pcs || calcState.pcs <= 0) {

        showToast(
            '⚠️ Digite um número válido!',
            'error'
        );

        return;
    }

    simLocked = true;

    calcState.calculando = true;
    calcState.animStep = 0;

    renderCalculadora(
        currentWorld?.color || '#2563EB'
    );

    setTimeout(() => {

        calcState.animStep = 1;

        renderCalculadora(
            currentWorld?.color || '#2563EB'
        );

    }, 700);

    setTimeout(() => {

        calcState.animStep = 2;

        renderCalculadora(
            currentWorld?.color || '#2563EB'
        );

    }, 1400);

    setTimeout(() => {

        calcState.animStep = 3;

        renderCalculadora(
            currentWorld?.color || '#2563EB'
        );

    }, 2100);

    setTimeout(() => {

        calcState.calculando = false;
        calcState.calculado = true;

        renderCalculadora(
            currentWorld?.color || '#2563EB'
        );

        showToast(
            '✓ Impacto calculado!',
            'success'
        );

        simLocked = false;

        advanceCalcTask();

    }, 3200);
}

function handleVerResultado(tipo) {

    if (simLocked) return;

    const task = simTasks[simTaskIndex];

    if (!task) return;

    if (
        tipo === 'lixo' &&
        task.target === 'result-lixo'
    ) {

        calcState.lixoVisto = true;

        showToast(
            '✓ Resultado analisado!',
            'success'
        );

        advanceCalcTask();
    }

    else if (
        tipo === 'metais' &&
        task.target === 'result-metais'
    ) {

        calcState.metaisVisto = true;

        showToast(
            '✓ Resultado analisado!',
            'success'
        );

        advanceCalcTask();
    }
}

function handleRegistrar() {

    if (simLocked) return;

    const task = simTasks[simTaskIndex];

    if (!task || task.target !== 'btn-registrar') return;

    calcState.registrado = true;

    showToast(
        '✓ Dados registrados com sucesso!',
        'success'
    );

    advanceCalcTask();
}

function advanceCalcTask() {

    simLocked = true;

    simTaskIndex++;

    setTimeout(() => {

        if (simTaskIndex >= simTasks.length) {

            finishCalculadoraSimulation();
        }

        else {

            renderCalculadora(
                currentWorld?.color || '#2563EB'
            );
        }

    }, 500);
}

function finishCalculadoraSimulation() {

    simCompleted = true;

    window._practiceStars = 5;

    const accent = currentWorld?.color || '#2563EB';

    document.getElementById('stage-content').innerHTML = `

    <div style="
        text-align:center;
        padding:40px 20px
    ">

        <div style="
            font-size:80px;
            margin-bottom:16px
        ">
            ♻️
        </div>

        <h2 style="
            color:white;
            font-size:22px;
            margin-bottom:8px
        ">
            Impacto Registrado!
        </h2>

        <p style="
            color:#94a3b8;
            font-size:15px;
            margin-bottom:20px
        ">
            ${calcState.pcs} computadores recondicionados =
            menos lixo e menos contaminação 🌍
        </p>

        <div style="
            display:flex;
            justify-content:center;
            gap:8px;
            margin:20px 0
        ">

            ${[1,2,3,4,5].map(() => `
                <span style="
                    font-size:44px;
                    color:#fbbf24;
                    filter:drop-shadow(0 0 8px rgba(251,191,36,0.6))
                ">
                    ★
                </span>
            `).join('')}

        </div>

        <button
            class="dialog-btn"

            style="
                background:${accent};
                padding:14px 36px;
                font-size:15px
            "

            onclick="finishStage()"
        >
            Concluir Fase →
        </button>

    </div>
    `;
}