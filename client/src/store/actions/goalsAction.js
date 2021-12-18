import axios from "axios";

export const GetGoals = _ => async dispatch => {
    try {
        const res = await axios.get('/goals/get_goals');
        const { total, goals } = res.data;
        dispatch({ type: 'GET_GOALS', goals, totalGoals: total });
    }
    catch (e) {
        /* no goals to show right now*/
    }
}