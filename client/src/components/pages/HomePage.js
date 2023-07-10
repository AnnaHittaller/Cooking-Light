
import FeaturedRecipe from "../../components/FeaturedRecipe";
import "../../styles/homePage.css";
import BlogPostList from "../../components/BlogPostList";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import axios from "axios"


function HomePage() {
	const [recipes, setRecipes] = useState([]);
	const [featuredRecipes, setFeaturedRecipes] = useState([]);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const data = await axios.get("http://localhost:4000/recipes/list")
				//console.log("data:",data.data)
				setRecipes(data.data)
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchRecipes();
	}, []);

	useEffect(() => {
		const fetchFeaturedRecipes = async () => {
			try {
				const data = await axios.get("http://localhost:4000/recipes/list/featured");
				//console.log("data:", data.data);
				setFeaturedRecipes(data.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchFeaturedRecipes();
	}, []);




	return (
		<MainLayout>
			<div className="page home">
				<FeaturedRecipe featuredRecipes={featuredRecipes} />
				<h1 className="main-h1">Top recipes</h1>
				<BlogPostList recipes={recipes} />
			
			</div>
		</MainLayout>
	);
}

export default HomePage;
