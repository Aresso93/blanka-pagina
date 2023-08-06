const localStorageKey = 'testo';

function updateCounters(){
    const textarea = document.getElementById('textarea')
    const counterDiv = document.getElementById('counter-div')
    const wordsCount = countWords(textarea.value)
    const charactersCount = countCharacters(textarea.value)
    counterDiv.textContent = 'Hai scritto ' + wordsCount + ' parole e ' + charactersCount + ' caratteri'
    textarea.style.resize = "none";
}

textarea.addEventListener('input', updateCounters)

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

const downloadBtn = document.getElementById('downloadBtn')
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



saveLocally()

loadLocally()

updateCounters()