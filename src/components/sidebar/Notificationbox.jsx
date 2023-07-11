import React from 'react'
import { toastMsg } from '../../Utils/AllConstant'
import { changeDateFormat, checkEndDate, formatAMPM, showToastWarning } from '../../Utils/Helper'

function Elemination({ item, navigate, closeNav }) {

    return (
        <div className='box_wrapper' onClick={() => {
            closeNav()

            // navigate({pathname:"/activeprogramlist", search: `?item=${JSON.stringify(item)}`, replace: true  })
            if (checkEndDate(item?.NotificationDetails?.elimination?.end_date)) {
                showToastWarning(toastMsg.programEnd)
            } else {
                navigate(`/activeprogramlist/${item?.NotificationDetails?.elimination?._id}`, { replace: true })
            }
        }}>
            <div className='box_content' style={{ maxWidth: 215 }}>
                {item?.NotificationDetails?.elimination?.title}
            </div>
            <div className='box_content font_weight_normal'>
                {checkEndDate(item?.NotificationDetails?.elimination?.end_date) ? "This program is finished." : "This program is about to end."}
            </div>
            <div className='d-flex justify-content-between'>
                <div className='box_content'>
                    <div>Start Date</div>
                    <div className='font_weight_normal'>{item?.NotificationDetails?.elimination?.start_date}</div>
                </div>
                <div className='box_content'>
                    <div>End Date</div>
                    <div className='font_weight_normal'>{item?.NotificationDetails?.elimination?.end_date}</div>
                </div>
            </div>
            <div className='box_status'>
                {item?.NotificationDetails?.elimination?.status}
            </div>
        </div>
    )
}

function PendingTask({ item, navigate, closeNav }) {
    return (
        <div className='box_wrapper' onClick={() => {
            closeNav()
            // navigate({pathname:"/activeprogramlist", search: `?item=${JSON.stringify(item)}`, replace: true  })
            navigate(`/bookingrequest`, { replace: true })
        }}>
            <div className='box_content' style={{ maxWidth: 215 }}>
                {item?.bookingDetails?.type === "session" ? "Individual Session Request" : "Group Session Request"}
            </div>
            <div className='box_content font_weight_normal'>
                {checkEndDate(new Date(item?.bookingDetails?.bookingDate)) ?
                    <>
                        <span>{`You had a booking request on `}</span>
                        <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>{`${changeDateFormat(item?.bookingDetails?.bookingDate)}`}</span></> :
                    <>
                        <span>{`You have a new booking request on `}</span>
                        <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>{`${changeDateFormat(item?.bookingDetails?.bookingDate)}`}</span><span>{` at ${formatAMPM(item?.bookingDetails?.startTime)} .`}</span>
                    </>}
            </div>
            {/* <div className='box_status'>
                {item?.status}
            </div> */}
        </div>
    )
}

function Notificationbox({ item, navigate, closeNav }) {
    return (
        <>
            {/* {item?.bookingDetails?.hasOwnProperty("elimination") ?
                <Elemination item={item} navigate={navigate} closeNav={closeNav} /> : null} */}
            {item?.bookingDetails ?
                <PendingTask item={item} navigate={navigate} closeNav={closeNav} />
                : null}
        </>
    )
}

export default Notificationbox