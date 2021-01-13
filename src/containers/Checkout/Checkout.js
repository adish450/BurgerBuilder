import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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

        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    clickedCancel={this.clickedCanelledHandler}
                    clickedContinue={this.clickedContinueHadler}
                />
                <Route to={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);