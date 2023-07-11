import React from 'react';
import Select from 'react-select'

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    // paddingLeft: 0, 
  })
}
const DropDownMultiSelect = ({ list, onChange, placeHolder, ...props }) => {
  return (
    <Select
      closeMenuOnSelect={false}
      placeholder={placeHolder}
      onChange={onChange}
      options={list}
      isMulti
      {...props}
    />
  )
};

export default DropDownMultiSelect;