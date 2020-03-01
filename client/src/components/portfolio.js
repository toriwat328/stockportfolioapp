import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Col, Row } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getStocks } from '../actions/stockActions';
import PropTypes from 'prop-types';
import BuyForm from './buystocksform';
require('dotenv').config()

const apikey = process.env.REACT_APP_IEXAPI;


class Portfolio extends Component {
    state = {
        baseURL: 'https://cloud.iexapis.com/',
        version: 'stable/',
        endpoint: 'stock/',
        symbol: [],
        query: '/quote?token=' + apikey,
        searchURL: '',
        latestPrice: '',
        open: ''

    }

    static propTypes = {
        getStocks: PropTypes.func.isRequired,
        stock: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getStocks();




    }

    // componentDidUpdate(){
    //
    //     console.log(this.makeUnique(this.props.stock));
    //
    // }





    makeUnique = (stocks) => {




        const uniqueSymbols = {};
        // //create empty object variables
        // //loop through stocks array if symbol is already in new obj, then add qty to symbol value, otherwise add symbol with 0 as value
        for(let i = 0; i <= stocks.stocks.length-1; i++){
            if(!uniqueSymbols[stocks.stocks[i].symbol]){
                uniqueSymbols[stocks.stocks[i].symbol] = {};
                uniqueSymbols[stocks.stocks[i].symbol].shares = stocks.stocks[i].qtyshares;

            }else {
                uniqueSymbols[stocks.stocks[i].symbol].shares += stocks.stocks[i].qtyshares

            }


        }

        for(let symbols in uniqueSymbols){
            console.log(symbols);
            if(!uniqueSymbols[symbols].latestPrice){
                    fetch('https://cloud.iexapis.com/stable/stock/' + symbols + '/quote?token=' + apikey)
                            .then(response => {
                                return response.json()
                            }).then(json => {
                                 uniqueSymbols[symbols].latestPrice = json.latestPrice;
                                 uniqueSymbols[symbols].open = json.open;
                            }).catch(err => console.log(err))
            }
        }

        console.log(this.state.latestPrice);

        return uniqueSymbols;

    }






    render(){
        const { stocks } = this.props.stock;
        console.log(this.props.stock);
        console.log(this.makeUnique(this.props.stock));

        return (
            <Row>
            <Col sm={7}>
            <h2>Portfolio ($5943.34)</h2>
            <Container
                style={{borderRight: '.5px solid grey', height: '700px'}}>
            </Container>
            </Col>
            <BuyForm />
            </Row>
        )
    }
}

const mapStateToProps = (state) => ({
    stock: state.stock
});

export default connect(mapStateToProps, { getStocks })(Portfolio);
