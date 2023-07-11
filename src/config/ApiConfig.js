const apiUrl = process.env.REACT_APP_API_URL;
const MAP_API_KEY = `AIzaSyCOGh0G1g74y_hm18nLULwLASMdyW-nbUs`;
const baseUrl = apiUrl;
const zoomCodeUrl = process.env.REACT_APP_ZOOM_API_URL;
const recipeImageUrl = process.env.REACT_APP_RECIPE_IMAGE_URL + "recipe/";
const ImageUrl = process.env.REACT_APP_RECIPE_IMAGE_URL;
const programImageUrl = process.env.REACT_APP_PROGRAM_IMAGE_URL;
const baseUrlApi = `${baseUrl}/`;

// const QBDetail = {
//   APPLICATION_ID: process.env.REACT_APP_QB_APPLICATION_ID,
//   AUTH_KEY: process.env.REACT_APP_QB_AUTH_KEY,
//   AUTH_SECRET: process.env.REACT_APP_QB_AUTH_SECRET,
//   ACCOUNT_KEY: process.env.REACT_APP_QB_ACCOUNT_KEY,
// }

// const QBConfigDev = {
//   appId: '97620',
//   authKey: 'avkL273XXMZA6Md',
//   authSecret: 'sAf2-u8RNLXLypB',
//   accountKey: 'z5ijBBbz-AHxKCcqTo6g'
// }

// const QBConfigProd = {
//   appId: '97781',
//   authKey: 'sGCnY8k63wfc8LH',
//   authSecret: '7Ay2MdmLGenn6pa',
//   accountKey: 'j5J56PP1Cxw9xPgtts_4'
// }

// const SENDBIRDDetails = {
//   APPLICATION_ID: process.env.REACT_APP_SENDBIRD_APP_ID
// }

