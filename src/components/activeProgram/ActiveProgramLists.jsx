import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Loader from "../../commonComponent/Loader";
import { setGroupList } from "../../Reducer/actions/groupAction";
import { getActiveProgram } from "../../services/ActivePrograms";
import { getMyGroupList } from "../../services/GroupService";


const ProgramLists = forwardRef((props, ref) => {
    const [programLists, setProgramLists] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const dispatch = useDispatch();
    // Server Methods
    useImperativeHandle(ref, () => ({
        async getProgramLists(searchWord) {
            try {
                const response = await getActiveProgram(searchWord);
                setLoader(false);
                if (response.status === 200) {
                    setProgramLists(response?.data?.data);
                    setFilterData(response?.data?.data);
                    // if (props.selectedProgram == "") props.onselectprogram(response.data.data[0]);
                    // else props.onselectgroup(response.data.data.filter(dt => dt._id == props.selectedGroup._id)[0])
                    // dispatch(setGroupList(response.data.data));
                }
            } catch (error) {
                setLoader(false);
                console.log(error);
            }
        }
    }));

    // useEffect(() => {
    //     getGroupLists();
    // }, [])



    const onProgramSearch = async (e) => {
        let searchWord = e.target.value;
        const result = programLists?.filter((value) => {
            if (value) {
                console.log(value, "value")
                return (
                    value?.programName?.toLowerCase()?.includes(searchWord?.toLowerCase())
                );
            }
        });

        if (searchWord === "") {
            setFilterData(programLists);
            // getGroupLists(searchWord);
        } else {
            setFilterData(result);
        }
    };

    return (
        <>
            <div className="memberside_list" style={{ height: "84vh" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="actsearch_box1">
                            <FiSearch className="boxicon" />
                            <input
                                placeholder="Search Groups"
                                onChange={(e) => onProgramSearch(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="memlist_scroll mt-4 spacing_scroll">

                            {isLoading ? (
                                <center>
                                    {/* <div
                                            style={{
                                              width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                                              position: "relative"
                                            }}
                                            class="spinner-border mt-3 mb-4"
                                            role="status"
                                          /> */}

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
                                                className={`card mb-2 p-1 ${props?.selectedProgram?._id == dt?._id ? "active" : ""}`}
                                                onClick={(e) => {
                                                    props.onselectprogram(dt);
                                                    // activeSelection(e);
                                                }}
                                                id={dt._id}
                                            >
                                                <div className="row">
                                                    <div className="col-md-4 p-0 actlist_wid1 d-flex justify-content-center align-items-center">
                                                        <img src={dt.programImage && dt.programImage} onError={(e) => {
                                                            e.target.src = "images/avatar.png" //replacement image imported above
                                                        }} alt="" className="member_listimage" />
                                                    </div>
                                                    <div className="col-md-8 actlist_wid2 p-0">
                                                        <p className="mb-0 py-3">
                                                            {`${dt.programName}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <h4 class="mt-5 text-center message_headfour34">Please add active program...</h4>

                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default ProgramLists;
