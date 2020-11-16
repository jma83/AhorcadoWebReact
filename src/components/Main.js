import React, { Component } from 'react'

import FooterComponent from './FooterComponent'
import GameComponent from './GameComponent'
import HeaderComponent from './HeaderComponent';
import SelectionComponent from './SelectionComponent'


export default class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            startedGame: false,
            dificultad: 0,
            nombre: ""

        }
    }

    startGame = (startBool, dif) =>{
        this.setState({startedGame: startBool, dificultad:dif});
        
    }
    resetGame = () =>{
        this.setState({startedGame: false, dificultad:0});
        
    }

    render() {
        return (
            <div>
                <HeaderComponent/>
                <main className="container">
                    {this.state.startedGame === false ? <SelectionComponent start={this.startGame}/>:<GameComponent start={this.state.startGame} name={this.state.nombre} dificultad={this.state.dificultad} end={this.resetGame}/>}
                </main >
                <FooterComponent/>
            </div >
        )
    }
}
