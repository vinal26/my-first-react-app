import React from 'react';

const Button = ({ text, style, isLoading, color = '#fff', loadingText = true, className, ...props }) => {
  return (
    <button disabled={isLoading} style={style} className={className} {...props}>
      {isLoading ? <div className='d-flex justify-content-center align-items-center'>
        <p className='mb-0 me-3'>{loadingText && text}</p> 
        <div style={{ width: '1.7rem', height: '1.7rem',position:"relative",  left:"-5px" ,top:'-3px', color: color}} className="spinner-border mt-1" role="status" /></div> : text}
    </button>
  )
};

export default Button;