const html = document.querySelector('html');
const btnFoco = document.querySelector('.app_foco');
const btnDescanso = document.querySelector('.app_descanso');
const imagem = document.querySelector('.imagemDestaque');
const titulo = document.querySelector('.frase');
const botoes = document.querySelectorAll('.card_btn button');
const startPause = document.querySelector('#start-pause');
const iniciarOuPausar = document.querySelector('#start-pause span');
const iconPlayPause = document.querySelector('.app_btn__first');
const tempo =document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btnFoco.classList.add('active');
});

btnDescanso.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 600;
    alterarContexto('descanso');
    btnDescanso.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/img/${contexto}.png`);

    switch(contexto){
        case "foco":
            titulo.innerHTML= `Aceite a responsabilidade,<br>
            <strong class="frase_ngrito">pelo seu futuro.</strong>`
            break;
        case "descanso":
            titulo.innerHTML= `Que tal um,<br>
            <strong class="frase_ngrito">cafezinho?</strong>`
            break;
    }

}

const contagemRegressiva =  () => {
    if(tempoDecorridoEmSegundos <= 0){
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPause.addEventListener('click', playOrpause)

function playOrpause(){
    if(intervaloId){
        zerar()
        return
    }
    iconPlayPause.setAttribute('src', './img/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausar.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloId)
    iconPlayPause.setAttribute('src', './img/play_arrow.png')
    iniciarOuPausar.textContent= "Play"
    intervaloId = null;
}


function mostrarTempo(){
    const t = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = t.toLocaleTimeString('pt-Br',{minute: '2-digit', second:'2-digit'} )
    tempo.innerHTML=`${tempoFormatado}`
}

mostrarTempo()
