import React from "react";
import EditNutrition from "./EditNutrition";
import DeleteNutrition from "./DeleteNutrition";
import { Link } from "react-router-dom";

const NutritionView = () => {
  return (
    <>
     <div className="table_resouter">
      <table class="table appointment_table table_resinner2">
        <tbody className="mb-5">
          <tr className="text-center mt-5">
          <td><img src="images/recipeTable.png" className="recipe_image" alt="" /></td>
            <td>Food Database</td>
            <td>
            <Link to={`/EditNutrition`}>
              <button className="edit_recipe">
                <span>Edit</span>
              </button>
            </Link>
            </td>
            <td>
              <button className="delete_recipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <span>delete</span>
              </button>
              <DeleteNutrition/>
            </td>
          </tr>


          <tr className="text-center mt-5">
          <td><img src="images/recipeTable.png" className="recipe_image" alt="" /></td>
            <td>Food Database</td>
            <td>
            <Link to={`/EditNutrition`}>
              <button className="edit_recipe">
                <span>Edit</span>
              </button>
            </Link>
            </td>
            <td>
              <button className="delete_recipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <span>delete</span>
              </button>
              <DeleteNutrition/>
            </td>
          </tr>

          <tr className="text-center mt-5">
          <td><img src="images/recipeTable.png" className="recipe_image" alt="" /></td>
            <td>Food Database</td>
            <td>
            <Link to={`/EditNutrition`}>
              <button className="edit_recipe">
                <span>Edit</span>
              </button>
            </Link>
            </td>
            <td>
              <button className="delete_recipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <span>delete</span>
              </button>
              <DeleteNutrition/>
            </td>
          </tr>
          <tr className="text-center mt-5">
          <td><img src="images/recipeTable.png" className="recipe_image" alt="" /></td>
            <td>Food Database</td>
            <td>
            <Link to={`/EditNutrition`}>
              <button className="edit_recipe">
                <span>Edit</span>
              </button>
            </Link>
            </td>
            <td>
              <button className="delete_recipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <span>delete</span>
              </button>
              <DeleteNutrition/>
            </td>
          </tr>
          <tr className="text-center mt-5">
          <td><img src="images/recipeTable.png" className="recipe_image" alt="" /></td>
            <td>Food Database</td>
            <td>

            <Link to={`/EditNutrition`}>
              <button className="edit_recipe">
                <span>Edit</span>
              </button>
            </Link>
            </td>
            <td>
              <button className="delete_recipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <span>delete</span>
              </button>
              <DeleteNutrition/>
            </td>
          </tr>
         </tbody>
      </table>
      <div className="col-md-6">
                  <button className="update_btnsave">update</button>
        </div>
      </div>
    </>
  );
};

export default NutritionView;
