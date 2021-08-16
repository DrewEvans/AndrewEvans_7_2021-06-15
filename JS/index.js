import {
	recipes,
	uniqueIngredientList,
	uniqueUtensils,
	uniqueAppliances,
} from "./recipes.js";
import dropdownFilter from "./dropdownFilter.js";
import { tagSearch } from "../functions/tagSearch.js";
import { searchData } from "../functions/searchAlgorithim.js";

//DOM Elements
const ingredientsDropDown = document.querySelector(".ingredients-dropdown");
const utensilsDropDown = document.querySelector(".utensils-dropdown");
const appliancesDropDown = document.querySelector(".appliances-dropdown");
const searchBar = document.querySelector(".form-control");

const dropdowns = document.querySelectorAll("#dropdownFilter");

const cardContainer = document.getElementById("card-container");
const tagContainer = document.getElementById("tagContainer");
const closeCross = document.querySelectorAll("closeCross");
const tags = document.getElementById("tagItem");

//empty arrays
let searchTerm = "";
let recipesToDisplay = [];
let recipesFiltered = [];
let filterTags = []; 



//add event listener on the searchbar
searchBar.addEventListener("keyup", (e) => {
	
	searchTerm = e.target.value;

	recipesFiltered = searchData(recipesToDisplay, searchTerm);
	
	createCard(recipesFiltered);
	//return new filtered lists in the dropdowns
	dropdownFilter(
		ingredientsDropDown,
		1,
		uniqueIngredientList(recipesFiltered)
	);
	dropdownFilter(utensilsDropDown, 2, uniqueUtensils(recipesFiltered));
	dropdownFilter(appliancesDropDown, 3, uniqueAppliances(recipesFiltered));
});


for (let i = 0; i < dropdowns.length; i++) {
	dropdowns[i].addEventListener("click", (e) => {
		
		if (e.target.className === "tag-item ingredients") {
			filterTags.push({
				name: e.target.innerText,
				type: "ingredient",
			})
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
			})
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
			})
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

document.addEventListener("click", (e)=>{

	if(e.target.className === "far fa-times-circle closeCross"){
		let term = e.target.previousElementSibling.innerText;
		e.target.parentNode.remove()
		filterTags = arrayRemove(filterTags, term)
		
		if(!searchTerm && !filterTags.length){
			console.log("no prim search and no tags")
			loadRecipes();
		}
		if(!!searchTerm && !filterTags.length){
			recipesFiltered = searchData(recipesToDisplay, searchTerm)
			createCard(recipesFiltered)
			renderDropdowns();
			console.log("prim search and no tags")
		}
		if(!searchTerm && !!filterTags.length){
			console.log(" no prim search and tags")
			recipesFiltered = tagSearch(recipesToDisplay, filterTags)
			createCard(recipesFiltered)
			renderDropdowns();
		}
		if(!!searchTerm && !!filterTags.length){
			
			recipesFiltered = searchData(recipesToDisplay, searchTerm);
			recipesFiltered = tagSearch(recipesFiltered, filterTags)

			createCard(recipesFiltered)
			renderDropdowns();
			console.log(" prim search and tags")
		}


	}

	

	if(e.target.tagName === "LI" && !searchTerm && filterTags.length <= 1){
		
		recipesFiltered = tagSearch(recipesToDisplay, filterTags)
		console.log("added tag, searchbar not added")
		createCard(recipesFiltered);
		renderDropdowns();
	}

	if(e.target.tagName === "LI" && !searchTerm && filterTags.length >= 2 ){
		
		recipesFiltered = tagSearch(recipesFiltered, filterTags)
		console.log("added  another tag, searchbar not added")
		createCard(recipesFiltered);
		renderDropdowns();

	}
	if(e.target.tagName === "LI" && !!searchTerm ){
		
		recipesFiltered = tagSearch(recipesFiltered, filterTags)
		console.log("added tag, searchbar filtered added")
		createCard(recipesFiltered);
		renderDropdowns();

	}
})

const arrayRemove = (arr, value) => { 
	return arr.filter(function(ele){ 
		return ele.name != value; 
	});
}

const renderDropdowns = () => {
	dropdownFilter(
		ingredientsDropDown,
		1,
		uniqueIngredientList(recipesFiltered)
	);
	dropdownFilter(utensilsDropDown, 2, uniqueUtensils(recipesFiltered));
	dropdownFilter(appliancesDropDown, 3, uniqueAppliances(recipesFiltered));
}


//fetch json data
const loadRecipes = async () => {
	try {
		const res = await fetch("/public/data.json");
		recipesToDisplay = await res.json();
		createCard(recipesToDisplay);
		dropdownFilter(
			ingredientsDropDown,
			1,
			uniqueIngredientList(recipesToDisplay)
		);
		dropdownFilter(utensilsDropDown, 2, uniqueUtensils(recipesToDisplay));
		dropdownFilter(
			appliancesDropDown,
			3,
			uniqueAppliances(recipesToDisplay)
		);
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

loadRecipes();