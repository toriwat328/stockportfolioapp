import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class Transactions extends Component {
    render(){
        return (
            <Col sm={7}>
            <h2>Transactions</h2>
            <Container>
                <ListGroup>
                    <ListGroupItem>
                        AAPL
                    </ListGroupItem>
                    <ListGroupItem>
                        AAPL
                    </ListGroupItem>
                    <ListGroupItem>
                        AAPL
                    </ListGroupItem>
                    <ListGroupItem>
                        AAPL
                    </ListGroupItem>
                </ListGroup>
            </Container>
            </Col>
        )
    }
}

export default Transactions;
