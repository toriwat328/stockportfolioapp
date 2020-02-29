import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/navbar.js';
import BuyForm from './components/buystocksform.js';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render(){
      return (
         <Provider store={store}>
            <div className="App">
                <AppNavbar />
                <BuyForm />
            </div>
        </Provider>
      );
  }

}

export default App;
