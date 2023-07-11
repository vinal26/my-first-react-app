import React, { useState } from "react";
import CalendarWeek from "../calendar/CalenderWeek";
import SquareAvatar from "../../commonComponent/SquareAvatar";

const AppointmentRequests = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const [BookingList1, setBookingList1] = useState([]);
  const [sessionType, setSessionType] = useState("");
  const showDetailsHandle = () => {
    setShowDetails(true);
  };
  return (
    <>
      <div
        class="modal fade"
        id="appointmentrequests"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header p-4">
              <h5 className="mb-0">Appointment Requests</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body pb-4 px-4">
              <div className="row">
                <div className="col-md-12">
                  <CalendarWeek
                    showDetailsHandle={showDetailsHandle}
                    date={new Date()}
                    setTimeList={setTimeList}
                    setBookingList1={setBookingList1}
                    sessionType={sessionType}
                  />
                  <hr />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-3">
                  <p className="text-center text-dark mt-3">09:00</p>
                </div>
                <div className="col-md-9">
                  <div className="appointmentreq_card shadow px-4 py-4 appointmentreq_border1">
                    <div className="row">
                      <div className="col-md-2 text-center">
                        <SquareAvatar
                          src={"images/avatar.png"}
                          className="imgsize ms-1"
                        />
                      </div>
                      <div className="col-md-10">
                        <h5>
                          Kate Greenwhich
                          <span className="float-end text-primary">
                            Confirmed
                          </span>
                        </h5>
                        <p className="text-success">Individual session</p>
                      </div>
                      <div className="col-md-12">
                        <p>Chat with Kate</p>
                        <p className="text-success">
                          <span>09:00 - 09:30</span>{" "}
                          <button
                            type="button"
                            class="btn btn-primary btn-custom float-end"
                            style={{ padding: "6px 18px" }}
                          >
                            Change Status
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3">
                  <p className="text-center text-dark mt-3">09:00</p>
                </div>
                <div className="col-md-9">
                  <div className="appointmentreq_card shadow px-4 py-4 appointmentreq_border2">
                    <div className="row">
                      <div className="col-md-2 text-center">
                        <SquareAvatar
                          src={"images/avatar.png"}
                          className="imgsize ms-1"
                        />
                      </div>
                      <div className="col-md-10">
                        <h5>
                          Kate Greenwhich
                          <span className="float-end text-danger">
                            Declined
                          </span>
                        </h5>
                        <p className="text-success">Individual session</p>
                      </div>
                      <div className="col-md-12">
                        <p>Chat with Kate</p>
                        <p className="text-success">
                          <span>09:00 - 09:30</span>{" "}
                          <button
                            type="button"
                            class="btn btn-primary btn-custom float-end"
                            style={{ padding: "6px 18px" }}
                          >
                            Change Status
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3">
                  <p className="text-center text-dark mt-3">09:00</p>
                </div>
                <div className="col-md-9">
                  <div className="appointmentreq_card shadow px-4 py-4 appointmentreq_border3">
                    <div className="row">
                      <div className="col-md-2 text-center">
                        <SquareAvatar
                          src={"images/avatar.png"}
                          className="imgsize ms-1"
                        />
                      </div>
                      <div className="col-md-10">
                        <h5>
                          Kate Greenwhich
                          <span className="float-end text-warning">
                            Pending
                          </span>
                        </h5>
                        <p className="text-success">Individual session</p>
                      </div>
                      <div className="col-md-12">
                        <p>Chat with Kate</p>
                        <p className="text-success">
                          <span>09:00 - 09:30</span>{" "}
                          <button
                            type="button"
                            class="btn btn-primary btn-custom float-end"
                            style={{ padding: "6px 18px" }}
                          >
                            Change Status
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentRequests;
