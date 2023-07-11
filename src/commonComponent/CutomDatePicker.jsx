import { forwardRef } from "react"
import ReactDatePicker from "react-datepicker";

const RenderInput = forwardRef(({ value, onClick, inputClassName, required, imageStyle }, ref) => {
  return (
    <div className={inputClassName} onClick={onClick} ref={ref}>
      <img src={"/images/calnder.png"} alt="" style={imageStyle || {width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: "20px"}} />
      <input value={value} required={required} placeholder={'mm-dd-yyyy'} className="border-0 ps-4 pe-2 bg-transparent" style={{
        color: "#9f9f9f",
        flex: 1
      }} disabled />
    </div>
  );
});

const DateInput = ({ value, onChangeDate, inputClassName, required, minDate, maxDate, imageStyle, disabled }) => {
  return (
    <ReactDatePicker
      dateFormat="MM-dd-yyyy"
      selected={value}
      disabled={disabled}
      className="description_inputf mb-0"
      minDate={minDate || new Date("01-01-1720")}
      maxDate={maxDate}
      showMonthDropdown
      required={required}
      showYearDropdown
      yearDropdownItemNumber={300}
      scrollableYearDropdown
      onChange={(date) => onChangeDate(date)}
      customInput={<RenderInput imageStyle={imageStyle} inputClassName={inputClassName} required={required} />}
    />)
}
export default DateInput;
