import React from 'react';

const SquareAvatar = ({ image, style, className, ...props }) => {
  return (
    <img
      src={image || "images/defaultPlaceholder.jpg"}
      onError={(e) => {
        e.target.src = "images/defaultPlaceholder.jpg" //replacement image imported above
      }}
      style={style}
      alt=""
      className={className || ''}
      {...props}
    />
  )
};

export default SquareAvatar;