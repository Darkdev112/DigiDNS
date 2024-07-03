import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecords = createAsyncThunk('record/fetchRecords', async () => {
  const response = await fetch('http://localhost:2000/getAllRecord', {
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

export const editRecord = createAsyncThunk('record/editRecord', async (data) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:2000/updateRecord`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
});


export const deleteRecord = createAsyncThunk('record/deleteRecord', async (id) => {
  console.log("idzz",id);
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:2000/deleteRecord`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({id}),
  });
  return response.json(id);
});


export const searchRecords = createAsyncThunk('record/searchRecords', async (hostname) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:2000/searchRecords?hostname=${hostname}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
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
      })
      
      
      .addCase(editRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(editRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.records.findIndex(record => record._id === action.payload._id);
        console.log("index",index);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })
      .addCase(editRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(deleteRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter(record => record._id !== action.meta.arg);
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(searchRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(searchRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      
  },
});

export default recordSlice.reducer;
