// Constants
export const successSideEffectState = {
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: "",
};

// Action Creators
export const loadingAction = (type, data = {}) => {
    return {
        type,
        payload: {
            isLoading: true,
            isSuccess: false,
            isError: false,
            error: "",
            ...data,
        },
    };
};

export const errorAction = (type, error, data = {}) => {
    return {
        type,
        payload: {
            isLoading: false,
            isSuccess: false,
            isError: true,
            error,
            ...data,
        },
    };
};