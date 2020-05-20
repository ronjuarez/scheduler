import React from "react";

// This project introduced the classnames library. This is a library used to assign classNames to
// different elements.
import classNames from 'classnames';
import "components/Button.scss";



// Throughout this project we imported props into the component by pre-desctructoring 

export default function Button({ 
   confirm, 
   danger, 
   onClick, 
   disabled, 
   children, 
}) {

// classNames uses the props danger and confirm to define button styling. 
   const buttonClass = classNames({
      button: true,
      'button--confirm': confirm,
      'button--danger': danger,
    });

   return (
      <button
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
   );
 }