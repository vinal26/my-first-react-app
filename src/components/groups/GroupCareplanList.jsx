import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import Loader from '../../commonComponent/Loader';
import { assignGroupToCarePlanService, getAllCarePlanListService } from '../../services/CreateCarePlanService';
import { getCareplanList } from '../../services/GroupService';
import { showToastSuccess } from '../../Utils/Helper';


const GroupCareplanList = (props) => {
  const [careplanList, setCareplanList] = useState([]);
  const [members, setMembers] = useState([]);
  // const [memberList, setMemberList] = useState(props?.selectedgroup?.careplanId?.map((dt) => { return dt }) || []);
  const [filterdata, setFilterData] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const memberList = props?.selectedgroup?.careplanId;

  // console.log(members, props?.selectedgroup?.careplanId, memberList, "members")

  const getCarePlanList = async (searchWord) => {
    // setLoader(true)
    setCareplanList([])
    // setMembers([])
    try {
      const response = await getAllCarePlanListService(searchWord);
      setLoader(false)
      if (response.status === 200) {
        setCareplanList(response?.data);
        setFilterData(response?.data);
      }
    } catch (error) {
      setLoader(false)
    }
  };
  const UpdateMember = (checked, member) => {
    if (checked)
      setMembers((prev) => [...prev, member])
    else
      setMembers((prev) => prev.filter(dt => dt != member))
  }

  const onCareSearch = async (e) => {
    let searchWord = e.target.value;
    const result = careplanList?.filter((value) => {
      if (value) {
        // console.log(value, "value")
        return (
          value?.name?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(careplanList);
    } else {
      setFilterData(result);
    }
  };

  useEffect(() => {
    // console.log(props.selectedgroup);
    getCarePlanList();
  }, [props.selectedgroup])
  const updateGroups = async () => {
    setLoader(true)
    try {
      const response = await assignGroupToCarePlanService({
        "careplanId": members,
        "groupId": [props.selectedgroup._id]
      });
      if (response) {
        showToastSuccess("Careplan Assigned Successfully");
        getCarePlanList();
        // setMemberList(props?.selectedgroup?.careplanId)
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          All Care Plans
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <div className="actsearch_simple mb-4">
          <FiSearch className="boxicon" />
          <input
            placeholder="Search..."
            className="ms-2"
            onChange={(e) => onCareSearch(e)}
          />
        </div>
        <div className="memlist_scroll mt-1 justify-content-center spacing_scroll" style={{ height: 300 }}>
          {isLoading ? (
            <center>
              <Loader
                visible={isLoading}
                style={{ top: "48px", position: "relative" }}
              />
            </center>
          ) :
            filterdata?.length ? (
              filterdata.filter(dt => !memberList?.includes(dt._id)).map((dt, index) => {
                // filterdata.map(dt =>
                return (
                  <div
                    key={dt._id}
                    className={`card mb-2 py-2 px-3`}
                    style={{ background: "#F2F4F6" }}
                    onClick={() => {
                    }}
                    id={dt._id}
                  >
                    <div className="btn-group align-items-center gap-2">
                      <p className="affir_checkbox mb-0">
                        <input
                          type="checkbox"
                          name="members"
                          value={dt._id}
                          // checked={dt._id}
                          // checked={members?.includes(dt._id)}
                          id="flexCheckDefault"
                          onChange={(e) => UpdateMember(e.target.checked, e.target.value)}
                        />
                      </p>
                      <div className="p-0 actlist_wid1 d-flex mb-0 justify-content-center align-items-center affir_checkbox" for="flexCheckDefault" >

                      </div>
                      <div className="actlist_wid2 ms-2" >
                        <p className="py-0 mb-0">
                          {dt.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="p-2">No data found!</p>
            )}

        </div>

      </Modal.Body>
      <Modal.Footer>
        <button className="description_btnsave w-100" onClick={() => {
          updateGroups();
          props.onHide();

        }}>Assign</button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupCareplanList;