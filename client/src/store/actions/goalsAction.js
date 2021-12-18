import axios from "axios";

export const GetGoals = page => async dispatch => {
    try {
        const res = await axios.get(`/goals/get_goals?&page=${isFinite(page) ? page : 0}`);
        const { total, goals } = res.data;
        dispatch({ type: 'GET_GOALS', goals, totalGoals: total });
    }
    catch (e) {
        /* no goals to show right now*/
    }
}

export const CreateGoal = payload => async _ => {
    try {
        const res = await axios.post('/goals/create_goal', payload);
        window.alert(res.data);
    }
    catch (e) {
        window.alert(e);
    }
}