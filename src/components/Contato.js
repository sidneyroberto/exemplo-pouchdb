import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faPencilAlt);
library.add(faTrash);

class Contato extends Component {

    pegarInicialNome(nome) {
        return nome ? nome.toUpperCase()[0] : '';
    }

    render() {
        return (
            <div className="painelContato">
                <ReactSwipe id="slider" swipeOptions={{ continuous: false }}>
                    <div>
                        <div className="inicialContato">
                            {this.pegarInicialNome(this.props.contato.nome)}
                        </div>
                        <div className="dadosContato">
                            <p>{this.props.contato.nome}</p>
                            <p>{this.props.contato.telefone}</p>
                        </div>
                    </div>
                    <div className="painelOpcoes">
                        <button onClick={() => this.props.funcaoRemocao(this.props.contato)} type="button" className="btn btn-link" data-toggle="modal" data-target={`#${this.props.idModalRemocao}`} >
                            <FontAwesomeIcon icon="trash" size="lg" />
                        </button>

                        <Link to={{ pathname: '/cadastro', state: { contato: this.props.contato } }}>
                            <FontAwesomeIcon icon="pencil-alt" size="lg" />
                        </Link>
                    </div>
                </ReactSwipe>
            </div>
        )
    }
}

export default Contato;