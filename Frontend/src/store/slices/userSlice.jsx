import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/config";

export const restoreSession = createAsyncThunk(
    "user/restoreSession",
    async (_, { rejectWithValue }) => {
        try {
            const rawUser = localStorage.getItem("user");
            const user = rawUser ? JSON.parse(rawUser) : null;
            return user;
        } catch (error) {
            return rejectWithValue(error?.message || "Failed to restore session.");
        }
    }
);

export const signinUser = createAsyncThunk(
    "user/signinUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            );
            const user = response.data?.[0];
            if (!user) {
                return rejectWithValue("Invalid email or password.");
            }
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to sign in.");
        }
    }
);

export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (userPayload, { rejectWithValue }) => {
        try {
            const existing = await axios.get(
                `/users?email=${encodeURIComponent(userPayload.email)}`
            );
            if (existing.data.length > 0) {
                return rejectWithValue("A user with this email already exists.");
            }
            const response = await axios.post("/users", userPayload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to sign up.");
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/users/${id}`, updates);
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to update user.");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/users/${id}`);
            localStorage.removeItem("user");
            return null;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to delete user.");
        }
    }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
    localStorage.removeItem("user");
    return null;
});

const initialState = {
    user: null,
    status: "idle",
    error: null,
    authChecked: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(restoreSession.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
                state.authChecked = true;
            })
            .addCase(restoreSession.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
                state.authChecked = true;
            })
            .addCase(signinUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.user = null;
                state.status = "succeeded";
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.status = "succeeded";
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export default userSlice.reducer;
