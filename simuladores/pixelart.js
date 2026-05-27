// ═══════════════════════════════════════════════════════════
// SIMULADOR PIXEL ART - MONITOR DO MEIO AMBIENTE
// VERSÃO FIEL À FOTO ORIGINAL
// ═══════════════════════════════════════════════════════════

let pixelState = {};

function gerarGabarito() {

    // 14x10
    // baseado SOMENTE na tela da imagem real

    const mapa = [

        "AAAAAAAAAAAAAA",
        "AAAAAAAADDDDAA",
        "AAAAAAAAWWWWAA",
        "AAGGGGAADWWWAA",
        "AADDDDAADGGWAA",
        "AAAAAAAADGGWAA",
        "ADWAAAAADWWWAA",
        "AWDAAAAAWWWWAA",
        "AAAAAAAAAAAAAA",
        "DDWWWWDDDDDWWW"

    ];

    let gabarito = {};

    for (let row = 0; row < mapa.length; row++) {

        for (let col = 0; col < mapa[row].length; col++) {

            const letra = mapa[row][col];

            if (letra !== ' ') {

                gabarito[`${row}-${col}`] = letra;

            }
        }
    }

    return gabarito;
}

function startPixelArtSimulation(tasks, accent) {

    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;

    pixelState = {

        pixels: {},

        corAtual: '#7ee7ea',

        ligado: false,

        etapasConcluidas: {},

        gabarito: gerarGabarito(),

        coresLegenda: {

            A: '#7ee7ea', // azul clarinho
            G: '#84cc16', // verde
            W: '#ffffff', // branco
            D: '#1f2937'  // barra inferior

        },

        cores: [
            '#7ee7ea',
            '#84cc16',
            '#ffffff',
            '#1f2937'
        ]
    };

    renderPixelArt(accent);
}

function renderPixelArt(accent) {

    var task = simTasks[simTaskIndex];

    if (!task) {

        finishPixelArtSimulation();
        return;
    }

    simLocked = false;

    var content = document.getElementById('stage-content');

    var totalGabarito =
        Object.keys(pixelState.gabarito).length;

    var pintadosCorretos =
        Object.keys(pixelState.pixels).length;

    var html = '';

    // HEADER

    html += `
    <div style="
        text-align:center;
        margin-bottom:12px;
        font-size:14px;
        color:#94a3b8;
        font-weight:600
    ">
        ✅ Introdução → ✅ Quiz →
        <strong style="color:white">
            ⚡ Prática
        </strong>
    </div>
    `;

    // CARD

    html += `
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
    `;

    html += `
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
    `;

    html += `
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
            💡 Reconstrua o painel ambiental
        </p>
    </div>
    `;

    html += `</div>`;

    // CENÁRIO ORIGINAL

    html += `
    <div style="
        background:
        linear-gradient(
            180deg,
            #87ceeb 0%,
            #b8e6f0 30%,
            #5ba832 30%,
            #3d7a1e 100%
        );

        border:2px solid #334155;
        border-radius:14px;
        min-height:480px;
        position:relative;
        overflow:hidden
    ">
    `;

    // NUVENS

    html += `
    <div style="
        position:absolute;
        top:8px;
        left:8%;
        font-size:20px;
        opacity:0.6
    ">
        ☁️
    </div>
    `;

    html += `
    <div style="
        position:absolute;
        top:15px;
        right:10%;
        font-size:16px;
        opacity:0.5
    ">
        ☁️
    </div>
    `;

    // MONITOR

    html += `
    <div style="
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%)
    ">
    `;

    // BORDA MONITOR

    html += `
    <div style="
        background:#2a2a3e;
        border:8px solid #3b3b4d;
        border-radius:10px;
        padding:10px;
        display:inline-block;
        box-shadow:0 10px 40px rgba(0,0,0,0.5)
    ">
    `;

    // TELA

    html += `
    <div style="
        background:#0a0a15;
        border:3px solid #111;
        padding:6px
    ">
    `;

    // LED

    html += `
    <div style="
        text-align:right;
        margin-bottom:4px
    ">
    `;

    html += `
    <div style="
        display:inline-block;
        width:8px;
        height:8px;
        border-radius:50%;
        background:${pintadosCorretos > 30 ? '#10b981' : '#333'};
        box-shadow:0 0 6px ${pintadosCorretos > 30 ? '#10b981' : 'transparent'}
    "></div>
    `;

    html += `
    <span style="
        color:#555;
        font-size:7px;
        margin-left:4px
    ">
        ${pintadosCorretos > 30 ? 'ON' : 'STB'}
    </span>
    `;

    html += `</div>`;

    // GRID PIXEL ART

    for (var row = 0; row < 10; row++) {

        html += '<div style="display:flex">';

        for (var col = 0; col < 14; col++) {

            var pixelKey = row + '-' + col;

            var cor =
                pixelState.pixels[pixelKey] ||
                '#0a0a15';

            // GABARITO VISUAL

            if (
                !pixelState.pixels[pixelKey] &&
                pixelState.gabarito[pixelKey]
            ) {

                const letra =
                    pixelState.gabarito[pixelKey];

                const corReal =
                    pixelState.coresLegenda[letra];

                cor = corReal + '55';
            }

            html += `
            <div
                onclick="pintarPixel(${row},${col})"

                style="
                    width:24px;
                    height:24px;
                    background:${cor};

                    border:1px solid rgba(255,255,255,0.04);

                    cursor:pointer;
                    transition:0.1s
                "

                onmouseover="
                    this.style.transform='scale(1.08)'
                "

                onmouseout="
                    this.style.transform='scale(1)'
                "
            ></div>
            `;
        }

        html += '</div>';
    }

    html += `</div>`;

    // TEXTO MONITOR

    html += `
    <div style="
        text-align:center;
        color:#0f0;
        font-size:7px;
        font-family:monospace;
        margin-top:4px
    ">
        COMPUTADORES PARA INCLUSÃO
    </div>
    `;

    html += `</div>`;

    // SUPORTE

    html += `
    <div style="
        width:50px;
        height:18px;
        background:#3b3b4d;
        margin:4px auto 0;
        border-radius:0 0 6px 6px
    "></div>
    `;

    html += `
    <div style="
        width:80px;
        height:10px;
        background:#2a2a3e;
        margin:2px auto 0;
        border-radius:6px
    "></div>
    `;

    html += `</div>`;

    // TEXTO CHÃO

    html += `
    <div style="
        position:absolute;
        bottom:12px;
        left:50%;
        transform:translateX(-50%);
        color:white;
        font-size:10px;
        font-weight:700;
        background:rgba(0,0,0,0.6);
        padding:5px 14px;
        border-radius:12px
    ">
        📍 Esplanada dos Ministérios
    </div>
    `;

    html += `</div>`;

    // PALETA

    html += `
    <div style="
        display:flex;
        gap:6px;
        justify-content:center;
        align-items:center;
        margin-top:10px;
        background:#1e293b;
        border-radius:10px;
        padding:10px
    ">
    `;

    html += `
    <span style="
        color:#94a3b8;
        font-size:9px;
        font-weight:700
    ">
        🎨
    </span>
    `;

    pixelState.cores.forEach(function(c) {

        html += `
        <div
            onclick="
                pixelState.corAtual='${c}';
                renderPixelArt(
                    currentWorld?.color || '#2563EB'
                )
            "

            style="
                width:26px;
                height:26px;
                border-radius:50%;
                background:${c};

                border:3px solid ${
                    pixelState.corAtual === c
                    ? 'white'
                    : '#334155'
                };

                cursor:pointer;
                transition:0.2s
            "
        ></div>
        `;
    });

    html += `
    <span style="
        color:white;
        font-size:9px;
        margin-left:8px
    ">
        ${pintadosCorretos}/${totalGabarito}
    </span>
    `;

    html += `</div>`;

    // BOTÃO LIGAR

    if (
        pintadosCorretos >= totalGabarito &&
        !pixelState.ligado
    ) {

        html += `
        <div style="
            text-align:center;
            margin-top:8px
        ">

            <button
                onclick="ligarMonitor()"

                style="
                    padding:12px 36px;
                    background:#10b981;
                    border:none;
                    border-radius:10px;
                    color:white;
                    font-weight:700;
                    font-size:14px;
                    cursor:pointer;
                    animation:pulse 1.5s infinite
                "
            >
                ⚡ LIGAR MONITOR
            </button>

        </div>
        `;
    }

    // MONITOR LIGADO

    if (pixelState.ligado) {

        html += `
        <div style="
            text-align:center;
            margin-top:8px;
            padding:10px;
            background:#065f4620;
            border:2px solid #10b981;
            border-radius:10px
        ">
            <span style="
                color:#6ee7b7;
                font-weight:700
            ">
                ✅ MONITOR LIGADO! 🌍♻️
            </span>
        </div>
        `;
    }

    content.innerHTML = html;
}

