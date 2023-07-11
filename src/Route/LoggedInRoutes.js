import React from "react";
import Dasboard from "../components/dasboard/Dasboard";
import TodayAppointment from "../components/appointment/TodayAppointment";
import { Routes, Route, Navigate } from "react-router-dom";
import GroupSession from "../components/upcomingGroupSessions/GroupSession";
import BookingRequest from "../components/bookingRequest/BookingRequest";
import AllBlogs from "../components/blog/AllBlogs";
import Message from "../components/message/Message";
import ActiveProgram from "../components/activeProgram/ActiveProgram";
import Groups from "../components/groups/Groups";
import MyProfile from "../components/profile/MyProfile";
import AddNewPatient from "../components/allPatient/AddNewPatient";
import Recipe from "../components/recipes/Recipe";
import Nutrition from "../components/foodDatabase/Nutrition";

import EditNutrition from "../components/foodDatabase/EditNutrition";
import EditBlog from "../components/blog/EditBlog";
import AllPatient from "../components/allPatient/AllPatient";
import DrManagement from "../components/DrManagement/DrManagement";
import EditProfile from "../components/DrManagement/EditProfile";
import EditRecipe from "../components/recipes/EditRecipe";
import Calender from "../components/calendar/Calender";
import EditAffirmations from "../components/allPatient/EditAffirmations";
import EditChecklist from "../components/allPatient/EditChecklist";
import AllPatientOverview from "../components/allPatient/AllPatientOverview";
import Members from "../components/members/Members";
import CareTeam from "../components/Careteam/CareTeam";
import CarePlan from "../components/carePlan/carePlan";
import GroupChats from "../components/groups/GroupChats";
import GroupDetails from "../components/groups/GroupDetails";
import CarePlanDescription from "../components/carePlan/CarePlanDescription";
import CarePlanGoals from "../components/carePlan/CarePlanGoals";
import CarePlanTask from "../components/carePlan/CarePlanTask";
import FoodDatabase from "../components/foodDatabase/foodDatabase";
import MealPlan from "../components/foodDatabase/MealPlan";
import Logout from "../components/logout/Logout";
import CarePlanGoalsEdit from "../components/carePlan/CarePlanGoalsEdit";
import AllPatientList from "../components/allPatient/AllPatientList";
import MyRatingsList from "../components/profile/MyRatingsList";
import CarePlanTaskEdit from "../components/carePlan/CarePlanTaskEdit";
import DailyJournal from "../components/allPatient/DailyJournal";
import LifeStyle from "../components/allPatient/LifeStyle";
import MyPatientActiveProgram from "../components/allPatient/MyPatientActiveProgram";
import MyPatientGroup from "../components/allPatient/MyPatientGroup";
import EditUserLifeStyle from "../components/allPatient/EditUserLifeStyle";
import UserGoal from "../components/allPatient/UserGoal";
import ActiveProgramList from "../components/activeProgram/ActiveProgramListLeftSection";
// import ActiveDescriptiponCreate from "../components/activeProgram/ActiveDescriptiponCreate";
import ViewRecipe from "../components/recipes/ViewRecipe";
import MyPatientCarePlan from "../components/allPatient/MyPatientCarePlan";
import Messages from "../components/QB/Messages";
import PrivacyPolicy from "../components/policies/PrivacyPolicy";
import PolicyUsages from "../components/policies/PolicyUsages";
import ContactUs from "../components/policies/ContactUs";
import EditPatient from "../components/allPatient/EditPatient";
import EditDoctor from "../components/DrManagement/EditDoctor";
import AddDoctor from "../components/DrManagement/AddDoctor";
import MealPlanTemplate from "../components/allPatient/MealPlanTemplate";
import AddRecipe from "../components/recipes/AddRecipe";
import GroupAdd from "../components/groups/GroupAdd";
import GroupUpdate from "../components/groups/GroupUpdate";
import GroupPostAdd from "../components/groups/GroupPostAdd";
import ActiveProgramInfo from "../components/activeProgram/ActiveProgramInfo";
import CarePlan_ from "../components/carePlan_";
import CreatePlanTabs from "../components/carePlan_/CreatePlanTabs";
import EditPlanTabs from "../components/carePlan_/EditPlanTabs";
import CarePlanInfo from "../components/carePlan_/CarePlanInfo";
import AllPatientInfo from "../components/allPatient/AllPatientInfo";
import ViewEvent from "../components/calendar/ViewEvent";
import Medications from "../components/carePlan_/Medications";
import AddFormsAndWaiver from "../components/carePlan_/AddFormsAndWaiver";
import EditFormsAndWaiver from "../components/carePlan_/EditFormsAndWaiver";
import EditFormsAndWaiverTemplate from "../components/carePlan_/EditFormsAndWaiverTemplate";
import ViewFormsAndWaiver from "../components/carePlan_/ViewFormsAndWaiver";
import Supplements from "../components/carePlan_/Supplements";
import SupplementsView from "../components/carePlan_/SupplementsView";
import MealPlanView from "../components/carePlan_/MealPlanView";
import FitnessPlanView from "../components/carePlan_/FitnessPlanView";
import AffirmationsView from "../components/carePlan_/AffirmationsView";
import FormsView from "../components/carePlan_/FormsView";
import MedicationsView from "../components/carePlan_/MedicationsView";
import FormsAndWaiverView from "../components/carePlan_/FormsAndWaiverView";
import ActiveProgramCreateTabs from "../components/activeProgram/ActiveProgramCreateTabs";
import AddBlog from "../components/blog/AddBlog";
import ViewBlog from "../components/blog/ViewBlog";
import BlogsDetail from "../components/blog/BlogsDetail";
import GroupInfo from "../components/groups/GroupInfo";
import GroupActivities from "../components/groups/GroupActivities";
import SinglePostMessage from "../components/groups/SinglePostMessage";
import ActiveTemplate from "../components/activeProgram/ActiveTemplate";
import CareTemplateTabs from "../components/carePlan_/CareTemplateTabs";
import ViewMealPlan from "../components/foodDatabase/ViewMealPlan";
import EditMealPlan from "../components/foodDatabase/EditMealPlan";
import AddNewMealPlan from "../components/foodDatabase/AddMealPlan";
import ResponseListView from "../components/carePlan_/ResponseListView";
import MyLibrary from "../components/mylibrary/MyLibrary";
import FitnessPlan from "../components/fitnessPlan/FitnessPlan";
import AddNewExercise from "../components/fitnessPlan/AddNewExercise";
import ViewExercise from "../components/fitnessPlan/ViewExercise";
import AddNewFitnessplan from "../components/fitnessPlan/AddNewFitnessplan";
import EditExercise from "../components/fitnessPlan/EditExercise";
import ViewFitnessplan from "../components/fitnessPlan/ViewFitnessplan";
import Activate from "../components/activate/Activate";
import GroupPolls from "../components/groups/GroupPolls";
import GroupFiles from "../components/groups/GroupFiles";
import Affairmation from "../components/Affairmation/Affairmation";
import GroupAllProgram from "../components/groups/GroupAllPrograms";
import GroupAllCareplans from "../components/groups/GroupAllCareplans";
import ViewCareTeam from "../components/Careteam/ViewCareTeam";
import MyServices from "../components/myServices/MyServices";
import IndividualSession from "../components/myServices/IndividualSession";
import GroupSessionService from "../components/myServices/GroupSessionService";
import ViewMyService from "../components/myServices/ViewMyService";

const LoggedInRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dasboard />} />
        <Route exact path="/todayappointment" element={<TodayAppointment />} />
        <Route exact path="/upcominggroupsession" element={<GroupSession />} />
        <Route exact path="/bookingrequest" element={<BookingRequest />} />
        <Route exact path="/message" element={<Message />} />
        <Route exact path="/blog" element={<AllBlogs />} />
        <Route exact path="/EditBlog" element={<EditBlog />} />
        <Route exact path="/activeprogram" element={<ActiveProgram />} />
        <Route exact path="/caredescription" element={<CarePlanDescription />} />
        <Route exact path="/caregoal" element={<CarePlanGoals />} />
        <Route exact path="/caretask" element={<CarePlanTask />} />
        <Route exact path="/mycareplan" element={<CarePlan />} />
        <Route exact path="/careplan" element={<CarePlan_ />} />
        <Route exact path="/createplan" element={<CreatePlanTabs />} />
        <Route exact path="/careplaninfo" element={<CarePlanInfo />} />
        <Route exact path="/editplan" element={<EditPlanTabs />} />
        <Route exact path="/plantemplate" element={<CareTemplateTabs />} />
        <Route exact path="/caregoaledit" element={<CarePlanGoalsEdit />} />
        <Route exact path="/careplantaskedit" element={<CarePlanTaskEdit />} />
        <Route exact path="/medications" element={<Medications />} />
        <Route exact path="/addformsandwaiver" element={<AddFormsAndWaiver />} />
        <Route exact path="/editformsandwaiver" element={<EditFormsAndWaiver />} />
        <Route exact path="/editformsandwaivertemplate" element={<EditFormsAndWaiverTemplate />} />
        <Route exact path="/viewformsandwaiver" element={<ViewFormsAndWaiver />} />
        <Route exact path="/supplements" element={<Supplements />} />
        <Route exact path="/supplementsview" element={<SupplementsView />} />
        <Route exact path="/mealplanview" element={<MealPlanView />} />
        <Route exact path="/fitnessplanview" element={<FitnessPlanView />} />
        <Route exact path="/affirmationsview" element={<AffirmationsView />} />
        <Route exact path="/formsview" element={<FormsView />} />
        <Route exact path="/medicationsview" element={<MedicationsView />} />
        <Route exact path="/formsandwaiver" element={<FormsAndWaiverView />} />
        <Route exact path="/responseview" element={<ResponseListView />} />
        <Route exact path="/recipes" element={<Recipe />} />
        <Route exact path="/EditRecipe" element={<EditRecipe />} />
        <Route exact path="/nutrition" element={<Nutrition />} />
        <Route exact path="/mealplan" element={<MealPlan />} />
        <Route exact path="/foodDatabase" element={<FoodDatabase />} />
        <Route exact path="/EditNutrition" element={<EditNutrition />} />
        <Route exact path="/groups" element={<Groups />} />
        <Route exact path="/myprofile" element={<MyProfile />} />
        <Route exact path="/addnewpatient" element={<AddNewPatient />} />
        <Route exact path="/editpatient" element={<EditPatient />} />
        <Route exact path="/editdoctor" element={<EditDoctor />} />
        <Route exact path="/adddoctor" element={<AddDoctor />} />
        <Route exact path="/allpatient" element={<AllPatient />} />
        <Route exact path="/calender" element={<Calender />} />
        <Route exact path="/doctorviewprofile" element={<DrManagement />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/editaffirmations" element={<EditAffirmations />} />
        <Route exact path="/editchecklist" element={<EditChecklist />} />
        <Route exact path="/allpatientoverview" element={<AllPatientOverview />} />
        <Route exact path="/allpatientinfo" element={<AllPatientInfo />} />
        <Route exact path="/members" element={<Members />} />
        <Route exact path="/mycareteam" element={<CareTeam />} />
        <Route exact path="/groupchats" element={<GroupChats />} />
        <Route exact path="/grouppostadd" element={<GroupPostAdd />} />
        <Route exact path="/groupadd" element={<GroupAdd />} />
        <Route exact path="/groupupdate" element={<GroupUpdate />} />
        <Route exact path="/groupinfo" element={<GroupInfo />} />
        <Route exact path="/groupdetails" element={<GroupDetails />} />
        <Route exact path="/groupactivities" element={<GroupActivities />} />
        <Route exact path="/groupposts" element={<SinglePostMessage />} />
        <Route exact path="/grouppolls" element={<GroupPolls />} />
        <Route exact path="/groupfiles" element={<GroupFiles />} />
        <Route exact path="/groupprograms" element={<GroupAllProgram />} />
        <Route exact path="/groupcareplans" element={<GroupAllCareplans />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/allpatientlist" element={<AllPatientList />} />
        <Route exact path="/myratingslist" element={<MyRatingsList />} />
        <Route exact path="/dailyjournal" element={<DailyJournal />} />
        <Route exact path="/lifestyle" element={<LifeStyle />} />
        <Route exact path="/affirmation" element={<Affairmation />} />
        <Route exact path="/mypatientactiveprogram" element={<MyPatientActiveProgram />} />
        <Route exact path="/mypatientgroup" element={<MyPatientGroup />} />
        <Route exact path="/edituserlifestyle" element={<EditUserLifeStyle />} />
        <Route exact path="/usergoal" element={<UserGoal />} />
        <Route exact path="/activeprograminfo" element={<ActiveProgramInfo />} />
        <Route exact path="/activeprogramlist" element={<ActiveProgramList />}>
          <Route path=":userId" element={<ActiveProgramList />} />
        </Route>
        <Route exact path="/activeprogramtemplate" element={<ActiveTemplate />} />
        <Route exact path="/createactiveprogram" element={<ActiveProgramCreateTabs />} />
        <Route exact path="/viewrecipe" element={<ViewRecipe />} />
        <Route exact path="/viewmealplan" element={<ViewMealPlan />} />
        <Route exact path="/editmealplan" element={<EditMealPlan />} />
        <Route exact path="/addmealplan" element={<AddNewMealPlan />} />
        <Route exact path="/mypatientcareplan" element={<MyPatientCarePlan />} />
        <Route exact path="/messages" element={<Message />} />
        <Route exact path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route exact path="/contactus" element={<ContactUs />} />
        <Route exact path="/policyusages" element={<PolicyUsages />} />
        <Route exact path="/addrecipe" element={<AddRecipe />} />
        <Route exact path="/viewevent" element={<ViewEvent />} />
        <Route exact path="/addblog" element={<AddBlog />} />
        <Route exact path="/viewblog" element={<ViewBlog />} />
        <Route exact path="/blogsdetail" element={<BlogsDetail />} />
        <Route exact path="/mylibrary" element={<MyLibrary />} />
        <Route exact path="/fitnessplan" element={<FitnessPlan />} />
        <Route exact path="/addnewexercise" element={<AddNewExercise />} />
        <Route exact path="/viewexercise" element={<ViewExercise />} />
        <Route exact path="/editexercise" element={<EditExercise />} />
        <Route exact path="/createfitnessplan" element={<AddNewFitnessplan />} />
        <Route exact path="/viewfitnessplan" element={<ViewFitnessplan />} />
        <Route path="/user/account/activate/:id/:token" element={<Activate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route exact path="/viewcareteam" element={<ViewCareTeam />} />
        <Route exact path="/myservices" element={<MyServices />} />
        <Route exact path="/individualsession" element={<IndividualSession />} />
        <Route exact path="/groupsessionservice" element={<GroupSessionService />} />
        <Route exact path="/viewmyservice" element={<ViewMyService />} />
      </Routes>
    </>
  );
};

export default LoggedInRoutes;
