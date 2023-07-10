import "../styles/recipeCard.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export function RecipeCard({ item }) {
	//console.log(item._id)


	return (
		<div className="card-div">
			<Link to={`/recipe/${item._id}`} className="card">
				<div className="card-hover">
					<div className="card-top">
						<img src={`http://localhost:4000/images/${item.image}`} alt="" />
						<p className="card-category">{item.category}</p>
					</div>
					<div className="card-bottom">
						<h2>{item.title}</h2>
						<p className="card-time">
							<AiOutlineClockCircle />
							{item.cookingTime} min
						</p>
					</div>
				</div>
				<div className="card-separator">
					<hr />
				</div>
			</Link>
		</div>
	);
}
