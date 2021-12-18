const initState = {
    auth: false,
    user: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_AUTH':
            return {
                ...state,
                auth: action.auth,
                user: action.user
            };
        case 'RESET_AUTH':
            return {
                ...state,
                auth: false,
                user: null
            };
        default:
            return state;
    }
};
export default authReducer;
