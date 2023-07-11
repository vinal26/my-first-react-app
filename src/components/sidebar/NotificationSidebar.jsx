import React, { useEffect, useState } from 'react'
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Loader from '../../commonComponent/Loader';
import { getNotification } from '../../services/DashboardService';
import Notificationbox from './Notificationbox';
import "./notificationStyle.css"

function NotificationSidebar({ getBadgeCount }) {
    const [notification, setEndingNotification] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        getQuickUpdates();
    }, [])

    const getQuickUpdates = async () => {
        try {
            setLoader(true)
            const response = await getNotification();
            // console.log(response, "response notification")
            if (response) {
                setEndingNotification(response?.data || [])
                let count = 0;
                response?.data.map((item) => {
                    count = item.seen == false ? count + 1 : count;
                })
                getBadgeCount(count)
            }
            setLoader(false)
        } catch (error) {
            console.log(error);
            setLoader(false)
        }
    }

    function closeNav() {
        document.getElementById("notificationSidebar").style.right = "-420px";
        document.getElementById("notificationBackdrop").style.width = "0";
    }

    return (<>
        <div id='notificationBackdrop' className='notification backdrop' onClick={() => { closeNav() }}></div>
        <div id="notificationSidebar" className="notification sidebarNotification">
            <div className='d-flex align-items-center mb-2'>
                <div>
                    <button href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>
                        <HiOutlineArrowSmLeft className='iconback' />
                    </button>
                </div>
                <h5 style={{ flex: 1, textAlign: "left", margin: 10 }}>Notifications</h5>
            </div>
            <div className="notificationwraper">
                {notification?.length ? notification?.map((item) => {
                    return <Notificationbox key={item._id} item={item} navigate={navigate} closeNav={closeNav} />
                }) : <Loader visible={isLoading} emptyTextKey={"noNotification"} mainStyle={{ marginTop: "40%" }} />}
            </div>
        </div>
    </>
    )
}

export default NotificationSidebar