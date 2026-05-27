// ═══════════════════════════════════════════════════════════
// SIMULADOR QUIZ FINAL - MISSÃO FINAL
// ═══════════════════════════════════════════════════════════

let quizFinalState = {};

function startQuizFinalSimulation(tasks, accent) {
    simTasks = tasks;
    simTaskIndex = 0;
    simCompleted = false;
    simLocked = false;
    quizFinalState = {
        respostas: {},
        acertos: 0,
        respondido: false,
        ultimoAcerto: false
    };
    renderQuizFinal(accent);
}

function renderQuizFinal(accent) {
    var task = simTasks[simTaskIndex];
    if (!task) { finishQuizFinalSimulation(); return; }
    
    simLocked = false;
    var content = document.getElementById('stage-content');
    
    var html = '';
    html += '<div style="text-align:center; margin-bottom:10px; font-size:14px; color:#94a3b8; font-weight:600">🏆 <strong style="color:#fbbf24">MISSÃO FINAL</strong> 🏆</div>';
    
    html += '<div style="background:' + accent + '15; border:2px solid ' + accent + '50; border-radius:14px; padding:14px; margin-bottom:12px; display:flex; align-items:start; gap:10px">';
    html += '<span style="background:' + accent + '; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; flex-shrink:0">' + (simTaskIndex+1) + '/5</span>';
    html += '<div><p style="color:white; font-weight:700; font-size:14px; margin-bottom:3px">' + task.label + '</p>';
    html += '<p style="color:#93c5fd; font-size:12px">💡 ' + task.hint + '</p></div></div>';
    
    // Pergunta
    html += '<div style="background:#1e293b; border:2px solid #334155; border-radius:14px; padding:24px; text-align:center">';
    
    // Ícone decorativo
    html += '<div style="font-size:50px; margin-bottom:12px">' + ['💻', '📡', '🔧', '🔄', '🎪'][simTaskIndex] + '</div>';
    
    // Pergunta
    html += '<div style="background:#0f172a; border:2px solid #334155; border-radius:10px; padding:16px; margin-bottom:20px">';
    html += '<p style="color:white; font-weight:700; font-size:16px; margin:0">' + task.label + '</p>';
    html += '</div>';
    
    // Opções
    if (!quizFinalState.respondido) {
        html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px">';
        task.opcoes.forEach(function(opcao) {
            html += '<button onclick="responderQuizFinal(\'' + opcao + '\')" style="padding:14px; background:#0f172a; border:2px solid #334155; border-radius:10px; color:white; font-weight:600; font-size:13px; cursor:pointer; transition:0.2s" onmouseover="this.style.borderColor=\'' + accent + '\'; this.style.background=\'#1e293b\'" onmouseout="this.style.borderColor=\'#334155\'; this.style.background=\'#0f172a\'">' + opcao + '</button>';
        });
        html += '</div>';
    } else {
        var acertou = quizFinalState.ultimoAcerto;
        html += '<div style="padding:14px; background:' + (acertou ? '#065f4620' : '#7f1d1d20') + '; border:2px solid ' + (acertou ? '#10b981' : '#ef4444') + '; border-radius:10px; margin-bottom:14px">';
        html += '<span style="color:' + (acertou ? '#10b981' : '#ef4444') + '; font-weight:700; font-size:15px">' + (acertou ? '✅ CORRETO!' : '❌ INCORRETO!') + '</span>';
        if (!acertou) html += '<p style="color:#94a3b8; font-size:11px; margin-top:4px">Resposta correta: ' + task.resposta + '</p>';
        html += '</div>';
        html += '<button onclick="avancarQuizFinal()" style="padding:12px 36px; background:' + accent + '; border:none; border-radius:10px; color:white; font-weight:700; font-size:14px; cursor:pointer">' + (simTaskIndex < 4 ? 'Próxima Pergunta →' : 'Ver Resultado 🏆') + '</button>';
    }
    
    // Placar
    html += '<div style="display:flex; gap:20px; justify-content:center; margin-top:16px; padding-top:12px; border-top:1px solid #334155">';
    html += '<div style="color:#10b981; font-weight:700; font-size:12px">✅ ' + quizFinalState.acertos + ' acertos</div>';
    html += '<div style="color:#fbbf24; font-weight:700; font-size:12px">⭐ ' + (simTaskIndex) + ' de 5</div>';
    html += '</div>';
    
    html += '</div>';
    
    // Progresso
    html += '<div style="display:flex; gap:6px; justify-content:center; margin-top:10px">';
    simTasks.forEach(function(_, i) {
        html += '<div style="width:' + (i===simTaskIndex?25:10) + 'px; height:10px; border-radius:5px; background:' + (i<simTaskIndex?'#10b981':i===simTaskIndex?accent:'#334155') + '; transition:0.3s"></div>';
    });
    html += '</div>';
    
    content.innerHTML = html;
}

