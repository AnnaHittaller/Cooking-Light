
import "../../styles/resultsPage.css";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { SearchContext } from "../../context/SearchContext";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import BlogPostList from "../BlogPostList";


function ResultsPage() {
	const { query, setQuery } = useContext(SearchContext);
	const [recipes, setRecipes] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([])

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const data = await axios.get("http://localhost:4000/recipes/list");
				//console.log("data:",data.data)
				setRecipes(data.data);

					const filteredRecipeArray = recipes.filter((item) => {
						const { title, summary, preparation, ingredients } = item;
						const lowerCaseQuery = query.toLowerCase();
						//console.log("ing", ingredients)

						return (
							title?.toLowerCase().includes(lowerCaseQuery) ||
							summary?.toLowerCase().includes(lowerCaseQuery) ||
							preparation?.toLowerCase().includes(lowerCaseQuery) ||
							ingredients?.some((ingredient) =>
								ingredient.toLowerCase().includes(lowerCaseQuery)
							)
						);
					});
					setFilteredRecipes(filteredRecipeArray);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchRecipes();
	}, [query, recipes]);


	return (
		<MainLayout>
			<div className="page">
				<h1>Results for: {query}</h1>
				<div className="cards">
					 {filteredRecipes.length > 0 ? (
						<BlogPostList recipes={filteredRecipes} />
					) : (
						<p>There are no matching recipes</p>
					)} 
				</div>
			</div>
		</MainLayout>
	);
}

export default ResultsPage;
