import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/mainLayout.css";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

function MainLayout({ children }) {
	return (
		<div className="main">
			<Header />
			<div className="content">
				{children}
				<Sidebar />
			</div>
			<ScrollToTopButton />
			<Footer />
		</div>
	);
}

export default MainLayout;
