import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                let Orders = [];
                for (let key in response.data) {
                    Orders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log(response.data)
                this.setState({ loading: false, orders: Orders })
            }).catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);