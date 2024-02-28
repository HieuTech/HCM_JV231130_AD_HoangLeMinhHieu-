import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const findAll = createAsyncThunk("users/findAll", async () => {
  let res = await axios.get(
    `http://localhost:3000/users?_page=1&_per_page=4`
  );
  return res.data.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isModalAdd: false,
    isModalBlock: false,
    isModalDelete: false,
    userId: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addData: (state, action) => {
      state.data.push(action.payload);
    },

    deleteData: (state, action) => {
      const id = action.payload;
      const index = state.data.findIndex((user) => user.id == id);
      state.data.splice(index, 1);
    },

    updateData: (state, action) => {
      //...updateStudent la sao chep action.payload
      const { id, ...addUser } = action.payload;
      const index = state.data.findIndex((user) => user.id == id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...addUser };
      }
    },
    setIsModalAdd: (state, action) => {
      state.isModalAdd = action.payload;
    },
    setIsModalBlock: (state, action) => {
      state.isModalBlock = action.payload;
    },
    setIsModalDelete: (state, action) => {
      state.isModalDelete = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(findAll.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
export const userAction = {
  ...userSlice.actions,
  findAll,
};
