import {
    Actions,
} from "./actions";
import { combineReducers } from "redux";

export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.GET_USER_PROFILE_DATA_LOADING:
        case Actions.GET_USER_PROFILE_DATA_ERROR:
        case Actions.GET_USER_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const userDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.GET_DROPDOWN_DATA_LOADING:
        case Actions.GET_DROPDOWN_DATA_ERROR:
        case Actions.GET_DROPDOWN_DATA_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const newTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.POST_NEW_TASK_LOADING:
        case Actions.POST_NEW_TASK_ERROR:
        case Actions.POST_NEW_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const getSingleTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.GET_SINGLE_TASK_LOADING:
        case Actions.GET_SINGLE_TASK_ERROR:
        case Actions.GET_SINGLE_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const getAllTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.GET_ALL_TASK_LOADING:
        case Actions.GET_ALL_TASK_ERROR:
        case Actions.GET_ALL_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const postUpdateTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.UPDATE_TASK_LOADING:
        case Actions.UPDATE_TASK_ERROR:
        case Actions.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const postDeleteTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.DELETE_TASK_LOADING:
        case Actions.DELETE_TASK_ERROR:
        case Actions.DELETE_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
const Data = combineReducers({
    userProfileData: userProfileReducer,
    userDropdownData: userDropdownReducer,
    newTaskReducer: newTaskReducer,
    singleTaskData: getSingleTaskReducer,
    allTasksData: getAllTaskReducer,
    updateTaskData: postUpdateTaskReducer,
    deleteTaskData: postDeleteTaskReducer
});
export default Data;