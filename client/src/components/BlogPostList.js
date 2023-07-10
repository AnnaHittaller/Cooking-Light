import { RecipeCard } from "./RecipeCard";
import "../styles/recipeCard.css"

function BlogPostList({ recipes }) {
	return (
		<div className="blog-post-list">
			{recipes.map((item, idx) => (
			<RecipeCard key={idx} item={item} />
			))}
	
		</div>
	);
}

export default BlogPostList;
