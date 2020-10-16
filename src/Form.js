import React from 'react';
import styled from 'styled-components'

const FormBody = styled.div`
    border: 10px solid black;
`

const FormInputs = styled.div`
    background-color: lightgray;
    padding: 0.5% 0% 0.5% 3%;
    margin-bottom: 2%;
    margin-top: 1%;
`

const PizzaImg = styled.img`
    width: 90%;
    margin-left: 5%;
    border: 2px solid gray;
`

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = evt => {
        evt.preventDefault();
        submit()
    }

    const onChange = evt => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    return (
        <FormBody>
            <h2>Build Your Own Pizza</h2>
            <PizzaImg src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:0.752xh;0,0.139xh&resize=640:*'></PizzaImg>
            <h2>Build Your Own Pizza</h2>
        <form onSubmit={onSubmit}>

            <FormInputs>
            <h3>Choice of Size</h3>
            <p>Required</p>
            <div>{errors.size}</div>
            </FormInputs>
            <select name='size' value={values.role} onChange={onChange}>
                <option value=''>---Select a size----</option>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
            </select>

            <FormInputs>
            <h3>Choice of Toppings</h3>
            <p>Choose up to 4</p>
            </FormInputs>
            <div>Pepperoni</div>
            <input
            type='checkbox'
            name='pepperoni'
            checked={values.pepperoni}
            onChange={onChange}
            />
            <div>Sausage</div>
            <input
            type='checkbox'
            name='sausage'
            checked={values.sausage}
            onChange={onChange}
            />
            <div>Ham</div>
            <input
            type='checkbox'
            name='ham'
            checked={values.ham}
            onChange={onChange}
            />
            <div>Bacon</div>
            <input
            type='checkbox'
            name='bacon'
            checked={values.bacon}
            onChange={onChange}
            />
            
            <FormInputs>
            <h3>Special Instructions</h3>
            </FormInputs>
            <input
            type='text'
            name='special_instructions'
            value={values.special_instructions}
            onChange={onChange}
            placeholder='Anything else you want to add?'
            />

            <FormInputs>
            <h3>Name</h3>
            </FormInputs>
            <div>{errors.name}</div>
            <input
            type='text'
            name='name'
            value={values.name}
            onChange={onChange}
            />
            
            <div>
            <button disabled={disabled}>Submit Order</button>
            </div>
        </form>
        
        </FormBody>
    )
}