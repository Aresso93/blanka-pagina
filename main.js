

//CONTEGGIO PAROLE

function updateCounters() {
    const textarea = document.getElementById('textarea')
    const counterDiv = document.getElementById('counter-div')
    const wordsCount = countWords(textarea.value)
    const charactersCount = countCharacters(textarea.value)
    counterDiv.textContent = 'Hai scritto ' + wordsCount + ' parola/e e ' + charactersCount + ' caratteri'
    textarea.style.resize = "none";
}

function countWords(text) {
    const trimmedText = text.trim();

    if (trimmedText === '') {
        return 0
    }

    const wordsArray = trimmedText.split(/\s+/);
    return wordsArray.length;
}

function countCharacters(text) {
    const textWithoutSpaces = text.replace(/\s+/g, '');
    return textWithoutSpaces.length;
}

const textarea = document.getElementById('textarea')
textarea.addEventListener('input', updateCounters);

updateCounters()



const toggleButton = document.getElementById('markdown-btn');
toggleButton.addEventListener('click', toggleConversion)


let isMarkdown = true;
let originalText = '';

const md = window.markdownit()

function toggleConversion() {
    if (isMarkdown) {
        originalText = textarea.value;
        const htmlText = md.render(originalText);
        const preview = document.getElementById('preview');
        preview.innerHTML = htmlText;
        textarea.style.display = 'none';
        preview.style.display = 'block';
    } else {
        const preview = document.getElementById('preview');
        preview.style.display = 'none';
        textarea.style.display = 'block';
        textarea.value = originalText;
    }
    isMarkdown = !isMarkdown;
}


function switchThemes() {

    const textarea = document.getElementById('textarea');
    if (document.body.className === 'light' && textarea.className === 'light') {
        textarea.className = 'dark'
        document.body.className = 'dark'
    } else {
        document.body.className = 'light'
        textarea.className = 'light'
    }

}

//SALVATAGGIO E CARICAMENTO

function saveLocally(){

    textarea.addEventListener('input', function (event) {
        const text = event.target.value;
        localStorage.setItem(localStorageKey, text)

    });

}

function loadLocally(){

    window.addEventListener('load', function () {
        const savedText = this.localStorage.getItem(localStorageKey)
        if (savedText) {
            textarea.value = savedText
        }
    });

}

const localStorageKey = 'testo';


//DOWNLOAD DEL TESTO

function downloadTxt() {

    //const textarea = document.getElementById('textarea');
    const textToSave = textarea.value;
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a')
    downloadLink.href = url;
    downloadLink.download = 'text_file.txt';


    document.body.appendChild(downloadLink)

    downloadLink.click()

    document.body.removeChild(downloadLink);

}

const downloadBtn = document.getElementById('download-btn')
downloadBtn.addEventListener('click', downloadTxt)

//FULLSCREEN


const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {

    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen() {

    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {

    } else if (element.webkitRequestFullscreen) {

    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    }

}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {

    } else if (document.webkitExitFullscreen) {

    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    }
}

saveLocally()

loadLocally()

