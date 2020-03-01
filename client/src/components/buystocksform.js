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
import { connect } from 'react-redux';
import { buyStocks } from '../actions/stockActions';
import PropTypes from 'prop-types';
require('dotenv').config()

const apikey = process.env.REACT_APP_IEXAPI;




class BuyForm extends Component {

    state = {
        qtyshares: null,
        currvalpershare: null,
        isBought: false,
        baseURL: 'https://cloud.iexapis.com/',
        version: 'stable/',
        endpoint: 'stock/',
        symbol: '',
        query: '/quote?token=' + apikey,
        searchURL: ''

    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        //get current share price from symbol
        //save to a variable and set currvalpershare to that variable



        this.setState({
            searchURL: this.state.baseURL + this.state.version + this.state.endpoint + this.state.symbol + this.state.query
        }, () => {
            console.log(this.state.searchURL)
            fetch(this.state.searchURL)
                .then(response => {
                    return response.json()
                }).then(json => this.setState({
                    currvalpershare: json.latestPrice
                }, () => {
                    const newStock = {
                        state: this.state.symbol,
                        qtyshares: this.state.qtyshares,
                        currvalpershare: this.state.currvalpershare
                    }

                    console.log(newStock);

                    // this.props.buyStocks(newStock);

                }),
                    err => console.log(err))
        })



        // const newStock = {
        //     symbol: this.state.symbol,
        //     qtyshares: this.state.qtyshares,
        //     currvalpershare: this.state.currvalpershare
        //
        // }
        //
        // this.props.buyStocks(newStock);
        //
        console.log(this.state.symbol);
        console.log(this.state.qtyshares);
        console.log(this.state.currvalpershare);

    }

    render(){
        return (
            <div>
            <Row>
                <Portfolio />
                    <Col sm={3} style={{display: 'flex', alignContent: 'center', 'flexDirection': 'column'}}>
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
                        <a href={this.state.searchURL}>{this.state.searchURL}</a>
                    </Container>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stock: state.stock
})


export default connect(mapStateToProps, { buyStocks })(BuyForm);
