import {
	recipes,
	uniqueIngredientList,
	uniqueUtensils,
	uniqueAppliances,
} from "./recipes.js";
import openFilter from "./openFilter.js";

//DOM Elements
const ingredientsDropDown = document.querySelector(".ingredients-dropdown");
const utensilsDropDown = document.querySelector(".utensils-dropdown");
const appliancesDropDown = document.querySelector(".appliances-dropdown");
const dropdownFilter = document.querySelectorAll("#dropdownFilter");
const cardContainer = document.getElementById("card-container");
const searchBar = document.querySelector(".form-control");

let recipesToDisplay = [];

//render cards from on search

searchBar.addEventListener("keyup", (e) => {
	let searchTerm = e.target.value;

	const filteredRecipes = recipesToDisplay.filter((el) => {
		return (
			el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			el.appliance.toLowerCase().includes(searchTerm.toLowerCase()) ||
			el.ustensils.some((ustensil) =>
				ustensil.toLowerCase().includes(searchTerm.toLowerCase())
			) ||
			el.ingredients.filter((obj) =>
				obj.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
			).length > 0
		);
	});
	createCard(filteredRecipes);
});

//display user filterable Items
openFilter(ingredientsDropDown, 1, uniqueIngredientList(recipes));
openFilter(utensilsDropDown, 2, uniqueUtensils(recipes));
openFilter(appliancesDropDown, 3, uniqueAppliances(recipes));

//fetch json data
const loadRecipes = async () => {
	try {
		const res = await fetch("/public/data.json");
		recipesToDisplay = await res.json();
		createCard(recipesToDisplay);
	} catch (err) {
		console.error(err);
	}
};

// generate recipe cards from provided data
const createCard = (recipes) => {
	const htmlString = recipes
		.map((recipe) => {
			const { id, name, ingredients, time, description } = recipe;

			return `
			<div key=${id} class="card">
			<div class="img-block"></div>
			<div class="card-body">
				<h2 class="card-title">${name}</h2>
				<p class="duration">
					<span class="clock-icon">TEMPO</span>${" "}
					${time}min
				</p>
			</div>
			<div class="details">
				<div class="ingredients-container">
					<ul>
						${ingredients
							.map(
								(x) =>
									`<p><span class="bolder">${
										x.ingredient
									}:</span> ${x.quantity}${
										x.unit === undefined
											? " unités"
											: x.unit
									}</p>`
							)
							.join("")}
					</ul>
				</div>
				<div class="description">${description}</div>
			</div>
		</div>
					`;
		})
		.join("");
	cardContainer.innerHTML = htmlString;
};

const 

loadRecipes();
