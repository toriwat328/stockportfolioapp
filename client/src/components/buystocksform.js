'buystocksform.js'
//-----------------------------------
//IMPORTS
//-----------------------------------
import React, { Component } from 'react';
import{
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Col,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { buyStocks } from '../actions/stockActions';
import { getUniqueStocks } from '../actions/uniqueActions';
import { loadUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions.js'
import PropTypes from 'prop-types';
require('dotenv').config()

const apikey = process.env.REACT_APP_IEXAPI;



//-----------------------------------
//COMPONENT STATE AND METHODS
//-----------------------------------
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
        searchURL: '',
        msg: null

    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps){
        const { error } = this.props;
        if(error !== prevProps.error){
            // CHECK IF ERROR IS A BUY STOCK FAIL, IF SO UPDATE MSG STATE TO CORRESPONDING ERROR
            if(error.id === 'BUY_STOCK_FAIL'){
                this.setState({ msg: error.msg.msg  });
            } else {
                this.setState({ msg: null })
            }
        }
    }



    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        const { error } = this.props;

        e.preventDefault();

        //CLEAR ANY ERRORS
        this.props.clearErrors();


        //CONCATENATE STATES TO CREATE SEARCH URL FOR FETCH ACCESS STOCK API
        this.setState({
            searchURL: this.state.baseURL + this.state.version + this.state.endpoint + this.state.symbol + this.state.query
        }, () => {

            fetch(this.state.searchURL)
                .then(response => {
                    //IF THE RESPONSE IS 200 JUST RETURN RESPONSE IN JSON
                    if(response.ok){
                        return response.json()
                    } else {
                        // IF NOT OKAY, THAT MEANS USER TYPED INVAILD SYMBOL, SO UPDATE MSG ACCORDINGLY TO BE DISPLAYED WHEN BUY IS SUBMITTED
                        this.setState({
                            msg: "Unknown symbol"
                        })

                        return;
                    }

                }).then(json => {
                        if(json){
                            // WHEN WE GET THE JSON DATA SET CURRENT PRICE STATE TO JSON LATEST PRICE
                            this.setState({
                                currvalpershare: json.latestPrice
                            }, () => {

                                    // CREATE AN OBJECT WITH ALL NEED PROPERTIES AND VALUES
                                    const newStock = {
                                        symbol: this.state.symbol,
                                        qtyshares: this.state.qtyshares,
                                        currvalpershare: this.state.currvalpershare
                                    }

                                    // BUY THE STOCK
                                    this.props.buyStocks(newStock);

                                    // RESET FORM TO CLEAR VALUES
                                    this.setState({
                                        symbol: '',
                                        qtyshares: '',
                                        currvalpershare: null
                                    })

                                    // GET UNIQUE STOCK WITH THE NEW STOCK ADDED
                                    this.props.getUniqueStocks()

                                    this.props.loadUser()

                                })
                        }else {
                            return;
                        }


                })
                .catch(err => console.log(err))
                })

                console.log(error);

        }

    //-----------------------------------
    // RENDER
    //-----------------------------------

    // BROUGHT IN ACCOUNT BALANCE FROM AUTH USER TO BE DISPLAYED -> ACCOUNT BALANCE NOT UPDATING WHEN BUY IS MADE -> WOULD NEED TO CREATE A STATE FOR ACCOUNT BALANCE AND UPDATE THE STATE WHEN BUY HAPPENS TO UPDATE ACCOUNT BALANCE DYNAMICALLY?
    render(){
        return (
            <div>
                <Col sm={12} style={{display: 'flex', alignContent: 'center', 'flexDirection': 'column', margin: '0 auto'}}>
                <h4 className="mt-5 mb-3">Cash - ${Math.floor(this.props.auth.user.accbalance)}</h4>
                <Container >
                    { this.state.msg ? (<Alert color="danger">{ this.state.msg }</Alert>) : null }
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="symbol">Ticker Symbol</Label>
                            <Input
                                type="text"
                                name="symbol"
                                id="symbol"
                                className="mb-3"
                                placeholder="ex. AAPL"
                                value={this.state.symbol}
                                onChange={this.onChange}
                            />
                            <Label for="qtyshares">Number of Shares</Label>
                            <Input
                                type="select"
                                name="qtyshares"
                                id="qtyshares"
                                className="mb-3"
                                value={this.state.qtyshares}
                                onChange={this.onChange}>
                                <option>Choose Quantity</option>
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

const mapStateToProps = (state) => ({
    stock: state.stock,
    auth: state.auth,
    error: state.error
})


export default connect(mapStateToProps, { buyStocks, getUniqueStocks, clearErrors, loadUser })(BuyForm);
