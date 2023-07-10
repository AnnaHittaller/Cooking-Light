import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { SearchContext } from "../context/SearchContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css"
import axios from "axios";


function Sidebar() {
	const { query, setQuery, setCategory, category } = useContext(SearchContext);
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query === "") {
			alert("Please type something");
			return;
		}
		navigate("/search-results");
	};

		useEffect(() => {
			const fetchCategories = async () => {
				try {
					const data = await axios.get("http://localhost:4000/recipes/list/categories");
					//console.log("data:", data.data);
					setCategories(data.data);
				} catch (error) {
					console.log(error.message);
				}
			};
			fetchCategories();
		}, []);

	return (
		<aside>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search recipes"
					id="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">
					<IoSearch />
				</button>
			</form>
			<div>
				<h3>Categories</h3>
				<div className="categories">
					 {categories.map((category, idx) => (
						<Link
							key={idx}
							to="/category"
							onClick={() => setCategory(category)}
							>
							<span>{category}</span>
						</Link>
					))} 
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
