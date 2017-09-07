import React from 'react';
//props.input is same as {input}, props is passed from Field, redux-form
export default ({input, label, meta: {error, touched} }) => {

  return (
    <div>
      <label> {label} </label>
      {/* pass all property of input to <input> */}
      <div className="red-text" style={{ marginBottom: '20px' }}>  { touched && error } </div>
      <input {...input}/>
    </div>
  );
}
