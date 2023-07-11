import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { getActiveProgram } from '../../services/ActivePrograms';
import { assignGroupToCarePlanService } from '../../services/CreateCarePlanService';
import { getProgramList } from '../../services/GroupService';
import { showToastSuccess } from '../../Utils/Helper';


const GroupProgramList = (props) => {
  const [programList, setProgramList] = useState([]);
  const [members, setMembers] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const memberList = props?.selectedgroup?.programId;
  const updateGroups = async () => {
    setLoader(true)
    // console.log(careGroups, "clients", selectedCarePlan)
    try {
      const response = await assignGroupToCarePlanService({
        "programId": members,
        "groupId": [props.selectedgroup._id]
      });
      if (response) {
        showToastSuccess("Program Assigned Successfully");
        setProgramList([]);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  // const getAllProgramList = async () => {
  //     console.log('called!!');
  //     try {
  //     const response = await getProgramList({'programIds': props.selectedgroup?.programId});
  //     if (response.status === 200) {
  //       setProgramList(response?.data?.data);
  //         setFilterData(response?.data?.data);
  //     }
  //     } catch (error) {
  //     // setLoader(false);
  //     console.log(error);
  //     }
  // }
  const getProgramList = async () => {
    setLoader(true)
    setProgramList([])
    try {
      const response = await getActiveProgram();
      setLoader(false)
      if (response.status === 200) {
        setProgramList(response?.data?.data);
        setFilterData(response?.data?.data);
      }
    } catch (error) {
      setLoader(false)
    }
  };

  const onProgramSearch = async (e) => {
    let searchWord = e.target.value;
    const result = programList?.filter((value) => {
      if (value) {
        console.log(value, "value")
        return (
          value?.programName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(programList);
    } else {
      setFilterData(result);
    }
  };
  const UpdateMember = (checked, member) => {
    if (checked)
      setMembers((prev) => [...prev, member])
    else
      setMembers((prev) => prev?.filter(dt => dt != member))
  }
  useEffect(() => {
    getProgramList();
    // getAllProgramList()
  }, [props.selectedgroup])

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          All Programs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <div className="actsearch_simple mb-4">
          <FiSearch className="boxicon" />
          <input
            placeholder="Search..."
            className="ms-2"
            onChange={(e) => onProgramSearch(e)}
          />
        </div>
        <div className="memlist_scroll mt-1 justify-content-center spacing_scroll" style={{ height: 300 }}>
          {filterdata.length ? (
            filterdata.filter(dt => !memberList?.includes(dt._id)).map((dt, index) => {
              // { console.log(dt, members, "members") }
              // filterdata.map(dt =>
              return (
                <div className={`card mb-2 py-2 px-3`}
                  style={{ background: "#F2F4F6" }} key={dt._id}>
                  <div className="btn-group align-items-center gap-2">
                    <p className="affir_checkbox mb-0">
                      <input
                        type="checkbox"
                        name="members"
                        value={dt._id}
                        // checked={members?.includes(dt._id)}
                        id="flexCheckDefault"
                        onChange={(e) => UpdateMember(e.target.checked, e.target.value)}
                      />
                    </p>
                    <div className="actlist_wid2 ms-2">
                      <p className="py-0 mb-0">
                        {dt.programName}
                      </p>
                    </div>
                  </div>

                </div>)
            })
          ) :
            (<p className="p-2">No data found!</p>)
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="description_btnsave w-100 px-4" onClick={() => {
          updateGroups();
          props.onHide();

        }}>Assign</button>
      </Modal.Footer>
    </Modal >
  );
};

export default GroupProgramList;