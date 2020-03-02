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
        open: '',
        done: false


    }

    static propTypes = {
        getStocks: PropTypes.func.isRequired,
        stock: PropTypes.object.isRequired
    }

    componentDidMount(){

            this.props.getStocks();




    }


    makeUnique = (stocks) => {

        const uniqueSymbols = {};
        // //create empty object variables
        // //loop through stocks array if symbol is already in new obj, then add qty to symbol value, otherwise add symbol with 0 as value
        for(let i = 0; i <= stocks.stocks.length-1; i++){
            let symbol = stocks.stocks[i].symbol
            if(!uniqueSymbols[symbol]){
                uniqueSymbols[symbol] = {};
                uniqueSymbols[symbol].shares = stocks.stocks[i].qtyshares;
                fetch('https://cloud.iexapis.com/stable/stock/' + symbol + '/quote?token=' + apikey)
                        .then(response => {
                            return response.json()
                        }).then(json => {
                                console.log(json);
                                uniqueSymbols[symbol].latestPrice = json.latestPrice;
                                uniqueSymbols[symbol].open = json.open;

                        }).catch(err => console.log(err))
            }else {
                uniqueSymbols[symbol].shares += stocks.stocks[i].qtyshares;
            }
        }



    console.log(uniqueSymbols);


    uniqueSymbols['done'] = true;
    return uniqueSymbols;

    }

    runFunction = async () => {
        try {
            let uniqueTicker = await this.makeUnique(this.props.stock)

            if(uniqueTicker['done']){
                console.log(uniqueTicker);
                return uniqueTicker;
            }
        }
        catch (err){

            console.log('error', err);

        }

    }

    render(){

        let uniqueTicker  = this.runFunction();

        console.log(uniqueTicker);




        return (


            <Row>
            <Col sm={7}>
            <h2>Portfolio ($5943.34)</h2>
            <Container
                style={{borderRight: '.5px solid grey', height: '700px'}}>
                <ListGroup>
                {Object.keys(uniqueTicker).map((symbol, i)=> (
                    <ListGroupItem key={i}>
                        { symbol } - {uniqueTicker[symbol].shares} Shares {uniqueTicker[symbol].latestPrice}
                    </ListGroupItem>
                ))}
                </ListGroup>

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
