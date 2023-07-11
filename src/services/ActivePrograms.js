import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const addActiveProgram = (payload) => {
  return axios.post(ApiConfig.postActivePrograms, payload);
};

export const getActiveProgram = () => {
  return axios.get(ApiConfig.getActivePrograms);
};
export const getAssignedProgram = () => {
  return axios.get(ApiConfig.getAssignedPrograms);
};
export const getDefaultProgram = () => {
  return axios.get(ApiConfig.getDefaultPrograms);
};
// export const getMyGroupList = (searchWord) => {
//   return axios.get(`${ApiConfig.getMyGroupList}${searchWord || ""}`);
// };

export const getActiveProgramById = (programId) => {
  return axios.get(`${ApiConfig.getActiveProgramById}${programId}`);
};

export const updateActiveProgramById = (programId, payload) => {
  return axios.post(`${ApiConfig.updateProgramById}${programId}`, payload);
};
export const updateCareTeamActiveProgramById = (programId, payload) => {
  return axios.post(`${ApiConfig.updateCareTeamProgramById}${programId}`, payload);
};
export const getGroupListForProgram = async (params) => {
  return axios.post(`${ApiConfig.getGroupForProgram}`, params);
};
export const assignMembersToProgram = (programId, payload) => {
  return axios.post(`${ApiConfig.assignProgramMembers}${programId}`, payload);
};
export const activateProgram = (programId) => {
  return axios.post(`${ApiConfig.activateProgram + programId}`);

};
export const setDefaultProgram = (programId) => {
  return axios.post(`${ApiConfig.defaultProgram + programId}`);

};
export const deleteProgram = async (programId) => {
  const response = await axios.delete(`${ApiConfig.deleteProgram}${programId}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const getProgramShareLink = async (programId) => {
  const response = await axios.get(`${ApiConfig.getProgramShareLink}${programId}`);
  if (response?.status === 200) {
    return response.data || '';
  }
}
export const getCareplanShareLink = async (Id) => {
  const response = await axios.get(`${ApiConfig.getCareplanShareLink}${Id}`);
  if (response?.status === 200) {
    return response.data || '';
  }
}
// export const changePatientStatusService = async (params, userID) => {
//   const response = await axios.put(`${ApiConfig.changePatientStatus}${userID}`, params);
//   if (response?.data?.status === 200) {
//     return response.data?.data || '';
//   }
// }
export const addActiveSession = (payload) => {
  return axios.post(ApiConfig.postSessions, payload);
};

export const getActiveSession = (programId) => {
  return axios.get(`${ApiConfig.getActiveSession}${programId}`);
};

export const addActiveModule = (programId, payload) => {
  return axios.post(`${ApiConfig.postModule}${programId}`, payload);
};

export const getActiveModule = (programId) => {
  return axios.get(`${ApiConfig.getActiveModule}${programId}&&page=0&limit=10&keyword=`);

};

export const getSIngleActiveModule = (programId, ModuleId) => {
  return axios.get(`${ApiConfig.getSIngleActiveModule + programId}&moduleId=${ModuleId}`);

};
export const getSIngleSession = (programId, sessionId) => {
  return axios.get(`${ApiConfig.getSIngleActiveSession + programId}&sessionId=${sessionId}`);

};
export const putSIngleActiveModule = (programId, ModuleId, payload) => {
  return axios.post(`${ApiConfig.putSIngleActiveModule + programId}&moduleId=${ModuleId}`, payload);

};
export const putSIngleActiveSession = (payload) => {
  return axios.post(`${ApiConfig.putSIngleActiveSession}`, payload);

};
export const getActiveForums = (programId, searchWord) => {
  return axios.post(`${ApiConfig.getActiveForums + programId}&keyword=${searchWord || ""}`);

};
export const getActiveMembers = (programId) => {
  return axios.get(`${ApiConfig.getActiveMembers}${programId}`);

};
export const inviteMembers = (payload) => {
  return axios.post(`${ApiConfig.inviteMembers}`, payload);

};
export const addAskForumQuestion = (payload) => {
  return axios.post(ApiConfig.postAskQues, payload);
};

export const addReplyAnswer = (payload) => {
  return axios.post(ApiConfig.putReplyAnswer, payload);
};
export const editQuestion = (payload) => {
  return axios.post(ApiConfig.editQuestion, payload);
};
export const editAnswer = (payload) => {
  return axios.post(ApiConfig.editAnswer, payload);
};
export const editReplyAnswer = (payload) => {
  return axios.post(ApiConfig.editReplyAnswer, payload);
};
export const searchForum = (searchWord) => {
  return axios.get(`${ApiConfig.searchForums}${searchWord || ""}`);
};
export const replyToAnswerService = (payload) => {
  return axios.post(ApiConfig.putReplyToAnswer, payload);
};
export const deleteAnswerReplyService = async (replyId, commentId) => {
  const response = await axios.delete(`${ApiConfig.deleteAnswerReply}?replyId=${replyId}&commentId=${commentId}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const deleteAnswerService = async (commentId, postId) => {
  const response = await axios.delete(`${ApiConfig.deleteAnswer}?commentId=${commentId}&postId=${postId}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const deleteMemberService = async (programId, memberId) => {
  const response = await axios.delete(`${ApiConfig.deleteMemberProgram}?programId=${programId}&memberId=${memberId}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const deleteQuestionService = async (postId) => {
  const response = await axios.delete(`${ApiConfig.deleteQuestion}?postId=${postId}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const getActiveMessage = (programId) => {
  return axios.get(`${ApiConfig.getActiveMessage}${programId}`);

};

export const addMemberMessage = (payload) => {
  return axios.post(ApiConfig.postMemberMessage, payload);
};
export const reactOnQuestion = (payload) => {
  return axios.post(ApiConfig.reactOnQuestion, payload);
};
export const reactOnAnswer = (payload) => {
  return axios.post(ApiConfig.reactOnAnswer, payload);
};
export const addMemberReply = (payload) => {
  return axios.put(ApiConfig.putMemberReply, payload);
};

export const addMemberReplyAnswer = (payload) => {
  return axios.put(ApiConfig.putMemberReplyAnswer, payload);
}

export const likeDislikeMemberMsg = (payload) => {
  return axios.post(ApiConfig.likeDislikeMemberMsg, payload);
}

export const getApproveMember = (programId) => {
  return axios.get(`${ApiConfig.getApproveMember}${programId}`);

};

export const getWaitingMember = (programId) => {
  return axios.get(`${ApiConfig.getWaitingMember}${programId}`);

};

export const watingToApprove = (programId, payload) => {
  return axios.put(`${ApiConfig.watingToApprove}${programId}`, payload);

};

export const myPatientActiveProgramListService = async (userId) => {
  const response = await axios.get(`${ApiConfig.patientActiveProgramDetail}${userId}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const myPatientCarePlanListService = async (userId) => {
  const response = await axios.get(`${ApiConfig.patientCarePlanDetail}${userId}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getPatientProgramListService = async (userId) => {
  const response = await axios.get(`${ApiConfig.patientActiveProgramList}${userId}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addPatientActiveProgramService = async (params) => {
  const response = await axios.post(`${ApiConfig.addPatientActiveProgramService}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addPatientCarePlanService = async (params) => {
  const response = await axios.put(`${ApiConfig.addPatientCarePlanService}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const getSessionDaysService = async (programId) => {
  const response = await axios.get(`${ApiConfig.getSessionDays}${programId}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const deleteSessionService = async (sessionId, programId) => {
  const response = await axios.delete(`${ApiConfig.deleteSession + sessionId}&programId=${programId}`,);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const deleteModuleService = async (programId, moduleId) => {
  const response = await axios.delete(`${ApiConfig.deleteModule + programId}&moduleId=${moduleId}`,);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}