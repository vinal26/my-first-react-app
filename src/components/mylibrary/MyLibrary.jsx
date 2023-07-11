import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoRoseSharp } from "react-icons/io5";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";
import "./style.css";
import MyLibraryItem from "./MyLibraryItem";
import { useAuth } from "../../Context/AuthContext";

const MyLibrary = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <div className="row">

              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item cursor-pointer" onClick={() => navigate("/")}>Dashboard</li>
                  <li class="breadcrumb-item active fw-bold" aria-current="page">My Library</li>
                </ol>
              </nav>

              {/* <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li
                    class="breadcrumb-item  cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    <IoIosArrowBack className="library_icon" />
                    My Library
                  </li>
                </ol>
              </nav> */}
              {/* <div className="d-flex mt-3 mb-3">
                <div className="w-100">
                  <h4>Media</h4>
                  <p>View your meal plans curate and customize meals.</p>
                </div>
              </div>

              <div className="container mylibrary_wid">
                <div className="row">
                  <MyLibraryItem image={`images/lib_images.PNG`} text={`Images`} url={``} />
                  <MyLibraryItem image={`images/lib_videos.PNG`} text={`Videos`} url={``} />
                  <MyLibraryItem image={`images/lib_ebooks.PNG`} text={`Ebooks`} url={``} />
                </div>
              </div> */}

              <div className="d-flex mt-4 mb-3">
                <div className="w-100">
                  <h4>Nutrition</h4>
                  <p>View your meal plans and customize meals.</p>
                </div>
              </div>

              <div className="container mylibrary_wid">
                <div className="row">
                  <MyLibraryItem image={`images/lib_recipes.PNG`} text={`Recipes`} url={`/recipes`} />
                  <MyLibraryItem image={`images/lib_mealplan.PNG`} text={`Meal plans`} url={`/mealplan`} />
                  {/* <MyLibraryItem image={`images/lib_nutrition.PNG`} text={`Nutrition Guides`} url={``} /> */}
                </div>
              </div>

              <div className="d-flex mt-4 mb-3">
                <div className="w-100">
                  <h4>Lifestyle</h4>
                  <p>Take a holistic view and help create better habits for your clients!</p>
                </div>
              </div>

              <div className="container mylibrary_wid">
                <div className="row">
                  <MyLibraryItem image={`images/lib_fitnessplan.PNG`} text={`Fitness plan`} url={`/fitnessplan`} />
                  {isAdmin && <MyLibraryItem image={`images/lib_affermation.PNG`} text={`Affirmations`} url={`/affirmation`} />}
                  {/* <MyLibraryItem image={`images/lib_sleep.png`} text={`Sleep`} url={``} /> */}
                </div>
              </div>
              <div className="d-flex mt-4 mb-3">
                <div className="w-100">
                  <h4>Forms & Waivers</h4>
                  <p>View and customize your forms and waivers here.</p>
                </div>
              </div>

              <div className="container mylibrary_wid">
                <div className="row">
                  <MyLibraryItem image={`images/lib_nutrition.PNG`} text={`Forms & Waivers`} url={`/formsandwaiver`} />

                  {/* <MyLibraryItem image={`images/lib_sleep.png`} text={`Sleep`} url={``} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyLibrary;
