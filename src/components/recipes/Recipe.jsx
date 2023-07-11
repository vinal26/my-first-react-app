// export default Recipe;
import React, { useState } from "react";
import { FiEdit, FiMoreHorizontal, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect } from "react";
import ApiConfig from "../../config/ApiConfig";
import { BsFillEyeFill, BsThreeDots } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { useAuth } from "../../Context/AuthContext";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../header/Navbar";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deleteRecipeByID, getRecipes, getRecommendedRecipes } from "../../services/NutritionService";

const Recipe = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [status, setStatus] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const location = useLocation();
  const state = location.state;
  const { userId } = useParams()
  const [listTabs, setListTabs] = useState({
    "active": true,
    "default": false,
  });
  const newCreatedProgramId = state?.newCreatedProgramId; // To Check whether new program is created or not if yes then directly navigate to Active program tab screen module
  const [filterdata, setFilterData] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeRecommendedList, setRecipeRecommendedList] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  // let user = location?.state?.user || '';



  useEffect(() => {
    if (userId && recipeList.length) {
      const result = recipeList.filter((value) => value._id == userId);
      if (result.length) {
        setSelectedProgram(result[0])
        navigate(`/recipes/${result[0]._id}`, { replace: true })
      } else {
        if (recipeList?.length) {
          setSelectedProgram(recipeList[0])
        }
        // showToastError(toastMsg.programNotAvailable)
      }
    }
  }, [userId, recipeList]);

  const delete_recipe = (id) => {
    swal({
      // text: "Do you want delete this recipe ?",
      title: "Do you want delete this recipe ?",
      icon: "warning",
      buttons: {
        Yes: {
          text: "Yes",
          value: true,
        },
        No: {
          text: "No",
          value: false,
        },
      },
    })
      .then(async (val) => {
        console.log(val)
        if (!val) return;

        try {
          const response = await deleteRecipeByID(id);
          if (response.status === 200) {
            // alert(response?.data?.message);
            toast.success("Recipe Deleted Successfully");
            setLoader(false);
            listTabs.active && getRecipeList();
            listTabs.default && getRecommendedRecipeList()
          } else {
            // alert(response?.data || response.message);
            toast.error(response?.data || response.message || "An Error Occured");
          }
        } catch (error) {
          // error?.data?.data && alert(error?.data?.data || error.data?.message);
          setLoader(false);
          toast.error(error?.data?.data || error.data?.message || "An Error Occured", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }


  const onChangeSearchText = async (e) => {
    let searchWord = e.target.value;
    const result = listTabs.active ? recipeList?.filter((value) => {
      if (value) {
        return (
          value?.recipeName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    }) : recipeRecommendedList?.filter((value) => {
      if (value) {
        return (
          value?.recipeName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      listTabs.active && setFilterData(recipeList);
      listTabs.default && setFilterData(recipeRecommendedList);
    } else {
      setFilterData(result);
    }
  };

  const getRecipeList = async () => {
    setLoader(true);
    try {
      const response = await getRecipes();
      setLoader(false);

      if (response.status === 200) {
        // console.log(response?.data);
        setRecipeList(response?.data?.data);
        setFilterData(response?.data?.data);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }

  const getRecommendedRecipeList = async () => {
    setLoader(true);
    try {
      const response = await getRecommendedRecipes();
      setLoader(false);

      if (response.status === 200) {
        console.log(response?.data);
        setRecipeRecommendedList(response?.data?.data);
        setFilterData(response?.data?.data);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }

  useEffect(() => {
    getRecipeList()
  }, [])

  const renderLoader = () => {
    return (
      <Loader
        visible={isLoading}
        emptyTextKey={'noAnyActiveProgram'}
        style={{ top: 0, position: "relative" }} />
    )
  }


  const renderSearchHeader = () => {
    return (
      <div className="d-flex mb-3">
        <div className="w-50">
          <h4>Recipes</h4>
          <p>View your recipes curate and customize meals.</p>
        </div>
        <div className="w-50 d-flex">
          <div className="actsearch_simple me-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search recipe name here"
              className="ms-2"
              onChange={(e) => onChangeSearchText(e)} />
          </div>
          <button
            onClick={() => navigate('/addrecipe')}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Add Receipe"
            className="btn btn-primary btn-custom">
            <AiOutlinePlus className="me-2" /> Add Recipe
          </button>
        </div>
      </div >
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
          <div className="col-md-10  py-4 px-5">
            {/* <div className="container"> */}
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>My Library</li>
                  <li class="breadcrumb-item active fw-bold" aria-current="page">Recipes</li>
                </ol>
              </nav>
              <div className="row">
                <div className="col-md-12">
                  <div className="mt-5 px-2" style={{ height: "486px" }}>
                    {renderSearchHeader()}
                    <div className="mt-4 pb-2 spacing_scroll">
                      <div className="custom-tabs border-bottom d-flex">
                        <p onClick={() => { setListTabs({ default: false, active: true }); getRecipeList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.active && 'active'}`}>All recipes</p>
                        {!isAdmin && <p onClick={() => { setListTabs({ default: true, active: false }); getRecommendedRecipeList(); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.default && 'active'}`}>Recommended recipes</p>}
                      </div>
                      {/* Active Tab */}
                      {listTabs.active &&
                        <>
                        {isLoading ? (
                        <center>
                          <div
                            style={{
                              width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                              position: "relative"
                            }}
                            className="spinner-border mt-3 mb-4"
                            role="status"
                          />
                        </center>
                      ) : filterdata.length ? filterdata.map((dt, i) => <div key={i} className="card shadow-sm border-0 mt-2 mb-3 p-3 d-flex flex-md-row justify-content-between">
                        <div className="d-flex align-items-center">
                          <img
                            src={dt.recipeImage && ApiConfig.recipeImageUrl + dt.createdBy + "/" + dt.recipeImage}
                            onError={(e) => {
                              e.target.src = "images/recipeTable.png" //replacement image imported above
                            }}
                            className="recipe_image_ me-4" alt="" />
                          <p className="m-0 text-capitalize">{dt.recipeName}</p>
                        </div>
                        <div className="d-flex justify-content-around align-items-center">
                          <Link className="btn btn-primary btn-custom-light ms-3" to={`/viewrecipe?recipeId=${dt._id}`}>
                            <span><BsFillEyeFill className="me-2" />View</span>
                          </Link>
                          <Link className="btn btn-primary btn-custom-light ms-3" to={`/EditRecipe?recipeId=${dt._id}`}>
                            <span><RiEdit2Fill className="me-2" />Edit</span>
                          </Link>
                          <button className="btn btn-primary btn-custom-light ms-3" onClick={() => delete_recipe(dt._id)}>
                            <span><RiDeleteBin5Fill className="me-2" />Delete</span>
                          </button>
                        </div>
                      </div>) : <div className="card px-3 py-4"><h2 className="text-green text-center mx-5 mb-4">You do not have any recipes yet let’s begin creating recipes</h2><p className="text-green text-center">Click on the button above to begin creating recipes.</p></div>}</>}

                      {listTabs.default &&
                        <>
                        {isLoading ? (
                          <center>
                            <div
                              style={{
                                width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                                position: "relative"
                              }}
                              className="spinner-border mt-3 mb-4"
                              role="status"
                            />
                          </center>
                        ) : filterdata.length ? filterdata.map((dt, i) => <div key={i} className="card shadow-sm border-0 mt-2 mb-3 p-3 d-flex flex-md-row justify-content-between">
                          <div className="d-flex align-items-center">
                            <img
                              src={dt.recipeImage && ApiConfig.recipeImageUrl + dt.createdBy + "/" + dt.recipeImage}
                              onError={(e) => {
                                e.target.src = "images/recipeTable.png" //replacement image imported above
                              }}
                              className="recipe_image_ me-4" alt="" />
                            <p className="m-0 text-capitalize">{dt.recipeName}</p>
                          </div>
                          <div className="d-flex justify-content-around align-items-center">
                            <Link className="btn btn-primary btn-custom-light ms-3" to={`/viewrecipe?recipeId=${dt._id}`}>
                              <span><BsFillEyeFill className="me-2" />View</span>
                            </Link>
                            <Link className="btn btn-primary btn-custom-light ms-3" to={`/EditRecipe?recipeId=${dt._id}`}>
                              <span><RiEdit2Fill className="me-2" />Edit</span>
                            </Link>
                            <button className="btn btn-primary btn-custom-light ms-3" onClick={() => delete_recipe(dt._id)}>
                              <span><RiDeleteBin5Fill className="me-2" />Delete</span>
                            </button>
                          </div>
                        </div>) : <div className="card px-3 py-4"><h2 className="text-green text-center mx-5 mb-4">You do not have any recipes yet let’s begin creating recipes</h2><p className="text-green text-center">Click on the button above to begin creating recipes.</p></div>}</>}
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
export default Recipe;

