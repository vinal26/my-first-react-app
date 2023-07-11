import React, { useState } from "react";
import { FiEdit, FiMoreHorizontal, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { format, isPast, parseISO } from "date-fns";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { formatDate, formatNewDate, showToastError, showToastSuccess } from "../../Utils/Helper";
import { activateProgram, deleteProgram, getActiveProgram, getAssignedProgram, getDefaultProgram, getGroupListForProgram, getProgramShareLink, setDefaultProgram, updateActiveProgramById } from "../../services/ActivePrograms";
import { assignGroupToCarePlanService } from "../../services/CreateCarePlanService";
import { changeDateFormat } from "../../Utils/Helper";
import { useEffect } from "react";
import ApiConfig from "../../config/ApiConfig";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { RiEdit2Fill } from "react-icons/ri";
import { useAuth } from "../../Context/AuthContext";
import ShareLinkModal from "../carePlan_/ShareLinkModal";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../header/Navbar";
import AssignMemberModal from "./AssignToMembers";
import AssignGroupModal from "./AssignToGroupsModal";
import AssignProvidersModal from "./AssignToProvidersModal";

const defaultTabs = {
  "active": false,
  "assigned": false,
  "archived": false,
  "default": false,
}

const ActiveProgramList = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [status, setStatus] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const location = useLocation();
  const state = location.state;

  const { userId } = useParams()
  const [defaultList, setDefaultList] = useState([]);
  const [listTabs, setListTabs] = useState({
    "active": true,
    "assigned": false,
    "archived": false,
    "default": false,
  });
  const [linkInput, setLinkInput] = useState("");
  const newCreatedProgramId = state?.newCreatedProgramId; // To Check whether new program is created or not if yes then directly navigate to Active program tab screen module
  const [filterdata, setFilterData] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programGroups, setProgramGroups] = useState([]);
  const [programsGroups, setProgramsGroups] = useState([]);
  const [programMembers, setProgramMembers] = useState([]);
  const [programProviders, setProgramProviders] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectActiveProgram, setSelectActiveProgram] = useState('')
  // let user = location?.state?.user || '';

  useEffect(() => {
    getProgramList();
  }, []);

  useEffect(() => {
    if (userId && programList.length) {
      const result = programList.filter((value) => value._id == userId);
      if (result.length) {
        setSelectedProgram(result[0])
        navigate(`/activeprogramlist/${result[0]._id}`, { replace: true })
      } else {
        if (programList?.length) {
          setSelectedProgram(programList[0])
        }
        // showToastError(toastMsg.programNotAvailable)
      }
    }
  }, [userId, programList]);

  // To get All active program list
  const getProgramList = async () => {
    setLoader(true)
    setFilterData([])
    try {
      const response = await getActiveProgram();
      // console.log(response, new Date(), "program response")

      setLoader(false)
      if (response.status === 200) {
        const result = response?.data?.data?.filter((value) => {
          // console.log(value, "result")
          if (!isPast(parseISO(value.endDate))) {
            return (
              value
            );
          }
        });
        setProgramList(result);
        setFilterData(result);
        if (newCreatedProgramId) {
          const program = result?.find(item => item._id === newCreatedProgramId)
          program && navigate("/activeprogram", { state: { program, isFromCreate: true } });
        } else {
          if (!userId) {
            navigate(`/activeprogramlist/${result?.[0]._id}`, { replace: true })
          }
        }

      }
    } catch (error) {
      setLoader(false)
    }
  };

  const onChangeSearchText = async (e) => {
    let searchWord = e.target.value;
    const result = programList?.filter((value) => {
      if (value) {
        return (
          value?.programName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(programList);
      // getForumsById(searchWord);
    } else {
      setFilterData(result);
    }
  };

  const getArchivedText = async () => {
    // setLoader(true);
    setLoader(true)
    setFilterData([])
    try {
      const response = await getActiveProgram();
      // console.log(response, new Date(), "program response")

      setLoader(false)
      if (response.status === 200) {
        // setProgramList(response?.data?.data);
        // setFilterData(response?.data?.data);
        const result = response?.data?.data?.filter((value) => {
          // console.log(value, "result")
          // if (isPast(parseISO(value.endDate)) && value?.default !== true && value.status !== true) {
          if (isPast(parseISO(value.endDate))) {

            return (
              value
            );
          }
        });
        setProgramList(result);
        setFilterData(result);
      }
    } catch (error) {
      setLoader(false)
    }

  };
  const getAssignedText = async () => {
    // setLoader(true);
    setLoader(true)
    setFilterData([])
    try {
      const response = await getAssignedProgram();
      // console.log(response, new Date(), "program response")

      setLoader(false)
      if (response.status === 200) {
        setProgramList(response?.data?.data);
        setFilterData(response?.data?.data);
        // const result = response?.data?.data?.filter((value) => {
        //   // console.log(value, "result")
        //   if (changeDateFormat(value?.endDate) < changeDateFormat(new Date()) && value?.default !== true && value.status !== true) {

        //     return (
        //       value
        //     );
        //   }
        // });
        // setProgramList(result);
        // setFilterData(result);
      }
    } catch (error) {
      setLoader(false)
    }

  };
  const updateProgram = async () => {
    setLoader(true)
    // console.log(programMembers, "clients", selectedProgram)
    try {
      const fileName = selectedProgram.programImage.split('/')
      const imageName = fileName[fileName.length - 1];
      const response = await updateActiveProgramById(selectedProgram._id, {
        ...selectedProgram,
        programImage: imageName,
        programMembers: programMembers
      });
      if (response) {
        showToastSuccess("Members Assigned Successfully")
        // props.onRefresh()
        setProgramMembers([]);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  const updateProviders = async (list) => {
    setLoader(true)
    // console.log(programMembers, "clients", selectedProgram)
    try {
      const fileName = selectedProgram.programImage.split('/')
      const imageName = fileName[fileName.length - 1];
      const response = await updateActiveProgramById(selectedProgram._id, {
        ...selectedProgram,
        programImage: imageName,
        careTeam: list
      });
      if (response) {
        showToastSuccess("Providers Assigned Successfully")
        // props.onRefresh()
        setProgramProviders([]);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  const updateGroups = async () => {
    setLoader(true)
    // console.log(careGroups, "clients", selectedCarePlan)
    try {
      const response = await assignGroupToCarePlanService({
        "programId": [selectedProgram._id],
        "groupId": programsGroups
      });
      if (response) {
        showToastSuccess("Groups Assigned Successfully");
        // getCarePlanList();
        // props.onRefresh()
        setProgramGroups([]);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  // console.log(careplanId.careplanId, "careplanIdForm")
  const getShareLink = async (programId) => {
    try {
      const response = await getProgramShareLink(programId);
      setLoader(false);

      if (response.status === 200) {
        // console.log(response, "responseData");
        setLinkInput(response?.data);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }
  const getGroupLists = async (programsId) => {
    try {
      const response = await getGroupListForProgram({ "programIds": [programsId] });
      setLoader(false);
      if (response.status === 200) {
        // console.log(response, "responseData");
        setProgramGroups(response?.data?.data.map((dt) => { return dt._id }));
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }
  // To get All default program list
  const getDefaultProgramList = async () => {
    setLoader(true)
    setFilterData([])
    try {
      const response = await getDefaultProgram();
      setLoader(false)
      if (response.status === 200) {
        setProgramList(response?.data?.data);
        setFilterData(response?.data?.data);
      }
    } catch (error) {
      setLoader(false)
    }
  };
  const changeStatus = async (programId) => {
    try {
      const response = await activateProgram(programId);
      if (response.status === 200) {
        document.getElementById("checkbox").checked = true;
        showToastSuccess(`Active program is updated`)
        // renderListRow();

      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deletePrograms = async (programId) => {
    try {
      const response = await deleteProgram(programId);
      if (response.status === 200) {
        showToastSuccess(`Program deleted successfully`)
        listTabs.active && getProgramList();
        listTabs.default && getDefaultProgramList();
        listTabs.assigned && getAssignedText();
        listTabs.archived && getArchivedText();
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const makeDefault = async (programId) => {
    try {
      const response = await setDefaultProgram(programId);
      if (response.status === 200) {
        // document.getElementById("checkbox").checked = true;
        showToastSuccess(`Action completed successfully`)
        listTabs.active && getProgramList();
        listTabs.default && getDefaultProgramList();
        listTabs.assigned && getAssignedText();
        listTabs.archived && getArchivedText();
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const renderLoader = () => {
    return (
      <Loader
        visible={isLoading}
        emptyTextKey={'noAnyActiveProgram'}
        style={{ top: 0, position: "relative" }} />
    )
  }
  const renderList = () => {
    return (
      <tbody>
        {filterdata?.map((item) => {
          // console.log(item, "itemdata")
          return (
            <tr>
              <td className="text-muted" onClick={() => navigate("/activeprograminfo", { state: { program: item } })}>
                {/* <img
                  src={ApiConfig.ImageUrl + 'programs/' + item.createdBy + '/' + item.programImage}
                  onError={(e) => {
                    e.target.src = "images/dummy_image.jpg" //replacement image imported above
                  }}
                  alt=""
                /> */}
                <SquareAvatar
                  src={ApiConfig.ImageUrl + 'programs/' + item.createdBy + '/' + item.programImage}
                  className="member_listimage squre_image2"
                />
              </td>
              <td className="text-muted" onClick={() => navigate("/activeprograminfo", { state: { program: item } })}>{`${item.programName}`}</td>
              <td className="text-muted">
                <label className="switch ms-0">
                  <input type="checkbox" id="checkbox" onClick={() => {
                    if (item.status == false)
                      // console.log(item._id)
                      changeStatus(item._id);

                  }} checked={item.status} />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="text-muted" onClick={() => navigate("/activeprograminfo", { state: { program: item } })}>{`${item.description}`}</td>
              <td className="text-muted" onClick={() => navigate("/activeprograminfo", { state: { program: item } })}>{formatNewDate(item.startDate)}</td>
              <td className="text-muted" onClick={() => navigate("/activeprograminfo", { state: { program: item } })}>{formatNewDate(item.endDate)}</td>
              <td className="text-muted" onClick={() => navigate("/activeprograminfo", { state: { program: item } })}>{`${item.programMembers?.length}`}</td>
              <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                {/* <span className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="View" onClick={() => navigate("/activeprograminfo", { state: { program: item } })}><MdPreview size="1.5em" /> </span> */}
                {/* <span className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onClick={() => navigate("/activeprogram", { state: { program: item, isFromCreate: false } })}><FiMoreHorizontal size="1.5em" /></span> */}
                <div className="d-flex gap-1">
                  <button onClick={() => navigate("/activeprograminfo", { state: { program: item } })} className="btn btn-light"><AiFillEye className="mb-1" /></button>
                  <button onClick={() => navigate("/activeprogram", { state: { program: item, isFromCreate: false, isFromAssigned: listTabs.assigned } })} className="btn btn-light"><FiEdit className="mb-1" /></button>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                      <BsThreeDots className="icon" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item onClick={() => navigate("/activeprograminfo", { state: { program: item } })}>View</Dropdown.Item> */}
                      {isAdmin ? <Dropdown.Item href="#/action-1" data-bs-toggle="modal" data-bs-target="#assigngroupproviders" onClick={() => { setSelectedProgram(item); setProgramProviders(item.careTeam) }}>Assign to providers</Dropdown.Item> : null}
                      <Dropdown.Item href="#/action-2" data-bs-toggle="modal" data-bs-target="#assignmembermodal1" onClick={() => { setSelectedProgram(item); setProgramMembers(item.programMembers) }}>Assign to members</Dropdown.Item>
                      <Dropdown.Item data-bs-toggle="modal" data-bs-target="#assigngroupmodal1" onClick={() => { setSelectedProgram(item); getGroupLists(item._id) }}>Assign to groups</Dropdown.Item>
                      {/* <Dropdown.Item onClick={() => navigate("/activeprogram", { state: { program: item, isFromCreate: false } })}>Edit</Dropdown.Item> */}
                      {isAdmin ?
                        <Dropdown.Item href="#/action-3" onClick={() => { makeDefault(item._id) }}>{item.default === true ? 'Remove as Default' : 'Make Default'}</Dropdown.Item>
                        : null}
                      <Dropdown.Item href="#/action-4" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => getShareLink(item._id)}>Share Link</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate("/activeprogramtemplate", { state: { program: item, isFromCreate: false } })}>Use as template</Dropdown.Item>
                      {item.status === false ?
                        <Dropdown.Item href="#/action-5" onClick={() => { deletePrograms(item._id) }}>Delete</Dropdown.Item>
                        : null}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </td>
            </tr>
          )
        })}

      </tbody>
    )
  }

  const renderSearchHeader = () => {
    return (
      <div className="d-flex mb-3">
        <div className="w-50">
          <h4>Programs</h4>
          <p>See how your programs are doing</p>
        </div>
        <div className="w-50 d-flex">
          <div className="actsearch_simple me-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search for programs..."
              className="ms-2"
              onChange={(e) => onChangeSearchText(e)} />
          </div>
          <Link
            to="/createactiveprogram"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Add Program"
            className="btn btn-primary btn-custom">
            <AiOutlinePlus className="me-2" /> Add Program
          </Link>
        </div>
      </div>
    )
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            {/* <div className="container"> */}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Dashboard</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Programs</li>
              </ol>
            </nav>
            <div className="row">
              <div className="col-md-12">
                <div className="mt-5 px-2">
                  {renderSearchHeader()}
                  <div className="mt-4">
                    <div className="custom-tabs border-bottom d-flex">
                      <p onClick={() => { setListTabs({ ...defaultTabs, active: true }); getProgramList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.active && 'active'}`}>Active</p>
                      <p onClick={() => { setListTabs({ ...defaultTabs, default: true }); getDefaultProgramList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.default && 'active'}`}>Default</p>
                      {!isAdmin && <p onClick={() => { setListTabs({ ...defaultTabs, assigned: true }); getAssignedText(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.assigned && 'active'}`}>Assigned</p>}
                      <p onClick={() => { setListTabs({ ...defaultTabs, archived: true }); getArchivedText(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.archived && 'active'}`}>Archived</p>
                    </div>
                    {/* Active Tab */}
                    {listTabs.active && <table class="table table-hover">
                      <thead>
                        <tr>
                          <td className="py-4" scope="col text-secondary">Thumbnail</td>
                          <td className="py-4" scope="col text-secondary">Program Title</td>
                          <td className="py-4" scope="col text-secondary">Publish</td>
                          <td className="py-4" scope="col text-secondary">Program Description</td>
                          <td className="py-4" scope="col text-secondary">Start Date</td>
                          <td className="py-4" scope="col text-secondary">End Date</td>
                          <td className="py-4" scope="col text-secondary">Members</td>
                          <td className="py-4" scope="col text-secondary">Action</td>
                        </tr>
                      </thead>
                      {renderList()}
                    </table>}
                    {/* default tabs */}
                    {listTabs.default && <table class="table table-hover">
                      <thead>
                        <tr>
                          <td className="py-4" scope="col text-secondary">Thumbnail</td>
                          <td className="py-4" scope="col text-secondary">Program Title</td>
                          <td className="py-4" scope="col text-secondary">Publish</td>
                          <td className="py-4" scope="col text-secondary">Program Description</td>
                          <td className="py-4" scope="col text-secondary">Start Date</td>
                          <td className="py-4" scope="col text-secondary">End Date</td>
                          <td className="py-4" scope="col text-secondary">Members</td>
                          <td className="py-4" scope="col text-secondary">Action</td>
                        </tr>
                      </thead>
                      {renderList()}
                    </table>}
                    {/* Assigned tabs */}
                    {listTabs.assigned && <table class="table table-hover">
                      <thead>
                        <tr>
                          <td className="py-4" scope="col text-secondary">Thumbnail</td>
                          <td className="py-4" scope="col text-secondary">Program Title</td>
                          <td className="py-4" scope="col text-secondary">Publish</td>
                          <td className="py-4" scope="col text-secondary">Program Description</td>
                          <td className="py-4" scope="col text-secondary">Start Date</td>
                          <td className="py-4" scope="col text-secondary">End Date</td>
                          <td className="py-4" scope="col text-secondary">Members</td>
                          <td className="py-4" scope="col text-secondary">Action</td>
                        </tr>
                      </thead>
                      {renderList()}
                    </table>}
                    {/* Archived Tab */}
                    {listTabs.archived && <table class="table table-hover">
                      <thead>
                        <tr>
                          <td className="py-4" scope="col text-secondary">Thumbnail</td>
                          <td className="py-4" scope="col text-secondary">Program Title</td>
                          <td className="py-4" scope="col text-secondary">Publish</td>
                          <td className="py-4" scope="col text-secondary">Program Description</td>
                          <td className="py-4" scope="col text-secondary">Start Date</td>
                          <td className="py-4" scope="col text-secondary">End Date</td>
                          <td className="py-4" scope="col text-secondary">Members</td>
                          <td className="py-4" scope="col text-secondary">Action</td>
                        </tr>
                      </thead>
                      {renderList()}
                      {/* <tbody>
                          {list?.map((item) => renderListRow(item))}
                        </tbody> */}
                    </table>}

                    <ShareLinkModal link={linkInput} />

                    <AssignProvidersModal addMember={updateProviders} members={programProviders} setMembers={setProgramProviders} />
                    <AssignMemberModal addMember={updateProgram} members={programMembers} setMembers={setProgramMembers} />
                    <AssignGroupModal addMember={updateGroups} members={programGroups} setMembers={setProgramsGroups} />

                    {!filterdata?.length ? renderLoader() : null}
                  </div>
                </div>

              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default ActiveProgramList;
