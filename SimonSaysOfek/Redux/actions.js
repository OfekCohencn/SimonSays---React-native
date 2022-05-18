export const Set_ScoreR = 'Set_ScoreR'

export const setScoreR = score => dispatch => {
    dispatch({
        type: Set_ScoreR,
        payload: score,
    });
};
