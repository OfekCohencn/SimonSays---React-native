
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState
{
  ScoreR: number
}

const initialState: GameState = { 
  ScoreR: 0,
};

const GameSlice = createSlice(
{
  name: 'game',
  initialState,
  reducers: 
  {
    setScoreR: (state, action: PayloadAction<number>) => 
    {
      state.ScoreR = action.payload;
    },
  }
})

export const {setScoreR} = GameSlice.actions;
export default GameSlice.reducer;
