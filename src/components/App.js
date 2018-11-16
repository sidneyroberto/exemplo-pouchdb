import React, { Component } from 'react';
import './App.css';
import Consulta from './Consulta';
import Cadastro from './Cadastro';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
library.add(faListUl);
library.add(faPlusSquare);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="banner">
            <h1>AgendaOff</h1>
          </div>

          <div className="conteudo">
            <Switch>
              <Route path="/contatos" component={Consulta} />
              <Route path="/cadastro" component={Cadastro} />
              <Redirect from="/*" to="/contatos" />
            </Switch>
          </div>

          <div className="rodape">
            <Link to="/contatos">
              <FontAwesomeIcon icon="list-ul" />
            </Link>
            <Link to="/cadastro">
              <FontAwesomeIcon icon="plus-square" />
            </Link>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
