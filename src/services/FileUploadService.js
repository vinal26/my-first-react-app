import axios from "axios";
import ApiConfig from "../config/ApiConfig";


export const getUploadFileCategory = {
  postImage: 'postImage',
  postVideo: 'postVideo',
  postDocument: 'postDocument',
  postDocThumb: 'postDocThumb',
  moduleImage: 'moduleImage',
  moduleDoc: 'moduleDoc',
  group: 'group',
  blog: 'blog',
  carePlan: 'carePlan',
  profile: 'profile',
  uploadProfile: 'uploadProfile',
  recipe: 'recipe',
  createActiveProgram: 'createActiveProgram',
  mealPlan: 'mealPlan',
  blogAttachment: 'blogAttachment',
  exerciseVideo: 'exerciseVideo',
  // postAttachment: 'postAttachment',
  // moduleAttachment: 'moduleAttachment',
}

export const getFileUploadUrl = (category) => {
  let url = `${ApiConfig.getAWSFileUploadUrl}`; // Default set user upload profile
  if (category === getUploadFileCategory.blog) {
    url = `${ApiConfig.getAWSFileUploadUrlBlog}`; // Default set user upload profile
  }
  else if (category === getUploadFileCategory.group) {
    url = `${ApiConfig.getAWSFileUploadUrlGroup}`; // set group image
  }
  else if (category === getUploadFileCategory.postImage) {
    url = `${ApiConfig.getAWSFileUploadUrlPostImage}`; // set post image
  }
  else if (category === getUploadFileCategory.postVideo) {
    url = `${ApiConfig.getAWSFileUploadUrlPostVideo}`; // set post video
  }
  else if (category === getUploadFileCategory.postDocument) {
    url = `${ApiConfig.getAWSFileUploadUrlPostDocument}`; // set post document
  }
  else if (category === getUploadFileCategory.postDocThumb) {
    url = `${ApiConfig.getAWSFileUploadUrlPostDocThumb}`; // set post document
  }
  else if (category === getUploadFileCategory.uploadProfile) {
    url = `${ApiConfig.getAWSDoctorProfileUpload}`;
  }
  else if (category === getUploadFileCategory.carePlan) {
    url = `${ApiConfig.getAWSCarePlanUpload}`
  }
  else if (category === getUploadFileCategory.recipe) {
    url = `${ApiConfig.getAWSRecipeUpload}`
  }
  else if (category === getUploadFileCategory.createActiveProgram) {
    url = `${ApiConfig.getAWSCreateActiveProgram}`
  }
  else if (category === getUploadFileCategory.mealPlan) {
    url = `${ApiConfig.getAWSMealProgram}`
  }
  else if (category === getUploadFileCategory.blogAttachment) {
    url = `${ApiConfig.getAWSBlogAttachmentUpload}`
  }
  else if (category === getUploadFileCategory.moduleAttachment) {
    url = `${ApiConfig.getAWSModuleAttachmentUpload}`
  }
  else if (category === getUploadFileCategory.moduleImage) {
    url = `${ApiConfig.getAWSModuleImageUpload}`
  }
  else if (category === getUploadFileCategory.moduleDoc) {
    url = `${ApiConfig.getAWSModuleAttachmentUpload}`
  }
  else if (category === getUploadFileCategory.exerciseVideo) {
    url = `${ApiConfig.getAWSFileUploadUrlExerciseVideo}`
  }
  return url;
}


export const uploadFile = async (image, category, imageName, programID = "", userID = "", returnFileUrl = false) => {
  try {
    let url = ""
    if (programID) { url = getFileUploadUrl(category) + `programId=${programID}&` }
    else if (userID) { url = getFileUploadUrl(category) + `userId=${userID}&` }
    else url = getFileUploadUrl(category)

    const response = await getAWSFileUploadUrl(imageName, url);
    if (response) {
      const result = await awsUpload(response, image, returnFileUrl);
      return result;
    }
  } catch (error) {

  }
}
export const uploadCareFile = async (image, category, imageName, careplanID = "", returnFileUrl = false) => {
  try {
    let url = ""
    if (careplanID) { url = getFileUploadUrl(category) + `carePlanId=${careplanID}&` }
    // else if(careplanID) {url=getFileUploadUrl(category)+`careplanId=${careplanID}&'}
    else url = getFileUploadUrl(category)

    const response = await getAWSFileUploadUrl(imageName, url);
    if (response) {
      const result = await awsUpload(response, image, returnFileUrl);
      return result;
    }
  } catch (error) {

  }
}
export const getAWSFileUploadUrl = async (fileName, url) => {
  const response = await axios.get(`${url}fileName=${fileName}`);
  if (response?.data?.status === 200) {
    return response.data?.data || [];
  }
}

export const awsUpload = async (link, image, returnFileUrl) => {
  try {
    console.log("image: ", link, image);
    let url = link.url;
    if (returnFileUrl) {
      url = link.uploadURL;
    }
    const response = await fetch(url, {
      method: 'PUT',
      // headers: {
      //   // 'Content-Type': 'image/*',
      //   // 'Access-Control-Allow-Origin': '*',
      // },
      body: image
    })
    if (returnFileUrl) {
      return { fetchUrl: link?.getURL }
    }
    return response;
  } catch (error) {
    console.log('%%%%%error', error);
  }
}