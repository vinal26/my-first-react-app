import { GET_GROUP_LIST } from '../actions/keys';

const INIT_STATE = {
    groupLists: [],
};

const GroupReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_GROUP_LIST:
            return {
                ...state,
                groupLists: action.payload,
            };

        default:
            return state;
    }
};

export default GroupReducer;
