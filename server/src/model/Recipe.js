import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: String,
		required: true,
	},
	cookingTime: {
		type: Number,
		required: true,
	},
	summary: {
		type: String,
		required: true,
	},
	ingredients: {
		type: [String],
		required: true,
	},
	preparation: {
		type: String,
		required: true,
	},
	featured: {
		type: Boolean,
	},
	image: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Recipe', recipeSchema)