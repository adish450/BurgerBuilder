import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {


    clickedCanelledHandler = () => {
        this.props.history.goBack();
    }

    clickedContinueHadler = () => {
        this.props.history.replace('/Chekout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    clickedCancel={this.clickedCanelledHandler}
                    clickedContinue={this.clickedContinueHadler}
                />
                <Route to={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);