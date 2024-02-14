const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const appIm = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botaoCheck = document.querySelectorAll('.app__card-button')
const playPauseBt = document.querySelector('#start-pause')
const comecarOuPausar = document.querySelector('#start-pause span')
const playPauseIcon = document.querySelector('.app__card-primary-butto-icon')
const musicaFocoInput = document.querySelector('#alternar-musica')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio ('/sons/play.wav')
const audioPause = new Audio ('/sons/pause.mp3')
const audioTempoFinalizado = new Audio ('/sons/beep.mp3')


let temporizadorEmSegundos = 10
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
        }
})

focoBt.addEventListener('click', () => {
    temporizadorEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    temporizadorEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    temporizadorEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botaoCheck.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    appIm.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(temporizadorEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo Finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    temporizadorEmSegundos -= 1
    mostrarTempo()
}

playPauseBt.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(intervaloId){
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    comecarOuPausar.textContent = 'Pausar'
    playPauseIcon.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    comecarOuPausar.textContent = 'Começar'
    playPauseIcon.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(temporizadorEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()