import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../commonComponent/Loader";

const MealPlanView = () => {
    let location = useLocation();
    let carePlan = location.state.plan;
    const navigate = useNavigate();
    const [isLoading, setLoader] = useState(false);
    const renderLoader = () => {
        return (
            <Loader
                visible={isLoading}
                emptyTextKey={'pleaseAddMealPlan'}
                style={{ top: 0, left: 35, position: "relative" }} />
        )
    }
    const renderList = () => {
        return (
            <tbody>

                {carePlan?.mealPlan?.mealPlanName ?
                    <tr>
                        <td className="text-muted">{carePlan?.mealPlan?.mealPlanName}</td>
                    </tr>
                    : renderLoader()}
            </tbody>
        )
    }

    const renderForm = () => {
        return (
            <>
                <div className="mt-5">
                    <h4>Meal Plan</h4>
                    <p>View client meal plan.</p>
                </div>
                <div className="col-md-12 mt-4">
                    {/* <p className="whole_label  ">Meal Plan <span className="text-lowercase">list: </span></p> */}
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <td className="py-4" scope="col text-secondary">Meal Plan Name</td>
                                {/* <td className="py-4" scope="col text-secondary">Quantity</td>
                                <td className="py-4" scope="col text-secondary">Schedule</td>
                                <td className="py-4" scope="col text-secondary">Time</td> */}
                            </tr>
                        </thead>
                        {renderList()}
                        {/* {!allFormData.length ? renderLoader() : renderList()} */}
                    </table>

                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>{carePlan?.name}</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Meal Plan</li>
                            </ol>
                        </nav>
                        {/* <div className="container" style={{ marginBottom: 100 }}>
                            <div className="row justify-content-start">
                                {renderForm()}
                            </div>
                        </div> */}
                        {renderForm()}
                        <div className="col-md-12 mt-5">
                            <hr />
                            <div className="d-flex justify-content-between">
                                <div text={'Back'} style={isLoading ? { cursor: 'none' } : { cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => navigate(-1)}>Back</div>
                                <button isLoading={isLoading} type="submit" id="reateProgram" text={'Save & Continue'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave" onClick={() => { navigate("/editplan", { state: { careplan: carePlan } }) }}>Add Meal Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MealPlanView;
