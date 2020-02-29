import React, { Component } from 'react';
import{
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Col,
    Row
} from 'reactstrap';
import Portfolio from './portfolio';


class BuyForm extends Component {
    state = {
        symbol: '',
        qtyshares: null,
        currvalpershare: null,
        isBought: false
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        //get current share price from symbol
        //save to a variable and set currvalpershare to that variable

        const newStock = {
            symbol: this.state.symbol,
            qtyshares: this.state.qtyshares,
            currvalpershare: this.state.currvalpershare
        }



    }
    render(){
        return (
            <div>
            <Row>
                <Portfolio />
                    <Col sm={3} style={{'display': 'flex', 'align-content': 'center', 'flex-direction': 'column'}}>
                    <h4 className="mt-5">Cash - $5000.00</h4>
                    <Container >
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="symbol">Ticker Symbol</Label>
                                <Input
                                    type="text"
                                    name="symbol"
                                    id="symbol"
                                    placholder="Ticker"
                                    onChange={this.onChange}
                                />
                                <Label for="qtyshares">Number of Shares</Label>
                                <Input
                                    type="select"
                                    name="qtyshares"
                                    id="qtyshares"
                                    onChange={this.onChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </Input>
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Buy</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BuyForm;
