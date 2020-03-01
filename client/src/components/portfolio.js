import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class Portfolio extends Component {
    render(){
        return (
            <Col sm={7}>
            <h2>Portfolio ($5943.34)</h2>
            <Container
                style={{borderRight: '1px solid black', height: '700px'}}>
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

export default Portfolio;
