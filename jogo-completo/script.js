const bancoPerguntas = {
    facil: [
        {pergunta: "Qual é a razão da P.G. (3, 6, 12, 24)?", opcoes: ["2", "3", "4", "1,5"], correta: 0},
		{pergunta: "Qual o próximo termo da P.G. (2, 6, 18, ...)?", opcoes: ["36", "54", "72", "108"], correta: 1},
		{pergunta: "Qual é a soma dos próximos dois termos da PG (4, 12, 36, ...)?", opcoes: ["504", "236", "432", "108"], correta: 2},
		{pergunta: "Se uma PG começa com o termo (a1 = 3) e tem razão (q = 2), qual é o terceiro termo (a{3})?", opcoes: ["3", "6", "10", "12"], correta: 3},
		{pergunta: "Determine o próximo termo da progressão geométrica (5, 10, 20, 40, ...):", opcoes: ["50", "60", "80", "100"], correta: 2},
		{pergunta: "Dada a PG (1, 5, 25, 125, ...), qual é o valor do quinto termo (a{5})?", opcoes: ["625", "1000", "1250", "3125"], correta: 0}
    ],
    medio: [
        {pergunta: "Dada a P.G. onde a1 = 2 e razão q = 3, qual é o 4º termo?", opcoes: ["18", "27", "54", "81"], correta: 2},
		{pergunta: "O número de bactérias em uma cultura dobra a cada hora. Se inicialmente havia 150 bactérias, quantas bactérias haverá nessa cultura após 6 horas?", opcoes: ["900", "4.800", "9.600", "19.200"], correta: 2},
		{pergunta: "Calcule o número de termos (n) da progressão geométrica finita (3, 6, 12, ..., 768):", opcoes: ["7", "8", "9", "10"], correta: 2},
		{pergunta: "Em uma PG de termos positivos, o primeiro termo é (a1 = 5) e o quarto termo é (a4 = 135). Qual é o valor do quinto termo (a{5}) dessa sequência?", opcoes: ["270", "315", "405", "540"], correta: 2},
		{pergunta: "Se dividirmos o décimo termo (a{10}) pelo sétimo termo (a{7}) de uma PG qualquer, obtemos o número 125. Qual é o valor da razão (q) dessa progressão?", opcoes: ["5", "15", "25", "125"], correta: 0},
		{pergunta: "Uma população de insetos aumenta de acordo com uma progressão geométrica. Se no dia 1 havia 50 insetos e no dia 5 havia 800 insetos, quantos insetos havia no dia 3?", opcoes: ["200", "300", "400", "425"], correta: 0}
    ],
    dificil: [
        {pergunta: "Os termos da soma S = 4 + 8 + 16 + ... + 2048 estão em progressão geométrica. Assinale o valor de S.", opcoes: ["4092", "4100", "8192", "19688"], correta: 0},
		{pergunta: "Considere uma progressão geométrica infinitamente decrescente cuja soma dos termos é 8. Retirando-se os termos de índice par, a soma dos termos restantes passa a ser 6. O primeiro termo dessa PG original é:", opcoes: ["2", "3", "4", "9/2"], correta: 2},
		{pergunta: "Em uma progressão geométrica finita de termos positivos, o produto do primeiro termo pelo último termo é igual a 144. Se a soma do segundo termo com o penúltimo termo é igual a 30, qual é o valor do segundo termo dessa sequência sabendo que ela é crescente?", opcoes: ["4", "6", "8", "12"], correta: 1},
		{pergunta: "A soma de uma progressão geométrica infinita decrescente é igual a 6. Se multiplicarmos todos os termos dessa progressão por 3, qual será a nova soma da sequência?", opcoes: ["6", "12", "18", "24"], correta: 2},
		{pergunta: "Uma sequência de quadrados é construída de tal forma que o lado de cada quadrado, a partir do segundo, é igual à metade da diagonal do quadrado anterior. Se o lado do primeiro quadrado mede 1{cm}, a soma das áreas de todos os infinitos quadrados dessa sequência é:", opcoes: ["2cm2", "3cm2", "4cm2", "5cm2"], correta: 0},
		{pergunta: "Um investidor aplica R$ 1.000,00 em um fundo que rende juros compostos de 10% ao ano. O montante acumulado por esse investidor ao final de cada ano, a partir do momento da aplicação (ano 0, ano 1, ano 2, ..., ano n), forma qual tipo de sequência matemática e qual é a sua razão?", opcoes: ["Uma PA de razão 100", "Uma PG de razão 0,1", "Uma PG de razão 1,1", "Uma PA de razão 1,1"], correta: 2}
	]
};

let perguntasPartida = [];
let backupPerguntas = { facil: [], medio: [], dificil: [] };
let indiceAtual = 0;
let tempoRestante = 120;
let timerInterval = null;
let respostaCorretaAtual = 0;

