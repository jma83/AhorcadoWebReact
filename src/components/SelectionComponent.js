import React, { Component } from 'react'

export default class SelectionComponent extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    startGameEvent(e) { //Al pulsar en alguno de los botones empieza el juego!

        let dificultad = e.target.dataset.dif;
        let nombre = document.getElementById("name").value;
        if (nombre!=="")
        this.$emit("start", { nombre, dificultad });

    }

    startGameEvent = (e) =>{
        e.preventDefault();
        this.props.start(true,e.target.dataset.dif);
    }

    render() {
        return (
            <div id="seleccionInicial" className="card p-4 m-4 bg-dark text-white">
                <h2 className="row p-2 justify-content-center">Bienvenid@! Introduce nombre y dificultad</h2>
                <form id="my-form">
                    <div className="row form-group mt-2 justify-content-center p-2">
                        <label htmlFor="name" className="col-12 col-md-2">Nombre:</label>
                        <input type="text" className="form-control col-8 col-md-4 bg-dark text-white" placeholder="Introduce nombre" aria-label="Nombre"
                            id="name" name="name" required />
                    </div>
                    <div className="row btn-group-toggle justify-content-center mt-4 p-2" role="group"
                        aria-label="Level of difficult">
                        <label htmlFor="dificultad" className="col-12 col-md-2">Dificultad:</label>
                        <button type="submit" onClick={(e) => this.startGameEvent(e)} className="btn btn-success col-md-3" id="easy" name="dificultad" data-dif="0">Fácil</button>
                        <button type="submit" onClick={(e) => this.startGameEvent(e)} className="btn btn-primary col-md-3" id="regular" name="dificultad" data-dif="1">Normal</button>
                        <button type="submit" onClick={(e) => this.startGameEvent(e)} className="btn btn-danger col-md-3" id="hard" name="dificultad" data-dif="2">Díficil</button>
                    </div>
                </form >
            </div >
        )
    }
}
