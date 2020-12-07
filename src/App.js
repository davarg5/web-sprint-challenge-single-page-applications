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

const Box = styled.div`
  border: 1px solid black;
  padding-right: 7%;
  text-decoration: none;
`

const HomeDiv = styled.div`
  text-align: center;
`

const ImageApp = styled.img`
  margin: auto;
`

const Container = styled.div`
  border: 1px solid rgb(210, 210, 210);
  border-radius: 6px;
  box-shadow: 0px 1px 6px -2px rgb(128, 127, 127);
  margin: 16px 8px;
  padding: 16px;
  background-color: white;
`

const AppScreen = styled.div`
  background-color: lightgray;
  border: 10px solid black;
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
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  console.log(disabled)

  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(2,'Name must be at least 2 characters'),
    size: yup.string().oneOf(['small', 'medium', 'large'], 'Size is required'),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    ham: yup.boolean(),
    bacon: yup.boolean(),
    special_instructions: yup.string()
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
      special_instructions: formValues.special_instructions.trim(),
      toppings: ["pepperoni", "sausage", "ham", "bacon"].filter(
        (hobby) => formValues[hobby]
      )
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
    <div className='App'>
      <Navigation>
        <h1>Lambda Eats</h1>
        <NavLinks>
        <Link to='/'><Box>Home</Box></Link>
        <Link to='/pizza'><Box>Order</Box></Link>
        </NavLinks>
      </Navigation>
      <Route exact path='/'>
          <AppScreen>
          <ImageApp src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:0.752xh;0,0.139xh&resize=640:*'></ImageApp>
        <HomeDiv>
          <h2>Your favorite food, delivered while coding</h2>
        </HomeDiv>
        </AppScreen>
       
      </Route>
      <Route path='/pizza'>
        <Form 
        values={formValues}
        change={change}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
        />

        <h2>Orders</h2>
        {orders.map(order => {
          return (
            <Container>
              <h3>{order.name}</h3>
              <div>Size: {order.size}</div>
              <div>Toppings: {order.toppings.map( top => {
                return <p>{top}</p>
              })}</div>
              <div>Special Instructions: {order.special_instructions}</div>
              
            </Container>
          )
        })}
      </Route>
    </div>
  );
}

export default App;
