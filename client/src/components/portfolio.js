//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getUniqueStocks } from '../actions/uniqueActions';
import PropTypes from 'prop-types';
import BuyForm from './buystocksform';
require('dotenv').config()

const apikey = process.env.REACT_APP_IEXAPI;

//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------
class Portfolio extends Component {
    state = {
        baseURL: 'https://cloud.iexapis.com/',
        version: 'stable/',
        endpoint: 'stock/',
        symbol: '',
        query: '/quote?token=' + apikey,
        searchURL: '',
        latestPrice: '',
        open: '',
        done: false


    }

    static propTypes = {
        getUniqueStocks: PropTypes.func.isRequired,
        uniqueStock: PropTypes.object.isRequired,
    }

    componentDidMount(){

        this.props.getUniqueStocks()

    }

    // FUNCTION TO CALCULATE WHAT COLOR SYMBOL AND CURRENT PRICE NEEDS TO BE IF LESS THAN 0, RED, GREATER THAN ?, GREEN, 0 ? WONT RENDER ANY COLOR
    isNegative = (num) => {
        if(num >= 1){
            return true;
        }else if(num < 0){
            return false;
        }
    }
//-----------------------------------
// RENDER
//-----------------------------------
    render(){
        const uniqueStocks = this.props.uniqueStock.uniqueStock;

        // CALCULATE PORTFOLIO TOTAL BY ITERATING THROUGH UNIQUE STOCKS AND ADDING CURRENT VALUE
        const portfolioTotal = () => {
            let counter = 0;
            for(let symbol in uniqueStocks){
                counter += uniqueStocks[symbol].latestPrice * uniqueStocks[symbol].shares
            }

            return Math.floor(counter);
        }



        return (


            <Row>
            <Col sm={7} className="ml-3">
            <h2>Portfolio { '($' + portfolioTotal() + ')' }</h2>
            <Container
                style={{borderRight: '.5px solid grey', height: '700px', margin: '0 auto'}}>
                <ListGroup>
                {uniqueStocks ?
                    Object.keys(uniqueStocks).map((symbol, i)=> (
                        <ListGroupItem key={i}>
                            <h5 style={ this.isNegative(uniqueStocks[symbol].diff) ? {color: 'green'} : {color: 'red'}} >{ symbol }</h5> - {uniqueStocks[symbol].shares} Shares @ ${Math.floor(uniqueStocks[symbol].latestPrice * uniqueStocks[symbol].shares)} <br/>
                            <span>Current Price: <strong style={ this.isNegative(uniqueStocks[symbol].diff) ? {color: 'green'} : {color: 'red'}}>${uniqueStocks[symbol].latestPrice }</strong></span>
                        </ListGroupItem>
                    )) : 'See your stock portfolio in one place! Buy Stocks Now!'}
                </ListGroup>


            </Container>
            </Col>
            <BuyForm />
            </Row>

        )
    }
}

const mapStateToProps = (state) => ({
    uniqueStock: state.uniqueStock
});

export default connect(mapStateToProps, { getUniqueStocks })(Portfolio);