// Estados das Ajudas (3 pulos agora)
let ajudaMenosDoisUsada = false;
let ajudaSirCuitosUsada = false;
let pulosRestantes = 3;

// Elementos da UI
const menuScreen = document.getElementById('menu-screen');
const quizScreen = document.getElementById('quiz-screen');
const gameoverScreen = document.getElementById('gameover-screen');

const btnJogar = document.getElementById('btn-jogar');
const btnTutorial = document.getElementById('btn-tutorial');
const btnSair = document.getElementById('btn-sair');
const btnReiniciar = document.getElementById('btn-reiniciar');

const tutorialModal = document.getElementById('tutorial-modal');
const btnTutorialNext = document.getElementById('btn-tutorial-next');
const btnTutorialPrev = document.getElementById('btn-tutorial-prev');
const btnTutorialClose = document.getElementById('btn-tutorial-close');
const tutorialPage1 = document.getElementById('tutorial-page-1');
const tutorialPage2 = document.getElementById('tutorial-page-2');
let tutorialPageAtual = 1;

const formulasModal = document.getElementById('formulas-modal');
const btnAbrirFormulas = document.getElementById('btn-abrir-formulas');
const btnFormulasClose = document.getElementById('btn-formulas-close');

const questionCounter = document.getElementById('question-counter');
const timerLabel = document.getElementById('timer-label');
const mascotContainer = document.getElementById('mascot-container');
const mascotDialog = document.getElementById('mascot-dialog');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.btn-answer');

const btnMenosDois = document.getElementById('btn-menos-dois');
const btnSirCuitos = document.getElementById('btn-sir-cuitos');
const btnPula = document.getElementById('btn-pula');

// Eventos de Menu e Modais
btnJogar.addEventListener('click', iniciarJogo);
btnTutorial.addEventListener('click', abrirTutorial);
btnSair.addEventListener('click', () => { 
    alert("Para fechar, basta fechar a aba do seu navegador."); 
});
btnReiniciar.addEventListener('click', () => {
    gameoverScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
});

// Tutorial Navegação
btnTutorialClose.addEventListener('click', () => tutorialModal.classList.add('hidden'));
btnTutorialNext.addEventListener('click', () => {
    tutorialPageAtual = 2;
    tutorialPage1.classList.add('hidden');
    tutorialPage2.classList.remove('hidden');
    btnTutorialPrev.style.display = 'block';
    btnTutorialNext.style.display = 'none';
});
btnTutorialPrev.addEventListener('click', () => {
    tutorialPageAtual = 1;
    tutorialPage2.classList.add('hidden');
    tutorialPage1.classList.remove('hidden');
    btnTutorialPrev.style.display = 'none';
    btnTutorialNext.style.display = 'block';
});

function abrirTutorial() {
    tutorialPageAtual = 1;
    tutorialPage1.classList.remove('hidden');
    tutorialPage2.classList.add('hidden');
    btnTutorialPrev.style.display = 'none';
    btnTutorialNext.style.display = 'block';
    tutorialModal.classList.remove('hidden');
}

// Caderno de Fórmulas Modais
btnAbrirFormulas.addEventListener('click', () => formulasModal.classList.remove('hidden'));
btnFormulasClose.addEventListener('click', () => formulasModal.classList.add('hidden'));

// Ajudas e Respostas
btnMenosDois.addEventListener('click', usarMenosDois);
btnSirCuitos.addEventListener('click', usarSirCuitos);
btnPula.addEventListener('click', usarPula);

answerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const escolhida = parseInt(e.target.dataset.index);
        verificarResposta(escolhida);
    });
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function iniciarJogo() {
    menuScreen.classList.add('hidden');
    gameoverScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');

    // Resetando ajudas (3 pulos agora)
    ajudaMenosDoisUsada = false;
    ajudaSirCuitosUsada = false;
    pulosRestantes = 3;
    btnMenosDois.disabled = false;
    btnSirCuitos.disabled = false;
    btnPula.disabled = false;
    btnPula.textContent = `⏭️ Pular (${pulosRestantes})`;

    let f = shuffle([...bancoPerguntas.facil]);
    let m = shuffle([...bancoPerguntas.medio]);
    let d = shuffle([...bancoPerguntas.dificil]);

    perguntasPartida = [];
    backupPerguntas.facil = [];
    backupPerguntas.medio = [];
    backupPerguntas.dificil = [];

    for (let i = 0; i < f.length; i++) {
        if (i < 4) perguntasPartida.push({ ...f[i], diff: 'facil' });
        else backupPerguntas.facil.push({ ...f[i], diff: 'facil' });
    }

    for (let i = 0; i < m.length; i++) {
        if (i < 4) perguntasPartida.push({ ...m[i], diff: 'medio' });
        else backupPerguntas.medio.push({ ...m[i], diff: 'medio' });
    }

    for (let i = 0; i < d.length; i++) {
        if (i < 2) perguntasPartida.push({ ...d[i], diff: 'dificil' });
        else backupPerguntas.dificil.push({ ...d[i], diff: 'dificil' });
    }

    shuffle(perguntasPartida);
    indiceAtual = 0;
    carregarPergunta();
}

