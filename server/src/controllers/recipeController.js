import Recipe from "../model/Recipe.js";

export const handleListRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find().select("-__v").sort({ date: -1 }); ;
		//console.log(recipes);
		res.status(200).send(recipes);
	} catch (error) {
		console.log("error listing recipes:", error.message);
		res.status(500).send("Error in listing recipes: " + error.message);
	}
}; 

export const handleListRecipeById = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id).select("-__v");
		//console.log("recipe found by id:", recipe);
		res.status(200).send(recipe);
	} catch (error) {
		console.log("error listing a recipe:", error.message);
		res.status(500).send("Error in listing a recipe: " + error.message);
	}
	console.log("param", req.params);
};

export const handleAddRecipe = async (req, res) => {
	try {
		console.log("req.file:", req.file);
		//console.log("new recipe:", newRecipe);

		if (req.file) {
			req.body.image = req.file.filename;
		}

		const newRecipe = await Recipe.create(req.body);

		//await newRecipe.updateOne({ image: req.body.image });

		res.status(201).send("recipe inserted into db");
	} catch (error) {
		console.log("error adding recipe:", error.message);
		res.send("Error in adding a recipe: " + error.message);
	}
	//console.log(req.body);

	//res.send("hello from users/add");
};

export const handleListFeaturedRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({ featured: true }).select("-__v");
		//console.log(recipes);
		res.status(200).send(recipes);
	} catch (error) {
		console.log("error listing featured recipes:", error.message);
		res.status(500).send("Error in listing featured recipes: " + error.message);
	}
};

export const handleListCategories = async (req, res) => {
	try {
		const recipes = await Recipe.find().select("category");
		//console.log(recipes);
		const categories = new Set(recipes.map((recipe) => recipe.category));
		//console.log(categories);
		res.status(200).send(Array.from(categories));
		//res.status(200).send("hello from category list");
	} catch (error) {
		console.log("error listing categories:", error.message);
		res.status(500).send("Error in listing categories: " + error.message);
	}
};

export const handleEditRecipe = async (req, res) => {
	try {
		console.log("id", req.body._id)
		console.log("req.body", req.body)

		if(req.file) {

			req.body.image = req.file.filename;
		}

		const updatedRecipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		console.log("updated recipe:", updatedRecipe);

		res.status(201).send("recipe updated");
	} catch (error) {
		console.log("error updating recipe:", error.message);
		res.send("Error in updating a recipe: " + error.message);
	}
	//console.log(req.body);
};

export const handleDeleteRecipe = async (req, res) => {
	try {
		const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
		//console.log("recipe deleted:", deletedRecipe);

		res.status(201).send("recipe deleted");
	} catch (error) {
		console.log("error deleting recipe:", error.message);
		res.send("Error in deleting a recipe: " + error.message);
	}
	//console.log(req.body);
};