function responderQuizFinal(resposta) {
    if (simLocked) return;
    var task = simTasks[simTaskIndex];
    if (!task) return;
    
    quizFinalState.respondido = true;
    quizFinalState.respostas[task.target] = resposta;
    
    if (resposta === task.resposta) {
        quizFinalState.ultimoAcerto = true;
        quizFinalState.acertos++;
        showToast('✅ Resposta correta!', 'success');
    } else {
        quizFinalState.ultimoAcerto = false;
        showToast('❌ Resposta incorreta!', 'error');
    }
    
    renderQuizFinal(currentWorld?.color || '#2563EB');
}

function avancarQuizFinal() {
    if (simLocked) return;
    quizFinalState.respondido = false;
    simLocked = true;
    advanceQuizFinalTask();
}

function advanceQuizFinalTask() {
    simTaskIndex++;
    setTimeout(function() {
        if (simTaskIndex >= simTasks.length) finishQuizFinalSimulation();
        else renderQuizFinal(currentWorld?.color || '#2563EB');
    }, 400);
}

function finishQuizFinalSimulation() {
    simCompleted = true;
    var corretas = quizFinalState.acertos;
    window._practiceStars = corretas;
    var accent = currentWorld?.color || '#2563EB';
    
    document.getElementById('stage-content').innerHTML = 
    '<div style="text-align:center; padding:40px 20px">' +
        '<div style="font-size:80px; margin-bottom:16px">🏆</div>' +
        '<h2 style="color:white; font-size:28px; margin-bottom:8px">PARABÉNS!</h2>' +
        '<p style="color:#94a3b8; font-size:16px; margin-bottom:8px">Você completou o CPIQuest!</p>' +
        '<p style="color:#fbbf24; font-size:18px; margin-bottom:20px">' + corretas + ' de 5 acertos na Missão Final!</p>' +
        '<div style="display:flex; justify-content:center; gap:8px; margin:20px 0">' + 
            [1,2,3,4,5].map(function(i) { 
                return '<span style="font-size:44px; color:' + (i<=corretas?'#fbbf24':'#334155') + '">★</span>'; 
            }).join('') + 
        '</div>' +
        '<p style="color:#ec4899; font-size:16px; font-weight:700; margin-bottom:20px">🎮 PARABÉNS MEUS PARCEIROS! 🎮</p>' +
        '<button class="dialog-btn" style="background:' + accent + '; padding:14px 36px; font-size:15px" onclick="finishStage()">Concluir Jornada 🏆</button>' +
    '</div>';

    // 🔥 Mostra o diálogo dos 3 professores após 2 segundos
    setTimeout(function() {
        showWelcomeDialogFinal();
    }, 2000);
}

// ═══════════════════════════════════════════════════════════
// DIÁLOGO FINAL DOS 3 PROFESSORES
// ═══════════════════════════════════════════════════════════

