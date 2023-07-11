import { parseISO, format } from "date-fns";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Dropdown } from "react-bootstrap";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit, FiSearch } from "react-icons/fi";
import { MdPreview } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../../commonComponent/DeleteModal";
import Loader from "../../commonComponent/Loader";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { useAuth } from "../../Context/AuthContext";
import { setGroupList } from "../../Reducer/actions/groupAction";
import { deleteGroupService, getDefaultGroup, getGroupShareLink, getMyGroupList, setDefaultGroup } from "../../services/GroupService";
import { changeDateFormat, showToastError, showToastSuccess} from "../../Utils/Helper";
import ShareLinkModal from "../carePlan_/ShareLinkModal";
import AddMemberModal from "./AddMemberModal";
import ApiConfig from "../../config/ApiConfig";


const GroupLists = (props, ref) => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [groupLists, setGroupLists] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [listTabs, setListTabs] = useState({
        "active": true,
        "archived": false,
        "default": false,
    });
    const [selectedGroupID, setSelectedGroupID] = useState()
    const [gID, setGID] = useState("")
    const [linkInput, setLinkInput] = useState("");
    // console.log(careplanId.careplanId, "careplanIdForm")
    const getShareLink = async (groupId) => {
        try {
        const response = await getGroupShareLink(groupId);
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

    const makeDefault = async (groupId) => {
        try {
            const response = await setDefaultGroup(groupId);
            if (response.status === 200) {
            // document.getElementById("checkbox").checked = true;
            listTabs.default ? getDefaultGroupList() : getGroupLists()
            showToastSuccess(`Action completed successfully`)
            // renderListRow();

            } else {
            showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // To get All default program list
  const getDefaultGroupList = async () => {
        setLoader(true)
        setFilterData([])
        
        try {
        const response = await getDefaultGroup();
        setLoader(false)
        if (response.status === 200) {
            setGroupLists(response?.data?.data);
            setFilterData(response?.data?.data)
            // console.log(response?.data?.data, "default")
            // Check whether to is from create program or not if yes then will navigate to active program tab module
            // if (newCreatedProgramId) {
            //   const program = response?.data?.data?.find(item => item._id === newCreatedProgramId)
            //   program && navigate("/activeprogram", { state: { program, isFromCreate: true } });
            // } else {
            //   if (!userId) {
            //     navigate(`/activeprogramlist/${response?.data?.data?.[0]._id}`, { replace: true })
            //   }
            // }

        }
        } catch (error) {
        setLoader(false)
        }
    };
    const dispatch = useDispatch();
    // Server Methods
    const getGroupLists = async (searchWord) => {
        setLoader(true)
        setFilterData([])

        try {
            const response = await getMyGroupList(searchWord);
            setLoader(false);
            if (response.status === 200) {
                setGroupLists(response?.data?.data);
                setFilterData(response?.data?.data);
                if (props.selectedGroup == "") props.onselectgroup(response.data.data[0]);
                else props.onselectgroup(response.data.data.filter(dt => dt._id == props.selectedGroup._id)[0])
                dispatch(setGroupList(response.data.data));
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getGroupLists();
    }, [])

    const renderListRow = (item) => {
        // console.log(item, "item")
        return (
          <tr key={item._id}>
            <td className="text-muted" onClick={() => navigate("/groupactivities", { state: { selectedGroup: item, isFromCreate: false } })}><SquareAvatar
            //   src={item.groupImage}
            src={ApiConfig.ImageUrl + 'groups/' + item.createdBy + '/' + item.groupImage}
              className="member_listimage squre_image2"
            /></td>
            <td className="text-muted" onClick={() => navigate("/groupactivities", { state: { selectedGroup: item, isFromCreate: false } })}>{`${item.groupName}`}</td>
            <td className="text-muted" onClick={() => navigate("/groupactivities", { state: { selectedGroup: item, isFromCreate: false } })}>{`${item.description}`}</td>
            <td className="text-muted" onClick={() => navigate("/groupactivities", { state: { selectedGroup: item, isFromCreate: false } })}>{changeDateFormat(item.createdAt)}</td>
            {/* <td className="text-muted">{format(parseISO(item.endDate), 'MMM d, yyyy')}</td> */}
            {/* <td className="text-muted">{`${item.programMembers?.length}`}</td> */}
            <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                {/* <span className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="View" onClick={() => navigate("/groupinfo", { state: { selectedGroup: item } })}><MdPreview size="1.5em" /> </span> */}
                {/* <span className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onClick={() => navigate("/groupactivities", { state: { selectedGroup: item, isFromCreate: false } })}><RiEdit2Fill size="1.5em" /></span> */}
                <div className="d-flex gap-1">
                    <button onClick={() => navigate("/groupactivities", { state: { selectedGroup: item, isFromCreate: false } })} className="btn btn-light"><AiFillEye className="mb-1" /></button>
                    <button onClick={() => navigate("/groupupdate", { state: { user: item } })} className="btn btn-light"><FiEdit className="mb-1" /></button>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                            <BsThreeDots className="icon" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* <Dropdown.Item onClick={() => navigate("/groupupdate", { state: { user: item } })}>Edit</Dropdown.Item> */}
                            {isAdmin ?
                            <Dropdown.Item href="#/action-2" onClick={() => makeDefault(item._id)}>{item.default === true ? 'Remove as Default' : 'Make Default'}</Dropdown.Item>
                            : null}
                            <Dropdown.Item href="#/action-3" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => getShareLink(item._id)}>Share Link</Dropdown.Item>
                            <Dropdown.Item href="#/action-4" data-bs-toggle="modal" data-bs-target="#deleteGroup" onClick={() => setGID(item._id)}>Delete</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </td>
          </tr>
          // </div>
        )
      }
    
    
      const renderLoader = () => {
        return (
          <Loader
            visible={isLoading}
            emptyTextKey={'noAnyGroup'}
            style={{ top: 0, position: "relative" }} />
        )
      }
    
      const renderList = () => {
        return (
          <tbody>
            {filterdata?.map((item) => renderListRow(item))}
          </tbody>
        )
      }



    const onGroupSearch = async (e) => {
        let searchWord = e.target.value;
        const result = groupLists?.filter((value) => {
            if (value) {
                console.log(value, "value")
                return (
                    value?.groupName?.toLowerCase()?.includes(searchWord?.toLowerCase())
                );
            }
        });

        if (searchWord === "") {
            setFilterData(groupLists);
            // getGroupLists(searchWord);
        } else {
            setFilterData(result);
        }
    };


    // const updateGroup = async () => {
    //     try {
    //         const response = await updateGroupService(selectedGroupID, {
    //         ...user,
    //         groupMembers: [...user?.groupMembers, ...selectedGroupMembers]
    //         });
    //         if (response) {
    //         showToastSuccess(toastMsg.updateGroup)
    //         // props.onRefresh()
    //         setSelectedGroupMembers([]);
    //         }
    //         setLoader(false);
    //     } catch (error) {
    //         setLoader(false);
    //         console.log(error);
    //     }
    // };

    const deleteGroup = async (id) => {
        try {
            const response = await deleteGroupService(id);
            if (response) {
            showToastSuccess(response?.data || 'Group deleted successfully.');
            // onRefresh();
            // navigate(-1);
            // getSessionById()
            listTabs.active ? getGroupLists() : getDefaultGroupList()
            } else {
            showToastError(response?.data || response.message || "Some error occurred")

            // navigate(-1);
            }
        } catch (error) {
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            // navigate(-1);
        }
    }

    const renderSearchHeader = () => {
        return (
            <div className="d-flex mt-5 mb-3 ">
            <div className="w-50">
                <h4>Groups</h4>
                <p>See how your groups are doing</p>
            </div>
            <div className="w-50 d-flex">
                <div className="actsearch_simple me-2">
                <FiSearch className="boxicon" />
                <input
                    placeholder="Search for group..."
                    className="ms-2"
                    // value={searchText}
                    onChange={(e) => onGroupSearch(e)} />
                </div>
                <Link
                to="/groupadd"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add Group"
                className="btn btn-primary btn-custom">
                <AiOutlinePlus className="me-2" /> Create New Group
                </Link>
            </div>
            </div>
        )
    }

    return (
        <>
        {renderSearchHeader()}
        <ShareLinkModal link={linkInput} />
        <DeleteModal
        title={'Delete'}
        content1={'Are you sure you want to delete'}
        content2={'this group?'}
        modalId={'deleteGroup'}
        button2={'No'}
        button1={'Yes'}
        onDelete={() => deleteGroup(gID)}
        />
        {/* <AddMemberModal addMember={updateGroup} members={user?.groupMembers} setMembers={setSelectedGroupMembers} /> */}
        <div className="mt-4">
          <div className="custom-tabs border-bottom d-flex">
            <p onClick={() => {setListTabs(prev => { return { prev, active: true } }); getGroupLists();}} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.active && 'active'}`}>Active</p>
            <p onClick={() => { setListTabs(prev => { return { prev, default: true } }); getDefaultGroupList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.default && 'active'}`}>Default</p>
            <p onClick={() => setListTabs(prev => { return { prev, archived: true } })} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.archived && 'active'}`}>Archived</p>
          </div>

          {/* Active Tab */}
          {listTabs.active && <table class="table table-hover">
            <thead>
              <tr>
                <td className="py-4" scope="col text-secondary">Thumbnail</td>
                <td className="py-4" scope="col text-secondary">Group Title</td>
                <td className="py-4" scope="col text-secondary">Group Description</td>
                <td className="py-4" scope="col text-secondary">Created At</td>
                <td className="py-4" scope="col text-secondary">Action</td>
              </tr>
            </thead>
            {renderList()}
          </table>}
          
          {/* Default Tab */}
          {listTabs.default && <table class="table table-hover">
            <thead>
              <tr>
                <td className="py-4" scope="col text-secondary">Thumbnail</td>
                <td className="py-4" scope="col text-secondary">Group Title</td>
                <td className="py-4" scope="col text-secondary">Group Description</td>
                <td className="py-4" scope="col text-secondary">Created At</td>
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
                <td className="py-4" scope="col text-secondary">Group Title</td>
                <td className="py-4" scope="col text-secondary">Group Description</td>
                <td className="py-4" scope="col text-secondary">Created At</td>
                <td className="py-4" scope="col text-secondary">Action</td>
              </tr>
            </thead>
            <tbody>
              {/* {filterdata?.map((item) => renderListRow(item))} */}
            </tbody>
          </table>}

          {!filterdata?.length ? renderLoader() : null}
        </div>


            {/* <div className="memberside_list" style={{ height: "84vh" }}> */}
                {/* <div className="row">
                    <div className="col-md-12">
                        <div className="actsearch_box1">
                            <FiSearch className="boxicon" />
                            <input
                                placeholder="Search Groups"
                                onChange={(e) => onGroupSearch(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="memlist_scroll mt-4 spacing_scroll">

                            {isLoading ? (
                                <center>

                                    <Loader
                                        visible={isLoading}
                                        style={{ top: "48px", position: "relative" }}
                                    />
                                </center>
                            ) :
                                filterdata?.length ? (
                                    filterdata?.map((dt, index) => {
                                        console.log(filterdata, "groupLists")
                                        return (
                                            <div
                                                key={dt?._id}
                                                // className="shadow-sm border ms-2 rounded mb-3 p-1"
                                                // onClick={() => {
                                                // }}
                                                className={`card mb-2 p-1 ${props?.selectedGroup?._id == dt?._id ? "active" : ""}`}
                                                onClick={(e) => {
                                                    props.onselectgroup(dt);
                                                    // activeSelection(e);
                                                }}
                                                id={dt._id}
                                            >
                                                <div className="row">
                                                    <div className="col-md-4 p-0 actlist_wid1 d-flex justify-content-center align-items-center">
                                                        <img src={dt.groupImage && dt.groupImage} onError={(e) => {
                                                            e.target.src = "images/avatar.png" //replacement image imported above
                                                        }} alt="" className="member_listimage" />
                                                    </div>
                                                    <div className="col-md-8 actlist_wid2 p-0">
                                                        <p className="mb-0 py-3">
                                                            {`${dt.groupName}`}
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
                    </div>
                </div> */}
            {/* </div> */}
        </>
    );
}

export default GroupLists;
