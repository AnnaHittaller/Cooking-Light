import LoginForm from "../../components/LoginForm";
import MainLayout from "../../layout/MainLayout";
import "../../styles/loginPage.css";

function LoginPage() {
	return (
		<MainLayout>
			<div className="page">
				<h1>Login</h1>
				<LoginForm />
			</div>
		</MainLayout>
	);
}

export default LoginPage;
