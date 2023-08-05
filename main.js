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

textarea.style.resize = "none";

function saveLocally(){
    const textarea = document.getElementById('textarea');
    const localStorageKey = 'testo';
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
    })

}

saveLocally()

loadLocally()