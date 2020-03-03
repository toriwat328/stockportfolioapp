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
import { BrowserRouter as Router } from 'react-router-dom';




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

            </div>
            </Router>
        </Provider>

      );
  }

}

export default App;
