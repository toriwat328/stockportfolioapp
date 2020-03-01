import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getStocks } from '../actions/stockActions';
import PropTypes from 'prop-types';


class Transactions extends Component {
    static propTypes = {
        getStocks: PropTypes.func.isRequired,
        stock: PropTypes.object.isRequired,
    }

    componentDidMount(){
        this.props.getStocks();


    }

    render(){
        const { stocks } = this.props.stock
        return (
            <Col sm={7}>
            <h2>Transactions</h2>
            <Container>
                <ListGroup>
                {stocks.map(({_id, symbol, qtyshares, currvalpershare, isBought})=> (
                    <ListGroupItem>
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
