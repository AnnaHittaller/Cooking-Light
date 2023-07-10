import express from "express";
import {
	handleListRecipes,
	handleAddRecipe,
	handleListFeaturedRecipes,
	handleListCategories,
	handleDeleteRecipe,
	handleEditRecipe,
	handleListRecipeById,
} from "../controllers/recipeController.js";
import multer from "multer";

//const upload = multer({dest: './server/uploads'})

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./server/uploads");
	},
	filename: function (req, file, cb) {
		//const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

		let extension = "";

		if (file.mimetype.includes("image"))
			extension = "." + file.mimetype.slice(6);

		console.log("extension:", extension);

		cb(null, file.fieldname + "-" + uniqueSuffix + extension);
	},
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/list", handleListRecipes);
router.get("/listOne/:id", handleListRecipeById);
router.get("/list/featured", handleListFeaturedRecipes);
router.get("/list/categories", handleListCategories);
router.post("/add", upload.single("image"), handleAddRecipe);
router.put("/put/:id", upload.single("image"), handleEditRecipe);
router.delete("/delete/:id", handleDeleteRecipe);

export default router;
