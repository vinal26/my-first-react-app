import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { watingToApprove } from "../../services/ActivePrograms";
import { useEffect } from "react";
import Avatar from "../../commonComponent/Avatar";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import Loader from "../../commonComponent/Loader";

const ActiveMemberUserApprove = ({
  approvedMemberList,
  waitingMemberList,
  approveFilter,
  waitingFilter,
  setApproveFilter,
  setWaitingFilter,
  programId,
  getMemberWaiting,
  getMemberApproved,
}) => {
  const [memberShow, setMemberShow] = useState(true);
  const [memberDesign, setMemberDesign] = useState(true);
  const [waitingId, setWaitingId] = useState("");
  let navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    handleWaitingList();
  }, []);

  const onApproveSearch = async (e) => {
    let searchWord = e.target.value;
    const result = approvedMemberList.filter((value) => {
      if (value) {
        return value?.full_name
          ?.toLowerCase()
          ?.includes(searchWord?.toLowerCase());
      }
    });

    if (searchWord === "") {
      setApproveFilter(approvedMemberList);
    } else {
      setApproveFilter(result);
    }
  };

  const onWaitingSearch = async (e) => {
    let searchWord = e.target.value;
    const result = waitingMemberList.filter((value) => {
      if (value) {
        return value?.full_name
          ?.toLowerCase()
          ?.includes(searchWord?.toLowerCase());
      }
    });

    if (searchWord === "") {
      setWaitingFilter(waitingMemberList);
    } else {
      setWaitingFilter(result);
    }
  };

  console.log(programId);
  const handleWaitingList = async (e) => {
    e.preventDefault();
    var params = {};
    params["approve_user_id"] = waitingId;

    try {
      const response = await watingToApprove(programId, params);
      if (response.status === 200) {
        showToastSuccess(`User approved successfully`);
      } else {
        showToastError(response?.data || response.message || "Some error occurred");
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
    getMemberWaiting();
    getMemberApproved();
  };

  return (
    <>
      <div className="memberside_list mt-4">
        <div className="row">
          {memberShow ? (
            <>
              <div className="col-md-12">
                <div className="actsearch_box1">
                  <FiSearch className="boxicon" />
                  <input
                    placeholder="Member search here..."
                    onChange={(e) => onApproveSearch(e)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-12">
                <div className="actsearch_box1">
                  <FiSearch className="boxicon" />
                  <input
                    placeholder="Member search here..."
                    onChange={(e) => onWaitingSearch(e)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="col-md-12 mt-3">
            <div className="row">
              <div className="col-md-6">
                <p
                  className="waiting_approvelist"
                  style={{
                    background: memberDesign ? "#1f7e78" : null,
                    color: memberDesign ? "#fff" : null,
                  }}
                  onClick={() => {
                    setMemberShow(true);
                    setMemberDesign(true);
                  }}>
                  approved user
                </p>
              </div>
              <div className="col-md-6">
                <p
                  className="waiting_approvelist"
                  style={{
                    background: memberDesign ? null : "#1f7e78",
                    color: memberDesign ? null : "#fff",
                  }}
                  onClick={() => {
                    setMemberShow(false);
                    setMemberDesign(false);
                  }}>
                  waiting user
                </p>
              </div>
            </div>
          </div>

          {memberShow ? (
            <>
              <div className="col-md-12">
                <div className="memlist_scroll mt-1 spacing_scroll" style={{ height: "67vh" }}>
                  {approveFilter.length ? (
                    approveFilter.map((clm) => {
                      return (
                        <div className="row" key={clm._id}>
                          <div className="col-md-2 actlist_wid1">
                            <Avatar
                              image={clm.profilePicture}
                              className="member_listimage"
                            />
                          </div>
                          <div className="col-md-10 actlist_wid2">
                            <p className="member_listitle">{clm.full_name}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`noApprovedList`} mainClassName={`active_n0data2`} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-12">
                <div className="memlist_scroll mt-1 spacing_scroll" style={{ height: "67vh" }}>
                  {waitingFilter.length ? (
                    waitingFilter.map((clm) => {
                      return (
                        <div className="row" key={clm._id}>
                          <div className="col-md-2 actlist_wid1">
                            <Avatar
                              image={clm.profilePicture}
                              className="member_listimage"
                            />
                          </div>
                          <div className="col-md-10 actlist_wid2">
                            <form onSubmit={handleWaitingList}>
                              <p className="member_listitle">
                                {clm.full_name}
                                <button
                                  className="float-end waiting_icon6"
                                  type="submit"
                                >
                                  {" "}
                                  <BsPlusCircleFill
                                    className="icon1"
                                    onClick={() => {
                                      setWaitingId(clm._id);
                                    }}
                                  />
                                </button>
                              </p>
                            </form>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`noWaitingList`} mainClassName={`active_n0data2`} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveMemberUserApprove;
