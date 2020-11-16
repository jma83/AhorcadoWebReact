//guarda las letras de la palabra y gestiona para mostrarlo en el front
export default class LetterManager {
    constructor() {
        this.letter = "A";
    }

    setLetter(a){
        this.letter = a;
    }
    
    getLetter(){
        return this.letter;
    }

    comprobarLetra(a){
        if (a===this.letter){
            return true;
        }
        return false;
    }


}