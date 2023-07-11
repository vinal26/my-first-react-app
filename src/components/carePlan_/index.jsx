import React, { useState, useEffect, useRef } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addDays, format, isPast, parseISO } from "date-fns";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { FiEdit, FiSearch } from "react-icons/fi";
import { assignGroupToCarePlanService, getAllCarePlanListService, getDefaultPlanList, setDefaultCarePlan, updateCarePlanService } from "../../services/CreateCarePlanService";
import Loader from "../../commonComponent/Loader";
import { Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { formatNewDate, showToastError, showToastSuccess } from "../../Utils/Helper";
import { useAuth } from "../../Context/AuthContext";
import { changeDateFormat } from "../../Utils/Helper";
import { useDispatch } from "react-redux";
import AssignToClients from "./AssignToClientsModal";
import AssignToGroups from "./AssignToGroupsModal";
import { getCareplanShareLink } from "../../services/ActivePrograms";
import ShareLinkModal from "./ShareLinkModal";

const CarePlan_ = () => {
  const navigate = useNavigate();
  const [isLoading, setLoader] = useState(true);
  const location = useLocation();
  const { userId } = useParams();
  const { isAdmin } = useAuth();
  const state = location.state;
  // const newCreatedPlanId = state?.newCreatedPlanId; // To Check whether new program is created or not if yes then directly navigate to Active program tab screen module
  const [searchText, setSearchText] = useState('');
  const [carePlanList, setCarePlanList] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [careGroups, setCareGroups] = useState([]);
  const [careClients, setCareClients] = useState([]);
  const [selectedCarePlan, setSelectedCarePlan] = useState('');
  const [listTabs, setListTabs] = useState({
    "active": true,
    "archived": false,
    "default": false,
  });
  const [linkInput, setLinkInput] = useState("");
  useEffect(() => {
    getCarePlanList();
  }, []);
  const makeDefault = async (careplanId) => {
    try {
      const response = await setDefaultCarePlan(careplanId);
      if (response.status === 200) {
        // document.getElementById("checkbox").checked = true;
        showToastSuccess(`Action completed successfully`)
        getCarePlanList();

      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (userId && carePlanList.length) {
      const result = carePlanList.filter((value) => value._id == userId);
      if (result.length) {
        setSelectedCarePlan(result[0])
        navigate(`/careplan/${result[0]._id}`, { replace: true })
      } else {
        if (carePlanList?.length) {
          setSelectedCarePlan(carePlanList[0])
        }
        // showToastError(toastMsg.programNotAvailable)
      }
    }
  }, [userId, carePlanList]);
  const updateMembers = async () => {
    setLoader(true)
    // console.log(careClients, "clients", selectedCarePlan)
    try {
      const response = await updateCarePlanService(selectedCarePlan._id, {
        ...selectedCarePlan,
        clients: careClients
      });
      if (response) {
        showToastSuccess("Members Assigned Successfully")
        // getCarePlanList();
        // props.onRefresh()
        setCareClients([]);
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
      const response = await updateCarePlanService(selectedCarePlan._id, {
        ...selectedCarePlan,
        groups: careGroups
      });
      if (response) {
        try {
          const response = await assignGroupToCarePlanService({
            "careplanId": [selectedCarePlan._id],
            "groupId": careGroups
          });
          if (response) {
            showToastSuccess("Groups Assigned Successfully");
            // getCarePlanList();
            // props.onRefresh()
            setCareGroups([]);
          }
          setLoader(false);
        } catch (error) {
          setLoader(false);
          console.log(error);
        }
        // showToastSuccess("Groups Assigned Successfully");
        // getCarePlanList();
        // props.onRefresh()
        setCareGroups([]);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }
  const getShareLink = async (planId) => {
    try {
      const response = await getCareplanShareLink(planId);
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
  // To get All active program list
  const getCarePlanList = async () => {
    setLoader(true)
    setFilterData([])
    try {
      const response = await getAllCarePlanListService();
      setLoader(false)
      if (response.status === 200) {
        setCarePlanList(response?.data);
        setFilterData(response?.data);
      }
    } catch (error) {
      setLoader(false)
    }
  };
  // To get All default program list
  const getDefaultCarePlanList = async () => {
    setLoader(true)
    setFilterData([])
    try {
      const response = await getDefaultPlanList();
      setLoader(false)
      if (response.status === 200) {
        setCarePlanList(response?.data?.data);
        setFilterData(response?.data?.data);
        console.log(response?.data, "response default")
      }
    } catch (error) {
      setLoader(false)
    }
  };
  const dispatch = useDispatch();
  const onChangeSearchText = async (e) => {
    let searchWord = e.target.value;
    const result = carePlanList?.filter((value) => {
      if (value) {
        return (
          value?.name?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(carePlanList);
      // getForumsById(searchWord);
    } else {
      setFilterData(result);
    }
  };
  const renderLoader = () => {
    return (
      <Loader
        visible={isLoading}
        emptyTextKey={'noAnyCarePlan'}
        style={{ top: 0, position: "relative" }} />
    )
  }
  const renderArchivedLoader = () => {
    return (
      <Loader
        visible={isLoading}
        emptyTextKey={'noData'}
        style={{ top: 0, position: "relative" }} />
    )
  }

  const renderSearchHeader = () => {
    return (
      <div className="col-md-12 d-flex">
        <div className="w-50">
          <h4>Care Plans</h4>
          <p>View your care plan line ups</p>
        </div>
        <div className="w-50 d-flex">
          <div className="actsearch_simple me-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search for care plans here..."
              className="ms-2"
              onChange={(e) => onChangeSearchText(e)}
            />
          </div>
          <Link
            to="/createplan"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Add Care Plan"
            className="btn btn-primary btn-custom">
            <AiOutlinePlus className="me-2" /> Add Care Plan
          </Link>
        </div>
      </div>
    )
  }
  const renderList = () => {
    if (listTabs.active)
      return (
        <tbody>
          {filterdata?.map((item) => {
            if (!isPast(addDays(parseISO(item.assignDate), +item.duration)))
              return (
                <tr>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{`${item.name}`}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{`${item.description}`}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{formatNewDate(item.assignDate)}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{item.duration} days</td>
                  <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                    <div className="d-flex gap-1">
                      <button onClick={() => navigate("/careplaninfo", { state: { careplan: item } })} className="btn btn-light"><AiFillEye className="mb-1" /></button>
                      <button onClick={() => { navigate("/editplan", { state: { careplan: item } }) }} className="btn btn-light"><FiEdit className="mb-1" /></button>
                      <Dropdown>
                        <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                          <BsThreeDots className="icon mb-1" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {/* <Dropdown.Item onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>View</Dropdown.Item> */}
                          <Dropdown.Item data-bs-toggle="modal" data-bs-target="#assignclientsmodal1" onClick={() => { setSelectedCarePlan(item); setCareClients(item.clients) }}>Assign to members</Dropdown.Item>
                          <Dropdown.Item data-bs-toggle="modal" data-bs-target="#assigngroupsmodal1" onClick={() => { setSelectedCarePlan(item); setCareGroups(item.groups.map((dt) => { return dt._id })) }}>Assign to groups</Dropdown.Item>
                          {/* <Dropdown.Item onClick={() => { navigate("/editplan", { state: { careplan: item } }) }}>Edit</Dropdown.Item> */}
                          {isAdmin ?
                            <Dropdown.Item href="#/action-2" onClick={() => makeDefault(item._id)}>{item.autoPlan === true ? 'Remove as Default' : 'Make Default'}</Dropdown.Item>
                            : null}
                          <Dropdown.Item href="#/action-3" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => getShareLink(item._id)}>Share Link</Dropdown.Item>
                          <Dropdown.Item onClick={() => { navigate("/plantemplate", { state: { careplan: item } }) }}>Use as Template</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              )
          })}

        </tbody>
      )

    if (listTabs.default)
      return (
        <tbody>
          {filterdata?.map((item) => {
            if (item.autoPlan)
              return (
                <tr>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{`${item.name}`}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{`${item.description}`}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{formatNewDate(item.assignDate)}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{item.duration} days</td>
                  <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                    <div className="d-flex gap-1">
                      <button onClick={() => navigate("/careplaninfo", { state: { careplan: item } })} className="btn btn-light"><AiFillEye className="mb-1" /></button>
                      <button onClick={() => { navigate("/editplan", { state: { careplan: item } }) }} className="btn btn-light"><FiEdit className="mb-1" /></button>
                      <Dropdown>
                        <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                          <BsThreeDots className="icon" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {/* <Dropdown.Item onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>View</Dropdown.Item> */}
                          <Dropdown.Item data-bs-toggle="modal" data-bs-target="#assignclientsmodal1" onClick={() => { setSelectedCarePlan(item); setCareClients(item.clients) }}>Assign to members</Dropdown.Item>
                          <Dropdown.Item data-bs-toggle="modal" data-bs-target="#assigngroupsmodal1" onClick={() => { setSelectedCarePlan(item); setCareGroups(item.groups.map((dt) => { return dt._id })) }}>Assign to groups</Dropdown.Item>
                          {/* <Dropdown.Item onClick={() => { navigate("/editplan", { state: { careplan: item } }) }}>Edit</Dropdown.Item> */}
                          {isAdmin ?
                            <Dropdown.Item href="#/action-2" onClick={() => makeDefault(item._id)}>{item.autoPlan === true ? 'Remove as Default' : 'Make Default'}</Dropdown.Item>
                            : null}
                          <Dropdown.Item href="#/action-3" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => getShareLink(item._id)}>Share Link</Dropdown.Item>
                          <Dropdown.Item onClick={() => { navigate("/plantemplate", { state: { careplan: item } }) }}>Use as Template</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              )
          })}

        </tbody>
      )

    if (listTabs.archived)
      return (
        <tbody>
          {filterdata?.map((item) => {
            if (isPast(addDays(parseISO(item.assignDate), +item.duration)))
              return (
                <tr>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{`${item.name}`}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{`${item.description}`}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{formatNewDate(item.assignDate)}</td>
                  <td className="text-muted" onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>{item.duration} days</td>
                  <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                        <BsThreeDots className="icon" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("/careplaninfo", { state: { careplan: item } })}>View</Dropdown.Item>
                        <Dropdown.Item data-bs-toggle="modal" data-bs-target="#assignclientsmodal1" onClick={() => { setSelectedCarePlan(item); setCareClients(item.clients) }}>Assign to members</Dropdown.Item>
                        <Dropdown.Item data-bs-toggle="modal" data-bs-target="#assigngroupsmodal1" onClick={() => { setSelectedCarePlan(item); setCareGroups(item.groups.map((dt) => { return dt._id })) }}>Assign to groups</Dropdown.Item>
                        <Dropdown.Item onClick={() => { navigate("/editplan", { state: { careplan: item } }) }}>Edit</Dropdown.Item>
                        {isAdmin ?
                          <Dropdown.Item href="#/action-2" onClick={() => makeDefault(item._id)}>{item.autoPlan === true ? 'Remove as Default' : 'Make Default'}</Dropdown.Item>
                          : null}
                        <Dropdown.Item href="#/action-3" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => getShareLink(item._id)}>Share Link</Dropdown.Item>
                        <Dropdown.Item onClick={() => { navigate("/plantemplate", { state: { careplan: item } }) }}>Use as Template</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )
          })}

        </tbody>
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
            {/* <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate('/')}
                className="icon"
              />
              care plans
            </p> */}
            {/* <div className="container"> */}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Dashboard</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Care Plans</li>
              </ol>
            </nav>
            <div className="row">
              <div className="col-md-12">
                <div className="mt-5 px-2" style={{ height: "486px" }}>
                  {renderSearchHeader()}
                  <div className="mt-4 pb-2">
                    <div className="custom-tabs border-bottom d-flex">
                      <p onClick={() => { setListTabs(prev => { return { prev, active: true } }); getCarePlanList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.active && 'active'}`}>Active</p>
                      <p onClick={() => { setListTabs(prev => { return { prev, default: true } }); getDefaultCarePlanList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.default && 'active'}`}>Default</p>
                      <p onClick={() => { setListTabs(prev => { return { prev, archived: true } }); getCarePlanList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.archived && 'active'}`}>Archived</p>
                    </div>
                    {/* Active Tab */}
                    {listTabs.active && <table class="table table-hover">
                      <thead>
                        <tr>
                          <td className="py-4" scope="col text-secondary">Title</td>
                          <td className="py-4" scope="col text-secondary">Description</td>
                          <td className="py-4" scope="col text-secondary">Assign Date</td>
                          <td className="py-4" scope="col text-secondary">Duration</td>
                          <td className="py-4" scope="col text-secondary">Action</td>
                        </tr>
                      </thead>
                      {renderList()}
                    </table>}
                    {/* default tabs */}
                    {listTabs.default && <table class="table table-hover">
                      <thead>
                        <tr>
                          <td className="py-4" scope="col text-secondary">Title</td>
                          <td className="py-4" scope="col text-secondary">Description</td>
                          <td className="py-4" scope="col text-secondary">Created</td>
                          <td className="py-4" scope="col text-secondary">Duration</td>
                          <td className="py-4" scope="col text-secondary">Action</td>
                        </tr>
                      </thead>
                      {renderList()}
                    </table>}
                    {/* Archived Tab */}
                    {listTabs.archived && <table class="table table-hover">
                      <thead>
                        <tr>
                          <td className="py-4" scope="col text-secondary">Title</td>
                          <td className="py-4" scope="col text-secondary">Description</td>
                          <td className="py-4" scope="col text-secondary">Created</td>
                          <td className="py-4" scope="col text-secondary">Duration</td>
                          <td className="py-4" scope="col text-secondary">Action</td>
                        </tr>
                      </thead>
                      {renderList()}
                      {/* <tbody>
                          {list?.map((item) => renderListRow(item))}
                        </tbody> */}
                    </table>}

                    <ShareLinkModal link={linkInput} />

                    <AssignToClients addMember={updateMembers} members={careClients} setMembers={setCareClients} />
                    <AssignToGroups addMember={updateGroups} members={careGroups} setMembers={setCareGroups} />

                    {!filterdata?.length ? listTabs.archived ? renderArchivedLoader() : renderLoader() : null}

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

export default CarePlan_;
