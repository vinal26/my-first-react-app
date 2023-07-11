import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { Doughnut } from "react-chartjs-2";
import AppointmentRequests from "./AppointmentRequests";

const AppointmentPatientSection = () => {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "# of Votes",
        data: [75, 25],
        backgroundColor: ["rgb(7, 169, 240)", "rgb(202, 121, 198)"],
        borderColor: ["rgb(7, 169, 240)", "rgb(202, 121, 198)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="row mt-2">
        <div className="col-md-6">
          <p className="post_heading">
            Appointment Request{" "}
            <span className="float-end appointment_viewall cursor-pointer">
              View All <MdArrowForwardIos />
            </span>
          </p>

          <div className="caret_appointment6 shadow mt-4 pt-1">
            <div className="appointment_request9 mt-3">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/avatar.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h5>
                    Kate Greenwhich{" "}
                    <button
                      className="button1 float-end mt-1 me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#appointmentrequests"
                    >
                      Confirmed
                    </button>
                  </h5>
                  <p>Tuesday, 28 March 9:30</p>
                </div>
              </div>
            </div>
            <div className="appointment_request9 mt-3">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/avatar.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h5>
                    Kate Greenwhich{" "}
                    <button className="button1 float-end mt-1 me-3">
                      Confirmed
                    </button>
                  </h5>
                  <p>Tuesday, 28 March 9:30</p>
                </div>
              </div>
            </div>

            <div className="appointment_request9 mt-3">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/avatar.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h5>
                    Kate Greenwhich{" "}
                    <button className="button1 button2 float-end mt-1 me-3">
                      Declined
                    </button>
                  </h5>
                  <p>Tuesday, 28 March 9:30</p>
                </div>
              </div>
            </div>

            <div className="appointment_request9 mt-3">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/avatar.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h5>
                    Kate Greenwhich{" "}
                    <button className="button1 float-end mt-1 me-3">
                      Confirmed
                    </button>
                  </h5>
                  <p>Tuesday, 28 March 9:30</p>
                </div>
              </div>
            </div>
            <div className="appointment_request9 mt-3">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/avatar.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h5>
                    Kate Greenwhich{" "}
                    <button className="button1 float-end mt-1 me-3">
                      Confirmed
                    </button>
                  </h5>
                  <p>Tuesday, 28 March 9:30</p>
                </div>
              </div>
            </div>

            <div className="appointment_request9 mt-3">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/avatar.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h5>
                    Kate Greenwhich{" "}
                    <button className="button1 button2 float-end mt-1 me-3">
                      Declined
                    </button>
                  </h5>
                  <p>Tuesday, 28 March 9:30</p>
                </div>
              </div>
            </div>

            <div className="appointment_request9 mt-3">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/avatar.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h5>
                    Kate Greenwhich{" "}
                    <button className="button1 float-end mt-1 me-3">
                      Confirmed
                    </button>
                  </h5>
                  <p>Tuesday, 28 March 9:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <p className="post_heading">
            Patients <span className="text-muted float-end">2020</span>
          </p>
          <div className="caret_appointment6 shadow mt-4 pt-1 pe-4 pb-3">
            <div className="appointment_request9 mt-3 ">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/new_patient.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h4>
                    2K{" "}
                    <span className="float-end mt-2">
                      <SlGraph /> 15%
                    </span>
                  </h4>
                  <h6 className="text-muted mb-3">New Patient</h6>
                </div>
              </div>
            </div>

            <div className="appointment_request9 mt-3 ">
              <div className=" row">
                <div className="col-md-2 text-center">
                  <SquareAvatar
                    src={"images/old_patient.png"}
                    className="imgsize ms-4"
                  />
                </div>
                <div className="col-md-10">
                  <h4>
                    3K{" "}
                    <span className="float-end mt-2">
                      <SlGraph /> 15%
                    </span>
                  </h4>
                  <h6 className="text-muted mb-3">Old Patient</h6>
                </div>
              </div>
            </div>
          </div>
          <p className="post_heading mt-4">
            Gender <span className="text-muted float-end">2020</span>
          </p>
          <div
            className="caret_appointment6 shadow mt-4 px-4 py-4"
            style={{ height: "289px" }}
          >
            <Doughnut
              data={data}
              height={"100%"}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
      <AppointmentRequests />
    </>
  );
};

export default AppointmentPatientSection;
