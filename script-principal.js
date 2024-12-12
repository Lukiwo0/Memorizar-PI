const mostrar = document.getElementById("number-pi");
const inputPI = document.getElementById("user-pi");
const alert = document.getElementById("alert");

function mostrarPI() {
    mostrar.classList.toggle("ocultar")
}

// Bloquear o CTRL+V
inputPI.addEventListener("paste", (event) => {
    event.preventDefault();
    alert.innerText = `Você não pode colar nada neste campo!`
});

// Bloquear o arrastar
inputPI.addEventListener("drop", (event) => {
    event.preventDefault();
    alert.innerText = `Você não pode arrastar nada neste campo!`
});

// Bloquear sugestão no input
inputPI.addEventListener("cut", (event) => {
    event.preventDefault();
})

// Bloquear recortar e colar mobile
inputPI.addEventListener("contextmenu", (event) => {
    event.preventDefault();
})


let timer;
let horas = 0, minutos = 0, segundos = 0;
let intervalo;
let formatarTime;

// Função do cronometro
function iniciarTimer() {
    intervalo = setInterval(() => {
        segundos++;
        if (segundos >= 60) {
            segundos = 0;
            minutos++
        }

        if (minutos >= 60) {
            minutos = 0;
            horas++
        }

        formatarTime = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
        document.getElementById("timer").innerText = `${formatarTime}`;
    }, 1000);
}

// Detectar se o usuário começou a digitar
inputPI.addEventListener("input", function() {
    
    if (!mostrar.classList.contains("ocultar")) {
        mostrarPI();
    }

    if (!timer && this.value !== "") {
        timer = true;
        iniciarTimer();
    }
});

function resultadoTeste() {
    const pi = "3,1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
    const User = inputPI.value;
    const mensagemUser = User.replace(/\s+/g, '');
    const result = document.getElementById("result");
    
    let validarResult = "";
    let messagePor = "";
    let cont = 0;
    
    alert.innerText = "";
    result.innerHTML = "";
    
    clearInterval(intervalo);
    inputPI.value = "";
    document.getElementById("timer").innerText = `00:00:00`;
    horas = 0, minutos = 0, segundos = 0;
    timer = false;
    

    if (mensagemUser.length <= 0) {
        alert.innerText = `Você não digitou nada!`
        return
    }

    let tam = 0;

    for (let i = 0; i < mensagemUser.length; i++) {
        if (pi[i] === undefined) {
            validarResult += `<span class="errado">${mensagemUser[i]}</span>`;
            cont--;
        } else {
            if (mensagemUser[i] === pi[i]) {
                validarResult += `<span class="certo">${mensagemUser[i]}</span>`;
                cont++;
            } else {
                validarResult += `<span class="errado">${mensagemUser[i]}</span>`;
                cont--;
            }
        }
    }

    let porcetagem = (cont/pi.length) * 100;
    porcetagem = parseFloat(porcetagem.toFixed(2));

    if (porcetagem >= 100) {
        messagePor = `<p class="certo"> Parabéns você acertou tudo!</p>`
    } else {
        messagePor = `<p class="errado"> Infelizmente você não acertou.</p>`
    }

    if (formatarTime == undefined) {
        formatarTime = `00:00:00`;
    }

    result.innerHTML = messagePor + `<p>Porcentagem de acerto: ${porcetagem}%</p>` + `<p>Tempo: ${formatarTime}</p>` + validarResult;
}

document.getElementById("enviarResult").addEventListener("click", resultadoTeste);

inputPI.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        resultadoTeste();
    }
})
