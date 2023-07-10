import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SinglePost from "./components/SinglePost";
import LoginPage from "./components/pages/LoginPage";
import MyRecipeBookPage from "./components/pages/MyRecipeBookPage";
import AddRecipePage from "./components/pages/AddRecipePage";
import ResultsPage from "./components/pages/ResultsPage";
import CategoryPage from "./components/pages/CategoryPage";
import ContactPage from "./components/pages/ContactPage";
import NotFound from "./components/NotFound";
import EditRecipePage from "./components/pages/EditRecipePage";

function AllRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<HomePage />} />
			<Route path="/my-recipe-book" element={<MyRecipeBookPage />} />
			<Route path="/add-new-recipe" element={<AddRecipePage />} />
			<Route path="/edit-recipe/:id" element={<EditRecipePage/>} />
			<Route path="/recipe/:id" element={<SinglePost />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/contact" element={<ContactPage/>}/>
			<Route path="/search-results" element={<ResultsPage />} />
			<Route path="/category" element={<CategoryPage />} />
			<Route path="*" element={<NotFound/>} />
		</Routes>
	);
}

export default AllRoutes;
