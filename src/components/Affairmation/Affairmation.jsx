// export default Recipe;
import React, { Fragment, useState, useRef } from "react";
import { FiEdit, FiMoreHorizontal, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect } from "react";
import ApiConfig from "../../config/ApiConfig";
import { Accordion, Dropdown } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../header/Navbar";
import swal from "sweetalert";
import { useAC } from "./AC";
import { getAffairmation, updateAffairmation } from "../../services/AffairmationService";
import { IoIosWarning } from "react-icons/io";
import { showToastError, showToastSuccess, showToastWarning } from "../../Utils/Helper";

const defaultTabs = {
  "mindset": false,
  "relationships": false,
  "motivation": false,
  "spirituality": false,
  "resilience": false,
}

const Affairmation = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [status, setStatus] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [affirmationID, setAffirmationID] = useState("");
  const location = useLocation();
  const state = location.state;
  // const { userId } = useParams()
  const [listTabs, setListTabs] = useState({
    "mindset": true,
    "relationships": false,
    "motivation": false,
    "spirituality": false,
    "resilience": false,
  });
  const [recipeList, setRecipeList] = useState([]);
  // let user = location?.state?.user || '';
  const [filterdata, setFilterData] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');


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

      });
  }


  const onChangeSearchText = async (e) => {
    let searchWord = e.target.value;
    const result = recipeList?.filter((value) => {
      if (value) {
        return (
          value?.recipeName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(recipeList);
      // getForumsById(searchWord);
    } else {
      setFilterData(result);
    }
  };

  // Mindset
  const { SetState: setFinances, State: Finances, Render: Finances_ } = useAC();
  const { SetState: setHealth, State: Health, Render: Health_ } = useAC();
  const { SetState: setHabits, State: Habits, Render: Habits_ } = useAC();
  const { SetState: setFood, State: Food, Render: Food_ } = useAC();
  const { SetState: setEnvironment, State: Environment, Render: Environment_ } = useAC();
  const { SetState: setCareer, State: Career, Render: Career_ } = useAC();
  const { SetState: setSelfImage, State: SelfImage, Render: SelfImage_ } = useAC();
  const { SetState: setBusiness, State: Business, Render: Business_ } = useAC();
  const { SetState: setEducation, State: Education, Render: Education_ } = useAC();

  // Relationships
  const { SetState: setParents, State: Parents, Render: Parents_ } = useAC();
  const { SetState: setFriendships, State: Friendships, Render: Friendships_ } = useAC();
  const { SetState: setMarriage, State: Marriage, Render: Marriage_ } = useAC();
  const { SetState: setPets, State: Pets, Render: Pets_ } = useAC();
  const { SetState: setManager, State: Manager, Render: Manager_ } = useAC();
  const { SetState: setCoworkers, State: Coworkers, Render: Coworkers_ } = useAC();
  const { SetState: setChildren, State: Children, Render: Children_ } = useAC();
  const { SetState: setFamily, State: Family, Render: Family_ } = useAC();

  // Motivation
  const { SetState: setInnerStrength, State: InnerStrength, Render: InnerStrength_ } = useAC();
  const { SetState: setBravery, State: Bravery, Render: Bravery_ } = useAC();
  const { SetState: setSelfConfidence, State: SelfConfidence, Render: SelfConfidence_ } = useAC();
  const { SetState: setFitness, State: Fitness, Render: Fitness_ } = useAC();
  const { SetState: setSelfLove, State: SelfLove, Render: SelfLove_ } = useAC();

  // Spirtuality
  const { SetState: setGratitude, State: Gratitude, Render: Gratitude_ } = useAC();
  const { SetState: setFaith, State: Faith, Render: Faith_ } = useAC();
  const { SetState: setPrayers, State: Prayers, Render: Prayers_ } = useAC();

  // Resilience
  const { SetState: setDepression, State: Depression, Render: Depression_ } = useAC();
  const { SetState: setEmotions, State: Emotions, Render: Emotions_ } = useAC();
  const { SetState: setHardship, State: Hardship, Render: Hardship_ } = useAC();
  const { SetState: setFailures, State: Failures, Render: Failures_ } = useAC();
  const { SetState: setBoundaries, State: Boundaries, Render: Boundaries_ } = useAC();
  const { SetState: setGrief, State: Grief, Render: Grief_ } = useAC();
  const { SetState: setDivorce, State: Divorce, Render: Divorce_ } = useAC();
  const { SetState: setBullying, State: Bullying, Render: Bullying_ } = useAC();
  const { SetState: setUnemployment, State: Unemployment, Render: Unemployment_ } = useAC();

  const getAffairmationList = async () => {
    try {
      const response = await getAffairmation();
      setLoader(false);

      if (response.status === 200) {
        // console.log(response?.data, 'Affairmation');

        // Mindset
        response?.data['data']?.mindset?.Finances && setFinances(response?.data['data']?.mindset?.Finances)
        response?.data['data']?.mindset?.Health && setHealth(response?.data['data']?.mindset?.Health)
        response?.data['data']?.mindset?.Habits && setHabits(response?.data['data']?.mindset?.Habits)
        response?.data['data']?.mindset?.Food && setFood(response?.data['data']?.mindset?.Food)
        response?.data['data']?.mindset?.Environment && setEnvironment(response?.data['data']?.mindset?.Environment)
        response?.data['data']?.mindset?.Career && setCareer(response?.data['data']?.mindset?.Career)
        response?.data['data']?.mindset?.SelfImage && setSelfImage(response?.data['data']?.mindset?.SelfImage)
        response?.data['data']?.mindset?.Business && setBusiness(response?.data['data']?.mindset?.Business)
        response?.data['data']?.mindset?.Education && setEducation(response?.data['data']?.mindset?.Education)

        // Relationship
        response?.data['data']?.relationships?.Parents && setParents(response?.data['data']?.relationships?.Parents)
        response?.data['data']?.relationships?.Friendships && setFriendships(response?.data['data']?.relationships?.Friendships)
        response?.data['data']?.relationships?.Marriage && setMarriage(response?.data['data']?.relationships?.Marriage)
        response?.data['data']?.relationships?.Pets && setPets(response?.data['data']?.relationships?.Pets)
        response?.data['data']?.relationships?.Manager && setManager(response?.data['data']?.relationships?.Manager)
        response?.data['data']?.relationships?.Coworkers && setCoworkers(response?.data['data']?.relationships?.Coworkers)
        response?.data['data']?.relationships?.Children && setChildren(response?.data['data']?.relationships?.Children)
        response?.data['data']?.relationships?.Family && setFamily(response?.data['data']?.relationships?.Family)

        // Motivation
        response?.data['data']?.motivation?.InnerStrength && setInnerStrength(response?.data['data']?.motivation?.InnerStrength)
        response?.data['data']?.motivation?.Bravery && setBravery(response?.data['data']?.motivation?.Bravery)
        response?.data['data']?.motivation?.SelfConfidence && setSelfConfidence(response?.data['data']?.motivation?.SelfConfidence)
        response?.data['data']?.motivation?.Fitness && setFitness(response?.data['data']?.motivation?.Fitness)
        response?.data['data']?.motivation?.SelfLove && setSelfLove(response?.data['data']?.motivation?.SelfLove)

        // Spirtuality
        response?.data['data']?.spirituality?.Gratitude && setGratitude(response?.data['data']?.spirituality?.Gratitude)
        response?.data['data']?.spirituality?.Faith && setFaith(response?.data['data']?.spirituality?.Faith)
        response?.data['data']?.spirituality?.Prayers && setPrayers(response?.data['data']?.spirituality?.Prayers)

        // Resilience
        response?.data['data']?.resilience?.Depression && setDepression(response?.data['data']?.resilience?.Depression)
        response?.data['data']?.resilience?.Emotions && setEmotions(response?.data['data']?.resilience?.Emotions)
        response?.data['data']?.resilience?.Hardship && setHardship(response?.data['data']?.resilience?.Hardship)
        response?.data['data']?.resilience?.Failures && setFailures(response?.data['data']?.resilience?.Failures)
        response?.data['data']?.resilience?.Boundaries && setBoundaries(response?.data['data']?.resilience?.Boundaries)
        response?.data['data']?.resilience?.Grief && setGrief(response?.data['data']?.resilience?.Grief)
        response?.data['data']?.resilience?.Divorce && setDivorce(response?.data['data']?.resilience?.Divorce)
        response?.data['data']?.resilience?.Bullying && setBullying(response?.data['data']?.resilience?.Bullying)
        response?.data['data']?.resilience?.Unemployment && setUnemployment(response?.data['data']?.resilience?.Unemployment)

        setAffirmationID(response?.data['data']?._id)

      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }

  const updateAffairmationList = async (catg) => {
    console.log((Object.entries(listTabs).filter(it => it[1]))[0][0], catg);
    // console.log((eval(catg).affirmation).filter(dt => dt.ques), (eval(catg).question).filter(dt => dt.ques));

    const params = {
      "affirmationId": affirmationID,
      "option": (Object.entries(listTabs).filter(it => it[1]))[0][0],
      "fieldName": catg,
      "affirmation": (eval(catg).affirmation).filter(dt => dt.ques),
      "question": (eval(catg).question).filter(dt => dt.ques)
    }

    try {
      const response = await updateAffairmation(params);
      setLoader(false);

      if (response.status === 200) {
        console.log(response?.data, 'Affairmation updated');
        getAffairmationList()
        showToastSuccess(response?.data['data']?.message || "Affairmation Updated Successfully");
      } else {
        showToastWarning(response?.data || response.message || "An Error Occured");
      }
    } catch (error) {
      setLoader(false);
      showToastError(error?.data?.data || error.data?.message || "An Error Occured");
    }

    console.log(params);
  }

  // const ft = useRef(0);
  // useEffect(() => {
  //   if(ft.current>3) updateAffairmationList("health");
  // }, [health])

  // useEffect(() => {
  //   if(ft.current>3) updateAffairmationList("finances");
  // }, [finances])

  // useEffect(() => {
  //   ft.current+=1;

  // }, [finances, health])


  useEffect(() => {
    getAffairmationList()
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
      <div className="d-flex flex-column mb-2">
        <div className="">
          <h4>Affirmation</h4>
          <p className="pe-3">Affirmations are positive statements that can help your client to challenge and overcome self-sabotaging and negative thoughts. When you repeat them often, and believe in them, you can start to make positive changes.</p>
        </div>
        {/* <div className="d-flex">
          <div className="actsearch_simple mt-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search affirmations"
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
        </div> */}
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
          <div className="col-md-10 py-4 px-5">
            {/* <div className="container"> */}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>My Library</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Affirmation</li>
              </ol>
            </nav>
            <div className="row">
              <div className="col-md-12">
                <div className="mt-5 px-2" style={{ height: "486px" }}>
                  {renderSearchHeader()}
                  <div className="py-4">
                    <div className="custom-tabs border-bottom d-flex">
                      <p onClick={() => { setListTabs(prev => { return { ...defaultTabs, mindset: true } }); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.mindset && 'active'}`}>Mindset</p>
                      <p onClick={() => { setListTabs(prev => { return { ...defaultTabs, relationships: true } }); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.relationships && 'active'}`}>Relationships</p>
                      <p onClick={() => { setListTabs(prev => { return { ...defaultTabs, motivation: true } }); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.motivation && 'active'}`}>Motivation</p>
                      <p onClick={() => { setListTabs(prev => { return { ...defaultTabs, spirituality: true } }); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.spirituality && 'active'}`}>Spirituality</p>
                      <p onClick={() => { setListTabs(prev => { return { ...defaultTabs, resilience: true } }); }} className={`px-3 border-bottom py-2 tab mb-0  ${listTabs.resilience && 'active'}`}>Resilience</p>
                    </div>
                    {/* Mindset Tab */}
                    {listTabs.mindset &&
                      <div className="card mt-4 p-3">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Finances</Accordion.Header>
                            <Accordion.Body>
                              {Finances_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Finances")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Health</Accordion.Header>
                            <Accordion.Body>
                              {Health_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Health")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>Habits</Accordion.Header>
                            <Accordion.Body>
                              {Habits_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Habits")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>Food</Accordion.Header>
                            <Accordion.Body>
                              {Food_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Food")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>Environment</Accordion.Header>
                            <Accordion.Body>
                              {Environment_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Environment")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="5">
                            <Accordion.Header>Career</Accordion.Header>
                            <Accordion.Body>
                              {Career_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Career")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="6">
                            <Accordion.Header>Self Image</Accordion.Header>
                            <Accordion.Body>
                              {SelfImage_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("SelfImage")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="7">
                            <Accordion.Header>Business</Accordion.Header>
                            <Accordion.Body>
                              {Business_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Business")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="8">
                            <Accordion.Header>Education</Accordion.Header>
                            <Accordion.Body>
                              {Education_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Education")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>}

                    {/* Relationships Tab */}
                    {listTabs.relationships &&
                      <div className="card mt-4 p-3">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Parents</Accordion.Header>
                            <Accordion.Body>
                              {Parents_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Parents")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Friendships</Accordion.Header>
                            <Accordion.Body>
                              {Friendships_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Friendships")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>Marriage</Accordion.Header>
                            <Accordion.Body>
                              {Marriage_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Marriage")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>Pets</Accordion.Header>
                            <Accordion.Body>
                              {Pets_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Pets")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>Manager</Accordion.Header>
                            <Accordion.Body>
                              {Manager_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Manager")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="5">
                            <Accordion.Header>Coworkers</Accordion.Header>
                            <Accordion.Body>
                              {Coworkers_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Coworkers")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="6">
                            <Accordion.Header>Children</Accordion.Header>
                            <Accordion.Body>
                              {Children_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Children")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="7">
                            <Accordion.Header>Family</Accordion.Header>
                            <Accordion.Body>
                              {Family_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Family")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>}

                    {/* Motivation Tab */}
                    {listTabs.motivation &&
                      <div className="card mt-4 p-3">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Inner Strength</Accordion.Header>
                            <Accordion.Body>
                              {InnerStrength_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("InnerStrength")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Bravery</Accordion.Header>
                            <Accordion.Body>
                              {Bravery_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Bravery")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>Self Confidence</Accordion.Header>
                            <Accordion.Body>
                              {SelfConfidence_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("SelfConfidence")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>Fitness</Accordion.Header>
                            <Accordion.Body>
                              {Fitness_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Fitness")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>Self Love</Accordion.Header>
                            <Accordion.Body>
                              {SelfLove_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("SelfLove")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>}

                    {/* Spirituality Tab */}
                    {listTabs.spirituality &&
                      <div className="card mt-4 p-3">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Gratitude</Accordion.Header>
                            <Accordion.Body>
                              {Gratitude_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Gratitude")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Faith</Accordion.Header>
                            <Accordion.Body>
                              {Faith_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Faith")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>Prayers</Accordion.Header>
                            <Accordion.Body>
                              {Prayers_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Prayers")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>}

                    {/* Resilience Tab */}
                    {listTabs.resilience &&
                      <div className="card mt-4 p-3">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Depression</Accordion.Header>
                            <Accordion.Body>
                              {Depression_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Depression")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Emotions</Accordion.Header>
                            <Accordion.Body>
                              {Emotions_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Emotions")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>Hardship</Accordion.Header>
                            <Accordion.Body>
                              {Hardship_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Hardship")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>Failures</Accordion.Header>
                            <Accordion.Body>
                              {Failures_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Failures")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="4">
                            <Accordion.Header>Boundaries</Accordion.Header>
                            <Accordion.Body>
                              {Boundaries_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Boundaries")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="5">
                            <Accordion.Header>Grief</Accordion.Header>
                            <Accordion.Body>
                              {Grief_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Grief")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="6">
                            <Accordion.Header>Divorce</Accordion.Header>
                            <Accordion.Body>
                              {Divorce_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Divorce")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="7">
                            <Accordion.Header>Bullying</Accordion.Header>
                            <Accordion.Body>
                              {Bullying_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Bullying")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="8">
                            <Accordion.Header>Unemployment</Accordion.Header>
                            <Accordion.Body>
                              {Unemployment_}

                              <div className="d-flex flex-row justify-content-between align-items-center">
                                { /* <p className="mb-0 text-danger"><IoIosWarning size="1.5em" className="mb-1 me-2" /> Please click the save button to commit any changes</p> */}
                                <p className="mb-0"></p>
                                <button className="description_btnsave mx-0" onClick={() => updateAffairmationList("Unemployment")}>Save</button>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>}

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
export default Affairmation;

