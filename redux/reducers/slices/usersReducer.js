import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, usersRef } from '../../../config/firebase';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const querySnapshot = await getDocs(usersRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const docRef = await addDoc(usersRef, user);
  return { id: docRef.id, ...user };
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default usersSlice.reducer;