let ApiConfig = {
  baseUrl,
  baseUrlApi,
  MAP_API_KEY,
  recipeImageUrl,
  ImageUrl,
  programImageUrl,
  zoomCodeUrl,
  // SENDBIRDDetails,
  // QBDetail,
  userID: `62baf016f4bb788dbda658d6`,// TODO: Change the ID
  goalID: `62bbef0c07aec96c4d26669d`,// TODO: Change the Goal ID for care plans task 
  token: null,
  checkZoomCodeStatus: `${baseUrlApi}JwtIsZoomAdded`,
  zoomCode: `${baseUrlApi}connectZoom?code=`,
  createZoomMeeting: `${baseUrlApi}jwtcreateMeeting`,
  addZoomDetail: `${baseUrlApi}zoomJwtApp`,
  login: `${baseUrlApi}doctor/login`,
  signUp: `${baseUrlApi}doctor/signup`,
  forgotPassword: `${baseUrlApi}doctor/reset/link`,
  resetPassword: `${baseUrlApi}doctor/reset/password`,
  activeStatusChange: `${baseUrlApi}doctor_update/online/status`,
  activateAccount: `${baseUrlApi}user/account/activate`,
  //ThirdPartyAPI CarePlan
  // getSupplements: `https://api-us-snd.fullscript.io/api/catalog/supplement_types`,
  // For Lifestyle
  getLifeStyleTemplateList: `${baseUrlApi}admin/template/lifestyle/list`,
  addNewTemplate: `${baseUrlApi}admin/template/lifestyle/add_name`,
  getAdminLifeStyleList: `${baseUrlApi}admin/template/lifestyle/combined_list/`,
  getLifeStyleList: `${baseUrlApi}lifestyle/combined/list/`,
  addAffirmation: `${baseUrlApi}lifestyle/add/affirmation`,
  deleteAffirmation: `${baseUrlApi}lifestyle/delete/affirmation/`,
  // For Lifestyle CheckList
  addCheckList: `${baseUrlApi}lifestyle/add/question`,
  deleteCheckList: `${baseUrlApi}lifestyle/delete/question/`,
  // For Lifestyle mark affirmations
  markAffirmations: `${baseUrlApi}lifestyle/create`,
  adminMarkAffirmation: `${baseUrlApi}admin/template/lifestyle/add_details`,
  // For users lifestyle detail
  userLifeStyle: `${baseUrlApi}admin/user/lifestyle/combined/list?category=`,
  changeUserLifestyleTemplate: `${baseUrlApi}admin/template/assign_lifestyle`,
  //For doctor register
  addDoctor: `${baseUrlApi}doctor/register`,
  //For doctor categories
  getCategories: `${baseUrlApi}doctor/categories`,
  //For doctor qualification - Add & List
  getQualifications: `${baseUrlApi}doctor/qualifications`,
  //For doctor services
  getServices: `${baseUrlApi}doctor/services`,
  //For doctor profile
  getDoctorProfile: `${baseUrlApi}doctor/profile`,
  //For doctor edit profile
  editDoctorProfile: `${baseUrlApi}admin/edit_Doctor_Profile`,
  //For doctor email update
  editDoctorEmail: `${baseUrlApi}admin/email/edit`,
  //For doctor email otp send for update
  editDoctorEmailOtp: `${baseUrlApi}admin/email/edit/otp`,
  //For doctor availabilty list
  getAvailability: `${baseUrlApi}admin/doctor/get/availability`,
  getAvailableSlots: `${baseUrlApi}admin/doctor/get/combined/availability/timing`,
  getBookingByDate: `${baseUrlApi}admin/appointment/date/list`,
  getBookingByStatus: `${baseUrlApi}admin/appointment/date/status/list`,
  rescheduleSlots: `${baseUrlApi}admin/reschedule/appointment`,
  //For adding doctor availabilty
  addAvailability: `${baseUrlApi}admin/doctor/set/availability`,
  //For adding doctor unavailabilty
  addUnavailability: `${baseUrlApi}admin/appointment/add/unavailablity`,
  //For all forms
  getAllFormData: `${baseUrlApi}admin/careplan/doc/forms`,
  //For getting doctor booking
  getBookings: `${baseUrlApi}admin/doctor/getbookingsbystatus?status=pending`,
  //For getting doctor upcoming bootkings
  getUpcomingBookings: `${baseUrlApi}doctor/getfuturebookings`,
  //For Upcoming Group Sessions
  getUpcomingGroupSession: `${baseUrlApi}admin/program/upcoming/group_session `,
  //For Group Dashboard
  getGroupsList: `${baseUrlApi}elimination_program/present/group`,
  //For doctor booking status
  updateBookingStatus: `${baseUrlApi}admin/doctor/updatebookingstatus`,
  confirmBookingStatus: `${baseUrlApi}admin/appointment/status`,
  //For getting doctor booking by Date
  getBookingsByDate: `${baseUrlApi}admin/doctor/confirmedbookingsbydate`,
  //For getting doctor post booking
  getPastBookings: `${baseUrlApi}doctor/getpastbookings`,
  //For adding lifestyle by doctor to patient
  addLifeStyle: `${baseUrlApi}admin/template/assign_lifestyle`,
  addElimination: `${baseUrlApi}admin/elimination_program/approveUserToProgram`,
  addMealPlan: `${baseUrlApi}meal/assign-user?mealid=`,
  AddExcelSheet: `${baseUrlApi}user/register/email`,

  //For Patient registration
  addPatient: `${baseUrlApi}user/register`,
  //For Patient lifestyle
  getLifestyle: `${baseUrlApi}admin/template/lifestyle/list`,
  //For Patient careplan
  getCarePLan: `${baseUrlApi}admin/careplan`,
  //For Patient eleimination
  getElimination: `${baseUrlApi}admin/elimination_program/joinAble?user_id=`,
  //For Patient nutrition
  getMealPlan: `${baseUrlApi}admin/get_meal_list`,
  changePatientStatus: `${baseUrlApi}admin/change_user_status?userId=`,
  changeDoctorStatus: `${baseUrlApi}admin/change_doc_status?doctorId=`,

  //For Care Plan
  createCarePlan: `${baseUrlApi}admin/careplan/create`,
  updateCarePlan: `${baseUrlApi}admin/careplan/update?care_plan_id=`,
  assignGroupCarePlan: `${baseUrlApi}admin/groups/assign`,
  getAllCarePlanList: `${baseUrlApi}admin/careplan?sortType=createdAt&careplanId=`,
  getDefaultCarePlan: `${baseUrlApi}careplan/default/search`,
  setDefaultPlan: `${baseUrlApi}careplan/default/select?careplanId=`,
  getSingleCarePlan: `${baseUrlApi}admin/careplan/`,
  getCareplanShareLink: `${baseUrlApi}careplan/share/link?careplanId=`,
  createGoalPlan: `${baseUrlApi}careplan/goals/create?careplanId=`,
  createFilePlan: `${baseUrlApi}admin/careplan/add/file?carePlanId=`,
  createCarePlanForm: `${baseUrlApi}forms/create`,
  updateCarePlanForm: `${baseUrlApi}forms/update`,
  getCarePlanFormList: `${baseUrlApi}forms/mylist`,
  getCarePlanDefaultFormList: `${baseUrlApi}forms/default/detail`,
  getSingleCarePlanFormList: `${baseUrlApi}forms/detail?formId=`,
  getCarePlanFormResponseList: `${baseUrlApi}forms/answer/list?formId=`,
  // formListSumbitService: `${baseUrlApi}forms/answer/detail?formId=`,
  formListSumbitService: `${baseUrlApi}forms/answer?formId=`,
  getFormShareLink: `${baseUrlApi}forms/share/link?formId=`,
  formTemplate: `${baseUrlApi}forms/default?formId=`,
  updateGoalPlan: `${baseUrlApi}careplan/goals/update?careplanId=`,
  getSingleGoal: `${baseUrlApi}careplan/goals/detail?goalId=`,
  getGoalsList: `${baseUrlApi}careplan/goals/mylist?sortType=createdAt&careplanId=`,
  deleteGoal: `${baseUrlApi}careplan/goals/delete?goalId=`,
  createExercise: `${baseUrlApi}careplan/exercise/create`,
  updateExercise: `${baseUrlApi}careplan/exercise/update?exerciseId=`,
  deleteExercise: `${baseUrlApi}careplan/exercise/delete?exerciseId=`,
  getExerciseList: `${baseUrlApi}careplan/exercise/mylist?sortType=createdAt&keyword=`,
  getExerciseListById: `${baseUrlApi}careplan/exercise/detail?exerciseId=`,
  // for post program
  postActivePrograms: `${baseUrlApi}admin/program/register`,
  activateProgram: `${baseUrlApi}admin/program/activate?programId=`,
  defaultProgram: `${baseUrlApi}program/default/select?programId=`,
  deleteProgram: `${baseUrlApi}program/delete?programId=`,
  defaultGroup: `${baseUrlApi}group/default/select?groupId=`,
  getProgramShareLink: `${baseUrlApi}program/share/link?programId=`,
  getGroupShareLink: `${baseUrlApi}group/share/link?groupId=`,
  // for get program list 
  getActivePrograms: `${baseUrlApi}admin/program/list?keyword=`,
  getAssignedPrograms: `${baseUrlApi}admin/provider/program/list`,
  getDefaultPrograms: `${baseUrlApi}program/default/search`,
  getDefaultGroups: `${baseUrlApi}group/default/search`,
  // for add sessions 
  postSessions: `${baseUrlApi}admin/program/session/create`,
  // for add module 
  postModule: `${baseUrlApi}admin/program/module/create?programId=`,

  // post forum ask question by doctor

  postAskQues: `${baseUrlApi}program/forums/question/create`,

  //put forum reply answer by doctor

  putReplyAnswer: `${baseUrlApi}program/forums/answer/comment`,
  editQuestion: `${baseUrlApi}program/forums/question/edit`,
  editAnswer: `${baseUrlApi}program/forums/answer/edit`,
  editReplyAnswer: `${baseUrlApi}program/forums/reply/edit`,

  //nested reply by doctor
  putReplyToAnswer: `${baseUrlApi}program/forums/answer/reply`,

  // post member message by doctor

  postMemberMessage: `${baseUrlApi}elimination_program/member/message`,

  //put member reply by doctor

  putMemberReply: `${baseUrlApi}elimination_program/member/message_reply`,

  //put member nested reply  by doctor
  inviteMembers: `${baseUrlApi}user/register/email`,
  putMemberReplyAnswer: `${baseUrlApi}elimination_program/member/reply_message_reply`,

  //Like Dislike member message
  likeDislikeMemberMsg: `${baseUrlApi}elimination_program/member/message/like_dislike`,

  // For Active program 
  getActiveProgramById: `${baseUrlApi}user/program/detail?programId=`,
  updateProgramById: `${baseUrlApi}admin/program/update?programId=`,
  updateCareTeamProgramById: `${baseUrlApi}admin/care/team/program/update?programId=`,
  getGroupForProgram: `${baseUrlApi}group/assigned/modules`,
  assignProgramMembers: `${baseUrlApi}program/add/member?programId=`,
  getActiveSession: `${baseUrlApi}program/session?programId=`,
  deleteSession: `${baseUrlApi}admin/program/session/delete?sessionId=`,
  deleteModule: `${baseUrlApi}admin/program/module/delete?programId=`,
  deleteMealPlan: `${baseUrlApi}admin/delete_meal_plan?mealid=`,
  getActiveModule: `${baseUrlApi}admin/program/module/get/list?programId=`,
  getSIngleActiveModule: `${baseUrlApi}admin/program/module/get?programId=`,
  getSIngleActiveSession: `${baseUrlApi}program/session/detail?programId=`,
  putSIngleActiveModule: `${baseUrlApi}admin/program/module/update?programId=`,
  putSIngleActiveSession: `${baseUrlApi}admin/program/session/update`,
  getActiveForums: `${baseUrlApi}program/forums/search?programId=`,
  getActiveMembers: `${baseUrlApi}admin/program/member/detail?programId=`,
  getActiveMessage: `${baseUrlApi}elimination_program/member?ep_id=`,
  getApproveMember: `${baseUrlApi}admin/elimination_program/approved/members?ep_id=`,
  getWaitingMember: `${baseUrlApi}admin/elimination_program/waiting/members?ep_id=`,
  watingToApprove: `${baseUrlApi}admin/elimination_program/approveUser?ep_id=`,
  getPatientList: `${baseUrlApi}admin/user_search?keyword=`,
  getVisits: `${baseUrlApi}admin/appointment/user/count?userId=`,
  getMyPatientList: `${baseUrlApi}doctor/user/list`,
  deleteQuestion: `${baseUrlApi}program/forums/question/delete`,
  deleteAnswer: `${baseUrlApi}program/forums/answer/delete`,
  deleteAnswerReply: `${baseUrlApi}program/forums/reply/delete`,
  deleteMemberProgram: `${baseUrlApi}admin/program/member/delete`,
  deleteReminder: `${baseUrlApi}admin/doctor/reminders/`,
  reactOnQuestion: `${baseUrlApi}program/forums/question/like`,
  reactOnAnswer: `${baseUrlApi}program/forums/answer/like`,
  patientActiveProgramDetail: `${baseUrlApi}admin/user/program/joined?userId=`,
  patientCarePlanDetail: `${baseUrlApi}admin/careplan/recommended/user?userId=`,
  // patientActiveProgramList: `${baseUrlApi}admin/elimination_program/joinAble?user_id=`,
  addPatientActiveProgramService: `${baseUrlApi}admin/user/program/connect`,
  addPatientCarePlanService: `${baseUrlApi}admin/careplan/assign/user`,
  getSessionDays: `${baseUrlApi}program/session/days?programId=`,
  // get reminder

  getReminderList: `${baseUrlApi}admin/doctor/reminders`,

  // post reminder

  postReminderData: `${baseUrlApi}admin/doctor/reminders`,


  //For Blog
  blogList: `${baseUrlApi}doctor`,
  getAllBlog: `${baseUrlApi}admin/doctor/getblog?type=all`,
  getAllBlogBydate: `${baseUrlApi}admin/doctor/getblog?type=date&keyword=`,
  get_blog_tags: `${baseUrlApi}get_blog_tags`,

  //For Group
  createGroup: `${baseUrlApi}admin/groups`,
  createPost: `${baseUrlApi}group`,
  addComment: `${baseUrlApi}group/post`,
  getCareplanList: `${baseUrlApi}careplan/groups/list`,
  getProgramList: `${baseUrlApi}user/program/group/list`,
  getGroupPosts: `${baseUrlApi}group`,
  updateGroup: `${baseUrlApi}admin/groups`,
  getMyGroupList: `${baseUrlApi}admin/groups/list?keyword=`,
  getGroupbyId: `${baseUrlApi}user/group/detail?groupId=`,
  getGroupAssesmentScore: `${baseUrlApi}group/assessment/score?groupId=`,
  getGroupAssesmentScoreGraph: `${baseUrlApi}group/assessment/score/graph?groupId=`,
  deleteGroup: `${baseUrlApi}group/delete?groupId=`,
  deletePost: `${baseUrlApi}group/post/delete?postId=`,
  deleteComment: `${baseUrlApi}group/comment/delete`,
  deleteCommentReply: `${baseUrlApi}group/reply/delete`,
  deleteMember: `${baseUrlApi}admin/groups/members/delete`,
  likePost: `${baseUrlApi}group/post/like?postId=`,
  //For AWS
  awsBaseUrl: `https://d3lnwbtpm2rigy.cloudfront.net/`,
  getAWSFileUploadUrl: `${baseUrlApi}user/get-upload-url?type=put&`, // for profile upload
  getAWSFileUploadUrlBlog: `${baseUrlApi}blog/get-upload-url?type=put&`, // For Blog upload
  getAWSFileUploadUrlGroup: `${baseUrlApi}admin/groups/upload?type=put&`, // For Group image upload
  getAWSFileUploadUrlPostImage: `${baseUrlApi}group/post/media/upload?type=put&media=image&`, // For Group Post image upload
  getAWSFileUploadUrlPostVideo: `${baseUrlApi}group/post/media/upload?type=put&media=video&`, // For Group Post video upload
  getAWSFileUploadUrlExerciseVideo: `${baseUrlApi}careplan/exercise/upload?type=put&media=video&`, // For exercise video upload
  getAWSFileUploadUrlPostDocument: `${baseUrlApi}group/post/media/upload?type=put&media=document&`, // For Group Post video upload
  getAWSFileUploadUrlPostDocThumb: `${baseUrlApi}group/post/media/upload?type=put&media=thumbnail&`, // For Group Post doc thumbnail upload
  getAWSDoctorProfileUpload: `${baseUrlApi}doctor/get-upload-url?type=put&`, // For doctor upload
  getAWSCarePlanUpload: `${baseUrlApi}careplan/get-upload-url?type=put&`,
  getAWSRecipeUpload: `${baseUrlApi}admin/get_upload_url_recipe_image?type=put&`,
  // getAWSCreateActiveProgram: `${baseUrlApi}doctor/get_upload_url_eprogram_image?type=put&`,
  getAWSCreateActiveProgram: `${baseUrlApi}admin/program/upload?type=put&`,
  getAWSMealProgram: `${baseUrlApi}meal/get-upload-url?type=put&`,
  getAWSBlogAttachmentUpload: `${baseUrlApi}upload/blog/attachments?type=put&`,
  getAWSModuleAttachmentUpload: `${baseUrlApi}admin/program/module/upload?type=put&fileType=documents&`,
  getAWSModuleImageUpload: `${baseUrlApi}admin/program/module/upload?type=put&fileType=image&`,
  // getAWSModuleAttachmentUpload: `${baseUrlApi}admin/program/module/upload?type=put&`,

  // For services 
  getServiceList: `${baseUrlApi}admin/appointment/service/list`,
  addIndividualService: `${baseUrlApi}admin/appointment/service`,
  deleteMyService:`${baseUrlApi}appointment/delete/service/id?serviceId=`,
  

  // For Nutrition
  addRecipe: `${baseUrlApi}admin/add_recipe`,
  updateRecipe: `${baseUrlApi}admin/update_recipe?recipeId=`,
  deleteRecipe: `${baseUrlApi}admin/delete_recipe?recipeId=`,
  getRecipes: `${baseUrlApi}admin/get_recipes`,
  getRecommendedRecipes: `${baseUrlApi}get_recipe_default`,
  getRecipeByID: `${baseUrlApi}doctor/get_recipe_byId?recipeId=`,
  deleteRecipeByID: `${baseUrlApi}admin/delete_recipe?recipeId=`,

  // Affairmation
  getAffairmation: `${baseUrlApi}lifestyle/affirmation/get`,
  updateAffairmation: `${baseUrlApi}lifestyle/affirmation/add/details`,

  // For Dashboard
  getQuickUpdates: `${baseUrlApi}admin/get_all_quickupdates`,

  // For Patient Overview
  getUserVital: `${baseUrlApi}admin/user/assesment/vitals/get`,
  getUserAllergy: `${baseUrlApi}admin/get/allergydocument`,
  getUserAssesment: `${baseUrlApi}admin/user/assesment`,
  getUserSymptoms: `${baseUrlApi}admin/user/symptoms`,
  getUserGoals: `${baseUrlApi}user/get_user_nutrition_goals`,
  getUserScore: `${baseUrlApi}admin/user/assesment/score`,
  getFormResponses: `${baseUrlApi}careplan/doc/user/forms`,
  getFormSelfResponses: `${baseUrlApi}user/id/self/forms`,

  updatePatientProfile: `${baseUrlApi}doctor/user_update/profile`,
  updateDoctorProfile: `${baseUrlApi}admin/doctor_update/profile`,
  sendInvitation: `${baseUrlApi}user/register`,

  //For Patient Daily Journal
  getDailyEat: `${baseUrlApi}admin/eat/fetch?userId=$user_id&date=$date`,
  getDailySleep: `${baseUrlApi}admin/sleep/fetch?userId=$user_id&date=$date`,
  getDailyMove: `${baseUrlApi}admin/move/fetch?userId=$user_id&date=$date`,
  getDailyReflect: `${baseUrlApi}admin/reflect/fetch?userId=$user_id&date=$date`,
  getDailyWaterIntake: `${baseUrlApi}admin/get_user_water_intake?userId=$user_id&date=$date`,
  getDailyFeeling: `${baseUrlApi}admin/get_user_feeling?userId=$user_id&date=$date`,

  //Meal Plan
  // getMealPlan : `${baseUrlApi}admin/get_meal_list`,
  changeUserMealPlan: `${baseUrlApi}meal/assign-user?mealid=$meal_id`,
  getMealPlanInfo: `${baseUrlApi}admin/get_meal_info?mealid=$meal_id`,
  getUserMealPlanInfo: `${baseUrlApi}admin/user/get-meal-plan?userId=$userId`,
  uploadMealFile: `${baseUrlApi}admin/add_meal_plan`,
  getMealPlanList: `${baseUrlApi}admin/get_meal_list`,
  getRecommenededMealPlanList: `${baseUrlApi}get_mealplan_default`,
  getMealPlanAvailable: `${baseUrlApi}admin/mealplan/name/availability?mealPlanName=`,
  addNewMealPlan: `${baseUrlApi}admin/mealplan/name`,
  addDaysMealPlan: `${baseUrlApi}admin/mealplan/add/day`,
  updateMealPlanDetail: `${baseUrlApi}admin/add_meal_plan`,
  getMealPlanDetail: `${baseUrlApi}admin/get_meal_info?mealid=`,
  getMealPlanRecipeList: `${baseUrlApi}admin/recipe/category/list`,
  updateMealPlan: `${baseUrlApi}admin/update_meal_plan?mealId=`,


  // fitness plan

  addFitnessPlan: `${baseUrlApi}careplan/fitness/add/name`,
  updateFitnessPlan: `${baseUrlApi}careplan/fitness/update/name?fitnessId=`,
  fitnessPlanList: `${baseUrlApi}careplan/fitness/list?keyword=`,
  addFitnessPlanDetails: `${baseUrlApi}careplan/fitness/add/details`,
  addDaysFitnessPlan: `${baseUrlApi}careplan/fitness/add/day`,
  deleteFitnessPlan: `${baseUrlApi}careplan/fitness/delete?fitnessId=`,

  //get User Profile
  getUserProfile: `${baseUrlApi}admin/user/profile?userId=$user_id`,

  //get user set goal
  getUserSetGoal: `${baseUrlApi}user/get_user_goals`,
  shortGoals: `${baseUrlApi}/v2/user/short_goals`,

  //get notification list
  getNotificationList: `${baseUrlApi}admin/doctor/notifications/list`,
  notificationSeen: `${baseUrlApi}admin/doctor/notifications/seen`,
  supplemetApi: `https://api.ods.od.nih.gov/dsld/v9/search-filter?sort_by=_score&sort_order=desc&size=1000&status=1&api_key=WIKhwUcPl2KEMdlcqpnOqXG2kss39aggQa8V6d8y&q=`,
  supplementQuantity: `https://api.ods.od.nih.gov/dsld/v9/label/`,
  medicationApi: `https://api.fda.gov/drug/event.json?api_key=oNze27xE8bp8CmGTDhfoXqLOfhKZv7Zss4zfDfYB&search=`,
};

export default ApiConfig;




