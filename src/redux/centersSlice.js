import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCenters = createAsyncThunk('centers/fetchCenters', async () => {
  const response = await axios.get('https://raw.githubusercontent.com/MujtabaKably/bhive-interview-project-data/main/data.json');
  return response.data;
});

const centersSlice = createSlice({
  name: 'centers',
  initialState: {
    centers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCenters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCenters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.centers = action.payload;
      })
      .addCase(fetchCenters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default centersSlice.reducer;
