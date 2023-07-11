import React, { useEffect, useRef, useState } from 'react'
import { deleteMealPlanService, getMealPlansListService } from '../../services/PatientService';
import Loader from "../../commonComponent/Loader";
import PaginationComponent from '../../commonComponent/PaginationComponent';
import AssignMealPlanModal from './AssignMealPlanModal';
import DeleteModal from '../../commonComponent/DeleteModal';
import { showToastError, showToastSuccess } from '../../Utils/Helper';
import { useAuth } from '../../Context/AuthContext';

let selectedDeleteMealPlan = '';

let selectedPage = 0;

function MealPlanTable({ toggleApi }) {
    const auth = useAuth();

    const paginationRef = useRef(null);

    const [list, setList] = useState([])
    const [loader, setLoader] = useState(true)
    const [pageSizeState, setPageSizeState] = useState(5);
    const [assigneId, setAssigneId] = useState("");
    const [totalRecords, setTotalRecord] = useState(0);

    const getMealPlanList = async (page, limit) => {
        try {
            selectedPage = page;
            const response = await getMealPlansListService(page, limit)
            if (response.data.data) {
                setList(response.data?.data?.mealPlanList || []);
                setTotalRecord(response.data?.data?.Numberofmealplans || 0);
                setLoader(false)
            } else {
                setLoader(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMealPlan = async () => {
        try {
            const response = await deleteMealPlanService(selectedDeleteMealPlan._id);
            if (response) {
                selectedPage = list.length === 1 && totalRecords > 0 ? selectedPage - 1 : selectedPage;
                getMealPlanList(selectedPage, pageSizeState);
                paginationRef.current.jumpToPage(0)
                showToastSuccess(response?.data || 'Meal plan deleted successfully.');
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
        }
    }

    useEffect(() => {
        getMealPlanList(0, pageSizeState)
    }, [toggleApi])

    return (
        <>
            <div className='table_resouter'>
                <table className="table appointment_table table_resinner2 mt-5">
                    <thead>
                        <tr className="">
                            <th scope="col" className='px-3' >Meal Plan Name</th>
                            <th scope="col" className='mealplan_table'>Meal Plan Pdf</th>
                            <th scope="col" className='mealplan_table' style={{ paddingLeft: "35px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="mb-5">
                        {list.length ? list?.map(dt => {
                            return <tr key={dt._id} className=" mt-5">
                                <td className="px-3">
                                    <div className='mealplan_name_td'>
                                        {dt?.mealPlanName}
                                    </div>
                                </td>
                                <td>
                                    <div className='mealPlan_file_td'>
                                        <a href={`${dt?.mealPlanFile}`} className="text-lowercase" target="_blank" rel="noreffer nofollow">{dt?.mealPlanFile}</a>
                                    </div>
                                </td>
                                <td>
                                    <button className="start_call" data-bs-toggle="modal"
                                        data-bs-target="#assignMealPlanModal" onClick={() => {
                                            setAssigneId(dt?._id)
                                        }}>
                                        <span>Assign Meal Plan</span>
                                    </button>
                                    <DeleteModal
                                        title={'Delete'}
                                        content1={'Are you sure you want to delete'}
                                        content2={'this meal plan?'}
                                        modalId={'deleteSession'}
                                        button2={'No'}
                                        button1={'Yes'}
                                        onDelete={() => deleteMealPlan()} />
                                    {auth?.authUser?._id === dt?.docId ? <button
                                        className="start_call"
                                        style={{ backgroundColor: '#d81010', marginLeft: 10 }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteSession"
                                        onClick={() => {
                                            selectedDeleteMealPlan = dt;
                                        }}>
                                        <span>{'Delete'}</span>
                                    </button> : null}
                                </td>
                            </tr>
                        }) : null}
                        {list.length ? null :
                            <tr>
                                <td colSpan={3}>
                                    <Loader visible={loader} set textClassName={`mt-0 text-center`} showBR={false} emptyTextKey={`noData`} mainClassName={`d-flex justify-content-center align-items-center active_n0data2`} />
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <PaginationComponent
                onPageChange={(page, currentData, lastpage) => {
                    getMealPlanList(page - 1, pageSizeState)
                }}
                ref={paginationRef}
                pageSize={pageSizeState}
                handleSizeChange={(value) => {
                    setPageSizeState(value)
                }}
                renderSize={[5, 10, 20, 30]}
                showEntires={true}
                totalRecords={totalRecords}
            />
            <AssignMealPlanModal assigneId={assigneId} setAssigneId={setAssigneId} />
        </>
    )
}

export default MealPlanTable