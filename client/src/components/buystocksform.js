import React, { Component } from 'react';
import{
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Col
} from 'reactstrap';


class BuyForm extends Component {
    render(){
        return (
            <div>
                <Col sm={6}>
                <Container>
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
            </div>
        )
    }
}

export default BuyForm;
