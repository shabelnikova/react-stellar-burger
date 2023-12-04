
import {getUserWithRefresh, refreshToken, request} from "../../utils/api";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken
} from "../../utils/token";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  IUserResponse,
  IInputRegisterUpdate,
  ILogin,
  IRegLogResponse,
  IResponse, IChangePasswordRequest, IUserState
} from "../types";

const token = getRefreshToken();

export const initialState: IUserState = {
  isPending: false,
  isAuthChecked: false,
  isUserLoaded: false,
  data: null,
  passwordReset: false,
  passwordForgot: false,
}
const sliceName = 'user';
export const currentUserRequest = createAsyncThunk(
  `${sliceName}/currentUserRequest`,
  async (_, {  fulfillWithValue, rejectWithValue , dispatch}) => {
    try {
      if(getAccessToken()) {
        const data = await request("auth/user", {
          method: "GET",
          headers: { Authorization: getAccessToken() },
        });
        return fulfillWithValue(data);
      } else {
        return rejectWithValue("Something went wrong...")
      }
    } catch (error: any) {
      if(error.message === 'jwt expired') {
        const res = await refreshToken();
        if(res.success) {
          const data = await getUserWithRefresh();
          if(data.success)
            return fulfillWithValue(data)
          else return rejectWithValue(data)
        }
      }
      return rejectWithValue(error);
    } finally {
      dispatch(checkUserAuth());
    }
  }
);
export const registerUserRequest = createAsyncThunk<IRegLogResponse, IInputRegisterUpdate>(
  `${sliceName}/registerUserRequest`,
  async (dataRegister, {  fulfillWithValue}) => {

      const data = await request("auth/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
        body: JSON.stringify(dataRegister)
      });
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      return fulfillWithValue(data);
  }
)
export const authUserRequest = createAsyncThunk<IRegLogResponse, ILogin>(
  `${sliceName}/authUserRequest`,
  async(dataLogin, {fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await request("auth/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
        body: JSON.stringify(dataLogin),
      });
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
export const updateUserRequest = createAsyncThunk<IUserResponse, IInputRegisterUpdate>(
  `${sliceName}/updateUserRequest`,
  async(dataUpdate, {fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await request('auth/user', {
        method: "PATCH",
        headers: {'Content-Type': 'application/json', "Accept": 'application/json', 'Authorization': getAccessToken()},
        body: JSON.stringify(dataUpdate),
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
export const logoutUserRequest = createAsyncThunk(
  `${sliceName}/logoutUserRequest`,
  async(_, {fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await request("auth/logout", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
        body: JSON.stringify({"token": token}),
      });
      removeAccessToken();
      removeRefreshToken();
      return fulfillWithValue(data)
    } catch (error) {
      rejectWithValue(error);
    }
  }
)
export const forgotPasswordRequest = createAsyncThunk<IResponse, string>(
  `${sliceName}/forgotPasswordRequest`,
  async(email, {fulfillWithValue, rejectWithValue }) => {
    try{
      const res = await request('password-reset',
        {method: 'POST',
          headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
          body: JSON.stringify({
            "email": email
          })
        });
      localStorage.setItem('checkForgotPasswordVisited', 'true')
      return fulfillWithValue(res);
    } catch (error) {
      rejectWithValue(error);
    }
  }
)
export const resetPasswordRequest = createAsyncThunk<IResponse, IChangePasswordRequest>(
  `${sliceName}/resetPasswordRequest`,
  async(dataReset, {fulfillWithValue, rejectWithValue }) => {
    try{
      const res = await request('password-reset/reset',
        {method: 'POST',
          headers: {'Content-Type': 'application/json', "Accept": 'application/json'},
          body: JSON.stringify({
            "password": dataReset.password,
            "token": dataReset.token
          })
        });
      localStorage.removeItem('checkForgotPasswordVisited')
        return fulfillWithValue(res);
    } catch (error) {
      rejectWithValue(error);
    }
  }
)
const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    checkUserAuth: (state) => {
      state.isAuthChecked = true;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(authUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(registerUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updateUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(logoutUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(resetPasswordRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(currentUserRequest.fulfilled, (state, action) => {
        state.isUserLoaded = true;
        state.isPending = false;
        state.data = action.payload.user;
      })
      .addCase(authUserRequest.fulfilled, (state, action) => {
        state.isUserLoaded = true;
        state.isPending = false;
        state.data = action.payload.user;
      })
      .addCase(registerUserRequest.fulfilled, (state, action) => {
        state.isUserLoaded = true;
        state.isPending = false;
        state.data = action.payload.user;
      })
      .addCase(updateUserRequest.fulfilled, (state, action) => {
        state.isUserLoaded = true;
        state.isPending = false;
        state.data = action.payload.user;
      })
      .addCase(logoutUserRequest.fulfilled, (state, action) => {
        state.isUserLoaded = false;
        state.isPending = false;
        state.data =null;
        state.passwordReset = false;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        state.isPending = false;
        state.passwordForgot = true;
        state.passwordReset = false;
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        state.isPending = false;
        state.passwordForgot = false;
        state.passwordReset = true;
      })
      .addCase(currentUserRequest.rejected, (state, error) => {
        state.isUserLoaded = false;
        state.isPending = false;
      })
      .addCase(authUserRequest.rejected, (state) => {
        state.isUserLoaded = false;
        state.isPending = false;
      })
      .addCase(registerUserRequest.rejected, (state) => {
        state.isUserLoaded = false;
        state.isPending = false;
      })
      .addCase(updateUserRequest.rejected, (state) => {
        state.isUserLoaded = false;
        state.isPending = false;
      })
      .addCase(logoutUserRequest.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(forgotPasswordRequest.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(resetPasswordRequest.rejected, (state) => {
        state.isPending = false;
      })
  }
})

export const { checkUserAuth } = userSlice.actions;
export default userSlice.reducer;

