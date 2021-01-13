import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updatedObject, checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',

                },
                value: '',
                rules: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',

                },
                value: '',
                rules: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls, {
            [controlName]: updatedObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].rules),
                touched: true
            })
        })

        this.setState({ controls: updatedControls })
    }

    submitHanlder = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }


    render() {

        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;

        if (this.props.isAuthenticated && !this.props.building) {
            authRedirect = <Redirect to='/' />
        }
        else if (this.props.isAuthenticated && this.props.building) {
            authRedirect = <Redirect to='/Checkout' />
        }

        let form = formElementsArray.map(formElement => {
            return (
                <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    Invalid={!formElement.config.valid}
                    validation={formElement.config.rules}
                    touched={formElement.config.touched}
                    clicked={(event) => this.inputChangedHandler(event, formElement.id)} />
            )
        })

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={(event) => this.submitHanlder(event)}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {!this.state.isSignUp ? "Sign Up" : "Sign In"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);