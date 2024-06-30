import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecords = createAsyncThunk('record/fetchRecords', async () => {
  const response = await fetch('http://localhost:5000/getAllRecord', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
});

export const addRecord = createAsyncThunk('record/addRecord', async (data) => {
  const response = await fetch('http://localhost:2000/createRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

const recordSlice = createSlice({
  name: 'record',
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(addRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recordSlice.reducer;
