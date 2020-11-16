import React, { Component } from 'react'
import GameManager from '../game/gameManager.js'

export default class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gm: new GameManager(props.dificultad),
            arrayLetras: [],
            valorInput: "",
            estadoPartida: 0,
            msgCabecera: "Encuentra la palabra oculta!",
            descripcion: "Bienvenido! Escribe una letra para empezar. \nOJO! Hay tiempo limte!",
            timerId: "",
            tiempo: 100
        }

    }

    componentDidMount = async () => {
        await this.state.gm.getWordManager().getWords()   //obtenemos las palabras y seleccionamos 1
            .then(() => this.state.gm.selectMode(this.state.gm.getWordManager().getTamanyoPalabra())    //seleccionamos el modo a partir de la dificultad y el tamanyo de palabra
                .then(() => this.state.gm.getWordManager().mostrarLetrasRandom(this.state.gm.getLetrasVisiblesIni())    //mostrar numero de letras asociadas a la palabra
                    .then(() => {
                        this.actualizarArrayLetras();   //actualizamos el array de letras asociado a la vista
                        this.setState({tiempo: this.state.gm.getTiempo()})
                        this.startTime();   //empieza el temporizador
                    }).catch((e) => {
                        alert("Algo ha ido mal! " + e);
                    })
                ));

        console.log(this.state.arrayLetras)
    }

    componentWillUnmount (){
        this.stopTime(false);
    }

    comprobarLetraEnviada = () => {   //metodo encargado de enviar la letra seleccionada por el usuario y comprobar si coincide
        
        if (this.state.estadoPartida === 0) {
            let res = this.state.gm.getWordManager().comprobarLetraEnviada(this.state.valorInput);
            this.resetValor();
            if (res > 0) {
                this.setState({descripcion: <span className="text-success">Letra '{this.state.valorInput}' encontrada!</span>});
                this.state.gm.addLetraVisible(res);
            } else if (res === -1) {
                this.setState({descripcion: <span className="text-danger">Esa letra ya está visible!</span>});
            } else {
                this.setState({descripcion: <span className="text-danger">Vaya! Letra '{this.state.valorInput}' no encontrada! <br/> Has perdido una vida!</span>});
                this.state.gm.decreaseLife();
            }
            this.comprobarFinPartida();
            this.actualizarArrayLetras();

        }
    }
    comprobarFinPartida = () => { //metodo encargado de comprobar si se gana o pierde
        console.log("HOLA???")
        let res = this.state.gm.comprobarFinPartida();
        console.log("resultado" + res)
        if (res === 1) {
            console.log("deberia ganar!!!")
            
            this.setState({descripcion: <div>FIN DE LA PARTIDA! {this.state.descripcion} </div>,msgCabecera:"HAS GANADO! :D"});
            this.stopTime(false);
        } else if (res === 2) {
            console.log("deberia perder!!!")

            this.setState({descripcion: <div>FIN DE LA PARTIDA! {this.state.descripcion} </div>,msgCabecera:"HAS PERDIDO... :("});
            this.stopTime(false);
        }
        this.setState({estadoPartida: res});

    }
    endGameEvent = () => {
        this.props.end();
    }
    actualizarArrayLetras = () => {
        this.setState({ arrayLetras: this.state.gm.getWordManager().getLetrasVisibles() });
    }
    getArrayLetras = () => {
        return this.state.arrayLetras;
    }
    getLetrasTotales = () => {
        return this.state.arrayLetras.length;
    }
    getLetrasVisibles = () => {
        return this.state.gm.getLetrasVisiblesIni();
    }
    getVidas = () => {
        return this.state.gm.getVidas();
    }
    getTiempo = () => {
        return this.state.tiempo;
    }
    startTime = () => {
        let fun = setInterval((function (self) {
            return function () {
                self.setState({tiempo:self.state.gm.getTiempo()});
                if (self.state.gm.decreaseTime())
                    self.stopTime(true)
            }
        })(this), 1000);
        this.setState({timerId: fun}); 
    }

    stopTime = (a) => {
        clearInterval(this.state.timerId);
        if (a === true)
            this.comprobarFinPartida()
    }

    getElementosLista1 = () => {
        return this.getArrayLetras().map((letra,index) => {
            
            return <li className="list-group-item col col-lg-1 bg-secondary h3 align-self-center palabraFin" key={index}>{letra}</li>
        })
    }

    getElementosLista2 = () => {

        return this.getArrayLetras().map((letra,index) => {
            return <li className="list-group-item col col-lg-1 bg-info h3 d-block d-sm-none" key={index}>{letra}</li>
        })
    }

    actualizarValor = (e) => {
        this.setState({valorInput: e.target.value})
    }

    resetValor = () => {
        this.setState({valorInput: ""});
    }


    render() {
        return (
            <div id="game" className="card p-4 m-4 bg-dark text-white">
                <h2 className="row p-2 justify-content-center">{this.state.msgCabecera}</h2>

                <div className="row justify-content-center">
                    <img src="./img/ahorcado.gif" alt="ahorcado" className=" col-sm-7 col-md-2 d-none d-sm-block" />
                    <ul className="list-group list-group-horizontal-sm text-center col-3 col-sm-8 justify-content-center">
                        {this.getElementosLista1()}
                    </ul>
                    <ul className="list-group list-group-horizontal-sm text-center col-2 col-sm-8 fixed-bottom d-block d-sm-none mb-5 ml-2">
                        {this.getElementosLista2()}
                    </ul>
                </div>
                <div className="row justify-content-around">
                    <div className="card col-10 col-md-4 bg-dark align-self-start">
                        <div className="card-body bg-dark">
                            <h5 className="card-title">Nombre: {this.props.name}</h5>
                            <ul className="list-group list-group-flush ">
                                <li className="list-group-item bg-dark"><button type="button" className="btn btn-danger" >
                                    Vidas <span className="badge badge-light">{this.getVidas()}</span>
                                </button></li>
                                <li className="list-group-item bg-dark"><button type="button" className="btn btn-warning" >
                                    Tiempo <span className="badge badge-light">{this.getTiempo()}</span>
                                </button></li>
                                <li className="list-group-item bg-dark"><button type="button" className="btn btn-success" >
                                    Visibles <span className="badge badge-light">{this.getLetrasVisibles()}/{this.getLetrasTotales()}</span>
                                </button></li>
                            </ul>
                        </div>
                    </div>
                    <form className="col-10 col-md-3 mt-2 p-2 align-self-start" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name" >Siguiente letra: </label>
                            <input type="text" className="form-control bg-dark text-white" onChange={(e) => this.actualizarValor(e)} placeholder="Introduce letra" aria-label="Letra"
                                id="letra" name="letra" maxLength="1" value={this.state.valorInput}/>
                        </div>
                        <button type="submit" onClick={this.comprobarLetraEnviada} className="btn btn-primary">Enviar</button>
                    </form>
                    <div className="alert alert-primary col-10 col-md-10 col-lg-3 align-self-start" role="alert">
                        {this.state.descripcion}
                    </div>
                </div>
                <div className="row justify-content-end">
                    <button type="input" onClick={this.endGameEvent} className="btn btn-warning col-4 col-md-2 mr-5 " id="hard" name="dificultad" data-dif="2">Volver</button>
                </div>
            </div>
        )
    }
}
