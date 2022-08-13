import {
    errorAction,
    loadingAction,
    successSideEffectState
} from ".";


export const Actions = {
    GET_USER_PROFILE_DATA: "GET_USER_PROFILE_DATA",
    GET_USER_PROFILE_DATA_ERROR: "GET_USER_PROFILE_DATA_ERROR",
    GET_USER_PROFILE_DATA_LOADING: "GET_USER_PROFILE_DATA_LOADING",
    GET_USER_PROFILE_DATA_SUCCESS: "GET_USER_PROFILE_DATA_SUCCESS",

    GET_DROPDOWN_DATA: "GET_DROPDOWN_DATA",
    GET_DROPDOWN_DATA_ERROR: "GET_DROPDOWN_DATA_ERROR",
    GET_DROPDOWN_DATA_LOADING: "GET_DROPDOWN_DATA_LOADING",
    GET_DROPDOWN_DATA_SUCCESS: "GET_DROPDOWN_DATA_SUCCESS",

    POST_NEW_TASK: "POST_NEW_TASK",
    POST_NEW_TASK_ERROR: "POST_NEW_TASK_ERROR",
    POST_NEW_TASK_LOADING: "POST_NEW_TASK_LOADING",
    POST_NEW_TASK_SUCCESS: "POST_NEW_TASK_SUCCESS",

    GET_SINGLE_TASK: "GET_SINGLE_TASK",
    GET_SINGLE_TASK_ERROR: "GET_SINGLE_TASK_ERROR",
    GET_SINGLE_TASK_LOADING: "GET_SINGLE_TASK_LOADING",
    GET_SINGLE_TASK_SUCCESS: "GET_SINGLE_TASK_SUCCESS",

    GET_ALL_TASK: "GET_ALL_TASK",
    GET_ALL_TASK_ERROR: "GET_ALL_TASK_ERROR",
    GET_ALL_TASK_LOADING: "GET_ALL_TASK_LOADING",
    GET_ALL_TASK_SUCCESS: "GET_ALL_TASK_SUCCESS",


    UPDATE_TASK: "UPDATE_TASK",
    UPDATE_TASK_ERROR: "UPDATE_TASK_ERROR",
    UPDATE_TASK_LOADING: "UPDATE_TASK_LOADING",
    UPDATE_TASK_SUCCESS: "UPDATE_TASK_SUCCESS",

    DELETE_TASK: "DELETE_TASK",
    DELETE_TASK_ERROR: "DELETE_TASK_ERROR",
    DELETE_TASK_LOADING: "DELETE_TASK_LOADING",
    DELETE_TASK_SUCCESS: "DELETE_TASK_SUCCESS",
};





export const getUserProfileAction = (data) => {
    return {
        type: Actions.GET_USER_PROFILE_DATA,
        payload: data,
    };
};
export const getUserProfileLoadingAction = () =>
    loadingAction(Actions.GET_USER_PROFILE_DATA_LOADING);
export const getUserProfileErrorAction = (error) =>
    errorAction(Actions.GET_USER_PROFILE_DATA_ERROR, error);
export const getUserProfileSuccessAction = (data) => {
    const payload = {
        ...successSideEffectState,
        ...data,
    };

    return {
        type: Actions.GET_USER_PROFILE_DATA_SUCCESS,
        payload: payload,
    };
};

export const getDropdownAction = (data) => {
    return {
        type: Actions.GET_DROPDOWN_DATA,
        payload: data,
    };
};
export const getDropdownLoadingAction = () =>
    loadingAction(Actions.GET_DROPDOWN_DATA_LOADING);
export const getDropdownErrorAction = (error) =>
    errorAction(Actions.GET_DROPDOWN_DATA_ERROR, error);
export const getDropdownSuccessAction = (data) => {
    const payload = {
        ...successSideEffectState,
        ...data,
    };

    return {
        type: Actions.GET_DROPDOWN_DATA_SUCCESS,
        payload: payload,
    };
};

export const postNewTaskAction = (data, companyId, accessToken) => {
    return {
        type: Actions.POST_NEW_TASK,
        payload: {
            data, companyId, accessToken
        },
    };
};
export const postNewTaskLoadingAction = () =>
    loadingAction(Actions.POST_NEW_TASK_LOADING);
export const postNewTaskErrorAction = (error) =>
    errorAction(Actions.POST_NEW_TASK_ERROR, error);
export const postNewTaskSuccessAction = (data) => {
    const payload = {
        ...successSideEffectState,
        ...data,
    };

    return {
        type: Actions.POST_NEW_TASK_SUCCESS,
        payload: payload,
    };
};

export const getSingleTaskAction = (companyId, accessToken, taskId) => {
    return {
        type: Actions.GET_SINGLE_TASK,
        payload: {
            companyId, accessToken, taskId
        },
    };
};
export const getSingleTaskLoadingAction = () =>
    loadingAction(Actions.GET_SINGLE_TASK_LOADING);
export const getSingleTaskErrorAction = (error) =>
    errorAction(Actions.GET_SINGLE_TASK_ERROR, error);
export const getSingleTaskSuccessAction = (data) => {
    const payload = {
        ...successSideEffectState,
        ...data,
    };

    return {
        type: Actions.GET_SINGLE_TASK_SUCCESS,
        payload: payload,
    };
};

export const getAllTaskAction = (companyId, accessToken) => {
    return {
        type: Actions.GET_ALL_TASK,
        payload: {
            companyId, accessToken
        },
    };
};
export const getAllTaskLoadingAction = () =>
    loadingAction(Actions.GET_ALL_TASK_LOADING);
export const getAllTaskErrorAction = (error) =>
    errorAction(Actions.GET_ALL_TASK_ERROR, error);
export const getAllTaskSuccessAction = (data) => {
    const payload = {
        ...successSideEffectState,
        ...data,
    };

    return {
        type: Actions.GET_ALL_TASK_SUCCESS,
        payload: payload,
    };
};

export const postUpdateTaskAction = (data, companyId, accessToken, taskId) => {
    return {
        type: Actions.UPDATE_TASK,
        payload: {
            data, companyId, accessToken, taskId
        },
    };
};
export const postUpdateTaskLoadingAction = (companyId, accessToken, taskId) =>
    loadingAction(Actions.UPDATE_TASK_LOADING);
export const postUpdateTaskErrorAction = (error) =>
    errorAction(Actions.UPDATE_TASK_ERROR, error);
export const postUpdateTaskSuccessAction = (data) => {
    const payload = {
        ...successSideEffectState,
        ...data,
    };

    return {
        type: Actions.UPDATE_TASK_SUCCESS,
        payload: payload,
    };
};

export const postDeleteTaskAction = (companyId, accessToken, taskId) => {
    return {
        type: Actions.DELETE_TASK,
        payload: {
            companyId, accessToken, taskId
        },
    };
};
export const postDeleteTaskLoadingAction = () =>
    loadingAction(Actions.DELETE_TASK_LOADING);
export const postDeleteTaskErrorAction = (error) =>
    errorAction(Actions.DELETE_TASK_ERROR, error);
export const postDeleteTaskSuccessAction = (data) => {
    const payload = {
        ...successSideEffectState,
        ...data,
    };

    return {
        type: Actions.DELETE_TASK_SUCCESS,
        payload: payload,
    };
};