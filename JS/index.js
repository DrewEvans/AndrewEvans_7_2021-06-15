import {
	uniqueIngredientList,
	uniqueUtensils,
	uniqueAppliances,
} from "./recipes.js";

import { tagSearch } from "../functions/tagSearch.js";
import { searchData } from "../functions/searchAlgorithim.js";
import ingredientDropdown from "./ingredientDropdown.js";
import applianceDropdown from "./applianceDropdown.js";
import ustensilDropdown from "./ustensilDropdown.js";

//DOM Elements
const searchBar = document.querySelector(".form-control");
const dropdowns = document.querySelectorAll(".dropdown-btn");
const cardContainer = document.getElementById("card-container");
const tagContainer = document.getElementById("tagContainer");

//empty arrays
let searchTerm = "";
let recipesToDisplay = [];
let recipesFiltered = [];
let filterTags = [];

//add event listener on the searchbar
searchBar.addEventListener("keyup", (e) => {
	searchTerm = e.target.value;

	if (searchTerm.length >= 3) {
		recipesFiltered = searchData(recipesToDisplay, searchTerm);

		createCard(recipesFiltered);
		//return new filtered lists in the dropdowns
		renderDropdowns();
	} else {
		loadRecipes();
	}
	if (recipesFiltered.length === 0 && searchTerm.length >= 3) {
		console.log("inject");
		const htmlString = `
			<h2>
				Aucune recette ne correspond à votre critère… vous
				pouvez chercher « tarte aux pommes », « poisson », etc.
			</h2>
		`;
		cardContainer.innerHTML = htmlString;
	}
});

for (let i = 0; i < dropdowns.length; i++) {
	dropdowns[i].addEventListener("click", (e) => {
		if (e.target.className === "tag-item ingredients") {
			filterTags.push({
				name: e.target.innerText,
				type: "ingredient",
			});
			tagContainer.insertAdjacentHTML(
				"afterbegin",
				`<div class="ingredient-tag tag" id="filterTag">
					<p class="item-text" id="tagItem">${e.target.innerText}</p>
					<span class="far fa-times-circle closeCross"></span>
				</div>`
			);
		}

		if (e.target.className === "tag-item ustensil") {
			filterTags.push({
				name: e.target.innerText,
				type: "ustensil",
			});
			tagContainer.insertAdjacentHTML(
				"afterbegin",
				`<div class="ustensil-tag tag" id="filterTag">
					<p class="item-text" id="tagItem">${e.target.innerText}</p>
					<span class="far fa-times-circle closeCross"></span>
				</div>`
			);
		}

		if (e.target.className === "tag-item appliance") {
			filterTags.push({
				name: e.target.innerText,
				type: "appliance",
			});
			tagContainer.insertAdjacentHTML(
				"afterbegin",
				`<div class="appliance-tag tag" id="filterTag">
					<p class="item-text" id="tagItem">${e.target.innerText}</p>
					<span class="far fa-times-circle closeCross"></span>
				</div>`
			);
		}
	});
}

document.addEventListener("click", (e) => {
	if (e.target.className === "far fa-times-circle closeCross") {
		let term = e.target.previousElementSibling.innerText;
		e.target.parentNode.remove();
		filterTags = arrayRemove(filterTags, term);

		if (!searchTerm && !filterTags.length) {
			console.log("no prim search and no tags");
			loadRecipes();
		}
		if (!!searchTerm && !filterTags.length) {
			recipesFiltered = searchData(recipesToDisplay, searchTerm);
			createCard(recipesFiltered);
			renderDropdowns();
			console.log("prim search and no tags");
		}
		if (!searchTerm && !!filterTags.length) {
			console.log(" no prim search and tags");
			recipesFiltered = tagSearch(recipesToDisplay, filterTags);
			createCard(recipesFiltered);
			renderDropdowns();
		}
		if (!!searchTerm && !!filterTags.length) {
			recipesFiltered = searchData(recipesToDisplay, searchTerm);
			recipesFiltered = tagSearch(recipesFiltered, filterTags);

			createCard(recipesFiltered);
			renderDropdowns();
			console.log(" prim search and tags");
		}
	}

	if (e.target.tagName === "LI" && !searchTerm && filterTags.length <= 1) {
		recipesFiltered = tagSearch(recipesToDisplay, filterTags);
		console.log("added tag, searchbar not added");
		createCard(recipesFiltered);
		renderDropdowns();
	}

	if (e.target.tagName === "LI" && !searchTerm && filterTags.length >= 2) {
		recipesFiltered = tagSearch(recipesFiltered, filterTags);
		console.log("added  another tag, searchbar not added");
		createCard(recipesFiltered);
		renderDropdowns();
	}
	if (e.target.tagName === "LI" && !!searchTerm) {
		recipesFiltered = tagSearch(recipesFiltered, filterTags);
		console.log("added tag, searchbar filtered added");
		createCard(recipesFiltered);
		renderDropdowns();
	}
});

const arrayRemove = (arr, value) => {
	return arr.filter(function (ele) {
		return ele.name != value;
	});
};

const renderDropdowns = () => {
	ingredientDropdown(uniqueIngredientList(recipesFiltered));
	applianceDropdown(uniqueAppliances(recipesFiltered));
	ustensilDropdown(uniqueUtensils(recipesFiltered));
};

//fetch json data
const loadRecipes = async () => {
	try {
		const res = await fetch("/public/data.json");
		recipesToDisplay = await res.json();
		createCard(recipesToDisplay);

		ingredientDropdown(uniqueIngredientList(recipesToDisplay));
		applianceDropdown(uniqueAppliances(recipesToDisplay));
		ustensilDropdown(uniqueUtensils(recipesToDisplay));
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
					<span class="fas fa-clock"></span>${" "}
					${time}min
				</p>
			</div>
			<div class="details">
				<div class="ingredients-container">
					<ul>
						${ingredients
							.map(
								(x) =>
									`<li>${x.ingredient}: ${x.quantity}${
										x.unit === undefined
											? " unités"
											: x.unit
									}</li>`
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

loadRecipes();
