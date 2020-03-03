//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getStocks } from '../actions/stockActions';
import PropTypes from 'prop-types';

//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------
class Transactions extends Component {
    static propTypes = {
        getStocks: PropTypes.func.isRequired,
        stock: PropTypes.object.isRequired,
    }

    componentDidMount(){

        this.props.getStocks();


    }
//-----------------------------------
// RENDER
//-----------------------------------

// GET STOCKS AND THEN LIST ALL STOCK VALUES -> IF ISBOUGHT IS TRUE 'BUY' WILL SHOW INSTEAD OF 'SELL'

    render(){

        const { stocks } = this.props.stock

        return (
            <Col sm={7}>
            <h2>Transactions</h2>
            <Container>
            <ListGroup>
            {stocks.map(({_id, symbol, qtyshares, currvalpershare, isBought})=> (
            <ListGroupItem key={_id}>
            { isBought ? 'BUY ' : 'SELL '}
                ({ symbol }) - {qtyshares} Shares @ ${currvalpershare}
            </ListGroupItem>
            ))}
            </ListGroup>
            </Container>
            </Col>
        )
    }
}

const mapStateToProps = (state) => ({
    stock: state.stock,
})

export default connect(mapStateToProps, { getStocks })(Transactions);
