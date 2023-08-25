import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import "../../styles/contactPage.css";
import { useNavigate } from "react-router-dom";

function ContactPage() {
	const [contact, setContact] = useState({
		name: "",
		email: "",
		message: "",
	});

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setContact({
			name: "",
			email: "",
			message: "",
		});
		alert("Thank you for your message!");
		navigate("/");
	};

	return (
		<MainLayout>
			<div className="page">
				<h1>Get in touch</h1>
				<form onSubmit={handleSubmit} className="contact-form">
					<label htmlFor="user-name">
						Your name:
						<input
							type="text"
							id="name"
							name="name"
							required
							value={contact.name}
							onChange={(e) => setContact({ ...contact, name: e.target.value })}
						/>
					</label>
					<label htmlFor="user-email">
						Your email:
						<input
							type="email"
							id="email"
							name="email"
							required
							value={contact.email}
							onChange={(e) =>
								setContact({ ...contact, email: e.target.value })
							}
						/>
					</label>
					<label htmlFor="message">
						Message:
						<textarea
							cols="30"
							rows="5"
							id="message"
							name="message"
							value={contact.message}
							required
							onChange={(e) =>
								setContact({ ...contact, message: e.target.value })
							}
						/>
					</label>
					<button type="submit">Send message</button>
				</form>
			</div>
		</MainLayout>
	);
}

export default ContactPage;
