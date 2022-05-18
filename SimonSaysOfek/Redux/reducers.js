
import { Set_ScoreR } from './actions';

const initialState = {ScoreR: 0};

const ReducerU = (state = initialState, action) =>
{
  switch(action.type) 
  {
    case Set_ScoreR:
      return { ...state, ScoreR: action.payload };
    default:
      return state;
  }
}

export default ReducerU;