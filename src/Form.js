import React from 'react';

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = evt => {
        evt.preventDefault();
        submit()
    }

    const onChange = evt => {

    }

    return (
        <div>
            <h2>Build Your Own Pizza</h2>
            <img src=''/>
            <h2>Build Your Own Pizza</h2>
        <form>

            <h3>Choice of Size</h3>
            <p>Required</p>
            <select name='size' value={values.role} onChange={onChange}>
                <option value=''>---Select a size----</option>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
            </select>

            <h3>Choice of Toppings</h3>
            <p>Choose up to 4</p>
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
            

        </form>
        
        </div>
    )
}