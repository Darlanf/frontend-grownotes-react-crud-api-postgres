import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { loginUser } from "../../services/api.service";
import { LoginUserType } from "../../types";

export const loginAction = createAsyncThunk(
  "user/login",
  async (login: LoginUserType) => {
    const result = await loginUser(login);
    return result;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    logged: false,
    user: {} as any,
  },
  reducers: {
    logout: () => {
      return {
        logged: false,
        user: {} as any,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginAction.fulfilled,
      (state, action) => {
        return {
          logged: true,
          user: action.payload.data,
        };
      }
    );
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
