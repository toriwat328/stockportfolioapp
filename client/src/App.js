import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/navbar.js';
import BuyForm from './components/buystocksform.js'


class App extends Component {

  render(){
      return (
        <div className="App">
            <AppNavbar />
            <BuyForm />
        </div>
      );
  }

}

export default App;
