import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/navbar.js';
import BuyForm from './components/buystocksform.js';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {

  render(){
      return (
         <Router>
         <Provider store={store}>
            <div className="App">

                <AppNavbar />


            </div>
        </Provider>
        </Router>
      );
  }

}

export default App;
