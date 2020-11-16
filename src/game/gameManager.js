import WordManager from './wordManager.js'
//controla si se gana o pierde
//la dificultad
//llama al gestor de palabras
export default class GameManager {
    constructor(dificultad) {

        //coge la configuracion del jugador
        this.name = "";
        this.time = 0;
        this.letrasVisiblesIni = 0;
        this.lifes = 0;
        this.dificultad = dificultad;
        //se la pasa al wordManager creado
        this.wordManager = new WordManager();

    }

    selectMode(tam) {   //metodo que selecciona la dificultad y la ajusta en funcion del tamanyo de la palabra
        let newthis = this;
        return new Promise(function (resolve, reject) {
            let m = Math.floor(newthis.dificultad);
            tam = Math.floor(tam);
            if (m === 0) {
                newthis.time = 30 * tam;
                newthis.letrasVisiblesIni = 0.7 * tam;
                newthis.lifes = 1.5 * tam;
            } else if (m === 1) {
                newthis.time = 20 * tam;
                newthis.letrasVisiblesIni = 0.5 * tam;
                newthis.lifes = 1.0 * tam;
            } else if (m === 2) {
                newthis.time = 10 * tam;
                newthis.letrasVisiblesIni = 0.4 * tam;
                newthis.lifes = 0.8 * tam;
            }
            newthis.letrasVisiblesIni = Math.trunc(newthis.letrasVisiblesIni);
            newthis.lifes = Math.trunc(newthis.lifes);
            newthis.time = Math.trunc(newthis.time);

            resolve();
        });
        //this.wordManager
    }

    

    decreaseTime() {
        if (this.time > 0) 
            this.time--;
        else
            return true;
        return false;

    }

    decreaseLife() {
        this.lifes--;
    }

    addLetraVisible(a) {
        this.letrasVisiblesIni += a;
    }

    comprobarFinPartida() {
        let i = 0;
        if (this.wordManager.checkGuessedWord() === true) {
            //Win!
            i = 1;
        } else if (this.lifes <= 0 || this.time <= 0) {
            //Lose!
            i = 2;
        }
        return i;
    }

    getWordManager() {
        return this.wordManager;
    }

    getVidas() {
        return this.lifes;
    }

    getTiempo() {
        return this.time;
    }

    getLetrasVisiblesIni() {
        return this.letrasVisiblesIni;
    }
}