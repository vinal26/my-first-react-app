import React from 'react';
import { emptyListText, fontSize } from '../Utils/AllConstant';

const Loader = ({ visible, mainStyle, mainClassName, textClassName, showBR = true, emptyTextKey, color = '#1f7e78', override, style }) => {
  if (visible) {
    return (
      <div style={mainStyle} className={mainClassName}>
        <br />
        <div className="mt-5 text-center text-capitalize">
          <div style={{ width: '3rem', height: '3rem', color, ...style }} className="spinner-border" role="status" />
        </div>
      </div>
    );
  }
  if (!visible && emptyTextKey) {
    return (
      <div style={mainStyle} className={mainClassName}>
        {showBR ? <br /> : null}
        <h4 className={`${textClassName ? textClassName: 'mt-5 text-center '}`} style={{fontSize: fontSize.font19, color: '#8f8f8f', fontWeight: '700', letterSpacing: 0.4 ,...style}}>{emptyListText[emptyTextKey] || 'No Any Data'}</h4>
      </div>
    );
  }
  return null
};

export default Loader;