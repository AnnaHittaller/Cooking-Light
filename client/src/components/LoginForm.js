import "../styles/loginForm.css";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
	const { login, isLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const [toast, setToast] = useState(false);

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(userData.email, userData.password);
		if (!isLoggedIn) {
			setToast(true);
			setTimeout(() => {
				setToast(false);
			}, 3000);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<label htmlFor="email">Email:</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="email"
				onChange={(e) => setUserData({ ...userData, email: e.target.value })}
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="password"
				onChange={(e) => setUserData({ ...userData, password: e.target.value })}
			/>
			{toast && <div className="toast">Email or password incorrect</div>}
			<button type="submit">Log in</button>
		</form>
	);
}

export default LoginForm;
