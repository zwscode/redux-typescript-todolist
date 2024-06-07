import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { SERVER_PORT } from "../../type/defines";
import { LoginStatus } from "../../type/myType";

import { LoginRes } from "../../type/myType";

interface RegisterLoginInfo {
	username: string;
	password: string;
}

// type for user info
interface UserInfo {
	username: string;
	userid: string;
	token: string;
	loginStatus: LoginStatus;
}

const initialState: UserInfo = {
    username: '',
	userid: '',
	token: '',
	loginStatus: LoginStatus.LOGGED_OUT,
};

interface RegisterRes {
	username: string;
	result: string;
	message?: string;
}





const baseURL = "http://localhost:" + SERVER_PORT + "/";

const userRegister = createAsyncThunk<RegisterRes, RegisterLoginInfo>(
	"user/register",
	async (payload: RegisterLoginInfo) => {
		const response = await fetch(baseURL + "auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		return response.json();
	}
)



const userLogin = createAsyncThunk<LoginRes, RegisterLoginInfo>(
	"user/login",
	async (payload: RegisterLoginInfo) => {
		const response = await fetch(baseURL + "auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		return response.json();
	}
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
	
	},
	extraReducers: (builder) => {
		builder
		.addCase(userRegister.fulfilled, (state, action: PayloadAction<RegisterRes>) => {
			if (action.payload.result === "success") {
				alert(`User: ${action.payload.username} successly registered.`)
			} else {
				alert(`User: ${action.payload.username} register failed. ${action.payload.message}`)
			}
			
		})
		.addCase(userLogin.fulfilled, (state, action: PayloadAction<LoginRes>) => {
			// state.name = action.payload.name;
			// state.password = action.payload.password;
			// state.token = action.payload.token;
			console.log("login reducer print", action.payload);
			if (action.payload.result === "success") {
				state.username = action.payload.username;
				state.token = action.payload.token;
				state.userid = action.payload.userid;
				console.log("login reducer print settting loginstatus to in");
				state.loginStatus = LoginStatus.LOGGED_IN;
			}
		});
	}
});

export const selectUser = (state: RootState): UserInfo => state.user;

export { userRegister, userLogin };

export default userSlice.reducer;