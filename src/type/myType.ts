
export enum PageType {
	LOGIN = "page_login",
	TODOLIST = "page_todolist",
}

export enum LoginStatus {
	LOGGED_OUT = "logged_out",
	LOGGED_IN = "logged_in",
}

export interface LoginRes {
	username: string;
	userid: string;
	result: string;
	token: string;
	message: string;
}