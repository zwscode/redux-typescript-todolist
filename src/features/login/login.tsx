import { useAppSelector, useAppDispatch } from '../../app/hooks';
import "./login.css"
import {PayloadAction} from '@reduxjs/toolkit'
import {useState} from 'react'
import { userRegister, userLogin, selectUser } from './loginSlice';
import { LoginStatus } from '../../type/myType';
import { useNavigate } from 'react-router-dom';
import { LoginRes } from "../../type/myType";

const Login = () => {
	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(selectUser);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	

	const handleRegister = (event: any) => {
		event.preventDefault();
		dispatch(userRegister({username: username, password: password}))
	}

	const navigate = useNavigate();

	const handleLogin = async (event: any) => {
		event.preventDefault();
		const action = await dispatch(userLogin({username: username, password: password}));
		const response: LoginRes = action.payload as LoginRes;
		if (response.result === "success") {
			navigate("/todolist");
		}
	}
	

	return (
		<div className="Login">
			<h1>Register/Login</h1>
			<form className="login_form" id="register_login">
				<input type="text" placeholder="Username" id="username" autoComplete="off" onChange={
					(event) => {
                        setUsername(event.target.value);
					}
                }/>
				<input type="password" placeholder="Password" id="password" autoComplete="off" onChange={
					(event) => {
						setPassword(event.target.value);
					}
				}/>
				<div className="submit_btns">
					<button type="submit" onClick={handleRegister}>Register</button>
					<button type="submit" onClick={handleLogin}>Login</button>
				</div>
			</form>
		</div>
	)
}

export default Login;