import { createSlice } from "@reduxjs/toolkit"; 
import { createAsyncThunk } from "@reduxjs/toolkit"; 

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=5")
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    };
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

export const {reducers: usersReducer} = usersSlice;

export default usersSlice;
