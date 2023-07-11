import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const CareTaskList = ({ item, deleteGoal }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="col-md-12">
                <div className="care_textdiv">
                    <p className="care_title">{item.name}</p>
                    <div className="row">
                        <div className="col-md-7 forum_wid3 ">
                            <div className="table_resouter">
                                <table class="table table-borderless table_resinner4">
                                    <thead>
                                    </thead>
                                    <tbody>
                                        <tr className="goal_table">
                                            {/* <td>{`Start date ${item.start_date}`}</td> */}
                                            <td>Frequency</td>
                                            <td>{item.frequency}</td>
                                            <td>Task SLA</td>
                                            <td>{item.sla}</td>
                                        </tr>
                                        <tr className="goal_table2">
                                            {/* <td>{`End date ${item.end_date}`}</td> */}
                                            <td>Status</td>
                                            <td className="active_care"><GoPrimitiveDot />{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</td>
                                            <td>Assignee</td>
                                            <td>{item.assignBy}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <p>
                                <button onClick={() => navigate('/careplantaskedit', { state: { carePlanTaskDetail: item } })} className="care_icons"><FaEdit size={25} /></button>
                                {/* <button onClick={() => deleteGoal(item._id)} className="care_icons"><FaTrashAlt size={25} /></button> */}
                                <button className="care_icons">
                                    <input checked={item.status === 'active' || false} className="checkbox_care" type="checkbox" value="" id="flexCheckChecked" />
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CareTaskList;