const initState = {
    goals: [],
    totalGoals: 0,
    rowPerPage: 2
};

const goalsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_GOALS':
            return {
                ...state,
                goals: action.goals,
                totalGoals: action.totalGoals
            };
        default:
            return state;
    }
};
export default goalsReducer;