function pintarPixel(row, col) {

    if (simLocked || pixelState.ligado) return;

    var key = row + '-' + col;

    var letra = pixelState.gabarito[key];

    if (!letra) {

        showToast(
            '⚠️ Pinte apenas os pixels visíveis!',
            'error'
        );

        return;
    }

    var corCorreta =
        pixelState.coresLegenda[letra];

    if (pixelState.corAtual !== corCorreta) {

        showToast(
            '🎨 Essa não é a cor correta!',
            'error'
        );

        return;
    }

    pixelState.pixels[key] = corCorreta;

    var pintadosCorretos =
        Object.keys(pixelState.pixels).length;

    if (pintadosCorretos === 20) {

        showToast(
            '🌊 Fundo da campanha montado!',
            'success'
        );
    }

    if (pintadosCorretos === 40) {

        showToast(
            '🟩 Texto ambiental restaurado!',
            'success'
        );
    }

    if (pintadosCorretos === 70) {

        showToast(
            '🖥️ Painel quase completo!',
            'success'
        );
    }

    renderPixelArt(
        currentWorld?.color || '#2563EB'
    );
}

function ligarMonitor() {

    if (simLocked) return;

    pixelState.ligado = true;

    simLocked = true;

    showToast(
        '⚡ PAINEL AMBIENTAL ATIVADO!',
        'success'
    );

    setTimeout(function() {

        finishPixelArtSimulation();

    }, 1000);
}

function finishPixelArtSimulation() {

    simCompleted = true;

    window._practiceStars = 5;

    var accent =
        currentWorld?.color || '#2563EB';

    document.getElementById(
        'stage-content'
    ).innerHTML = `

    <div style="
        text-align:center;
        padding:40px 20px
    ">

        <div style="
            font-size:80px;
            margin-bottom:16px
        ">
            🖥️
        </div>

        <h2 style="
            color:white;
            font-size:22px;
            margin-bottom:8px
        ">
            Monitor Finalizado!
        </h2>

        <p style="
            color:#94a3b8;
            font-size:15px;
            margin-bottom:8px
        ">
            DIA MUNDIAL DO MEIO AMBIENTE 🌍♻️
        </p>

        <div style="
            display:flex;
            justify-content:center;
            gap:8px;
            margin:20px 0
        ">
            ${
                [1,2,3,4,5]
                .map(function() {

                    return `
                    <span style="
                        font-size:44px;
                        color:#fbbf24
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
                font-size:15px
            "

            onclick="finishStage()"
        >
            Concluir Fase →
        </button>

    </div>
    `;
}