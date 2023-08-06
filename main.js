const localStorageKey = 'testo';

function updateCounters(){
    const textarea = document.getElementById('textarea')
    const counterDiv = document.getElementById('counter-div')
    const wordsCount = countWords(textarea.value)
    const charactersCount = countCharacters(textarea.value)
    counterDiv.textContent = 'Hai scritto ' + wordsCount + ' parole e ' + charactersCount + ' caratteri'
    textarea.style.resize = "none";
}

textarea.addEventListener('input', updateCounters);

const toggleButton = document.getElementById('markdown-btn');
const preview = document.getElementById('preview');

toggleButton.addEventListener('click', toggleMarkdown);

let isMarkdown = false;
updatePreview();

function toggleMarkdown(){
    isMarkdown = !isMarkdown;
    updatePreview();
}

function updatePreview(){

    if (isMarkdown) {
        const markdownText = textarea.value;
        const htmlText = marked(markdownText);

        preview.innerHTML = htmlText;

        textarea.style.display = 'none';
        preview.style.display = 'block';
        toggleButton.textContent = 'Toggle Plain Text';
    } else {
        textarea.style.display = 'block';
        preview.style.display = 'none';
        toggleButton.textContent = 'Toggle Markdown';
    }

}

function switchThemes(){

    console.log('TATSUMAKI SENPUKYAKU');
    const textarea = document.getElementById('textarea');
    if (document.body.className === 'light' && textarea.className === 'light'){
        textarea.className = 'dark'
        document.body.className = 'dark'
    } else {
        document.body.className = 'light'
        textarea.className = 'light'
    }

}
// const textarea = document.getElementById('textarea')
// const counterDiv = document.getElementById('counter-div')
// counterDiv.appendChild(document.createTextNode('Hai scritto ' + countWords(textarea.value) + ' parole e ' + countCharacters(textarea.value) + ' caratteri'))
// textarea.style.resize = "none";

function saveLocally(){
    const textarea = document.getElementById('textarea');
    
    textarea.addEventListener('input', function (event) {
    const text = event.target.value;
    localStorage.setItem(localStorageKey, text)    

    });

}

function loadLocally(){

    window.addEventListener('load', function (){
        const savedText = this.localStorage.getItem(localStorageKey)
        if (savedText){
            textarea.value = savedText
        }
    });

}

function downloadTxt(){

    const textarea = document.getElementById('textarea');
    const textToSave = textarea.value;
    const blob = new Blob([textToSave], { type: 'text/plain'});
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

function countCharacters(text){
    const textWithoutSpaces = text.replace(/\s+/g, '');
    return textWithoutSpaces.length;
}

function countWords(text){
    const trimmedText = text.trim();

    if(trimmedText === ''){
        return 0
    }

    const wordsArray = trimmedText.split(/\s+/);
    return wordsArray.length;
}


const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', toggleFullscreen);

function toggleFullscreen(){

    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen(){

    const element = document.documentElement;
    if(element.requestFullscreen){
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        
    } else if (element.webkitRequestFullscreen) {

    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    }

}

function exitFullscreen(){
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

updateCounters()