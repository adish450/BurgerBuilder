import React from 'react';
import classes from './Order.css';

const Order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        //{salad : 1}
        ingredients.push({
            ingredient: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const displayIngredients = ingredients.map(ig => {
        return (<span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} key={ig.ingredient}>{ig.ingredient} {ig.amount}</span>)
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {displayIngredients}</p>
            <p>Price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}


export default Order;