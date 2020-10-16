import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Form from './Form';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components'

const Navigation = styled.nav`
  display: flex;
  justify-content: space-around;
`

const NavLinks = styled.div`
  align-items: right;
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
`

const App = () => {

  
  const initialFormValues = {
    name: '',
    size: '',
    pepperoni: false,
    sausage: false,
    ham: false,
    bacon: false,
    special_instructions: ''

  }

  const initialFormErrors = {
    name: '',
    size: '',
    pepperoni: '',
    sausage: '',
    ham: '',
    bacon: '',
    special_instructions: ''
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [orders, setOrders] = useState([]);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);

  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(2,'Name must be at least 2 characters'),
    size: yup.string().oneOf(['small', 'medium', 'large'], 'Size is required'),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    ham: yup.boolean(),
    bacon: yup.boolean(),
    special_instructions: yup.boolean()
  });

  const change = (inputName, inputValue) => {
    yup.reach(formSchema, inputName).validate(inputValue)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [inputName]: ''
        })
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [inputName]: err.errors[0]
        })
      })
    setFormValues({
      ...formValues,
      [inputName]: inputValue
    })
  }


  const postNewUser = newOrder => {
    axios.post('https://reqres.in/api/users', newOrder)
      .then( res => {
        setOrders([res.data, 
          ...orders]);
        setFormValues(initialFormValues);
      })
      .catch( err => {
        console.log(err);
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

  useEffect(() => {
    formSchema.isValid(formValues)
      .then((valid) => {
        setDisabled(!valid);
      })
  }, [formValues])
  

  return (
    <div className="App">
      <Navigation>
        <h1>Lambda Eats</h1>
        <NavLinks>
        <Link to='/'><div>Home</div></Link>
        <Link to='/pizza'><div>Order</div></Link>
        </NavLinks>
      </Navigation>
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
        {orders.map(order => {
          return (
            <div>
              Hello
            </div>
          )
        })}
      </Route>
    </div>
  );
}

export default App;
