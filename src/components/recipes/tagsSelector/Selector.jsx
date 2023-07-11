import React, { useEffect, useState } from 'react'
import './selector.css'

function Selector({
  value,
  onChange
}) {
  const [checked, setChecked] = useState(value);

  const onChecked = (name, check) => {
    (check && !checked.includes(name)) && setChecked([...checked, name]);
    !check && setChecked([...checked.filter(dt => dt!==name)]);
  }
  
  useEffect(() => {
    // console.log(checked);
    onChange(checked);
  }, [checked])
  
  return (
    <ul className='ps-0 image-selector'>
        <li>
            <input type="checkbox" name="gf" checked={checked.includes('gf')} id="myCheckbox1" onChange={e => onChecked(e.target.name, e.target.checked)} />
            <label htmlFor="myCheckbox1"><img src="images/gf.png" className="viewbadge_bg2" alt="" /><p className='text'>Gluten Free</p></label>
        </li>
        <li>

            <input type="checkbox" name="df" checked={checked.includes('df')} id="myCheckbox2" onChange={e => onChecked(e.target.name, e.target.checked)} />
            <label htmlFor="myCheckbox2"><img src="images/df.png" className="viewbadge_bg2" alt="" /><p className='text'>Dairy Free</p></label>
        </li>
        <li>

            <input type="checkbox" name="v" checked={checked.includes('v')} id="myCheckbox3" onChange={e => onChecked(e.target.name, e.target.checked)} />
            <label htmlFor="myCheckbox3"><img src="images/v.png" className="viewbadge_bg2" alt="" /><p className='text'>Vegan</p></label>
        </li>
        <li>

            <input type="checkbox" name="q" checked={checked.includes('q')} id="myCheckbox4" onChange={e => onChecked(e.target.name, e.target.checked)} />
            <label htmlFor="myCheckbox4"><img src="images/q.png" className="viewbadge_bg2" alt="" /><p className='text'>Quick</p></label>
        </li>
    </ul>
  )
}

export default Selector
Selector.defaultProps = {
  value: []
}