import React, { Component } from 'react'

export default class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer navbar-dark bg-dark p-4 fixed">
                <div className="container">
                    <span className="text-muted">Javier Martinez Arias - Práctica 2 (React): Tecnologías del lado del cliente - UPSA</span>
                </div>
            </footer>
        )
    }
}
