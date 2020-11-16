//selecciona y guarda una palabra de la lista, en base a lo indicado por gameManager (que tiene todos los settigns de usuario)
//compruba si los inputs de usuario coinciden con alguna letra de la palabra oculta
//muestra u oculta las letras de la palabra en cuestion -> llamando al letter manager (que controla cada casilla y letra en su posicion)
//le diche al gameManager si se ha acabado la partida (victoria o derrota)
import LetterManager from './letterManager.js'
//controla si se gana o pierde
//la dificultad
//llama al gestor de palabras
export default class WordManager {
    constructor() {
        //crea un wordManager
        this.palabras = [];
        this.arrayObjLetras = [];
        this.arrayLetrasVisibles = [];
        this.tamanyoPalabra = 0;
    }

    checkGuessedWord() {
        return !this.arrayLetrasVisibles.includes("_", 0, this.arrayLetrasVisibles.length);
    }

    seleccionarPalabra() {  // Metodo que selecciona una palabra de la lista
        const a = Math.floor(Math.random() * (this.palabras.length));
        let palabra = this.palabras[a].word;
        console.log(palabra);
        let i = 0;
        for (i = 0; i < palabra.length; i++) {
            this.arrayObjLetras.push(new LetterManager());
            this.arrayObjLetras[i].setLetter(palabra.charAt(i));
            this.arrayLetrasVisibles.push("_");
        }
        this.tamanyoPalabra = i;
        this.palabras = [];
    }

    mostrarLetrasRandom(tam) {  // Metodo que muestra inicialmente el numero de letras especificado por parametro
        let newthis = this;
        let arrayLettrasRandom = [];
        let posicionRandom = -1;
        let arrayPosicionesOk = [];
        return new Promise(function (resolve, reject) {
            let cont = 0;
            let contaux = 0;
            let exit = 0;
            let letra = "";
            while (cont !== tam && exit < tam * 2) {   //condicion de salida extra por si no encuentra otra letra que encaje con el numero solicitado
                contaux = cont;
                posicionRandom = newthis.encontrarLetraDistinta(arrayLettrasRandom);    //busco una letra que no este ya marcada
                letra = newthis.arrayObjLetras[posicionRandom].getLetter();
                arrayLettrasRandom.push(letra); //una vez encontrado la guardo en la lista
                for (let j = 0; j < newthis.arrayLetrasVisibles.length; j++) {  //busco el numero de ocurrencias de esa letra en la palabra
                    if (newthis.arrayObjLetras[j].getLetter() === letra.toLowerCase()) {
                        cont++;
                        arrayPosicionesOk.push(j);
                    }
                }

                if (cont > tam) {   //si el numero de ocurrencias es superior reinicio el contador y busco otra letra
                    console.log("la letra:" + letra + " esta varias veces!!! " + cont)
                    cont = contaux;
                } else {  //si el numero de ocurrencias es inferior o igual lo recorro y cambio para mostrarlo
                    for (let k = 0; k < (cont); k++) {
                        let indice = arrayPosicionesOk[k];
                        newthis.arrayLetrasVisibles[indice] = newthis.arrayObjLetras[indice].getLetter();
                    }
                }
                exit++;
            }
            resolve();
        });
    }

    encontrarLetraDistinta(p) { // Metodo que busca una letra aleatoria dentro de la palabra que noo este ya en la lista recibida por parametro
        let posicionRandom = -1;
        let exit = 0;
        do {
            posicionRandom = Math.floor(Math.random() * (this.arrayLetrasVisibles.length));
            exit++;
        } while (p.includes(this.arrayObjLetras[posicionRandom].getLetter()) && exit <= this.arrayLetrasVisibles.length * 2);

        return posicionRandom;
    }

    getWords() {    // Metodo que obtiene las palabras de un json y se guarda una de ellas aleatoriamiente
        let newthis = this;
        return new Promise(function (resolve, reject) {

            newthis.readWords().then((data) => {
                    newthis.palabras = data.wordList
                }).then(() => {
                    newthis.seleccionarPalabra()
                }).then(() => {
                    resolve()
                }).catch((e) => {
                    console.log(e)
                    reject(e)
                });

        });
    }

    comprobarLetraEnviada(a) {  // Metodo que comprueba si la letra enviada 
        let cont = 0;
        for (let j = 0; j < this.arrayLetrasVisibles.length; j++) {  //busco el numero de ocurrencias de esa letra en la palabra
            if (this.arrayObjLetras[j].getLetter() === a.toLowerCase()) {
                if (this.arrayLetrasVisibles[j] !== a) {
                    this.arrayLetrasVisibles[j] = this.arrayObjLetras[j].getLetter();
                    cont++;     //cuento el numero de ocurrencias
                } else {
                    cont = -1;    //si ya esta devuelvo -1
                    break;
                }
            }
        }
        return cont;
    }

    getArrayLetras() {
        return this.arrayObjLetras;
    }

    getLetrasVisibles() {
        return this.arrayLetrasVisibles;
    }

    getTamanyoPalabra() {
        return this.tamanyoPalabra;
    }

    readWords() {
        return new Promise(function (resolve, reject) {

            const words = require('../data/words.json');
            resolve(words);
        });
        
    }

}