import React, { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import { getRecipeByID } from "../../services/NutritionService";
import ViewRecipeMeter from "./ViewRecipeMeter";

const ViewRecipeComponent = () => {
  const [isLoading, setLoader] = useState(true);

  const [error, setError] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [tags, setTags] = useState([]);

  const [recipeName, setrecipeName] = useState("");
  const [recipeImg, setrecipeImg] = useState("");
  const [serve, setserve] = useState("");
  const [prepTime, setprepTime] = useState("");
  const [ch, setch] = useState("00");
  const [cm, setcm] = useState("00");
  const [calories, setcalories] = useState("");
  const [fat, setfat] = useState("");
  const [carbs, setcarbs] = useState("");
  const [protein, setprotein] = useState("");
  const [category, setcategory] = useState("");
  const [createdBy, SetCreatedBy] = useState("");

  const [params] = useSearchParams();

  const recipeID = params.get("recipeId");

  const getRecipeInfo = async () => {
    try {
      const response = await getRecipeByID(recipeID);
      setLoader(false);

      if (response.status === 200) {
        console.log(response?.data);
        response?.data?.data[0]?.createdBy && SetCreatedBy(response?.data?.data[0]?.createdBy);
        response?.data?.data[0]?.calories && setcalories(response?.data?.data[0]?.calories);
        response?.data?.data[0]?.carb && setcarbs(response?.data?.data[0]?.carb);
        response?.data?.data[0]?.category && setcategory(response?.data?.data[0]?.category);
        response?.data?.data[0]?.cookTime && setch(response?.data?.data[0]?.cookTime.split(':')[0]);
        response?.data?.data[0]?.cookTime && setcm(response?.data?.data[0]?.cookTime.split(':')[1]);
        response?.data?.data[0]?.fat && setfat(response?.data?.data[0]?.fat);
        response?.data?.data[0]?.prepTime && setprepTime(response?.data?.data[0]?.prepTime);
        response?.data?.data[0].protein && setprotein(response?.data?.data[0].protein);
        response?.data?.data[0]?.recipeImage && setrecipeImg(response?.data?.data[0]?.recipeImage);
        response?.data?.data[0]?.recipeName && setrecipeName(response?.data?.data[0]?.recipeName);
        response?.data?.data[0]?.serve && setserve(response?.data?.data[0]?.serve);
        response?.data?.data[0]?.ingredients && setIngredients(response?.data?.data[0]?.ingredients);
        response?.data?.data[0]?.steps && setSteps(response?.data?.data[0]?.steps);
        response?.data?.data[0]?.tags && setTags(response?.data?.data[0]?.tags);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }

  useEffect(() => {
    getRecipeInfo();
  }, [])

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
      ) : <div className="view_recipe_div shadow-sm">
        <div className="row">
          <div className="col-md-4">
            <img
              src={ApiConfig.recipeImageUrl+createdBy+"/"+recipeImg}
              onError={(e) => {
                e.target.src = "images/dummy_image.jpg" //replacement image imported above
              }}
              alt=""
            />
          </div>

          <div className="col-md-8">
            <p className="viewrecipetitle text-capitalize">
              {recipeName}
            </p>
            <div className="row">
              <ViewRecipeMeter
                name={`Calories`}
                amount={calories}
                measure={`kcal`}
              />
              <ViewRecipeMeter
                name={`Proteins`}
                amount={protein}
                measure={`Gram`}
              />
              <ViewRecipeMeter name={`Fats`} amount={fat} measure={`Gram`} />
              <ViewRecipeMeter name={`Carbs`} amount={carbs} measure={`Gram`} />
            </div>

            <p className="mt-4 mb-0">
              {tags.map((dt, i) =>
                <Fragment key={i}>
                  {dt.value === "gf" && <img src="images/gf.png" className="viewbadge_bg1" alt="" />}
                  {dt.value === "df" && <img src="images/df.png" className="viewbadge_bg1" alt="" />}
                  {dt.value === "v" && <img src="images/v.png" className="viewbadge_bg1" alt="" />}
                  {dt.value === "q" && <img src="images/q.png" className="viewbadge_bg1" alt="" />}
                </Fragment>
              )}
            </p>
            <Link to={`/EditRecipe?recipeId=${recipeID}`}  className="link_text">
              <button className="btn btn-primary btn-custom ms-auto">Edit</button>
            </Link>
          </div>
        </div>
        <hr className="viewrecipe_hr mt-4 mb-1" />
        <div className="row">
          <div className="col-md-4">
            <p className="viewrecipe_server">
              Serves : <br /><span>{serve}</span>
            </p>
          </div>

          <div className="col-md-4">
            <p className="viewrecipe_server">
              Prep Time: <br /><span>{prepTime} mins</span>
            </p>
          </div>

          <div className="col-md-4">
            <p className="viewrecipe_server">
              Cook Time: <br /><span>{ch && `${ch} hrs`} {cm && `${cm} mins`}</span>
            </p>
          </div>
        </div>
        <hr className="viewrecipe_hr mt-4 mb-1" />

            <div className="d-flex mt-2">
              <p className="mb-2">Category: </p> <div className="ms-2 text-green mb-2">{category}</div>
            </div>
            <div className="d-flex">
              <p>{tags.map(dt=> <span class="badge bg-green me-2 py-2 px-3">{dt}</span>)}</p>
            </div>

        <div className="row">
          <div className="col-md-6">
            <p className="viewrecipe_server">Ingredients</p>
            <ul>
              {ingredients?.length && ingredients.map((dt, i) => <li key={i}>{dt.item}: {dt.quantity}</li>)}
            </ul>
          </div>

          <div className="col-md-6">
            <p className="viewrecipe_server">Receipe in Steps</p>
            {steps && <div dangerouslySetInnerHTML={{"__html": steps}}></div>}
          </div>
        </div>
      </div>}
    </>
  );
};

export default ViewRecipeComponent;
