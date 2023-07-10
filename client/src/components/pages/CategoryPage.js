import "../../styles/categoryPage.css";
import { useContext, useState, useEffect } from "react";
import "../../styles/recipeCard.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import BlogPostList from "../BlogPostList";

function CategoryPage() {
	const { query, setQuery, category } = useContext(SearchContext);
	const [recipes, setRecipes] = useState([]);
	const [recipesInCategory, setRecipesInCategory] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchFeaturedRecipes = async () => {
			try {
				const data = await axios.get("http://localhost:4000/recipes/list");
				//console.log("data:", data.data);
				setRecipes(data.data);
				const categoryRecipes = recipes.filter(
					(item) => item.category === category
				);
				setRecipesInCategory(categoryRecipes);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchFeaturedRecipes();
	}, [category, recipes]);

	return (
		<MainLayout>
			<div className="page">
				<h1>
					Recipes in the <span>{category} </span>category
				</h1>
				<div className="cards">
					{recipesInCategory && recipesInCategory.length > 0 ? (
						<BlogPostList recipes={recipesInCategory} />
					) : (
						<p>There are no recipes in this category</p>
					)}
				</div>
			</div>
		</MainLayout>
	);
}

export default CategoryPage;
