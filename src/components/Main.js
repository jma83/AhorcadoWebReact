import React, { Component } from 'react'

import FooterComponent from './FooterComponent'
import GameComponent from './GameComponent'
import HeaderComponent from './HeaderComponent';
import SelectionComponent from './SelectionComponent'

import GameManager from '../game/gameManager.js'


export default class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            gm: new GameManager(props.dificultad),
            startedGame: false,
            dificultad: 0,
            nombre: ""

        }
    }

    startGame = (startBool, dif) =>{
        this.setState({gm: new GameManager(dif)}) 
        this.setState({startedGame: startBool});
        
    }
    resetGame = () =>{
        this.setState({startedGame: false, dificultad:0});
        
    }

    render() {
        return (
            <div>
                <HeaderComponent/>
                <main className="container">
                    {this.state.startedGame === false ? <SelectionComponent start={this.startGame}/>:<GameComponent start={this.state.startGame} name={this.state.nombre} gm={this.state.gm} end={this.resetGame}/>}
                </main >
                <FooterComponent/>
            </div >
        )
    }
}
