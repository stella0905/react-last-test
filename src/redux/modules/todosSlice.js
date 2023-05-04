import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    //waitTwoSeconds 반환한 프로미스 객체가 resolve상태가 되면 then이 실행이 된다. 
    waitTwoSeconds().then(() => thunkAPI.dispatch(addTodo(payload)))

  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    waitTwoSeconds().then(() => thunkAPI.dispatch(deleteTodo(payload)))
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return {
        ...state,
        list: [
          ...state.list,
          action.payload,
        ]
      }
    },
    deleteTodo: (state, action) => {
      return {
        list: state.list.filter(item => item.id !== action.payload)
      }
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