function showWelcomeDialogFinal() {
    const overlay = document.createElement('div');
    overlay.id = 'welcome-overlay-final';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 100;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px); padding: 20px;
    `;
    
    var step = 0;
    var lines = [
        "E aí, galera! Aqui é o JonJon! Espero que tenham curtido o Mundo da Informática! 💻",
        "Aprenderam sobre Windows, Word, Excel e aqueles atalhos que salvam vidas, né? 😄",
        "Mini Fred aqui! No Mundo do MCom vocês viram como a inclusão digital transforma o Brasil! 📡",
        "CRCs, Norte Conectado, 5G... agora vocês são feras em políticas públicas de conectividade!",
        "Gustavinho na área! No Mundo da CGID, mergulhamos fundo no nosso trabalho do dia a dia! 🏛️",
        "Eventos, desfazimento, ACTs, sistemas... cada setor fazendo a diferença!",
        "Nós três esperamos ter cumprido o papel de professores da melhor maneira possível! 🎓",
        "Depois que a competição encerrar, vocês podem refazer o jogo quantas vezes quiserem!",
        "Se tiverem dúvida em algo, é só voltar e praticar de novo. O jogo estará sempre aqui! 🔄",
        "Obrigado por jogarem com a gente. Até mais! 🏆"
    ];
    
    function showStep() {
        var isJonJon = step < 2;
        var isMiniFred = step >= 2 && step < 4;
        var isGustavinho = step >= 4 && step < 6;
        var isTodos = step >= 6;
        
        var avatarImg = isJonJon ? 'img2/jonjon.png' : isMiniFred ? 'img2/mini_fred.png' : isGustavinho ? 'img2/tavin.png' : '';
        var nome = isJonJon ? 'JonJon' : isMiniFred ? 'Mini Fred' : isGustavinho ? 'Gustavinho' : 'Os Três';
        var cargo = isJonJon ? 'Mundo 1 - Informática' : isMiniFred ? 'Mundo 2 - MCom' : isGustavinho ? 'Mundo 3 - CGID' : 'Professores do InfoQuest';
        var cor = isJonJon ? '#3b82f6' : isMiniFred ? '#ef4444' : isGustavinho ? '#10b981' : '#fbbf24';
        
        overlay.innerHTML = `
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); 
                border: 2px solid ${cor}; border-radius: 20px; padding: 30px 24px; 
                max-width: 500px; width: 100%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${cor}30;">
                
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px">
                    ${isTodos ? `
                        <div style="display:flex;">
                            <div style="width:45px; height:45px; border-radius:50%; border:2px solid #3b82f6; overflow:hidden; box-shadow:0 4px 15px rgba(59,130,246,0.5)">
                                <img src="img2/jonjon.png" style="width:100%; height:100%; object-fit:cover" />
                            </div>
                            <div style="width:45px; height:45px; border-radius:50%; border:2px solid #ef4444; overflow:hidden; margin-left:-12px; box-shadow:0 4px 15px rgba(239,68,68,0.5)">
                                <img src="img2/mini_fred.png" style="width:100%; height:100%; object-fit:cover" />
                            </div>
                            <div style="width:45px; height:45px; border-radius:50%; border:2px solid #10b981; overflow:hidden; margin-left:-12px; box-shadow:0 4px 15px rgba(16,185,129,0.5)">
                                <img src="img2/tavin.png" style="width:100%; height:100%; object-fit:cover" />
                            </div>
                        </div>
                    ` : `
                        <div style="width:50px; height:50px; border-radius:50%; border:2px solid ${cor}; overflow:hidden; flex-shrink:0; box-shadow:0 4px 15px ${cor}50">
                            <img src="${avatarImg}" style="width:100%; height:100%; object-fit:cover" />
                        </div>
                    `}
                    <div>
                        <span style="font-weight:700; color:${cor}; font-size:16px">${nome}</span>
                        <div style="font-size:11px; color:#64748b">${cargo}</div>
                    </div>
                    <span style="margin-left:auto; font-size:12px; color:#64748b; font-weight:600">${step+1}/10</span>
                </div>
                
                <p style="color:#e2e8f0; font-size:15px; line-height:1.8; margin-bottom:24px; text-align:left">
                    ${lines[step]}
                </p>
                
                <button id="final-dialog-btn" 
                    style="width:100%; padding:14px; border-radius:12px; border:none; font-weight:700; font-size:14px; 
                        cursor:pointer; background:linear-gradient(135deg, #1e3a8a, #2563eb); color:white;
                        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3)">
                    ${step < lines.length - 1 ? 'Próximo →' : 'ATÉ MAIS GALERINHA!'}
                </button>
            </div>
        `;
        
        setTimeout(function() {
            var btn = document.getElementById('final-dialog-btn');
            if (btn) {
                btn.onclick = function() {
                    step++;
                    if (step >= lines.length) {
                        overlay.remove();
                    } else {
                        showStep();
                    }
                };
            }
        }, 100);
            }
    
    showStep();
    document.body.appendChild(overlay);
}