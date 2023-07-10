import { useState } from "react";
import "../../styles/addRecipe.css";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";

function AddRecipePage() {
	const navigate = useNavigate();

	const [category, setCategory] = useState();
	const [cookingTime, setCookingTime] = useState();
	const [featured, setFeatured] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [preparation, setPreparation] = useState("");
	const [recipeImage, setRecipeImage] = useState({
		url: "",
		file: null,
	});
	const [title, setTitle] = useState();
	//const [slug, setSlug] = useState("");
	const [summary, setSummary] = useState("");

	const handleImageChange = (e) => {
		console.log(e.target.files[0]);

		if (!e.target.files[0]) {
			setRecipeImage({
				url: "",
				file: null,
			});
			return;
		}
		// if(e.target.files[0].size > 1000000) {
		// 	alert('The file has to be smaller than 10KB')
		// }

		setRecipeImage({
			url: URL.createObjectURL(e.target.files[0]),
			file: e.target.files[0],
		});
	};
	console.log("recipeImage", recipeImage);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formdata = new FormData();

			formdata.set("image", recipeImage.file, "filename");
			formdata.set("title", title);
			formdata.set("category", category);
			formdata.set("cookingTime", parseInt(cookingTime));
			formdata.set("summary", summary);
			formdata.set("ingredients", ingredients);
			formdata.set("preparation", preparation);
			formdata.set("featured", featured);

			// const requestBody = {
			// 	title: title,
			// 	category: category,
			// 	cookingTime: parseInt(cookingTime),
			// 	summary: summary,
			// 	ingredients: ingredients,
			// 	preparation: preparation,
			// 	featured: featured,
			// };

			const response = await axios.post(
				"http://localhost:4000/recipes/add",
				//requestBody,
				formdata
				// {
				// 	headers: {
				// 		"Content-Type": "application/json; charset=UTF-8",
				// 	},
				// }
			);

			setTitle("");
			setCategory("");
			setCookingTime("");
			setSummary("");
			setPreparation("");
			setFeatured(false);
			setIngredients([]);
			setRecipeImage({
				url: "",
				file: null,
			});

			navigate("/");

			//console.log("add recipe response data", response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<MainLayout>
			<div className="page">
				<h1>Add a new recipe</h1>
				<form
					className="add-new-form"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					method="post">
					<label htmlFor="title">
						Recipe title:
						<input
							type="text"
							id="title"
							maxlength="256"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							name="title"
							placeHolder="Enter recipe title"
							required
						/>
					</label>

					<label htmlFor="image">
						Choose an image:
						<input
							type="file"
							id="image"
							name="image"
							accept="image/*"
							onChange={handleImageChange}
						/>
						<div className="image-div">
							{recipeImage && (
								<>
									<img src={recipeImage.url} alt="selected image file" />
									<br />
								</>
							)}
						</div>
						{/* <button onClick={() => setRecipeImage({ url: "", file: null })}>
							Delete image
						</button> */}
					</label>

					<label>
						Category:
						<select
							name="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required>
							<option value="">Select an option</option>
							<option value="Breakfast">Breakfast</option>
							<option value="Dessert">Dessert</option>
							<option value="Dinner">Dinner</option>
							<option value="Main course">Main course</option>
							<option value="Pasta">Pasta</option>
							<option value="Soup">Soup</option>
						</select>
					</label>

					<label>
						Cooking time in minutes:
						<input
							type="number"
							value={cookingTime}
							onChange={(e) => setCookingTime(e.target.value)}
							name="cookingTitle"
							placeHolder="Enter cooking time"
							step="1"
							min="1"
							max="300"
							required
						/>
					</label>
					<label required>
						Summary:
						<textarea
							type="text"
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
							name="summary"
							placeHolder="Enter summary"
							maxlength="256"
							rows="3"
							required
						/>
					</label>
					<label>
						Ingredients:
						<TagsInput
							value={ingredients}
							onChange={setIngredients}
							name="ingredients"
							placeHolder="Enter ingredients"
							isEditOnRemove={true}
							required
						/>
					</label>

					<label>
						Preparation:
						<textarea
							type="text"
							value={preparation}
							onChange={(e) => setPreparation(e.target.value)}
							name="prep1"
							placeHolder="Enter preparation steps"
							maxlength="5000"
							rows="6"
							required
						/>
					</label>
					<div className="featured-label">
						<p>Featured:</p>
						<div>
							<div>
								<input
									type="radio"
									id="no"
									name="featured"
									value="no"
									checked={!featured}
									onChange={(e) => setFeatured(false)}
								/>
								<label htmlFor="no">No</label>
							</div>
							<div>
								<input
									type="radio"
									id="yes"
									name="featured"
									value="yes"
									checked={featured}
									onChange={(e) => setFeatured(true)}
								/>
								<label htmlFor="yes">Yes</label>
							</div>
						</div>
					</div>

					{/* <label>Date: {today}</label> */}

					<button className="add-new-btn" type="submit">
						Add recipe
					</button>
				</form>
			</div>
		</MainLayout>
	);
}

export default AddRecipePage;
