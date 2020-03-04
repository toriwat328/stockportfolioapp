//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/navbar.js';
import JumbotronApp from './components/jumbotron.js';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Switch } from 'react-router-dom';
import Portfolio from './components/portfolio';
import Transactions from './components/transactions';
import PrivateRoute from './components/common/privateRoute';




class App extends Component {
//-----------------------------------
// RENDER
//-----------------------------------
  render(){

      return (

         <Provider store={store}>
         <Router>
            <div className="App">

                <AppNavbar />
                <JumbotronApp />
                <Switch>
                    <PrivateRoute exact path='/portfolio' component={Portfolio} />
                    <PrivateRoute exact path='/transactions' component={Transactions} />
                </Switch>
            </div>
            </Router>
        </Provider>

      );
  }

}

export default App;
