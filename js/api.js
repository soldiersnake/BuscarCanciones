import * as UI from './interfaz.js';

class API{
    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;
    };

    consultarApi(){
        const URL = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        spinner();

        fetch(URL)
            .then( respuesta => respuesta.json())
            .then(resultado =>{

                if(resultado.lyrics){

                    const { lyrics } = resultado;
    
                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Letra de la cancion: ${this.cancion} de ${this.artista}`;
                }else{
                    UI.divMensajes.textContent = 'La cancion no existe, prueba con otra busqueda';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                        UI.divMensajes.textContent = '';
                        UI.divMensajes.classList.remove('error');
    
                    }, 3000);
                };
            })

    }
};

function limpiarHTML(){
    while(UI.divResultado.firstChild){
        UI.headingResultado.removeChild(UI.headingResultado.firstChild);
        UI.divResultado.removeChild(UI.divResultado.firstChild);
    }
};

function spinner(){

    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
        <div class="cube1"></div>
        <div class="cube2"></div>
    `
    UI.divResultado.appendChild(spinner);
    setInterval(() => {
        spinner.remove();
    }, 3000);
};


export default API;