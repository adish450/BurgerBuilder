import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {


    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/Checkout" component={Checkout} />
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route render={() => <h1>Route not found</h1>} />
                    </Switch>
                </Layout>
            </div>


        );
    }
}

export default App;