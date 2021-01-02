import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    clickedCanelledHandler = () => {
        this.props.history.goBack();
    }

    clickedContinueHadler = () => {
        this.props.history.replace('/Chekout/contact-data');
    }

    componentWillMount() {
        let query = new URLSearchParams(this.props.location.search);

        let ingredients = {};
        let price = 0;
        for (let key of query.entries()) {
            // [salad : 1]
            if (key[0] === 'price') {
                price = +key[1];
                continue;
            }
            ingredients[key[0]] = +key[1];
        }

        this.setState({ ingredients: ingredients, price: price });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    clickedCancel={this.clickedCanelledHandler}
                    clickedContinue={this.clickedContinueHadler}
                />
                <Route to={this.props.match.url + '/contact-data'} render={(props) => (<ContactData {...this.props} ingredients={this.state.ingredients} price={this.state.price}></ContactData>)} />
            </div>
        )
    }
}

export default Checkout;