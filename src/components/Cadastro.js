import React, { Component } from 'react';
import db, { URL_COUCH_DB } from '../utils/pouchUtils';
import { ToastContainer, ToastStore } from 'react-toasts';
import $ from 'jquery';

class Cadastro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contato: this.contatoLimpo(),
            rotuloBotao: '',
            titulo: '',
            edicao: false
        };

        this.salvar = this.salvar.bind(this);
        this.aoAlterarValorDoCampo = this.aoAlterarValorDoCampo.bind(this);
    }

    salvar(evento) {
        evento.preventDefault();

        let contato = { ...this.state.contato };
        if (!this.state.edicao) contato._id = new Date().toISOString();

        db.put(contato, (erro, resposta) => {
            if (erro) {
                console.log(erro);
                ToastStore.error('Erro ao tentar salvar o contato', 2000, 'mensagem');
            }
            else {
                this.setState({ contato: this.contatoLimpo() });
                const mensagem = this.state.edicao ? 'Contato editado!' : 'Contato salvo!';
                ToastStore.success(mensagem, 2000, 'mensagem');
            }
        });

        db.sync(URL_COUCH_DB, { live: true, retry: true });
    }

    aoAlterarValorDoCampo(evento) {
        let campo = evento.target.name;
        let valor = evento.target.value;
        let contato = { ...this.state.contato };
        contato[campo] = valor;
        this.setState({ contato });
    }

    contatoLimpo() {
        return { _id: '', nome: '', telefone: '' };
    }

    componentDidMount() {
        const contato =
            this.props.location.state
                ? this.props.location.state.contato
                : this.contatoLimpo();
        const edicao = contato._id ? true : false;
        const rotuloBotao = contato._id ? 'Editar' : 'Salvar';
        const titulo = contato._id ? 'Editar contato' : 'Novo contato';
        this.setState({ contato, rotuloBotao, titulo, edicao });

        $('#telefone').mask('(00) 00000-0000', {
            placeholder: '(__) _____-____'
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>{this.state.titulo}</h3>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={this.salvar}>
                            <div className="form-group">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={this.state.contato.nome}
                                    onChange={this.aoAlterarValorDoCampo}
                                    required />
                            </div>
                            <div className="form-group">
                                <label>Telefone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telefone"
                                    name="telefone"
                                    value={this.state.contato.telefone}
                                    onChange={this.aoAlterarValorDoCampo}
                                    required />
                            </div>

                            <input
                                type="submit"
                                className="btn botaoCadastro"
                                value={this.state.rotuloBotao} />

                        </form>
                    </div>
                </div>

                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_CENTER} />
            </div>
        )
    }
}

export default Cadastro;
