import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Select, { components } from "react-select";
import { AiOutlineMinus, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { recipeTags } from "../../Utils/AllConstant";
import { IoIosArrowBack } from "react-icons/io";
import {
    addMealPlanDaysService,
    addMealPlanDetailService,
    addMealPlanService,
    getMealPlanAvailableService,
    getMealPlanDetailService,
    getMealPlanListService,
    getRecipeListService,
    updateMealPlanService,
} from "../../services/MealService";
import { toastMsg } from "../../Utils/AllConstant";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import Loader from "../../commonComponent/Loader";
import { showToastSuccess } from "../../Utils/Helper";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BlogEditorComponent } from "../blog/BlogEditor";
import { useAuth } from "../../Context/AuthContext";
import ApiConfig from "../../config/ApiConfig";

const AddNewMealPlan = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { isAdmin } = useAuth();
    const [mealPlanList, setMealPlanList] = useState([]);
    const mealPlanId = params.get("mealplanId");
    const [selectedTab, setSelectedTab] = useState(parseInt(params.get("tab") ? params.get("tab") : 0));
    const [updateMealPlan, setUpdateMealPlan] = useState({
        mealPlanName: "",
        description: "",
        tags: [],
    });

    const [selectedMealPlan, setSelectedMealPlan] = useState("");
    const [mealPlanDetail, setMealPlanDetail] = useState("");
    const [isLoading, setLoader] = useState(true);
    const [selectedRecipeList, setSelectedRecipeList] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [selectedRecipeCategoryModel, setSelectedRecipeCategoryModel] =
        useState("");
    const [error, setError] = useState(false);
    const [mealPlanName, setMealPlanName] = useState("");
    const [mealPlanNameAvailable, setMealPlanNameAvailable] = useState(false);

    useEffect(() => {
        getMealPlanList("firstTimeOnly");
    }, []);

    console.log(mealPlanDetail, "mealPlanDetail");

    const getMealPlanList = async (firstTimeOnly) => {
        try {
            const response = await getMealPlanListService();
            setLoader(false);
            if (response) {
                setMealPlanList(response || []);
                if (mealPlanId && firstTimeOnly) {
                    const mealPlan = response?.find((item) => item._id === mealPlanId);
                    console.log(mealPlan.tags);
                    setSelectedMealPlan({
                        value: mealPlanId,
                        label: mealPlan.mealPlanName,
                    });

                    setUpdateMealPlan({
                        mealPlanName: mealPlan.mealPlanName,
                        description: mealPlan.description,
                        tags: mealPlan.tags.map(dt => { return { "label": dt, "value": dt } }),
                    });

                    getMealPlanDetail(mealPlanId);
                    //   setSelectedTab(0)
                }
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const getMealPlanDetail = async (mealPlanId) => {
        try {
            const response = await getMealPlanDetailService(mealPlanId);
            if (response) {
                setMealPlanDetail(response?.[0]?.mealPlan);
            }
        } catch (error) { }
    };
    const renderTabList = () => {
        return (
            <TabList className="mealcustom-list">
                {mealPlanDetail?.map((item) => {
                    return <Tab>{"Day " + item.day}</Tab>;
                })}
            </TabList>
        );
    };

    const renderTabPanel = () => {
        return mealPlanDetail?.map((item) => {
            return (
                <TabPanel>
                    <div className="row">
                        {renderTabItem(item.breakfast, item.day, "breakfast", "Breakfast")}
                        {renderTabItem(item.lunch, item.day, "lunch", "Lunch")}
                        {renderTabItem(item.dinner, item.day, "dinner", "Dinner")}
                        {renderTabItem(item.snacks, item.day, "snacks", "Snacks")}
                    </div>
                </TabPanel>
            );
        });
    };

    const renderTabItem = (items, day, category, title) => {
        return (
            <div className="col-md-6 pb-4">
                <div className="card shadow border-0 p-3 d-flex h-100">
                    <div className="d-flex justify-content-between mb-4">
                        <h5 className="card-title">{title}</h5>

                        {
                            <button
                                onClick={() => {
                                    getMealPlanRecipe(category, day, items);
                                    setSelectedRecipeList("");
                                }}
                                className="btn btn-primary btn-sm"
                                style={{ backgroundColor: "#1f7e78", borderColor: "#1f7e78", width: "65px" }}
                                data-bs-toggle="modal"
                                data-bs-target="#recipelist"
                            >
                                {items?.length === 0 ? (
                                    <>
                                        <AiOutlinePlusCircle style={{ marginTop: -3 }} /> Add
                                    </>
                                ) : (
                                    "Swap"
                                )}
                            </button>
                        }
                    </div>
                    {items?.length ? (
                        items?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="d-flex mb-3 px-3 align-items-center flex-row py-2 card"
                                >
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={ApiConfig.recipeImageUrl + item.createdBy + "/" + item.recipeImage}
                                            onError={(e) => {
                                                e.target.src = "images/cookie.png"; //replacement image imported above
                                            }}
                                            className="recipe_image_ rounded-3 me-4"
                                            alt=""
                                        />
                                        <p className="m-0 text-capitalize">{item.recipeName}</p>
                                    </div>
                                    {
                                        <>
                                            <div style={{ position: "absolute", right: "15px" }}>
                                                <Link
                                                    className="eye_viewmplan"
                                                    to={`/viewrecipe?recipeId=${item._id}`}
                                                    state={{ "mealplan": true }}
                                                >
                                                    <BsFillEyeFill className="icon" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        removeMealPlanDetail(category, day, index)
                                                    }
                                                    className="btn btn-outline-danger btn-sm rounded-circle"
                                                >
                                                    <AiOutlineMinus style={{ marginTop: -3 }} />
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            );
                        })
                    ) : (
                        <div className="d-flex mb-3 px-3 align-items-center justify-content-center flex-row py-2">
                            <p className="m-0 text-capitalize text-secondary">
                                Add new recipe...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderModelAddRecipe = () => {
        return (
            <div
                className="modal fade"
                id="recipelist"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content chooselist_mdiv8">
                        <div className="modal-header px-4">
                            <h5 className="modal-title text-center">{(mealPlanDetail.length>0 && mealPlanDetail[selectedTab][selectedRecipeCategoryModel?.category]?.length===1) ? "Swap recipe" : "Add new recipe"}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="row">
                                <div className="col-md-12 recipe-select">
                                    <Select
                                        // closeMenuOnSelect={false}
                                        isMulti
                                        value={selectedRecipeList}
                                        placeholder="Please Select Recipes"
                                        options={formatList(recipeList, "_id", "recipeName")}
                                        onChange={(data) => setSelectedRecipeList(data)}
                                    />

                                    <button
                                        onClick={() =>
                                            selectedRecipeList.length === 1 && addMealPlanDetail()
                                        }
                                        className="btn btn-primary btn-custom btn-lg w-100 mb-4 mt-4"
                                        data-bs-dismiss="modal"
                                        disabled={selectedRecipeList?.length !== 1}
                                        // style={{
                                        //     backgroundColor: selectedRecipeList?.length === 1
                                        //         ? "#0956C6"
                                        //         : "#d2d2d2",
                                        //     borderColor: selectedRecipeList?.length === 1
                                        //         ? "#0956C6"
                                        //         : "#d2d2d2",
                                        // }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getMealPlanRecipe = async (category, day, mealPlan) => {
        try {
            setSelectedRecipeCategoryModel({ category, day, mealPlan });
            const response = await getRecipeListService({
                category,
                recipeArray: mealPlan || [],
            });
            if (response) {
                setRecipeList(response);
            }
        } catch (error) { }
    };

    const removeMealPlanDetail = async (category, day, itemIndex) => {
        try {
            let params = {}
            const removedItemResult = mealPlanDetail[selectedTab]?.[category].splice(itemIndex, 1)
            const leftRecipeResultId = mealPlanDetail[selectedTab]?.[category]?.map((list) => {
                return list._id
                // console.log(list._id, "item3")
            })
            params = {
                "mealPlanId": selectedMealPlan.value,
                "day": day,
                [category]: leftRecipeResultId,
            };

            const response = await addMealPlanDetailService(params);
            if (response) {
                showToastSuccess(response);
                getMealPlanDetail(selectedMealPlan.value);
            }
        } catch (error) { }
    };

    const formatList = (list, valueKey, labelKey) => {
        const result = list?.map((item) => {
            return {
                value: item[valueKey],
                label: item[labelKey],
            };
        });
        return result || [];
    };

    const addMealPlanDays = async () => {
        try {
            const response = await addMealPlanDaysService({
                mealPlanId: selectedMealPlan.value,
            });
            if (response) {
                showToastSuccess("Day added successfully.");
                getMealPlanDetail(selectedMealPlan.value);
            }
        } catch (error) { }
    };

    const addMealPlanName = async () => {
        try {
            const params = {
                mealPlanName: mealPlanName.toLocaleLowerCase(),
                mealfile: "mealfile",
            };
            const response = await addMealPlanService(params);
            setLoader(false);
            setMealPlanName("");
            if (response) {
                getMealPlanList();
                showToastSuccess("Meal plan successfully added.");
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const addMealPlanDetail = async () => {
        try {
            let params = {};
            const selectedRecipeResult = selectedRecipeList?.map((list) => {
                // console.log(list, "item")
                const recipe = recipeList?.find((item) => item._id === list.value);
                return recipe;
            });
            const selectedRecipeResultId = selectedRecipeResult?.map((list) => {
                return list._id;
                // console.log(list._id, "item3")
            });
            // console.log(selectedRecipeResultId, "item1")
            params = {
                mealPlanId: selectedMealPlan.value,
                day: selectedRecipeCategoryModel.day,
                [selectedRecipeCategoryModel.category]: [...selectedRecipeResultId],
            };
            const response = await addMealPlanDetailService(params);
            if (response) {
                showToastSuccess(response);
                getMealPlanDetail(selectedMealPlan.value);
            }
        } catch (error) { }
    };

    const onChangeDetail = (key, value) => {
        setUpdateMealPlan({ ...updateMealPlan, [key]: value });
    };

    const getRecipeTags = () => {
        const result = recipeTags.map((item) => {
            return {
                label: item,
                value: item,
            };
        });
        return result || [];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = {
                mealPlanName: updateMealPlan.mealPlanName,
                description: updateMealPlan.description,
                tags: updateMealPlan.tags.map(dt => dt.value),
            };
            if (
                !params.mealPlanName || params.mealPlanName === "" ||
                !params.description ||
                params.description === "<p><br></p>" ||
                !params.tags.length
            ) {
                setError(true);
                return;
            }
            const response = await addMealPlanService(params);;
            if (response) {
                showToastSuccess(toastMsg.updateMealPlan);
                getMealPlanList("firstTimeOnly");
                setSelectedMealPlan({
                    value: response?.insertedId,
                    label: updateMealPlan.mealPlanName,
                });
                console.log(response, "response")
                getMealPlanDetail(response?.insertedId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">
                        <div className="row">
                            <div className="row">
                                <div className="col-md-6">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li
                                                class="breadcrumb-item cursor-pointer"
                                                onClick={() => navigate(-1)}
                                            >
                                                Meal Plans
                                            </li>
                                            <li
                                                class="breadcrumb-item active fw-bold"
                                            >
                                                Add Meal Plan
                                            </li>

                                        </ol>
                                    </nav>
                                </div>
                                <div className="col-md-6">
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12"><p className="whole_label  ">
                                        Name
                                        <span className="text-danger"> *</span>
                                    </p>
                                        <input
                                            className="description_inputf mb-4"
                                            type="text"
                                            value={updateMealPlan.mealPlanName}
                                            onChange={(e) => {
                                                onChangeDetail("mealPlanName", e.target.value);
                                            }}
                                        />
                                        {error &&
                                            (!updateMealPlan.mealPlanName ||
                                                updateMealPlan.mealPlanName === "") && (
                                                <h2 className="text-danger error">
                                                    Meal plan name should not be empty.
                                                </h2>
                                            )}
                                    </div>
                                    <div className="col-md-12 mt-1 mb-0">
                                        <p className="whole_label  ">
                                            Description
                                            <span className="text-danger"> *</span>
                                        </p>

                                        <div
                                            className="text-editor-receipe"
                                           
                                        >

                                            <textarea className="description_inputf description_descpf mb-3" onChange={(e) => {
                                                onChangeDetail("description", e.target.value);
                                            }}
                                                value={updateMealPlan.description} rows="5"></textarea>
                                        </div>
                                        {error &&
                                            (!updateMealPlan.description ||
                                                updateMealPlan.description === "<p><br></p>") && (
                                                <h2 className="text-danger error">
                                                    Description should not be empty.
                                                </h2>
                                            )}
                                    </div>
                                    <div className="col-md-12">
                                        <p className="whole_label  ">
                                            Tags
                                            <span className="text-danger"> *</span>
                                        </p>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            value={updateMealPlan.tags}
                                            placeholder="Choose keywords"
                                            options={getRecipeTags()}
                                            onChange={(data) => {
                                                onChangeDetail("tags", data);
                                            }}
                                        />
                                        {error && updateMealPlan.tags.length == 0 && (
                                            <h2
                                                className="text-danger error"
                                                style={{ marginTop: "-28px" }}
                                            >
                                                Tags should not be empty.
                                            </h2>
                                        )}
                                    </div>
                                    {!selectedMealPlan?.value && !mealPlanDetail ? (
                                        <div className="col-md-12">
                                            <hr />
                                            <div className="d-flex justify-content-between">

                                                <div text={'Cancel'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex btnfix_wid81 justify-content-center align-items-center" onClick={() => navigate(-1)}>Cancel</div>


                                                <button className="description_btnsave blogbtn_widfix ">
                                                    Save & Continue
                                                </button>
                                            </div>
                                        </div>) : null}
                                </div>
                            </form>

                            <div className="mt-5">
                                <div className="col-md-12">
                                    {selectedMealPlan?.value && mealPlanDetail ? (
                                        <Tabs
                                        //   selectedIndex={selectedTab}
                                        //   onSelect={(index) => setSelectedTab(index)}
                                        >
                                            {renderTabList()}
                                            {
                                                <button
                                                    type="button"
                                                    onClick={addMealPlanDays}
                                                    className="addDay_new89"
                                                >
                                                    <AiOutlinePlusCircle /> Day
                                                </button>
                                            }
                                            {renderTabPanel()}
                                        </Tabs>
                                    ) :
                                        null
                                        // (
                                        //     <Loader
                                        //         visible={false}
                                        //         emptyTextKey={"pleaseSelectMealPlan"}
                                        //     />
                                        // )
                                    }
                                </div>

                            </div>
                            {selectedMealPlan?.value && mealPlanDetail ? (
                                <div className="col-md-12">
                                    <hr />
                                    <div className="d-flex justify-content-between">

                                        <div text={'Cancel'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => navigate(-1)}>Cancel</div>


                                        <button className="description_btnsave blogbtn_widfix " onClick={() => navigate(-1)}>
                                            Save
                                        </button>
                                    </div>
                                </div>) : null}
                        </div>
                    </div>
                </div>
            </div>
            {renderModelAddRecipe()}
        </>
    );
};

export default AddNewMealPlan;
