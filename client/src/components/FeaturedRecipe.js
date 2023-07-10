import "../styles/featuredRecipe.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const responsive = {
	0: { items: 1 },
	568: { items: 1 },
	1024: { items: 1 },
};

const renderPrevButton = ({ isDisabled }) => {
	return <BsCaretLeftFill style={{ color: "white", fontSize: "20px" }} />;
};

const renderNextButton = ({ isDisabled }) => {
	return <BsCaretRightFill style={{ color: "white", fontSize: "20px" }} />;
};

function FeaturedRecipe({ featuredRecipes }) {

	return (
		<div className="featured-container">
			<AliceCarousel
				mouseTracking
				infinite
				items={featuredRecipes.map((item, index) => (
					<div className="item" key={index} data-value={index + 1}>
						<div className="featured-container">
							<img
								//src="https://picsum.photos/800/500"
								src={`http://localhost:4000/images/${item.image}`}
								alt="Featured Recipe"
							/>
							<Link to={`/recipe/${item._id}`}>
								<div className="featured-data">
									<div>
										<p>{item.category}</p>
										<h2>{item.title}</h2>
										<p>{item.summary}</p>
									</div>
								</div>
							</Link>
						</div>
					</div>
				))}
				responsive={responsive}
				controlsStrategy="alternate"
				renderPrevButton={renderPrevButton}
				renderNextButton={renderNextButton}
				disableSlideInfo={true}
				disableDotsControls={false}
			/>
		</div>
	);
}

export default FeaturedRecipe;
