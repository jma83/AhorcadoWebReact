import React, { Component } from 'react'

export default class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="index.html">
                        <img src="./img/logo.png" width="54" height="54" className="d-inline-block align-top float-left mr-2"
                            alt="logo-tres-en-linea" />
                        <h1 className="float-left">El Ahorcado Web!</h1>
                    </a>
                </nav>
            </header>
        )
    }
}
