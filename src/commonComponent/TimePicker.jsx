import react from 'react';
import TimeKeeper from "react-timekeeper";
import CloseModalHOC from './CloseModalHOC';

const TimePicker = ({ visibility, value, onChangeDate, onChangeTime, onDone, ...props }) => {
  return (
    <CloseModalHOC onClickOutSide={onDone}>
      <div className="position-relative">
        <div className="position-absolute" style={{ bottom: 90 }}>
          {visibility && <TimeKeeper
            time={value}
            onChange={(newTime) => { onChangeDate(newTime.formatted12 , newTime.formatted24)}}
            onDoneClick={onDone}
            hour24Mode={props.hour24Mode ? true : false}
            switchToMinuteOnHourSelect
          />}
        </div>
        {props.children}
      </div>
    </CloseModalHOC>
  )
}
export default TimePicker;

