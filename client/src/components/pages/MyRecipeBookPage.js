
import MainLayout from "../../layout/MainLayout";
import "../../styles/myRecipeBookPage.css";
import BlogPostList from "../BlogPostList";

function MyRecipeBookPage() {
	const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
	return (
		<MainLayout>
			<div className="page">
				<h1>My recipe book</h1>
				<div className="my-recipes">
					 {likedRecipes.length === 0 ? (
						<p>Add some recipes by liking them!</p>
					) : (
						<BlogPostList recipes={likedRecipes} />
					)} 
				</div>
			</div>
		</MainLayout>
	);
}

export default MyRecipeBookPage;
