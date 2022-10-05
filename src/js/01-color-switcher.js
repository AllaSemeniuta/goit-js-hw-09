
const refs = {
    body: document.querySelector("body"),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')

}

let timedId = 0;

refs.startBtn.addEventListener('click', onBtnStart)
refs.stopBtn.addEventListener('click', onBtnStop)

function onBtnStart (){
    refs.startBtn.setAttribute("disabled", 'true')
    setBgColor()

    timedId = setInterval(() => {
        setBgColor()

    }, 1000)

}

function onBtnStop(){
    clearInterval(timedId)
    refs.startBtn.removeAttribute("disabled")
}

function setBgColor () {
    const backgroundColor = getRandomHexColor() 
    refs.body.style.backgroundColor = backgroundColor
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}