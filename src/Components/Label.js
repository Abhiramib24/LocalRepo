import React from 'react';

function Label (props){
    const {label ,type, name,value,handleChange}=props
    return(
        <label>
          {label}
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            required
          />
        </label>
    )
}

export default Label;