import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'
import Form from './Form'

const App = () => {

  const initialFormValues = {
    name: '',
    size: '',
    pepperoni: '',
    sausage: '',
    ham: '',
    bacon: '',
    special_instructions: ''

  }

  const initialFormErrors = {
    name: '',
    size: ''
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [orders, setOrders] = useState([]);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);

  const change = (inputName, inputValue) => {

    setFormValues({
      ...formValues,
      [inputName]: inputValue
    })
  }

  const submit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: ['pepperoni', 'ham', 'sausage', 'bacon'].filter( topping => {
        formValues(topping);
      }),
      special_instructions: formValues.special_instructions.trim()
    }
    postNewUser(newOrder);
  }

  return (
    <div className="App">
      <h1>Lambda Eats</h1>
      <nav>
        <Link to='/'><div>Home</div></Link>
        <Link to='/pizza'><div>Order</div></Link>
      </nav>
      <Route exact path='/'>

      </Route>
      <Route path='/pizza'>
        <Form 
        values={formValues}
        change={change}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
        />
      </Route>
    </div>
  );
}

export default App;