function carregarPergunta() {
    if (indiceAtual >= perguntasPartida.length) {
        encerrarJogo(true);
        return;
    }

    const q = perguntasPartida[indiceAtual];
    questionCounter.textContent = `Pergunta ${indiceAtual + 1} de 10`;
    questionText.textContent = q.pergunta;
    respostaCorretaAtual = q.correta;

    answerButtons.forEach((btn, i) => {
        const letras = ["A", "B", "C", "D"];
        btn.textContent = `${letras[i]}) ${q.opcoes[i]}`;
        btn.disabled = false;
        btn.classList.remove('disabled');
    });

    // Lógica do Sir Cuitos: aparece APENAS na primeira pergunta automaticamente
    if (indiceAtual === 0) {
        mascotContainer.classList.remove('hidden');
        mascotDialog.textContent = "Sir Cuitos: 'Olá estudante! Estou aqui na primeira pergunta de P.G. Boa sorte! Se precisar de mim depois, clique no botão de ajuda.'";
    } else {
        mascotContainer.classList.add('hidden');
    }

    iniciarTimer();
}

function iniciarTimer() {
    clearInterval(timerInterval);
    tempoRestante = 120;
    atualizarDisplayTimer();

    timerInterval = setInterval(() => {
        tempoRestante--;
        atualizarDisplayTimer();

        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            encerrarJogo(false, "O tempo esgotou!");
        }
    }, 1000);
}

function atualizarDisplayTimer() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    timerLabel.textContent = `Tempo: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function verificarResposta(escolhida) {
    clearInterval(timerInterval);

    if (escolhida === respostaCorretaAtual) {
        indiceAtual++;
        carregarPergunta();
    } else {
        encerrarJogo(false, "Resposta incorreta!");
    }
}

function usarMenosDois() {
    if (ajudaMenosDoisUsada) return;
    ajudaMenosDoisUsada = true;
    btnMenosDois.disabled = true;

    let incorretas = [];
    answerButtons.forEach((btn, i) => {
        if (i !== respostaCorretaAtual) incorretas.append ? null : incorretas.push(i);
    });

    shuffle(incorretas);
    answerButtons[incorretas[0]].disabled = true;
    answerButtons[incorretas[0]].classList.add('disabled');
    answerButtons[incorretas[1]].disabled = true;
    answerButtons[incorretas[1]].classList.add('disabled');
}

function usarSirCuitos() {
    if (ajudaSirCuitosUsada) return;
    ajudaSirCuitosUsada = true;
    btnSirCuitos.disabled = true;

    const letras = ["A", "B", "C", "D"];
    mascotContainer.classList.remove('hidden');
    mascotDialog.textContent = `Sir Cuitos: 'Beep! Meus circuitos lógicos dizem que a resposta correta é a alternativa ${letras[respostaCorretaAtual]}!'`;
}

function usarPula() {
    if (pulosRestantes <= 0) return;

    const qAtual = perguntasPartida[indiceAtual];
    const diff = qAtual.diff;

    if (backupPerguntas[diff] && backupPerguntas[diff].length > 0) {
        const novaQ = backupPerguntas[diff].pop();
        perguntasPartida[indiceAtual] = novaQ;
        pulosRestantes--;
        btnPula.textContent = `⏭️ Pular (${pulosRestantes})`;
        if (pulosRestantes <= 0) btnPula.disabled = true;
        carregarPergunta();
    } else {
        pulosRestantes--;
        btnPula.textContent = `⏭️ Pular (${pulosRestantes})`;
        if (pulosRestantes <= 0) btnPula.disabled = true;
        indiceAtual++;
        carregarPergunta();
    }
}

function encerrarJogo(vitoria, motivo = "") {
    clearInterval(timerInterval);
    quizScreen.classList.add('hidden');
    gameoverScreen.classList.remove('hidden');

    const titulo = document.getElementById('gameover-title');
    const mensagem = document.getElementById('gameover-message');

    if (vitoria) {
        titulo.textContent = "PARABÉNS! 🏆";
        mensagem.textContent = "Você gabaritou todas as 10 perguntas e venceu o Show da P.G.!";
        titulo.style.color = "#ffd700";
    } else {
        titulo.textContent = "FIM DE JOGO";
        mensagem.textContent = `${motivo} Não foi desta vez, tente novamente para dominar a Progressão Geométrica!`;
        titulo.style.color = "#ff4d4d";
    }
}