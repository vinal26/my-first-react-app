import React from 'react';

const Avatar = ({ image, style, defaultImg, className, ...props }) => {
  return (
    <img
      src={image || defaultImg || "images/avatar.png"}
      onError={(e) => {
        e.target.src = defaultImg || "images/avatar.png" //replacement image imported above
      }}
      style={style}
      alt=""
      className={className || ''}
      {...props}
    />
  )
};

export default Avatar;