import React, { useEffect, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import ApiConfig from "../../config/ApiConfig";
import { deleteRecipeByID, getRecipes } from "../../services/NutritionService";
import DeleteRecipe from "./RecipeDelete";


const RecipeView = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setLoader] = useState(true);


  const getRecipeList = async () => {
    try {
      const response = await getRecipes();
      setLoader(false);
  
      if (response.status === 200) {
          console.log(response?.data);
          setRecipeList(response?.data?.data);
          // setFilterData(response?.data?.data);
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
      if(!val) return;

      try {
        const response = await deleteRecipeByID(id);
        if (response.status === 200) {
            // alert(response?.data?.message);
            toast.success("Recipe Deleted Successfully");
            setLoader(false);
            getRecipeList();
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
  

  return (
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
        ) : recipeList.length ? recipeList.map((dt,i) => <div key={i} className="card shadow-sm border-0 mb-3 p-3 d-flex flex-md-row justify-content-between">
        <div className="d-flex align-items-center">
          <img
          src={dt.recipeImage && ApiConfig.recipeImageUrl+dt.createdBy+"/"+dt.recipeImage}
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
      </div>) : <div className="card px-3 py-4"><h2 className="text-green text-center mx-5 mb-4">You do not have any recipes yet let’s begin creating recipes</h2><p className="text-green text-center">Click on the button above to begin creating recipes.</p></div>}
    </>
  );
};

export default RecipeView;
