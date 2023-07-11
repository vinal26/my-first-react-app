import { useEffect, useState } from "react";
import {
    format,
    subMonths,
    addMonths,
    startOfWeek,
    addDays,
    isSameDay,
    lastDayOfWeek,
    getWeek,
    addWeeks,
    subWeeks
} from "date-fns";
import { BsArrow90DegLeft, BsArrowBarLeft } from "react-icons/bs";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { changeDateFormatYYYY, showToastError } from "../../Utils/Helper";
import { getAvailableSlots, getBookingByDate } from "../../services/DoctorService";

const CalendarWeek = ({ showDetailsHandle, setTimeList, sessionType, date, setBookingList1 }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(date);
    // console.log(showDetailsHandle, "showDEtailsHandle")
    const changeMonthHandle = (btnType) => {
        if (btnType === "prev") {
            setCurrentMonth(subMonths(currentMonth, 1));
        }
        if (btnType === "next") {
            setCurrentMonth(addMonths(currentMonth, 1));
        }
    };
    const getRescheduleBookingList = async (date) => {
        try {
            const response = await getBookingByDate(date);
            if (response.status === 200) {
                setBookingList1(response.data.data.length >= 1 ? response?.data?.data : []);
            } else {
                showToastError(response?.data || response.message);
            }
            //   setLoader(false)
        } catch (error) {
            error?.data?.data && showToastError(error?.data?.data || error.data?.message);
        }
    }
    useEffect(() => {
        getTimeSlots(selectedDate);
        getRescheduleBookingList(format(selectedDate, "yyyy-MM-dd"));
    }, [selectedDate])
    const getTimeSlots = async (date) => {
        try {
            const response = await getAvailableSlots({ "date": format(date, "yyyy-MM-dd"), "type": sessionType });
            if (response.status === 200) {
                // console.log(response, "booking data");
                setTimeList(response.data.data.length > 1 ? response?.data?.data : []);
            } else {
                alert(response?.data || response.message);
            }
            //    setLoader(false)
        } catch (error) {
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }
    const changeWeekHandle = (btnType) => {
        //console.log("current week", currentWeek);
        if (btnType === "prev") {
            //console.log(subWeeks(currentMonth, 1));
            setCurrentMonth(subWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
        }
        if (btnType === "next") {
            //console.log(addWeeks(currentMonth, 1));
            setCurrentMonth(addWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
        }
    };

    const onDateClickHandle = (day, dayStr) => {
        setSelectedDate(day);
        showDetailsHandle(dayStr);
        getTimeSlots(changeDateFormatYYYY(dayStr));
        getRescheduleBookingList(changeDateFormatYYYY(dayStr))
    };

    const renderHeader = () => {
        const dateFormat = "MMM yyyy";
        // console.log("selected day", selectedDate);
        return (
            <div className="header row flex-end">
                <div className="col col-start">
                    {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
            prev month*/}
                </div>
                {/* </div> */}
                <div className="col col-end fw-bold mb-2 " >
                    <span style={{ marginLeft: "100px" }}>{format(currentMonth, dateFormat)}</span>
                </div>
                {/* <div className="col col-end"> */}
                {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
                {/* </div> */}
            </div>
        );
    };
    const renderDays = () => {
        const dateFormat = "EEE";
        const days = [];
        let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row fw-bold">{days}</div>;
    };
    const renderCells = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${isSameDay(day, new Date())
                            ? "today"
                            : isSameDay(day, selectedDate)
                                ? "selected"
                                : ""
                            }`}
                        key={day}
                        onClick={() => {
                            const dayStr = format(cloneDay, "ccc dd MMM yy");
                            onDateClickHandle(cloneDay, dayStr);
                        }}
                    >
                        <span className="number">{formattedDate}</span>
                        {/* <span className="bg">{formattedDate}</span> */}
                    </div>
                );
                day = addDays(day, 1);
            }

            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };
    const renderFooter = () => {
        return (
            <div className="header row mt-5">
                {/* <div className="col-md-12"> */}
                <div className="d-flex justify-content-space-between">
                    <div
                        // className="col-md-6"
                        onClick={() => changeWeekHandle("prev")}>
                        <FaLessThan />
                    </div>

                    {/* <div>{currentWeek}</div> */}
                    <div
                        className="ms-4"
                        onClick={() => changeWeekHandle("next")}>
                        <div className="icon"> <FaGreaterThan /></div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        );
    };
    return (
        <div className="calendarWeek">
            <div className="row d-flex">
                <div className="col-md-2">
                    {renderFooter()}
                </div>
                <div className="col-md-10">
                    {renderHeader()}

                    {renderDays()}
                    {renderCells()}
                </div>
            </div>
            {/* <hr /> */}

        </div>
    );
};

export default CalendarWeek;