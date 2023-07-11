import { GET_GROUP_LIST } from './keys';

export const setGroupList = lists => ({
    type: GET_GROUP_LIST,
    payload: lists,
});
