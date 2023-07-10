import "../styles/singlePost.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layout/MainLayout";
import axios from "axios";

function SinglePost() {
	const { id } = useParams();
	const [post, setPost] = useState([]);
	const [liked, setLiked] = useState(false);
	const [isloading, setIsLoading] = useState(true);
	const { isLoggedIn } = useContext(AuthContext);
	const [recipe, setRecipe] = useState([]);
	const navigate = useNavigate();

	//console.log("id", id);

	const handleLike = () => {
		// Add/remove the post from local storage
		if (!liked) {
			addToLikedRecipes(recipe);
		} else {
			removeFromLikedRecipes(recipe);
		}
	};

	const addToLikedRecipes = (recipe) => {
		// Retrieve the existing liked posts from local storage
		const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
		setLiked(true);
		// Add the new post to the liked posts array
		likedRecipes.push(recipe);

		// Save the updated liked posts array to local storage
		localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
	};

	const removeFromLikedRecipes = (post) => {
		// Retrieve the existing liked posts from local storage
		const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
		setLiked(false);

		// Remove the post from the liked posts array
		const updatedLikedRecipes = likedRecipes.filter(
			(likedRecipe) => likedRecipe._id !== recipe._id
		);

		// Save the updated liked posts array to local storage
		localStorage.setItem("likedRecipes", JSON.stringify(updatedLikedRecipes));
		//console.log("remove",liked)
	};

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const data = await axios.get(
					`http://localhost:4000/recipes/listOne/${id}`
				);
				//console.log("data for single recipe:", data);
				setRecipe(data.data);
				setIsLoading(false);
				//console.log("id", id);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchRecipe();
	}, [id]);

	const deleteRecipe = async () => {
		try {
			const data = await axios.delete(
				`http://localhost:4000/recipes/delete/${id}`
			);
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		// Check if the post is present in the liked posts stored in local storage
		const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
		const isLiked = likedRecipes.some(
			(likedRecipe) => likedRecipe?._id === recipe?._id
		);
		setLiked(isLiked);
	}, [recipe]);

	const finalSteps = recipe?.preparation
		? recipe.preparation
				.split(/\d+\.\s/)
				.filter((step) => step.trim() !== "")
				.map((step, idx) => {
					return <li key={idx}>{step.trim()}</li>;
				})
		: [];

	return (
		<MainLayout>
			<div className="page single-post">
				{!isloading ? (
					<>
						<img
							//src="https://picsum.photos/800/500"
							src={`http://localhost:4000/images/${recipe.image}`}
							alt="recipe image"
							className="recipe-img"
						/>
						<h1>{recipe?.title}</h1>
						<div className="meta-data">
							<span>Category: {recipe?.category}</span>
							<span>Date: {new Date(recipe?.date).toLocaleDateString()}</span>
							{isLoggedIn && (
								<span>
									Add to recipe book:{" "}
									<button onClick={handleLike}>
										{liked ? (
											<AiFillHeart className="like-icon" />
										) : (
											<AiOutlineHeart className="like-icon" />
										)}
									</button>
								</span>
							)}
						</div>
						<p>{recipe?.summary}</p>
						<h2>Ingredients</h2>
						<ul>
							{recipe?.ingredients?.map((ingredient, idx) => (
								<li key={idx}>{ingredient}</li>
							))}
						</ul>
						<h2>Preparation</h2>
						<ol>{finalSteps} </ol>
						{isLoggedIn && (
							<div className="recipe-buttons">
								<Link onClick={deleteRecipe}>
									<button>Delete recipe</button>
								</Link>
								<Link to={`/edit-recipe/${recipe._id}`}>
									<button>Edit recipe</button>
								</Link>
							</div>
						)}
					</>
				) : (
					<MoonLoader
						color="#008080"
						cssOverride={{ margin: "45vh auto" }}
						loadingsize={50}
					/>
				)}
			</div>
		</MainLayout>
	);
}

export default SinglePost;
