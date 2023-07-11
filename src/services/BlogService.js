import axios from "axios";
import ApiConfig from "../config/ApiConfig";


export const getBlogListService = async () => {
  const response = await axios.get(`${ApiConfig.getAllBlog}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getBlogListServiceByDate = async (scheduleDate) => {
  const response = await axios.get(`${ApiConfig.getAllBlogBydate}${scheduleDate}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const createBlogService = async (params) => {
  const response = await axios.post(`${ApiConfig.blogList}/createblog`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const updateBlogService = async (blog_id, params) => {
  const response = await axios.post(`${ApiConfig.blogList}/editblog?blogId=${blog_id}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}
export const get_blog_tags = async () => {
  const response = await axios.get(`${ApiConfig.get_blog_tags}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}
export const deleteBlogService = async (blog_id) => {
  const response = await axios.delete(`${ApiConfig.blogList}/deleteblog?blogId=${blog_id}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}
