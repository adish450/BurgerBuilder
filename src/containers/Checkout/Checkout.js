import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1,
        }
    }

    clickedCanelledHandler = () => {
        this.props.history.goBack();
    }

    clickedContinueHadler = () => {
        this.props.history.replace('/Chekout/contact-data');
    }

    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);

        let ingredients = {};

        for (let key of query.entries()) {
            // [salad : 1]
            console.log(key);
            ingredients[key[0]] = +key[1];
        }

        this.setState({ ingredients: ingredients })
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    clickedCancel={this.clickedCanelledHandler}
                    clickedContinue={this.clickedContinueHadler}
                />
                <Route to={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;