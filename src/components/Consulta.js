import React, { Component } from 'react';
import db, { URL_COUCH_DB } from '../utils/pouchUtils';
import Contato from './Contato';

import { ToastContainer, ToastStore } from 'react-toasts';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusSquare);

class Consulta extends Component {

    constructor() {
        super();

        this.state = {
            contatos: [],
            contatoSelecionado: null,
            nome: ''
        };

        this.aoSelecionarContato = this.aoSelecionarContato.bind(this);
        this.recuperarContatos = this.recuperarContatos.bind(this);
        this.remover = this.remover.bind(this);
    }

    remover() {
        db.remove(this.state.contatoSelecionado);
        this.recuperarContatos();
        ToastStore.success('Contato removido', 2000, 'mensagem');
    }

    aoSelecionarContato(contatoSelecionado) {
        this.setState({ contatoSelecionado, nome: contatoSelecionado.nome });
    }

    componentDidMount() {
        this.recuperarContatos();
    }

    recuperarContatos() {
        db.sync(URL_COUCH_DB, { live: true, retry: true });
        db.find({ selector: { nome: { $gte: null } }, sort: ['nome'] }, (erro, resposta) => {
            if (erro) console.log(erro);
            else this.setState({ contatos: resposta.docs });
        });
    }

    render() {

        const listaContatos = this.state.contatos.map(contato => {
            return (
                <div key={contato._id}>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <Contato
                                contato={contato}
                                idModalRemocao="modalRemocao"
                                funcaoRemocao={this.aoSelecionarContato} />
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div className="container" >

                {
                    (this.state.contatos.length === 0) &&
                    <div className="mensagemListaVazia">
                        <p>Nenhum contato cadastrado!</p>
                        <p>Clique no botão <FontAwesomeIcon icon="plus-square" /> para cadastrar um novo contato.</p>
                    </div>
                }

                {
                    (this.state.contatos.length > 0) &&
                    listaContatos
                }

                <div className="modal" id="modalRemocao">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Remover contato</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                Deseja realmente remover o contato "{this.state.nome}"?
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={this.remover} data-dismiss="modal">Remover</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>

                        </div>
                    </div>
                </div>

                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_CENTER} />
            </div>
        )
    }
}

export default Consulta;
