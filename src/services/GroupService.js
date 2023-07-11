import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const createGroupService = async (params) => {
    const response = await axios.post(`${ApiConfig.createGroup}/register`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}
export const deleteGroupService = async (groupId) => {
    const response = await axios.delete(`${ApiConfig.deleteGroup}${groupId}`,);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}
export const deleteMemberService = async (groupId, memberId) => {
    const response = await axios.delete(`${ApiConfig.deleteMember}?groupId=${groupId}&memberId=${memberId}`,);

    if (response?.data?.status === 200) {
        return response.data || '';
    }
}
export const deletePostService = async (postId) => {
    const response = await axios.delete(`${ApiConfig.deletePost}${postId}`,);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}
export const deleteCommentService = async (postId, commentId) => {
    const response = await axios.delete(`${ApiConfig.deleteComment}?postId=${postId}&commentId=${commentId}`,);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}
export const deleteCommentReplyService = async (commentId, replyId) => {
    const response = await axios.delete(`${ApiConfig.deleteCommentReply}?commentId=${commentId}&replyId=${replyId}`,);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}
export const createPostService = async (params) => {
    const response = await axios.post(`${ApiConfig.createPost}/post/create`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}

export const addCommentService = async (params) => {
    const response = await axios.post(`${ApiConfig.addComment}/comment`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}
export const postLikeService = async (postId) => {
    const response = await axios.post(`${ApiConfig.likePost}${postId}`,);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}
export const addReplyService = async (params) => {
    const response = await axios.post(`${ApiConfig.addComment}/comment/reply`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}
export const getCareplanList = async (params) => {
    const response = await axios.post(`${ApiConfig.getCareplanList}`, params);
    if (response?.status === 200) {
        return response || '';
    }
};
export const getProgramList = async (params) => {
    const response = await axios.post(`${ApiConfig.getProgramList}`, params);
    if (response?.status === 200) {
        return response || '';
    }
};

export const updateGroupService = async (group_id, params) => {
    const response = await axios.post(`${ApiConfig.updateGroup}/update?groupId=${group_id}`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}

export const getMyGroupList = (searchWord) => {
    return axios.get(`${ApiConfig.getMyGroupList}${searchWord || ""}`);
};
export const getGroupbyId = (ID) => {
    return axios.get(ApiConfig.getGroupbyId + ID);
};


export const getGroupAssesmentScore = (ID) => {
    return axios.get(ApiConfig.getGroupAssesmentScore + ID);
};
export const getGroupAssesmentScoreGraph = (ID) => {
    return axios.get(ApiConfig.getGroupAssesmentScoreGraph + ID);
};

export const getGroupPostsService = async (group_id) => {
    const response = await axios.get(`${ApiConfig.getGroupPosts}/posts?groupId=${group_id}`);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}

export const getGroupShareLink = async (groupId) => {
    const response = await axios.get(`${ApiConfig.getGroupShareLink}${groupId}`);
    if (response?.status === 200) {
        return response.data || '';
    }
}

export const setDefaultGroup = (groupId) => {
    return axios.post(`${ApiConfig.defaultGroup + groupId}`);

};

export const getDefaultGroup = () => {
    return axios.get(ApiConfig.getDefaultGroups);
};