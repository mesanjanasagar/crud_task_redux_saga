import { put, call, take, all } from "redux-saga/effects";
import * as actionCreators from "./actions";
import { httpGet, httpPost, httpPut, httpDelete } from "../services";

function* getUserProfileData(payload) {
    try {
        yield put(actionCreators.getUserProfileLoadingAction());
        const { data } = yield httpPost("https://stage.api.sloovi.com/login",
            {
                email: payload.email,
                password: payload.password
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        yield put(actionCreators.getUserProfileSuccessAction(data));
        if (data.results && data.results !== undefined) {
            yield getDropdownData({
                accessToken: data.results.token,
                companyId: data.results.company_id,
            });
        }
    } catch (error) {
        console.log("Error", error);
        yield put(actionCreators.getUserProfileErrorAction(error.displayMessage));
    }
};

function* getDropdownData(payload) {
    try {
        yield put(actionCreators.getDropdownLoadingAction());
        let companyId = payload.companyId;
        const { data } = yield httpGet(`https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`, {
            headers: {
                'Authorization': `Bearer ${payload.accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        yield put(actionCreators.getDropdownSuccessAction(data));
    } catch (error) {
        console.log("Error", error);
        yield put(actionCreators.getDropdownErrorAction(error.displayMessage));
    }
}
function* getSingleTaskData(payload) {
    console.log('payload--edit', payload)
    try {
        yield put(actionCreators.getSingleTaskLoadingAction());
        let companyId = payload.companyId;
        const { data } = yield httpGet(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${payload.taskId}?company_id=${companyId}`, {
            headers: {
                'Authorization': `Bearer ${payload.accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        yield put(actionCreators.getSingleTaskSuccessAction(data));
    } catch (error) {
        console.log("Error", error);
        yield put(actionCreators.getSingleTaskErrorAction(error.displayMessage));
    }
}
function* getAllTaskData(payload) {
    try {
        yield put(actionCreators.getAllTaskLoadingAction());
        let companyId = payload.companyId;
        const { data } = yield httpGet(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`, {
            headers: {
                'Authorization': `Bearer ${payload.accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        yield put(actionCreators.getAllTaskSuccessAction(data));
    } catch (error) {
        console.log("Error", error);
        yield put(actionCreators.getAllTaskErrorAction(error.displayMessage));
    }
}

function* postNewTaskData(payload) {
    try {
        yield put(actionCreators.postNewTaskLoadingAction());
        const { data } = yield httpPost(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${payload.companyId}`,
            payload.data
            ,
            {
                headers: {
                    'Authorization': `Bearer ${payload.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        yield put(actionCreators.postNewTaskSuccessAction(data));
    } catch (error) {
        console.log("Error", error);
        yield put(actionCreators.postNewTaskErrorAction(error.displayMessage));
    }
};
function* postUpdateTaskData(payload) {
    try {
        yield put(actionCreators.postUpdateTaskLoadingAction());
        const { data } = yield httpPut(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${payload.taskId}?company_id=${payload.companyId}`,
            payload.data,
            {
                headers: {
                    'Authorization': `Bearer ${payload.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        yield put(actionCreators.postUpdateTaskSuccessAction(data));
    } catch (error) {
        console.log("Error", error);
        yield put(actionCreators.postUpdateTaskErrorAction(error.displayMessage));
    }

};
function* postDeleteTaskData(payload) {
    try {
        yield put(actionCreators.postDeleteTaskLoadingAction());
        const { data } = yield httpDelete(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${payload.taskId}?company_id=${payload.companyId}`,
            {
                headers: {
                    'Authorization': `Bearer ${payload.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        yield put(actionCreators.postDeleteTaskSuccessAction(data));
    } catch (error) {
        console.log("Error", error);
        yield put(actionCreators.postDeleteTaskErrorAction(error.displayMessage));
    }

};
function* watchUserProfileData() {
    while (true) {
        const { payload } = yield take(
            actionCreators.Actions.GET_USER_PROFILE_DATA
        );
        yield call(getUserProfileData, payload);
    }
};
function* watchUserDropdownData() {
    while (true) {
        const { payload } = yield take(
            actionCreators.Actions.GET_DROPDOWN_DATA
        );
        yield call(getDropdownData, payload);
    }
};
function* watchNewTaskData() {
    while (true) {
        const { payload } = yield take(
            actionCreators.Actions.POST_NEW_TASK
        );
        yield call(postNewTaskData, payload);
    }
};
function* watchSingleTaskData() {
    while (true) {
        const { payload } = yield take(
            actionCreators.Actions.GET_SINGLE_TASK
        );
        yield call(getSingleTaskData, payload);
    }
};
function* watchAllTaskData() {
    while (true) {
        const { payload } = yield take(
            actionCreators.Actions.GET_ALL_TASK
        );
        yield call(getAllTaskData, payload);
    }
};
function* watchUpdateTaskData() {
    while (true) {
        const { payload } = yield take(
            actionCreators.Actions.UPDATE_TASK
        );
        yield call(postUpdateTaskData, payload);
    }
};
function* watchDeleteTaskData() {
    while (true) {
        const { payload } = yield take(
            actionCreators.Actions.DELETE_TASK
        );
        yield call(postDeleteTaskData, payload);
    }
};

function* watchdataSaga() {
    yield all([watchUserProfileData()]);
}

function* rootSaga() {
    yield all([
        watchdataSaga(),
        watchUserDropdownData(),
        watchNewTaskData(),
        watchSingleTaskData(),
        watchAllTaskData(),
        watchUpdateTaskData(),
        watchDeleteTaskData()
    ])
}
export default rootSaga;