import { format, parseISO } from "date-fns";
import React from "react";
import { useState, useEffect } from "react";
import {
  inviteMembers,
  deleteMemberService,
  getActiveMembers,
  getActiveProgramById,
  updateActiveProgramById,
} from "../../services/ActivePrograms";
import { isOnlyEmpty, showToastError, showToastSuccess, validateEmail } from "../../Utils/Helper";
import Loader from "../../commonComponent/Loader";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { Link as button, Navigate, useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import SquareAvatar from "../../commonComponent/SquareAvatar";
import DeleteModal from "../../commonComponent/DeleteModal";
import ActiveMemberModal from "./ActiveMemberModal";

const ActiveMembers = (props) => {
  const [memberList, setMemberList] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [askLoader, setAskLoader] = useState(false);
  const [dropDownList, setDropDownList] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [filterdata, setFilterData] = useState([]);
  // const [programMembers, setProgramMembers] = useState([]);
  let location = useLocation();
  const navigate = useNavigate();
  // console.log(props, "programss")
  const programId = props.programId;
  const [program, setProgramDetails] = useState({});
  const [selectedMembers, setSelectedMembers] = useState([])
  const [formValues, setFormValues] = useState([{ email: "", first_name: "", last_name: "" }])
  let addFormFields = () => {
    setFormValues([...formValues, { email: "", first_name: "", last_name: "" }])
  }

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }
  useEffect(() => {
    getMembersById();
    getActiveProgramByIds();
  }, [programId]);
  let dateSort = (filterdata1) => {
    setDropDownList(false);
    const result = filterdata1.sort(function (a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    })
    return result;

  }
  let nameSort = (filterdata1) => {
    setDropDownList(false);
    const result = filterdata1.sort(function compare(a, b) {
      if (a._id?.full_name.toLowerCase() < b._id?.full_name.toLowerCase()) {
        return -1;
      } if (a._id?.full_name.toLowerCase() > b._id?.full_name.toLowerCase()) {
        return 1;
      }
      return 0;
    })
    return result;
  }

  const getMembersById = async (searchWord) => {
    try {
      const response = await getActiveMembers(programId, searchWord);
      // setLoader(false);
      if (response.status === 200) {
        console.log(response.data.data, "membersss")
        setMemberList(response?.data?.data[0]?.programMembers)
        setFilterData(response?.data?.data[0]?.programMembers);
      } else {
        console.log(response?.data || response.message);
      }
    } catch (error) {
      // setLoader(false);
      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
    }
  };
  const getActiveProgramByIds = async () => {
    setLoader(true)
    // console.log(sessionId);
    try {

      const response = await getActiveProgramById(programId);

      if (response.status === 200 && response?.data) {
        // console.log(response, "program resp")
        setProgramDetails(response?.data?.data);
      } else {
        console.log(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {

      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
      setLoader(false)
    }
  };
  const onMemberSearch = async (e) => {
    let searchWord = e.target.value;
    const result = memberList?.filter((value) => {
      if (value) {
        return (
          value?._id?.full_name?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(memberList);
    } else {
      setFilterData(result);
    }
  };
  const updateProgram = async (programMembers) => {
    setLoader(true)
    console.log(programMembers, "clients", program)
    try {
      // const fileName = program.programImage.split('/')
      // const imageName = fileName[fileName.length - 1];
      const response = await updateActiveProgramById(program[0]._id, {
        ...program[0],
        // programImage: imageName,
        programMembers: programMembers
      });
      if (response) {
        showToastSuccess("Members Assigned Successfully")
        getMembersById();
        // props.onRefresh()
        // setProgramMembers([]);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }
  const deleteMember = async (memberId) => {
    try {
      const response = await deleteMemberService(programId, memberId);
      if (response) {
        showToastSuccess(response?.data || 'Member removed successfully.');
        getMembersById();
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }
  let handleSubmit = async (event) => {
    event.preventDefault();
    var parms = {};
    parms["EmailList"] = formValues

    try {
      const response = await inviteMembers(parms);
      setAskLoader(false)
      if (response.status === 200) {
        updateProgram(response?.data?.data)
        showToastSuccess("Invite sent successfully")
        console.log(response.data.data, "response data")

        setFormValues([{ email: "", first_name: "", last_name: "" }]);
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      setAskLoader(false)
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }

  let handleMember = async () => {
    var parms = {};
    parms["EmailList"] = selectedMembers.map(dt => {return {name: dt.name, email: dt.email}})

    try {
      const response = await inviteMembers(parms);
      setAskLoader(false)
      if (response.status === 200) {
        updateProgram(response?.data?.data)
        showToastSuccess("Invite sent successfully")
        console.log(response.data.data, "response data")

        setFormValues([{ email: "", first_name: "", last_name: "" }]);
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      setAskLoader(false)
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }

  const renderModal = () => {
    return (
      <div class="modal fade" id="memberModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header p-4">
              {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
              <h5 className="mb-0">Add new members</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pb-4 px-4">
              {/* <h4 className="text-green mb-2">{props.singleActiveProgram[0]?.programName}</h4>
              <p className="mb-5">{props.singleActiveProgram[0]?.description}</p> */}
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="row mb-2">
                    <div className="col-md-5">
                      <label className="form-label" for="email">Email Address<span className="text-danger"> *</span></label>
                    </div>
                    <div className="col-md-5">
                      <label className="form-label">Name<span> (Optional)</span></label>
                    </div>
                  </div>
                  {formValues.map((element, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-5">
                        {/* <label className="form-label">Email Address</label> */}
                        <input className="form-control description_inputf mb-2" type="email" id="email" name="email" placeholder="e.g. sharonjames@gmail.com" value={element.email || ""} onChange={e => handleChange(index, e)} />
                        {(element.email !== "" && !validateEmail(element.email)) ? <label className="text-danger m-1">Email format is not valid.</label> : null}
                      </div>
                      <div className="col-md-5">
                        {/* <label className="form-label">Name</label> */}
                        <input className="form-control description_inputf mb-2" type="text" name="first_name" placeholder="e.g. Sharon James" value={element.first_name || ""} onChange={e => handleChange(index, e)} />
                      </div>

                      <div className="col-md-2 d-flex align-items-center">
                        {
                          index ?
                            <button type="button" title="Remove" className="btn btn-outline-danger px-2" onClick={() => removeFormFields(index)}><AiOutlineCloseCircle style={{ marginTop: "-4px" }} size="22px" /></button>
                            : null
                        }
                      </div>
                    </div>
                  ))}
                </div>
                <div className="btn-custom-link ms-0 mt-3 mb-5" onClick={() => addFormFields()}><AiOutlinePlus className="me-2" /> Add new</div>
                <hr className="mt-4 px-3" />
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-secondary px-4" data-bs-dismiss="modal">Cancel</button>
                  <button disabled={(formValues.filter(dt => !validateEmail(dt.email))).length > 0} className="btn btn-primary btn-custom" type="submit" data-bs-dismiss="modal">Send Invitation</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }

  const renderSearchHeader = () => {
    const menuClass = `dropdown-menu${dropDownList ? " show" : ""}`;
    const drop = `dropdown-menu${dropDown ? " show" : ""}`;
    return (
      <div className="col-md-12 d-flex">
        <div className="w-50">
          <h4>Members</h4>
          <p>Manage your program members here</p>
        </div>
        <div className="w-50 d-flex">
          <div className="actsearch_simple me-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search for a member..."
              className="ms-2"
              onChange={(e) => onMemberSearch(e)}
            />
          </div>
          <div className="dropdown me-2">
            <button
              onBlur={() => { setDropDownList(false) }}
              onClick={() => { setDropDownList(!dropDownList); setDropDown(false) }}
              className="btn btn-primary btn-custom position-relative dropdown-toggle" type="button">
              Filters
              <ul className={menuClass + " top-0 start-0 w-100"} style={{marginTop: '3.5em'}}>
                <li><a className="dropdown-item pointer" onClick={() => { nameSort(filterdata) }}>Alphabetical Order</a></li>
                <li><a className="dropdown-item pointer" onClick={() => { dateSort(filterdata); }
                }>Date Order</a></li>
              </ul>
            </button>
          </div>
          <div className="dropdown me-2">
            <button
              onBlur={() => { setDropDown(false) }}
              onClick={() => { setDropDown(!dropDown); setDropDownList(false) }}
              className="btn btn-primary btn-custom position-relative dropdown-toggle" type="button">
              <AiOutlinePlus className="me-2" /> Add new member
              <ul className={drop + " top-0 start-0 w-100"} style={{marginTop: '3.5em'}}>
                <li><a className="dropdown-item pointer" data-bs-toggle="modal" data-bs-target="#memberModal">Add new</a></li>
                <li><a className="dropdown-item pointer" onClick={() => setOpen(true)} data-bs-toggle="modal" data-bs-target="#addmembermodal1">Add my client</a></li>
              </ul>
            </button>
          </div>
        </div>
        {renderModal()}
        <ActiveMemberModal addMember={() => handleMember()} open={open} setOpen={setOpen} members={memberList.map(dt => dt?._id?._id)} setMembers={setSelectedMembers} />

        <DeleteModal
          title={'Delete'}
          content1={'Are you sure you want to remove'}
          content2={'this member?'}
          modalId={'deleteMember'}
          button2={'No'}
          button1={'Yes'}
          onDelete={() => deleteMember(memberId)}
        />
      </div>
    )
  }

  const renderListRow = (item) => {
    // console.log(item, "item")
    return (
      <tr>
        <td className="text-muted"><SquareAvatar
          src={item?._id?.profilePicture}
          className="member_listimage squre_image2"
        /></td>
        <td className="text-muted">{item?._id?.full_name !== " " ? `${item?._id?.full_name}` : "N/A"}</td>
        <td className="text-muted">User</td>
        <td className="text-muted">{item?.date ? format(parseISO(item?.date), 'MMM d, yyyy') : null}</td>
        {/* <td className="text-muted">Dec 1, 2022</td> */}
        <td className="text-muted fw-bold text-left" style={{ cursor: 'pointer' }}>
          {/* <span className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><RiEdit2Fill size="1.5em" /></span> */}
          <span className="mb-0" data-bs-toggle="modal" data-bs-target="#deleteMember" title="View" onClick={() => {
            setMemberId(item?._id?._id);
          }}><MdDelete size="1.5em" /> </span>
        </td>
      </tr>
    )
  }

  const renderList = () => {
    return (
      <tbody>
        {filterdata?.map((item) => {
          return renderListRow(item)
        })}
      </tbody>
    )
  }
  const renderLoader = () => {
    return (
      <Loader
        visible={false}
        emptyTextKey={'noAnyActiveMember'}
        style={{ top: 0, position: "relative" }} />
    )
  }

  return (
    <>
      <div className="mt-4 px-2" style={{ height: "486px" }}>
        {renderSearchHeader()}
        <div className="memlist_scroll mt-4 spacing_scroll">
          <table class="table table-hover">
            <thead>
              <tr>
                <td className="py-4" scope="col text-secondary">Photo</td>
                <td className="py-4" scope="col text-secondary">Member Name</td>
                <td className="py-4" scope="col text-secondary">Role</td>
                <td className="py-4" scope="col text-secondary">Date Added</td>
                {/* <td className="py-4" scope="col text-secondary">Last Active</td> */}
                <td className="py-4" scope="col text-secondary">Action</td>
              </tr>
            </thead>
            {renderList()}
          </table>
          {!filterdata?.length ? renderLoader() : null}
        </div>
        <div className="pb-4">
          <hr />
          <div className="d-flex justify-content-between">
            <div text={'Back'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' , width:"120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onBack()}>Back</div>
            <div text={'Finish'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width:"120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && showToastSuccess("Action Completed Succesfully.") && navigate('/activeprogramlist')}>Finish</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveMembers;
