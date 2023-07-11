import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../appointment/style.css";
import "./style.css";
import GroupActivitiesName from "./GroupActivitiesName";
import QuickUpdatescard from "./QuickUpdatescard";
import GroupActivitiesTopCard from "./GroupActivitiesTopCard";
import { Doughnut, Line } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import { getGroupAssesmentScore, getGroupAssesmentScoreGraph, getGroupbyId, getGroupPostsService } from "../../services/GroupService";

const GroupActivities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [isLoading, setLoader] = useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedGroupAssesment, setSelectedGroupAssesment] = useState([]);
  const [selectedGroupAssesmentGraph, setSelectedGroupAssesmentGraph] = useState([]);

  const getGroupDetails = async () => {
    try {
      const response = await getGroupbyId(state.selectedGroup._id);
      if (response.status === 200) {
        // console.log(response.data.data, "response");
        setSelectedGroup(response?.data?.data[0]);
      }
    } catch (error) {
      // setLoader(false);
      console.log(error);
    }
  }

  const getGroupAssesmentScoreById = async () => {
    try {
      const response = await getGroupAssesmentScore(state.selectedGroup._id);
      if (response.status === 200) {
        // console.log(response.data.data, "response");
        setSelectedGroupAssesment(response?.data?.data);
      }
    } catch (error) {
      // setLoader(false);
      console.log(error);
    }
  }

  const getGroupAssesmentScoreGraphById = async () => {
    try {
      const response = await getGroupAssesmentScoreGraph(state.selectedGroup._id);
      if (response.status === 200) {
        // console.log(response.data.data, "response");
        setSelectedGroupAssesmentGraph(response?.data?.data);
      }
    } catch (error) {
      // setLoader(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getGroupDetails()
    getGroupAssesmentScoreById()
    getGroupAssesmentScoreGraphById()
    // if (selectedGroup._id) getGroupPosts();
    getGroupPosts();
  }, [state.selectedGroup]);

  const getGroupPosts = async () => {
    try {
      const response = await getGroupPostsService(state.selectedGroup._id);
      setLoader(false);
      if (response) {
        setPosts(response);
      }
    } catch (error) {
      setPosts([]);
      console.log(error);
      setLoader(false);
    }
  };

  const doughOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  const data = () => {
    return {
      labels: [
        "Nutrition",
        "Stress",
        "Hormonal health",
        "Immune health",
        "Food metabolism",
        "Toxic Exposures",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: selectedGroupAssesment.map(dt => dt.points),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],

          borderWidth: 0,
        },
      ],
    };
  };

  const dataLine = () => {
    const monthObj = {
      "1": "Jan",
      "2": "Feb",
      "3": "Mar",
      "4": "Apr",
      "5": "May",
      "6": "Jun",
      "7": "Jul",
      "8": "Aug",
      "9": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    }

    const resObj = {
      "Jan": 0,
      "Feb": 0,
      "Mar": 0,
      "Apr": 0,
      "May": 0,
      "Jun": 0,
      "Jul": 0,
      "Aug": 0,
      "Sep": 0,
      "Oct": 0,
      "Nov": 0,
      "Dec": 0,
    }
    
    selectedGroupAssesmentGraph.map(dt => resObj[monthObj[dt.month]]=dt.average)
    
    return {
      labels: Object.keys(resObj),
      datasets: [
        {
          label: "Average",
          data: Object.values(resObj),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
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
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Groups</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Details</li>
              </ol>
            </nav>
            <div class="row mt-4 px-0">
              <div className="col-md-4">
                <div className="group_backwhite px-4 py-3 h-100">
                  {selectedGroup ? (
                    <>
                      <GroupActivitiesName
                        selectedGroup={selectedGroup}
                        posts={posts}
                        getGroupPosts={getGroupPosts}
                      />

                      <p className="quick_updates3 mt-4">Quick Update</p>

                      {isLoading ? (
                        <center>
                          <div
                            style={{
                              width: "3rem",
                              height: "3rem",
                              color: "#1f7e78",
                              top: "10px",
                              position: "relative",
                            }}
                            className="spinner-border mt-3 mb-4"
                            role="status"
                          />
                        </center>
                      ) : posts.length > 0 ? (
                        posts
                          .slice(0, 3)
                          .map((dt, i) => (
                            <QuickUpdatescard
                              key={i}
                              dt={dt}
                              getGroupPosts={getGroupPosts}
                            />
                          ))
                      ) : (
                        <div className="card mt-4 d-flex justify-content-center align-items-center p-4">
                          <p className="m-0">Add new posts...</p>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="col-md-8 d-flex flex-column">
                <div className="row">
                  <GroupActivitiesTopCard
                    heading={
                      selectedGroup?.groupMembers?.length
                    }
                    paragarph={"members"}
                    backColor={"#D6B86B"}
                  />
                  <GroupActivitiesTopCard
                    heading={selectedGroup?.visits?.reduce((acc, curr) => acc+curr.visit?.length, 0) || 'Loading...'}
                    paragarph={"Total Visits"}
                    backColor={"#7A9BCC"}
                  />
                  <GroupActivitiesTopCard
                    heading={`${((selectedGroup?.activity?.reduce((acc, curr) => acc+curr.time?.length, 0)/selectedGroup?.visits?.reduce((acc, curr) => acc+curr.visit?.length, 0))*100).toFixed(2)}%` || 'Loading...'}
                    paragarph={"Engagement"}
                    backColor={"#C53245"}
                  />
                </div>

                <div className="row mt-4">
                  <div className="col-md-5">
                    <div className="group_backwhite h-100">
                      <div className="groupname">
                        <p className="name">group overview</p>

                        <div className="p-2">
                          <Doughnut data={data()} options={doughOptions} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7">
                    <div
                      className="group_backwhite h-100"
                      style={{ height: "324px" }}
                    >
                      <div className="groupname">
                        <p className="name mb-4">Health Risk Summary</p>
                        <div style={{
                            height: "260px",
                            padding: "10px"
                        }}>
                          <Line data={dataLine()} height={"100%"} options={{ maintainAspectRatio: false }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group_backwhite mt-4 p-4 flex-fill">
                    <h5 className="name">Care Team</h5>

                    <div className="row">
                      <div className="col-sm-3 px-0 text-center">
                        <div className="shadow-sm rounded px-3 m-2 py-2">
                          <img src="images/profile.png" width="100%" className="rounded-circle mb-2" alt="" />
                          <p>Angela Smith</p>
                        </div>
                      </div>

                      <div className="col-sm-3 px-0 text-center">
                        <div className="shadow-sm rounded px-3 m-2 py-2">
                          <img src="images/profile.png" width="100%" className="rounded-circle mb-2" alt="" />
                          <p>Angela Smith</p>
                        </div>
                      </div>

                      <div className="col-sm-3 px-0 text-center">
                        <div className="shadow-sm rounded px-3 m-2 py-2">
                          <img src="images/profile.png" width="100%" className="rounded-circle mb-2" alt="" />
                          <p>Angela Smith</p>
                        </div>
                      </div>

                      <div className="col-sm-3 px-0 text-center">
                        <div className="shadow-sm rounded px-3 m-2 py-2">
                          <img src="images/profile.png" width="100%" className="rounded-circle mb-2" alt="" />
                          <p>Angela Smith</p>
                        </div>
                      </div>

                      <div className="col-sm-3 px-0 text-center">
                        <div className="shadow-sm rounded px-3 m-2 py-2">
                          <img src="images/profile.png" width="100%" className="rounded-circle mb-2" alt="" />
                          <p>Angela Smith</p>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupActivities;
