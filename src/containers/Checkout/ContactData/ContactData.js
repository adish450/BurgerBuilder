import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';


class ContactData extends Component {

    state = {
        ContactData: null,
        loading: false
    }

    contactHandler = () => {
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'adish',
                address: {
                    street: 'dasda',
                    zipCode: '1564532',
                    country: 'India'
                },
                email: 'random@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                // console.log(response)
                this.setState({ loading: false })
                this.props.history.replace("/")
            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false })
            })

    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="Street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                </form>
                <Button btnType="Success" clicked={this.contactHandler}>ORDER</Button>
            </div>
        )
    }
}

export default ContactData;