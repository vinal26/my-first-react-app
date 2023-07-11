import React, { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Creatable from "react-select/creatable";
import { addRecipe } from "../../services/NutritionService";
import { components } from 'react-select';
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty } from "../../Utils/Helper";
import { toast } from "react-toastify";
import Select from "react-select";
import TimePicker from "../../commonComponent/TimePicker";
import Selector from "./tagsSelector/Selector";
import { BlogEditorComponent } from "../blog/BlogEditor";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { recipeTags } from "../../Utils/AllConstant";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  // const [ingredients, setIngredients] = useState([]);
  // const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [tags, setTags] = useState([]);
  const [showTimePicker, setTimePickerVisible] = useState(false);

  const [recipeName, setrecipeName] = useState("");

  const [serve, setserve] = useState("");
  const [prepTime, setprepTime] = useState("");
  const [ch, setch] = useState("00");
  const [cm, setcm] = useState("00");
  const [calories, setcalories] = useState("");
  const [fat, setfat] = useState("");
  const [carbs, setcarbs] = useState("");
  const [protein, setprotein] = useState("");
  const [category, setcategory] = useState("breakfast");
  const [image, setImage] = useState("");
  const [flname, setflname] = useState("");
  const [formValues, setFormValues] = useState([])

  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Type something and press enter</span>
      </components.NoOptionsMessage>
    );
  };

  const activeSelection = () => {
    const activeTab = document.querySelector(".react-tabs__tab-list li:first-child");
    if (activeTab) activeTab.click();
  }

  const timeSetting = (date12, date24) => {
    const myArray = date24.split(":");
    setch(myArray[0] < 10 ? "0" + myArray[0] : myArray[0])
    setcm(myArray[1])
  }

  const getRecipeTags = () => {
    const result = recipeTags.map((item) => {
      return {
        label: item,
        value: item
      }
    });
    return result || [];
  }
  const handleSubmit = async (e) => {
    console.log(tags, "tags")
    e.preventDefault();
    let addObject = {
      "recipeName": recipeName,
      "serve": serve,
      "prepTime": prepTime,
      "cookTime": `${ch}:${cm}:00`,
      "calories": calories || 0,
      "fat": fat || 0,
      "carb": carbs || 0,
      "protein": protein || 0,
      "ingredients": formValues.filter(o => Object.values(o).some(v => v !== '')),
      "steps": steps,
      "tags": tags,
      "category": category
    }

    addObject.recipeImage = flname ? flname : "";

    // if (!recipeName || !serve || serve <= 0 || !prepTime || prepTime <= 0 || (!ch && !cm) || ch <= 0 && cm <= 0 || !formValues.length || !steps || steps === '<p><br></p>' || !tags.length || !category || !flname) {
    if (!recipeName || !serve || serve <= 0 || !prepTime || prepTime <= 0 || !formValues.length || formValues.filter((item) => item.item === "").length > 0 || formValues.filter((item) => item.quantity === "").length > 0 || !steps || steps === '<p><br></p>' || !tags.length || !category || !flname) {
      setError(true);
      return;
    }

    const tagResult = tags?.map((item) => {
      return item.value
    })

    addObject.tags = tagResult

    // console.log('TTTTTT', tagResult, addObject);
    // return ;

    try {
      const response = await addRecipe(addObject);
      if (response.status === 200) {
        console.log(response?.data);
        // alert(response?.data?.data);
        toast.success(response?.data?.data || "Recipe Updated Successfully");
        // activeSelection();
        navigate(-1)
      } else {
        // alert(response?.data || response.message);
        toast.error(response?.data || response.message || "An Error Occured");
      }
    } catch (error) {
      // error?.data?.data && alert(error?.data?.data || error.data?.message);
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

    console.log(addObject);
  }

  const uploadPicture = async (e) => {
    setImage(e.target.files[0]);
    const filename = getFileName(e.target.files[0]);
    try {
      await uploadFile(e.target.files[0], getUploadFileCategory.recipe, filename);
      setflname(filename);

    } catch (error) {
      console.log(error);
    }
  }

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, {item: "", quantity : ""}])
    
  }

  let removeFormFields = (i) => {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues)
      // setFormValues((prev) => {return {...prev, newFormValues }})
  }
  const renderForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="w-50">
            <h4>Add Recipe</h4>
            <p>Fill in recipe information</p>
          </div>
          <div className="add-recipe">
            {/* <div className="col-md-4">
              <div className="position-sticky" style={{ "top": 20 }}>
                <img
                  src={(image && URL.createObjectURL(image)) || "images/dummy_image.jpg"}
                  alt=""
                  className="active_dummyimage"
                />
                <input type="file" className="form-control uploader-input_"
                  accept="image/*"
                  onChange={(e) => {
                    uploadPicture(e);
                  }}
                />
                <div className="uploader-mask d-flex justify-content-center align-items-center">
                  <BsFillPlusCircleFill className="upload-icon" />
                </div>
                {(error && !image) && <h2 className="text-danger error">Picture should not be empty.</h2>}
              </div>
            </div> */}
            <div>
              <div className="row">

                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4 position-relative pb-4">
                      <img
                        src={(image && URL.createObjectURL(image)) || "images/dummy_image.jpg"}
                        alt=""
                        className="active_dummyimage"
                      />
                      <input type="file" className="form-control uploader-input_"
                        accept="image/*"
                        onChange={(e) => {
                          uploadPicture(e);
                        }}
                      />
                      <div className="uploader-mask d-flex justify-content-center align-items-center mb-2">
                        <BsFillPlusCircleFill className="upload-icon" />
                      </div>
                      {(error && !image) && <h2 className="text-danger error">Picture should not be empty.</h2>}
                    </div>
                    <div className="col-md-8">
                      <div className="ps-4">
                      <p className="whole_label">Recipe <span className="text-lowercase">Name</span><span className="text-danger"> *</span></p>
                      <input
                        type="text"
                        className="description_inputf  mb-4"
                        placeholder="Recipe Name"
                        value={recipeName}
                        maxLength="40"
                        onChange={(e) => setrecipeName(e.target.value)}
                      />
                      {(error && !recipeName) && <h2 className="text-danger error">Recipe name should not be empty.</h2>}
                      </div>
                      <div className="ps-4">
                        <p className="whole_label  ">Recipe <span className="text-lowercase">Category</span><span className="text-danger"> *</span></p>
                        <select className="description_inputf  "
                          onChange={(e) => setcategory(e.target.value)}
                        >
                          <option value="breakfast">Breakfast</option>
                          <option value="Snacks">Snacks</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          {/* <option value="drinks">Drinks</option> */}
                        </select>
                        {(error && !category) && <h2 className="text-danger error">Category should not be empty.</h2>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="whole_label  ">Serves<span className="text-danger"> *</span></p>
                  <input
                    type="number"
                    className="description_inputf  mb-4"
                    placeholder="0"
                    value={serve}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    onChange={(e) => { if (e.target.value >= 0 && e.target.value < 100) setserve(e.target.value) }}
                  />
                  {(error && !serve) && <h2 className="text-danger error">Serve should not be empty.</h2>}
                  {(error && serve && serve <= 0) && <h2 className="text-danger error">Serve cannot be 0 or less than 0.</h2>}
                </div>
                <div className="col-md-6">
                  <p className="whole_label  ">Prep <span className="text-lowercase">Time</span><span className="text-danger"> *</span></p>
                  <input
                    type="number"
                    className="description_inputf  mb-4"
                    placeholder="In min"
                    value={prepTime}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    onChange={(e) => { if (e.target.value >= 0 && e.target.value <= 100000) setprepTime(e.target.value) }}
                  />
                  {(error && !prepTime) && <h2 className="text-danger error">Prep time should not be empty.</h2>}
                  {(error && prepTime && prepTime <= 0) && <h2 className="text-danger error">Prep time cannot be 0 or less than 0.</h2>}
                </div>
                <div className="col-md-12">
                  <p className="whole_label  ">Cooking <span className="text-lowercase">Time</span></p>
                  <TimePicker
                    value={`${ch}:${cm}`}
                    visibility={showTimePicker}
                    onChangeDate={timeSetting}
                    onDone={() => setTimePickerVisible(false)}
                    hour24Mode
                  >
                    <span onClick={() => setTimePickerVisible(!showTimePicker)}>
                      <input
                        required
                        placeholder="--:--"
                        className="description_inputf event-none"
                        value={`${ch}:${cm}`}
                      />
                      <img src="images/clock.png" className="clock_icon" />
                    </span>
                  </TimePicker>
                  {/* {(error && (ch <= 0 && cm <= 0)) && <h2 className="text-danger error">Cooking time cannot not be 0.</h2>} */}
                </div>
                <div className="col-md-12">
                  <p className="whole_label  ">Ingredients<span className="text-danger"> *</span></p>
                  <div className="row">
                          {formValues.map((element, index) => (
                              <>
                                <div className="col-md-6">
                                  <input
                                    name="item"
                                    type="text"
                                    className="description_inputf  "
                                    placeholder="e.g. Rice"
                                    value={element.item} onChange={e => handleChange(index, e)}
                                    // onChange={(e) => { if (e.target.value >= 0 && e.target.value < 100) setserve(e.target.value) }}
                                  />
                                  {/* {(error && !serve) && <h2 className="text-danger error">Serve should not be empty. </h2>} */}
                                  {/* {(error && serve && serve <= 0) && <h2 className="text-danger error">Serve cannot be 0 or less than 0. </h2>} */}
                                </div>
                              
                                <div className="col-md-5">
                                  <input
                                    name="quantity"
                                    type="text"
                                    className="description_inputf  "
                                    placeholder="e.g. Ounces, Cups, Tsp, Tb"
                                    value={element.quantity} onChange={e => handleChange(index, e)}
                                    // onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    // onChange={(e) => { if (e.target.value >= 0 && e.target.value <= 100000) setprepTime(e.target.value) }}
                                  />
                                  {/* {(error && !prepTime) && <h2 className="text-danger error">Prep time should not be empty. </h2>} */}
                                  {/* {(error && prepTime && prepTime <= 0) && <h2 className="text-danger error">Prep time cannot be 0 or less than 0. </h2>} */}
                                </div>
                                {
                                  index ?
                                  <div className="col-md-1">
                                    {/* <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>  */}
                                    <div style={{height: "54px", backgroundColor: "rgb(255, 255, 255)", color: "black", border: "1px solid rgb(187, 185, 185)" }} className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center text-danger px-0" onClick={() => removeFormFields(index)}><RiDeleteBinFill size="1.4em"/></div>
                                  </div>
                                  : null
                                }
                                </>
                            ))}
                            
                            <div className="col-md-12">
                              <div style={{marginBottom: "35px", width: "max-content"}} className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center" onClick={() => addFormFields()}><AiOutlinePlus className="me-2" /> Add New Ingredients</div>
                            </div>
                          </div>
                  {/* <Creatable 
              className="recipe_select"
              formatCreateLabel={(input) => `Add "${input}"`}
              placeholder=""
              isMulti
              closeMenuOnSelect={false}
                // menuIsOpen={false}
                components={{
                  DropdownIndicator: null,
                  NoOptionsMessage
                }}
                onChange={(opt, meta) => {
                  setIngredients(opt);
                }}
              /> */}
                  {/* <div className="text-editor-receipe" style={{ marginBottom: 20 }}>
                    <BlogEditorComponent
                      onChange={(data) => { setIngredients(data) }}
                      value={ingredients}
                      onAddNewFile={(fileName) => { }}
                    />
                  </div> */}
                  {(error && (!formValues.length)) && <h2 className="text-danger error" style={{ marginTop: "-26px" }}>Ingredients should not be empty.</h2>}
                  {(error && formValues.filter((item) => item.item === "").length > 0  ||
                   formValues.filter((item) => item.quantity === "").length > 0) ?  
                   <h2 className="text-danger error" style={{ marginTop: "-26px" }}
                   >
                    Ingredients should not be empty.
                   </h2> : null
                         
                        }


                       
                </div>

                <div className="col-md-12">
                  <p className="whole_label  ">Recipe <span className="text-lowercase">in steps</span><span className="text-danger"> *</span></p>
                  {/* <Creatable 
              className="recipe_select"
              formatCreateLabel={(input) => `Add "${input}"`}
              placeholder=""
              isMulti
              closeMenuOnSelect={false}
                // menuIsOpen={false}
                components={{
                  DropdownIndicator: null,
                  NoOptionsMessage
                }}
                onChange={(opt, meta) => {
                  setSteps(opt);
                }}
              /> */}
                  <div className="text-editor-receipe mb-4">
                    <BlogEditorComponent
                      onChange={(data) => { setSteps(data) }}
                      value={steps}
                      onAddNewFile={(fileName) => { }}
                    />
                  </div>
                  {(error && (!steps || steps === '<p><br></p>')) && <h2 className="text-danger error">Steps should not be empty.</h2>}
                </div>
                <div className="col-md-12">
                  <p className="whole_label  ">Tags<span className="text-danger"> *</span></p>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    value={tags}
                    placeholder="Choose keywords"
                    options={getRecipeTags()}
                    onChange={(data) => {
                      setTags(data)
                    }}
                  />
                  {(error && tags.length == 0) && <h2 className="text-danger error" style={{marginTop:-23}}>Tags should not be empty.</h2>}

                  {/* <Select
                    // value={tags.map((item )=> { return item.value })}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder={"Select"}
                    onChange={(opt, meta) => {
                      setTags(opt.map(dt => { return { 'value': dt.value, 'label': dt.label } }));
                    }}
                    options={getRecipeTags()}
                  />
                  {(error && tags.length == 0) && <h2 className="text-danger error">Tags should not be empty.</h2>} */}
                </div>
                <div className="col-md-12">
                  <p className="whole_label  ">Nutrition <span className="text-lowercase">per serving</span></p>
                </div>
                <div className="col-md-3">
                  <p className="whole_label text-secondary">Calorie</p>
                  <input
                    type="number"
                    className="description_inputf"
                    placeholder="In kcal"
                    value={calories}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    onChange={(e) => { if (e.target.value >= 0 && e.target.value <= 1000) setcalories(e.target.value) }}
                  />
                </div>
                <div className="col-md-3">
                  <p className="whole_label text-secondary">Fat</p>
                  <input
                    type="number"
                    className="description_inputf"
                    placeholder="In gm"
                    value={fat}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    onChange={(e) => { if (e.target.value >= 0 && e.target.value < 100) setfat(e.target.value) }}
                  />
                </div>
                <div className="col-md-3">
                  <p className="whole_label text-secondary">Carb</p>
                  <input
                    type="number"
                    className="description_inputf"
                    placeholder="In gm"
                    value={carbs}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    onChange={(e) => { if (e.target.value >= 0 && e.target.value < 100) setcarbs(e.target.value) }}
                  />
                </div>
                <div className="col-md-3">
                  <p className="whole_label text-secondary">Protein</p>
                  <input
                    type="number"
                    className="description_inputf"
                    placeholder="In gm"
                    value={protein}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    onChange={(e) => { if (e.target.value >= 0 && e.target.value < 100) setprotein(e.target.value) }}
                  />
                </div>
                <div className="col-md-12">
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div text={'Cancel'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave btnfix_wid81 d-flex justify-content-center align-items-center" onClick={() => navigate(-1)}>Cancel</div>
                    <button className="description_btnsave btnfix_wid81">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
                <li class="breadcrumb-item pointer" onClick={() => navigate(-1)}>Recipes</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Add Recipe</li>
              </ol>
            </nav>
            {/* <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              Add Recipe
            </p> */}
            {/* <div className="container mt-5 px-5"> */}
              <div className="row justify-content-start">
                {renderForm()}
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
