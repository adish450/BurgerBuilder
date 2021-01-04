import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',

                },
                value: '',
                rules: {
                    required: true,
                    minLength: 1,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',


                },
                value: '',
                rules: {
                    required: true,
                    minLength: 1,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',

                },
                value: '',
                rules: {
                    required: true,
                    minLength: 1,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',

                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',

                },
                value: '',
                rules: {
                    required: true,
                    minLength: 1,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    validator(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderForm: formData
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

    onChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };

        const updatedFormElement = {
            ...this.state.orderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        updatedFormElement.valid = this.validator(updatedFormElement.value, updatedFormElement.rules)
        updatedFormElement.touched = true;
        this.setState({ orderForm: updatedOrderForm });

    }
    render() {

        let formData = [];

        for (let key in this.state.orderForm) {
            formData.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {formData.map(ig => (
                    <Input
                        key={ig.id}
                        elementType={ig.config.elementType}
                        elementConfig={ig.config.elementConfig}
                        value={ig.config.value}
                        Invalid={!ig.config.valid}
                        validation={ig.config.rules}
                        touched={ig.config.touched}
                        clicked={(props) => this.onChangeHandler(props, ig.id)} />
                ))}
                <Button btnType="Success" >ORDER</Button>
            </form>
        )

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;