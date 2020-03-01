import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Col, Row } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getStocks } from '../actions/stockActions';
import PropTypes from 'prop-types';
import BuyForm from './buystocksform';


class Portfolio extends Component {
    static propTypes = {
        getStocks: PropTypes.func.isRequired,
        stock: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getStocks();






    }

    makeUnique = (stocks) => {
        //create empty object variables
        let uniqueSymbols = {};

        // stocks.map(({symbol, qtyshares})=> {
        //     if(uniqueSymbols[symbol]){
        //         uniqueSymbols[symbol] += qtyshares
        //     }else {
        //         uniqueSymbols[symbol] = qtyshares
        //     }
        //     return uniqueSymbols;
        // });


        for(let i = 0; i <= stocks.stocks.length-1; i++){
            if(uniqueSymbols[stocks.stocks[i].symbol]){
                console.log(uniqueSymbols[stocks.stocks[i].symbol]);
                uniqueSymbols[stocks.stocks[i].symbol] += stocks.stocks[i].qtyshares
            }else {
                console.log(uniqueSymbols[stocks.stocks[i].symbol]);
                uniqueSymbols[stocks.stocks[i].symbol] = stocks.stocks[i].qtyshares
            }
        }

        return uniqueSymbols;

        //loop through stocks array if symbol is already in new obj, then add qty to symbol value, otherwise add symbol with 0 as value
    }




    render(){
        const { stocks } = this.props.stock;
        console.log(this.makeUnique({ stocks }));
        return (
            <Row>
            <Col sm={7}>
            <h2>Portfolio ($5943.34)</h2>
            <Container
                style={{borderRight: '.5px solid grey', height: '700px'}}>
                <ListGroup>
                {stocks.map(({_id, symbol, qtyshares})=> (
                    <ListGroupItem>
                        { symbol } - {qtyshares} Shares $5000
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
